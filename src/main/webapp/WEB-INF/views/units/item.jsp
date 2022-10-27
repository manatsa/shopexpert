<%@include file="../template/header.jspf" %>
<%@include file="../template/notification.jspf"%>
<div class="container rounded-body bg-black bg-opacity-10">
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
                    <div class="mb-3 form-floating">
                        <form:input  class="form-control modern" path="name" placeholder="business unit name"  />
                        <label for="name" class="form-label">Business Unit Name</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="name" title="errors on b/unit name" />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3 form-floating">
                        <form:select  class="form-select modern" path="status" itemLabel="name" itemValue="code" items="${statuses}" />
                        <label for="status" class="form-label">Organization Status</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="status" />
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6">
                    <div class="mb-3 form-floating">
                        <form:input  class="form-control modern" path="address" placeholder="business unit address"  />
                        <label for="address" class="form-label">Business Unit Address</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="address" title="errors on b/unit name" />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3 form-floating">
                        <form:input  class="form-control modern" path="phone" placeholder="business unit phone #"  />
                        <label for="phone" class="form-label">Business Unit Phone</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="phone" title="errors on b/unit name" />
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="mb-3 form-floating">
                        <form:input  class="form-control modern" path="email" placeholder="business unit email"  />
                        <label for="email" class="form-label">Business Unit Email</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="email" title="errors on b/unit email" />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3 form-floating">
                        <form:select  class="form-select modern" path="organization">
                            <c:forEach var="org" items="${orgs}">
                                <form:option value="${org.id}">${org.name}</form:option>
                            </c:forEach>
                        </form:select>
                        <label for="organization" class="form-label">Organization</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="organization" />
                    </div>
                </div>
            </div>


            <div class="d-flex justify-content-between">
                <a href="/limousine/units-list" class="btn btn-outline-danger">Cancel</a>
                <button type="submit" class="btn btn-success">Save</button>
            </div>

        </form:form>
    </div>
</div>

<%@include file="../template/footer.jspf" %>