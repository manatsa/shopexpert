<%@include file="../template/header.jspf" %>


    <div class="container">
        <div class="padded">
            <div class="padded col-md-12 justify-content-md-around">
                <%@include file="../template/notification.jspf"%>
<%--                <a id="productEditBtn" class="btn btn-success"><i class="fa fa-plus-circle "></i> Product</a>--%>
            </div>
            <table id="unitTable" class="display table-responsive table-striped table-striped-columns" style="width:100%">
                <thead>
                <th>Date Created</th>
                <th>B/Unit Name</th>
                <th>Status</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Edit</th>
                <th>Trash</th>
                </thead>
                <tbody>
                <tfoot>
                <th>Date Created</th>
                <th>B/Unit Name</th>
                <th>Status</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Edit</th>
                <th>Trash</th>
                </tfoot>
            </table>
        </div>

    </div>


<!-- Include the footer  -->
<%@include file="../template/footer.jspf" %>

