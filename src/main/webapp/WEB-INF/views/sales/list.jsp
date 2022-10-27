<%@include file="../template/header.jspf" %>


    <div class="container">
        <div class="padded">
            <div class="padded col-md-12 justify-content-md-around">
                <%@include file="../template/notification.jspf"%>
            </div>
            <table id="saleList" class="display table-responsive table-striped table-striped-columns" style="width:100%">
                <thead>
                <th>Date Created</th>
                <th>Receipt #</th>
                <th>Sale Date</th>
                <th>Sale Status</th>
                <th>Sale Items</th>
                <th>Sale Total</th>
                <th>Edit</th>
                <th>Trash</th>
                </thead>
                <tbody>
                <tfoot>
                <th>Date Created</th>
                <th>Receipt #</th>
                <th>Sale Date</th>
                <th>Sale Status</th>
                <th>Sale Items</th>
                <th>Sale Total</th>
                <%--<th>Add</th>
                <th>Minus</th>--%>
                <th>Edit</th>
                <th>Trash</th>
                </tfoot>
            </table>
        </div>

    </div>


<!-- Include the footer  -->
<%@include file="../template/footer.jspf" %>

