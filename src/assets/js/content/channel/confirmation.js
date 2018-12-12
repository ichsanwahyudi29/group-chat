// Channel Status
function handleChangeChannelStatus(e, id) {
    if ($(e).prop('checked')) {
        dialogModule.renderDialog({
            title: 'Activate Group Chat',
            children: $('.js__child-dialog-activate-channel'),
            close: false,
            styleClass: 'dialog--320',
            btnTextPrimary: 'Yes, Activate',
            handleClickPrimary: () => { handleActivateChannel(id) },
            handleClickSecondary: () => { handleCancelStatusChannel(e) }
        });
    } else {
        dialogModule.renderDialog({
            title: 'Deactivate Group Chat',
            children: $('.js__child-dialog-deactive-channel'),
            close: false,
            styleClass: 'dialog--320',
            btnTextPrimary: 'Yes, Deactivate',
            handleClickPrimary: () => { handleDeactivateChannel(id) },
            handleClickSecondary: () => { handleCancelStatusChannel(e) }
        });
    }
}
function handleActivateChannel(id) {
    handleStatusChannel(id, 1)
}
function handleDeactivateChannel(id) {
    handleStatusChannel(id, 2)
}
function handleStatusChannel(id, val) {
    for (const data of dataChannel) {
        if (data.id == id) {
            data.status = val
            break
        }
    }
    handleDialogClose();
    loopData()
}
function handleCancelStatusChannel(e) {
    $(e).prop('checked', !e.checked)
    handleDialogClose()
}

// Channel Archive
function handleChangeChannelArchive(id) {
    dialogModule.renderDialog({
        title: 'Archive Group Chat',
        children: $('.js__child-dialog-archive-channel'),
        close: false,
        styleClass: 'dialog--320',
        btnTextPrimary: 'Yes, Archive',
        handleClickPrimary: function () { handleArchiveChannel(id) }
    });
}

function handleArchiveChannel(id) {
    for (const data of dataChannel) {
        if (data.id == id) {
            data.archive = true
            break
        }
    }
    handleDialogClose();
    loopData()
}