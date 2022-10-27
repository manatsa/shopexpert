<%@include file="../template/header.jspf" %>
<%@include file="../template/notification.jspf"%>

    <div class=" container">
        <div class="padded col-md-12 justify-content-end">
            <a href="/limousine/inventory-creation" id="inventoryEditBtn" class="btn btn-primary">New Inventory Entry</a>
        </div>

        <table id="inventoryList" class="display" style="width:100%">
            <thead>
            <th>Inventory ID</th>
            <th>Inventory Description</th>
            <th>Inventory Product</th>
            <th>Quantity</th>
            </thead>
            <tbody>

            <tfoot>
            <th>Inventory ID</th>
            <th>Inventory Description</th>
            <th>Inventory Product</th>
            <th>Quantity</th>
            </tfoot>
        </table>
    </div>


<!-- Include the footer  -->
<%@include file="../template/footer.jspf" %>

