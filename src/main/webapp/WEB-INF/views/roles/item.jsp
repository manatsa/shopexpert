<%@include file="../template/header.jspf" %>
<%@include file="../template/notification.jspf"%>
<div class="container rounded-body  bg-opacity-10">
    <div class="rounded-body">
        <div class="d-flex justify-content-center mui-col-md-12 text-success text-decoration-underline btn-outline-light">
            <h3>${pageTitle}</h3>
        </div>

    <%--@elvariable id="command" type="com.mana.limo.domain.UserRole"--%>
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
                        <label for="name" >Role Name</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="name" title="errors on customer name" />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mui-textfield mui-textfield--float-label">
                        <form:textarea   path="description"   />
                        <label for="description">Role Description</label>
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
                        <label for="status">Role Status</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="status" />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3">
                        <form:select  cssClass="form-control form-floating modern" multiple="multiple" path="privileges" itemLabel="name" itemValue="id" items="${privileges}" />
                        <label for="privileges" >Role Privileges</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="privileges" />
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