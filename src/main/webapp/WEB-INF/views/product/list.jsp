<%@include file="../template/header.jspf" %>


    <div class="container-fluid">
        <div class="d-flex justify-content-center mui-col-md-12 text-success text-decoration-underline btn-outline-light"><h3>${pageTitle}</h3></div>
        <div style="margin-bottom: 20px;">
            <div class="col-md-12 justify-content-md-around" >
                <%@include file="../template/notification.jspf"%>
<%--                <a id="productEditBtn" class="btn btn-success"><i class="fa fa-plus-circle "></i> Product</a>--%>
            </div>

            <div class="d-flex justify-content-center align-content-center">
                <div class="toast " role="alert" aria-live="assertive" aria-atomic="true" id="addInventoryError" data-bs-delay=3000 style="z-index: 11">
                    <div class="toast-header bg-danger text-white">
                        <i class="fa fa-times-circle-o text-white" style="font-size: 30px"></i>
                        <strong class="me-auto">Operation Feedback</strong>
                        <small>just now...</small>
                        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div class="toast-body">
                        <p class="text-danger">Failed to add Inventory! Please make sure all necessary fields are populated.</p>
                    </div>
                </div>
            </div>


            <div class="modal .modal-lg fade" id="addInventoryModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header bg-success d-flex justify-content-between">
                            <h5 class="modal-title" id="staticBackdropLabel">Add Inventory</h5>
                            <button type="button" class="btn-close pull-right" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mui-panel bg-info bg-opacity-10 text-white bold rounded">
                                <div class="mui-col-md-6">
                                    <h3><span id="productName"></span></h3>
                                    <h5><span id="productdescription"></span></h5>
                                    <span class="small" id="productPackaging"></span>
                                    <span id="productId" class="visually-hidden"></span>
                                </div>
                                <sec:authorize access="hasAuthority('ADMIN') or hasAuthority('COSTS')">
                                    <div class="mui-col-md-6">
                                        <h3><span id="ProductInventoryPrice"></span></h3>
                                        <span class="small" id="ProductInventoryCost"></span>
                                    </div>
                                </sec:authorize>


                            </div>

                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mui-textfield mui-textfield--float-label">
                                        <input id="inventoryDescription"/>
                                        <label for="inventoryDescription">Inventory Description</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mui-textfield mui-textfield--float-label">
                                        <input  id="productQuantity" required="true"/>
                                        <label for="productQuantity">Product Quantity</label>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mui-textfield">
                                        <input  id="productCost" required="true"/>
                                        <label for="productCost">Product Cost</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mui-textfield">
                                        <input  id="productPrice" required="true"/>
                                        <label for="productPrice">Product Price</label>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mui-textfield">
                                        <input  id="productForeignCode" required="true"/>
                                        <label for="productForeignCode">Foreign Code</label>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div class="modal-footer d-flex justify-content-between">
                            <button type="button" class="mui-btn mui-btn--danger" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="mui-btn mui-btn--primary" data-bs-dismiss="modal" onclick="addInventory()" > Add </button>
                        </div>
                    </div>
                </div>
            </div>

            <table id="productList" class="mui-table mui-table--bordered" style="width:100%;">
                <thead>
                <th>Organziation</th>
                <th>Business Unit</th>
                <th>Product Name</th>
                <th>Product Type</th>
                <th>Details</th>
                <th>Packaging</th>
                <th>Product Price</th>
                <th>Product Status</th>
                <th>Re Order Level</th>
                <th>Quantity</th>
                <th>Add</th>
                <th>Edit</th>
                <th>Trash</th>
                </thead>
                <tbody>
                <tfoot>
                <th>Organziation</th>
                <th>Business Unit</th>
                <th>Product Name</th>
                <th>Product Type</th>
                <th>Details</th>
                <th>Packaging</th>
                <th>Product Price</th>
                <th>Product Status</th>
                <th>Re Order Level</th>
                <th>Quantity</th>
                <th>Add</th>
                <th>Edit</th>
                <th>Trash</th>
                </tfoot>
            </table>
        </div>

    </div>


<!-- Include the footer  -->
<%@include file="../template/footer.jspf" %>

