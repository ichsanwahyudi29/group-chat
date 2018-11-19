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

$(function handleClickAddTemplateChat() {
  $('#btn__template-chat--add').on({
    click: function() {
      dialogModule.renderDialog({
        title: 'Add Template Chat',
        children: $('.js__child-dialog-add-template'),
        close: true,
        btnPrimaryDisabled: true,
        btnTextPrimary: 'Save',
        handleClickPrimary: function() {handleDialogClose();}
      });
    },
  });
});

function editTemplateChat() {
  dialogModule.renderDialog({
    title: 'Edit Template Chat',
    children: $('.js__child-dialog-add-template'),
    close: true,
    btnTextPrimary: 'Save',
    handleClickPrimary: function() {handleDialogClose();}
  });
}

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
