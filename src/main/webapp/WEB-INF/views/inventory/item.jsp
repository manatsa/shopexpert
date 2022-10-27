<%@include file="../template/header.jspf" %>
<%@include file="../template/notification.jspf"%>
<div class="container rounded-body bg-black bg-opacity-10">
    <div class="rounded-body">
        <%--@elvariable id="command" type="com.mana.limo.domain.Inventory"--%>
        <form:form commandName="command"  >
            <form:hidden path="id" />
            <form:hidden path="dateCreated"/>
            <form:hidden path="createdBy"/>
            <div class="row">
                <div class="col-md-6">
                    <div class="mb-3 form-floating">
                        <form:input   class="form-control modern" path="description" placeholder="inventory description"  />
                        <label for="description" class="form-label">Inventory Description</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="description" />
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="mb-3 form-floating">
                        <form:select  class="form-select modern"  path="product">
                            <c:forEach items="${products}" var="product">
                                <form:option value="${product.id}">${product.name} - ${product.description} - ${product.packaging} - $${product.price}</form:option>
                            </c:forEach>
                        </form:select>
                        <label for="product" class="form-label">Product Type</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="product" />
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="mb-3 form-floating">
                        <form:input type="number" class="form-control modern" path="quantity"  />
                        <label for="quantity" class="form-label">Product Quantity</label>
                    </div>
                    <div class="text-danger">
                        <form:errors path="quantity" />
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-evenly">
                <a href="/limousine/inventory-list" class="btn btn-outline-danger">Cancel</a>
                <button type="button" class="btn btn-success">Save</button>
                <button type="submit" class="btn btn-success">Save & Exit</button>
            </div>

        </form:form>
    </div>
</div>

<%@include file="../template/footer.jspf" %>