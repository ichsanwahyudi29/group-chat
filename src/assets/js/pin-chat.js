$(document).ready(function () {
  // handleDialogOpen($('.unf-user-dialog--add-pin-chat'));
});

$(function handleCloseAddPinChat() {
  $('.unf-user-dialog__close--add-pin').on({
    click: function () {
      handleDialogClose()
    }
  })
});

$(function onClickAddPinChat() {
  $('#btn__pin-chat--add').on({
    click: function () {
      handleDialogOpen($('.unf-user-dialog--add-pin-chat'));
    },
  });
});

$(function onClickEditPinChat() {
  $('#btn__pin-chat--edit').on({
    click: function () {
      console.log('edit');
    },
  });
});

$(function onClickDeletePinChat() {
  $('#btn__pin-chat--delete').on({
    click: function (e) {
      console.log('delete');
    },
  });
});

function deletePinChat(e) {
  handleDialogOpen($('.unf-user-dialog--delete-pin-chat'));
}
