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
  var info_msg = el.find('.unf-user-input__info-msg')

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

function validateEmail(el) {
  var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var value = el.val();

  if (!regex.test(value)) {
    return false;
  }

  return true;
}

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