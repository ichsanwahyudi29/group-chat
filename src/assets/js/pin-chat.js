var addPinChatContent;
var isPinTitle = false;
var isPinMsg = false;
var isPinImg = false;
var isPinLink = false;

$(document).ready(function(){
  loopDataPinChat()
})

var dataPinChat = [
  {
    id: 200,
    title: 'Ayo Jawab Kusinya Sekarang',
    msg: 'Jawab kuisnya dengan menyertakan #TokopediaChallenge',
    img: './assets/img/gc1.jpg',
    url: 'https://www.tokopedia.com/',
    status: 1,
  }
]

function loopDataPinChat(){

  var notActivePinChat = dataPinChat.filter(item=>item.status === 0)
  dataPinChat = dataPinChat.filter(item=>item.status === 1).concat(notActivePinChat)

  $('.pinned-chat .table__list tbody').empty();
  dataPinChat.map(item => {
    var listPinChat = `
      <tr>
      <td class="table__list-num">
        <h6 class="list-num__id">${item.id}</h6>
      </td>
      <td class="table__list-content">
        <h6 class="list-content__text-msg list-content__text-msg--title">${item.title}</h6>
      </td>
      <td class="table__list-content">
        <div class="list-content">
          <div class="list-content__text">
            <p class="list-content__text-desc m-0">${item.msg}</p>
            <img class="list-content__photo list-content__photo--pinned" src="${item.img}" alt="">
          </div>
        </div>
      </td>
      <td class="table__list-action">
        <div class="list-action">
          <div class="list-action__set">
            <select class="table__list-status ${item.status === 0 ? 'table__list-status--inactive' : ''}" onchange="handleChangePinChatStatus(this,${item.id})">
              <option value="Active" ${item.status === 1 ? 'selected' : ''}>Active</option>
              <option value="Inactive" ${item.status === 0 ? 'selected' : ''}>Inactive</option>
            </select>
          </div>
          <div class="list-action__btn">
            <a class="unf-user-btn unf-user-btn--small group-chat__btn-action group-chat__btn--edit" onclick="handleClickEditPinChat(${item.id})"><span>edit</span></a>
            <a class="unf-user-btn unf-user-btn--small group-chat__btn-action group-chat__btn--delete" onclick="handleClickDeletePinChat(${item.id})"><span>delete</span></a>
          </div>
        </div>
      </td>
    </tr>
    `

    $('.pinned-chat .table__list tbody').append(listPinChat);
  })
  initCustomSelect()
}

$(function handleAddPinChat() {
  $('#btn__pin-chat--add').on({
    click: function() {
      addPinChatContent = $('.js__child-dialog-add-pin-chat').html()
      dialogModule.renderDialog({
        title: 'Add Pin Chat',
        children: $('.js__child-dialog-add-pin-chat'),
        close: true,
        styleClass: 'dialog--414',
        btnPrimaryDisabled: true,
        btnTextPrimary: 'Save',
        init: initAddEditPinChat,
        handleClickPrimary: () => {handleSavePinChat()},
        handleClickSecondary: handleClosePinChat
      });
      $('.js__child-dialog-add-pin-chat').html('')
    },
  });
});

function handleClickEditPinChat(id) {
  addPinChatContent = $('.js__child-dialog-add-pin-chat').html()
  dialogModule.renderDialog({
    title: 'Edit Pin Chat',
    children: $('.js__child-dialog-add-pin-chat'),
    close: true,
    styleClass: 'dialog--414',
    btnPrimaryDisabled: false,
    btnTextPrimary: 'Save',
    init: initAddEditPinChat,
    handleClickPrimary: () => {handleSavePinChat(id)},
    handleClickSecondary: handleClosePinChat
  });
  $('.js__child-dialog-add-pin-chat').html('')
  handleFetchPinChatData(id)
}

$(function handleInputPinTitle(){
  $(document).on('input', '#input__pin-chat--title', function(){
    if ($(this).val()) {
      isPinTitle = true;
    } else {
      isPinTitle = false;
    }
    handleCheckInputPin();
  })
})
$(function handleInputPinMsg(){
  $(document).on('input', '#input__pin-chat--msg', function(){
    counterInput(this, '200');
    if ($(this).val()) {
      isPinMsg = true;
    } else {
      isPinMsg = false;
    }
    handleCheckInputPin();
  })
})
$(function handleInputPinUrl(){
  $(document).on('input', '#input__pin-chat--url', function(){
    if ($(this).val()) {
      isPinLink = true;
    } else {
      isPinLink = false;
    }
    handleCheckInputPin();
  })
})

$(function handleChangePinImg(){
  $(document).on('click', '#upload__pin-chat--image, #change__pin-chat--image', function(){
    $('#input__pin-chat--image').click()
  })
})
$(function handleDeletePinImg() {
    $(document).on('click', '#delete__pin-chat--image', function(){
      handleResetInputCover()
    })
});
$(function handleUploadImg(){
  $(document).on('change', '#input__pin-chat--image', function(){
    var imgType = ['image/png', 'image/jpg', 'image/jpeg'];
		var file = this.files;
		if (file.length !== 0) {
		  if (
			file[0].type == imgType[0] ||
			file[0].type == imgType[1] ||
			file[0].type == imgType[2]
		  ) {
			if (file[0].size <= 10000000) {
			  isPinImg = true;
			  readURL(this);
			} else {
			  handleOpenToaster(true, true, helper.image.error[0]);
			}
		  } else {
			handleOpenToaster(true, true, helper.image.error[1]);
		  }
		}
		handleCheckInputPin();
  })
})


function handleCheckInputPin(){
  if(isPinTitle && isPinMsg && isPinLink && isPinImg){
    $('.unf-user-dialog__action .unf-user-btn--primary').attr('disabled', false);
  }
  else{
    $('.unf-user-dialog__action .unf-user-btn--primary').attr('disabled', true);
  }
}

function handleFetchPinChatData(id){
  var data = dataPinChat.filter(item => item.id === id)[0]
  $('#input__pin-chat--title').val(data.title);
  $('#input__pin-chat--msg').val(data.msg);
  $('#input__pin-chat--url').val(data.url);
  handleRevealPinImg($('#input__pin-chat--image')[0], data.img);
  isPinTitle = true;
  isPinImg = true;
  isPinLink = true;
  isPinMsg = true;
  handleCheckInputPin();
}

function handleRevealPinImg(input, img){
  var fileElem = document.getElementById(input.id).nextElementSibling;
  $('#img__pin-chat--image').attr('src', img);
  $(fileElem).removeClass('hide');
}

//dummy action
function handleSavePinChat(id){
  if(id === undefined){
    // Add
    var newId = 200
    var newPinChat = {}
    if(dataPinChat.length > 0){
      newId = dataPinChat[dataPinChat.length-1].id + 1
    }
    newPinChat.id = newId,
    newPinChat.title = $('#input__pin-chat--title').val()
    newPinChat.msg = $('#input__pin-chat--msg').val()
    newPinChat.url = $('#input__pin-chat--url').val()
    newPinChat.img = $('#img__pin-chat--image').attr('src')
    newPinChat.status = 0
    dataPinChat.push(newPinChat)
  }
  else{
    // Edit
    dataPinChat.map(item => {
        if(item.id === id){
            item.title = $('#input__pin-chat--title').val()
            item.msg = $('#input__pin-chat--msg').val()
            item.url = $('#input__pin-chat--url').val()
            item.img = $('#img__pin-chat--image').attr('src')
        }
    })
  }
  loopDataPinChat()
  handleClosePinChat()
}

function handleClosePinChat() {
  //put back html 
  $('.js__child-dialog-add-pin-chat').html(addPinChatContent)
  handleDialogClose()
}

function handleClickDeletePinChat(id) {
  dialogModule.renderDialog({
    title: 'Delete Pin Chat',
    children: $('.js__child-dialog-delete-pin-chat'),
    close: false,
    styleClass: 'dialog--320',
    btnTextPrimary: 'Yes, Delete',
    handleClickPrimary: function(){handleDeletePinChat(id)},
  });
}
//dummy action
function handleDeletePinChat(id){
  dataPinChat.map((item, index) => {
    if(item.id === id){
      dataPinChat.splice(index, 1)
    }
  })
  loopDataPinChat();
  handleDialogClose();
}

//pin status
function handleChangePinChatStatus(e, id) {
  if(e.selectedIndex === 0){
      dialogModule.renderDialog({
          title: 'Activate Pin Chat',
          children: $('.js__child-dialog-activate-pin-chat'),
          close: false,
          styleClass: 'dialog--320',
          btnTextPrimary: 'Yes, Activate',
          handleClickPrimary: function() {handleActivatePinChat(id)}
      });
  }else{
      dialogModule.renderDialog({
          title: 'Deactive Pin Chat',
          children: $('.js__child-dialog-deactivate-pin-chat'),
          close: false,
          styleClass: 'dialog--320',
          btnTextPrimary: 'Yes, Deactive',
          handleClickPrimary: function() {handleDeactivatePinChat(id)}
      });
  }
}
function handleActivatePinChat(id) {
  handleStatusPinChat(id , 1)
}
function handleDeactivatePinChat(id) {
  handleStatusPinChat(id , 0)
}
//dummy action
function handleStatusPinChat(id, val) {
  dataPinChat.map(item => {
    if(item.id === id){
      item.status = val
    }
    else{
      item.status = 0
    }
  })
  loopDataPinChat()
  handleDialogClose();
}

function initAddEditPinChat() {
    isPinTitle = false;
    isPinMsg = false;
    isPinImg = false;
    isPinLink = false;
}