function handleAutoSendTemplateChat(e, id) {
    if ($(e).prop('checked')) {
        dialogModule.renderDialog({
            title: 'Auto-Send Activation',
            children: $('.js__child-dialog-auto-send-template-chat'),
            close: true,
            init: handleInitAutoSend,
            styleClass: 'dialog--454',
            btnTextPrimary: 'Save',
            handleClickPrimary: function () { handleSaveAutoSend(e, id) },
            handleClickSecondary: function () { handleCancelAutoSend(e) }
        });
    }
    else {
        handleToggleAutoSend(e, id)
    }
}

function handleInitAutoSend() {
    var $range = $('#auto-send-range')
    var $duration = $('#auto-send-duration')
    $range.val($range[0].options[0].value)
    $duration.val($duration[0].options[0].value)
    initCustomSelect()
}

function handleChangeAutoSendSelect(e) {
    $(`#${e.id}`).val(e.value)
}

function handleCancelAutoSend(e) {
    $(e).prop('checked', !e.checked)
    handleDialogClose()
}

function handleToggleAutoSend(e, id) {
    dataTemplateChat.map(item => {
        if (item.id === id) {
            item.autoSend = $(e).prop('checked')
        }
    })
    setTimeout(function () {
        loopDataTemplateChat()
        handleDialogClose()
    }, 300)
}

//dummy action
function handleSaveAutoSend(e, id) {
    var duration = $('#auto-send-duration').val()
    dataTemplateChat.map(item => {
        if (item.id === id) {
            item.expiredTime = parseInt(duration)
            item.proccedTime = parseInt(duration)
        }
    })

    handleToggleAutoSend(e, id)
}
