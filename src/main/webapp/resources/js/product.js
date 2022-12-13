let productTable=null
let pdcontext=null;
$(document).ready(function () {
    pdcontext=$('#context').val()
   populateProducts();

    $('#productList tbody').on('click', 'tr', function () {
        productTable.$('tbody tr.selected').removeClass('selected');
        productTable.$('tbody tr').removeClass('select');
        $(this).toggleClass('select');
    });
})


function populateProducts(items) {
    if(productTable){
        productTable.destroy()
    }
    if(!items){
        $.ajax({
            'url': `${pdcontext}/products/list`,
            'method': "GET",
            'contentType': 'application/json'
        }).done(function (data) {
            createTable(data)
        });
    }else{
        createTable(items)
    }

}



function createTable(data) {
    productTable=$('#productList').DataTable({
        data: data,
        "bFilter" : true,
        processing:true,
        ordering: true,
        info: true,
        select: true,
        colReorder: true,
        pagingType: 'full_numbers',
        searching: true,
        dom: 'Brtip',
        buttons: [
            {
                className:'bg-transparent',
                text: ()=>{
                    return ` <a class="btn btn-success text-white"><i class="fa fa-plus-circle "></i> Product</a>`
                },
                action: function ( e, dt, node, config ) {
                    location.href=`${pdcontext}/product-creation`
                }
            },
            {
                extend: 'spacer',
                style: 'bar',
                text: ' Export Files '
            },
            {
                extend:'excel',
                className:'bg-transparent',
                text: ()=>{
                    return `<button class="btn btn-success"> <i class="fa fa-file-excel-o  "></i></button>`
                },
                exportOptions : {
                    modifier : {
                        page : 'all', // 'all', 'current'
                        search : 'applied' // 'none', 'applied', 'removed'
                    },
                    columns: [ 0,1, 2, 3, 4, 5, 6, 7 ]
                }
            },
            {
                extend:'pdf',
                className:'bg-transparent',
                text: ()=>{
                    return `<button class="btn btn-danger "><i class="fa fa-file-pdf-o"></i></button>`
                },
                exportOptions : {
                    modifier : {
                        page : 'all', // 'all', 'current'
                        search : 'applied' // 'none', 'applied', 'removed'
                    },
                    columns: [ 0,1, 2, 3, 4, 5, 6, 7 ]
                }
            },
            {
                extend:'print',
                className:'bg-transparent',
                text: ()=>{
                    return ` <button class="btn btn-dark"><i class="fa fa-print"></i></button>`
                },
                exportOptions : {
                    modifier : {
                        page : 'all', // 'all', 'current'
                        search : 'applied' // 'none', 'applied', 'removed'
                    },
                    columns: [ 0,1, 2, 3, 4, 5, 6, 7 ]
                }
            },
            {
                className: 'bg-transparent',
                text: () => {
                    return ` 
                        <div class="mui-col-md-12 float-right"style="width: 100%; display: flex; flex-grow: 1;">
                            <div class="mui-col-md-4 col-sm-12 mui-select ">
                                <select id="productSelect">
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="50">50</option>
                                    <option value="-1">All</option>
                                </select>
                                <label for="productSelect"> Rows </label>
                            </div>
                            <div class="mui-col-md-8 col-sm-12 mui-textfield mui-textfield--float-label">
                                <input type="text" id="productSearch" />
                                <label for="search">search products</label>
                            </div>
                
                    </div>`
                }
            }

        ],

        columns: [
            {data: 'organization', render: function(data1){
                return `<span>${data1?.name}</span>`
                }},
            {data: 'businessUnit', render: function(data1){
                return `<span>${data1?.name}</span>`
                }},
            {data: 'name'},
            {data: 'productType'},
            {data: 'description'},
            {data: 'packaging'},
            {data: 'price', render: $.fn.dataTable.render.number(null, '.', 2, '$ ')},
            {data: 'status'},
            {data: 'reOderLevel'},
            {data: 'stock'},
            { 'data': 'id',
                title: 'Add',
                wrap: true,
                "render": function (data) {
                    return `<a  onclick="activateAddInventory('${data}')" class="btn btn-outline-success" ><i class="fa fa-plus-circle "></i></a>`
                } },

            { 'data': 'id',
                title: 'Edit',
                wrap: true,
                "render": function (data) {
                    return `<a href="${pdcontext}/product-creation?productId=${data}" class="btn btn-outline-primary" ><i class="fa fa-pencil-square-o"></i></a>`
                } },
            { 'data': 'id',
                title: 'Deactivate',
                wrap: true,
                "render": function (data) {
                    return `<a href="#" class="btn btn-outline-danger" ><i class="fa fa-trash-o" ></i></a>`
                } },

        ],


    });

    $('select[name="productList_length"]').css('width','60px')

    $('#productSelect').on('change', ()=>{
        let rows=$('#productSelect').val()
        productTable.page.len(rows).draw()
    })

    $('#productSearch').keyup(function(){
        productTable.search($(this).val()).draw() ;
    })
}


function activateAddInventory(data){

    let addInventoryModal = new bootstrap.Modal(document.getElementById('addInventoryModal'), { keyboard: false})
    addInventoryModal.show();
    let url=`${pdcontext}/inventory/get-product-by-id?productId=`+data
    $.ajax({
        'url': url,
        'method': "GET",
        'contentType': 'application/json'
    }).done(function (product) {

        $("#productdescription").html(product.description);
        $('#productPackaging').html('Packaging::'+product?.packaging);
        $('#productName').html(product?.name);
        $('#ProductInventoryPrice').html('Price::'+product?.price)
        $('#ProductInventoryCost').html('Cost::'+product?.cost)

        $('#productCost').click()
        $('#productCost').val(Number(product?.cost)+0);
        $('#productPrice').click()
        $('#productPrice').val(Number(product?.price)+0);
        $('#productQuantity').click()
        $('#productId').val(product?.id)
        $("#inventoryDescription").focus();
    })
}

function addInventory(){
    let productId=$('#productId').val();
    let cost=$('#productCost').val();
    let price=$('#productPrice').val();
    let quantity=$('#productQuantity').val();
    let description=$('#inventoryDescription').val()
    let fcode=$('#productForeignCode').val()

    if(productId && cost && price && quantity) {
        let url = `${pdcontext}/inventory/add-inventory?productId=` + productId + "&cost=" + cost + "&price=" + price + "&quantity=" + quantity + "&description=" + description+"&fcode="+fcode;
        $.ajax({
            'url': url,
            'method': "GET",
            'contentType': 'application/json'
        }).done(function (products) {
            populateProducts(products);
            if (products) {
                showOperationStatusDialog('Operation Feedback','Inventory added successfully!',`${quantity} items have been added to the inventory`,'info',3000);
            } else {
                showOperationStatusDialog('Operation Feedback','Error while adding inventory!',`Failed adding ${quantity} items to the inventory`,'danger',3000);
            }
        })
    }else{
        $showOperationStatusDialog('Data Validation Failed','Your data does not make sense',`Quantity and product cannot be empty when adding inventory`,'danger',3000);
    }
}




