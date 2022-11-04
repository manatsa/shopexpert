function showSimpleFeedback(title, message, type, duration){
    let dialog = bootbox.dialog({
        title:title?title:null,
        message,
        backdrop: false,
        size: 'small',
        onEscape: duration==null?true:false,
        closeButton: false,
        // className:'bg-danger',

    });

    dialog.find('.modal-content').addClass(
        (type?.toLowerCase()==='danger'|| type?.toLowerCase()==='error')? 'modal-staff-danger':
            (type?.toLowerCase()==='success'|| type?.toLowerCase()==='ok')?'modal-staff-success':
                (type?.toLowerCase()==='warning')? 'modal-staff-warning':
                    (type?.toLowerCase()==='secondary')? 'modal-staff-secondary':
                        'modal-staff-info'
    )

    dialog.find('.modal-dialog-centered').addClass('right-top');

    dialog.init(function(){
        setTimeout(function(){
            // dialog.find('.bootbox-body').html('I was loaded after the dialog was shown!');
            dialog.hide()
        }, duration);
    });
}



// showSimpleFeedback(null, "<h5>Product was saved successfully!</h5>", 'danger', 3000);

