$(document).ready(function() {
  // handleDialogOpen($('.unf-user-dialog--add-template-chat'));
});

$(function handleCloseAddTemplateChat() {
  $('.unf-user-dialog__close--add-template').on({
    click: function () {
      handleDialogClose()
    }
  })
});

$(function onClickAddTemplateChat() {
  $('#btn__template-chat--add').on({
    click: function() {
      handleDialogOpen($('.unf-user-dialog--add-template-chat'));
    },
  });
});

$(function onClickEditTemplateChat() {
  $('#btn__template-chat--edit').on({
    click: function() {
      console.log('edit');
    },
  });
});

$(function onClickDeleteTemplateChat() {
  $('#btn__template-chat--delete').on({
    click: function(e) {
      console.log('delete');
    },
  });
});

function deleteTemplateChat(e) {
  handleDialogOpen($('.unf-user-dialog--delete-template-chat'));
}
