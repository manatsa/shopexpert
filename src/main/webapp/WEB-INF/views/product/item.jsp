<%@include file="../template/header.jspf" %>
<%@include file="../template/notification.jspf"%>
<div class="container rounded-body bg-black bg-opacity-10">
    <div class="rounded-body">
        <%--@elvariable id="command" type="com.mana.limo.domain.Product"--%>
        <form:form commandName="command"  >
            <form:hidden path="id" />
            <form:hidden path="dateCreated"/>
            <form:hidden path="createdBy"/>
            <div class="row">
                <div class="col-md-6">
                    <div class="mb-3 form-floating">
                        <form:input  class="form-control modern" path="name" placeholder="product name"  />
                        <label for="name" class="form-label">Product Name</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="name" title="errors on product name" />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3 form-floating">
                        <form:textarea rows="5"  class="form-control modern" path="description" placeholder="product description"  />
                        <label for="description" class="form-label">Product Description</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="description" />
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6">
                    <div class="mb-3 form-floating">
                        <form:select  class="form-select modern" path="productType" itemLabel="name" itemValue="code" items="${productTypes}" />
                        <label for="productType" class="form-label">Product Type</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="productType" />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3 form-floating">
                        <form:select  class="form-select modern" path="status" itemLabel="name" itemValue="code" items="${statuses}" />
                        <label for="productType" class="form-label">Product Status</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="status" />
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6">
                    <div class="mb-3 form-floating">
                        <form:input   class="form-control modern" path="price" />
                        <label for="price" class="form-label">Product Price</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="price" />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3 form-floating">
                        <form:input type="number" class="form-control modern" path="reOderLevel"  />
                        <label for="reOderLevel" class="form-label">Product Re-Order Level</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="reOderLevel" />
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6">
                    <div class="mb-3 form-floating bg-light">
                        <form:input  class="form-control modern" path="packaging" placeholder="product packaging" />
                        <label for="packaging" class="form-label">Product Packaging</label>
                    </div>
                    <div class="text-danger row">
                        <form:errors path="packaging" />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3 form-floating">
                        <form:input type="number" class="form-control modern" path="stock"  />
                        <label for="stock" class="form-label">Product Quantity</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="stock" />
                    </div>
                </div>
            </div>

            <div class="d-flex justify-content-between">
                <a href="/limousine/product-list" class="btn btn-outline-danger">Cancel</a>
                <button type="submit" class="btn btn-success">Save</button>
            </div>

        </form:form>
    </div>
</div>

<%@include file="../template/footer.jspf" %>