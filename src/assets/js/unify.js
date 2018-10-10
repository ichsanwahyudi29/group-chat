function handleDialogOpen(el, callback) {
  $("body").css('overflow', 'hidden')
  $(".unf-user-overlay").addClass('unf-user-overlay--show');
  $(el).addClass('unf-user-dialog--show');

  if (callback) {
    callback();
  }
}

function handleDialogClose() {
  $("body").removeAttr("style");
  $(".unf-user-overlay").removeClass('unf-user-overlay--show');
  $(".unf-user-dialog").removeClass('unf-user-dialog--show');
}

function handleInputError(el, text, eraseError) {
  var info_msg = $(`${el} .unf-user-input__info`).children();

  if (!eraseError) {
    $(el).addClass('unf-user-input--isError');
    info_msg.text(text);
  }

  if ($(el).hasClass('unf-user-input--isError')) {
    infoMessageAnimate(info_msg);
    if (eraseError) {
      $(el).removeClass('unf-user-input--isError');
      setTimeout(function() {
        info_msg.text(text);
      }, 280);
      return false;
    }
  }
}

function infoMessageAnimate(info_msg) {
  info_msg.addClass('animated');
  setTimeout(function() {
    info_msg.removeClass('animated');
  }, 280);
}

function validateEmail(el, input) {
  var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var value = $(el).val();

  if (!regex.test(value)) {
    handleInputError(input, helper.email.error[0], false);
    return false;
  }

  return true;
}