var supplierTable=null
let spcontext=null;
$(document).ready(function () {
    spcontext=$('#context').val()
    $.ajax({
        'url': `${spcontext}/suppliers/list`,
        'method': "GET",
        'contentType': 'application/json'
    }).done(function (data) {
        supplierTable=$('#supplierList').DataTable({
            data: data,
            "bFilter" : true,
            processing:true,
            ordering: true,
            info: true,
            select: true,
            searching: true,
            colReorder: true,
            lengthMenu: [
                [5,10, 25, 50, -1],
                [5,10, 25, 50, 'All'],
            ],
            dom: 'Brtip',
            buttons: [
                {
                    className:'bg-transparent',
                    text: ()=>{
                        return ` <a class="btn btn-success text-white"><i class="fa fa-plus-circle "></i> Supplier</a>`
                    },
                    action: function ( e, dt, node, config ) {
                        location.href=`${spcontext}/suppliers-creation`
                    }
                },
                {
                    className:'bg-transparent',
                    text: ()=>{
                        return ` <a class="btn btn-outline-primary"><i class="fa fa-bars "></i> Rows</a>`
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
                            text: 'Toggle Date Created',
                            action: function ( e, dt, node, config ) {
                                dt.column(0 ).visible( ! dt.column( 0 ).visible() );
                            }
                        },
                        {
                            text: 'Toggle Name',
                            action: function ( e, dt, node, config ) {
                                dt.column( 1 ).visible( ! dt.column( 1 ).visible() );
                            }
                        },
                        {
                            text: 'Toggle Type',
                            action: function ( e, dt, node, config ) {
                                dt.column( 2 ).visible( ! dt.column( 2 ).visible() );
                            }
                        },
                        {
                            text: 'Toggle Status',
                            action: function ( e, dt, node, config ) {
                                dt.column( 3 ).visible( ! dt.column( 3 ).visible() );
                            }
                        },
                        {
                            text: 'Toggle Address',
                            action: function ( e, dt, node, config ) {
                                dt.column( 4 ).visible( ! dt.column( 4 ).visible() );
                            }
                        },
                        {
                            text: 'Toggle Phone',
                            action: function ( e, dt, node, config ) {
                                dt.column( 5 ).visible( ! dt.column( 5 ).visible() );
                            }
                        },
                        {
                            text: 'Toggle Email',
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
                        columns: [ 0,1, 2, 3, 4, 5, 6]
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
                        columns: [ 0,1, 2, 3, 4, 5, 6]
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
                        columns: [ 0,1, 2, 3, 4, 5, 6]
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
                        columns: [ 0,1, 2, 3, 4, 5, 6]
                    }
                },
                {
                    className: 'bg-transparent',
                    text: ()=>{
                        return ` <button class="btn btn-outline-danger"><i class="fa fa-times-circle-o"> Deselect</i></button>`
                    },
                    action: ()=>{
                        supplierTable.$('tr.selected').removeClass('selected');
                    }
                }
            ],

            columns: [
                {data: 'dateCreated'},
                {data: 'name'},
                {data:'type'},
                {data: 'status'},
                {data: 'address'},
                {data:'phone'},
                {data: 'email'},
                { 'data': 'id',
                    title: 'Edit',
                    wrap: true,
                    "render": function (data) {
                                return `<a href="${spcontext}/suppliers-creation?supplierId=${data}" class="btn btn-outline-primary" ><i class="fa fa-pencil-square-o"></i></a>`
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

    $('#supplierList tbody').on('click', 'tr', function () {
        supplierTable.$('tr.selected').removeClass('selected');
        $(this).toggleClass('selected');
    });


    $('#supplierList tbody').on('mouseenter', 'td', function () {
        var colIdx = supplierTable?.cell(this)?.index()?.column;

        $(supplierTable?.cells()?.nodes())?.removeClass('highlight');
        $(supplierTable?.column(colIdx)?.nodes())?.addClass('highlight');
    });


})