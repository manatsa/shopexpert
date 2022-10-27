var saleTable=null
$(document).ready(function () {
    $.ajax({
        'url': "/limousine/sales/list",
        'method': "GET",
        'contentType': 'application/json'
    }).done(function (data) {
        saleTable=$('#saleList').DataTable({
            data: data,
            "bFilter" : true,
            processing:true,
            ordering: true,
            info: true,
            select: true,
            colReorder: true,
            pageResize: true,
            lengthMenu: [
                [5,10, 25, 50, -1],
                [5,10, 25, 50, 'All'],
            ],
            dom: 'Bfrtip',
            buttons: [
                {
                    className:'bg-transparent',
                    text: ()=>{
                        return ` <a id="productEditBtn" class="btn btn-success text-white"><i class="fa fa-plus-circle "></i> Sale</a>`
                    },
                    action: function ( e, dt, node, config ) {
                        location.href="/limousine/sale-creation"
                    }
                },
                {
                    className:'bg-transparent',
                    text: ()=>{
                        return ` <a id="productEditBtn" class="btn btn-outline-primary"><i class="fa fa-bars "></i> Rows</a>`
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
                {
                    extend:'copy',
                    className:'bg-transparent',
                    text: ()=>{
                        return `<button class="btn btn-outline-dark"><i class="fa fa-files-o"></i></button>`
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
                    text: ()=>{
                        return ` <button class="btn btn-outline-danger"><i class="fa fa-times-circle-o"> Deselect</i></button>`
                    },
                    action: ()=>{
                        saleTable.$('tr.selected').removeClass('selected');
                    }
                }
            ],

            columns: [
                {data: 'dateCreated'},
                {data: 'receiptNumber'},
                {data: 'saleDate'},
                {data: 'saleStatus'},
                {'data': 'saleItems', 'render': (data)=>{

                    return `<table><tbody><th>Product Name</th><th>Price</th><th>Quantity</th><th>Total/Item</th>
                        ${data.map(item=>{
                            return `<tr><td>${item?.printName}</td><td>${item?.product?.price?.toFixed(2)}</td><td>${item?.quantity?.toFixed(0)}</td><td>${(item?.product?.price * item?.quantity)?.toFixed(2)}</td></tr>`
                    })}
                    </tbody></table>`
                    }},
                {'data': 'saleItems', 'render': (data)=>{
                    return `<spa>${data.map(item=>item.product.price * item.quantity).reduce((a,b)=>a+b)?.toFixed(2)}</spa>`
                    }},
                /*{ 'data': 'id',
                    title: 'Add',
                    wrap: true,
                    "render": function (data) {
                        return `<a href="/limousine/product-inventory-add?productId=${data}" class="btn btn-outline-success" ><i class="fa fa-plus-circle "></i></a>`
                    } },
                { 'data': 'id',
                    title: 'Minus',
                    wrap: true,
                    "render": function (data) {
                        return `<a href="/limousine/product-inventory-subtract?productId=${data}" class="btn btn-outline-success" ><i class="fa fa-minus-circle "></i></a>`
                    } },*/
                { 'data': 'id',
                    title: 'Edit',
                    wrap: true,
                    "render": function (data) {
                        return `<a href="/limousine/product-creation?productId=${data}" class="btn btn-outline-primary" ><i class="fa fa-pencil-square-o"></i></a>`
                    } },
                { 'data': 'id',
                    title: 'Trash',
                    wrap: true,
                    "render": function (data) {
                        return `<a href="#" class="btn btn-outline-danger" ><i class="fa fa-trash-o" ></i></a>`
                    } },

            ],


        });
    });

    $('#saleList tbody').on('click', 'tr', function () {
        saleTable.$('tr.selected').removeClass('selected');
        $(this).toggleClass('selected');
    });


    $('#saleList tbody').on('mouseenter', 'td', function () {
        var colIdx = saleTable?.cell(this)?.index()?.column;

        $(saleTable?.cells()?.nodes())?.removeClass('highlight');
        $(saleTable?.column(colIdx)?.nodes())?.addClass('highlight');
    });






})

function onOrganizationSelectChange(element){
    console.log(element.value)
    $.ajax({
        'url':'/limousine/units/list-by-organization?org='+element.value,
        'method': "GET",
        'contentType': 'application/json'
    }).done(function (data) {
        let htmlOptions='';
            data.map(item=>{
            return `<option value='${item.id}'>${item.name}</option>`
        }).forEach(opt=>{
            htmlOptions+=opt;
            })
        $('#bUnitsSelect').html(htmlOptions)
    })
}