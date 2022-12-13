<%@include file="../template/header.jspf" %>


    <div class="container">
        <div class="padded">
            <div class="d-flex justify-content-center mui-col-md-12 text-success text-decoration-underline btn-outline-light"><h3>${pageTitle}</h3></div>
            <div class="padded col-md-12 justify-content-md-around">
                <%@include file="../template/notification.jspf"%>
            </div>

            <div class="modal .modal-lg fade" id="showAssetModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header bg-success d-flex justify-content-between">
                            <h5 class="modal-title" >Asset Details</h5>
                            <button type="button" class="btn-close pull-right" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                        <table class="mui-table mui-table--bordered">
                            <thead>
                                <th>PROPERTY NAME</th>
                                <th>PROPERTY VALUE</th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Date Created</td>
                                    <td><span id="assetDateCreated"></span></td>
                                </tr>
                                <tr>
                                    <td>Asset Name</td>
                                    <td><span id="assetname"></span></td>
                                </tr>
                                <tr>
                                    <td>Asset Description</td>
                                    <td><span id="assetDescription"></span></td>
                                </tr>
                                <tr>
                                    <td>Asset Type</td>
                                    <td><span id="assetType"></span></td>
                                </tr>
                                <tr>
                                    <td>Asset Status</td>
                                    <td><span id="assetStatus"></span></td>
                                </tr>
                                <tr>
                                    <td>Initial Value</td>
                                    <td><span id="assetInitialValue"></span></td>
                                </tr>
                                <tr>
                                    <td>Asset Depreciation</td>
                                    <td><span id="assetDepreciation"></span></td>
                                </tr>
                                <tr>
                                    <td>Organization</td>
                                    <td><span id="assetOrganization"></span></td>
                                </tr>
                                <tr>
                                    <td>Business Unit</td>
                                    <td><span id="assetBusinessUnit"></span></td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="modal-footer d-flex justify-content-between">
                            <button type="button" class="mui-btn mui-btn--danger" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="mui-btn mui-btn--primary" data-bs-dismiss="modal"  > OK </button>
                        </div>
                    </div>
                </div>
                </div>
            </div>



            <table id="assetList" class="mui-table mui-table--bordered" style="width:100%">
                <thead>
                <th>Date Created</th>
                <th>Asset Name</th>
                <th>Description</th>
                <th>Asset Type</th>
                <th>Initial Value</th>
                <th>Depreciation</th>
                <th>Organzation</th>
                <th>Business Unit</th>
                <th>View</th>
                <th>Edit</th>
                <th>Trash</th>
                </thead>
                <tbody>
                <tfoot>
                <th>Date Created</th>
                <th>Asset Name</th>
                <th>Description</th>
                <th>Asset Type</th>
                <th>Initial Value</th>
                <th>Depreciation</th>
                <th>Organzation</th>
                <th>Business Unit</th>
                <th>View</th>
                <th>Edit</th>
                <th>Trash</th>
                </tfoot>
            </table>
        </div>

    </div>


<!-- Include the footer  -->
<%@include file="../template/footer.jspf" %>

