<%@include file="../template/header.jspf" %>


    <div class="container">
        <div>
            <div class="d-flex justify-content-center mui-col-md-12 text-success text-decoration-underline btn-outline-light"><h3>${pageTitle}</h3></div>
            <div class="col-md-12 justify-content-md-around">
                <%@include file="../template/notification.jspf"%>
            </div>
            <table id="supplierList" class="mui-table mui-table--bordered" style="width:100%">
                <thead>
                <th>Date Created</th>
                <th>Supplier Name</th>
                <th>Supplier Type</th>
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
                <th>Supplier Name</th>
                <th>Supplier Type</th>
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

