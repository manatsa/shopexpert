var orgTable=null
$(document).ready(function () {
    $.ajax({
        'url': "/organizations/list",
        'method': "GET",
        'contentType': 'application/json'
    }).done(function (data) {
        orgTable=$('#orgList').DataTable({
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
                        return ` <a class="btn btn-success text-white"><i class="fa fa-plus-circle "></i> Organization</a>`
                    },
                    action: function ( e, dt, node, config ) {
                        location.href="/orgs-creation"
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
                            text: 'Toggle Status',
                            action: function ( e, dt, node, config ) {
                                dt.column( 2 ).visible( ! dt.column( 2 ).visible() );
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
                        columns: [ 0,1, 2]
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
                        columns: [ 0,1, 2]
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
                        columns: [ 0,1, 2]
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
                        columns: [ 0,1, 2 ]
                    }
                },
                {
                    className: 'bg-transparent',
                    text: ()=>{
                        return ` <button class="btn btn-outline-danger"><i class="fa fa-times-circle-o"> Deselect</i></button>`
                    },
                    action: ()=>{
                        orgTable.$('tr.selected').removeClass('selected');
                    }
                }
            ],

            columns: [
                {data: 'dateCreated'},
                {data: 'name'},
                {data: 'status'},
                { 'data': 'id',
                    title: 'Edit',
                    wrap: true,
                    "render": function (data) {
                                return `<a href="/orgs-creation?productId=${data}" class="btn btn-outline-primary" ><i class="fa fa-pencil-square-o"></i></a>`
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

    $('#orgList tbody').on('click', 'tr', function () {
        orgTable.$('tr.selected').removeClass('selected');
        $(this).toggleClass('selected');
    });


    $('#orgList tbody').on('mouseenter', 'td', function () {
        var colIdx = orgTable?.cell(this)?.index()?.column;

        $(orgTable?.cells()?.nodes())?.removeClass('highlight');
        $(orgTable?.column(colIdx)?.nodes())?.addClass('highlight');
    });







})