let userTable=null

$(document).ready(function () {

    loadUsers();

    $('#userList tbody').on('click', 'tr', function () {
        userTable.$('tbody tr.selected').removeClass('selected');
        userTable.$('tbody tr').removeClass('select');
        $(this).toggleClass('select');

    });




})

function loadUsers(){
    $.ajax({
        'url': "/user/list",
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
                    location.href="/users-creation"
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
            {data: 'roles'},
            {data: 'active', render: data => {return `<span class='${String(data)=='true'?'text-success':'text-danger'}' >${String(data)=='true'?'Active': 'Inactive'} </span>` }},
            {data: 'dateCreated', render: data1=>data1?`<span>${new Date(data1).toISOString().split('T')[0]}</span>`:`<span></span>`},
            { 'data': 'id',
                title: ' View ',
                wrap: true,
                render: function (data, type,row) {
                    let rowData=JSON.stringify(row);
                    return `<a onclick="showSale('${data}')" class="btn btn-outline-primary" ><i class="fa fa-eye"></i></a>`
                } },
            { 'data': 'id',
                title: 'Edit',
                wrap: true,
                render: function (data) {

                    return `<a href="/users-creation?userId=${data}" class="btn btn-outline-secondary" ><i class="fa fa-pencil-square-o"></i></a>`
                } },
            { 'data': 'id',
                title: 'Activate',
                wrap: true,
                render: function (data, type, row) {

                    return `<a href="/users-activate?userId=${data}" class='btn ${row.active?"btn-outline-danger":"btn-outline-info"}' ><i class="fa fa-gear"></i></a>`
                } },
            { 'data': 'id',
                title: 'Reset Pass',
                wrap: true,
                render: function (data) {

                    return `<a href="/users-creation?userId=${data}" class="btn btn-outline-warning" ><i class="fa fa-undo"></i></a>`
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

function showUser(customer) {

    $('#customerName').html(`<span>${customer?.split(',')[0]}</span>`);
    $('#customerAddress').html(`<span>${customer?.split(',')[1]}</span>`);
    $('#customerType').html(`<span>${customer?.split(',')[2]}</span>`)
    $('#customerPhone').html(`<span>${customer?.split(',')[3]}</span>`);
    $('#customerEmail').html(`<span>${customer?.split(',')[4]}</span>`);
    $('#customerDateCreated').html(`<span>${new Date(customer?.split(',')[5])?.toISOString()?.split('T')[0]}</span>`);
    $('#customerStatus').html(`<span>${customer?.split(',')[6]}</span>`)

    let customerProfileModal = new bootstrap.Modal(document.getElementById('customerProfileModal'), { keyboard: false})
    customerProfileModal.show();

}

function showUser(id){
    $.ajax({
        'url': "/sales/get-sale-by-id?id="+id,
        'method': "GET",
        'contentType': 'application/json'
    }).done(function (data)
    {

        let saleBody=`
        <table class="mui-table mui-table--bordered table-responsive table-striped-columns">
        <thead>
           <th>PROPERTY</th> 
           <th>PROPERTY VALUE</th> 
        </thead>
        <tbody>
            <tr><td class="bold">Receipt Number</td><td class="bold text-danger">${data?.receiptNumber}</td></tr>
            <tr><td class="bold">Sale Date</td><td>${new Date(data?.saleDate)?.toISOString().split('T')[0]}</td></tr>
            <tr><td class="bold">Date Created</td><td>${new Date(data?.dateCreated)?.toISOString().split('T')[0]}</td></tr>
            <tr><td class="bold">Sale Status</td><td>${data?.saleStatus}</td></tr>
        </tbody>
        </table>`

        let customerBody=`
        <table class="mui-table mui-table--bordered table-responsive table-striped-columns">
            <thead>
           <th>PROPERTY</th> 
           <th>PROPERTY VALUE</th> 
        </thead>
            <tbody>
                <tr><td class="bold">Customer Name</td><td>${data?.customer?.name}</td></tr>
                <tr><td class="bold">Date Created</td><td>${new Date(data?.customer?.dateCreated)?.toISOString().split('T')[0]}</td></tr>
                <tr><td class="bold">Customer Address</td><td>${data?.customer?.address}</td></tr>
                <tr><td class="bold">Customer Type</td><td>${data?.customer?.type}</td></tr>
                <tr><td class="bold">Customer Phone</td><td>${data?.customer?.phone}</td></tr>
                <tr><td class="bold">Customer Email</td><td>${data?.customer?.email}</td></tr>
                <tr><td class="bold">Customer Status</td><td>${data?.customer?.status}</td></tr>
            </tbody>
        </table>`

        let productBody=`<table class="mui-table mui-table--bordered table-responsive table-striped-columns" border="1">
                <thead><th>Product Name</th><th>Product Price</th><th>Product Quanity</th><th> TOTAL </th></thead><tbody>`
        data?.saleItems?.map(s=>{
            return `
                 <tr><td>${s?.product?.name}</td><td>${s?.product?.price}</td><td>${s?.quantity}</td><td>$${(s?.product?.price * s?.quantity)?.toFixed(2)}</td></tr>
                `
            })?.forEach(saleItemHtml=>{
                productBody+=saleItemHtml;
        })
        productBody+=`</tbody>
            <tfoot class="text-secondary">
                <tr><th style="font-size: x-large;">Grand Total</th>
                <td></td>
                <td></td>
                <td style="font-size: x-large">$${(data?.saleItems?.map(s=>s?.product?.price * s?.quantity)?.reduce((a,b)=>a+b,0))?.toFixed(2)}</td></tr>
            </tfoot>
        </table>`

        let orgBody=`<table class="mui-table mui-table--bordered table-responsive table-striped-columns">
            <thead>
           <th>PROPERTY</th> 
           <th>PROPERTY VALUE</th> 
        </thead>
            <tbody>
                <tr><td class="bold">Organization Name</td><td>${data?.organization?.name}</td></tr>
                <tr><td class="bold">Business Unit Name</td><td>${data?.businessUnit?.name}</td></tr>
                <tr><td class="bold">Business Unit Address</td><td>${data?.businessUnit?.address}</td></tr>
                <tr><td class="bold">Business Unit Phone</td><td>${data?.businessUnit?.phone}</td></tr>
                <tr><td class="bold">Business Unit Email</td><td>${data?.businessUnit?.email}</td></tr>
           </tbody>
           </table>`

        $('#saleDetailsPane').html(saleBody);
        $('#customerDetailsPane').html(customerBody);
        $('#productDetailsPane').html(productBody);
        $('#orgDetailsPane').html(orgBody);


        let saleProfileModal = new bootstrap.Modal(document.getElementById('saleDetailsModal'), { keyboard: false})
        saleProfileModal.show();

    });


}

function onRoleSelectChange(element){
    $.ajax({
        'url':'/user/get-privileges-by-role?roleId='+element.value,
        'method': 'GET',
        'contentType': 'application/json'
    }).done(function (data) {
        let htmlOptions='';
        data?.map(item=>{
            return `<option value='${item?.id}'>${item?.name}</option>`
        }).forEach(opt=>{
            htmlOptions+=opt;
        })
        $('#privileges').html(htmlOptions)
    })
}



function openChangePassword() {
    let changePasswordModal = new bootstrap.Modal(document.getElementById('ChangePasswordModal'), {keyboard: false})
    changePasswordModal.show();
}

function changePassword() {

    let newPass = $('#passwd').val();

    $.ajax({
        'url': '/users/change-password?pass=' + newPass,
        'method': 'POST',
        'contentType': 'application/json',
        'data': newPass
    }).done(() => {
        $('#operationSuccess').toast('show');

    })
}

function showProfileModal() {
    let profileModal = new bootstrap.Modal(document.getElementById('userProfileModal'), {keyboard: true})
    profileModal.show();
}
