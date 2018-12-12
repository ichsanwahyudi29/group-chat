function handleInputError(el, text, eraseError) {
    var info_msg = el.find('.unf-user-input__info-msg')

    if (!eraseError) {
        $(el).addClass('unf-user-input--isError');
        info_msg.text(text);
    }

    if ($(el).hasClass('unf-user-input--isError')) {
        infoMessageAnimate(info_msg);
        if (eraseError) {
            $(el).removeClass('unf-user-input--isError');
            setTimeout(function () {
                info_msg.text(text);
            }, 280);
            return false;
        }
    }
}

function infoMessageAnimate(info_msg) {
    info_msg.addClass('animated');
    setTimeout(function () {
        info_msg.removeClass('animated');
    }, 280);
}