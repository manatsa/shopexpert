<%@include file="../template/header.jspf" %>


    <div class="container">
        <div class="padded">
            <div class="padded col-md-12 justify-content-md-around">
                <%@include file="../template/notification.jspf"%>
<%--                <a id="productEditBtn" class="btn btn-success"><i class="fa fa-plus-circle "></i> Product</a>--%>
            </div>

            <div class="modal .modal-lg fade" id="addInventoryModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header bg-success">
                            <h5 class="modal-title" >Add Product Inventory</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mui-textfield mui-textfield--float-label">
                                <input type="number" id="addInventoryInput" min="1" />
                                <label for="addInventoryInput">Enter Quantity to Add</label>
                            </div>
                        </div>
                        <div class="modal-footer d-flex justify-content-between">
                            <button type="button" class="btn btn-outline-success"  data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-outline-success" onclick="add"  data-bs-dismiss="modal">Change</button>
                        </div>
                    </div>
                </div>
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

