$(document).ready(function() {
  handleLiveChat();
});

function handleLiveChat() {
  var height = $('.live-chat__area')[0].scrollHeight;
  $('.live-chat__area').scrollTop(height);
}

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

$(function handleLiveChatSendText() {
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
      $('#input__live-chat--text').val('');
      handleLiveChat();
      $(this).attr('disabled', true);
    },
  });
});

// send Image

$(function onClickLiveChatImg() {
  $('#upload__live-chat--send-img').on({
    click: function() {
      $('#input__live-chat--send-img').click();
    },
  });
});

$(function onChangeLiveChatImg() {
  $('#change__live-chat--send-img').on({
    click: function() {
      $('#upload-gc-cover-img').click();
    },
  });
});

$(function onDeleteLiveChatImg() {
  $('#delete__live-chat--send-img').on({
    click: function() {
      $('.unf-user-input__image-container').addClass('hide');
      $('#img__live-chat--send-img').removeAttr('src');
      $('#input__live-chat--send-img').val('');
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
              .html(file[0].name)
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
    },
  });
});

$(function handleInputLiveChatUrl() {
  $('#input__live-chat--url').on({
    input: function() {
      var btn = $(this)
        .closest('section')
        .find('.send-input__btn');
      if ($(this).val()) {
        btn.attr('disabled', false);
      } else {
        btn.attr('disabled', true);
      }
    },
  });
});
