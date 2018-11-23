$(function initialize() {
  handleCloseAddTemplateChat();
  handleClickAddTemplateChat();
});

function handleCloseAddTemplateChat() {
  $('.unf-user-dialog__close--add-template').on({
    click: function () {
      handleDialogClose()
    }
  })
}

function handleClickAddTemplateChat() {
  $('#btn__template-chat--add').on({
    click: function() {
      dialogModule.renderDialog({
        title: 'Add Template Chat',
        children: $('.js__child-dialog-add-template'),
        close: true,
        btnPrimaryDisabled: true,
        btnTextPrimary: 'Save',
        init: initAddEditTemplateChat,
        handleClickPrimary: handleDialogClose
      });
    },
  });
}

function handleClickEditTemplateChat() {
  dialogModule.renderDialog({
    title: 'Edit Template Chat',
    children: $('.js__child-dialog-add-template'),
    close: true,
    btnTextPrimary: 'Save',
    init: initAddEditTemplateChat,
    handleClickPrimary: handleDialogClose
  });
}

function handleClickDeleteTemplateChat(e) {
  dialogModule.renderDialog({
    title: 'Delete Template Chat',
    children: $('.js__child-dialog-delete-template-chat'),
    close: false,
    btnTextPrimary: 'Yes, Delete',
    handleClickPrimary: handleDialogClose
  });
}

function autoSendTemplateChat(e) {
  dialogModule.renderDialog({
    title: 'Auto-Send Activation',
    children: $('.js__child-dialog-auto-send-template-chat'),
    close: true,
    btnTextPrimary: 'Save',
    handleClickPrimary: handleDialogClose
  });
}

function initAddEditTemplateChat() {
  $('.js__template-dialog')
    .on('click', '.js__toggle-type-img', function() {
      $(this).attr('checked', true);
      $('.js__toggle-type-text').removeAttr('checked');
      $('.js__template-chat-text').addClass('hide');
      $('.js__template-chat-image').removeClass('hide');
    })
    .on('click', '.js__toggle-type-text', function() {
      $(this).attr('checked', true);
      $('.js__toggle-type-img').removeAttr('checked');
      $('.js__template-chat-image').addClass('hide');
      $('.js__template-chat-text').removeClass('hide');
    })
    .find('.js__toggle-type-text').attr('checked', true).end()
    .find('.js__template-chat-text').removeClass('hide').end()
    .find('.js__template-chat-image').addClass('hide').end();
}
