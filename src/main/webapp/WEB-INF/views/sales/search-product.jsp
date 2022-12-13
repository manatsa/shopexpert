<%@include file="../template/header.jspf" %>
<%@include file="../template/notification.jspf" %>

<div class="container-fluid rounded-body">

<%--@elvariable id="command" type="com.mana.limo.domain.Sale"--%>
<form:form cssClass="mui-form" commandName="command">
    <form:hidden path="id"/>
    <form:hidden path="dateCreated"/>
    <form:hidden path="createdBy"/>
    <form:hidden path="receiptNumber"/>

    <ul id="sale-accordion" class="accordionjs">

        <!-- Section 1 -->
        <li>
            <div ><span class="bold">GENERAL SALE DETAILS</span></div>
            <div>
                <div class="d-flex justify-content-end col-md-12">
                    <span class="text-danger bold">Receipt No :: ${receiptNumber}</span>
                </div>
                <div class="row">
                    <div class="col-md-6 ">

                        <div class="mb-3 form-floating">
                            <form:input cssClass="form-control datepicker modern" placeholder="Sale Date"
                                        path="saleDate" required="required"/>
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
                        <form:select path="organization" itemLabel="name" itemValue="id" items="${orgs}"
                                     required="required"
                                     onchange="onOrganizationSelectChange(this)"
                                     onfocus="onOrganizationSelectChange(this)"/>
                        <label for="organization">Organization</label>
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
                            <form:input type="text" class="modern" path="customerName" id="search-box"/>
                            <label for="search-box">Search Customer</label>
                        </div>
                        <div class="col-md-6">
                            <form:hidden id="search-box2" path="customer"/>
                        </div>

                    </div>

                    <div class="col-md-6">
                        <div class="col-md-6 mui-select">
                            <form:select path="currency" itemLabel="name" itemValue="code" items="${currencies}"
                                         required="required"/>
                            <label for="currency">Transaction Currency</label>
                            <div class="text-danger">
                                <form:errors path="currency"/>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </li>

        <!-- Section 2 -->
        <li>
            <div><span class="bold">SALE PRODUCT DETAILS</span></div>
            <div>
                <div class=" d-flex justify-content-center">
                    <span class="bold mui--text-dark-secondary" style="font-size: 2em;">Search Products</span>
                </div>
                <div class="mui-row d-flex justify-content-md-evenly" style="border: 5px solid dodgerblue; border-radius: 20px; padding: 20px; margin: 10px">
                    <div class="mui-col-md-4">
                        <div class="mui-textfield mui-textfield--float-label">
                            <input   id="searchSaleProduct"/>
                            <label for="searchSaleProduct">Search Product</label>
                        </div>
                    </div>
                    <div class="mui-col-md-2">
                        <div class="mui-textfield mui-textfield--float-label">
                            <input   id="searchSaleProductQuantity"/>
                            <label for="searchSaleProductQuantity">Quantity</label>
                        </div>
                        <input type="hidden" id="itemId"/>
                        <input type="hidden" id="inventoryProductQuantity"/>
                    </div>
                    <div class="mui-col-md-2">
                        <button type="button" class="mui-btn mui-btn--primary" id="addProductToSaleBtn" >Add To Sale</button>
                    </div>
                </div>

                <div class=" d-flex justify-content-center">
                    <span class="bold mui--text-dark-secondary" style="font-size: 2em;">Selected Products</span>
                </div>
                <table class="mui-table mui-table--bordered" id="saleProductSearchItems">
                    <thead>
                    <th>Product Description</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Total Price</th>
                    <th>Remove</th>
                    </thead>
                    <tfoot>
                    <th>Product Description</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Total Price</th>
                    <th>Remove</th>
                    </tfoot>

                </table>
            </div>
        </li>

        <!-- Section 3 -->
        <%--<li>
            <div>Section 3 title</div>
            <div>
                <!-- Section content here. -->
            </div>
        </li>--%>

    </ul>

    <div class="vertical-padded" style="margin-bottom: 30px;">
        <div class="padded d-flex justify-content-between ">
            <a onclick="window.history.back()" class="btn btn-outline-danger">Cancel</a>
            <button type="submit" class="btn btn-success">Save</button>
        </div>
    </div>

</form:form>


</div>

<%@include file="../template/footer.jspf" %>
<script>
    $(document).ready(()=>{
        // let org=$('#organization').val()
        // onOrganizationSelectChange(org, null)
    })
</script>
