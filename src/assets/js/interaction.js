$(document).ready(function(){
  windowSizeCheck()
})

function windowSizeCheck(){
  var width = 1200;
  if($(window).width() < width ){
    $('.group-chat').addClass('group-chat--mini');
  } else {
    $('.group-chat').removeClass('group-chat--mini');
  }
}

$(window).on({
  resize: function() {
    windowSizeCheck()
  },
  scroll: function() {
    var scroll = $(this).scrollTop();
    var height = 200;

    if (scroll > height) {
      $('.navbar').addClass('navbar--fixed');
    } else {
      $('.navbar').removeClass('navbar--fixed');
    }
  },
});

$(document).ready(function() {
  $('.navbar__menu').on({
    click: function(e) {
      var _self = $(this);
      $('.group-chat').toggleClass('group-chat--mini');
    },
  });

  // tab

  $('.preview-options__tab .tab-options__item-label').on({
    click: function() {
      optionsTab(this);
    },
  });

  $('.send-input__tab .tab-options__item-label').on({
    click: function() {
      optionsTab(this);
    },
  });

  var emoji = `
     <a class="emoji-outer">
      <span class="emoji-icon">&#x1F600</span>
    </a>
  `;

  for(var i = 0; i < 80; i++){
    var iString = i.toString(16)
    if(iString.length < 2){
      iString = '0'+iString
    }
    else{
      iString = iString
    }
    var emoji = `
    <a class="emoji-outer">
      <span class="emoji-icon">&#x1F6${iString}</span>
    </a>`;
    $('.unf-user-input__emoji-content').append(emoji);
  }

});


// function initFirstTabActive() {
//   $('#tab-item1').prop("checked", true)
//   tabItem(1)
//   $('#tab-template1').prop("checked", true)
//   tabTemplate(1)
// }

$(function handleEmoji() {
  $('body').on({
    click: function (e) {
      let emoji = e.target.classList[0];
      /* if (emoji != 'unf-user-input__icon-emoji') {
        $('.unf-user-input__icon-emoji').removeClass('unf-user-input__icon-emoji--show');
      } */
    }
  })

  $(document).on('click', '.unf-user-input__icon-emoji', function(){
    $(this).toggleClass('unf-user-input__icon-emoji--show');
  })
  $(document).on('click', '.emoji-outer', function(e){
    var $thisEmoji = $(this).children().html()
    var $targetInput = $(this).parents('.unf-user-input__icon-emoji').prev('input');
    $targetInput[0].value += $thisEmoji
    $targetInput.focus()
  })
  /* $('.unf-user-input__icon-emoji').on({
    click: function () {
      $(this).toggleClass('unf-user-input__icon-emoji--show');
    },
  }); */
})

function optionsTab(e) {
  var _self = $(e)[0];
  var width = _self.offsetWidth;
  var position = _self.offsetLeft;
  var ul = _self.closest('ul');
  var indicatorId = $(ul).find('.tab-options__indicator')[0].id;
  initTabIndicator(indicatorId, width, position);
}

function initTabIndicator(id, w, l) {
  $(`#${id}`).css({
    width: w,
    left: l,
  });
}
