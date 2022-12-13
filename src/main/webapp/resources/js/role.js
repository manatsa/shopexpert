let roleTable=null
let rocontext=null;
$(document).ready(function () {
    rocontext=$('#context').val()
   populateRoles(null);

    $('#roleList tbody').on('click', 'tr', function () {
        roleTable.$('tbody tr.selected').removeClass('selected');
        roleTable.$('tbody tr').removeClass('select');
        $(this).toggleClass('select');
    });
})




function populateRoles(items) {
    if(roleTable){
        roleTable.destroy()
    }
    if(!items){
        $.ajax({
            'url': `${rocontext}/role/list`,
            'method': "GET",
            'contentType': 'application/json'
        }).done(function (data) {
            createRoleTable(data)
        });
    }else{
        createRoleTable(items)
    }

}



function createRoleTable(data) {
    roleTable=$('#roleList').DataTable({
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
                    return ` <a class="btn btn-success text-white"><i class="fa fa-plus-circle "></i> Role</a>`
                },
                action: function ( e, dt, node, config ) {
                    location.href="/sems/roles-creation"
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
                                <select id="roleSelect">
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="50">50</option>
                                    <option value="-1">All</option>
                                </select>
                                <label for="roleSelect"> Rows </label>
                            </div>
                            <div class="mui-col-md-8 col-sm-12 mui-textfield mui-textfield--float-label">
                                <input type="text" id="roleSearch" />
                                <label for="search">search roles</label>
                            </div>
                
                    </div>`
                }
            }

        ],

        columns: [
            {data: 'dateCreated', render:(date)=>{
                    let newDate=new Date(date)?.toISOString();
                    return `<span>${newDate?newDate?.split('T')[0]:''}</span>`
                }},
            {data: 'name'},
            {data: 'active'},
            { 'data': 'id',
                title: 'Edit',
                wrap: true,
                "render": function (data) {
                    return `<a href="${rocontext}/roles-creation?roleId=${data}" class="btn btn-outline-primary" ><i class="fa fa-pencil-square-o"></i></a>`
                } },
            { 'data': 'id',
                title: 'Trash',
                wrap: true,
                "render": function (data) {
                    return `<a href="#" class="btn btn-outline-danger" ><i class="fa fa-trash-o" ></i></a>`
                } },

        ],


    });

    $('select[name="roleList_length"]').css('width','60px')

    $('#roleSelect').on('change', ()=>{
        let rows=$('#roleSelect').val()
        roleTable.page.len(rows).draw()
    })

    $('#roleSearch').keyup(function(){
        roleTable.search($(this).val()).draw() ;
    })
}

