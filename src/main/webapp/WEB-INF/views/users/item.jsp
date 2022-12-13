<%@include file="../template/header.jspf" %>
<%@include file="../template/notification.jspf"%>
<div class="container rounded-body  bg-opacity-10">
    <div class="rounded-body">
        <%--@elvariable id="command" type="com.mana.limo.domain.User"--%>
        <form:form commandName="command"  >
            <form:hidden cssClass="form-control" path="id" />
            <form:hidden path="dateCreated"/>
            <form:hidden path="createdBy"/>

            <div class="row">
                <div class="col-md-6">
                    <div class="mui-textfield mui-textfield--float-label">
                        <form:input  path="firstName" required="true"/>
                        <label for="firstName" >First Name</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="firstName"  />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mui-textfield mui-textfield--float-label">
                        <form:input path="lastName" required="true" />
                        <label for="lastName" class="form-label">Last Name</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="lastName" />
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6">
                    <div class="mui-select">
                        <form:select  path="status" itemLabel="name" itemValue="code" items="${statuses}" />
                        <label for="status">User Status</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="status" />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mui-select">
                        <form:select  path="userType" itemLabel="name" itemValue="code" items="${types}" />
                        <label for="userType">User Type</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="userType" />
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6">
                    <div class="mui-textfield mui-textfield--float-label">
                        <form:input    path="userName" required="true" />
                        <label for="userName" >Username</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="userName" />
                    </div>
                </div>
                <div class="col-md-6">
                    <c:choose>
                        <c:when test="${editing}">
                            <form:hidden path="password"/>
                        </c:when>
                        <c:otherwise>
                            <div class="mui-textfield mui-textfield--float-label">
                                <form:input type="password"  path="password" required="true" />
                                <label for="password" >Password</label>
                            </div>
                            <div class="text-danger">
                                <form:errors path="password" />
                            </div>
                        </c:otherwise>
                    </c:choose>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6">
                    <div class="mui-select">
                        <form:select multiple="multiple" path="userRoles" items="${userRoles}" itemValue="id" itemLabel="name" required="true" />
                        <label for="userRoles" >User Roles</label>
                    </div>
                    <div class="text-danger row">
                        <form:errors path="userRoles" />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mui-select">
                        <form:select   path="userLevel" items="${levels}" itemValue="code" itemLabel="name" required="true" />
                        <label for="userLevel" >User Level</label>
                    </div>
                    <div class="text-danger row">
                        <form:errors path="userLevel" />
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