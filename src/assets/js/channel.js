var contentCreateChannel, contentPreviewChannel;
var isCover = false;
var isName = false;
var isDesc = false;
var isModeratorEmail = false;
var isModeratorName = false;

var email = $('#input__channel--moderator-email');
var inputEmail = $('.unf-user-input--moderator-email');

//Create Channel Group Chat]
$(function handleClickCreateChannel() {
  $('.group-chat__btn--create').on({
    click: function() {
      contentCreateChannel = $('.js__child-dialog-create-channel').html()
      dialogModule.renderDialog({
        title: 'Create Group Chat',
        children: $('.js__child-dialog-create-channel'),
        close: true,
        init: resetInputValueChannel,
        styleClass: 'dialog--520 create-channel',
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
  customCreateDialog('remove')
  handleDialogClose()
}

function customCreateDialog(state){
  if(state === 'add'){
    $('.js__template-dialog').find('.unf-user-dialog__body').addClass('customScrollBar customScrollBar--y customScrollBar--create-channel')
    $('.customScrollBar').scrollbar();

    $('.customScrollBar--create-channel').on({
      scroll: function() {
        var scroll = $(this).scrollTop();
        var title = $('.unf-user-dialog__title')

        if (scroll > 0) {
          title.addClass('unf-user-dialog__header-shadow');
        } else {
          title.removeClass('unf-user-dialog__header-shadow');
        }
      },
    });
  }
  else{
    $('.js__template-dialog').find('.unf-user-dialog__body').removeClass('customScrollBar customScrollBar--y customScrollBar--create-channel')
  }
}

$(function onChangeChannelImg() {
  $(document).on('click', '#upload__channel--cover, #change__channel--cover', function(){
    $('#input__channel--cover').click();
  })
});

$(function onDeleteChannelImg() {
  $(document).on('click', '#delete__channel--cover', function(){
    resetInputImageChannel()
    handleCheckInputChannel()
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
          readURLCrop(this);
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

//cropper
function readURLCrop(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {
      $("#image-editor-canvas").attr("src", e.target.result);
      editPictureDialog();
      cropImg(2,1);
    };

    reader.readAsDataURL(input.files[0]);
  }
}

$("#edit-image-cancel").click(function (e) {
  $(".js__dialog-image-editor").removeClass("unf-user-dialog--show");
  $(".js__template-dialog").addClass("unf-user-dialog--show");

  handleResetEditDialog()
  cropper.destroy();
});

$("#edit-image-save").click(function (e) {
  let imgsrc = cropper.getCroppedCanvas({width: 600, height: 300}).toDataURL("image/jpeg");
  
  $(".js__dialog-image-editor").removeClass("unf-user-dialog--show");
  $(".js__template-dialog").addClass("unf-user-dialog--show");
  handleShowCroppedImg("#img__channel--cover" ,imgsrc)
  handleResetEditDialog()

  isCover = true;
  cropper.destroy();
  handleCheckInputChannel()
});

//

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
  const img = $('#img__channel--cover').prop('src')
  const url = $('#input__channel--moderator-url').val()

  const newChannel = {
    id,
    url,
    status: 1,
    archive: false,
    img,
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

  //custom dialog
  customCreateDialog('add')
}

function resetInputImageChannel() {
  $('.unf-user-input__image-container').addClass('hide');
  $('#img__channel--cover').removeAttr('src');
  $('#input__channel--cover').val('');
  isCover = false
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

// Channel Status
function handleChangeChannelStatus(e, id) {
  if(e.selectedIndex === 0){
      dialogModule.renderDialog({
          title: 'Activate Group Chat',
          children: $('.js__child-dialog-activate-channel'),
          close: false,
          styleClass: 'dialog--320',
          btnTextPrimary: 'Yes, Activate',
          handleClickPrimary: function() {handleActivateChannel(id)}
      });
  }else{
      dialogModule.renderDialog({
          title: 'Deactivate Group Chat',
          children: $('.js__child-dialog-deactive-channel'),
          close: false,
          styleClass: 'dialog--320',
          btnTextPrimary: 'Yes, Deactivate',
          handleClickPrimary: function() {handleDeactivateChannel(id)}
      });
  }
}
function handleActivateChannel(id) {
  handleStatusChannel(id , 1)
}
function handleDeactivateChannel(id) {
  handleStatusChannel(id , 2)
}
function handleStatusChannel(id, val) {
  for (const data of dataChannel) {
      if(data.id == id){
          data.status = val
          break
      }
  }
  handleDialogClose();
  loopData()
}

// Channel Archive
function handleChangeChannelArchive(id) {
  dialogModule.renderDialog({
      title: 'Archive Group Chat',
      children: $('.js__child-dialog-activate-channel'),
      close: false,
      styleClass: 'dialog--320',
      btnTextPrimary: 'Yes, Archive',
      handleClickPrimary: function() {handleArchiveChannel(id)}
  });
}

function handleArchiveChannel(id) {
  for (const data of dataChannel) {
      if(data.id == id){
          data.archive = true
          break
      }
  }
  handleDialogClose();
  loopData()
}