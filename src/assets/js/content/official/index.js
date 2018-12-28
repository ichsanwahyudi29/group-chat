var officialTitle = false
    itemTitle = false
    itemImg = false
    itemLink = false

var dataOfficial

$(document).ready(function(){
    loadJSON('./assets/js/content/official/dummy.json', function (response) {
        var res = JSON.parse(response);
        dataOfficial = res.official
        loopDataOfficial()
    })
})

function initOfficialContainer(){
    $('.official-card').empty()

    var officialContent
    if(dataOfficial.length === 0){
        $('.group-chat__btn--create').addClass('hide')
        officialContent = `
            <div class="card channel empty-card empty-card--official">
                <div class="empty-box">
                    <img src="./assets/img/empty-state-illustration_opening.png" class="empty-box__img"/>
                    <div class="empty-box__description">
                        <div class="empty-box__description-title">
                            Welcome to Official
                        </div>
                        <div class="empty-box__description-text">
                            Add official group first, and then add items.<br/>
                            Your official items will appears in “Info” menu.
                        </div>
                    </div>
                    <div class="unf-user-btn unf-user-btn--medium group-chat__btn-primary group-chat__btn--create official-btn-add-group">Add Group</div>
                </div>
            </div>
        `
    }
    else{
        $('.group-chat__btn--create').removeClass('hide')
        officialContent = `
            <div class="card official-card">
                <div class="official-card__left">
                    <div class="left-side__head">OFFICIAL GROUP</div>
                    <ul class="left-side__body customScrollBar customScrollBar--y hiddenScroll" id="official-list"></ul>
                    <div class="left-side__footer">
                        <a class="left-side__add-btn group-chat__btn--create official-btn-add-group">Add Group</a>
                    </div>
                </div>
                <div class="official-card__right" id="official-content">
                    <div class="right-side__wrapper">
                        <div class="right-side__head">
                        </div>
                        <div class="table__list table__official"></div>
                    </div>
                </div>
            </div> 
        `
    }
    $('.container').html(officialContent)
    $('.customScrollBar').scrollbar();
}
function loopDataOfficial(id){
    initOfficialContainer()
    if(dataOfficial.length > 0){
        id = (id === undefined) ? dataOfficial[0].id : id
        dataOfficial.map((item) => {
                $('#official-list').append(renderOfficialList(item))
        })
        onScrollTopBottomShadow()
        loopDataItem(id)
    }
}
function renderOfficialList(data){
    var template = `
        <li class="left-side__list" id="official-list-${data.id}" onclick="loopDataItem(${data.id})">
            <a>${data.title}</a>
        </li>
    `
    return template
}

function initItemContainer(official_id){
    var filteredData = dataOfficial.filter(item => item.id === official_id)[0]

    var itemContainer
    
    $('.left-side__list').removeClass('left-side__list--active')
    $(`#official-list-${official_id}`).addClass('left-side__list--active')
    $('#official-content .right-side__head').html(`
        <div class="right-side__head--title">
            <span>${filteredData.title}</span>
            <a class="unf-user-btn btn-icon btn-icon-action btn-icon--edit unf-user-tooltip" onclick="handleOpenEditOfficial(${official_id})">
                <div class="unf-user-tooltip__container btn-tooltip" aria-label="Edit" data-position="top"></div>
            </a>
            <a class="unf-user-btn btn-icon btn-icon-action btn-icon--delete unf-user-tooltip" onclick="handleOpenDeleteOfficial(${official_id})">
                <div class="unf-user-tooltip__container btn-tooltip" aria-label="Delete" data-position="top"></div>
            </a>
        </div>
        <div class="unf-user-btn unf-user-btn--medium group-chat__btn-primary group-chat__btn--create official-btn-add-item hide" onclick="handleOpenAddItem(${official_id})">Add Item</div>
    `)

    if(filteredData.items.length > 0){
        $('.official-btn-add-item').removeClass('hide')
        itemContainer = `
            <table cellspacing="0" cellpadding="0">
                <thead>
                    <tr>
                        <td>Title</td>
                        <td>Image</td>
                        <td>Link</td>
                        <td>Status</td>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        `
    }
    else{
        $('.official-btn-add-item').addClass('hide')
        itemContainer = `
            <div class="empty-box">
                <img src="./assets/img/empty-state-illustration.png" class="empty-box__img"/>
                <div class="empty-box__description">
                    <div class="empty-box__description-title">
                        No Available Items Yet
                    </div>
                    <div class="empty-box__description-text">
                        Official Partner Items will be shown here as they are added.
                    </div>
                </div>
                <div class="unf-user-btn unf-user-btn--medium group-chat__btn-primary group-chat__btn--create" onclick="handleOpenAddItem(${official_id})">Add Item</div>
            </div>
        `
        
    }
    $('.table__official').html(itemContainer)
}
function loopDataItem(official_id){
    initItemContainer(official_id)
    var filteredData, sortedData

    dataOfficial.map(item => {
        if(item.id === official_id){
            filteredData = item.items
            sortedData = filteredData.filter(item => item.status === 1).concat(filteredData.filter(item => item.status === 0))
            item.items = sortedData
        }
    })

    sortedData.map(item => {
        $('.table__official table>tbody').append(renderItemList(item))
    })

}
function renderItemList(data){
    var template = `
    <tr>
        <td class="official-title">
            <div>${data.title}</div>
        </td>
        <td class="official-img">
            <img src="${data.img}" class="img-thumb--80"/>
        </td>
        <td class="official-link">
            <a href="${data.link}" target="_blank">${data.link}</a>
        </td>
        <td class="table__list-action channel__list-status">
            <div class="list-action">
                <div class="list-action__set d-flex">
                    <div class="status-toggle-container">
                        <div class="unf-user-toggle">
                            <input ${(data.status === 1)? 'checked' : ''} type="checkbox" class="unf-user-toggle__checkbox" id="item-${data.id}" onchange="handleOpenChangeStatusItem(this, ${data.id}, ${data.official_id})">
                            <label for="item-${data.id}"></label>
                        </div>
                        <label class="status-toggle-label status-toggle-label__right">
                            ${(data.status === 1)? 'Active' : 'Inactive'}
                        </label>
                    </div>
                </div>
                <div class="list-action__btn">
                    <a class="unf-user-btn unf-user-btn--small btn-icon btn-icon-action btn-icon--edit unf-user-tooltip" onclick="handleOpenEditItem(${data.official_id}, ${data.id})">
                        <div class="unf-user-tooltip__container btn-tooltip" aria-label="Edit" data-position="top"></div>
                    </a>
                    ${(data.status === 0)? 
                    `<a class="unf-user-btn unf-user-btn--small btn-icon btn-icon-action btn-icon--delete unf-user-tooltip" onclick="handleOpenDeleteItem(${data.official_id}, ${data.id})">
                        <div class="unf-user-tooltip__container btn-tooltip" aria-label="Delete" data-position="top"></div>
                    </a>`    
                    : ''}
                </div>
            </div>
        </td>
    </tr>
    `
    return template
}

$(function renderAddGroupDialog(){
    $('.js__unf-user-dialog--add-official').html(`
        <div class="unf-user-dialog__content p-0">
            <div class="unf-user-dialog__header">Add Group</div>
            <span class="unf-user-dialog__close unf-user-dialog__close--create-channel" onclick="handleCloseAddOfficial()"></span>
            <div class="unf-user-dialog__body">
                <div class="unf-user-input">
                    <label class="unf-user-input__label">Group Title</label>
                    <input type="text" id="input__official--title" class="unf-user-input__control" name="official-title" maxlength="20">
                    <div class="unf-user-input__info">
                        <span></span>
                        <span class="unf-user-input__info-counter">0/20</span>
                    </div>
                </div>
            </div>
            <div class="unf-user-dialog__action unf-user-dialog__action--group-chat">
                <button class="unf-user-btn unf-user-btn--medium unf-user-btn--secondary unf-user-dialog__close--create-channel" onclick="handleCloseAddOfficial()">Cancel</button>
                <button id="btn__official--add" class="unf-user-btn unf-user-btn--medium unf-user-btn--primary" disabled>Save</button>
            </div>
        </div>
    `)
})

$(function handleOpenAddOfficial(){
    $(document).on('click', '.official-btn-add-group', function(){
        $('.js__unf-user-dialog--add-official')
            .find('.unf-user-dialog__header').text('Add Group').end()
            .find('#btn__official--add').removeData('id').end()
        handleDialogOpen($('.js__unf-user-dialog--add-official'));
        autoFocusInput('#input__official--title')
    })
})

function handleOpenEditOfficial(official_id){
    $('.js__unf-user-dialog--add-official')
        .find('.unf-user-dialog__header').text('Edit Group').end()
        .find('#btn__official--add').data('id', official_id).end()
    handleFetchOfficial(official_id)
    handleDialogOpen($('.js__unf-user-dialog--add-official'));
    autoFocusInput('#input__official--title')
}

function handleFetchOfficial(id){
    var data = dataOfficial.filter(item => item.id === id)[0]
    $('#input__official--title').val(data.title)
    
    officialTitle = true
    handleCheckOfficial()
}

function handleCloseAddOfficial(){
    handleResetOfficial()
    handleDialogClose()
}

$(function handleInputOfficialTitle(){
    $(document).on('input', '#input__official--title', function(){
        counterInput(this, '20');
        var $val = $(this).val()
        if($val !== ''){
            officialTitle = true
        }
        else{
            officialTitle = false
        }
        handleCheckOfficial()
    })
})

function handleCheckOfficial(){
    if(officialTitle){
        $('#btn__official--add').prop('disabled', false)
    }
    else{
        $('#btn__official--add').prop('disabled', true)
    }
}

$(function handleSaveOfficial(){
    var defaultOfficialData = {
        "id": null,
        "title" : null,
        "items": []
    }
    $(document).on('click', '#btn__official--add', function(){
        var id = $(this).data('id')
        //add
        if(id === undefined){
            var newId = (dataOfficial.length > 0) ? dataOfficial[dataOfficial.length - 1].id + 1 : 1
            var newData = Object.assign({}, defaultOfficialData, {
                "id": newId,
                "title": $('#input__official--title').val()
            })
            dataOfficial.push(newData)
            loopDataOfficial(newId)
        }
        //edit
        else{
            dataOfficial.map(item => {
                if(item.id === id){
                    item.title = $('#input__official--title').val()
                }
            })
            loopDataOfficial(id)
        }
        handleCloseAddOfficial()
    })
})

function handleResetOfficial(){
    $('#input__official--title').val('')
    officialTitle = false
    handleCheckOfficial()
}

//item
$(function renderAddItemDialog(){
    $('.js__unf-user-dialog--add-official-item').html(`
        <div class="unf-user-dialog__content p-0">
            <div class="unf-user-dialog__header">Add Item</div>
            <span class="unf-user-dialog__close unf-user-dialog__close--create-channel" onclick="handleCloseAddOfficialItem()"></span>
            <div class="unf-user-dialog__body">
                <div class="unf-user-input">
                    <label class="unf-user-input__label">Group</label>
                    <input type="text" id="input__item--official" class="unf-user-input__control" name="item-official" maxlength="20" readonly>
                    <div class="unf-user-input__info"></div>
                </div>
                <div class="unf-user-input">
                    <label class="unf-user-input__label">Item Title</label>
                    <input type="text" id="input__official-item--title" class="unf-user-input__control" name="item-title" maxlength="20">
                    <div class="unf-user-input__info">
                        <span></span>
                        <span class="unf-user-input__info-counter">0/20</span>
                    </div>
                </div>
                <div class="unf-user-input">
                    <label class="unf-user-input__label">Image</label>
                    <div class="unf-user-input__control unf-user-input__control--image unf-user-input__control--image--template-chat">
                        <input id="input__official-item--cover" type="file" accept=".jpg,.jpeg,.png">
                        <div class="unf-user-input__image-container unf-user-input__image-container--full hide">
                            <img id="img__official-item--cover" class="unf-user-input__image-file">
                            <div class="unf-user-input__image-action">
                                <span id="change__official-item--cover" class="unf-user-input__image-action-btn unf-user-input__image-action-btn--edit"></span>
                                <span id="delete__official-item--cover" class="unf-user-input__image-action-btn unf-user-input__image-action-btn--delete"></span>
                            </div>
                        </div>
                        <div id="upload__official-item--cover" class="unf-user-input__image-upload">
                            <span class="unf-user-input__image-upload-text unf-user-input__image-upload-text--column"></span>
                        </div>
                    </div>
                    <div class="unf-user-input__info">
                        <span></span>
                    </div>
                </div>
                <div class="unf-user-input">
                    <label class="unf-user-input__label">URL</label>
                    <input type="text" id="input__official-item--url" class="unf-user-input__control" name="official-item-image-url"
                        maxlength="70" placeholder="https://www.tokopedia.com">
                    <div class="unf-user-input__info">
                        <span class="unf-user-input__info-msg"></span>
                    </div>
                </div>
            </div>
            <div class="unf-user-dialog__action unf-user-dialog__action--group-chat">
                <button class="unf-user-btn unf-user-btn--medium unf-user-btn--secondary unf-user-dialog__close--create-channel" onclick="handleCloseAddOfficialItem()">Cancel</button>
                <button id="btn__official-item--add" class="unf-user-btn unf-user-btn--medium unf-user-btn--primary" disabled>Save</button>
            </div>
        </div>
    `)
})

function handleOpenAddItem(official_id){
    $('.js__unf-user-dialog--add-official-item')
        .find('.unf-user-dialog__header').text('Add Item').end()
        .find('#btn__official-item--add').removeData('id').data('official', official_id).end()
    handleFetchOfficialItem(official_id)
    handleDialogOpen($('.js__unf-user-dialog--add-official-item'));
}

function handleOpenEditItem(official_id, item_id){
    $('.js__unf-user-dialog--add-official-item')
        .find('.unf-user-dialog__header').text('Edit Item').end()
        .find('#btn__official-item--add').data('id', item_id).data('official', official_id).end()
    handleFetchOfficialItem(official_id, item_id)
    handleDialogOpen($('.js__unf-user-dialog--add-official-item'));
}

function handleFetchOfficialItem(official_id, item_id){
    var data = dataOfficial.filter(item => item.id === official_id)[0]
    if(item_id !== undefined){
        var dataItem = data.items.filter(item => item.id === item_id)[0]
        
        $('#input__official-item--title').val(dataItem.title)
        $('#input__official-item--url').val(dataItem.link)
        handleRevealOfficialItemImg($('#input__official-item--cover')[0], dataItem.img);

        itemTitle = true
        itemImg = true
        itemLink = true
    }
    $('#input__item--official').val(data.title)

    handleCheckOfficialItem()
}

function handleRevealOfficialItemImg(input, img) {
    var fileElem = document.getElementById(input.id).nextElementSibling;
    $('#img__official-item--cover').attr('src', img);
    $(fileElem).removeClass('hide');
}

function handleCloseAddOfficialItem(){
    handleResetOfficialItem()
    handleDialogClose()
}

$(function handleInputOfficialItemTitle(){
    $(document).on('input', '#input__official-item--title', function(){
        counterInput(this, '20');
        var $val = $(this).val()
        if($val !== ''){
            itemTitle = true
        }
        else{
            itemTitle = false
        }
        handleCheckOfficialItem()
    })
})

$(function handleInputOfficialItemLink(){
    $(document)
        .on('input', '#input__official-item--url', function () {
            if ($(this).val()) {
                itemLink = true;
            } else {
                itemLink = false;
            }
            handleCheckOfficialItem();
        })
        .on('focus', '#input__official-item--url', function () {
            handleInputError($(this).parent(), '', true);
        })
})

$(function handleChangeOfficialItemImg() {
    $(document).on('click', '#upload__official-item--cover, #change__official-item--cover', function () {
        $('#input__official-item--cover').click()
    })
})

$(function handleDeleteOfficialItemImg() {
    $(document).on('click', '#delete__official-item--cover', function () {
        handleResetOfficialItemImg()
    })
});

$(function handleUploadOfficialItemImg() {
    $(document).on('change', '#input__official-item--cover', function () {
        var imgType = ['image/png', 'image/jpg', 'image/jpeg'];
        var file = this.files;
        if (file.length !== 0) {
            if (
                file[0].type == imgType[0] ||
                file[0].type == imgType[1] ||
                file[0].type == imgType[2]
            ) {
                if (file[0].size <= 10000000) {
                    readURLOfficialItem(this);
                } else {
                    handleOpenToaster(true, true, helper.en.image.error[0]);
                }
            } else {
                handleOpenToaster(true, true, helper.en.image.error[1]);
            }
        }
        handleCheckOfficialItem();
    })
})

//cropper
function readURLOfficialItem(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $("#image-editor-canvas").attr("src", e.target.result);
            editPictureDialog('.js__unf-user-dialog--add-official-item');
            cropImg(1,1);
        };
    
        reader.readAsDataURL(input.files[0]);
    }
}
$(document).on('click', '#edit-image-cancel', function(){
    $(".js__dialog-image-editor").removeClass("unf-user-dialog--show");
    $(".js__unf-user-dialog--add-official-item").addClass("unf-user-dialog--show");

    handleResetEditDialog()
    cropper.destroy();
});

$(document).on('click', '#edit-image-save', function(){
    let imgsrc = cropper.getCroppedCanvas({width: 800, height: 800}).toDataURL("image/jpeg");
    $(".js__dialog-image-editor").removeClass("unf-user-dialog--show");
    $(".js__unf-user-dialog--add-official-item").addClass("unf-user-dialog--show");
    handleShowCroppedImg("#img__official-item--cover" ,imgsrc)
    handleResetEditDialog()

    itemImg = true;
    cropper.destroy();
    handleCheckOfficialItem()
});
//

function handleCheckOfficialItem(){
    if(itemTitle && itemImg && itemLink){
        $('#btn__official-item--add').prop('disabled', false)
    }
    else{
        $('#btn__official-item--add').prop('disabled', true)
    }
}

$(function handleSaveOfficialItem(){
    var defaultItemData = {
        "id": null,
        "official_id": null,
        "title": null,
        "img": null,
        "link": null,
        "status": 0
    }
    $(document).on('click', '#btn__official-item--add', function(){
        if (!validateURL($('#input__official-item--url').val())) {
            handleInputError($('#input__official-item--url').parent(), helper.en.link.error[0], false);
            return false;
        }

        var id = $(this).data('id')
        var official_id = $(this).data('official')
        var data = dataOfficial.filter(item => item.id === official_id)[0].items
        //add
        if(id === undefined){
            var newId = (data.length > 0) ? data[data.length - 1].id + 1 : 1
            var newData = Object.assign({}, defaultItemData, {
                "id": newId,
                "official_id": official_id,
                "title": $('#input__official-item--title').val(),
                "img": $('#img__official-item--cover').attr('src'),
                "link": $('#input__official-item--url').val(),
            })
            dataOfficial.map(item => {
                if(item.id === official_id){
                    item.items.unshift(newData) 
                }
            })
        }
        //edit
        else{
            dataOfficial.map(item => {
                if(item.id === official_id){
                    item.items.map(data => {
                        if(data.id === id){
                            data.title = $('#input__official-item--title').val()
                            data.img = $('#img__official-item--cover').attr('src')
                            data.link = $('#input__official-item--url').val()
                        }
                    })
                }
            })
        }
        loopDataItem(official_id)
        handleCloseAddOfficialItem()
    })
})

function handleResetOfficialItem(){
    $('#input__item--official').val('')
    $('#input__official-item--title').val('')
    $('#input__official-item--url').val('')
    handleInputError($('#input__official-item--url').parent(),'', true);
    itemTitle = false
    itemLink = false
    handleResetOfficialItemImg()
    handleCheckOfficialItem()
}

function handleResetOfficialItemImg(){
    itemImg = false
    $('.unf-user-input__image-container').addClass('hide');
    $('#img__official-item--cover').removeAttr('src');
    $('#input__official-item--cover').val('');
    handleCheckOfficialItem();
}


function onScrollTopBottomShadow() {
    function handlePutShadow(e){
        var scroll = $(e).scrollTop();
        var head = $('.left-side__head')
        var foot = $('.left-side__footer')

        if (scroll > 0) {
            head.addClass('left-side__head--shadow');
        } 
        else {
            head.removeClass('left-side__head--shadow');
        }

        if (scroll + $(e).height() < $(e)[0].scrollHeight) {
            foot.addClass('left-side__footer--shadow');
        } 
        else {
            foot.removeClass('left-side__footer--shadow');
        }
    }

    handlePutShadow($('.left-side__body'))

    $('#official-list').on({
        scroll: function(){
            handlePutShadow(this)
        }
    })
}  
