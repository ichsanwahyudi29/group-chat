// Delete
function handleClickDeleteQuickReply(id) {
    dialogModule.renderDialog({
        title: 'Delete Quick Reply',
        children: $('.js__child-dialog-delete-quick-reply'),
        close: false,
        styleClass: 'dialog--320',
        btnTextPrimary: 'Yes, Delete',
        handleClickPrimary: function () { handleDeleteQuickReply(id) },
    });
}
function handleDeleteQuickReply(id) {
    dataQuickReply.map((item, index) => {
        if (item.id === id) {
            dataQuickReply.splice(index, 1)
        }
    })
    loopDataQuickReply();
    handleDialogClose();
}

// Status
function handleChangeQuickReplyStatus(e, id) {
    if ($(e).prop('checked')) {
        dialogModule.renderDialog({
            title: 'Activate Quick Reply',
            children: $('.js__child-dialog-activate-quick-reply'),
            close: false,
            styleClass: 'dialog--320',
            btnTextPrimary: 'Yes, Activate',
            handleClickPrimary: function () { handleActivateQuickReply(id) },
            handleClickSecondary: () => { handleCancelStatusQuickReply(e) }
        });
    } else {
        dialogModule.renderDialog({
            title: 'Deactive Quick Reply',
            children: $('.js__child-dialog-deactivate-quick-reply'),
            close: false,
            styleClass: 'dialog--320',
            btnTextPrimary: 'Yes, Deactive',
            handleClickPrimary: function () { handleDeactivateQuickReply(id) },
            handleClickSecondary: () => { handleCancelStatusQuickReply(e) }
        });
    }
}
function handleActivateQuickReply(id) {
    handleStatusQuickReply(id, 1)
}
function handleDeactivateQuickReply(id) {
    handleStatusQuickReply(id, 0)
}
function handleStatusQuickReply(id, val) {
    dataQuickReply.map(item => {
        if (item.id === id) {
            item.status = val
        }
    })
    loopDataQuickReply();
    handleDialogClose();
}
function handleCancelStatusQuickReply(e) {
    $(e).prop('checked', !e.checked)
    handleDialogClose()
}