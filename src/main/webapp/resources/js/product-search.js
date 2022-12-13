let productSearchTable=null
let pscontext=null;
$(document).ready(function () {
    pscontext=$('#context').val()
    $.ajax({
        'url': `${pscontext}/inventory/list`,
        'method': "GET",
        'contentType': 'application/json'
    }).done(function (data) {
        productSearchTable=$('#productSearchList').DataTable({
            data: data,
            "bFilter" : true,
            processing:true,
            ordering: true,
            info: true,
            autoWidth: true,
            select: true,
            searching: true,
            scrollY:        "200px",
            scrollX:        true,
            scrollCollapse: true,
            paging:         true,
            fixedColumns:   {
                heightMatch: 'none',
            },
            colReorder: true,
            dom: 'Brtip',
            buttons: [
                {
                    className:'bg-transparent',
                    text: ()=>{
                        return ` <a  class="btn btn-outline-primary"><i class="fa fa-bars "></i> Rows</a>`
                    },
                    extend: 'pageLength'
                },
                {
                    extend: 'collection',
                    text: ()=>{
                        return `<button class="btn btn-outline-primary"><i class="fa fa-columns"></i></button>`
                    },
                    className: 'bg-transparent',
                    buttons: [
                        {
                            text: 'Toggle Name',
                            action: function ( e, dt, node, config ) {
                                dt.column(0 ).visible( ! dt.column( 0 ).visible() );
                            }
                        },
                        {
                            text: 'Toggle Type',
                            action: function ( e, dt, node, config ) {
                                dt.column( 1 ).visible( ! dt.column( 1 ).visible() );
                            }
                        },
                        {
                            text: 'Toggle Details',
                            action: function ( e, dt, node, config ) {
                                dt.column( 2 ).visible( ! dt.column( 2 ).visible() );
                            }
                        },
                        {
                            text: 'Toggle Packaging',
                            action: function ( e, dt, node, config ) {
                                dt.column( 3 ).visible( ! dt.column( 3 ).visible() );
                            }
                        },
                        {
                            text: 'Toggle Price',
                            action: function ( e, dt, node, config ) {
                                dt.column( 4 ).visible( ! dt.column( 4 ).visible() );
                            }
                        },
                        {
                            text: 'Toggle Status',
                            action: function ( e, dt, node, config ) {
                                dt.column( 5 ).visible( ! dt.column( 5 ).visible() );
                            }
                        },
                        {
                            text: 'Toggle Re-Order Level',
                            action: function ( e, dt, node, config ) {
                                dt.column( 6 ).visible( ! dt.column( 6 ).visible() );
                            }
                        }
                    ]
                },
                {
                    className: 'bg-transparent',
                    text: () => {
                        return ` 
                        <div class="mui-col-md-12 float-right"style="width: 100%; display: flex; flex-grow: 1;">
                            <div class="mui-col-md-4 col-sm-12 mui-select ">
                                <select id="saleProductSelect">
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="50">50</option>
                                    <option value="-1">All</option>
                                </select>
                                <label for="saleProductSelect"> Rows </label>
                            </div>
                            <div class="mui-col-md-8 col-sm-12 mui-textfield mui-textfield--float-label">
                                <input type="text" id="saleProductSearch" />
                                <label for="search">search product</label>
                            </div>
                
                    </div>`
                    }
                }
            ],

            columns: [
                {data: 'product.name'},
                {data: 'product.description'},
                {data: 'product.packaging'},
                {data:'quantity'},
                {data: 'price', render: $.fn.dataTable.render.number(null, '.', 2, '$ ')},
                { 'data': 'id',
                    title: 'Quantity',
                    wrap: true,
                    "render": function (data) {
                        return `<input type="number" min="0" style="width: 100px;" class="form-control modern form-control-sm" id="${data}-input-quantity" placeholder="quantity" />`
                    } },
                { 'data': 'id',
                    title: 'Add',
                    wrap: true,
                    "render": function (data, type, row) {
                        return `<button type="button" onclick="addProductOnclick('${data}', true)" class="btn btn-outline-success" ><i class="fa fa-plus-circle "></i></button>`
                    } },
                { 'data': 'id',
                    title: 'Add',
                    wrap: true,
                    "render": function (data, type, row) {
                        return `<button type="button" onclick="addProductOnclick('${data}', false, null)" class="btn btn-outline-danger" ><i class="fa fa-minus-circle "> </i></button>`
                    } },

            ],


        });

        addProductOnclick(null, false, null, true);

        $('select[name="productSearchTable_length"]').css('width','60px')

        $('#saleProductSelect').on('change', ()=>{
            let rows=$('#saleProductSelect').val()
            productSearchTable.page.len(rows).draw()
        })

        $('#saleProductSearch').keyup(function(){
            productSearchTable.search($(this).val()).draw() ;
        })

    });

    $('#productSearchList tbody').on('click', 'tr', function () {
        productSearchTable.$('tr.selected').removeClass('selected');
        $(this).toggleClass('selected');
    });

    $('#productSearchList tbody').on('mouseenter', 'td', function () {
        var colIdx = orgTable?.cell(this)?.index()?.column;

        $(orgTable?.cells()?.nodes())?.removeClass('highlight');
        $(orgTable?.column(colIdx)?.nodes())?.addClass('highlight');
    });

})





let productSearchItems=null;
function addProductOnclick(data, add, items) {

    let quantity = document.getElementById(data + '-input-quantity')?.value;
    if ((!quantity || quantity < 1) && add) {
        var quantityModal = new bootstrap.Modal(document.getElementById('invalidQuantityModal'), { keyboard: true})
        quantityModal.show();
        return;
    }
    if(items && items>0){
        quantity=items;
    }

    if (productSearchItems) {
        productSearchItems.destroy();
    }

    //determine if its removing or adding a product to the sale, and act accordingly
    const url = data ?add ? `${pscontext}/sales/add-sale-item-to-sale?inventoryId=` + data + "&quantity=" + quantity :
        `${pscontext}/sales/remove-sale-item-to-sale?inventoryId=` + data+"&quantity="+quantity:
        `${pscontext}/sales/get-sale-item-to-sale`;

    //clear text box after reading its value (quantity)
    if(add) {
        document.getElementById(data + '-input-quantity').value = null;
    }

    $.ajax({
        'url': url,
        'method': "GET",
        'contentType': 'application/json'
    }).done(function (itemz) {
        if(add){
            showOperationStatusDialog('Operation Feedback','Product added successfully!',`Product has been added to the list.`,'info',3000);
        }else if(!add && data){
            showOperationStatusDialog('Operation Feedback','Product adding failed!',`Failed to add product to the list.`,'info',3000);
        }

        const datas = itemz.map(item => {
            return {
                name: item?.inventory?.product?.name + '-' + item?.inventory?.product?.description + '-' + item?.inventory?.product?.packaging,
                price: item.inventory?.price,
                quantity: item?.quantity,
                total: item.inventory?.price * item?.quantity,
                inventoryId: item?.inventory?.id
            }
        });

        let total=itemz.map(item=>item.inventory?.price*item?.quantity).reduce((a,b)=>a+b,0);

        createProductSearchItemsTable(datas, total)
        $('#saleSearchItem').keyup(()=>{
            productSearchItems.search(this.val()).draw() ;
        })
    })



}

function createProductSearchItemsTable(data, total) {
    productSearchItems = $('#productSearchItems').DataTable({
        data,
        'bFilter': true,
        columnDefs: [{"className": "dt-center", "targets": "_all"}],
        autoWidth: true,
        select: false,
        scrollY: "250px",
        scrollX: true,
        scrollCollapse: true,
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
                                <input type="text" id="saleSearchItem" class="bg-light" />
                                <label for="saleSearchItem">search product</label>
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
                title: 'Add',
                wrap: true,
                "render": function (data, type, row) {
                    return `<button type="button" onclick="addProductOnclick('${row?.inventoryId}',false, '${row?.quantity}')" class="btn btn-outline-danger" ><i class="fa fa-trash-o "> Remove</i></button>`
                }
            },

        ],
    })
}



