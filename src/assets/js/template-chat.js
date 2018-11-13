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
  dialogModule.renderDialog({
    title: 'Delete Template Chat',
    children: $('.js__child-dialog-delete-template-chat'),
    close: false,
    btnTextPrimary: 'Yes, Delete',
    handleClickPrimary: function() {handleDialogClose();}
  });
}

function autoSendTemplateChat(e) {
  dialogModule.renderDialog({
    title: 'Auto-Send Activation',
    children: $('.js__child-dialog-auto-send-template-chat'),
    close: true,
    btnTextPrimary: 'Save',
    handleClickPrimary: function() {handleDialogClose();}
  });
}
