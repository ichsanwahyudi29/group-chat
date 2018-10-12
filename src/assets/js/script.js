var isCover = false
var isName = false
var isDesc = false
var isModeratorEmail = false
var isModeratorName = false

var email = $('#moderator-email')
var inputEmail = $('.unf-user-input--moderator-email')

$(document).ready(function () {
  // init 
  $('.customScrollBar').scrollbar();
  initCustomSelect();
  // handleDialogOpen($('.unf-user-dialog--create-gc'))

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

  $('#change-gc-cover-img').on({
    click: function () {
      $('#upload-gc-cover-img').click()
    }
  })

  $('#delete-gc-cover-img').on({
    click: function () {
      $('.unf-user-input__image-container').addClass('hide')
      $('#gc-cover-img').removeAttr('src')
       $('#input-gc-cover-img').val('')
    }
  })

  $('#input-gc-cover-img').on({
    change: function () {
      var imgType = ["image/png", "image/jpg", "image/jpeg"];
      if (this.files.length !== 0) {
        if (this.files[0].type == imgType[0] || this.files[0].type == imgType[1] || this.files[0].type == imgType[2]) {
          if (this.files[0].size <= 10000000) {
            isCover = true
            readURL(this);
          } else {
            $(this).val('')
            handleOpenToaster(true, true, helper.image.error[0])
          }
        }else{
          handleOpenToaster(true, true, helper.image.error[1])
          $(this).val('')
        }
      }
      checkInputEmpty()
    }
  })

  $('#gc-name').on({
    input: function () {
      counterInput(this, '70')
      if($(this).val()){
        isName = true
      }else{
        isName = false
      }
      checkInputEmpty()
    }
  })

  $('#gc-desc').on({
    input: function () {
      counterInput(this, '1000')
      if($(this).val()){
        isDesc = true
      }else{
        isDesc = false
      }
      checkInputEmpty()
    }
  })

  $('#moderator-email').on({
    input: function () {
      // isModeratorEmail = true
      // checkInputEmpty()
    },
    focus: function () {
      handleInputError(inputEmail, 'Please enter your email accounts in Tokopedia', true)
    },
    keypress: function () {
      handleInputError(inputEmail, 'Please enter your email accounts in Tokopedia', true)
      if (event.charCode == 13) {
        $('#check-moderator-email').click();
      }
    }
  })

  $('#check-moderator-email').on({
    click: function () {
      loadingCheckEmail(true)

      // if (!validateEmail(email)) {
      //   setTimeout(() => {
      //     loadingCheckEmail(false)
      //   }, 500);
      //   handleInputError(inputEmail, helper.email.error[0], false);
      //   $('.create-gc__moderator').removeClass('create-gc__moderator--show')
      //   return false;
      // }

      if (email.val() !== 'i') {
        setTimeout(() => {
          loadingCheckEmail(false)
        }, 500);
        handleInputError(inputEmail, helper.email.error[1], false)
        $('.create-gc__moderator').removeClass('create-gc__moderator--show')
        return false
      }

      setTimeout(() => {
        loadingCheckEmail(false)
        $('.unf-user-input__icon').addClass('unf-user-input__icon--check')
    
      }, 500);

      isModeratorEmail = true
      isModeratorName = true

      console.log(isModeratorEmail, isModeratorName)
      checkInputEmpty()
      
      $('.customScrollBar--create-gc').animate({
        scrollTop: 520
      }, 1200)


      $('.create-gc__moderator').addClass('create-gc__moderator--show')
      
    }
  })

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

})

function readURL(input) {
  var fileElem = document.getElementById(input.id).nextElementSibling;
  var previewImg = fileElem.children[0];
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      previewImg.src = e.target.result;
    };
    $(fileElem).removeClass('hide');

    reader.readAsDataURL(input.files[0]);
  }
}

function counterInput(el, maxLength) {
  var _self = $(el)
  var length = _self.val().length
  var counter = _self.next().find('.unf-user-input__info-counter')
  counter.html(`${length}/${maxLength}`)
}

function checkInputEmpty() {
  console.log(isCover, isName, isDesc, isModeratorEmail, isModeratorName)
  if (isCover && isName && isDesc && isModeratorEmail && isModeratorName) {
    $('#save-create-gc').attr('disabled', false);
  } else {
    $('#save-create-gc').attr('disabled', true);
  }
}

function showPreview() {
  handleDialogOpen($('.unf-user-dialog--preview-gc'));
}

function initCustomSelect() {
  $('select').each(function () {
    var $this = $(this),
      numberOfOptions = $(this).children('option').length;

    $this.addClass('unf-user-select__hidden');
    $this.wrap('<div class="unf-user-select"></div>');
    $this.after('<div class="unf-user-select__selected"><span></span></div>');

    var $styledSelect = $this.next('div.unf-user-select__selected');
    console.log($styledSelect)
    $styledSelect.text($this.children('option').eq(0).text());
    

    var $list = $('<ul />', {
      'class': 'unf-user-select__options'
    }).insertAfter($styledSelect);

    for (var i = 0; i < numberOfOptions; i++) {
      $('<li />', {
        text: $this.children('option').eq(i).text(),
        rel: $this.children('option').eq(i).val()
      }).appendTo($list);
    }

    var $listItems = $list.children('li');

    $styledSelect.click(function (e) {
      e.stopPropagation();
      $('div.unf-user-select__selected.unf-user-select__selected--open').not(this).each(function () {
        $(this).removeClass('unf-user-select__selected--open')
      });
      $(this).toggleClass('unf-user-select__selected--open')
    });

    $listItems.click(function (e) {
      e.stopPropagation();
      $styledSelect.text($(this).text()).removeClass('unf-user-select__selected--open');
      $this.val($(this).attr('rel'));
      // $list.hide();
      //console.log($this.val());
    });

    $(document).click(function () {
      $styledSelect.removeClass('unf-user-select__selected--open');
      // $list.hide();
    });

  });
}

