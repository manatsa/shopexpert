let saleTable=null
let slcontext=null;

$(document).ready(function () {
    slcontext=$('#context').val()

    loadSales();

    $('#saleList tbody').on('click', 'tr', function () {
        saleTable.$('tbody tr.selected').removeClass('selected');
        saleTable.$('tbody tr').removeClass('select');
        $(this).toggleClass('select');

    });




})

function loadSales(){
    $.ajax({
        'url': `${slcontext}/sales/list`,
        'method': "GET",
        'contentType': 'application/json'
    }).done(function (data) {
        saleTable=$('#saleList').DataTable({
            data: data,
            "bFilter" : true,
            processing:true,
            ordering: true,
            info: true,
            select: true,
            fixedHeader: true,
            colReorder: true,
            pageLength:5,
            searching: true,
            pagingType: 'full_numbers',
            dom: 'Brtip',
            buttons: [
                {
                    className:'bg-transparent',
                    text: ()=>{
                        return ` <a id="productEditBtn" class="btn btn-success text-white"><i class="fa fa-plus-circle "></i> Sale</a>`
                    },
                    action: function ( e, dt, node, config ) {
                        location.href=`${slcontext}/sale-creation`
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
                        return `<button class="btn btn-success"><i class="fa fa-download"> &nbsp <i class="fa fa-file-excel-o  "></i></button>`
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
                        return `<button class="btn btn-danger "><i class="fa fa-download"> &nbsp </i><i class="fa fa-file-pdf-o"></i></button>`
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
                                <select id="saleSelect">
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="50">50</option>
                                    <option value="-1">All</option>
                                </select>
                                <label for="saleSelect"> Rows </label>
                            </div>
                            <div class="mui-col-md-8 col-sm-12 mui-textfield mui-textfield--float-label">
                                <input type="text" id="saleSearch" />
                                <label for="search">search sale</label>
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
                {data: 'receiptNumber'},
                {data: 'customer.name',render:(data, type, row)=>{
                        return `<a href="#" style="border-bottom: 1px solid deepskyblue; color: deepskyblue;" 
                        onclick='showCustomer("${row?.customer?.name},${row?.customer?.address}, ${row?.customer?.type}, ${row?.customer?.phone}, ${row?.customer?.email}, ${new Date(row?.customer?.dateCreated)}, ${row?.customer?.status}")'>${row?.customer?row?.customer?.name:''}</a>`

                    }},
                {data: 'saleDate', render:(date)=>{
                        let newDate=new Date(date).toISOString();
                        return `<span>${newDate?.split('T')[0]}</span>`
                    }},
                {data: 'saleStatus'},
                {'data': 'saleItems', 'render': (data)=>{
                        return (data)?`<table class="display" col-spacing="1"><tbody><th>Product Name</th><th>Price</th><th>Quantity</th><th>Total/Item</th>
                       
                        ${data.map(item=>{
                            return `<tr><td>${item?.inventory?.product?.name+'-'+item?.inventory?.product?.description+'-'+item?.inventory?.product?.packaging}</td><td>$${item?.inventory?.price?.toFixed(2)}</td><td>${item?.quantity?.toFixed(0)}</td><td>$${(item?.inventory?.price * item?.quantity)?.toFixed(2)}</td></tr>`
                        })}
                    </tbody></table>`:`<span></span>`;
                    }},
                {'data': 'saleItems', 'render': (data)=>{
                        return `<span class="bold total" style="border-bottom: 2px double blue">$${data?.map(item=>item?.inventory?.price * item?.quantity)?.reduce((a,b)=>a+b)?.toFixed(2)}</span>`
                    }},
                { 'data': 'id',
                    title: 'Show Sale',
                    wrap: true,
                    render: function (data, type,row) {
                        return `<a onclick="showSale('${data}')" class="btn btn-outline-primary" ><i class="fa fa-eye"></i></a>`
                    } },
                { 'data': 'id',
                    title: 'Edit',
                    wrap: true,
                    render: function (data) {

                        return `<a href="${slcontext}/sale-creation?saleId=${data}" class="btn btn-outline-secondary" ><i class="fa fa-pencil-square-o"></i></a>`
                    } },
                { 'data': 'id',
                    title: 'Print',
                    wrap: true,
                    render: function (data,type,row) {
                        return `<a href="#" onclick="createReceipt('${row?.receiptNumber}', '${row?.id}')" class="btn btn-outline-dark" ><i class="fa fa-print" ></i></a>`
                    } },

            ],


        });

        $('select[name="saleList_length"]').css('width','60px')

        $('#saleSelect').on('change', ()=>{
            let rows=$('#saleSelect').val()
            saleTable.page.len(rows).draw()
        })

        $('#saleSearch').keyup(function(){
            saleTable.search($(this).val()).draw() ;
        })
    });
}

function onOrganizationSelectChange(element){
    $.ajax({
        'url':`${slcontext}/units/list-by-organization?org=`+element.value,
        'method': 'GET',
        'contentType': 'application/json'
    }).done(function (data) {
        let htmlOptions='';
            data?.map(item=>{
            return `<option value='${item?.id}'>${item?.name}</option>`
        }).forEach(opt=>{
            htmlOptions+=opt;
            })
        $('#bUnitsSelect').html(htmlOptions)
    })
}

function showCustomer(customer) {

    $('#customerName').html(`<span>${customer?.split(',')[0]}</span>`);
    $('#customerAddress').html(`<span>${customer?.split(',')[1]}</span>`);
    $('#customerType').html(`<span>${customer?.split(',')[2]}</span>`)
    $('#customerPhone').html(`<span>${customer?.split(',')[3]}</span>`);
    $('#customerEmail').html(`<span>${customer?.split(',')[4]}</span>`);
    $('#customerDateCreated').html(`<span>${new Date(customer?.split(',')[5])?.toISOString()?.split('T')[0]}</span>`);
    $('#customerStatus').html(`<span>${customer?.split(',')[6]}</span>`)

    let customerProfileModal = new bootstrap.Modal(document.getElementById('customerProfileModal'), { keyboard: false})
    customerProfileModal.show();

}

function showSale(id){
    $.ajax({
        'url': `${slcontext}/sales/get-sale-by-id?id=`+id,
        'method': "GET",
        'contentType': 'application/json'
    }).done(function (data)
    {

        let saleBody=`
        <table class="mui-table mui-table--bordered table-responsive table-striped-columns">
        <thead>
           <th>PROPERTY</th> 
           <th>PROPERTY VALUE</th> 
        </thead>
        <tbody>
            <tr><td class="bold">Receipt Number</td><td class="bold text-danger">${data?.receiptNumber}</td></tr>
            <tr><td class="bold">Sale Date</td><td>${data?.saleDate?new Date(data?.saleDate)?.toISOString()?.split('T')[0]:''}</td></tr>
            <tr><td class="bold">Date Created</td><td>${data?.dateCreated?new Date(data?.dateCreated)?.toISOString().split('T')[0]:''}</td></tr>
            <tr><td class="bold">Sale Status</td><td>${data?.saleStatus}</td></tr>
        </tbody>
        </table>`

        let customerBody=`
        <table class="mui-table mui-table--bordered table-responsive table-striped-columns">
            <thead>
           <th>PROPERTY</th> 
           <th>PROPERTY VALUE</th> 
        </thead>
            <tbody>
                <tr><td class="bold">Customer Name</td><td>${data?.customer?.name}</td></tr>
                <tr><td class="bold">Date Created</td><td>${data?.customer?.dateCreated?new Date(data?.customer?.dateCreated)?.toISOString().split('T')[0] : ``}</td></tr>
                <tr><td class="bold">Customer Address</td><td>${data?.customer?.address}</td></tr>
                <tr><td class="bold">Customer Type</td><td>${data?.customer?.type}</td></tr>
                <tr><td class="bold">Customer Phone</td><td>${data?.customer?.phone}</td></tr>
                <tr><td class="bold">Customer Email</td><td>${data?.customer?.email}</td></tr>
                <tr><td class="bold">Customer Status</td><td>${data?.customer?.status}</td></tr>
            </tbody>
        </table>`

        let productBody=`<table class="mui-table mui-table--bordered table-responsive table-striped-columns" border="1">
                <thead><th>Product Name</th><th>Product Price</th><th>Product Quanity</th><th> TOTAL </th></thead><tbody>`
                data?.saleItems?.map(s=>{
                    return `
                         <tr><td>${s?.inventory.product?.name}</td><td>${s?.inventory?.price}</td><td>${s?.quantity}</td><td>$${(Number(s?.inventory?.price) * Number(s?.quantity))?.toFixed(2)}</td></tr>
                        `
                    })?.forEach(saleItemHtml=>{
                        productBody+=saleItemHtml;
                })
        productBody+=`</tbody>
            <tfoot class="text-secondary">
                <tr><th style="font-size: x-large;">Grand Total</th>
                <td></td>
                <td></td>
                <td style="font-size: x-large">$${(data?.saleItems?.map(s=>Number(s?.product?.price) * Number(s?.quantity))?.reduce((a,b)=>a+b,0))?.toFixed(2)}</td></tr>
            </tfoot>
        </table>`

        let orgBody=`<table class="mui-table mui-table--bordered table-responsive table-striped-columns">
            <thead>
           <th>PROPERTY</th> 
           <th>PROPERTY VALUE</th> 
        </thead>
            <tbody>
                <tr><td class="bold">Organization Name</td><td>${data?.organization?.name}</td></tr>
                <tr><td class="bold">Business Unit Name</td><td>${data?.businessUnit?.name}</td></tr>
                <tr><td class="bold">Business Unit Address</td><td>${data?.businessUnit?.address}</td></tr>
                <tr><td class="bold">Business Unit Phone</td><td>${data?.businessUnit?.phone}</td></tr>
                <tr><td class="bold">Business Unit Email</td><td>${data?.businessUnit?.email}</td></tr>
           </tbody>
           </table>`

        $('#saleDetailsPane').html(saleBody);
        $('#customerDetailsPane').html(customerBody);
        $('#productDetailsPane').html(productBody);
        $('#orgDetailsPane').html(orgBody);


        let saleProfileModal = new bootstrap.Modal(document.getElementById('saleDetailsModal'), { keyboard: false})
        saleProfileModal.show();

    });


}

const createReceipt=(receipt, saleId)=>{
    $.ajax({
        'url': `${slcontext}/sales/get-sale-by-id?id=${saleId}`,
        'method': "GET",
        'contentType': 'application/json'
    }).done(function (data) {
        let html=`<div>`;
        html+=`<span style="font-size: x-small; font-weight: bold">CHIEDZA CENTRE</span><br/>
                <table class="mui-table">
                    <tr><td><span style="font-size: x-small">Receipt No:</span></td><td><span class="bold" style="font-size: xx-small; font-weight: bold;">${data?.receiptNumber}</span></td></tr>
                    <tr><td><span style="font-size: xx-small">Sale Date:</span></td><td><span style="font-size: xx-small">${data?.saleDate}</span></td></tr>
                    <tr><td><span style="font-size: xx-small">Customer Name:</span></td><td><span style="font-size: xx-small">${data?.customer?.name}</span></td></tr>
                    <tr><td><span style="font-size: xx-small"></span></td></tr> <tr><hr/></tr>
                    <tr><td><u><span style="font-size: xx-small; font-weight: bold;">PRODUCT ITEMS</span></u></td><td></td></tr>
                    <tr><hr/></tr>
`;
        data?.saleItems?.forEach(s =>{
            let inv=s?.inventory;
            html+=`<tr>
                <td> <span style="font-size: 5px">${inv?.product?.name} ${inv.product?.packaging} ${inv?.product?.description} </span></td>
                <td> <span style="font-size: 6px"> @${s?.inventory?.price?.toFixed(2)}</span></td>
                <td> <span style="font-size: 6px"> x${s.quantity} </span></td>
                <td><span style="font-size: 6px"> $${(Number(inv?.price)*Number(s?.quantity))?.toFixed(2)} </span></td>
            </tr>`
        });

        let total=data?.saleItems?.map(s=>Number(s?.inventory?.price)*Number(s.quantity))?.reduce((a,b)=>a+b);
        html+=`<tr><td><span></span></td></tr>
            <tr>
                <th>
                    <span style="font-size: 8px; ">
                        Total
                    </span>
                </th>
            <th>
                <span style="font-size: 8px; border-bottom: 1px double black; border-top: 1px solid black;">
                    $${total.toFixed(2)}
                </span>
            </th>
            </tr>
            </table>
            <div class="row"></div>
            <hr/>
            <div class="row"><span style="font-size: 6px">Thank you. Please come again!</span></div>
            <div class="row"><span style="font-size: 7px;"> Mneulite Investments (Pvt) Ltd. &copy; 2022</span></div>
            </div>
        `
        printReceipt(html);
    })
}

function printReceipt(html) {
        var WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
        WinPrint.document.write(html);
        WinPrint.document.close();
        WinPrint.focus();
        WinPrint.print();
        WinPrint.close();
}
