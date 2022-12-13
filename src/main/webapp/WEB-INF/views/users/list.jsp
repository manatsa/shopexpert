<%@include file="../template/header.jspf" %>


    <div class="container-fluid">
        <div>
            <div class="d-flex justify-content-center mui-col-md-12 text-success text-decoration-underline btn-outline-light"><h3>${pageTitle}</h3></div>
            <div class="col-md-12 justify-content-md-around">
                <%@include file="../template/notification.jspf"%>
            </div>

            <div class="modal .modal-lg fade" id="showUserModal" data-bs-backdrop="static" data-bs-keyboard="false"
                 tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header bg-success d-flex justify-content-between">
                            <h5 class="modal-title">View User</h5>
                            <button type="button" class="btn-close pull-right" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mui-panel bg-light bg-opacity-10 text-primary bold rounded">
                                <table class="mui-table mui-table--bordered">
                                    <thead>
                                    <th>PROPERTY NAME</th>
                                    <th>PROPERTY VALUE</th>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>Date Created</td>
                                        <td><span id="userShowDateCreated"></span></td>
                                    </tr>
                                    <tr>
                                        <td>First Name</td>
                                        <td><span id="userShowFirstName"></span></td>
                                    </tr>
                                    <tr>
                                        <td>Last Name</td>
                                        <td><span id="userShowLastName"></span></td>
                                    </tr>
                                    <tr>
                                        <td>User Name</td>
                                        <td><span id="userShowUserName"></span></td>
                                    </tr>
                                    <tr>
                                        <td>User Level</td>
                                        <td><span id="userShowUserLevel"></span></td>
                                    </tr>
                                    <tr>
                                        <td>User Type</td>
                                        <td><span id="userShowUserType"></span></td>
                                    </tr>
                                    <tr>
                                        <td>Is Active</td>
                                        <td><span id="userShowActive"></span></td>
                                    </tr>
                                    <tr>
                                        <td>User Roles</td>
                                        <td><span id="userShowUserRoles"></span></td>
                                    </tr>
                                    <tr>
                                        <td>User Privileges</td>
                                        <td><span id="userShowPrivileges"></span></td>
                                    </tr>
                                    <tr>
                                        <td>Organization</td>
                                        <td><span id="userShowOrganization"></span></td>
                                    </tr>
                                    <tr>
                                        <td>Business Unit</td>
                                        <td><span id="userShowBusinessUnit"></span></td>
                                    </tr>


                                    </tbody>
                                </table>
                            </div>
                            <div class="modal-footer d-flex justify-content-between">
                                <button type="button" class="mui-btn mui-btn--danger" data-bs-dismiss="modal">Close
                                </button>
                                <button type="button" class="mui-btn mui-btn--primary" data-bs-dismiss="modal"> OK
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <table id="userList" class="mui-table mui-table--bordered" style="width:100%">
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

