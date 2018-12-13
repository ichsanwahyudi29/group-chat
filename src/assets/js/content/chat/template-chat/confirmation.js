function handleClickDeleteTemplateChat(id) {
    dialogModule.renderDialog({
        title: 'Delete Template Chat',
        children: $('.js__child-dialog-delete-template-chat'),
        close: false,
        styleClass: 'dialog--320',
        btnTextPrimary: 'Yes, Delete',
        handleClickPrimary: function () { handleDeleteTemplateChat(id) },
    });
}

function handleDeleteTemplateChat(id) {
    dataTemplateChat.map((item, index) => {
        if (item.id === id) {
            dataTemplateChat.splice(index, 1)
        }
    })
    loopDataTemplateChat();
    handleDialogClose();
}
