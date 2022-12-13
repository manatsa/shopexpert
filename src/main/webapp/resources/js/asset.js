let assetTable=null
let asscontext=null;
$(document).ready(function () {
    asscontext=$('#context').val()
   populateAssets(null);

    $('#assetList tbody').on('click', 'tr', function () {
        assetTable.$('tbody tr.selected').removeClass('selected');
        assetTable.$('tbody tr').removeClass('select');
        $(this).toggleClass('select');
    });
})




function populateAssets(items) {
    if(assetTable){
        assetTable.destroy()
    }
    if(!items){
        $.ajax({
            'url': `${asscontext}/asset/list`,
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
    assetTable=$('#assetList').DataTable({
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
                    location.href=`${asscontext}/assets-creation`
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
                                <select id="assetSelect">
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="50">50</option>
                                    <option value="-1">All</option>
                                </select>
                                <label for="assetSelect"> Rows </label>
                            </div>
                            <div class="mui-col-md-8 col-sm-12 mui-textfield mui-textfield--float-label">
                                <input type="text" id="assetSearch" />
                                <label for="search">search assets</label>
                            </div>
                
                    </div>`
                }
            }

        ],

        columns: [
            {data: 'dateCreated', render:(date)=>{
                    let newDate=new Date(date)?.toISOString();
                    return `<span>${newDate?newDate?.split('T')[0]:''}</span>`
                }},
            {data: 'name'},
            {data: 'description'},
            {data: 'assetType'},
            {data: 'initialValue', render: data1 => `<span>$${Number(data1)?.toFixed(2)}</span>`},
            {data: 'depreciation', render: data1 => `<span>${Number(data1)?.toFixed(1)}%</span>`},
            {data: 'organization', render: data1 => {
                return data1?`<span>${data1?.name}</span>`:`<span></span>`
                }},
            {data: 'businessUnit', render: data1 => {
                    return data1?`<span>${data1?.name}</span>`:`<span></span>`
                }},
            { 'data': 'id',
                title: 'View',
                wrap: true,
                "render": function (data, type, row) {

                    return `<a  onclick="showAsset('${row?.name}','${row?.description}','${row?.assetType}','${row?.status}','${row?.dateCreated}',
                            '${row?.initialValue}','${row?.depreciation}','${row?.organization?.name}','${row?.businessUnit?.name}')"  
                            class="btn btn-outline-primary" ><i class="fa fa-eye"></i></a>`
                } },
            { 'data': 'id',
                title: 'Edit',
                wrap: true,
                "render": function (data) {
                    return `<a href="${asscontext}/assets-creation?assetId=${data}" class="btn btn-outline-primary" ><i class="fa fa-pencil-square-o"></i></a>`
                } },
            { 'data': 'id',
                title: 'Trash',
                wrap: true,
                "render": function (data) {
                    return `<a href="#" class="btn btn-outline-danger" ><i class="fa fa-trash-o" ></i></a>`
                } },

        ],


    });

    $('select[name="assetList_length"]').css('width','60px')

    $('#assetSelect').on('change', ()=>{
        let rows=$('#assetSelect').val()
        assetTable.page.len(rows).draw()
    })

    $('#assetSearch').keyup(function(){
        assetTable.search($(this).val()).draw() ;
    })


}


function showAsset(name,description,assetType,status,dateCreated, initialValue,depreciation,organization,businessUnit) {
        $('#assetname').html(name);
        $('#assetDescription').html(description);
        $('#assetDateCreated').html(dateCreated);
        $('#assetType').html(assetType);
        $('#assetStatus').html(status);
        $('#assetInitialValue').html(Number(initialValue)?.toFixed(2));
        $('#assetDepreciation').html(Number(depreciation)?.toFixed(2));
        $('#assetOrganization').html(organization);
        $('#assetBusinessUnit').html(businessUnit);

        let showAssetModal = new bootstrap.Modal(document.getElementById('showAssetModal'), { keyboard: false})
        showAssetModal.show();
    // });
}

