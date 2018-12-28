var isPinTitle = false;
var isPinMsg = false;
var isPinImg = false;
var isPinLink = false;

var dataPinChat

$(document).ready(function () {
    loadJSON('./assets/js/content/chat/dummy.json', function (response) {
        var res = JSON.parse(response);
        dataPinChat = res.pinned_chat
        loopDataPinChat()
    })
})

function initPinChatContainer(){
    $('.table__pin-chat').empty()
    var pinContainer
    if(dataPinChat.length > 0){
        $('.btn__pin-chat--add').removeClass('hide')
        pinContainer = `
            <table cellspacing="0" cellpadding="0">
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Title</td>
                        <td>Message</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        `
    }
    else{
        $('.btn__pin-chat--add').addClass('hide')
        pinContainer = `
        <div class="empty-box">
            <div class="empty-box__description">
                <div class="empty-box__description-title">
                    No Available Pinned Chat Yet
                </div>
                <div class="empty-box__description-text">
                    Pinned Chat will be shown here as they are added.
                </div>
            </div>
            <div class="unf-user-btn unf-user-btn--medium group-chat__btn-primary group-chat__btn--create btn__pin-chat--add">Add Pinned Chat</div>
        </div>
    `
    }
    $('.table__pin-chat').html(pinContainer)
}


function loopDataPinChat() {

    var notActivePinChat = dataPinChat.filter(item => item.status === 0)
    dataPinChat = dataPinChat.filter(item => item.status === 1).concat(notActivePinChat)

    initPinChatContainer()
    dataPinChat.map(item => {
        var listPinChat = `
        <tr>
            <td class="table__list-num">
                <h6 class="list-num__id">${item.id}</h6>
            </td>
            <td class="table__list-content">
                <h6 class="list-content__text-msg list-content__text-msg--title">${item.title}</h6>
            </td>
            <td class="table__list-content">
                <div class="list-content">
                    <div class="list-content__text">
                        <p class="list-content__text-desc m-0">${item.msg}</p>
                        <img class="list-content__photo list-content__photo--pinned" src="${item.img}" alt="">
                    </div>
                </div>
            </td>
            <td class="table__list-action channel__list-status">
                <div class="list-action">
                    <div class="list-action__set d-flex">
                        <div class="status-toggle-container">
                            <div class="unf-user-toggle">
                                <input ${item.status ? "checked":""} type="checkbox" class="unf-user-toggle__checkbox" id="pinchat-${item.id}" onclick="handleChangePinChatStatus(this, ${item.id})">
                                <label for="pinchat-${item.id}"></label>
                            </div>
                            <label class="status-toggle-label status-toggle-label__right">
                                ${(item.status === 1)? 'Active' : 'Inactive'}
                            </label>
                        </div>
                    </div>
                    <div class="list-action__btn">
                        <a class="unf-user-btn unf-user-btn--small btn-icon btn-icon-action btn-icon--edit unf-user-tooltip" onclick="handleClickEditPinChat(${item.id})">
                            <div class="unf-user-tooltip__container btn-tooltip" aria-label="Edit" data-position="top"></div>
                        </a>
                        <a class="unf-user-btn unf-user-btn--small btn-icon btn-icon-action btn-icon--delete unf-user-tooltip" onclick="handleClickDeletePinChat(${item.id})">
                            <div class="unf-user-tooltip__container btn-tooltip" aria-label="Delete" data-position="top"></div>
                        </a>
                    </div>
                </div>
            </td>
        </tr>
        `

        $('.pinned-chat .table__list tbody').append(listPinChat);
    })
    renderPinnedChat(dataPinChat)
    if (dataPinChat.length > 0) {
        $('.pinned-chat .pagination-container').html(renderPagination(dataPinChat.length, 1, 1))
    }
    else {
        $('.pinned-chat .pagination-container').html('')
    }
}

$(function renderAddPinChatDialog() {
    $('.js__unf-user-dialog--pinned-chat').html(`
        <div class="unf-user-dialog__content p-0">
            <div class="unf-user-dialog__header">Add Pin Chat</div>
            <span class="unf-user-dialog__close unf-user-dialog__close--create-channel" onclick="handleClosePinChat()"></span>
            <div class="unf-user-dialog__body">
                <div class="unf-user-input">
                    <label class="unf-user-input__label">Title</label>
                    <input id="input__pin-chat--title" type="text" class="unf-user-input__control">
                    <div class="unf-user-input__info"></div>
                </div>
                <div class="unf-user-input">
                    <label class="unf-user-input__label">Message</label>
                    <textarea type="text" id="input__pin-chat--msg" class="unf-user-input__control" name="pin-chat--msg"
                        maxlength="200" rows="3" placeholder="Type message here…"></textarea>
                    <div class="unf-user-input__info">
                        <span></span>
                        <span class="unf-user-input__info-counter">0/200</span>
                    </div>
                </div>
                <div class="unf-user-input">
                    <label class="unf-user-input__label">Image</label>
                    <div class="unf-user-input__control unf-user-input__control--image unf-user-input__control--image--template-chat">
                        <input id="input__pin-chat--image" type="file" accept=".jpg,.jpeg,.png">
                        <div class="unf-user-input__image-container unf-user-input__image-container--full hide">
                            <img id="img__pin-chat--image" class="unf-user-input__image-file">
                            <div class="unf-user-input__image-action">
                                <span id="change__pin-chat--image" class="unf-user-input__image-action-btn unf-user-input__image-action-btn--edit"></span>
                                <span id="delete__pin-chat--image" class="unf-user-input__image-action-btn unf-user-input__image-action-btn--delete"></span>
                            </div>
                        </div>
                        <div id="upload__pin-chat--image" class="unf-user-input__image-upload">
                            <span class="unf-user-input__image-upload-text unf-user-input__image-upload-text--column"></span>
                        </div>
                    </div>
                    <div class="unf-user-input__info">
                        <span></span>
                    </div>
                </div>
                <div class="unf-user-input">
                    <label class="unf-user-input__label">URL</label>
                    <input id="input__pin-chat--url" type="text" class="unf-user-input__control" placeholder="https://www.tokopedia.com">
                    <div class="unf-user-input__info">
                        <span class="unf-user-input__info-msg"></span>
                    </div>
                </div>
            </div>
            <div class="unf-user-dialog__action unf-user-dialog__action--group-chat">
                <button class="unf-user-btn unf-user-btn--medium unf-user-btn--secondary unf-user-dialog__close--create-channel" onclick="handleClosePinChat()">Cancel</button>
                <button id="btn__pin--add" class="unf-user-btn unf-user-btn--medium unf-user-btn--primary" disabled>Save</button>
            </div>
        </div>
    `)
})

$(function handleClickAddPin() {
    $(document).on('click', '.btn__pin-chat--add', function(){
            $('.js__unf-user-dialog--pinned-chat')
                .find('.unf-user-dialog__header').text('Add Pin Chat').end()
                .find('#btn__pin--add').removeData('id').end()
            handleDialogOpen($('.js__unf-user-dialog--pinned-chat'));
    });
})

function handleClickEditPinChat(id) {
    $('.js__unf-user-dialog--pinned-chat')
        .find('.unf-user-dialog__header').text('Edit Pin Chat').end()
        .find('#btn__pin--add').data('id', id).end()
    handleFetchPinChatData(id)
    handleDialogOpen($('.js__unf-user-dialog--pinned-chat'));
}

function handleClosePinChat() {
    handleResetInputValuePin()
    handleDialogClose()
}

function handleFetchPinChatData(id) {
    var data = dataPinChat.filter(item => item.id === id)[0]
    $('#input__pin-chat--title').val(data.title);
    $('#input__pin-chat--msg').val(data.msg);
    $('#input__pin-chat--url').val(data.url);
    handleRevealPinImg($('#input__pin-chat--image')[0], data.img);
    isPinTitle = true;
    isPinImg = true;
    isPinLink = true;
    isPinMsg = true;
    handleCheckInputPin();
}

function handleRevealPinImg(input, img) {
    var fileElem = document.getElementById(input.id).nextElementSibling;
    $('#img__pin-chat--image').attr('src', img);
    $(fileElem).removeClass('hide');
}

$(function handleInputPinTitle() {
    $(document).on('input', '#input__pin-chat--title', function () {
        if ($(this).val()) {
            isPinTitle = true;
        } else {
            isPinTitle = false;
        }
        handleCheckInputPin();
    })
})
$(function handleInputPinMsg() {
    $(document).on('input', '#input__pin-chat--msg', function () {
        counterInput(this, '200');
        if ($(this).val()) {
            isPinMsg = true;
        } else {
            isPinMsg = false;
        }
        handleCheckInputPin();
    })
})
$(function handleInputPinUrl() {
    $(document)
        .on('input', '#input__pin-chat--url', function () {
            if ($(this).val()) {
                isPinLink = true;
            } else {
                isPinLink = false;
            }
            handleInputError($(this).parent(), '', true);
            handleCheckInputPin();
        })
        .on('focus', '#input__pin-chat--url', function () {
            handleInputError($(this).parent(), '', true);
        })
})

$(function handleChangePinImg() {
    $(document).on('click', '#upload__pin-chat--image, #change__pin-chat--image', function () {
        $('#input__pin-chat--image').click()
    })
})
$(function handleDeletePinImg() {
    $(document).on('click', '#delete__pin-chat--image', function () {
        handleResetPinImg()
    })
});
$(function handleUploadImg() {
    $(document).on('change', '#input__pin-chat--image', function () {
        var imgType = ['image/png', 'image/jpg', 'image/jpeg'];
        var file = this.files;
        if (file.length !== 0) {
            if (
                file[0].type == imgType[0] ||
                file[0].type == imgType[1] ||
                file[0].type == imgType[2]
            ) {
                if (file[0].size <= 10000000) {
                    readURLPinChat(this);
                } else {
                    handleOpenToaster(true, true, helper.image.error[0]);
                }
            } else {
                handleOpenToaster(true, true, helper.image.error[1]);
            }
        }
        handleCheckInputPin();
    })
})

//cropper
function readURLPinChat(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $("#image-editor-canvas").attr("src", e.target.result);
            $(".js__dialog-image-editor ").find("#edit-image-save").data('id', 'pinchat');
            editPictureDialog(".js__unf-user-dialog--pinned-chat");
            cropImg(1, 1);
        };

        reader.readAsDataURL(input.files[0]);
    }
}
// save or cancel crop in chat/index.js

function handleResetInputValuePin() {
    isPinTitle = false;
    isPinMsg = false;
    isPinImg = false;
    isPinLink = false;

    $('#input__pin-chat--title').val('')
    $('#input__pin-chat--msg').val('')
    $('#input__pin-chat--url').val('')
    handleInputError($('#input__pin-chat--url').parent(),'', true);

    handleResetPinImg()
    handleCheckInputPin();
}

function handleResetPinImg() {
    isPinImg = false;
    $('.unf-user-input__image-container').addClass('hide');
    $('#img__pin-chat--image').removeAttr('src');
    $('#input__pin-chat--image').val('');
    handleCheckInputPin();
}

function handleCheckInputPin() {
    if (isPinTitle && isPinMsg && isPinLink && isPinImg) {
        $('.unf-user-dialog__action .unf-user-btn--primary').attr('disabled', false);
    }
    else {
        $('.unf-user-dialog__action .unf-user-btn--primary').attr('disabled', true);
    }
}


$(function handleSavePinChat() {
    $(document).on('click', '#btn__pin--add', function () {
        if (!validateURL($('#input__pin-chat--url').val())) {
            handleInputError($('#input__pin-chat--url').parent(), helper.en.link.error[0], false);
            return false;
        }
        var id = $(this).data('id')
        if (id === undefined) {
            // Add
            var newId = 200
            var newPinChat = {}
            if (dataPinChat.length > 0) {
                newId = dataPinChat[dataPinChat.length - 1].id + 1
            }
            newPinChat.id = newId
            newPinChat.title = $('#input__pin-chat--title').val()
            newPinChat.msg = $('#input__pin-chat--msg').val()
            newPinChat.url = $('#input__pin-chat--url').val()
            newPinChat.img = $('#img__pin-chat--image').attr('src')
            newPinChat.status = 0
            dataPinChat.push(newPinChat)
        }
        else {
            // Edit
            dataPinChat.map(item => {
                if(item.id === id){
                    item.title = $('#input__pin-chat--title').val()
                    item.msg = $('#input__pin-chat--msg').val()
                    item.url = $('#input__pin-chat--url').val()
                    item.img = $('#img__pin-chat--image').attr('src')
                }
            })
        }
        loopDataPinChat()
        handleClosePinChat()
    })
})