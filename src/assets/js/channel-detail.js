$("#edit-image-cancel").click(function (e) {
    var section = $(this).data('id')
    if(section === 'livechat'){
        handleDialogClose();
    }
    else{
        $(".js__template-dialog").addClass("unf-user-dialog--show");
    }
    $(".js__dialog-image-editor").removeClass("unf-user-dialog--show");
    handleResetEditDialog()
    cropper.destroy();
});
$("#edit-image-save").click(function (e) {
    var section = $(this).data('id')
    var imgsrc = cropper.getCroppedCanvas({width: 800, height: 800}).toDataURL("image/jpeg");
    switch (section) {
        case 'template':{
                handleShowCroppedImg("#img__template--cover" ,imgsrc)
                isTemplateImg = true;
                handleCheckInput()
                $(".js__template-dialog").addClass("unf-user-dialog--show");
            }
            break;
        case 'pinchat':{
                handleShowCroppedImg("#img__pin-chat--image" ,imgsrc)
                isPinImg = true;
                handleCheckInputPin()
                $(".js__template-dialog").addClass("unf-user-dialog--show");
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