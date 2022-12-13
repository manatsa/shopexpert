 inventoryTable=null
 icontext=null;
$(document).ready(function () {
    icontext=$('#context').val()
    populateInventory(null);

    $('#inventoryList tbody').on('click', 'tr', function () {
        inventoryTable.$('tbody tr.selected').removeClass('selected');
        inventoryTable.$('tbody tr').removeClass('select');
        $(this).toggleClass('select');
    });
})




function populateInventory(items) {
    if(inventoryTable){
        inventoryTable.destroy()
    }
    if(!items){
        $.ajax({
            'url': `${icontext}/inventory/list`,
            'method': "GET",
            'contentType': 'application/json'
        }).done(function (data) {
            createInventoryTable(data)
        });
    }else{
        createInventoryTable(items)
    }

}



function createInventoryTable(data) {
    if(inventoryTable){
        inventoryTable.destroy()
    }
    inventoryTable=$('#inventoryList').DataTable({
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
                    location.href=`${icontext}/product-creation`
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
                                <select id="inventorySelect">
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="50">50</option>
                                    <option value="-1">All</option>
                                </select>
                                <label for="inventorySelect"> Rows </label>
                            </div>
                            <div class="mui-col-md-8 col-sm-12 mui-textfield mui-textfield--float-label">
                                <input type="text" id="inventorySearch" />
                                <label for="search">search products</label>
                            </div>
                
                    </div>`
                }
            }

        ],

        columns: [
            {data: 'product.organization.name', render: data1 => data1?`<span>${data1}</span>`:`<span></span>`},
            {data: 'product.businessUnit.name',render: data1 => data1?`<span>${data1}</span>`:`<span></span>`},
            {data: 'quantity'},
            {data: 'description'},
            //{data: 'cost',  render: $.fn.dataTable.render.number(null, '.', 2, '$ ')},
            {data: 'price', render: $.fn.dataTable.render.number(null, '.', 2, '$ ')},
            {data: 'product.name'},
            {data: 'product.description'},
            {data: 'product.details'},
            {data: 'product.packaging'},
            { 'data': 'id',
                title: 'View Item',
                wrap: true,
                "render": function (data) {
                    return `<a   class="btn btn-outline-primary" ><i class="fa fa-eye "></i></a>`
                } },
            { 'data': 'id',
                title: ' Add ',
                wrap: true,
                "render": function (data) {
                    return `<a onclick="activateAddMoreInventory('${data}')" class="btn btn-outline-success" ><i class="fa fa-plus-circle "></i></a>`
                } },
            { 'data': 'id',
                title: 'Minus',
                wrap: true,
                "render": function (data) {
                    return `<a onclick="activateMinusInventory('${data}')" class="btn btn-outline-dark" ><i class="fa fa-minus-circle "></i></a>`
                } },

            { 'data': 'id',
                title: 'Trash',
                wrap: true,
                "render": function (data) {
                    return `<a href="#" class="btn btn-outline-danger" ><i class="fa fa-trash-o" ></i></a>`
                } },

        ],


    });

    $('select[name="inventoryList_length"]').css('width','60px')

    $('#inventorySelect').on('change', ()=>{
        let rows=$('#inventorySelect').val()
        inventoryTable.page.len(rows).draw()
    })

    $('#inventorySearch').keyup(function(){
        inventoryTable.search($(this).val()).draw() ;
    })
}


function activateMinusInventory(data){
    /*let quant=$('#'+data.split('-')[0]+data.split('-')[1])?.val()

    if(quant && quant>0){
        let url="/inventory/add-inventory?productId="+data+"&quantity="+quant;
        $.ajax({
            'url': url,
            'method': "GET",
            'contentType': 'application/json'
        }).done(function (items) {
            populateProducts(items);
            if(items) {
                $('#operationSuccess').toast('show');
            }else{
                $('#operationError').toast('show');
            }
            $('#'+data.split('-')[0]+data.split('-')[1])?.val(null)
        })
    }else{

    }*/

    let minusInventoryModal = new bootstrap.Modal(document.getElementById('minusInventoryModal'), { keyboard: false})
    minusInventoryModal.show();
    let url=`${icontext}/inventory/get-product-by-id?productId=`+data
    $.ajax({
        'url': url,
        'method': "GET",
        'contentType': 'application/json'
    }).done(function (product) {

        $("#productdescription").html(product.description);
        $('#productPackaging').html(product?.packaging);
        $('#productName').html(product?.name);
        $('#productCost').click()
        $('#productCost').val(product?.cost);
        $('#productPrice').click()
        $('#productPrice').val(product?.price);
        $('#productQuantity').click()
        $('#productQuantity').val(1)
        $('#productId').val(product?.id)
        $("#inventoryDescription").focus();
    })
}

function minusInventory(){
    let productId=$('#productId').val();
    let cost=$('#productCost').val();
    let price=$('#productPrice').val();
    let quantity=$('#productQuantity').val();
    let description=$('#inventoryDescription').val()
    if(quantity && productId){
        let url = `${icontext}/inventory/add-inventory?productId=` + productId + "&cost=" + cost + "&price=" + price + "&quantity=" + quantity + "&description=" + description;
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
        showOperationStatusDialog('Data Validation Failed','Your data does not make sense',`Quantity and product cannot be empty when adding inventory`,'danger',3000);
    }
}

function activateAddMoreInventory(data){
    let addMoreInventoryModal = new bootstrap.Modal(document.getElementById('moreInventoryModal'), { keyboard: false})
    addMoreInventoryModal.show();

    let url=`${icontext}/inventory/get-inventory-by-id?inventoryId=`+data
    $.ajax({
        'url': url,
        'method': "GET",
        'contentType': 'application/json'
    }).done(function (inventory) {
        $("#moreProductdescription").html(inventory?.product.description);
        $('#moreProductPackaging').html('Packaging::'+inventory?.product?.packaging);
        $('#moreProductName').html(inventory?.product?.name);
        $('#moreProductInventoryPrice').html('Price::$'+inventory?.price)
        $('#moreProductInventoryCost').html('Cost::$'+inventory?.cost)

        $('#moreProductQuantity').click()
        $('#moreInventoryId').val(inventory?.id)
        $("#moreInventoryDescription").focus();
    })

}

function addMoreInventory(){
    let inventoryId=$('#moreInventoryId').val();

    let quantity=$('#moreProductQuantity').val();

    if(inventoryId && quantity) {
        let url = `${icontext}/inventory/add-inventory-by-inventory?inventoryId=` + inventoryId + "&quantity=" + quantity;
        $.ajax({
            'url': url,
            'method': "GET",
            'contentType': 'application/json'
        }).done(function (items) {
            populateInventory(items);
            if (items) {
                showOperationStatusDialog('Operation Feedback','Inventory added successfully!',`${quantity} items have been added to the inventory`,'info',3000);
            } else {
                showOperationStatusDialog('Operation Feedback','Error while adding inventory!',`Failed adding ${quantity} items to the inventory`,'danger',3000);
            }
        })
    }else{
        showOperationStatusDialog('Data Validation Failed','Your data does not make sense',`Quantity and product cannot be empty when adding inventory`,'danger',3000);
    }
}

