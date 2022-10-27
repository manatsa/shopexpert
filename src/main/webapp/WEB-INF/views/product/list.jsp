<%@include file="../template/header.jspf" %>


    <div class="container">
        <div class="padded">
            <div class="padded col-md-12 justify-content-md-around">
                <%@include file="../template/notification.jspf"%>
<%--                <a id="productEditBtn" class="btn btn-success"><i class="fa fa-plus-circle "></i> Product</a>--%>
            </div>
            <table id="productList" class="display table-responsive table-striped table-striped-columns" style="width:100%">
                <thead>
                <th>Product Name</th>
                <th>Product Type</th>
                <th>Details</th>
                <th>Packaging</th>
                <th>Product Price</th>
                <th>Product Status</th>
                <th>Re Order Level</th>
                <th>Quantity</th>
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
