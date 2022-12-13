<%@include file="../template/header.jspf" %>
<%@include file="../template/notification.jspf"%>
<div class="container rounded-body  bg-opacity-10">
    <div class="rounded-body">
        <%--@elvariable id="command" type="com.mana.limo.domain.Asset"--%>
        <form:form commandName="command"  >
            <form:hidden path="id" />
            <form:hidden path="dateCreated" />
            <form:hidden  path="createdBy"  />
            <form:hidden  path="modifiedBy"  />
            <form:hidden  path="dateModified"  />
            <div class="row">
                <div class="col-md-6">
                    <div class=" mui-textfield mui-textfield--float-label">
                        <form:input   path="name"/>
                        <label for="name" >Asset Name</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="name" />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class=" mui-textfield mui-textfield--float-label">
                        <form:input   path="description"/>
                        <label for="description" >Description</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="description" />
                    </div>
                </div>

            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="mui-select">
                        <form:select   path="status" itemLabel="name" itemValue="code" items="${statuses}" />
                        <label for="status">Asset Status</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="status" />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mui-select">
                        <form:select   path="assetType" itemLabel="name" itemValue="code" items="${assetTypes}" />
                        <label for="assetType">Asset Type</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="assetType" />
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="mui-textfield mui-textfield--float-label">
                        <form:input   path="initialValue"   />
                        <label for="initialValue">Initial Value</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="initialValue" />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mui-textfield mui-textfield--float-label">
                        <form:input   path="depreciation"   />
                        <label for="depreciation">Depreciation Rate(%)</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="depreciation" />
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


            <div class="d-flex justify-content-between">
                <a onclick="window.history.back()" class="mui-btn mui-btn--danger">Cancel</a>
                <button type="submit" class="mui-btn mui-btn--primary">Save</button>
            </div>

        </form:form>
    </div>
</div>

<%@include file="../template/footer.jspf" %>