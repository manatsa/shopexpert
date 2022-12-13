<%@include file="../template/header.jspf" %>


    <div class="container-fluid">
        <div class="d-flex justify-content-center mui-col-md-12 text-success text-decoration-underline btn-outline-light"><h3>${pageTitle}</h3></div>
        <div style="margin-bottom: 50px;">
            <div class="col-md-12 justify-content-md-around" >
                <%@include file="../template/notification.jspf"%>
            </div>

            <div class="d-flex justify-content-center align-content-center">
                <div class="toast " role="alert" aria-live="assertive" aria-atomic="true" id="minusInventoryError" data-bs-delay=3000 style="z-index: 11">
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
            <div class="modal .modal-lg fade" id="minusInventoryModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header bg-success d-flex justify-content-between">
                            <h5 class="modal-title" id="staticBackdropLabel">Remove Inventory</h5>
                            <button type="button" class="btn-close pull-right" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mui-panel bg-info bg-opacity-10 text-white bold">
                                <div class="mui-col-md-6">
                                    <h3><span id="productInventoryName"></span></h3>
                                    <h5><span id="productInventoryDescription"></span></h5>
                                    <span class="small" id="productInventoryPackaging"></span>
                                    <span id="productInventoryId" class="visually-hidden"></span>
                                </div>
                                <div class="mui-col-md-6">
                                    <h5><span id="inventoryProductInventoryCost"></span></h5>
                                    <h5><span id="inventoryProductInventoryPrice"></span></h5>
                                </div>

                            </div>

                            <div class="row">

                                <div class="col-md-6">
                                    <div class="mui-textfield mui-textfield--float-label">
                                        <input type="number" id="productInventoryQuantity" required="true"/>
                                        <label for="productInventoryQuantity">Product Quantity</label>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="modal-footer d-flex justify-content-between">
                            <button type="button" class="mui-btn mui-btn--danger" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="mui-btn mui-btn--primary" data-bs-dismiss="modal" onclick="minusInventory()" > Add </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal .modal-lg fade" id="moreInventoryModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header bg-success d-flex justify-content-between">
                            <h5 class="modal-title" >Add Inventory</h5>
                            <button type="button" class="btn-close pull-right" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mui-panel bg-info bg-opacity-10 text-white bold rounded">
                                <div class="mui-col-md-6">
                                    <h3><span id="moreProductName"></span></h3>
                                    <h5><span id="moreProductdescription"></span></h5>
                                    <span class="small" id="moreProductPackaging"></span>
                                    <span id="moreInventoryId" class="visually-hidden"></span>
                                </div>
                                <sec:authorize access="hasAuthority('ADMIN') or hasAuthority('COSTS')">
                                    <div class="mui-col-md-6">
                                        <h3><span id="moreProductInventoryPrice"></span></h3>
                                        <span class="small" id="moreProductInventoryCost"></span>
                                    </div>
                                </sec:authorize>


                            </div>

                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mui-textfield mui-textfield--float-label">
                                        <input id="moreInventoryDescription"/>
                                        <label for="moreInventoryDescription">Inventory Description</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mui-textfield mui-textfield--float-label">
                                        <input type="number" id="moreProductQuantity" required="true"/>
                                        <label for="moreProductQuantity">Product Quantity</label>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="modal-footer d-flex justify-content-between">
                            <button type="button" class="mui-btn mui-btn--danger" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="mui-btn mui-btn--primary" data-bs-dismiss="modal" onclick="addMoreInventory()" > Add </button>
                        </div>
                    </div>
                </div>
            </div>


            <table id="inventoryList" class="mui-table mui-table--bordered" style="width:100%;">
                <thead>
                <th>Organization</th>
                <th>Business Unit</th>
                <th>Product Quantity</th>
                <th>Description</th>
                <th>Product Details</th>
                <th>Price</th>
                <th>Product Name</th>
                <th>Product Description</th>
                <th>Product Packaging</th>
                <th>View Item</th>
                <th>Add Inventory</th>
                <th>Minus Inventory</th>
                <th>Trash</th>
                </thead>
                <tbody>
                <tfoot>
                <th>Organization</th>
                <th>Business Unit</th>
                <th>Product Quantity</th>
                <th>Description</th>
                <th>Product Details</th>
                <th>Price</th>
                <th>Product Name</th>
                <th>Product Description</th>
                <th>Product Packaging</th>
                <th>View Item</th>
                <th>Add Inventory</th>
                <th>Minus Inventory</th>
                <th>Trash</th>
                </tfoot>
            </table>
        </div>

    </div>


<!-- Include the footer  -->
<%@include file="../template/footer.jspf" %>

