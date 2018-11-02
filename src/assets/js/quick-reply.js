$(document).ready(function() {
  // handleDialogOpen($('.unf-user-dialog--add-quick-reply'));
});

$(function handleCloseAddQuickReply() {
  $('.unf-user-dialog__close--add-pin').on({
    click: function() {
      handleDialogClose();
    },
  });
});

$(function onClickAddQuickReply() {
  $('#btn__quick-reply--add').on({
    click: function() {
      handleDialogOpen($('.unf-user-dialog--add-quick-reply'));
    },
  });
});

$(function onClickEditQuickReply() {
  $('#btn__quick-reply--edit').on({
    click: function() {
      console.log('edit');
    },
  });
});

$(function onClickDeleteQuickReply() {
  $('#btn__quick-reply--delete').on({
    click: function(e) {
      console.log('delete');
    },
  });
});

function deleteQuickReply(e) {
  handleDialogOpen($('.unf-user-dialog--delete-quick-reply'));
}
