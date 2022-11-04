

$(document).ready(()=> {

    $('div.dataTables_filter input').addClass('mui-textfield mui-textfield--float-label');

    $('.datepicker').datepicker()

    let dialog = bootbox.dialog({
        message: '<div class="text-center"><i class="fa fa-spin fa-spinner"></i> Loading...</div>',
        closeButton: false,
        show: false,
    })


    var modal = new tingle.modal({
        footer: true,
        stickyFooter: false,
        closeMethods: ['overlay', 'button', 'escape'],
        closeLabel: "Close",
        cssClass: ['custom-class-1', 'custom-class-2'],
        onOpen: function () {
            console.log('modal open');
        },
        onClose: function () {
            console.log('modal closed');
        },
        beforeClose: function () {
            // here's goes some logic
            // e.g. save content before closing the modal
            return true; // close the modal
            // return false; // nothing happens
        }
    });

    modal.setContent(`
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

    $.ajaxSetup({
        beforeSend: async function () {
            // dialog.show()
            // modal.open()
            showLoading(true)


        },
        complete: function () {
            showLoading(false)
            // modal.close()
            // dialog.hide()

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

