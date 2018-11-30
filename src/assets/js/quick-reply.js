var addQuickReplyContent;
var isQuickMsg = false;

$(document).ready(function() {
  loopDataQuickReply();
});

var dataQuickReply = [
  {
    id: 200,
    message: 'Halo',
    status: 0,
  },
  {
    id: 201,
    message: 'Sundul Gan',
    status: 1,
  }
];

function loopDataQuickReply() {
  $('.quick-reply .table__list tbody').empty();
  for (const data of dataQuickReply) {
    var listQuickReply = `
      <tr>
        <td class="table__list-num">
          <h6 class="list-num__id">${data.id}</h6>
        </td>
        <td class="table__list-content">
          <p class="list-content__text-msg">${data.message}</p>
        </td>
        <td class="table__list-action">
          <div class="list-action">
            <div class="list-action__set">
              <select class="table__list-status ${data.status === 0 ? 'table__list-status--inactive' : ''}" onchange="handleChangeQuickReplyStatus(this, ${data.id})">
                <option value="Active" ${data.status === 1 ? 'selected' : ''}>Active</option>
                <option value="Inactive" ${data.status === 0 ? 'selected' : ''}>Inactive</option>
              </select>
            </div>
            <div class="list-action__btn">
              <a class="unf-user-btn unf-user-btn--small group-chat__btn-action group-chat__btn--edit" onclick="handleClickEditQuickReply(${data.id})"><span>edit</span></a>
              <a class="unf-user-btn unf-user-btn--small group-chat__btn-action group-chat__btn--delete" onclick="handleClickDeleteQuickReply(${data.id})"><span>delete</span></a>
            </div>
          </div>
        </td>
      </tr>
    `;

    $('.quick-reply .table__list tbody').append(listQuickReply);
  }
  initCustomSelect()
}

$(function handleAddQuickReply() {
  $('#btn__quick-reply--add').on({
    click: function() {
      addQuickReplyContent = $('.js__child-dialog-add-quick-reply').html()
      dialogModule.renderDialog({
        title: 'Add Quick Reply',
        children: $('.js__child-dialog-add-quick-reply'),
        close: true,
        styleClass: 'dialog--414',
        btnPrimaryDisabled: true,
        btnTextPrimary: 'Save',
        init: initAddEditQuickReply,
        handleClickPrimary: () => { handleSaveQuickReply() },
        handleClickSecondary: handleCloseQuickReply
      });
      $('.js__child-dialog-add-quick-reply').html('')
    },
  });
});

function handleClickEditQuickReply(id) {
  addQuickReplyContent = $('.js__child-dialog-add-quick-reply').html()
  dialogModule.renderDialog({
    title: 'Edit Quick Reply',
    children: $('.js__child-dialog-add-quick-reply'),
    close: true,
    styleClass: 'dialog--414',
    btnPrimaryDisabled: false,
    btnTextPrimary: 'Save',
    init: initAddEditQuickReply,
    handleClickPrimary: () => { handleSaveQuickReply(id) },
    handleClickSecondary: handleCloseQuickReply
  });
  $('.js__child-dialog-add-quick-reply').html('')
  handleFetchQuickReplyData(id)
}

$(function handleInputQuickMsg(){
  $(document).on('input', '#input__quick-reply', function(){
    if ($(this).val()) {
      isQuickMsg = true;
    } else {
      isQuickMsg = false;
    }
    handleCheckInputQuickReply();
  })
  $(document).on('click', '.emoji-outer', function(){
    if($('#input__quick-reply').val()){
      isQuickMsg = true;
    } else {
      isQuickMsg = false;
    }
    handleCheckInputQuickReply();
  })
})

function handleCheckInputQuickReply(){
  if(isQuickMsg){
    $('.unf-user-dialog__action .unf-user-btn--primary').attr('disabled', false);
  }
  else{
    $('.unf-user-dialog__action .unf-user-btn--primary').attr('disabled', true);
  }
}

function handleFetchQuickReplyData(id){
  var data = dataQuickReply.filter(item => item.id === id)[0]
  $('#input__quick-reply').val(data.message);
  isQuickMsg = true;
  handleCheckInputQuickReply();
}

//dummy action
function handleSaveQuickReply(id){
  if(id === undefined){
    // Add
    var newId = 200;
    var newQuickReply = {}
    if(dataQuickReply.length > 0){
      newId = dataQuickReply[dataQuickReply.length-1].id + 1
    }
    newQuickReply.id = newId,
    newQuickReply.message = $('#input__quick-reply').val(),
    newQuickReply.status = 0
    dataQuickReply.push(newQuickReply)
  }
  else{
    // Edit
    dataQuickReply.map(item => {
        if(item.id === parseInt(id)){
            item.message = $('#input__quick-reply').val()
        }
    })
  }
  loopDataQuickReply()
  handleCloseQuickReply()
}

function handleCloseQuickReply(){
  //put back html 
  $('.js__child-dialog-add-quick-reply').html(addQuickReplyContent)
  handleDialogClose()
}

function handleClickDeleteQuickReply(id) {
  dialogModule.renderDialog({
    title: 'Delete Quick Reply',
    children: $('.js__child-dialog-delete-quick-reply'),
    close: false,
    styleClass: 'dialog--320',
    btnTextPrimary: 'Yes, Delete',
    handleClickPrimary: function(){handleDeleteQuickReply(id)},
  });
}
//dummy action
function handleDeleteQuickReply(id){
  dataQuickReply.map((item, index) => {
    if(item.id === id){
      dataQuickReply.splice(index, 1)
    }
  })
  loopDataQuickReply();
  handleDialogClose();
}

//quick reply status
function handleChangeQuickReplyStatus(e, id) {
  if(e.selectedIndex === 0){
      dialogModule.renderDialog({
          title: 'Activate Quick Reply',
          children: $('.js__child-dialog-activate-quick-reply'),
          close: false,
          styleClass: 'dialog--320',
          btnTextPrimary: 'Yes, Activate',
          handleClickPrimary: function() {handleActivateQuickReply(id)}
      });
  }else{
      dialogModule.renderDialog({
          title: 'Deactive Quick Reply',
          children: $('.js__child-dialog-deactivate-quick-reply'),
          close: false,
          styleClass: 'dialog--320',
          btnTextPrimary: 'Yes, Deactive',
          handleClickPrimary: function() {handleDeactivateQuickReply(id)}
      });
  }
}
function handleActivateQuickReply(id) {
  handleStatusQuickReply(id , 1)
}
function handleDeactivateQuickReply(id) {
  handleStatusQuickReply(id , 0)
}
//dummy action
function handleStatusQuickReply(id, val) {
  dataQuickReply.map(item => {
    if(item.id === id){
      item.status = val
    }
  })
  loopDataQuickReply();
  handleDialogClose();
}

function initAddEditQuickReply() {
  isQuickMsg = false;
}