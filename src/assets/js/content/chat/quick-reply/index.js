var isQuickMsg = false;

var dataQuickReply

$(document).ready(function () {
    loadJSON('./assets/js/content/chat/dummy.json', function (response) {
        var res = JSON.parse(response);
        dataQuickReply = res.quick_reply
        loopDataQuickReply()
    })
})

function loopDataQuickReply() {
    $('.quick-reply .table__list tbody').empty();
    for (const item of dataQuickReply) {
        var listQuickReply = `
            <tr>
                <td class="table__list-num">
                    <h6 class="list-num__id">${item.id}</h6>
                </td>
                <td class="table__list-content">
                    <p class="list-content__text-msg">${item.message}</p>
                </td>
                <td class="table__list-action">
                    <div class="list-action">
                        <div class="list-action__set">
                            <div class="status-toggle-container">
                                <div class="unf-user-toggle">
                                    ${item.status === 1 ?
                `<input checked type="checkbox" class="unf-user-toggle__checkbox" id="quick-${item.id}" onclick="handleChangeQuickReplyStatus(this, ${item.id})">` :
                `<input type="checkbox" class="unf-user-toggle__checkbox" id="quick-${item.id}" onclick="handleChangeQuickReplyStatus(this, ${item.id})">`}
                                    <label for="quick-${item.id}"></label>
                                </div>
                            </div>
                        </div>
                        <div class="list-action__btn">
                            <a class="unf-user-btn unf-user-btn--small btn-icon btn-icon-action btn-icon--edit unf-user-tooltip" onclick="handleClickEditQuickReply(${item.id})">
                                <div class="unf-user-tooltip__container btn-tooltip" aria-label="Edit" data-position="top"></div>
                            </a>
                            <a class="unf-user-btn unf-user-btn--small btn-icon btn-icon-action btn-icon--delete unf-user-tooltip" onclick="handleClickDeleteQuickReply(${item.id})">
                                <div class="unf-user-tooltip__container btn-tooltip" aria-label="Delete" data-position="top"></div>
                            </a>
                        </div>
                    </div>
                </td>
            </tr>
        `;

        $('.quick-reply .table__list tbody').append(listQuickReply);
    }
    renderQuickReplyList(dataQuickReply)
    if (dataQuickReply.length > 0) {
        $('.quick-reply .pagination-items').html(renderPagination(dataQuickReply.length, 1, 1))
    }
    else {
        $('.quick-reply .pagination-items').html('')
    }
}

$(function renderAddQuickReplyDialog() {
    $('.js__unf-user-dialog--quick-reply').html(`
        <div class="unf-user-dialog__content p-0">
            <div class="unf-user-dialog__header">Add Quick Reply</div>
            <span class="unf-user-dialog__close unf-user-dialog__close--create-channel" onclick="handleCloseQuickReply()"></span>
            <div class="unf-user-dialog__body of-init">
                <div class="unf-user-input">
                    <label class="unf-user-input__label">Message</label>
                    <div class="unf-user-input__group-btn">
                        <div class="unf-user-input__icon unf-user-input__icon--right">
                            <input id="input__quick-reply" type="text" class="unf-user-input__control" placeholder="Type message here..." autofocus>
                            <div class="unf-user-input__icon-emoji">
                                <div class="unf-user-input__emoji">
                                    <div class="card unf-user-input__emoji-container">
                                        <div class="unf-user-input__emoji-content">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="unf-user-dialog__action unf-user-dialog__action--group-chat">
                <button class="unf-user-btn unf-user-btn--medium unf-user-btn--secondary unf-user-dialog__close--create-channel" onclick="handleCloseQuickReply()">Cancel</button>
                <button id="btn__quick--add" class="unf-user-btn unf-user-btn--medium unf-user-btn--primary" disabled>Save</button>
            </div>
        </div>
    `)
})

$(function handleClickAddQuickReply() {
    handleResetInputValueQuickReply()
    $('#btn__quick-reply--add').on({
        click: function () {
            $('.js__unf-user-dialog--quick-reply')
                .find('.unf-user-dialog__header').text('Add Quick Reply').end()
                .find('#btn__quick--add').removeData('id').end()
            handleDialogOpen($('.js__unf-user-dialog--quick-reply'));
            autoFocusInput($('#input__quick-reply'))
        },
    });
})

function handleClickEditQuickReply(id) {
    $('.js__unf-user-dialog--quick-reply')
        .find('.unf-user-dialog__header').text('Edit Quick Reply').end()
        .find('#btn__quick--add').data('id', id).end()
    handleFetchQuickReplyData(id)
    handleDialogOpen($('.js__unf-user-dialog--quick-reply'));
}

function handleCloseQuickReply() {
    handleResetInputValueQuickReply()
    handleDialogClose()
}

function handleFetchQuickReplyData(id) {
    var data = dataQuickReply.filter(item => item.id === id)[0]
    $('#input__quick-reply').val(data.message);
    isQuickMsg = true;
    handleCheckInputQuickReply();
}

$(function handleInputQuickMsg() {
    $(document).on('input', '#input__quick-reply', function () {
        if ($(this).val()) {
            isQuickMsg = true;
        } else {
            isQuickMsg = false;
        }
        handleCheckInputQuickReply();
    })
    $(document).on('click', '.emoji-outer', function () {
        setTimeout(function(){
            if ($('#input__quick-reply').val()) {
                isQuickMsg = true;
            } else {
                isQuickMsg = false;
            }
            handleCheckInputQuickReply();
        }, 1)
    })
})

function handleResetInputValueQuickReply() {
    isQuickMsg = false;
    $('#input__quick-reply').val('')
}

function handleCheckInputQuickReply() {
    if (isQuickMsg) {
        $('.unf-user-dialog__action .unf-user-btn--primary').attr('disabled', false);
    }
    else {
        $('.unf-user-dialog__action .unf-user-btn--primary').attr('disabled', true);
    }
}

$(function handleSaveQuickReply() {
    $(document).on('click', '#btn__quick--add', function () {
        var id = $(this).data('id')
        if (id === undefined) {
            // Add
            var newId = 200;
            var newQuickReply = {}
            if (dataQuickReply.length > 0) {
                newId = dataQuickReply[dataQuickReply.length - 1].id + 1
            }
            newQuickReply.id = newId,
                newQuickReply.message = $('#input__quick-reply').val(),
                newQuickReply.status = 1
            dataQuickReply.push(newQuickReply)
        }
        else {
            // Edit
            dataQuickReply.map(item => {
                if (item.id === parseInt(id)) {
                    item.message = $('#input__quick-reply').val()
                }
            })
        }
        loopDataQuickReply()
        handleCloseQuickReply()
    })
})
