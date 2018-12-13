// Delete
function handleClickDeletePinChat(id) {
    dialogModule.renderDialog({
        title: 'Delete Pin Chat',
        children: $('.js__child-dialog-delete-pin-chat'),
        close: false,
        styleClass: 'dialog--320',
        btnTextPrimary: 'Yes, Delete',
        handleClickPrimary: function () { handleDeletePinChat(id) },
    });
}

function handleDeletePinChat(id) {
    dataPinChat.map((item, index) => {
        if (item.id === id) {
            dataPinChat.splice(index, 1)
        }
    })
    loopDataPinChat();
    handleDialogClose();
}

// Status
function handleChangePinChatStatus(e, id) {
    if ($(e).prop('checked')) {
        dialogModule.renderDialog({
            title: 'Activate Pin Chat',
            children: $('.js__child-dialog-activate-pin-chat'),
            close: false,
            styleClass: 'dialog--320',
            btnTextPrimary: 'Yes, Activate',
            handleClickPrimary: function () { handleActivatePinChat(id) },
            handleClickSecondary: () => { handleCancelStatusPinChat(e) }
        });
    } else {
        dialogModule.renderDialog({
            title: 'Deactive Pin Chat',
            children: $('.js__child-dialog-deactivate-pin-chat'),
            close: false,
            styleClass: 'dialog--320',
            btnTextPrimary: 'Yes, Deactive',
            handleClickPrimary: function () { handleDeactivatePinChat(id) },
            handleClickSecondary: () => { handleCancelStatusPinChat(e) }
        });
    }
}
function handleActivatePinChat(id) {
    handleStatusPinChat(id, 1)
}
function handleDeactivatePinChat(id) {
    handleStatusPinChat(id, 0)
}
function handleStatusPinChat(id, val) {
    dataPinChat.map(item => {
        if (item.id === id) {
            item.status = val
        }
        else {
            item.status = 0
        }
    })
    loopDataPinChat()
    handleDialogClose();
}
function handleCancelStatusPinChat(e) {
    $(e).prop('checked', !e.checked)
    handleDialogClose()
}