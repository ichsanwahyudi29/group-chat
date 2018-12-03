var contentCreateChannel, contentPreviewChannel;
var isCover = false;
var isName = false;
var isDesc = false;
var isModeratorEmail = false;
var isModeratorName = false;

var email = $('#input__channel--moderator-email');
var inputEmail = $('.unf-user-input--moderator-email');

/* $(function onClickCreateChannel() {
  $('.group-chat__btn--create').on({
    click: function() {
      handleDialogOpen($('.unf-user-dialog--create-channel'));
    },
  });
}); */
//gohere
$(function handleClickCreateChannel() {
  $('.group-chat__btn--create').on({
    click: function() {
      contentCreateChannel = $('.js__child-dialog-create-channel').html()
      dialogModule.renderDialog({
        title: 'Create Group Chat',
        children: $('.js__child-dialog-create-channel'),
        close: true,
        styleClass: 'dialog--520',
        btnTextPrimary: 'Save',
        btnPrimaryDisabled: true,
        handleClickPrimary: handleCloseCreateChannel,
        handleClickSecondary:  handleCloseCreateChannel
      });
    $('.js__child-dialog-create-channel').html('')
    },
  });
});

function handleCloseCreateChannel(){
  //put back html
  $('.js__child-dialog-create-channel').html(contentCreateChannel)
  handleDialogClose()
}

$(function onScrollTopShadow() {
  $('.customScrollBar--create-channel').on({
    scroll: function() {
      var scroll = $(this).scrollTop();
      var title = $('.unf-user-dialog__header')

      if (scroll > 0) {
        title.addClass('unf-user-dialog__header-shadow');
      } else {
        title.removeClass('unf-user-dialog__header-shadow');
      }
    },
  });
})

$(function onClickResetValueChannel() {
  $('.unf-user-dialog__close--create-channel').on({
    click: function() {  
      resetInputValueChannel()
    },
  });
});

$(function onChangeChannelImg() {
  $('#upload__channel--cover, #change__channel--cover').on({
    click: function() {
      $('#input__channel--cover').click();
    },
  });
});

$(function onDeleteChannelImg() {
  $('#delete__channel--cover').on({
    click: function() {
      resetInputImageChannel()
    },
  });
});

$(function handleInputChannelImg() {
  $('#input__channel--cover').on({
    change: function() {
      var imgType = ['image/png', 'image/jpg', 'image/jpeg'];
      var file = this.files;
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
            handleOpenToaster(true, true, helper.image.error[0]);
          }
        } else {
          handleOpenToaster(true, true, helper.image.error[1]);
        }
      }
      handleCheckInputChannel();
    },
  });
});

$(function handleInputChannelName() {
  $('#input__channel--name').on({
    input: function() {
      counterInput(this, '70');
      if ($(this).val()) {
        isName = true;
      } else {
        isName = false;
      }
      handleCheckInputChannel();
    },
  });
});

$(function handleInputChannelDesc() {
  $('#input__channel--desc').on({
    input: function() {
      counterInput(this, '1000');
      if ($(this).val()) {
        isDesc = true;
      } else {
        isDesc = false;
      }
      handleCheckInputChannel();
    },
  });
});

$(function handleInputModeratorEmail() {
  $('#input__channel--moderator-email').on({
    input: function() {
      handleInputError(
        inputEmail,
        'Please enter your email accounts in Tokopedia',
        true
      );
      if ($(this).val()) {
        isModeratorEmail = true;
      } else {
        isModeratorEmail = false;
      }
      handleCheckInputChannel()
    },
    focus: function() {
      handleInputError(
        inputEmail,
        'Please enter your email accounts in Tokopedia',
        true
      );
    },
    keypress: function() {
      if (event.charCode == 13) {
        $('#btn__channel--moderator-email').click();
      }
    },
  });
});

$(function checkModeratorEmail() {
  $('#btn__channel--moderator-email').on({
    click: function() {
      loadingCheckEmail(true);

      // if (!validateEmail(email)) {
      //   setTimeout(() => {
      //     loadingCheckEmail(false);
      //   }, 500);
      //   handleInputError(inputEmail, helper.email.error[0], false);
      //   $('.create-channel__moderator').removeClass('create-channel__moderator--show');
      //   return false;
      // }

      if (email.val() !== 'i') {
        setTimeout(() => {
          loadingCheckEmail(false);
        }, 500);
        handleInputError(inputEmail, helper.email.error[1], false);
        $('.create-channel__moderator').removeClass('create-channel__moderator--show');
        return false;
      }

      setTimeout(() => {
        loadingCheckEmail(false);
        $('.unf-user-input__icon').addClass('icon-check');
      }, 500);

      isModeratorEmail = true;
      isModeratorName = true;
      handleCheckInputChannel();

      $('.customScrollBar--create-channel').animate({ scrollTop: 520 }, 1200);
      $('.create-channel__moderator').addClass('create-channel__moderator--show');
    },
  });
});

$(function handleInputModeratorName() {
  $('#input__channel--moderator-name').on({
    input: function () {
      if ($(this).val()) {
        isModeratorName = true
      } else {
        isModeratorName = false
      }
      handleCheckInputChannel()
    }
  })
})

$(function handleCreateChannel() {
  $('#btn__channel--create').on({
    click: function () {

      const id = dataChannel[dataChannel.length - 1].id + 1
      const name = $('#input__channel--name').val()
      const description = $('#input__channel--desc').val()
      const moderator = $('#input__channel--moderator-name').val()

      const newChannel = {
        id,
        url: '',
        status: 1,
        archive: false,
        img: './assets/img/gc1.jpg',
        name,
        description,
        moderator
      }

      pushData(newChannel)
    }
  })
})

function resetInputValueChannel() {
  if (inputEmail.hasClass('unf-user-input--isError')) {
    inputEmail.removeClass('unf-user-input--isError');
    $('.unf-user-input--moderator-email .unf-user-input__info-msg').text('Please enter your email accounts in Tokopedia');
  }

  if ($('.create-channel__moderator').hasClass('create-channel__moderator--show')) {
    $('.unf-user-input--moderator-email .unf-user-input__icon').removeClass('icon-check');
    $('.create-channel__moderator').removeClass('create-channel__moderator--show');
  }

  // reset input
  $('#input__channel--name').val('');
  $('#input__channel--desc').val('');
  $('#input__channel--moderator-email').val('');

  // reset img
  resetInputImageChannel()
  handleDialogClose();
}

function resetInputImageChannel() {
  $('.unf-user-input__image-container').addClass('hide');
  $('#img__channel--cover').removeAttr('src');
  $('#input__channel--cover').val('');
}

function handleCheckInputChannel() {
  if (isCover && isName && isDesc && isModeratorEmail && isModeratorName) {
    $('#btn__channel--create').attr('disabled', false);
  } else {
    $('#btn__channel--create').attr('disabled', true);
  }
}

function loadingCheckEmail(loading) {
  if (loading) {
    $('.unf-user-input__icon').removeClass('icon-check');
    $('.unf-user-input__icon').addClass('icon-loader');
  } else {
    $('.unf-user-input__icon').removeClass('icon-loader');
  }
}
