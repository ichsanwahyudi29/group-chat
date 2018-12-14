var isSearchUser = false;

var dataBannedUser

$(document).ready(function () {
    loadJSON('./assets/js/content/chat/dummy.json', function (response) {
        var res = JSON.parse(response);
        dataBannedUser = res.banned_user
        loopDataBannedUser()
    })
})

function loopDataBannedUser() {
    $('.banned-user .table__list tbody').empty();
    for (const data of dataBannedUser) {
        var listBannedUser = `
            <tr>
            <td class="table__list-num">
                <h6 class="list-num__id">${data.id}</h6>
                <span class="list-num__url">(Participant ID ${data.participantId})</span>
            </td>
            <td class="table__list-content">
                <div class="banned-user">
                    <img src="${data.photo}"/>
                    <h6 class="list-content__text-msg list-content__text-msg--name">${data.name}</h6>
                </div>
            </td>
            <td class="table__list-action">
                <div class="list-action">
                    <div class="list-action__btn">
                        <a class="unf-user-btn unf-user-btn--small group-chat__btn-action group-chat__btn--unban" onclick="handleStatusBan(${data.id})"><span>Unban</span></a>
                    </div>
                </div>
            </td>
            </tr>
        `;

        if (data.status === 1) {
            $('.banned-user .table__list tbody').append(listBannedUser);
        }
    }

    if (dataBannedUser.filter(item => item.status === 1).length > 0) {
        $('.banned-user .pagination-items').html(renderPagination(dataBannedUser.filter(item => item.status === 1).length, 1, 1))
    }
    else {
        $('.banned-user .pagination-items').html('')
    }
}

$(function renderBannedUserDialog() {
    $('.js__unf-user-dialog--banned-user').html(`
        <div class="unf-user-dialog__content p-0">
            <div class="unf-user-dialog__header">Ban User</div>
            <span class="unf-user-dialog__close unf-user-dialog__close--create-channel" onclick="handleCloseBanUser()"></span>
            <div class="unf-user-dialog__body">
                <div class="unf-user-input dialog-banned-user__input">
                    <div class="unf-user-input__group-btn">
                        <input type="text" id="input__banned-user" class="unf-user-input__control" name="description"
                            placeholder="Search Name or User ID">
                        <button id="btn__banned-user--search" class="unf-user-btn unf-user-btn--medium unf-user-btn--secondary icon-search"></button>
                    </div>
                </div>
                <div class="dialog-banned-user__search">
                    <div class="dialog-banned-user__search-empty ta-center">
                        <img class="empty-img" src="./assets/img/empty-state-search.png" alt="" srcset="">
                        <span class="empty-input"></span>
                    </div>
                    <div class="dialog-banned-user__search-result">
                    </div>
                </div>
            </div>
        </div>
    `)
})

$(function handleClickAddBannedUser() {
    $('#btn__banned-user--add').on({
        click: function () {
            handleDialogOpen($('.js__unf-user-dialog--banned-user'));
            autoFocusInput('#input__banned-user')
        },
    });
})

function handleCloseBanUser() {
    handleResetInputValueQuickReply()
    handleDialogClose()
}

$(function onInputSearchBannedUser() {
    $(document).on('keypress', '#input__banned-user', function (e) {
        if (e.which === 13) {
            $('#btn__banned-user--search').click();
        }
    })
});

$(function SearchBannedUser() {
    $(document).on('click', '#btn__banned-user--search', function () {
        searchVal = $('#input__banned-user').val();
        renderSearchResult(searchVal)
    })
});

function renderSearchResult(val) {
    if (val === undefined || val === '') {
        return
    }
    $('.dialog-banned-user__search').removeClass('dialog-banned-user__search--empty dialog-banned-user__search--result');
    $('.dialog-banned-user__search-result').empty();
    var notFound = true;
    var regex = new RegExp(val, 'i');
    for (const data of dataBannedUser) {
        var indexString = data.name.toLowerCase().indexOf(val.toLowerCase());
        var indexVal = indexString + val.length;
        var highlightText = data.name.substring(indexString, indexVal);
        var resultName = data.name.replace(regex, `<b>${highlightText}</b>`);

        var resultBannedUser = `
            <div class="result">
                <div class="result__container">
                    <img class="result__img" src="${data.photo}" alt="" srcset="">
                    <span class="result__name">${resultName}</span>
                </div>
                    ${
            data.status === 0
                ? `<a class="unf-user-btn unf-user-btn--small unf-user-btn--primary result__btn" onclick="handleStatusBan(${data.id})">Ban</a>`
                : `<a class="unf-user-btn unf-user-btn--small unf-user-btn--secondary result__btn result__btn--unban" onclick="handleStatusBan(${data.id})">Unban</a>`
            }
            </div>
            `;

        if (indexString >= 0) {
            $('.dialog-banned-user__search-result').append(resultBannedUser);
            notFound = false;
        }
    }

    if (!notFound) {
        $('.dialog-banned-user__search').addClass(
            'dialog-banned-user__search--result'
        );
    } else {
        $('.empty-input').text(`No results for “${val}”`);
        $('.dialog-banned-user__search').addClass(
            'dialog-banned-user__search--empty'
        );
    }
}

function handleResetInputValueQuickReply(){
    isSearchUser = false;
    $('#input__banned-user').val('')

    $('.dialog-banned-user__search').removeClass('dialog-banned-user__search--result dialog-banned-user__search--empty')
}

function handleStatusBan(id) {
    dataBannedUser.map(item => {
        if (item.id === id) {
            if (item.status === 1) {
                item.status = 0
            }
            else {
                item.status = 1
            }
        }
    })
    loopDataBannedUser()
    renderSearchResult(searchVal)
}
