let productTable=null
$(document).ready(function () {
   populateProducts();

    $('#productList tbody').on('click', 'tr', function () {
        productTable.$('tbody tr.selected').removeClass('selected');
        productTable.$('tbody tr').removeClass('select');
        $(this).toggleClass('select');
    });
})


function populateProducts(items) {
    showLoading(true)
    if(productTable){
        productTable.destroy()
    }
    if(!items){
        $.ajax({
            'url': "/products/list",
            'method': "GET",
            'contentType': 'application/json'
        }).done(function (data) {
            createTable(data)
        });
    }else{
        createTable(items)
    }

    showLoading(false)
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
        lengthMenu: [
            [5,10, 25, 50, -1],
            [5,10, 25, 50, 'All'],
        ],
        dom: 'Bfrtip',
        buttons: [
            {
                className:'bg-transparent',
                text: ()=>{
                    return ` <a class="btn btn-success text-white"><i class="fa fa-plus-circle "></i> Product</a>`
                },
                action: function ( e, dt, node, config ) {
                    location.href="/product-creation"
                }
            },
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
        ],

        columns: [
            {data: 'name'},
            {data: 'productType'},
            {data: 'description'},
            {data: 'packaging'},
            {data: 'price'},
            {data: 'status'},
            {data: 'reOderLevel'},
            {data: 'stock'},
            { 'data': 'id',
                title: 'Quantity',
                wrap: true,
                "render": function (data) {
                    return `<input id='${data.split('-')[0]+data.split('-')[1]}' placeholder="items" class='form-control modern'  min="1"style="width: 120px" type="number" /> `
                } },
            { 'data': 'id',
                title: 'Add',
                wrap: true,
                "render": function (data) {
                    return `<a  onclick="activateAddInventory('${data}')" class="btn btn-outline-success" ><i class="fa fa-plus-circle "></i></a>`
                } },
            { 'data': 'id',
                title: 'Minus',
                wrap: true,
                "render": function (data) {
                    return `<a onclick="activateRemoveInventory('${data}')" class="btn btn-outline-dark" ><i class="fa fa-minus-circle "></i></a>`
                } },
            { 'data': 'id',
                title: 'Edit',
                wrap: true,
                "render": function (data) {
                    return `<a href="/product-creation?productId=${data}" class="btn btn-outline-primary" ><i class="fa fa-pencil-square-o"></i></a>`
                } },
            { 'data': 'id',
                title: 'Deactivate',
                wrap: true,
                "render": function (data) {
                    return `<a href="#" class="btn btn-outline-danger" ><i class="fa fa-trash-o" ></i></a>`
                } },

        ],


    });
}

function activateAddInventory(data){
    showLoading(true)
    let quant=$('#'+data.split('-')[0]+data.split('-')[1])?.val()

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

    }
    showLoading(false)

}

function activateRemoveInventory(data){
    showLoading(true)
    let quant=$('#'+data.split('-')[0]+data.split('-')[1])?.val()
    if(quant && quant>0){
        let url="/inventory/remove-inventory?productId="+data+"&quantity="+quant;
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
    }
    showLoading(false)

}

