$(document).ready(function () {
  // init 
  $('.customScrollBar').scrollbar();
  handleDialogOpen($('.unf-user-dialog--create-gc'))

  $('.navbar__menu').on({
    click: function () {
      $('.group-chat').toggleClass('group-chat--mini')
    }
  })

  $('.group-chat__btn--create').on({
    click: function () {
      handleDialogOpen($('.unf-user-dialog--create-gc'))
    }
  })

  $('.unf-user-dialog__close--create-gc').on({
    click: function () {
      handleDialogClose()
    }
  })

  $('.unf-user-dialog__close--preview-gc').on({
    click: function () {
      handleDialogClose()
    }
  })

  // Create GC
  $('#upload-gc-cover-img').on({
    click: function () {
      $('#input-gc-cover-img').click()
    }
  })

  $('#input-gc-cover-img').on({
    change: function () {
      if (this.files.length !== 0) {
        if (this.files[0].size <= 10000000) {
          // handleInputError(_usrInputFileKTP, helper.image.input[0], true);
          // isKtpImgGet = true;
          readURL(this);
        } else {
          // showToaster()
          // handleInputError(_usrInputFileKTP, helper.image.error[0], false);
        }
      }
      // checkInputnotEmpty();
    }
  })

  $('#gc-name').on({
    input: function () {
      counterInput(this, '70')
    }
  })

  $('#gc-desc').on({
    input: function () {
      counterInput(this, '1000')
    }
  })

  $('#check-moderator-email').on({
    click: function () {
      var _self = $(this)
      var el = $('#moderator-email')
      // validateEmail(el, )
    }
  })

})

function readURL(input) {
  var fileElem = document.getElementById(input.id).nextElementSibling;
  var previewImg = fileElem.children[0];
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      previewImg.src = e.target.result;
    };
    $(fileElem).removeClass('d-hide');

    reader.readAsDataURL(input.files[0]);
  }
}

function counterInput(el, maxLength) {
  var _self = $(el)
  var length = _self.val().length
  var counter = _self.next().find('.unf-user-input__info-counter')
  counter.html(`${length}/${maxLength}`)
}

// function checkInputnotEmpty() {
//   if (isKtpImgGet && isSavingBookImgGet && isPhoneNumberGet && isEmailGet) {
//     buttonSubmit.attr('disabled', false);
//   } else {
//     buttonSubmit.attr('disabled', true);
//   }
// }

function showPreview() {
  handleDialogOpen($('.unf-user-dialog--preview-gc'));
}



