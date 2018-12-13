var isCover = false;
var isName = false;
var isDesc = false;
var isModeratorEmail = false;
var isModeratorName = false;

var email = $('#input__channel--moderator-email');
var inputEmail = $('.unf-user-input--moderator-email');

var dataChannel

$(document).ready(function () {
    loadJSON('./assets/js/content/channel/dummy.json', function (response) {
        var res = JSON.parse(response);
        dataChannel = res.channel
        loopData()
    })
})

function initContainer() {
    $('.channel').remove()
    var activeCount = dataChannel.filter(item => item.status === 1)
    var inactiveCount = dataChannel.filter(item => item.status === 2 && item.archive === false)
    var channelActive = '';
    var channelInactive = '';
    if (activeCount.length > 0) {
        channelActive = `
        <div class="card channel channel--active">
            <div class="card__header">
                <div class="card__header-title channel__title">
                Active Channel
            </div>
            <div class="card__header-sorting">
                <h6 class="sorting-title">Sort</h6>
                <div class="sorting-option">
                    <select class="unf-user-select__regular">
                        <option value="created">Created date</option>
                        <option value="updated">Updated date</option>
                    </select>
                </div>
            </div>
            </div>
            <div class="table__list channel__list">
                <table cellspacing="0" cellpadding="0">
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Group Chat</td>
                            <td>Status</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
            <div class="pagination-container">
                <div class="pagination-items">
                    ${renderPagination(activeCount.length, 1, 1)}
                </div>
            </div>
        </div>`
    }
    if (inactiveCount.length > 0) {
        channelInactive = `
        <div class="card channel channel--inactive">
            <div class="card__header">
                <div class="card__header-title channel__title">
                Inactive Channel
            </div>
            <div class="card__header-sorting">
                <h6 class="sorting-title">Sort</h6>
                <div class="sorting-option">
                    <select class="unf-user-select__regular">
                        <option value="created">Created date</option>
                        <option value="updated">Updated date</option>
                    </select>
                </div>
            </div>
            </div>
            <div class="table__list channel__list">
                <table cellspacing="0" cellpadding="0">
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Group Chat</td>
                            <td>Status</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
            <div class="pagination-container">
                <div class="pagination-items">
                    ${renderPagination(inactiveCount.length, 1, 1)}
                </div>
            </div>
        </div>`
    }
    $('.container').append(channelActive)
    $('.container').append(channelInactive)
}

function loopData() {
    initContainer()
    var dataActive = dataChannel.filter(item => item.status === 1)
    var dataInactive = dataChannel.filter(item => item.status === 2 && item.archive === false)

    $('.channel--active .table__list tbody').empty();
    $('.channel--inactive .table__list tbody').empty();

    dataActive.map(item => {
        $('.channel--active .channel__list tbody').append(handleRenderChannel(item))
    })
    dataInactive.map(item => {
        $('.channel--inactive .channel__list tbody').append(handleRenderChannel(item))
    })
    initCustomSelect()
}

function handleRenderChannel(data) {
    var listChannel = `
        <tr> 
            <td class="channel__list-num">
                <h6 class="list-num__id">ID ${data.id}</h6>
                <span class="list-num__url">${data.url}</span>
            </td>
            <td class="channel__list-gc">
                <div class="list-gc">
                <img class="list-gc__photo" src="${data.img}" alt="">
                <div class="list-gc__text">
                    <h3 class="list-gc__text-title">${data.name}</h3>
                    <p class="list-gc__text-desc">${data.description}</p>
                    <p class="list-gc__text-moderator">Moderator: <span>${data.moderator}</span></p>
                </div>
                </div>
            </td>
            <td class="channel__list-status">
                <div class="status-toggle-container">
                    <div class="unf-user-toggle">
                        ${data.status === 1 ?
            `<input checked type="checkbox" class="unf-user-toggle__checkbox" id="channel-${data.id}" onclick="handleChangeChannelStatus(this, ${data.id})">` :
            `<input type="checkbox" class="unf-user-toggle__checkbox" id="channel-${data.id}" onclick="handleChangeChannelStatus(this, ${data.id})">`}
                        <label for="channel-${data.id}"></label>
                    </div>
                </div>
            </td>
            <td class="channel__list-action">
                <div class="list-action">
                    <div class="list-action__set">
                        <a class="set-btn set-btn__ads" href="./ads.html">Set Ads</a>
                        <a class="set-btn set-btn__official">Set Official</a>
                        <a class="set-btn set-btn__flashsale">Set Flashsale</a>
                        <a class="set-btn set-btn__rewards">Set Rewards</a>
                        <a class="set-btn set-btn__polling">Set Polling</a>
                        <a class="set-btn set-btn__room">Set Room</a>
                    </div>
                    <div class="list-action__btn">
                        <a class="unf-user-btn unf-user-btn--small group-chat__btn-action group-chat__btn--chat" href="./channel-detail.html"><span>chat</span></a>
                        <a class="unf-user-btn unf-user-btn--small group-chat__btn-action group-chat__btn--edit" onclick="handleClickEditChannel(${data.id})"><span>edit</span></a>
                        <a class="unf-user-btn unf-user-btn--small group-chat__btn-action group-chat__btn--preview" onclick="previewChannel(${data.id})"><span>preview</span></a>
                        <a class="unf-user-btn unf-user-btn--small group-chat__btn-action group-chat__btn--archive" onclick="handleChangeChannelArchive(${data.id})"><span>archive</span></a>
                    </div>
                </div>
            </td>
        </tr>`
    return listChannel
}

$(function renderCreateDialog() {
    $('.js__unf-user-dialog--create-channel').html(`
        <div class="unf-user-dialog__content p-0">
            <div class="unf-user-dialog__header">Create Group Chat</div>
            <span class="unf-user-dialog__close unf-user-dialog__close--create-channel" onclick="handleCloseCreateChannel()"></span>
            <div class="unf-user-dialog__body customScrollBar customScrollBar--y customScrollBar--create-channel">
                <div class="unf-user-input create-channel__image">
                    <label class="unf-user-input__label">Cover Image</label>
                    <div class="unf-user-input__control unf-user-input__control--image">
                        <input id="input__channel--cover" type="file" accept=".jpg,.jpeg,.png">
                        <div class="unf-user-input__image-container unf-user-input__image-container--full hide">
                            <img id="img__channel--cover" class="unf-user-input__image-file">
                            <div class="unf-user-input__image-action">
                                <span id="change__channel--cover" class="unf-user-input__image-action-btn unf-user-input__image-action-btn--edit"></span>
                                <span id="delete__channel--cover" class="unf-user-input__image-action-btn unf-user-input__image-action-btn--delete"></span>
                            </div>
                        </div>
                        <div id="upload__channel--cover" class="unf-user-input__image-upload">
                            <span class="unf-user-input__image-upload-text unf-user-input__image-upload-text--column">Add
                                Image</span>
                        </div>
                    </div>
                </div>
                <div class="unf-user-input">
                    <label class="unf-user-input__label">Group Chat Name</label>
                    <input type="text" id="input__channel--name" class="unf-user-input__control" name="channel-name" maxlength="70">
                    <div class="unf-user-input__info">
                        <span></span>
                        <span class="unf-user-input__info-counter">0/70</span>
                    </div>
                </div>
                <div class="unf-user-input">
                    <label class="unf-user-input__label">Description</label>
                    <textarea type="text" id="input__channel--desc" class="unf-user-input__control create-channel__input-textarea" name="channel-desc" maxlength="1000" rows="3"></textarea>
                    <div class="unf-user-input__info">
                        <span></span>
                        <span class="unf-user-input__info-counter">0/1000</span>
                    </div>
                </div>
                <h6 class="create-channel__moderator-label">Moderator</h6>
                <div class="unf-user-input unf-user-input--moderator-email">
                    <label class="unf-user-input__label">Moderator Email</label>
                    <div class="unf-user-input__group-btn">
                        <div class="unf-user-input__icon unf-user-input__icon--right">
                            <input type="text" id="input__channel--moderator-email" class="unf-user-input__control"
                                name="description">
                        </div>
                        <button id="btn__channel--moderator-email" class="unf-user-btn unf-user-btn--medium unf-user-btn--secondary">Check</button>
                    </div>
                    <div class="unf-user-input__info">
                        <span class="unf-user-input__info-msg">Please enter your email accounts in Tokopedia</span>
                    </div>
                </div>
                <div class="create-channel__moderator">
                    <img class="create-channel__moderator-pic" src="./assets/img/moderator.jpg" alt="" srcset="" id="input__channel--moderator-img">
                    <div>
                        <div class="unf-user-input">
                            <input id="input__channel--moderator-name" type="text" class="unf-user-input__control"
                                name="moderator-name" value="Ichsan Indra Wahyudi">
                        </div>
                        <div class="create-channel__moderator-input">
                            <div class="unf-user-input">
                                <label class="unf-user-input__label">User ID</label>
                                <input type="text" class="unf-user-input__control" name="moderator-Id" readonly value="1234567890" id="input__channel--moderator-id">
                            </div>
                            <div class="unf-user-input">
                                <label class="unf-user-input__label">Profile URL</label>
                                <input type="text" class="unf-user-input__control" name="moderator-profileUrl" readonly value="http://www.tokopedia.com/ichsanindrawahyudi" id="input__channel--moderator-url">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="unf-user-dialog__action unf-user-dialog__action--group-chat">
                <button class="unf-user-btn unf-user-btn--medium unf-user-btn--secondary unf-user-dialog__close--create-channel" onclick="handleCloseCreateChannel()">Cancel</button>
                <button id="btn__channel--create" class="unf-user-btn unf-user-btn--medium unf-user-btn--primary" disabled>Save</button>
            </div>
        </div>
    `)
})

$(function handleClickCreateChannel() {
    $('.group-chat__btn--create').on({
        click: function () {
            $('.js__unf-user-dialog--create-channel')
                .find('.unf-user-dialog__header').text('Create Group Chat').end()
                .find('#btn__channel--create').removeData('id').end()
            handleDialogOpen($('.js__unf-user-dialog--create-channel'));
        },
    });
})

function handleClickEditChannel(id) {
    $('.js__unf-user-dialog--create-channel')
        .find('.unf-user-dialog__header').text('Edit Group Chat').end()
        .find('#btn__channel--create').data('id', id).end()
    handleFetchChannelData(id)
    handleDialogOpen($('.js__unf-user-dialog--create-channel'));
}

function handleCloseCreateChannel() {
    resetInputValueChannel()
    handleDialogClose()
}

function handleFetchChannelData(id) {
    var data = dataChannel.filter(item => item.id === id)[0]
    $('#input__channel--name').val(data.name);
    $('#input__channel--desc').val(data.description);
    $('#input__channel--moderator-email').val(data.email);
    handleRevealChannelImg($('#input__channel--cover')[0], data.img);
    $('#btn__channel--moderator-email').click()

    isCover = true;
    isName = true;
    isDesc = true;
    isModeratorEmail = true;
    isModeratorName = true;

    handleCheckInputChannel();
}

function handleRevealChannelImg(input, img) {
    var fileElem = document.getElementById(input.id).nextElementSibling;
    $('#img__channel--cover').attr('src', img);
    $(fileElem).removeClass('hide');
}

$(function onChangeChannelImg() {
    $(document).on('click', '#upload__channel--cover, #change__channel--cover', function () {
        $('#input__channel--cover').click();
    })
});

$(function onDeleteChannelImg() {
    $(document).on('click', '#delete__channel--cover', function () {
        resetInputImageChannel()
        handleCheckInputChannel()
    })
});

$(function handleInputChannelImg() {
    $(document).on('change', '#input__channel--cover', function () {
        var imgType = ['image/png', 'image/jpg', 'image/jpeg'];
        var file = this.files;
        if (file.length !== 0) {
            if (
                file[0].type == imgType[0] ||
                file[0].type == imgType[1] ||
                file[0].type == imgType[2]
            ) {
                if (file[0].size <= 10000000) {
                    readURLCrop(this);
                } else {
                    handleOpenToaster(true, true, helper.en.image.error[0]);
                }
            } else {
                handleOpenToaster(true, true, helper.en.image.error[1]);
            }
        }
        handleCheckInputChannel();
    })
});

$(function handleInputChannelName() {
    $(document).on('input', '#input__channel--name', function () {
        counterInput(this, '70');
        if ($(this).val()) {
            isName = true;
        } else {
            isName = false;
        }
        handleCheckInputChannel();
    })
});

$(function handleInputChannelDesc() {
    $(document).on('input', '#input__channel--desc', function () {
        counterInput(this, '1000');
        if ($(this).val()) {
            isDesc = true;
        } else {
            isDesc = false;
        }
        handleCheckInputChannel();
    })
});

$(function handleInputModeratorEmail() {
    $(document).on('input', '#input__channel--moderator-email', function () {
        $('.create-channel__moderator').removeClass('create-channel__moderator--show');
        $('.unf-user-input__icon').removeClass('icon-check');
        isModeratorName = false;
        var inputEmail = $('.unf-user-input--moderator-email');
        handleInputError(
            inputEmail,
            'Please enter your email accounts in Tokopedia',
            true
        );
        if ($(this).val()) {
            isModeratorEmail = true;
        } else {
            isModeratorEmail = false;
        }
        handleCheckInputChannel()
    }).on('focus', '#input__channel--moderator-email', function () {
        handleInputError(
            inputEmail,
            'Please enter your email accounts in Tokopedia',
            true
        );
    }).on('keypress', '#input__channel--moderator-email', function () {
        if (event.charCode == 13) {
            $('#btn__channel--moderator-email').click();
        }
    })
});

$(function checkModeratorEmail() {
    $(document).on('click', '#btn__channel--moderator-email', function () {
        var email = $('#input__channel--moderator-email');
        var inputEmail = $('.unf-user-input--moderator-email');
        
        if(email.val() === ''){
            return false
        }

        loadingCheckEmail(true);
        loadJSON('./assets/js/content/channel/dummy.json', function (response) {
            var res = JSON.parse(response);
            var dataAdmin = res.admin

            var data = dataAdmin.filter(item => item.email === email.val())
            if (data.length === 0 && email.val() !== 'i') {
                setTimeout(() => {
                    loadingCheckEmail(false);
                }, 500);
                handleInputError(inputEmail, helper.en.email.error[1], false);
                $('.create-channel__moderator').removeClass('create-channel__moderator--show');
                return false;
            }
    
            setTimeout(() => {
                loadingCheckEmail(false);
                $('.unf-user-input__icon').addClass('icon-check');
            }, 500);
            
            if(email.val() !== 'i'){
                //insert data
                $('#input__channel--moderator-img').attr('src', data[0].photo)
                $('#input__channel--moderator-name').val(data[0].name)
                $('#input__channel--moderator-id').val(data[0].id)
                $('#input__channel--moderator-url').val(data[0].url)
            }

            isModeratorEmail = true;
            isModeratorName = true;
            handleCheckInputChannel();
    
            $('.customScrollBar--create-channel .unf-user-dialog__body').animate({ scrollTop: 520 }, 1200);
            $('.create-channel__moderator').addClass('create-channel__moderator--show');
        })

    })
});

$(function handleInputModeratorName() {
    $(document).on('input', '#input__channel--moderator-name', function () {
        if ($(this).val()) {
            isModeratorName = true
        } else {
            isModeratorName = false
        }
        handleCheckInputChannel()
    })
})

//cropper
function readURLCrop(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $("#image-editor-canvas").attr("src", e.target.result);
            editPictureDialog('.js__unf-user-dialog--create-channel');
            cropImg(2, 1);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

$(document).on('click', '#edit-image-cancel', function(){
    $(".js__dialog-image-editor").removeClass("unf-user-dialog--show");
    $(".js__unf-user-dialog--create-channel").addClass("unf-user-dialog--show");

    handleResetEditDialog()
    cropper.destroy();
})

$(document).on('click', '#edit-image-save', function(){
    let imgsrc = cropper.getCroppedCanvas({ width: 600, height: 300 }).toDataURL("image/jpeg");

    $(".js__dialog-image-editor").removeClass("unf-user-dialog--show");
    $(".js__unf-user-dialog--create-channel").addClass("unf-user-dialog--show");
    handleShowCroppedImg("#img__channel--cover", imgsrc)
    handleResetEditDialog()

    isCover = true;
    cropper.destroy();
    handleCheckInputChannel()
})
//

function resetInputValueChannel() {
    if (inputEmail.hasClass('unf-user-input--isError')) {
        inputEmail.removeClass('unf-user-input--isError');
        $('.unf-user-input--moderator-email .unf-user-input__info-msg').text('Please enter your email accounts in Tokopedia');
    }

    if ($('.create-channel__moderator').hasClass('create-channel__moderator--show')) {
        $('.unf-user-input--moderator-email .unf-user-input__icon').removeClass('icon-check');
        $('.create-channel__moderator').removeClass('create-channel__moderator--show');
    }

    // reset input
    $('#input__channel--name').val('');
    $('#input__channel--desc').val('');
    $('#input__channel--moderator-email').val('');

    // reset img
    resetInputImageChannel()
    handleCheckInputChannel();
}

function resetInputImageChannel() {
    $('.unf-user-input__image-container').addClass('hide');
    $('#img__channel--cover').removeAttr('src');
    $('#input__channel--cover').val('');
    isCover = false
}

function handleCheckInputChannel() {
    if (isCover && isName && isDesc && isModeratorEmail && isModeratorName) {
        $('.unf-user-dialog__action .unf-user-btn--primary').attr('disabled', false);
    } else {
        $('.unf-user-dialog__action .unf-user-btn--primary').attr('disabled', true);
    }
}

function loadingCheckEmail(loading) {
    if (loading) {
        $('.unf-user-input__icon').removeClass('icon-check');
        $('.unf-user-input__icon').addClass('icon-loader');
    } else {
        $('.unf-user-input__icon').removeClass('icon-loader');
    }
}

$(function handleSaveChannel() {
    $(document).on('click', '#btn__channel--create', function () {
        var id = $(this).data('id')
        const name = $('#input__channel--name').val()
        const description = $('#input__channel--desc').val()
        const moderator = $('#input__channel--moderator-name').val()
        const img = $('#img__channel--cover').prop('src')
        const url = $('#input__channel--moderator-url').val()
        if (id === undefined) {
            id = dataChannel[dataChannel.length - 1].id + 1
            const newChannel = {
                id,
                url,
                status: 1,
                archive: false,
                img,
                name,
                description,
                moderator
            }
            dataChannel.push(newChannel)
        }
        else {
            for (const data of dataChannel) {
                if (data.id === id) {
                    data.name = name
                    data.description = description
                    data.moderator = moderator
                    data.img = img
                    data.url = url
                }
            }
        }

        loopData()
        handleCloseCreateChannel()
    })
})
