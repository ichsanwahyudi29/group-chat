$(document).ready(function () {
    if ($('.js__dialog-image-editor').length === 0) {
        $('.wrapper').append(`
            <div class="js__dialog-image-editor unf-user-dialog edit-image-dialog">
                <div class="unf-user-dialog__content unf-user-dialog__content--broadcast edit-image-dialog__container ta-center">
                <div class="unf-user-dialog__title edit-image-dialog__title">
                    Image Editor
                </div>
                <div class="edit-image-dialog__img-container">
                    <img id="image-editor-canvas" src="" style="display: none">
                </div>
                <div class="edit-image-dialog__controls mt-30 mb-50">
                    <div>
                    <i class="user-icon icon-zoom-pic icon-zoom-pic--out mr-8 va-middle"></i>
                    <input class="edit-image-dialog__slider" type="range" min="1" max="2" step=".01" value="0">
                    <i class="user-icon icon-zoom-pic icon-zoom-pic--in ml-8 va-middle"></i>
                    </div>
                </div>
                <div class="broadcast-dialog__action edit-image-dialog__action mt-30">
                    <button class="unf-user-btn unf-user-btn--medium unf-user-btn--secondary unf-user-btn--dialog" id="edit-image-cancel">Cancel</button>
                    <button class="unf-user-btn unf-user-btn--medium unf-user-btn--primary unf-user-btn--dialog" id="edit-image-save">Save</button>
                </div>
                </div>
            </div>
        `)
    }
})

let cropper = "";
function cropImg(wRatio, hRatio) {
    const image = document.getElementById("image-editor-canvas");
    cropper = new Cropper(image, {
        aspectRatio: wRatio / hRatio,
        viewMode: 1,
        background: false,
        movable: false,
        zoomOnWheel: false,
        guides: false
    });
}
function editPictureDialog(target) {
    handleDialogOpen(".js__dialog-image-editor");
    $(target).removeClass("unf-user-dialog--show");
}
function handleResetEditDialog() {
    $("#image-editor-canvas").attr("src", '');
    $(".edit-image-dialog__slider").val(0);
}
function handleShowCroppedImg(destElement, img) {
    $(destElement).parent().removeClass("hide");
    $(destElement).attr("src", img);
}
$(function handleSliderImageEditor() {
    $(".edit-image-dialog__slider").on("input", function () {
        let sliderVal = $(".edit-image-dialog__slider").val();
        cropper.scale(sliderVal);
    });
})
