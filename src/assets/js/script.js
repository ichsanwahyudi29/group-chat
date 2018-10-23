var isCover = false;
var isName = false;
var isDesc = false;
var isModeratorEmail = false;
var isModeratorName = false;

var email = $('#moderator-email');
var inputEmail = $('.unf-user-input--moderator-email');

$(document).ready(function() {
  // init
  $('.customScrollBar').scrollbar();
  // handleDialogOpen($('.unf-user-dialog--archive-gc'))

  $('.group-chat__btn--create').on({
    click: () => {
      handleDialogOpen($('.unf-user-dialog--create-gc'));
    },
  });

  // Create GC
  $('.unf-user-dialog__close--create-gc').on({
    click: () => {
      // reset input
      $('#gc-name').val('');
      $('#gc-desc').val('');
      $('#moderator-email').val('');

      if ($('.unf-user-input--moderator-email').hasClass('unf-user-input--isError')){
        $('.unf-user-input--moderator-email').removeClass('unf-user-input--isError')
        $('.unf-user-input--moderator-email .unf-user-input__info-msg').text('Please enter your email accounts in Tokopedia')
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

  $('#upload-gc-cover-img').on({
    click: () => {
      $('#input-gc-cover-img').click();
    },
  });

  $('#change-gc-cover-img').on({
    click: () => {
      $('#upload-gc-cover-img').click();
    },
  });

  $('#delete-gc-cover-img').on({
    click: () => {
      $('.unf-user-input__image-container').addClass('hide');
      $('#gc-cover-img').removeAttr('src');
      $('#input-gc-cover-img').val('');
    },
  });

  $('#input-gc-cover-img').on({
    change: () => {
      var imgType = ['image/png', 'image/jpg', 'image/jpeg'];
      if (this.files.length !== 0) {
        if (
          this.files[0].type == imgType[0] ||
          this.files[0].type == imgType[1] ||
          this.files[0].type == imgType[2]
        ) {
          if (this.files[0].size <= 10000000) {
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

  $('#gc-name').on({
    input: () => {
      counterInput(this, '70');
      if ($(this).val()) {
        isName = true;
      } else {
        isName = false;
      }
      checkInputEmpty();
    },
  });

  $('#gc-desc').on({
    input: () => {
      counterInput(this, '1000');
      if ($(this).val()) {
        isDesc = true;
      } else {
        isDesc = false;
      }
      checkInputEmpty();
    },
  });

  $('#moderator-email').on({
    input: () => {
      // isModeratorEmail = true
      // checkInputEmpty()
    },
    focus: () => {
      handleInputError(
        inputEmail,
        'Please enter your email accounts in Tokopedia',
        true
      );
    },
    keypress: () => {
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

  $('#check-moderator-email').on({
    click: () => {
      loadingCheckEmail(true);

      if (!validateEmail(email)) {
        setTimeout(() => {
          loadingCheckEmail(false)
        }, 500);
        handleInputError(inputEmail, helper.email.error[0], false);
        $('.create-gc__moderator').removeClass('create-gc__moderator--show')
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

      $('.customScrollBar--create-gc').animate(
        {
          scrollTop: 520,
        },
        1200
      );

      $('.create-gc__moderator').addClass('create-gc__moderator--show');
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

function readURL(input) {
  var fileElem = document.getElementById(input.id).nextElementSibling;
  var previewImg = fileElem.children[0];
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {
      previewImg.src = e.target.result;
    };
    $(fileElem).removeClass('hide');

    reader.readAsDataURL(input.files[0]);
  }
}

function counterInput(el, maxLength) {
  var _self = $(el);
  var length = _self.val().length;
  var counter = _self.next().find('.unf-user-input__info-counter');
  counter.html(`${length}/${maxLength}`);
}

function checkInputEmpty() {
  // console.log(isCover, isName, isDesc, isModeratorEmail, isModeratorName);
  if (isCover && isName && isDesc && isModeratorEmail && isModeratorName) {
    $('#save-create-gc').attr('disabled', false);
  } else {
    $('#save-create-gc').attr('disabled', true);
  }
}

function initCustomSelect() {
  $('select').each(function() {
    var $this = $(this),
      numberOfOptions = $(this).children('option').length;

    var $selectedVal = this.options[this.selectedIndex].innerHTML;
    var status = this.className;

    $this.wrap('<div class="unf-user-select"></div>');
    $this.after(
      `<div class="unf-user-select__selected ${
        this.className
      }"><div class="unf-user-select__selected-arrow"></div><span></span></div>`
    );
    var $styledSelect = $this.next('div.unf-user-select__selected');
    $styledSelect.children('span').text($selectedVal);

    var $list = $('<ul />', {
      class: 'unf-user-select__options',
    }).insertAfter($styledSelect);

    for (var i = 0; i < numberOfOptions; i++) {
      $('<li />', {
        text: $this
          .children('option')
          .eq(i)
          .text(),
        rel: $this
          .children('option')
          .eq(i)
          .val(),
      }).appendTo($list);
    }

    var $listItems = $list.children('li');

    $styledSelect.click(function(e) {
      e.stopPropagation();
      $('div.unf-user-select__selected.unf-user-select__selected--open')
        .not(this)
        .each(function() {
          $(this).removeClass('unf-user-select__selected--open');
        });
      $(this).toggleClass('unf-user-select__selected--open');
    });

    $listItems.click(function(e) {
      e.stopPropagation();
      $this.val($(this).attr('rel'));

      if (status === 'channel__status-select') {
        if ($selectedVal !== $this.val()) {
          $this.change();
          return;
        }
      }

      $styledSelect
        .removeClass('unf-user-select__selected--open')
        .children('span')
        .text($(this).text());
      // $list.hide();
      //console.log($this.val());
    });

    $(document).click(function() {
      $styledSelect.removeClass('unf-user-select__selected--open');
      // $list.hide();
    });
  });
}
