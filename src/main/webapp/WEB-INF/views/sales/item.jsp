<%@include file="../template/header.jspf" %>
<%@include file="../template/notification.jspf" %>

<div class="container-fluid rounded-body bg-light bg-opacity-10">
    <div class="rounded-body" style="margin-bottom: 30px;">

        <div class="modal fade" id="invalidQuantityModal" data-bs-backdrop="static" data-bs-keyboard="false"
             tabindex="-1">
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
                        <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">OK</button>
                    </div>
                </div>
            </div>
        </div>

        <%--@elvariable id="command" type="com.mana.limo.domain.Sale"--%>
        <form:form cssClass="mui-form" commandName="command">
            <form:hidden path="id"/>
            <form:hidden path="dateCreated"/>
            <form:hidden path="createdBy"/>
            <form:hidden path="receiptNumber"/>
            <div class="d-flex justify-content-end col-md-12">
                <span class="text-danger ">Receipt No :: ${receiptNumber}</span>
            </div>
            <div class="row">
                <div class="col-md-6 ">

                    <div class="mb-3 form-floating">
                        <form:input  cssClass="form-control datepicker modern" placeholder="Sale Date"  path="saleDate"  required="required"/>
                        <label for="saleDate">Sale Date</label>
                    </div>


                    <div class="text-danger">
                        <form:errors path="saleDate" title="errors on sale date"/>
                    </div>
                </div>

                <div class="col-md-6 mui-select">
                    <form:select path="saleStatus" itemLabel="name" itemValue="code" items="${statuses}"
                                 required="required"/>
                    <label for="saleStatus">Sale Status</label>
                    <div class="text-danger">
                        <form:errors path="saleStatus"/>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 mui-select">
                    <form:select path="organization" itemLabel="name" itemValue="id" items="${orgs}" required="required"
                                 onchange="onOrganizationSelectChange(this)" onfocus="onOrganizationSelectChange(this)"/>
                    <label for="organization" >Organization</label>
                    <div class="text-danger">
                        <form:errors path="organization"/>
                    </div>
                </div>
                <div class="col-md-6 mui-select">
                    <form:select path="businessUnit" itemLabel="name" itemValue="id" items="${bunits}"
                                 required="required" id="bUnitsSelect"/>
                    <label for="businessUnit">Business Unit</label>
                    <div class="text-danger">
                        <form:errors path="businessUnit"/>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="ui-widget mui-textfield mui-textfield--float-label">
                        <form:input type="text" class="modern" path="customerName" id="search-box" />
                        <label for="search-box" >Search Customer</label>
                    </div>
                    <div class="col-md-6">
                        <form:hidden  id="search-box2" path="customer"  />
                    </div>

                </div>

                <div class="col-md-6">
                    <div class="col-md-6 mui-select">
                        <form:select path="currency" itemLabel="name" itemValue="code" items="${currencies}"
                                     required="required" />
                        <label for="currency">Transaction Currency</label>
                        <div class="text-danger">
                            <form:errors path="currency"/>
                        </div>
                    </div>
                </div>

            </div>
            <%--            search for products--%>
            <div class="mui-panel d-flex justify-content-md-around">
                <div class="col-md-6 heavily-padded">
                    <div class="col-md-12 d-flex justify-content-center">
                        <h3>Search Products</h3>
                    </div>
                    <table id="productSearchList" class="display table-responsive productSearchList mui-table" style="width:100%">
                        <thead>
                        <th>Name</th>
                        <th>Details</th>
                        <th>Packaging</th>
                        <th>Items</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Add</th>
                        <th>Remove</th>
                        </thead>
                        <tbody>

                    </table>
                </div>

                <div class="col-md-6 heavily-padded">
                    <div class="col-md-12 d-flex justify-content-center">
                        <h3>Selected Products</h3>
                    </div>
                    <table id="productSearchItems" class="display table-responsive productSearchList"
                           style="width:100%">
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
                    <a onclick="window.history.back()" class="btn btn-outline-danger">Cancel</a>
                    <button type="submit" class="btn btn-success">Save</button>
                </div>
            </div>

        </form:form>
    </div>
</div>

<%@include file="../template/footer.jspf" %>
<script>
    $(document).ready(()=>{
        // let org=$('#organization').val()
        // onOrganizationSelectChange(org, null)
    })
</script>
