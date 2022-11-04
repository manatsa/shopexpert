<%@include file="../template/header.jspf" %>


    <div class="container-fluid">
        <div class="padded">
            <div class="padded col-md-12 justify-content-md-around">
                <%@include file="../template/notification.jspf"%>
<%--                <a id="productEditBtn" class="btn btn-success"><i class="fa fa-plus-circle "></i> Product</a>--%>
            </div>

            <table id="userList" class="table-responsive table-striped mui-table mui-table--bordered" style="width:100%">
                <thead>
                    <th>Organization</th>
                    <th>Business Unit</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>User Type</th>
                    <th>User Level</th>
                    <th>User Roles</th>
                    <th>Active</th>
                    <th>Creation Date</th>
                    <th> View </th>
                    <th> Edit </th>
                    <th>Activate</th>
                    <th>Reset Pass</th>
                    <th>Trash</th>
                </thead>
                <tbody>
                <tfoot>
                    <th>Organization</th>
                    <th>Business Unit</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>User Type</th>
                    <th>User Level</th>
                    <th>User Roles</th>
                    <th>Active</th>
                    <th>Creation Date</th>
                    <th> View </th>
                    <th> Edit </th>
                    <th>Activate</th>
                    <th>Reset Pass</th>
                    <th>Trash</th>
                </tfoot>
            </table>
        </div>

    </div>


<!-- Include the footer  -->
<%@include file="../template/footer.jspf" %>

