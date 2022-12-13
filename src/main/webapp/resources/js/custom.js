

$(document).ready(()=> {


    $('.datepicker').datepicker()

    let ajaxCallModal = new bootstrap.Modal(document.getElementById('ajaxCallModal'), { keyboard: false})

    $("#sale-accordion").accordionjs({
        // Allow self close.(data-close-able)
        closeAble   : true,

        // Close other sections.(data-close-other)
        closeOther  : true,

        // Animation Speed.(data-slide-speed)
        slideSpeed  : 150,

        // The section open on first init. A number from 1 to X or false.(data-active-index)
        activeIndex : 1,

        // Callback when a section is open
        openSection: function( section ){
            let org=$('#organization')
            onOrganizationSelectChange(org)
        },

        // Callback before a section is open
        beforeOpenSection: function( section ){},
    });

    $.ajaxSetup({
        beforeSend: async function () {
            // ajaxCallModal.show();
            showLoading(true);


        },
        complete: function () {
            // ajaxCallModal.hide();
            showLoading(false);


        }
    });



    function showLoading(show) {
        if (show) {
            $('#spinner').removeClass('visually-hidden')
            $('#spinner').html(`
        <div class="spinner-grow text-danger" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow text-light" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow text-secondary" role="status">
             <span class="visually-hidden">Loading...</span>
        </div>
    `)
        } else {
            $('#spinner').addClass('visually-hidden')
            $('#spinner').html('')
        }

    }

    showLoading(true)


})

function showOperationStatusDialog(title,message,small, type, time) {
    $('#operationHeader').html(`
        <h4 class="modal-title text-white bold" >${title}</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    `)
    $('#operationHeader').addClass(`bg-${type}`)
    $('#operationFooter').html(`
        <button type="button" class="btn btn-outline-${type}"  data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-outline-${type}" data-bs-dismiss="modal">OK</button>
    `)

    $('#operationMessage').html(`
        <h2 > ${message}</h2>
        <p class="small" id="operationSubMessage">${small}</p>
    `)
    let operationMessageModal = new bootstrap.Modal(document.getElementById('operationMessageModal'), { keyboard: true})
    operationMessageModal.show();
    if(time) {
        setTimeout(() => {
            operationMessageModal.hide();
        }, Number(time))
    }

}

