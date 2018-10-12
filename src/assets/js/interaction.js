$(window).on({
  resize: function () {
    var width = 1200
    if ($(window).width() < width) {
      $('.group-chat').addClass('group-chat--mini')
    } else {
      $('.group-chat').removeClass('group-chat--mini')
    }
  },
  scroll: function () {
    var scroll = $(this).scrollTop()
    var height = 200

    if (scroll > height) {
      $('.navbar').addClass('navbar--fixed')
    } else {
      $('.navbar').removeClass('navbar--fixed')
    }
  }
})

$(document).ready(function () {
  $('.navbar__menu').on({
    click: function (e) {
      var _self = $(this)
      $('.group-chat').toggleClass('group-chat--mini')
      // Remove any old one
      $(".ripple").remove();

      // Setup
      var posX = _self.offset().left,
        posY = _self.offset().top,
        buttonWidth = _self.width(),
        buttonHeight = _self.height();

      // Add the element
      _self.append("<span class='ripple'></span>");

      // Make it round!
      if (buttonWidth >= buttonHeight) {
        buttonHeight = buttonWidth;
      } else {
        buttonWidth = buttonHeight;
      }

      // Get the center of the element
      var x = e.pageX - posX - buttonWidth / 2;
      var y = e.pageY - posY - buttonHeight / 2;


      // Add the ripples CSS and start the animation
      $(".ripple").css({
        width: buttonWidth,
        height: buttonHeight,
        top: y + 'px',
        left: x + 'px'
      }).addClass("rippleEffect");
    }
  })

  $('.customScrollBar--create-gc').on({
    scroll: function () {
      var scroll = $(this).scrollTop()

      if (scroll > 0) {
        $('.unf-user-dialog__title').addClass('unf-user-dialog__title-shadow')
      } else {
        $('.unf-user-dialog__title').removeClass('unf-user-dialog__title-shadow')
      }
    }
  })

  $('.label-tab-item').on({
    click: function () {
      var _self = $(this)[0]
      var width = _self.offsetWidth;
      var position = _self.offsetLeft;
      initTabIndicator(width, position)
    }
  })
})

// function initFirstTabActive() {
//   $('#tab-item1').prop("checked", true)
//   tabItem(1)
//   $('#tab-template1').prop("checked", true)
//   tabTemplate(1)
// }

function initTabIndicator(w, l) {
  $('#preview-options__tab-indicator').css({
    width: w,
    left: l
  })
}

function loadingCheckEmail(loading) {
  if(loading){
    $('.unf-user-input__icon').removeClass('unf-user-input__icon--check')
    $('.unf-user-input__icon').addClass('unf-user-input__icon--loader')
  }else{
    $('.unf-user-input__icon').removeClass('unf-user-input__icon--loader')
  }
}