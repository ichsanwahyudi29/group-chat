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
        init: resetInputValueChannel,
        styleClass: 'dialog--520 customScrollBar--create-channel',
        btnTextPrimary: 'Save',
        btnPrimaryDisabled: true,
        handleClickPrimary: handleCreateChannel,
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
  $(document).on('scroll', '.customScrollBar--create-channel .unf-user-dialog__body', function(){
    var scroll = $(this).scrollTop();
    var title = $('.unf-user-dialog__header')

    if (scroll > 0) {
      title.addClass('unf-user-dialog__header-shadow');
    } else {
      title.removeClass('unf-user-dialog__header-shadow');
    }
  })
  /* $('.customScrollBar--create-channel .unf-user-dialog__body').on({
    scroll: function() {
      var scroll = $(this).scrollTop();
      var title = $('.unf-user-dialog__header')

      if (scroll > 0) {
        title.addClass('unf-user-dialog__header-shadow');
      } else {
        title.removeClass('unf-user-dialog__header-shadow');
      }
    },
  }); */
})

$(function onChangeChannelImg() {
  $(document).on('click', '#upload__channel--cover, #change__channel--cover', function(){
    $('#input__channel--cover').click();
  })
});

$(function onDeleteChannelImg() {
  $(document).on('click', '#delete__channel--cover', function(){
    resetInputImageChannel()
  })
});

$(function handleInputChannelImg() {
  $(document).on('change', '#input__channel--cover', function(){
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
  })
});

$(function handleInputChannelName() {
  $(document).on('input', '#input__channel--name', function(){
    counterInput(this, '70');
    if ($(this).val()) {
      isName = true;
    } else {
      isName = false;
    }
    handleCheckInputChannel();
  })
});

$(function handleInputChannelDesc() {
  $(document).on('input', '#input__channel--desc', function(){
    counterInput(this, '1000');
    if ($(this).val()) {
      isDesc = true;
    } else {
      isDesc = false;
    }
    handleCheckInputChannel();
  })
});

$(function handleInputModeratorEmail() {
  $(document).on('input', '#input__channel--moderator-email', function(){
    $('.create-channel__moderator').removeClass('create-channel__moderator--show');
    $('.unf-user-input__icon').removeClass('icon-check');
    isModeratorName = false;
    var inputEmail = $('.unf-user-input--moderator-email');
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
  }).on('focus', '#input__channel--moderator-email', function(){
    handleInputError(
      inputEmail,
      'Please enter your email accounts in Tokopedia',
      true
    );
  }).on('keypress', '#input__channel--moderator-email', function(){
    if (event.charCode == 13) {
      $('#btn__channel--moderator-email').click();
    }
  })
});

$(function checkModeratorEmail() {
  $(document).on('click', '#btn__channel--moderator-email', function(){
    loadingCheckEmail(true);
    var email = $('#input__channel--moderator-email');
    var inputEmail = $('.unf-user-input--moderator-email');
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

    $('.customScrollBar--create-channel .unf-user-dialog__body').animate({ scrollTop: 520 }, 1200);
    $('.create-channel__moderator').addClass('create-channel__moderator--show');
  })
});

$(function handleInputModeratorName() {
  $(document).on('input', '#input__channel--moderator-name', function(){
    if ($(this).val()) {
      isModeratorName = true
    } else {
      isModeratorName = false
    }
    handleCheckInputChannel()
  })
})

function handleCreateChannel() {
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
  handleCloseCreateChannel()
}

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
}

function resetInputImageChannel() {
  $('.unf-user-input__image-container').addClass('hide');
  $('#img__channel--cover').removeAttr('src');
  $('#input__channel--cover').val('');
}

function handleCheckInputChannel() {
  if (isCover && isName && isDesc && isModeratorEmail && isModeratorName) {
    $('.unf-user-dialog__action .unf-user-btn--primary').attr('disabled', false);
  } else {
    $('.unf-user-dialog__action .unf-user-btn--primary').attr('disabled', true);
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
