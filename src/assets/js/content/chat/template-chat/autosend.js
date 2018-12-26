var asDuration = false;
var autoSendDialog;

function handleAutoSendTemplateChat(e, id) {
    if ($(e).prop('checked')) {
        autoSendDialog = $('.js__child-dialog-auto-send-template-chat').html()
        dialogModule.renderDialog({
            title: 'Auto-Send Activation',
            children: $('.js__child-dialog-auto-send-template-chat'),
            close: true,
            init: handleInitAutoSend,
            styleClass: 'dialog--454',
            btnTextPrimary: 'Save',
            btnPrimaryDisabled: true,
            handleClickPrimary: function () { handleSaveAutoSend(e, id) },
            handleClickSecondary: function () { handleCancelAutoSend(e) }
        });
        $('.js__child-dialog-auto-send-template-chat').html('')
    }
    else {
        handleToggleAutoSend(e, id)
    }
}

function handleCloseAutoSend(){
    $('.js__child-dialog-auto-send-template-chat').html(autoSendDialog)
    handleDialogClose()
}

function handleInitAutoSend() {
    var $range = $('#auto-send-chat')
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
    handleCloseAutoSend()
}

function handleToggleAutoSend(e, id) {
    dataTemplateChat.map(item => {
        if (item.id === id) {
            item.autoSend = $(e).prop('checked')
        }
    })
    setTimeout(function () {
        loopDataTemplateChat()
        handleCloseAutoSend()
    }, 300)
}

$(function handleInputAutoSendValue(){
    $(document).on('input', '#auto-send-duration-value', function(){
        var $val = $(this).val()
        if(!validateNumber($val)){
            $(this).val($val.slice(0, -1))
        }
        if($(this).val() !== ''){
            asDuration = true
        }
        else{
            asDuration = false
        }
        handleCheckAutoSend()
    })
})

function handleCheckAutoSend(){
    var btn = $('.js__template-dialog').find('.unf-user-btn--primary')
    if(asDuration){
        btn.prop('disabled', false)
    }
    else{
        btn.prop('disabled', true)
    }
}

function handleSaveAutoSend(e, id) {
    var chat = $('#auto-send-chat').val()
    var durationValue = $('#auto-send-duration-value').val()
    var duration = $('#auto-send-duration').val()
    var converted = convertToMiliSec(durationValue, duration)
    dataTemplateChat.map(item => {
        if (item.id === id) {
            item.expiredTime = parseInt(converted)
        }
    })

    handleToggleAutoSend(e, id)
}

function convertToMiliSec(val, unit){
    switch (unit) {
        case '1':
            return val*1000
    
        case '2':
            return val*60000
    
        case '3':
            return val*3600000
    
        default:
            break;
    }
}