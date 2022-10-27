<%@include file="../template/header.jspf" %>
<%@include file="../template/notification.jspf"%>
<div class="container rounded-body bg-black bg-opacity-10">
    <div class="rounded-body">
        <%--@elvariable id="command" type="com.mana.limo.domain.Customer"--%>
        <form:form commandName="command"  >
            <form:hidden path="id" />
            <form:hidden path="dateCreated" />
            <form:hidden  path="createdBy"  />
            <form:hidden  path="modifiedBy"  />
            <form:hidden  path="dateModified"  />
            <div class="row">
                <div class="col-md-6">
                    <div class="mb-3 form-floating">
                        <form:input  class="form-control modern" path="name" placeholder="customer name"  />
                        <label for="name" class="form-label">Customer Name</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="name" title="errors on customer name" />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3 form-floating">
                        <form:select  class="form-select modern" path="status" itemLabel="name" itemValue="code" items="${statuses}" />
                        <label for="status" class="form-label">Customer Status</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="status" />
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="mb-3 form-floating">
                        <form:input  class="form-control modern" path="address" placeholder="customer address"  />
                        <label for="address" class="form-label">Customer Address</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="address" title="errors on customer address" />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3 form-floating">
                        <form:select  class="form-select modern" path="type" itemLabel="name" itemValue="code" items="${types}" />
                        <label for="type" class="form-label">Customer Type</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="type" />
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="mb-3 form-floating">
                        <form:input  class="form-control modern" path="phone" placeholder="customer phone"  />
                        <label for="phone" class="form-label">Customer Phone</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="phone" />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3 form-floating">
                        <form:input  class="form-control modern" path="email" placeholder="Customer email"  />
                        <label for="email" class="form-label">Customer Email</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="email"  />
                    </div>
                </div>
            </div>


            <div class="d-flex justify-content-between">
                <a href="/limousine/customers-list" class="btn btn-outline-danger">Cancel</a>
                <button type="submit" class="btn btn-success">Save</button>
            </div>

        </form:form>
    </div>
</div>

<%@include file="../template/footer.jspf" %>