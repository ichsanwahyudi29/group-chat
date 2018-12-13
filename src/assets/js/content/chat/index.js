$(document).on('click', '#edit-image-cancel', function(){
    var section = $(this).data('id')
    if(section === 'livechat'){
        handleDialogClose();
    }
    else{
        $(".js__unf-user-dialog--template-chat").addClass("unf-user-dialog--show");
    }
    $(".js__dialog-image-editor").removeClass("unf-user-dialog--show");
    handleResetEditDialog()
    cropper.destroy();
});
$(document).on('click', '#edit-image-save', function(){
    var section = $(this).data('id')
    var imgsrc = cropper.getCroppedCanvas({width: 800, height: 800}).toDataURL("image/jpeg");
    switch (section) {
        case 'template':{
                handleShowCroppedImg("#img__template--cover" ,imgsrc)
                isTemplateImg = true;
                handleCheckInputTemplate()
                $(".js__unf-user-dialog--template-chat").addClass("unf-user-dialog--show");
            }
            break;
        case 'pinchat':{
                handleShowCroppedImg("#img__pin-chat--image" ,imgsrc)
                isPinImg = true;
                handleCheckInputPin()
                $(".js__unf-user-dialog--pinned-chat").addClass("unf-user-dialog--show");
            }
            break;
        case 'livechat':{
                handleShowCroppedImg("#img__live-chat--send-img" ,imgsrc)
                isCover = true;
                handleCheckInputLiveChat();
                handleDialogClose();
            }
            break;
        default:
            break;
    }

    $(".js__dialog-image-editor").removeClass("unf-user-dialog--show");
    handleResetEditDialog()
    cropper.destroy();
});