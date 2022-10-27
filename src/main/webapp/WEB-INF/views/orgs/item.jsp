<%@include file="../template/header.jspf" %>
<%@include file="../template/notification.jspf"%>
<div class="container rounded-body bg-black bg-opacity-10">
    <div class="rounded-body">
        <%--@elvariable id="command" type="com.mana.limo.domain.Organization"--%>
        <form:form commandName="command"  >
            <form:hidden path="id" />
            <form:hidden path="dateCreated" />
            <form:hidden  path="createdBy"  />
            <form:hidden  path="modifiedBy"  />
            <form:hidden  path="dateModified"  />
            <div class="row">
                <div class="col-md-6">
                    <div class="mb-3 form-floating">
                        <form:input  class="form-control modern" path="name" placeholder="organization name"  />
                        <label for="name" class="form-label">Organization Name</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="name" title="errors on organization name" />
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


            <div class="d-flex justify-content-between">
                <a href="/limousine/orgs-list" class="btn btn-outline-danger">Cancel</a>
                <button type="submit" class="btn btn-success">Save</button>
            </div>

        </form:form>
    </div>
</div>

<%@include file="../template/footer.jspf" %>