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
function handleInputPwdToggle(el) {
  $(el)
    .siblings('.unf-user-input__pwd-container')
    .click(function() {
      var inputType = $(el).attr('type');
      if (inputType === 'password') {
        $(el).attr('type', 'type');
      } else {
        $(el).attr('type', 'password');
      }
      $(el)
        .siblings('.unf-user-input__pwd-container')
        .children('.unf-user-input__pwd-toggle')
        .toggleClass('unf-user-input__pwd-toggle--on');
    });
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

function validatePhone(el, input) {
  var value = $(el).val();
  var cleanValue = value.replace(/[\s-]/g, '');

  if (cleanValue.length < 8) {
    handleInputError(input, helper.phone.error[1], false);
    return false;
  }

  if (cleanValue.length > 15) {
    handleInputError(input, helper.phone.error[2], false);
    return false;
  }

  return true;
}

function validateEmailPhone(el, input) {
  var regex = /^\+?\d+$/;
  var value = $(el).val();
  var cleanValue = (value.replace(/ |-/g, ""));

  if (regex.test(cleanValue)) {
    return validatePhone(el, input);
  } else {
    return validateEmail(el, input)
  }
}

function validatePassword(el, input) {
  var value = $(el).val();

  if (value.length < 6) {
    handleInputError(input, helper.password.error[0], false)
    return false
  }

  return true
}

// use this in onInput

function formatValidatePhone(el) {
  var regPhone = /[^0-9\+]/g;
  var phoneValue = $(el).val();
  $(el).val(phoneValue.replace(regPhone, ''));

  if (phoneValue.charAt(0) === '+') {
    regPhone = /^\+?\d*$/;
    if (phoneValue.match(regPhone)) {
      newVal = phoneValue;
    } else {
      regPhone = /[^0-9]/g;
      newVal = phoneValue.replace(regPhone, '');
      newVal = `+${newVal}`;
    }
    $(el).val(newVal);
  } else {
    regPhone = /[^0-9]/g;
    $(el).val(phoneValue.replace(regPhone, ''));
  }
}
