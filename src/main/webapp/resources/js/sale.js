let saleTable=null

$(document).ready(function () {

    loadSales();

    $('#saleList tbody').on('click', 'tr', function () {
        saleTable.$('tbody tr.selected').removeClass('selected');
        saleTable.$('tbody tr').removeClass('select');
        $(this).toggleClass('select');
        // saleTable.$('tr.selected').css('background-color','lightgrey')

        //saleTable.$('tr.selected').on( 'click', function () { $( saleTable.cells().nodes() ).removeClass( 'selected' )})
    });

onOrganizationSelectChange($("#organization"))



})

function loadSales(){
    $.ajax({
        'url': "/sales/list",
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
            searching: true,
            dom: 'Brtip',
            buttons: [
                {
                    className:'bg-transparent',
                    text: ()=>{
                        return ` <a id="productEditBtn" class="btn btn-success text-white"><i class="fa fa-plus-circle "></i> Sale</a>`
                    },
                    action: function ( e, dt, node, config ) {
                        location.href="/sale-creation"
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
                        onclick='showCustomer("${row?.customer?.name},${row?.customer?.address}, ${row?.customer?.type}, ${row?.customer?.phone}, ${row?.customer?.email}, ${new Date(row?.customer?.dateCreated)}, ${row?.customer?.status}")'>${row?.customer?.name}</a>`

                    }},
                {data: 'saleDate', render:(date)=>{
                        let newDate=new Date(date).toISOString();
                        return `<span>${newDate?.split('T')[0]}</span>`
                    }},
                {data: 'saleStatus'},
                {'data': 'saleItems', 'render': (data)=>{

                        return (data)?`<table class="display" col-spacing="1"><tbody><th>Product Name</th><th>Price</th><th>Quantity</th><th>Total/Item</th>
                       
                        ${data.map(item=>{
                            return `<tr><td>${item?.printName}</td><td>$${item?.product?.price?.toFixed(2)}</td><td>${item?.quantity?.toFixed(0)}</td><td>$${(item?.product?.price * item?.quantity)?.toFixed(2)}</td></tr>`
                        })}
                    </tbody></table>`:`<span></span>`;
                    }},
                {'data': 'saleItems', 'render': (data)=>{
                        return `<span class="bold total" style="border-bottom: 2px double blue">$${data?.map(item=>item?.product?.price * item?.quantity)?.reduce((a,b)=>a+b)?.toFixed(2)}</span>`
                    }},
                { 'data': 'id',
                    title: 'Show Sale',
                    wrap: true,
                    render: function (data, type,row) {
                        let rowData=JSON.stringify(row);
                        return `<a onclick="showSale('${data}')" class="btn btn-outline-primary" ><i class="fa fa-eye"></i></a>`
                    } },
                { 'data': 'id',
                    title: 'Edit',
                    wrap: true,
                    render: function (data) {

                        return `<a href="/sale-creation?saleId=${data}" class="btn btn-outline-secondary" ><i class="fa fa-pencil-square-o"></i></a>`
                    } },
                { 'data': 'id',
                    title: 'Trash',
                    wrap: true,
                    render: function (data) {
                        return `<a href="#" class="btn btn-outline-danger" ><i class="fa fa-trash-o" ></i></a>`
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
        'url':'/units/list-by-organization?org='+element.value,
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


/*function addProductOnclick(data, add, size, initial) {

    let quantity = document.getElementById(data + '-input-quantity')?.value;
    if ((!quantity || quantity < 1) && add) {
        var quantityModal = new bootstrap.Modal(document.getElementById('invalidQuantityModal'), { keyboard: true})
        quantityModal.show();
        return;
    }
    if(size && size>0){
        quantity=size;
    }

    if (productSearchItems) {
        productSearchItems?.destroy();
    }

    //determine if its removing or adding a product to the sale, and act accordingly
    const url = data ?add ? "/sales/add-sale-item-to-sale?productId=" + data + "&quantity=" + quantity :
            "/sales/remove-sale-item-to-sale?productId=" + data+"&quantity="+quantity:
        "/sales/get-sale-item-to-sale";

    //clear text box after reading its value (quantity)
    if(add) {
        document.getElementById(data + '-input-quantity').value = null;
    }

    $.ajax({
        'url': url,
        'method': "GET",
        'contentType': 'application/json'
    }).done(function (items) {
        if(add){
            $('#operationSuccess').toast('show');
        }else if(!add && items && !initial){
            $('#operationError').toast('show');
        }

        const data = items?items.map(item => {
            return {
                name: item.product.name + '-' + item.product.description + '-' + item.product.packaging,
                price: item.product.price,
                quantity: item.quantity,
                total: item.product.price * item.quantity,
                productId: item.product.id
            }
        }):[];

        let total=items.map(item=>item.product.price*item.quantity).reduce((a,b)=>a+b,0);
        productSearchItems = $('#productSearchItems').DataTable({
            data,
            bFilter: true,
            columnDefs: [{"className": "dt-center", "targets": "_all"}],
            autoWidth: true,
            select: true,
            scrollY: "250px",
            scrollX: true,
            scrollCollapse: true,
            paging: true,
            dom: 'Brtip',
            buttons: [
                {
                    className:'bg-transparent',
                    text: ()=>{
                        return `<span  class="btn btn-outline-danger" style="font-size: x-large"><i class="fa fa-bank "> Total :: </span>`
                    }
                },
                {
                    className:'bg-transparent',
                    text: ()=>{
                        return `<span class="btn btn-danger" style="font-size: x-large">$${total.toFixed(2)}</span>`
                    }
                },
                {
                    className: 'bg-transparent',
                    text: () => {
                        return ` 
                        <div class="mui-col-md-12 float-right"style="width: 100%; display: flex; flex-grow: 1;">
                           
                            <div class="mui-col-md-8 mui-col-md-offset-4 col-sm-12 mui-textfield mui-textfield--float-label">
                                <input type="text" id="saleSearchItems" />
                                <label for="search">search product</label>
                            </div>
                
                    </div>`
                    }
                }
                /!*{
                    className:'bg-transparent',
                    text: ()=>{
                        return `<span  class="btn btn-danger" style="font-size:large"><i class="fa fa-refresh text-light">Refresh</i></span>`
                    }
                },*!/

            ],
            columns: [
                {data: 'name'},
                {data: 'quantity'},
                {data: 'price', render: $.fn.dataTable.render.number(null, '.', 2, '$ ')}, // thousand, decimal, precision, prefix
                {data: 'total', render: $.fn.dataTable.render.number(null, '.', 2, '$ ')},
                {
                    'data': 'name',
                    title: 'Add',
                    wrap: true,
                    "render": function (data, type, row) {
                        return `<button type="button" onclick="addProductOnclick('${row?.productId}',false, '${row?.quantity}',false)" class="btn btn-outline-danger" ><i class="fa fa-trash-o "> Remove</i></button>`
                    }
                },

            ],

        })
        $('#saleSearchItems').keyup(function(){
            prodSearchItems.search($(this).val()).draw() ;
        })
    })


}*/

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
        'url': "/sales/get-sale-by-id?id="+id,
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
            <tr><td class="bold">Sale Date</td><td>${new Date(data?.saleDate)?.toISOString().split('T')[0]}</td></tr>
            <tr><td class="bold">Date Created</td><td>${new Date(data?.dateCreated)?.toISOString().split('T')[0]}</td></tr>
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
                 <tr><td>${s?.product?.name}</td><td>${s?.product?.price}</td><td>${s?.quantity}</td><td>$${(s?.product?.price * s?.quantity)?.toFixed(2)}</td></tr>
                `
            })?.forEach(saleItemHtml=>{
                productBody+=saleItemHtml;
        })
        productBody+=`</tbody>
            <tfoot class="text-secondary">
                <tr><th style="font-size: x-large;">Grand Total</th>
                <td></td>
                <td></td>
                <td style="font-size: x-large">$${(data?.saleItems?.map(s=>s?.product?.price * s?.quantity)?.reduce((a,b)=>a+b,0))?.toFixed(2)}</td></tr>
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
