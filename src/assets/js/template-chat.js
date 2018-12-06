var addTemplateDialogContent, autoSendTemplateContent;
var isTemplateChatText = true;
var isTemplateMsg = false;
var isTemplateTitle = false;
var isTemplateImg = false;
var isTemplateLink = false;
var timeIntervalId = [];

$(function initialize() {
  loopDataTemplateChat()
});

var dataTemplateChat = [
  {
      "id": 201,
      "vibrate": true,
      "autoSend": false,
      "expiredTime": null,
      "proccedTime": null,
      "img": "./assets/img/gc2.jpg",
      "url": "https://www.tokopedia.com/",
      "message": "Selamat malam Toppers, jagokan negara favorit kalian disini. Kira-kira siapa ya negara pemenang piala duni tahun ini?",
  },
  {
      "id": 202,
      "vibrate": false,
      "autoSend": true,
      "expiredTime": 120000,
      "proccedTime": 120000,
      "img": "",
      "url": "",
      "message": "Jawab kuisnya dengan menyertakan #TokopediaChallenge",
  }
]

function loopDataTemplateChat(){
  $('.template-chat .table__list tbody').empty();
  dataTemplateChat.map(item => {
    var listTemplateChat =
    `<tr class="row-template-chat">
      <td class="table__list-num">
        <h6 class="list-num__id">${item.id}</h6>
      </td>
      <td class="table__list-num">
        ${item.vibrate ? 
          '<h6 class="list-num__id list-num__id--text">Yes</h6>' : 
          '<h6 class="list-num__id list-num__id--text">No</h6>'}
      </td>
      <td class="table__list-content">
        <div class="list-content">
            <div class="list-content__text">
            <p class="list-content__text-desc m-0">${item.message}</p>
            ${item.img != '' ?
                `<img class="list-content__photo list-content__photo--template" src="${item.img}" alt="">` : ''}
            </div>
        </div>
      </td>
      <td class="table__list-action">
      <div class="list-action">
        <div class="list-action__set">
          <button class="unf-user-btn unf-user-btn--small unf-user-btn--primary group-chat__btn-send" onclick="handleSendNowTemplateChat(${item.id})">Send Now</button>
          <div class="template-chat__auto-send">
            <label class="template-chat__auto-send-label">Auto-Send</label>
              <div class="unf-user-toggle">
                ${item.autoSend ? 
                  `<input checked type="checkbox" class="unf-user-toggle__checkbox" id="testcheck-${item.id}" onclick="handleAutoSendTemplateChat(this, ${item.id})">` :
                  `<input type="checkbox" class="unf-user-toggle__checkbox" id="testcheck-${item.id}" onclick="handleAutoSendTemplateChat(this, ${item.id})">`}
                <label for="testcheck-${item.id}"></label>
              </div>
            </div>
            ${item.autoSend ?
              `<span class="template-chat__time-auto-send" id="time-auto-send-${item.id}" data-id="${item.id}">Sisa waktu: <b>${handleConvertTime(item.proccedTime)}</b></span>` : ``
            }
            </div>
          <div class="list-action__btn">
          <a class="unf-user-btn unf-user-btn--small group-chat__btn-action group-chat__btn--edit" onclick="handleClickEditTemplateChat(${item.id})"><span>edit</span></a>
          <a class="unf-user-btn unf-user-btn--small group-chat__btn-action group-chat__btn--delete" onclick="handleClickDeleteTemplateChat(${item.id})"><span>delete</span></a>
          </div>
        </div>
      </td>
    </tr>`
    $('.template-chat .table__list tbody').append(listTemplateChat);
  })
  $('.template-chat__time-auto-send').each(function(e){
      handleLooptime(`#${this.id}`, $(this).data('id'))
  })
}

$(function handleClickAddTemplateChat() {
  $('#btn__template-chat--add').on({
    click: function() {
      addTemplateDialogContent = $('.js__child-dialog-add-template').html()
      dialogModule.renderDialog({
        title: 'Add Template Chat',
        children: $('.js__child-dialog-add-template'),
        close: true,
        styleClass: 'dialog--414',
        btnPrimaryDisabled: true,
        btnTextPrimary: 'Save',
        init: initAddEditTemplateChat,
        handleClickPrimary: function() {handleSaveTemplateChat()},
        handleClickSecondary: handleCloseTemplateChat
      });
      $('.js__child-dialog-add-template').html('')
    },
  });
})

function handleClickEditTemplateChat(id) {
  addTemplateDialogContent = $('.js__child-dialog-add-template').html()
  dialogModule.renderDialog({
    title: 'Edit Template Chat',
    children: $('.js__child-dialog-add-template'),
    close: true,
    styleClass: 'dialog--414',
    btnTextPrimary: 'Save',
    init: initAddEditTemplateChat,
    handleClickPrimary: function() {handleSaveTemplateChat(id)},
    handleClickSecondary: handleCloseTemplateChat
  });
  $('.js__child-dialog-add-template').html('')
  handleFetchTemplateChat(id)
}

$(function handleInputMsg(){
  $(document).on('input', '#input__template-chat--msg', function(){
    counterInput(this, '200');
    if ($(this).val()) {
      isTemplateMsg = true;
    } else {
      isTemplateMsg = false;
    }
    handleCheckInput();
  })
})

$(function handleInputTitle(){
  $(document).on('input', '#input__image-title', function(){
    if ($(this).val()) {
      isTemplateTitle = true;
    } else {
      isTemplateTitle = false;
    }
    handleCheckInput();
  })
})

$(function handleInputLink(){
  $(document)
    .on('input', '#input__image-url', function(){
      if ($(this).val()) {
        isTemplateLink = true;
      } else {
        isTemplateLink = false;
      }
      handleCheckInput();
    })
    .on('focus', '#input__image-url', function(){
      handleInputError($(this).parent(),'', true);
    })  
})

$(function handleChangeTemplateImg(){
  $(document).on('click', '#upload__template--cover, #change__template--cover', function(){
    $('#input__template--cover').click()
  })
})

$(function handleDeleteTemplateImg() {
    $(document).on('click', '#delete__template--cover', function(){
      handleResetInputCover()
    })
});

$(function handleUploadImg(){
  $(document).on('change', '#input__template--cover', function(){
    var imgType = ['image/png', 'image/jpg', 'image/jpeg'];
		var file = this.files;
		if (file.length !== 0) {
		  if (
        file[0].type == imgType[0] ||
        file[0].type == imgType[1] ||
        file[0].type == imgType[2]
		  ) {
        if (file[0].size <= 10000000) {
          readURLTemplate(this);
        } else {
          handleOpenToaster(true, true, helper.image.error[0]);
        }
		  } else {
			handleOpenToaster(true, true, helper.image.error[1]);
		  }
		}
		handleCheckInput();
  })
})
//cropper
function readURLTemplate(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {
      $("#image-editor-canvas").attr("src", e.target.result);
      $(".js__dialog-image-editor ").find("#edit-image-save").data('id', 'template');
      editPictureDialog();
      cropImg(1,1);
    };

    reader.readAsDataURL(input.files[0]);
  }
}
// save & cancel button in channel-detail.js

function handleResetInputCover() {
  isTemplateImg = false;
  $('.unf-user-input__image-container').addClass('hide');
  $('#img__template--cover').removeAttr('src');
  $('#input__template--cover').val('');
  handleCheckInput();
}

function handleCheckInput(){
  if(isTemplateChatText){
    if(isTemplateMsg){
      $('.unf-user-dialog__action .unf-user-btn--primary').attr('disabled', false);
    }
    else{
      $('.unf-user-dialog__action .unf-user-btn--primary').attr('disabled', true);
    }
  }
  else{
    if(isTemplateTitle && isTemplateImg && isTemplateLink){
      $('.unf-user-dialog__action .unf-user-btn--primary').attr('disabled', false);
    }
    else{
      $('.unf-user-dialog__action .unf-user-btn--primary').attr('disabled', true);
    }
  }
}

function handleFetchTemplateChat(id){
  var data = dataTemplateChat.filter(item => item.id === id)[0]
  if(data.img === null || data.img === ''){
    $('.js__toggle-type-text').prop('checked', true)
    $('.js__toggle-type-img').prop('checked', false)
    $('.js__template-chat-text').removeClass('hide')
    $('.js__template-chat-image').addClass('hide')

    $('#input__template-chat--msg').val(data.message)

    isTemplateChatText = true;
    isTemplateMsg = true;
    isTemplateTitle = false;
    isTemplateImg = false;
    isTemplateLink = false;
  }
  else{
    $('.js__toggle-type-img').prop('checked', true)
    $('.js__toggle-type-text').prop('checked', false)
    $('.js__template-chat-image').removeClass('hide')
    $('.js__template-chat-text').addClass('hide')
    
    $('#input__image-title').val(data.message)
    $('#input__image-url').val(data.url)
    handleRevealTemplateImg($('#input__template--cover')[0], data.img);

    isTemplateChatText = false;
    isTemplateMsg = false;
    isTemplateTitle = true;
    isTemplateImg = true;
    isTemplateLink = true;
  }
  $('#input__template-chat--vibrate').prop('checked',data.vibrate)
  handleCheckInput();
}

function handleRevealTemplateImg(input, img){
  var fileElem = document.getElementById(input.id).nextElementSibling;
  $('#img__template--cover').attr('src', img);
  $(fileElem).removeClass('hide');
}

//dummy action
const defaultNewTemplate = {
  "id": null,
  "vibrate": false,
  "autoSend": false,
  "expiredTime": "",
  "img": "",
  "url": "",
  "message":""
}
function handleSaveTemplateChat(id){
  if(id){
    handleEditTemplate(id)
  }
  else{
    handleAddTemplate()
  }
}
//gohere
function handleAddTemplate(){
  var newId = 200;
  var newTemplateChat = {}
  if(dataTemplateChat.length > 0){
    newId = dataTemplateChat[dataTemplateChat.length-1].id + 1
  }

  if(isTemplateChatText){
    newTemplateChat = Object.assign({}, defaultNewTemplate, {
      id: newId,
      vibrate: $('#input__template-chat--vibrate').prop('checked'),
      message: $('#input__template-chat--msg').val()
    })
  }
  else{
    if (!validateURL($('#input__image-url').val())) {
      handleInputError($('#input__image-url').parent(), helper.link.error[0], false);
      return false;
    }

    newTemplateChat = Object.assign({}, defaultNewTemplate, {
      id: newId,
      vibrate: $('#input__template-chat--vibrate').prop('checked'),
      img: $('#img__template--cover').attr('src'),
      url: $('#input__image-url').val(),
      message: $('#input__image-title').val(),
    })
  }
  dataTemplateChat.push(newTemplateChat)

  loopDataTemplateChat()
  handleCloseTemplateChat()
}
function handleEditTemplate(id){
  dataTemplateChat.map(item => {
    if(item.id === id){
      if(isTemplateChatText){
        item.img = ''
        item.url = ''
        item.message = $('#input__template-chat--msg').val()
      }
      else{
        if (!validateURL($('#input__image-url').val())) {
          handleInputError($('#input__image-url').parent(), helper.link.error[0], false);
          return false;
        }
        item.img = $('#img__template--cover').attr('src')
        item.url = $('#input__image-url').val()
        item.message = $('#input__image-title').val()
      }
      item.vibrate = $('#input__template-chat--vibrate').prop('checked')
      loopDataTemplateChat()
      handleCloseTemplateChat()
    }
  })
}

function handleCloseTemplateChat() {
  //put back html 
  $('.js__child-dialog-add-template').html(addTemplateDialogContent)
  handleDialogClose()
}

function handleClickDeleteTemplateChat(id) {
  dialogModule.renderDialog({
    title: 'Delete Template Chat',
    children: $('.js__child-dialog-delete-template-chat'),
    close: false,
    styleClass: 'dialog--320',
    btnTextPrimary: 'Yes, Delete',
    handleClickPrimary: function(){handleDeleteTemplateChat(id)},
  });
}
//dummy action
function handleDeleteTemplateChat(id){
  dataTemplateChat.map((item, index) => {
    if(item.id === id){
      dataTemplateChat.splice(index, 1)
    }
  })
  loopDataTemplateChat();
  handleDialogClose();
}

function handleAutoSendTemplateChat(e, id) {
  if($(e).prop('checked')){
    dialogModule.renderDialog({
      title: 'Auto-Send Activation',
      children: $('.js__child-dialog-auto-send-template-chat'),
      close: true,
      init: handleInitAutoSend,
      styleClass: 'dialog--454',
      btnTextPrimary: 'Save',
      handleClickPrimary: function() {handleSaveAutoSend(e, id)},
      handleClickSecondary: function() {handleCancelAutoSend(e)}
    });
  }
  else{
    handleToggleAutoSend(e, id)
  }
}

function handleInitAutoSend(){
  var $range = $('#auto-send-range')
  var $duration = $('#auto-send-duration')
  $range.val($range[0].options[0].value)
  $duration.val($duration[0].options[0].value)
}

function handleChangeAutoSendSelect(e){
  $(`#${e.id}`).val(e.value)
}

function handleCancelAutoSend(e){
  $(e).prop('checked', !e.checked)
  handleDialogClose()
}

function handleToggleAutoSend(e, id){
  dataTemplateChat.map(item => {
    if(item.id === id){
      item.autoSend = $(e).prop('checked')
    }
  })
  setTimeout(function(){
    loopDataTemplateChat()
    handleDialogClose()
  }, 300)
}

//dummy action
function handleSaveAutoSend(e, id){
  var duration = $('#auto-send-duration').val()
  dataTemplateChat.map(item => {
    if(item.id === id){
      item.expiredTime = parseInt(duration)
      item.proccedTime = parseInt(duration)
    }
  })

  handleToggleAutoSend(e, id)
}

function handleConvertTime(ms){
  var minutesToGo = new Date(ms).getMinutes()
  var secondsToGo = new Date(ms).getSeconds()
  var displayMin = (minutesToGo < 10) ? '0'+ minutesToGo : minutesToGo
  var displaySec = (secondsToGo < 10) ? '0'+ secondsToGo : secondsToGo
  var displayTime = `${displayMin}m ${displaySec}s`
  return displayTime
}
function handleLooptime(elem, id){
  if(timeIntervalId.filter(item => item === elem).length === 0){
    var timeInterval = setInterval(function(){
      var data = dataTemplateChat.filter(item => item.id === id)[0]
      var $target = $(elem).find('b')
      var procced = data.proccedTime
      var expired = data.expiredTime
      $target.text(handleConvertTime(procced))
      if($(elem).length === 0 || $(elem).length > 1){
        clearInterval(timeInterval);
        timeIntervalId.map((item, index) => {
          if(item === elem) timeIntervalId.splice(index, 1);
        })
      }
      else{
        if(procced > 0){
          procced -= 1000
        }
        else{
          handleSendNowTemplateChat(id)
          procced = expired
        }
        $target.text(handleConvertTime(procced))
        dataTemplateChat.map(item => {
          if(item.id === id){
            item.proccedTime = procced
          }
        })
      }
    },1000)
    timeIntervalId.push(elem)
  }
}

//put back herer

function handleSendNowTemplateChat(id){
  var data = dataTemplateChat.filter(item => item.id === id)[0]
  $('.live-chat__area').append(renderChatText(data.message))
  if(data.img !== null && data.img !== ''){
    $('.live-chat__area')
      .append(renderChatImg(data.url, data.img))
  }
  handleScrollLiveChat();
}

function initAddEditTemplateChat() {
  $('.js__template-dialog')
    .on('click', '.js__toggle-type-img', function() {
      $(this).prop('checked', true);
      $('.js__toggle-type-text').removeAttr('checked');
      $('.js__template-chat-text').addClass('hide');
      $('.js__template-chat-image').removeClass('hide');
      isTemplateChatText = false;
      handleCheckInput();
    })
    .on('click', '.js__toggle-type-text', function() {
      $(this).prop('checked', true);
      $('.js__toggle-type-img').removeAttr('checked');
      $('.js__template-chat-image').addClass('hide');
      $('.js__template-chat-text').removeClass('hide');
      isTemplateChatText = true;
      handleCheckInput();
    })
    .find('.js__toggle-type-img').prop('checked', false).end()
    .find('.js__toggle-type-text').prop('checked', true).end()
    .find('.js__template-chat-text').removeClass('hide').end()
    .find('.js__template-chat-image').addClass('hide').end()
    .find('#input__template-chat--vibrate').prop('checked',false)
    //reset all status
    isTemplateChatText = true;
    isTemplateMsg = false;
    isTemplateTitle = false;
    isTemplateImg = false;
    isTemplateLink = false;
}