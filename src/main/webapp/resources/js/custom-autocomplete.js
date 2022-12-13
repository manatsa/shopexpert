
let aucontext=null;
let saleProductSearchItems=null
    $(function() {
        aucontext=$('#context').val()
        $("#search-box").autocomplete({
            width: 300,
            max: 10,
            delay: 100,
            minLength: 1,
            autoFocus: true,
            cacheLength: 1,
            scroll: true,
            highlight: false,
            source: function(request, response) {
                $.ajax({
                    url : `${aucontext}/customers/search-active?term=`+request.term, //Here we will user the URL that we want to hit
                    type : 'get',
                    async : true,
                    cache : false,
                    data : {
                        searchText : request.term
                    },
                    success : function(data) {
                        if (response) {
                            response($.map(data, function (item) {
                                return {
                                    label: item.name,
                                    value: item.name
                                };
                            }));
                        } else {
                            alert("failed try again...");
                        }
                    },
                    error : function() {
                        alert('System error occured, please try again ...');
                    }

                });
            },
            minLength: 2,
            maxResults: 10
        });

            $("#searchSaleProduct").autocomplete({
                minlength: 2,
                source: function(request, response) {
                    $.ajax({
                        url: `${aucontext}/inventory/search-product-by-name-packaging-description?term=${request.term}`,
                        type: "GET",
                        dataType: "json",
                        // data: { q: request.term, limit: 10 },
                        success: function(data) {
                            response($.map(data, function(item) {
                                return {
                                    label: item?.product?.printName+' for '+item?.price+' - '+item?.quantity+' items left',
                                    value: item?.id,
                                    quantity: item?.quantity
                                };
                            }));
                        }
                    });
                },
                select: function(event, ui) {
                    event.preventDefault();
                    $('#searchSaleProduct').val(ui.item.label);
                    $('#inventoryProductQuantity').val(ui.item.quantity)
                    $('#itemId').val(ui.item.value);
                }
            });


            $('#addProductToSaleBtn').on('click', function (){
                let id=$('#itemId').val();
                let inventory=$('#inventoryProductQuantity').val()
                let quantity=$('#searchSaleProductQuantity').val()
                //console.log((inventory<quantity))
                if(Number(inventory) < Number(quantity)){
                    showOperationStatusDialog('Failed Operation','Insufficient Inventory Available!',`Items left for this product are fewer than requested quantity. ${inventory} items left, and you requested ${quantity}.`,'danger',3000);
                    return;
                }

                if (saleProductSearchItems) {
                    saleProductSearchItems.destroy();
                }

//determine if its removing or adding a product to the sale, and act accordingly
                const url = `${aucontext}/sales/add-sale-item-to-sale?inventoryId=` + id + "&quantity=" + quantity

//clear text box after reading its value (quantity)

                    document.getElementById('searchSaleProductQuantity').value = null;
                    document.getElementById('searchSaleProduct').value = null;


                $.ajax({
                    'url': url,
                    'method': "GET",
                    'contentType': 'application/json'
                }).done(function (itemz) {
                    showOperationStatusDialog('Operation Feedback','Product added successfully!',`Product has been added to the list.`,'info',3000);

                    const datas = itemz.map(item => {
                        return {
                            name: item?.inventory?.product?.name + '-' + item?.inventory?.product?.description + '-' + item?.inventory?.product?.packaging,
                            price: Number(item.inventory?.price),
                            quantity: Number(item?.quantity),
                            total: Number(item.inventory?.price * item?.quantity),
                            inventoryId: item?.inventory?.id
                        }
                    });

                    let total=itemz.map(item=>item.inventory?.price*item?.quantity).reduce((a,b)=>a+b,0);
                    console.log(itemz)
                    createSaleProductSearchItemsTable(datas, total)
                    $('#saleSearchItems').keyup(()=>{
                        saleProductSearchItems.search(this.val()).draw() ;
                    })
                })

        });

    });





    $( "#search-box" ).bind( "autocompleteselect", function(event, ui) {
        $.ajax({
            url: `${aucontext}/customers/search-customer-by-name?name=`+ui.item.value,
            method:'GET',
            contentType: 'application/json'
        }).done(data=>{
            $('#search-box2').val(data.id)
        })

    });







function createSaleProductSearchItemsTable(data, total) {
    // console.log(data)
    saleProductSearchItems = $('#saleProductSearchItems').DataTable({
        data,
        'bFilter': true,
        columnDefs: [{"className": "dt-center", "targets": "_all"}],
        autoWidth: true,
        select: false,
        // scrollY: "250px",
        // scrollX: true,
        // scrollCollapse: true,
        searching: true,
        paging: true,
        dom: 'Brtip',
        buttons: [
            {
                className:'bg-transparent',
                text: ()=>{
                    return `<span  class="btn btn-outline-danger" style="font-size: x-large"><i class="fa fa-bank "> Total :: </span>`
                }
            },
            {
                className:'bg-transparent',
                text: ()=>{
                    return `<span class="btn btn-danger" style="font-size: x-large">$${total.toFixed(2)}</span>`
                }
            },
            {
                className: 'bg-transparent',
                text: () => {
                    return ` 
                        <div class="mui-col-md-12 float-right"style="width: 100%; display: flex; flex-grow: 1;">
                           
                            <div class="mui-col-md-8 mui-col-md-offset-4 col-sm-12 mui-textfield mui-textfield--float-label">
                                <input type="text" id="saleSearchItems" class="bg-light" />
                                <label for="saleSearchItems">search product</label>
                            </div>
                
                    </div>`
                }
            }

        ],
        columns: [
            {data: 'name'},
            {data: 'quantity'},
            {data: 'price', render: $.fn.dataTable.render.number(null, '.', 2, '$ ')}, // thousand, decimal, precision, prefix
            {data: 'total', render: $.fn.dataTable.render.number(null, '.', 2, '$ ')},
            {
                'data': 'name',
                title: 'Remove',
                wrap: true,
                "render": function (data, type, row) {
                    return `<button type="button" onclick="addProductOnclick('${row?.inventoryId}',false, '${row?.quantity}')" class="btn btn-outline-danger" ><i class="fa fa-trash-o "> Remove</i></button>`
                }
            },

        ],
    })
}


