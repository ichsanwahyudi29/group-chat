$(window).on({
  resize: function() {
    var width = 1200;
    if ($(window).width() < width) {
      $('.group-chat').addClass('group-chat--mini');
    } else {
      $('.group-chat').removeClass('group-chat--mini');
    }
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

  for (let i = 0; i < 50; i++) {
    var emoji = `
      <a class="emoji-outer">
        <span class="emoji-icon">&#x1F60${i}</span>
      </a>
    `;

    var emoji2 = `
      <a class="emoji-outer">
        <span class="emoji-icon">&#x1F6${i}0</span>
      </a>
    `;

    $('.unf-user-input__emoji-content').append(emoji);
    $('.unf-user-input__emoji-content').append(emoji2);
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
      if (emoji != 'unf-user-input__icon-emoji') {
        $('.unf-user-input__icon-emoji').removeClass('unf-user-input__icon-emoji--show');
      }
    }
  })

  $('.unf-user-input__icon-emoji').on({
    click: function () {
      $(this).toggleClass('unf-user-input__icon-emoji--show');
    },
  });
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
