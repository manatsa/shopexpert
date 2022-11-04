<%@include file="../template/header.jspf" %>


    <div class="container-fluid">
        <div class="d-flex justify-content-center mui-col-md-12 text-success text-decoration-underline btn-outline-light"><h3>${pageTitle}</h3></div>
        <div style="margin-bottom: 50px;">
            <div class="col-md-12 justify-content-md-around" >
                <%@include file="../template/notification.jspf"%>
<%--                <a id="productEditBtn" class="btn btn-success"><i class="fa fa-plus-circle "></i> Product</a>--%>
            </div>

            <table id="productList" class="mui-table mui-table--bordered" style="width:100%;">
                <thead>
                <th>Organization</th>
                <th>Business Unit</th>
                <th>Product Name</th>
                <th>Product Type</th>
                <th>Details</th>
                <th>Packaging</th>
                <th>Product Price</th>
                <th>Product Status</th>
                <th>Re Order Level</th>
                <th>Quantity</th>
                <th>Add Items</th>
                <th>Add</th>
                <th>Minus</th>
                <th>Edit</th>
                <th>Trash</th>
                </thead>
                <tbody>
                <tfoot>
                <th>Product Name</th>
                <th>Product Type</th>
                <th>Details</th>
                <th>Packaging</th>
                <th>Product Price</th>
                <th>Product Status</th>
                <th>Re Order Level</th>
                <th>Quantity</th>
                <th>Add Items</th>
                <th>Add</th>
                <th>Minus</th>
                <th>Edit</th>
                <th>Trash</th>
                </tfoot>
            </table>
        </div>

    </div>


<!-- Include the footer  -->
<%@include file="../template/footer.jspf" %>

