$(document).ready(()=>{
    $('.datepicker').datepicker()
})



function showProfileModal() {
    let profileModal = new bootstrap.Modal(document.getElementById('userProfileModal'), { keyboard: true})
    profileModal.show();
}

function openChangePassword() {
    let changePasswordModal = new bootstrap.Modal(document.getElementById('ChangePasswordModal'), { keyboard: false})
    changePasswordModal.show();
}
function changePassword(){
    toggleLoading()
    let newPass=$('#passwd').val();

    $.ajax({
        'url':'/users/change-password?pass='+newPass,
        'method':'POST',
        'contentType': 'application/json',
        'data':newPass
    }).done(()=>{
        $('#operationSuccess').toast('show');
        toggleLoading()
    })
}


function showLoading(show) {
    if(show) {
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
    }else{
        $('#spinner').html('')
    }

}

