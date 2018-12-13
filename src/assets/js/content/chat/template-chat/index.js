var isTemplateChatText = true;
var isTemplateMsg = false;
var isTemplateTitle = false;
var isTemplateImg = false;
var isTemplateLink = false;
var timeIntervalId = [];

var dataTemplateChat

$(document).ready(function () {
    loadJSON('./assets/js/content/chat/dummy.json', function (response) {
        var res = JSON.parse(response);
        dataTemplateChat = res.template_chat
        loopDataTemplateChat()
    })
})

function loopDataTemplateChat() {
    $('.template-chat .table__list tbody').empty();
    dataTemplateChat.map(item => {
        var listTemplateChat =
            `<tr class="row-template-chat">
                <td class="table__list-num">
                    <h6 class="list-num__id">${item.id}</h6>
                </td>
                <td class="table__list-num">
                    ${item.vibrate ?
                '<h6 class="list-num__id list-num__id--text">Yes</h6>' :
                '<h6 class="list-num__id list-num__id--text">No</h6>'}
                </td>
                <td class="table__list-content">
                    <div class="list-content">
                        <div class="list-content__text">
                            <p class="list-content__text-desc m-0">${item.message}</p>
                            ${item.img != '' ?
                `<img class="list-content__photo list-content__photo--template" src="${item.img}" alt="">` : ''}
                        </div>
                    </div>
                </td>
                <td class="table__list-action">
                    <div class="list-action">
                        <div class="list-action__set">
                            <button class="unf-user-btn unf-user-btn--small unf-user-btn--primary group-chat__btn-send" onclick="handleSendNowTemplateChat(${item.id})">Send Now</button>
                            <div class="template-chat__auto-send">
                                <label class="template-chat__auto-send-label">Auto-Send</label>
                                <div class="unf-user-toggle">
                                    ${item.autoSend ?
                                    `<input checked type="checkbox" class="unf-user-toggle__checkbox" id="template-${item.id}" onclick="handleAutoSendTemplateChat(this, ${item.id})">` :
                                    `<input type="checkbox" class="unf-user-toggle__checkbox" id="template-${item.id}" onclick="handleAutoSendTemplateChat(this, ${item.id})">`}
                                    <label for="template-${item.id}"></label>
                                </div>
                            </div>
                            ${item.autoSend ?
                `<span class="template-chat__time-auto-send" id="time-auto-send-${item.id}" data-id="${item.id}">Sisa waktu: <b>${handleConvertTime(item.proccedTime)}</b></span>` : ``
            }
                        </div>
                        <div class="list-action__btn">
                            <a class="unf-user-btn unf-user-btn--small btn-icon btn-icon-action btn-icon--edit unf-user-tooltip" onclick="handleClickEditTemplateChat(${item.id})">
                                <div class="unf-user-tooltip__container btn-tooltip" aria-label="Edit" data-position="top"></div>
                            </a>
                            <a class="unf-user-btn unf-user-btn--small btn-icon btn-icon-action btn-icon--delete unf-user-tooltip" onclick="handleClickDeleteTemplateChat(${item.id})">
                                <div class="unf-user-tooltip__container btn-tooltip" aria-label="Delete" data-position="top"></div>
                            </a>
                        </div>
                    </div>
                </td>
            </tr>`
        $('.template-chat .table__list tbody').append(listTemplateChat);

    })

    $('.template-chat__time-auto-send').each(function (e) {
        handleLooptime(`#${this.id}`, $(this).data('id'))
    })

    if (dataTemplateChat.length > 0) {
        $('.template-chat .pagination-items').html(renderPagination(dataTemplateChat.length, 1, 1))
    }
    else {
        $('.template-chat .pagination-items').html('')
    }
}

$(function renderAddTemplateDialog() {
    $('.js__unf-user-dialog--template-chat').html(`
        <div class="unf-user-dialog__content p-0">
            <div class="unf-user-dialog__header">Add Template Chat</div>
            <span class="unf-user-dialog__close unf-user-dialog__close--create-channel" onclick="handleCloseTemplateChat()"></span>
            <div class="unf-user-dialog__body">
                <div class="template-chat__type-content p-0">
                    <div class="unf-user-input unf-user-input--radio">
                        <label class="unf-user-input__label">Message type:</label>
                        <div class="d-flex">
                            <label class="unf-user-radio">
                                <input type="radio" name="template-chat--type" class="js__toggle-type-text">
                                <span class="unf-user-radio__area"></span>
                                <span class="unf-user-radio__label">Text</span>
                            </label>
                            <label class="unf-user-radio">
                                <input type="radio" name="template-chat--type" class="js__toggle-type-img">
                                <span class="unf-user-radio__area"></span>
                                <span class="unf-user-radio__label">Image</span>
                            </label>
                        </div>
                    </div>
                    <div class="js__template-chat-text template-chat__type">
                        <div class="unf-user-input">
                            <label class="unf-user-input__label">Message</label>
                            <textarea type="text" id="input__template-chat--msg" class="unf-user-input__control" name="template-chat--msg" maxlength="200" rows="3" placeholder="Type message here…"></textarea>
                            <div class="unf-user-input__info">
                                <span></span>
                                <span class="unf-user-input__info-counter">0/200</span>
                            </div>
                        </div>
                    </div>
                    <div class="js__template-chat-image template-chat__type">
                        <div class="unf-user-input">
                            <label class="unf-user-input__label">Title</label>
                            <input type="text" id="input__image-title" class="unf-user-input__control" name="image-title">
                            <div class="unf-user-input__info">
                                <span></span>
                            </div>
                        </div>
                        <div class="unf-user-input">
                            <label class="unf-user-input__label">Image</label>
                            <div class="unf-user-input__control unf-user-input__control--image unf-user-input__control--image--template-chat">
                                <input id="input__template--cover" type="file" accept=".jpg,.jpeg,.png">
                                <div class="unf-user-input__image-container unf-user-input__image-container--full hide">
                                    <img id="img__template--cover" class="unf-user-input__image-file">
                                    <div class="unf-user-input__image-action">
                                        <span id="change__template--cover" class="unf-user-input__image-action-btn unf-user-input__image-action-btn--edit"></span>
                                        <span id="delete__template--cover" class="unf-user-input__image-action-btn unf-user-input__image-action-btn--delete"></span>
                                    </div>
                                </div>
                                <div id="upload__template--cover" class="unf-user-input__image-upload">
                                    <span class="unf-user-input__image-upload-text unf-user-input__image-upload-text--column"></span>
                                </div>
                            </div>
                            <div class="unf-user-input__info">
                                <span></span>
                            </div>
                        </div>
                        <div class="unf-user-input">
                            <label class="unf-user-input__label">URL</label>
                            <input type="text" id="input__image-url" class="unf-user-input__control" name="image-url"
                                maxlength="70" placeholder="https://www.tokopedia.com">
                            <div class="unf-user-input__info">
                                <span class="unf-user-input__info-msg"></span>
                            </div>
                        </div>
                    </div>
                    <div class="unf-user-input unf-user-input--column">
                        <label class="unf-user-input__label">Vibrate</label>
                        <div class="unf-user-toggle">
                            <input type="checkbox" class="unf-user-toggle__checkbox" id="input__template-chat--vibrate">
                            <label for="input__template-chat--vibrate"></label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="unf-user-dialog__action unf-user-dialog__action--group-chat">
                <button class="unf-user-btn unf-user-btn--medium unf-user-btn--secondary unf-user-dialog__close--create-channel" onclick="handleCloseTemplateChat()">Cancel</button>
                <button id="btn__template--add" class="unf-user-btn unf-user-btn--medium unf-user-btn--primary" disabled>Save</button>
            </div>
        </div>
    `)
})

$(function handleClickAddTemplate() {
    handleResetInputValueTemplate()
    $('#btn__template-chat--add').on({
        click: function () {
            $('.js__unf-user-dialog--template-chat')
                .find('.unf-user-dialog__header').text('Add Template Chat').end()
                .find('#btn__template--add').removeData('id').end()
            handleDialogOpen($('.js__unf-user-dialog--template-chat'));
        },
    });
})

function handleClickEditTemplateChat(id) {
    $('.js__unf-user-dialog--template-chat')
        .find('.unf-user-dialog__header').text('Edit Template Chat').end()
        .find('#btn__template--add').data('id', id).end()
    handleFetchTemplateChat(id)
    handleDialogOpen($('.js__unf-user-dialog--template-chat'));
}

function handleCloseTemplateChat() {
    handleResetInputValueTemplate()
    handleDialogClose()
}

function handleFetchTemplateChat(id) {
    var data = dataTemplateChat.filter(item => item.id === id)[0]
    if (data.img === null || data.img === '') {
        $('.js__toggle-type-text').prop('checked', true)
        $('.js__toggle-type-img').prop('checked', false)
        $('.js__template-chat-text').removeClass('hide')
        $('.js__template-chat-image').addClass('hide')

        $('#input__template-chat--msg').val(data.message)

        isTemplateChatText = true;
        isTemplateMsg = true;
        isTemplateTitle = false;
        isTemplateImg = false;
        isTemplateLink = false;
    }
    else {
        $('.js__toggle-type-img').prop('checked', true)
        $('.js__toggle-type-text').prop('checked', false)
        $('.js__template-chat-image').removeClass('hide')
        $('.js__template-chat-text').addClass('hide')

        $('#input__image-title').val(data.message)
        $('#input__image-url').val(data.url)
        handleRevealTemplateImg($('#input__template--cover')[0], data.img);

        isTemplateChatText = false;
        isTemplateMsg = false;
        isTemplateTitle = true;
        isTemplateImg = true;
        isTemplateLink = true;
    }
    $('#input__template-chat--vibrate').prop('checked', data.vibrate)
    handleCheckInputTemplate();
}

function handleRevealTemplateImg(input, img) {
    var fileElem = document.getElementById(input.id).nextElementSibling;
    $('#img__template--cover').attr('src', img);
    $(fileElem).removeClass('hide');
}

$(function handleInputMsg() {
    $(document).on('input', '#input__template-chat--msg', function () {
        counterInput(this, '200');
        if ($(this).val()) {
            isTemplateMsg = true;
        } else {
            isTemplateMsg = false;
        }
        handleCheckInputTemplate();
    })
})

$(function handleInputTitle() {
    $(document).on('input', '#input__image-title', function () {
        if ($(this).val()) {
            isTemplateTitle = true;
        } else {
            isTemplateTitle = false;
        }
        handleCheckInputTemplate();
    })
})

$(function handleInputLink() {
    $(document)
        .on('input', '#input__image-url', function () {
            if ($(this).val()) {
                isTemplateLink = true;
            } else {
                isTemplateLink = false;
            }
            handleCheckInputTemplate();
        })
        .on('focus', '#input__image-url', function () {
            handleInputError($(this).parent(), '', true);
        })
})

$(function handleChangeTemplateImg() {
    $(document).on('click', '#upload__template--cover, #change__template--cover', function () {
        $('#input__template--cover').click()
    })
})

$(function handleDeleteTemplateImg() {
    $(document).on('click', '#delete__template--cover', function () {
        handleResetInputCover()
    })
});

$(function handleUploadImg() {
    $(document).on('change', '#input__template--cover', function () {
        var imgType = ['image/png', 'image/jpg', 'image/jpeg'];
        var file = this.files;
        if (file.length !== 0) {
            if (
                file[0].type == imgType[0] ||
                file[0].type == imgType[1] ||
                file[0].type == imgType[2]
            ) {
                if (file[0].size <= 10000000) {
                    readURLTemplate(this);
                } else {
                    handleOpenToaster(true, true, helper.en.image.error[0]);
                }
            } else {
                handleOpenToaster(true, true, helper.en.image.error[1]);
            }
        }
        handleCheckInputTemplate();
    })
})

//cropper
function readURLTemplate(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $("#image-editor-canvas").attr("src", e.target.result);
            $(".js__dialog-image-editor ").find("#edit-image-save").data('id', 'template');
            editPictureDialog('.js__unf-user-dialog--template-chat');
            cropImg(1, 1);
        };

        reader.readAsDataURL(input.files[0]);
    }
}
// save or cancel crop in chat/index.js

function handleResetInputValueTemplate() {
    //reset all status
    isTemplateChatText = true;
    isTemplateMsg = false;
    isTemplateTitle = false;
    isTemplateImg = false;
    isTemplateLink = false;

    //reset form
    $('.js__unf-user-dialog--template-chat')
        .on('click', '.js__toggle-type-img', function () {
            $(this).prop('checked', true);
            $('.js__toggle-type-text').removeAttr('checked');
            $('.js__template-chat-text').addClass('hide');
            $('.js__template-chat-image').removeClass('hide');
            isTemplateChatText = false;
            handleCheckInputTemplate();
        })
        .on('click', '.js__toggle-type-text', function () {
            $(this).prop('checked', true);
            $('.js__toggle-type-img').removeAttr('checked');
            $('.js__template-chat-image').addClass('hide');
            $('.js__template-chat-text').removeClass('hide');
            isTemplateChatText = true;
            handleCheckInputTemplate();
        })
        .find('.js__toggle-type-img').prop('checked', false).end()
        .find('.js__toggle-type-text').prop('checked', true).end()
        .find('.js__template-chat-text').removeClass('hide').end()
        .find('.js__template-chat-image').addClass('hide').end()
        .find('#input__template-chat--vibrate').prop('checked', false)

    $('#input__image-title').val('')
    $('#input__image-url').val('')
    $('#input__template-chat--msg').val('')

    //reset image
    handleResetInputCover()
    handleCheckInputTemplate();
}

function handleResetInputCover() {
    isTemplateImg = false;
    $('.unf-user-input__image-container').addClass('hide');
    $('#img__template--cover').removeAttr('src');
    $('#input__template--cover').val('');
    handleCheckInputTemplate();
}

function handleCheckInputTemplate() {
    if (isTemplateChatText) {
        if (isTemplateMsg) {
            $('.unf-user-dialog__action .unf-user-btn--primary').attr('disabled', false);
        }
        else {
            $('.unf-user-dialog__action .unf-user-btn--primary').attr('disabled', true);
        }
    }
    else {
        if (isTemplateTitle && isTemplateImg && isTemplateLink) {
            $('.unf-user-dialog__action .unf-user-btn--primary').attr('disabled', false);
        }
        else {
            $('.unf-user-dialog__action .unf-user-btn--primary').attr('disabled', true);
        }
    }
}
// add/edit
const defaultNewTemplate = {
    "id": null,
    "vibrate": false,
    "autoSend": false,
    "expiredTime": "",
    "img": "",
    "url": "",
    "message": ""
}

$(function handleSaveTemplateChat() {
    $(document).on('click', '#btn__template--add', function () {
        var id = $(this).data('id')
        if (id !== undefined) {
            handleEditTemplate(id)
        }
        else {
            handleAddTemplate()
        }
    })
})

function handleAddTemplate() {
    var newId = 200;
    var newTemplateChat = {}
    if (dataTemplateChat.length > 0) {
        newId = dataTemplateChat[dataTemplateChat.length - 1].id + 1
    }

    if (isTemplateChatText) {
        newTemplateChat = Object.assign({}, defaultNewTemplate, {
            id: newId,
            vibrate: $('#input__template-chat--vibrate').prop('checked'),
            message: $('#input__template-chat--msg').val()
        })
    }
    else {
        if (!validateURL($('#input__image-url').val())) {
            handleInputError($('#input__image-url').parent(), helper.en.link.error[0], false);
            return false;
        }

        newTemplateChat = Object.assign({}, defaultNewTemplate, {
            id: newId,
            vibrate: $('#input__template-chat--vibrate').prop('checked'),
            img: $('#img__template--cover').attr('src'),
            url: $('#input__image-url').val(),
            message: $('#input__image-title').val(),
        })
    }
    dataTemplateChat.push(newTemplateChat)

    loopDataTemplateChat()
    handleCloseTemplateChat()
}
function handleEditTemplate(id) {
    dataTemplateChat.map(item => {
        if (item.id === id) {
            if (isTemplateChatText) {
                item.img = ''
                item.url = ''
                item.message = $('#input__template-chat--msg').val()
            }
            else {
                if (!validateURL($('#input__image-url').val())) {
                    handleInputError($('#input__image-url').parent(), helper.en.link.error[0], false);
                    return false;
                }
                item.img = $('#img__template--cover').attr('src')
                item.url = $('#input__image-url').val()
                item.message = $('#input__image-title').val()
            }
            item.vibrate = $('#input__template-chat--vibrate').prop('checked')
            loopDataTemplateChat()
            handleCloseTemplateChat()
        }
    })
}

function handleSendNowTemplateChat(id) {
    var data = dataTemplateChat.filter(item => item.id === id)[0]
    if (data.img !== null && data.img !== '') {
        $('.live-chat__area')
            .append(renderChatImg(data.url, data.img))
    }
    else{
        $('.live-chat__area').append(renderChatText(data.message))
    }
    handleScrollLiveChat();
}

function handleConvertTime(ms) {
    var minutesToGo = new Date(ms).getMinutes()
    var secondsToGo = new Date(ms).getSeconds()
    var displayMin = (minutesToGo < 10) ? '0' + minutesToGo : minutesToGo
    var displaySec = (secondsToGo < 10) ? '0' + secondsToGo : secondsToGo
    var displayTime = `${displayMin}m ${displaySec}s`
    return displayTime
}
function handleLooptime(elem, id) {
    if (timeIntervalId.filter(item => item === elem).length === 0) {
        var timeInterval = setInterval(function () {
            var data = dataTemplateChat.filter(item => item.id === id)[0]
            var $target = $(elem).find('b')
            var procced = data.proccedTime
            $target.text(handleConvertTime(procced))
            if ($(elem).length === 0 || $(elem).length > 1) {
                clearInterval(timeInterval);
                timeIntervalId.map((item, index) => {
                    if (item === elem) timeIntervalId.splice(index, 1);
                })
            }
            else {
                if (procced > 0) {
                    procced -= 1000
                }
                else {
                    dataTemplateChat.map(item => {
                        if (item.id === id) {
                            item.autoSend = false
                            item.proccedTime = null
                            item.expiredTime = null
                        }
                    })
                    loopDataTemplateChat()
                }
                $target.text(handleConvertTime(procced))
                dataTemplateChat.map(item => {
                    if (item.id === id) {
                        item.proccedTime = procced
                    }
                })
            }
        }, 1000)
        timeIntervalId.push(elem)
    }
}
