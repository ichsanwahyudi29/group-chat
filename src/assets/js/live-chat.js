$(document).ready(function() {
  handleScrollLiveChat();
});

// Quick Reply
$(function handleQuickReplyLiveChat() {
  $('.live-chat__quick-reply-bubble').on({
    click: function() {
      var chatVal = $(this).children().html()
      console.log(chatVal)
      var chat = `
        <div class="live-chat__content">
          <img class="live-chat__content-ava" src="./assets/img/gc1.jpg" alt="">
          <div class="live-chat__content-text">
            <div class="live-chat__content-profile">
              <span class="profile-name profile-name--influencer">Darius Sinathrya</span>
              <label class="unf-user-label unf-user-label--small unf-user-label--green ml-4">admin</label>
              <span class="profile-time">12.00</span>
            </div>
            <p class="live-chat__content-msg">${chatVal}</p>
          </div>
        </div>
      `;
      $('.live-chat__area').append(chat);
      handleScrollLiveChat();
    },
  });
});

// Send Text

$(function onInputLiveChatText() {
  $('#input__live-chat--text').on({
    input: function() {
      handleBtnLiveChat(this);
    },
    keypress: function(e) {
      if (e.which === 13) {
        $('#btn__live-chat--text').click();
      }
    },
  });
});

$(function handleScrollLiveChatSendText() {
  $('#btn__live-chat--text').on({
    click: function() {
      var chatVal = $('#input__live-chat--text').val();
      var chat = `
        <div class="live-chat__content">
          <img class="live-chat__content-ava" src="./assets/img/gc1.jpg" alt="">
          <div class="live-chat__content-text">
            <div class="live-chat__content-profile">
              <span class="profile-name profile-name--influencer">Darius Sinathrya</span>
              <label class="unf-user-label unf-user-label--small unf-user-label--green ml-4">admin</label>
              <span class="profile-time">12.00</span>
            </div>
            <p class="live-chat__content-msg">${chatVal}</p>
          </div>
        </div>
      `;
      $('.live-chat__area').append(chat);
      handleScrollLiveChat();
      $('#input__live-chat--text').val('');
      $(this).attr('disabled', true);
    },
  });
});

// send Image

$(function onChangeLiveChatImg() {
  $('#upload__live-chat--send-img, #change__live-chat--send-img').on({
    click: function() {
      $('#input__live-chat--send-img').click();
    },
  });
});

$(function onDeleteLiveChatImg() {
  $('#delete__live-chat--send-img').on({
    click: function() {
      resetInputImageLiveChat();
      handleCheckInputLiveChat();
    },
  });
});

$(function handleInputLiveChatlImg() {
  $('#input__live-chat--send-img').on({
    change: function() {
      var imgType = ['image/png', 'image/jpg', 'image/jpeg'];
      var file = this.files;
      console.log(file);
      if (file.length !== 0) {
        if (
          file[0].type == imgType[0] ||
          file[0].type == imgType[1] ||
          file[0].type == imgType[2]
        ) {
          if (file[0].size <= 10000000) {
            isCover = true;
            $(this)
              .closest('.unf-user-input__control--image')
              .find('.unf-user-input__image-name')
              .html(file[0].name);
            readURL(this);
          } else {
            handleOpenToaster(true, true, helper.image.error[0]);
          }
        } else {
          handleOpenToaster(true, true, helper.image.error[1]);
        }
      }
      handleCheckInputLiveChat();
    },
  });
});

$(function onInputLiveChatUrl() {
  $('#input__live-chat--url').on({
    input: function() {
      handleCheckInputLiveChat();
    },
    focus: function() {
      handleInputError($(this).closest('.unf-user-input'), '', true);
    },
    keypress: function(e) {
      if (e.which === 13) {
        $('#btn__live-chat--url').click();
      }
    },
  });
});

$(function handleScrollLiveChatSendText() {
  $('#btn__live-chat--url').on({
    click: function() {
      var urlVal = $('#input__live-chat--url').val();
      var imgVal = $('#img__live-chat--send-img').attr('src');
      var input = $('#input__live-chat--url').closest('.unf-user-input');
      var chat = `
        <div class="live-chat__content">
          <img class="live-chat__content-ava" src="./assets/img/gc1.jpg" alt="">
          <div class="live-chat__content-text">
            <div class="live-chat__content-profile">
              <span class="profile-name profile-name--influencer">Darius Sinathrya</span>
              <label class="unf-user-label unf-user-label--small unf-user-label--green ml-4">admin</label>
              <span class="profile-time">12.00</span>
            </div>
            <div class="live-chat__image">
              <a href="${urlVal}" target="_blank">
                <img class="live-chat__content-img" src="${imgVal}" alt="">
              </a> 
            </div>
          </div>
        </div>
      `;

      if (!validateURL(urlVal)) {
        handleInputError(input, helper.link.error[0], false);
        return false;
      }
      $('.live-chat__area').append(chat);
      handleScrollLiveChat();
      resetInputImageLiveChat();
      $('#input__live-chat--url').val('');
      $(this).attr('disabled', true);
    },
  });
});

function resetInputImageLiveChat() {
  $('.unf-user-input__image-container').addClass('hide');
  $('#img__live-chat--send-img').removeAttr('src');
  $('#input__live-chat--send-img').val('');
}

function handleCheckInputLiveChat() {
  var imgVal = $('#input__live-chat--send-img').val();
  var urlVal = $('#input__live-chat--url').val();

  if (!!imgVal && !!urlVal) {
    $('#btn__live-chat--url').attr('disabled', false);
  } else {
    $('#btn__live-chat--url').attr('disabled', true);
  }
}

function handleScrollLiveChat() {
  var height = $('.live-chat__area')[0].scrollHeight;
  $('.live-chat__area').scrollTop(height);
}

function handleBtnLiveChat(e) {
  var btn = $(e)
    .closest('section')
    .find('.send-input__btn');
  if ($(e).val()) {
    btn.attr('disabled', false);
  } else {
    btn.attr('disabled', true);
  }
}

function validateURL(val) {
  var regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g;

  if (!regex.test(val)) {
    return false;
  }

  return true;
}
