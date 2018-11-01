var isCover = false;
var isName = false;
var isDesc = false;
var isModeratorEmail = false;
var isModeratorName = false;

var email = $('#moderator-email');
var inputEmail = $('.unf-user-input--moderator-email');

$(function handleCreateChannel() {
  $('.group-chat__btn--create').on({
    click: function () {
      handleDialogOpen($('.unf-user-dialog--create-gc'));
    },
  });

  // $('#moderator-name').on({
  //   input: function () {
  //     if ($(this).val()) {
  //       isModeratorName = true
  //     } else {
  //       isModeratorName = false
  //     }
  //     checkInputEmpty()
  //   }
  // })
});

$(function handleResetValueChannel() {
  $('.unf-user-dialog__close--create-gc').on({
    click: function() {
      // reset input
      $('#gc-name').val('');
      $('#gc-desc').val('');
      $('#moderator-email').val('');

      if ($('.unf-user-input--moderator-email').hasClass('unf-user-input--isError')) {
        $('.unf-user-input--moderator-email').removeClass('unf-user-input--isError');
        $('.unf-user-input--moderator-email .unf-user-input__info-msg').text('Please enter your email accounts in Tokopedia');
      }

      if ($('.create-gc__moderator').hasClass('create-gc__moderator--show')) {
        $('.unf-user-input--moderator-email .unf-user-input__icon').removeClass('unf-user-input__icon--check');
        $('.create-gc__moderator').removeClass('create-gc__moderator--show');
      }

      // reset img
      $('.unf-user-input__image-container').addClass('hide');
      $('#gc-cover-img').removeAttr('src');
      $('#input-gc-cover-img').val('');

      handleDialogClose();
    },
  });
});

$(function onClickChannelImg() {
  $('#upload-gc-cover-img').on({
    click: function() {
      $('#input-gc-cover-img').click();
    },
  });
});

$(function onChangeChannelImg() {
  $('#change-gc-cover-img').on({
    click: function() {
      $('#upload-gc-cover-img').click();
    },
  });
});

$(function onDeleteChannelImg() {
  $('#delete-gc-cover-img').on({
    click: function() {
      $('.unf-user-input__image-container').addClass('hide');
      $('#gc-cover-img').removeAttr('src');
      $('#input-gc-cover-img').val('');
    },
  });
});

$(function handleInputChannelImg() {
  $('#input-gc-cover-img').on({
    change: function() {
      var imgType = ['image/png', 'image/jpg', 'image/jpeg'];
      var file = this.files
      if (file.length !== 0) {
        if (
          file[0].type == imgType[0] ||
          file[0].type == imgType[1] ||
          file[0].type == imgType[2]
        ) {
          if (file[0].size <= 10000000) {
            isCover = true;
            readURL(this);
          } else {
            $(this).val('');
            handleOpenToaster(true, true, helper.image.error[0]);
          }
        } else {
          handleOpenToaster(true, true, helper.image.error[1]);
          $(this).val('');
        }
      }
      checkInputEmpty();
    },
  });
});

$(function handleInputChannelName() {
  $('#gc-name').on({
    input: function () {
      counterInput(this, '70');
      if ($(this).val()) {
        isName = true;
      } else {
        isName = false;
      }
      checkInputEmpty();
    },
  });
});

$(function handleInputChannelDesc() {
  $('#gc-desc').on({
    input: function () {
      counterInput(this, '1000');
      if ($(this).val()) {
        isDesc = true;
      } else {
        isDesc = false;
      }
      checkInputEmpty();
    },
  });
});

$(function handleInputModeratorEmail() {
  $('#moderator-email').on({
    input: function() {
      // isModeratorEmail = true
      // checkInputEmpty()
    },
    focus: function() {
      handleInputError(
        inputEmail,
        'Please enter your email accounts in Tokopedia',
        true
      );
    },
    keypress: function() {
      handleInputError(
        inputEmail,
        'Please enter your email accounts in Tokopedia',
        true
      );
      if (event.charCode == 13) {
        $('#check-moderator-email').click();
      }
    },
  });
});

$(function checkModeratorEmail() {
  $('#check-moderator-email').on({
    click: function() {
      loadingCheckEmail(true);

      if (!validateEmail(email)) {
        setTimeout(() => {
          loadingCheckEmail(false);
        }, 500);
        handleInputError(inputEmail, helper.email.error[0], false);
        $('.create-gc__moderator').removeClass('create-gc__moderator--show');
        return false;
      }

      if (email.val() !== 'ichsan.wahyudi@tokopedia.com') {
        setTimeout(() => {
          loadingCheckEmail(false);
        }, 500);
        handleInputError(inputEmail, helper.email.error[1], false);
        $('.create-gc__moderator').removeClass('create-gc__moderator--show');
        return false;
      }

      setTimeout(() => {
        loadingCheckEmail(false);
        $('.unf-user-input__icon').addClass('unf-user-input__icon--check');
      }, 500);

      isModeratorEmail = true;
      isModeratorName = true;

      // console.log(isModeratorEmail, isModeratorName);
      checkInputEmpty();

      $('.customScrollBar--create-gc').animate({ scrollTop: 520 }, 1200);

      $('.create-gc__moderator').addClass('create-gc__moderator--show');
    },
  });
});

function checkInputEmpty() {
  // console.log(isCover, isName, isDesc, isModeratorEmail, isModeratorName);
  if (isCover && isName && isDesc && isModeratorEmail && isModeratorName) {
    $('#save-create-gc').attr('disabled', false);
  } else {
    $('#save-create-gc').attr('disabled', true);
  }
}


