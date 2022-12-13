<%@include file="../template/header.jspf" %>
<%@include file="../template/notification.jspf"%>
<div class="container rounded-body  bg-opacity-10">
    <div class="rounded-body">
        <%--@elvariable id="command" type="com.mana.limo.domain.Product"--%>
        <form:form commandName="command"  >
            <form:hidden path="id" />
            <form:hidden path="dateCreated"/>
            <form:hidden path="createdBy"/>
            <div class="row">
                <div class="col-md-6">
                    <div class="mui-textfield mui-textfield--float-label">
                        <form:input  path="name" required="true"/>
                        <label for="name" >Product Name</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="name" title="errors on product name" />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mui-textfield mui-textfield--float-label">
                        <form:textarea rows="1"  path="description" required="true" />
                        <label for="description" class="form-label">Product Description</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="description" />
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6">
                    <div class="mui-select">
                        <form:select  path="productType" itemLabel="name" itemValue="code" items="${productTypes}" />
                        <label for="productType">Product Category</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="productType" />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mui-select">
                        <form:select  path="status" itemLabel="name" itemValue="code" items="${statuses}" />
                        <label for="productType" >Product Status</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="status" />
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6">
                    <div class="mui-textfield mui-textfield--float-label">
                        <form:input   path="packaging"  required="true" />
                        <label for="packaging" >Product Packaging</label>
                    </div>
                    <div class="text-danger row">
                        <form:errors path="packaging" />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mui-textfield mui-textfield--float-label">
                        <form:input type="number"  path="reOderLevel" required="true" />
                        <label for="reOderLevel"> Product Quantity</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="reOderLevel" />
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 mui-select">
                    <form:select path="organization" itemLabel="name" itemValue="id" items="${orgs}" required="required"
                                 onchange="onOrganizationSelectChange(this)"/>
                    <label for="organization" >Organization</label>
                    <div class="text-danger">
                        <form:errors path="organization"/>
                    </div>
                </div>
                <div class="col-md-6 mui-select">
                    <form:select path="businessUnit" itemLabel="name" itemValue="id" items="${bunits}"
                                 required="required" id="bUnitsSelect"/>
                    <label for="businessUnit" class="form-label">Business Unit</label>
                    <div class="text-danger">
                        <form:errors path="businessUnit"/>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="mui-textfield mui-textfield--float-label">
                        <form:input type="number"   path="cost" required="true" />
                        <label for="cost" >Product Cost</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="cost" />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mui-textfield mui-textfield--float-label">
                        <form:input type="number"   path="price" required="true" />
                        <label for="price" >Product Price</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="price" />
                    </div>
                </div>
            </div>

            <div class="d-flex justify-content-between">
                <a onclick="window.history.back()" class="mui-btn mui-btn--danger">Cancel</a>
                <button type="submit" class="mui-btn mui-btn--primary">Save</button>
            </div>

        </form:form>
    </div>
</div>

<%@include file="../template/footer.jspf" %>