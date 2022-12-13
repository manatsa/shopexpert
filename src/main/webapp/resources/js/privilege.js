let privilegeTable=null
let pvcontext=null;
$(document).ready(function () {
    pvcontext=$('#context').val()
   populatePrivileges(null);

    $('#privilegeList tbody').on('click', 'tr', function () {
        privilegeTable.$('tbody tr.selected').removeClass('selected');
        privilegeTable.$('tbody tr').removeClass('select');
        $(this).toggleClass('select');
    });
})




function populatePrivileges(items) {
    if(privilegeTable){
        privilegeTable.destroy()
    }
    if(!items){
        $.ajax({
            'url': `${pvcontext}/privileges/list`,
            'method': "GET",
            'contentType': 'application/json'
        }).done(function (data) {
            createPrivilegeTable(data)
        });
    }else{
        createPrivilegeTable(items)
    }

}



function createPrivilegeTable(data) {
    privilegeTable=$('#privilegeList').DataTable({
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
                    return ` <a class="btn btn-success text-white"><i class="fa fa-plus-circle "></i> Privilege</a>`
                },
                action: function ( e, dt, node, config ) {
                    location.href=`${pvcontext}/privileges-creation`
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
                                <select id="privilegeSelect">
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="50">50</option>
                                    <option value="-1">All</option>
                                </select>
                                <label for="privilegeSelect"> Rows </label>
                            </div>
                            <div class="mui-col-md-8 col-sm-12 mui-textfield mui-textfield--float-label">
                                <input type="text" id="roleSearch" />
                                <label for="search">search privileges</label>
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
                    return `<a href="${pvcontext}/privileges-creation?privilegeId=${data}" class="btn btn-outline-primary" ><i class="fa fa-pencil-square-o"></i></a>`
                } },
            { 'data': 'id',
                title: 'Trash',
                wrap: true,
                "render": function (data) {
                    return `<a href="#" class="btn btn-outline-danger" ><i class="fa fa-trash-o" ></i></a>`
                } },

        ],


    });

    $('select[name="privilegeList_length"]').css('width','60px')

    $('#privilegeSelect').on('change', ()=>{
        let rows=$('#privilegeSelect').val()
        privilegeTable.page.len(rows).draw()
    })

    $('#roleSearch').keyup(function(){
        privilegeTable.search($(this).val()).draw() ;
    })
}


/*function activateAddInventory(data){
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

}

function activateRemoveInventory(data){
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

}*/

