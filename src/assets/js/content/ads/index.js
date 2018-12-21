var isTitle = false;
var isLink = false;
var isImg = false;

var dataAds

$(document).ready(function () {
    loadJSON('./assets/js/content/ads/empty_dummy.json', function (response) {
        var res = JSON.parse(response);
        dataAds = res.ads
        loopAdsData()
    })
})

function initAdsContainer() {
    $('.ads-card').remove()
    var dataActive = dataAds.filter(item => item.status === 1)
    var dataInactive = dataAds.filter(item => item.status === 0)

    var activeList = ''
    var inactiveList = ''

    if(dataAds.length === 0){
        $('.group-chat__btn--create').addClass('hide')
        var emptyAds = `
            <div class="card ads-card empty-card">
                <div class="empty-box">
                    <img src="./assets/img/empty-state-illustration.png" class="empty-box__img"/>
                    <div class="empty-box__description">
                        <div class="empty-box__description-title">
                            No Available Ads Yet
                        </div>
                        <div class="empty-box__description-text">
                            Ads will be shown here as they are added.
                        </div>
                    </div>
                    <div class="unf-user-btn group-chat__btn-primary group-chat__btn--create">Add Ads</div>
                </div>
            </div>
        `
        $('.container').html(emptyAds)
    }
    else{
        $('.group-chat__btn--create').removeClass('hide')
        if (dataActive.length > 0) {
            activeList =
                `<div class="card ads-card channel--active">
                    <div class="card__header">
                        <div class="card__header-title channel__title">
                            Active Ads
                        </div>
                    </div>
                    <div class="table__list table__ads">
                        <table cellspacing="0" cellpadding="0">
                        <thead>
                            <tr>
                                <td>Ads Title</td>
                                <td>Ads Image</td>
                                <td>Ads Link</td>
                                <td>Status</td>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                        </table>
                    </div>
                </div>`
        }
        if (dataInactive.length > 0) {
            inactiveList =
                `<div class="card ads-card channel--inactive">
                <div class="card__header">
                    <div class="card__header-title channel__title">
                        Inactive Ads
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
                <div class="table__list table__ads">
                    <table cellspacing="0" cellpadding="0">
                    <thead>
                        <tr>
                            <td>Ads Title</td>
                            <td>Ads Image</td>
                            <td>Ads Link</td>
                            <td>Status</td>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                    </table>
                </div>
                <div class="pagination-container">
                        ${renderPagination(dataInactive.length, 1, 1)}
                </div>
            </div>`
        }
        $('.container').html(activeList + inactiveList)
    }
}

function loopAdsData(){
    initAdsContainer();

    var dataActive = dataAds.filter(item => item.status === 1)
    var elementActive = $('.channel--active .table__list tbody')
    elementActive.empty();
    dataActive.map(data=>{
        elementActive.append(renderAdsList(data))
    })

    var dataInactive = dataAds.filter(item => item.status === 0)
    var elementInactive= $('.channel--inactive .table__list tbody')
    elementInactive.empty();
    dataInactive.map(data=>{
        elementInactive.append(renderAdsList(data))
    })

    initCustomSelect();
}

function renderAdsList(data){
    var template = 
    `<tr>
        <td class="table__list-num">
            <h6 class="list-num__id">${data.name}</h6>
        </td>
        <td class="table__list-ads-img">
            <img class="list-ads-img" src="${data.img}"/>
        </td>
        <td class="table__list-ads-link">
            <a class="list-ads-link" href="${data.url}">${data.url}</a>
        </td>
        <td class="table__list-ads-status channel__list-status">
            <div class="list-ads-status">
                <div class="list-ads-status__set">
                    <div class="status-toggle-container">
                        <div class="unf-user-toggle">
                            ${data.status === 1 ?
                            `<input checked type="checkbox" class="unf-user-toggle__checkbox" id="ads-${data.id}" onclick="handleChangeAdsStatus(this, ${data.id})">` :
                            `<input type="checkbox" class="unf-user-toggle__checkbox" id="ads-${data.id}" onclick="handleChangeAdsStatus(this, ${data.id})">`}
                            <label for="ads-${data.id}"></label>
                        </div>
                        <label class="status-toggle-label status-toggle-label__right">
                            ${(data.status === 1)? 'Active' : 'Inactive'}
                        </label>
                    </div>
                </div>
                <div class="list-ads-status__btn">
                    <a class="unf-user-btn unf-user-btn--small btn-icon btn-icon-action btn-icon--edit unf-user-tooltip" onclick="handleClickEditAds(${data.id})">
                        <div class="unf-user-tooltip__container btn-tooltip" aria-label="Edit" data-position="top"></div>
                    </a>
                    ${data.status === 0 ? `
                    <a class="unf-user-btn unf-user-btn--small btn-icon btn-icon-action btn-icon--delete unf-user-tooltip" onclick="handleDeleteAds(${data.id})">
                        <div class="unf-user-tooltip__container btn-tooltip" aria-label="Delete" data-position="top"></div>
                    </a>`
                    : ``}                            
                </div>
            </div>
        </td>
    </tr>`
    return template
}

$(function renderAddAdsDialog() {
    $('.js__unf-user-dialog--ads-channel').html(`
        <div class="unf-user-dialog__content p-0">
            <div class="unf-user-dialog__header">Add Ads</div>
            <span class="unf-user-dialog__close unf-user-dialog__close--create-channel" onclick="handleCloseAddAds()"></span>
            <div class="unf-user-dialog__body">
                <div class="unf-user-input">
                    <label class="unf-user-input__label">Ads Title</label>
                    <input type="text" id="input__ads--title" class="unf-user-input__control" name="ads-title" maxlength="20">
                    <div class="unf-user-input__info">
                        <span></span>
                        <span class="unf-user-input__info-counter">0/20</span>
                    </div>
                </div>
                <div class="unf-user-input create-ads__image">
                    <label class="unf-user-input__label">Add Image</label>
                    <div class="unf-user-input__control unf-user-input__control--image">
                        <input id="input__ads--cover" type="file" accept=".jpg,.jpeg,.png">
                        <div class="unf-user-input__image-container unf-user-input__image-container--full hide">
                            <img id="img__ads--cover" class="unf-user-input__image-file">
                            <div class="unf-user-input__image-action">
                                <span id="change__ads--cover" class="unf-user-input__image-action-btn unf-user-input__image-action-btn--edit"></span>
                                <span id="delete__ads--cover" class="unf-user-input__image-action-btn unf-user-input__image-action-btn--delete"></span>
                            </div>
                        </div>
                        <div id="upload__ads--cover" class="unf-user-input__image-upload">
                            <span class="unf-user-input__image-upload-text unf-user-input__image-upload-text--row">Add Photo</span>
                        </div>
                    </div>
                </div>
                <div class="unf-user-input">
                    <label class="unf-user-input__label">Ads Link</label>
                    <input type="text" id="input__ads--link" class="unf-user-input__control" name="ads-link" placeholder="e.g.https://tokopedia.com">
                    <div class="unf-user-input__info">
                        <span class="unf-user-input__info-msg"></span>
                    </div>
                </div>
            </div>
            <div class="unf-user-dialog__action unf-user-dialog__action--group-chat">
                <button class="unf-user-btn unf-user-btn--medium unf-user-btn--secondary unf-user-dialog__close--create-channel" onclick="handleCloseAddAds()">Cancel</button>
                <button id="btn__ads--add" class="unf-user-btn unf-user-btn--medium unf-user-btn--primary" disabled>Save</button>
            </div>
        </div>
    `)
})

$(function handleClickAddAds() {
    $(document).on('click', '.group-chat__btn--create', function(){
        $('.js__unf-user-dialog--ads-channel')
            .find('.unf-user-dialog__header').text('Add Ads').end()
            .find('#btn__ads--add').removeData('id').end()
        handleDialogOpen($('.js__unf-user-dialog--ads-channel'));
    })
})

function handleClickEditAds(id) {
    $('.js__unf-user-dialog--ads-channel')
        .find('.unf-user-dialog__header').text('Edit Ads').end()
        .find('#btn__ads--add').data('id', id).end()
    handleFetchAdsData(id)
    handleDialogOpen($('.js__unf-user-dialog--ads-channel'));
}

function handleCloseAddAds() {
    handleResetInputValueAds()
    handleDialogClose()
}

function handleFetchAdsData(id){
    var data = dataAds.filter(item => item.id === id)[0]
	$('#input__ads--title').val(data.name);
	$('#input__ads--link').val(data.url);
    handleRevealAdsImg($('#input__ads--cover')[0], data.img);
    isTitle = true;
    isImg = true;
    isLink = true;
    handleCheckInputAds();
}

function handleRevealAdsImg(input, img){
    var fileElem = document.getElementById(input.id).nextElementSibling;
    $('#img__ads--cover').attr('src', img);
    $(fileElem).removeClass('hide');
}

$(function handleInputAdsTitle() {
    $(document).on('input', '#input__ads--title', function(){
        counterInput(this, '20');
		if ($(this).val()) {
		    isTitle = true;
		} else {
			isTitle = false;
		}
		handleCheckInputAds();
    })
});

$(function handleInputAdsLink() {
    $(document)
        .on('input', '#input__ads--link', function(){
            if ($(this).val()) {
                isLink = true;
            } else {
                isLink = false;
            }
            handleInputError($(this).parent(),'', true);
            handleCheckInputAds();
        })
        .on('focus', '#input__ads--link', function(){
            handleInputError($(this).parent(),'', true);
        })  
});

$(function handleOnChangeAdsImg() {
    $(document).on('click', '#upload__ads--cover, #change__ads--cover', function(){
        $('#input__ads--cover').click();
    })
});

$(function handleOnDeleteAdsImg() {
    $(document).on('click', '#delete__ads--cover', function(){
        handleResetInputImageAds()
    })
});

$(function handleInputAdsImg() {
    $(document).on('change', '#input__ads--cover', function(){
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
		handleCheckInputAds();
    })
});

//cropper
function readURLCrop(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $("#image-editor-canvas").attr("src", e.target.result);
            editPictureDialog('.js__unf-user-dialog--ads-channel');
            cropImg(6,1);
        };
    
        reader.readAsDataURL(input.files[0]);
    }
}
$(document).on('click', '#edit-image-cancel', function(){
    $(".js__dialog-image-editor").removeClass("unf-user-dialog--show");
    $(".js__unf-user-dialog--ads-channel").addClass("unf-user-dialog--show");

    handleResetEditDialog()
    cropper.destroy();
});

$(document).on('click', '#edit-image-save', function(){
    let imgsrc = cropper.getCroppedCanvas({width: 720, height: 120}).toDataURL("image/jpeg");
    $(".js__dialog-image-editor").removeClass("unf-user-dialog--show");
    $(".js__unf-user-dialog--ads-channel").addClass("unf-user-dialog--show");
    handleShowCroppedImg("#img__ads--cover" ,imgsrc)
    handleResetEditDialog()

    isImg = true;
    cropper.destroy();
    handleCheckInputAds()
});
//

function handleResetInputValueAds() {
    isTitle =  false;
    isImg = false;
    isLink = false;
	// reset input
	$('#input__ads--title').val('');
	$('#input__ads--link').val('');
	// reset img
	handleResetInputImageAds()
    handleCheckInputAds();
}

function handleResetInputImageAds() {
    isImg = false;
	$('.unf-user-input__image-container').addClass('hide');
	$('#img__ads--cover').removeAttr('src');
    $('#input__ads--cover').val('');
    handleCheckInputAds();
}

function handleCheckInputAds() {
	if (isTitle && isImg && isLink) {
        $('.unf-user-dialog__action .unf-user-btn--primary').attr('disabled', false);
	} else {
        $('.unf-user-dialog__action .unf-user-btn--primary').attr('disabled', true);
	}
}

$(function handleSaveAds() {
    $(document).on('click', '#btn__ads--add', function () {
        if (!validateURL($('#input__ads--link').val())) {
            handleInputError($('#input__ads--link').parent(), helper.en.link.error[0], false);
            return false;
        }

        var id = $(this).data('id')
        if(id === undefined){
            // Add
            var newData = {}
            newData.id = dataAds.length + 1,
            newData.url = $('#input__ads--link').val()
            newData.status = 0
            newData.img = $('#img__ads--cover').attr('src')
            newData.name = $('#input__ads--title').val()

            dataAds.unshift(newData)
        }
        else{
            // Edit
            dataAds.map(item => {
                if(item.id === id){
                    item.name = $('#input__ads--title').val()
                    item.url = $('#input__ads--link').val()
                    item.img = $('#img__ads--cover').attr('src')
                }
            })
        }
        loopAdsData()
        handleCloseAddAds()
    })
})

