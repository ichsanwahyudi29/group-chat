function handleOpenToaster(isError, autoClose, text, callback) {
    var toaster = $('.unf-user-toaster');
    var toasterBody = $('.unf-user-toaster__body');
    var toasterMessage = $('#unf-user-toaster__message');

    toasterBody.click(function (e) {
        if (!e.target == 'unf-user-toaster__action') {
            toaster.removeClass('unf-user-toaster--show');
        }
    });

    toasterMessage.text(text);

    if (isError) {
        toasterBody.addClass('unf-user-toaster__body--error');
    } else {
        toasterBody.removeClass('unf-user-toaster__body--error');
    }

    toaster.addClass('unf-user-toaster--show');

    if (autoClose) {
        setTimeout(function () {
            toaster.removeClass('unf-user-toaster--show');
        }, 3000);
    }

    if (callback) {
        callback();
    }
}