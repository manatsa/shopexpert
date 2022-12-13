let rateTable=null
let ratecontext=null;
$(document).ready(function () {
    ratecontext=$('#context').val()
   // populateRates(null);

    $('#rateList tbody').on('click', 'tr', function () {
        rateTable.$('tbody tr.selected').removeClass('selected');
        rateTable.$('tbody tr').removeClass('select');
        $(this).toggleClass('select');
    });
})




function populateRates(items) {
    if(rateTable){
        rateTable.destroy()
    }
    if(!items){
        $.ajax({
            'url': `${ratecontext}/rate/list`,
            'method': "GET",
            'contentType': 'application/json'
        }).done(function (data) {
            createAssetTable(data)
        });
    }else{
        createAssetTable(items)
    }

}



function createAssetTable(data) {
    rateTable=$('#rateList').DataTable({
        data: data,
        "bFilter" : true,
        processing:true,
        ordering: true,
        info: true,
        select: true,
        colReorder: true,
        pagingType: 'full_numbers',
        searching: true,
        dom: 'Brtip',
        buttons: [
            {
                className:'bg-transparent',
                text: ()=>{
                    return ` <a class="btn btn-success text-white"><i class="fa fa-plus-circle "></i> Asset</a>`
                },
                action: function ( e, dt, node, config ) {
                    location.href=`${ratecontext}/rates-creation`
                }
            },
            {
                extend: 'spacer',
                style: 'bar',
                text: ' Export Files '
            },
            {
                extend:'excel',
                className:'bg-transparent',
                text: ()=>{
                    return `<button class="btn btn-success"> <i class="fa fa-file-excel-o  "></i></button>`
                },
                exportOptions : {
                    modifier : {
                        page : 'all', // 'all', 'current'
                        search : 'applied' // 'none', 'applied', 'removed'
                    },
                    columns: [ 0,1, 2, 3, 4, 5, 6, 7 ]
                }
            },
            {
                extend:'pdf',
                className:'bg-transparent',
                text: ()=>{
                    return `<button class="btn btn-danger "><i class="fa fa-file-pdf-o"></i></button>`
                },
                exportOptions : {
                    modifier : {
                        page : 'all', // 'all', 'current'
                        search : 'applied' // 'none', 'applied', 'removed'
                    },
                    columns: [ 0,1, 2, 3, 4, 5, 6, 7 ]
                }
            },
            {
                extend:'print',
                className:'bg-transparent',
                text: ()=>{
                    return ` <button class="btn btn-dark"><i class="fa fa-print"></i></button>`
                },
                exportOptions : {
                    modifier : {
                        page : 'all', // 'all', 'current'
                        search : 'applied' // 'none', 'applied', 'removed'
                    },
                    columns: [ 0,1, 2, 3, 4, 5, 6, 7 ]
                }
            },
            {
                className: 'bg-transparent',
                text: () => {
                    return ` 
                        <div class="mui-col-md-12 float-right"style="width: 100%; display: flex; flex-grow: 1;">
                            <div class="mui-col-md-4 col-sm-12 mui-select ">
                                <select id="rateSelect">
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="50">50</option>
                                    <option value="-1">All</option>
                                </select>
                                <label for="rateSelect"> Rows </label>
                            </div>
                            <div class="mui-col-md-8 col-sm-12 mui-textfield mui-textfield--float-label">
                                <input type="text" id="rateSearch" />
                                <label for="search">search rates</label>
                            </div>
                
                    </div>`
                }
            }

        ],

        columns: [
            {data: 'dateCreated'},
            {data: 'startDate'},
            {data: 'details'},
            {data: 'rate'},
            {data: 'status'},
            { 'data': 'id',
                title: 'View',
                wrap: true,
                "render": function (data, type, row) {

                    return `<a  onclick="showAsset('${row?.name}','${row?.description}','${row?.rateType}','${row?.status}','${row?.dateCreated}',
                            '${row?.initialValue}','${row?.depreciation}','${row?.organization?.name}','${row?.businessUnit?.name}')"  
                            class="btn btn-outline-primary" ><i class="fa fa-eye"></i></a>`
                } },
            { 'data': 'id',
                title: 'Edit',
                wrap: true,
                "render": function (data) {
                    return `<a href="${ratecontext}/rates-creation?rateId=${data}" class="btn btn-outline-primary" ><i class="fa fa-pencil-square-o"></i></a>`
                } },
            { 'data': 'id',
                title: 'Trash',
                wrap: true,
                "render": function (data) {
                    return `<a href="#" class="btn btn-outline-danger" ><i class="fa fa-trash-o" ></i></a>`
                } },

        ],


    });

    $('select[name="rateList_length"]').css('width','60px')

    $('#rateSelect').on('change', ()=>{
        let rows=$('#rateSelect').val()
        rateTable.page.len(rows).draw()
    })

    $('#rateSearch').keyup(function(){
        rateTable.search($(this).val()).draw() ;
    })


}


function showAsset(name,description,rateType,status,dateCreated, initialValue,depreciation,organization,businessUnit) {
        $('#ratename').html(name);
        $('#rateDescription').html(description);
        $('#rateDateCreated').html(dateCreated);
        $('#rateType').html(rateType);
        $('#rateStatus').html(status);
        $('#rateInitialValue').html(Number(initialValue)?.toFixed(2));
        $('#rateDepreciation').html(Number(depreciation)?.toFixed(2));
        $('#rateOrganization').html(organization);
        $('#rateBusinessUnit').html(businessUnit);

        let showAssetModal = new bootstrap.Modal(document.getElementById('showRateModal'), { keyboard: false})
        showAssetModal.show();
    // });
}

