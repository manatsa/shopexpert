let userTable=null
let uscontext=null;

$(document).ready(function () {
    uscontext=$('#context').val()

    loadUsers();

    $('#userList tbody').on('click', 'tr', function () {
        userTable.$('tbody tr.selected').removeClass('selected');
        userTable.$('tbody tr').removeClass('select');
        $(this).toggleClass('select');

    });




})

function loadUsers(){
    $.ajax({
        'url': `${uscontext}/user/list`,
        'method': "GET",
        'contentType': 'application/json'
    }).done(function (data) {
        createUsersTable(data)
    });
}

function createUsersTable(data){
    if(userTable){
        userTable.destroy();
    }
    userTable=$('#userList').DataTable({
        data: data,
        "bFilter" : true,
        processing:true,
        ordering: true,
        info: true,
        select: true,
        fixedHeader: true,
        colReorder: true,
        searching: true,
        lengthMenu: [
            [5,10, 25, 50, -1],
            [5,10, 25, 50, 'All'],
        ],
        pageLength: 10,
        dom: 'Brtip',
        buttons: [
            {
                className:'bg-transparent',
                text: ()=>{
                    return ` <a id="userEditBtn" class="btn btn-success text-white"><i class="fa fa-plus-circle "></i> User</a>`
                },
                action: function ( e, dt, node, config ) {
                    location.href=`${uscontext}/users-creation`
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
                extend: 'spacer',
                style: 'bar',
                text: ' Export Files '
            },
            {
                extend:'excel',
                className:'bg-transparent',
                text: ()=>{
                    return `<button class="btn btn-success"><i class="fa fa-download"> &nbsp <i class="fa fa-file-excel-o  "></i></button>`
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
                    return `<button class="btn btn-danger "><i class="fa fa-download"> &nbsp </i><i class="fa fa-file-pdf-o"></i></button>`
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
                            <div class="mui-col-md-12 col-sm-12 mui-textfield mui-textfield--float-label">
                                <input type="text" id="userSearch" />
                                <label for="search">search users</label>
                            </div>
                
                    </div>`
                }
            }
        ],

        columns: [
            {data: 'organization.name', render: data1=>data1?`<span>${data1}</span>`:`<span></span>`},
            {data: 'businessUnit.name', render: data1=>data1?`<span>${data1}</span>`:`<span></span>`},
            {data: 'firstName'},
            {data: 'lastName'},
            {data: 'userType'},
            {data: 'userLevel'},
            {data: 'userRoles', render: roles=>{
                let rolez=roles?.map(r => r?.name);
                return `<span>${rolez}</span>`
                }},
            {data: 'active', render: data => {return `<span class='${String(data)=='true'?'text-success':'text-danger'}' >${String(data)=='true'?'Active': 'Inactive'} </span>` }},
            {data: 'dateCreated', render: data1=>data1?`<span>${new Date(data1).toISOString().split('T')[0]}</span>`:`<span></span>`},
            { 'data': 'id',
                title: ' View ',
                wrap: true,
                render: function (data, type,row) {

                    return `<a onclick="showUser('${row?.firstName}','${row?.lastName}','${row?.userName}','${row?.userLevel}','${row?.userType}',
                        '${row?.dateCreated}','${row?.createdBy}','${row?.userRoles?.map(r=>r?.name)?.reduce((a,b)=>a+", "+b)}',
                        '${row?.userRoles?.map(r=>r?.privileges?.map(p=>p.name)?.reduce((a,b)=>a+","+b))?.reduce((a,b)=>a+","+b)}',
                        '${row?.organization?.name}','${row?.businessUnit?.name}', '${row?.active}')" 
                        class="btn btn-outline-primary" ><i class="fa fa-eye"></i></a>`
                } },
            { 'data': 'id',
                title: 'Edit',
                wrap: true,
                render: function (data) {

                    return `<a href="${uscontext}/users-creation?userId=${data}" class="btn btn-outline-secondary" ><i class="fa fa-pencil-square-o"></i></a>`
                } },
            { 'data': 'id',
                title: 'Activate',
                wrap: true,
                render: function (data, type, row) {

                    return `<a href="${uscontext}/users-activate?userId=${data}" class='btn ${row.active?"btn-outline-danger":"btn-outline-info"}' ><i class="fa fa-gear"></i></a>`
                } },
            { 'data': 'id',
                title: 'Reset Pass',
                wrap: true,
                render: function (data) {

                    return `<a href="#" onclick="openChangePassword('${data}')" class="btn btn-outline-warning" ><i class="fa fa-undo"></i></a>`
                } },
            { 'data': 'id',
                title: 'Trash',
                wrap: true,
                render: function (data) {
                    return `<a href="#" class="btn btn-outline-danger" ><i class="fa fa-trash-o" ></i></a>`
                } },

        ],


    });

    $('select[name="userList_length"]').css('width','60px')


    $('#userSearch').keyup(function(){
        userTable.search($(this).val()).draw() ;
    })
}

function showUser(fname,lname,username, userLevel, userType, dateCreated, creator, roles, privileges, org, unit, active) {

    $('#userShowActive').html(active);
    $('#userShowBusinessUnit').html(unit);
    $('#userShowDateCreated').html(dateCreated);
    $('#userShowFirstName').html(fname);
    $('#userShowLastName').html(lname);
    $('#userShowOrganization').html(org);
    $('#userShowPrivileges').html(privileges);
    $('#userShowUserName').html(username);
    $('#userShowUserRoles').html(roles);
    $('#userShowUserLevel').html(userLevel);
    $('#userShowUserType').html(userType);

    let showUserModal = new bootstrap.Modal(document.getElementById('showUserModal'), { keyboard: false})
    showUserModal.show();

}






function openChangePassword(id) {
    $('#changePassUser').val(id)
    let changePasswordModal = new bootstrap.Modal(document.getElementById('ChangePasswordModal'), {keyboard: false})
    changePasswordModal.show();
}

function changePassword() {

    let userId=$('#changePassUser').val();
    let newPass = $('#passwd').val();

    $.ajax({
        'url': `${uscontext}/users/change-password?pass=${newPass}&userId=${userId}`,
        'method': 'GET',
        'contentType': 'application/json',
    }).done(() => {
        showOperationStatusDialog('Operation Feedback','Password Changed Successfully!',`Your password has been updated to the new one.`,'info',3000);

    })
}

function showProfileModal() {
    let profileModal = new bootstrap.Modal(document.getElementById('userProfileModal'), {keyboard: true})
    profileModal.show();
}
