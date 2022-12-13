<%@include file="../template/header.jspf" %>
<%@include file="../template/notification.jspf"%>
<div class="container rounded-body  bg-opacity-10">
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
                    <div class=" mui-textfield mui-textfield--float-label">
                        <form:input   path="name"/>
                        <label for="name" >Customer Name</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="name" title="errors on customer name" />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mui-select">
                        <form:select   path="status" itemLabel="name" itemValue="code" items="${statuses}" />
                        <label for="status">Customer Status</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="status" />
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="mui-textfield mui-textfield--float-label">
                        <form:input   path="address"   />
                        <label for="address">Customer Address</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="address" title="errors on customer address" />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mui-select">
                        <form:select   path="type" itemLabel="name" itemValue="code" items="${types}" />
                        <label for="type" class="form-label">Customer Type</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="type" />
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="mui-textfield mui-textfield--float-label">
                        <form:input   path="phone"  />
                        <label for="phone" >Customer Phone</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="phone" />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mui-textfield mui-textfield--float-label">
                        <form:input type="email"  path="email"  />
                        <label for="email" class="form-label">Customer Email</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="email"  />
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