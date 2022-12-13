<%@include file="../template/header.jspf" %>
<%@include file="../template/notification.jspf"%>
<div class="container rounded-body bg-opacity-10">
    <div class="rounded-body">
        <%--@elvariable id="command" type="com.mana.limo.domain.BusinessUnit"--%>
        <form:form commandName="command"  >
            <form:hidden path="id" />
            <form:hidden path="dateCreated" />
            <form:hidden  path="createdBy"  />
            <form:hidden  path="modifiedBy"  />
            <form:hidden  path="dateModified"  />
            <div class="row">
                <div class="col-md-6">
                    <div class="mui-textfield mui-textfield--float-label">
                        <form:input  path="name"   />
                        <label for="name">Business Unit Name</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="name" title="errors on b/unit name" />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mui-select">
                        <form:select  path="status" itemLabel="name" itemValue="code" items="${statuses}" />
                        <label for="status">Organization Status</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="status" />
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6">
                    <div class="mui-textfield mui-textfield--float-label">
                        <form:input  path="address" />
                        <label for="address">Business Unit Address</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="address" title="errors on b/unit name" />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mui-textfield mui-textfield--float-label">
                        <form:input  path="phone"  />
                        <label for="phone">Business Unit Phone Number</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="phone" title="errors on b/unit name" />
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="mui-textfield mui-textfield--float-label">
                        <form:input path="email"  />
                        <label for="email" >Business Unit Email Address</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="email" />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mui-select">
                        <form:select  class="form-select modern" path="organization">
                            <c:forEach var="org" items="${orgs}">
                                <form:option value="${org.id}">${org.name}</form:option>
                            </c:forEach>
                        </form:select>
                        <label for="organization">Organization</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="organization" />
                    </div>
                </div>
            </div>


            <div class="d-flex justify-content-between">
                <a onclick="window.history.back()" class="btn btn-outline-danger">Cancel</a>
                <button type="submit" class="btn btn-success">Save</button>
            </div>

        </form:form>
    </div>
</div>

<%@include file="../template/footer.jspf" %>