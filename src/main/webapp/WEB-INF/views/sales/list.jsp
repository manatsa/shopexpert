<%@include file="../template/header.jspf" %>


    <div class="container-fluid">
        <div>
            <div class="d-flex justify-content-center mui-col-md-12 text-success text-decoration-underline btn-outline-light"><h3>${pageTitle}</h3></div>
            <div class=" col-md-12 d-flex justify-content-md-around" style="margin-top: 5px;">
                <%@include file="../template/notification.jspf"%>
            </div>
            <div class="modal .modal-lg fade" id="customerProfileModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header bg-success d-flex justify-content-between">
                            <h5 class="modal-title" id="staticBackdropLabel">Customer Profile</h5>
                            <button type="button" class="btn-close pull-right" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <table class="mui-table mui-table--bordered" style="width: 100%">
                                <thead>
                                <th>PROPERTY</th>
                                <th>PROPERTY VALUE</th>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Customer Name</td>
                                    <td><span id="customerName" /></td>
                                </tr>
                                <tr>
                                    <td>Customer Address</td>
                                    <td><span id="customerAddress" /></td>
                                </tr>
                                <tr>
                                    <td>Customer Type</td>
                                    <td><span id="customerType" /></td>
                                </tr>
                                <tr>
                                    <td>Customer Phone</td>
                                    <td><span id="customerPhone" /></td>
                                </tr>
                                <tr>
                                    <td>Customer Email</td>
                                    <td><span id="customerEmail" /></td>
                                </tr>
                                <tr>
                                    <td>Date Created</td>
                                    <td><span id="customerDateCreated" /></td>
                                </tr>
                                <tr>
                                    <td>Customer Status</td>
                                    <td><span id="customerStatus" /></td>
                                </tr>

                                </tbody>
                            </table>
                        </div>
                        <div class="modal-footer d-flex justify-content-between">
                            <button type="button" class="mui-btn mui-btn--danger" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="mui-btn mui-btn--primary"   data-bs-dismiss="modal">OK</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal  fade " id="saleDetailsModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
                <div class="modal-dialog modal-xl modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header bg-success d-flex justify-content-between">
                            <h5 class="modal-title text-white bold d-flex justify-content-center" >SALE FULL DETAILS</h5>
                            <button type="button" class="btn-close pull-right" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
<%--                            Add Accordion--%>
<%--                            <div class="accordion" id="saleDetailsAccordion">--%>

<%--                            </div>--%>
                                <ul class="mui-tabs__bar mui-tabs__bar--justified">
                                    <li class="mui--is-active"><a data-mui-toggle="tab" data-mui-controls="saleDetailsPane" class="bold text-success">Sale General Details</a></li>
                                    <li><a data-mui-toggle="tab" data-mui-controls="orgDetailsPane" class="bold text-secondary">Org & B/Unit Details</a></li>
                                    <li><a data-mui-toggle="tab" data-mui-controls="customerDetailsPane" class="bold text-primary">Customer Details</a></li>
                                    <li><a data-mui-toggle="tab" data-mui-controls="productDetailsPane" class="bold text-danger">Product Details</a></li>
                                </ul>
                                <div class="mui-tabs__pane mui--is-active text-success" id="saleDetailsPane">Sale Details here</div>
                                <div class="mui-tabs__pane text-secondary" id="orgDetailsPane" >Organization and B/Unit here</div>
                                <div class="mui-tabs__pane text-primary" id="customerDetailsPane">Customer Details here</div>
                                <div class="mui-tabs__pane text-danger" id="productDetailsPane">Product Details here</div>
                        </div>
                        <div class="modal-footer d-flex justify-content-between">
                            <button type="button" class="mui-btn mui-btn--danger" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn mui-btn--primary"   data-bs-dismiss="modal">OK</button>
                        </div>
                    </div>
                </div>
            </div>


            <div style="width:100%; margin-bottom: 100px; overflow: scroll;">
                <table id="saleList" class="mui-table mui-table--bordered" >
                    <thead>
                    <th>Date Created</th>
                    <th>Receipt #</th>
                    <th>Customer</th>
                    <th>Sale Date</th>
                    <th>Sale Status</th>
                    <th>Sale Items</th>
                    <th>Sale Total</th>
                    <th>View</th>
                    <th>Edit</th>
                    <th>Print</th>
                    </thead>
                    <tbody>
                    <tfoot>
                    <th>Date Created</th>
                    <th>Receipt #</th>
                    <th>Customer</th>
                    <th>Sale Date</th>
                    <th>Sale Status</th>
                    <th>Sale Items</th>
                    <th>Sale Total</th>
                    <th>View</th>
                    <th>Edit</th>
                    <th>Print</th>
                    </tfoot>
                </table>
            </div>

        </div>

    </div>


<!-- Include the footer  -->
<%@include file="../template/footer.jspf" %>

