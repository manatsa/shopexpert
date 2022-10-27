<%@include file="../template/header.jspf" %>
<%@include file="../template/notification.jspf"%>
<div class="container-fluid rounded-body bg-black bg-opacity-10">
    <div class="rounded-body">

        <div class="modal fade" id="invalidQuantityModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header bg-danger">
                        <h5 class="modal-title" id="staticBackdropLabel">Invalid Quantity</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <span class="text-danger">Please make sure you have specified valid product quantities!</span>
                    </div>
                    <div class="modal-footer d-flex justify-content-between">
                        <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-outline-danger"   data-bs-dismiss="modal">OK</button>
                    </div>
                </div>
            </div>
        </div>

        <div aria-live="assertive" aria-atomic="true" class="d-flex justify-content-center align-items-center w-100 ">

                <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" id="operationSuccess" data-bs-delay=1000 style="z-index: 11" >
                    <div class="toast-header bg-success text-white">
                        <i class="fa fa-check-circle-o text-white" style="font-size: 30px"></i>
                        <strong class="me-auto">Operation Feedback</strong>
                        <small>just now...</small>
                        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div class="toast-body">
                        <span class="text-success">Your changes applied successfully!</span>
                    </div>
                </div>

                <div class="toast " role="alert" aria-live="assertive" aria-atomic="true" id="operationError" data-bs-delay=1000 style="z-index: 11">
                    <div class="toast-header bg-danger text-white">
                        <i class="fa fa-times-circle-o text-white" style="font-size: 30px"></i>
                        <strong class="me-auto">Operation Feedback</strong>
                        <small>just now...</small>
                        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div class="toast-body">
                        <span class="text-danger">Your changes applied successfully!</span>
                    </div>
                </div>
        </div>

        <%--@elvariable id="command" type="com.mana.limo.domain.Sale"--%>
        <form:form commandName="command"  >
            <form:hidden path="id" />
            <form:hidden path="dateCreated"/>
            <form:hidden path="createdBy"/>
            <form:hidden path="receiptNumber"/>
            <div class="row">
                <div class="col-md-6">
                    <div class="mb-3 form-floating">
                        <form:input  type="date" class="form-control modern" path="saleDate" placeholder="Sale Date"  />
                        <label for="saleDate" class="form-label">Sale Date</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="saleDate" title="errors on sale date" />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3 form-floating">
                        <form:select  class="form-select modern" path="saleStatus" itemLabel="name" itemValue="code" items="${statuses}" />
                        <label for="saleStatus" class="form-label">Sale Status</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="saleStatus" />
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="mb-3 form-floating">
                        <form:select  class="form-select modern" path="organization" itemLabel="name" itemValue="id" items="${orgs}" onchange="onOrganizationSelectChange(this)" />
                        <label for="organization" class="form-label">Organization</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="organization" />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3 form-floating">
                        <form:select  class="form-select modern" path="businessUnit" itemLabel="name" itemValue="id" items="${bunits}" id="bUnitsSelect" />
                        <label for="businessUnit" class="form-label">Business Unit</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="businessUnit" />
                    </div>
                </div>
            </div>
<%--            search for products--%>
            <div class="product-search d-flex justify-content-md-around">
                <%--<div class="row">
                    <div class="col-md-6">
                            <div class="mb-3 form-floating">
                                <input  type="text" class="form-control modern" id="searchProduct"  placeholder="Search product by name or description or packaging"  />
                                <label for="searchProduct" class="form-label">Search product by name or description or packaging</label>
                            </div>
                    </div>
                    <div class="col-md-6 float-end">
                        <section id="productsList" class="bg-secondary col-md-4">
                            <div class="mb-3 form-floating">
                                <input type="text" class="form-control modern" id="searchedProduct" placeholder="quantity"/>
                                <label for="searchedProduct" class="form-label">Product</label>
                            </div>
                        </section>
                    </div>
                </div>--%>
                    <div class="col-md-6 heavily-padded">
                        <div class="col-md-12 d-flex justify-content-center">
                            <h3>Search Products</h3>
                        </div>
                        <table id="productSearchList" class="display table-responsive productSearchList" style="width:100%">
                            <thead>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Details</th>
                            <th>Packaging</th>
                            <th>Price</th>
                            <th>Quantity to Add</th>
                            <th>Add to Sale</th>
                            </thead>
                            <tbody>

                        </table>
                    </div>

                    <div class="col-md-6 heavily-padded">
                        <div class="col-md-12 d-flex justify-content-center">
                            <h3>Selected Products</h3>
                        </div>
                        <table id="productSearchItems" class="display table-responsive productSearchList" style="width:100%">
                            <thead>
                            <th>Product Description</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Total Price</th>
                            <th>Trash</th>
                            </thead>
                            <tbody>

                        </table>
                    </div>


            </div>



            <div class="vertical-padded">
                <div class="padded d-flex justify-content-between ">
                    <a href="/limousine/product-list" class="btn btn-outline-danger">Cancel</a>
                    <button type="submit" class="btn btn-success">Save</button>
                </div>
            </div>

        </form:form>
    </div>
</div>

<%@include file="../template/footer.jspf" %>