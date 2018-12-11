// Data
var isTitle = false;
var isLink = false;
var isImg = false;
var addDialog;

var dataAds = [
    {
        id: 1,
        url: 'https://www.tokopedia.com/promokopiluwak',
        status: 1,
        img: './assets/img/gc_ads_1.jpg',
        name: 'Promo Kopi Luwak'
    },
    {
        id: 2,
        url: 'https://www.tokopedia.com/detol',
        status: 0,
        img: './assets/img/gc_ads_2.jpeg',
        name: 'Promo Detol'
    },
    {
        id: 3,
        url: 'https://www.tokopedia.com/',
        status: 0,
        img: './assets/img/gc_ads_3.jpg',
        name: 'Promo Tokopedia'
    }
]

$(document).ready(function () {
    initData();
})

// Init
function initAdsContainer(){
    var dataActive = dataAds.filter(item => item.status === 1)
    var dataInactive = dataAds.filter(item => item.status === 0)
    var activeList = ''
    var inactiveList = ''
    if(dataActive.length > 0){
        activeList =
        `<div class="card ads-card channel--active">
            <div class="card__header">
                <div class="card__header-title  channel__title">
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
    if(dataInactive.length > 0){
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
                <div class="pagination-items">
                    <span data-page="1"><</span>
                    <span data-page="1">1</span>
                    <span class="page__active">2</span>
                    <span data-page="3">3</span>
                    <span data-page="4">4</span>
                    <span data-page="3">></span>
                </div>
            </div>
        </div>`
    }
    $('.container').html( activeList + inactiveList )
}

function initData(){
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
        <td class="table__list-ads-status">
            <div class="list-ads-status">
                <div class="list-ads-status__set">
                    <select class="list-ads-status__select ${data.status === 0 ? 'list-ads-status__select--inactive' : ''}"  onchange="handleChangeAdsStatus(this, ${data.id})">
                        <option value="Active" ${data.status === 1 ? 'selected' : ''}>Active</option>
                        <option value="Inactive" ${data.status === 0 ? 'selected' : ''}>Inactive</option>
                    </select>
                </div>
                <div class="list-ads-status__btn">
                    <a class="unf-user-btn unf-user-btn--small btn-icon btn-icon-action btn-icon--edit" onclick="handleEditAds(${data.id})"></a>
                    ${data.status === 0 ? `<a class="unf-user-btn unf-user-btn--small btn-icon btn-icon-action btn-icon--delete" onclick="handleDeleteAds(${data.id})"></a>`: ``}                            
                </div>
            </div>
        </td>
    </tr>`
    return template
}

// Create Ads
$(function handleCreateAds() {
    $('.group-chat__btn--create').on({
        click: function() {
            addDialog = $('.js__child-dialog-add-edit-ads').html()
            dialogModule.renderDialog({
                title: 'Add Ads',
                children: $('.js__child-dialog-add-edit-ads'),
                close: true,
                styleClass: 'dialog--414',
                btnTextPrimary: 'Save',
                btnPrimaryDisabled: true,
                init: handleResetInputValueAds,
                handleClickPrimary: ()=> {handleSaveAds()},
                handleClickSecondary:  ()=> {handleCloseAddEditDialog()}
            });
            $('.js__child-dialog-add-edit-ads').html('')
        },
    });
});

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
			    handleOpenToaster(true, true, helper.image.error[0]);
			}
		    } else {
			    handleOpenToaster(true, true, helper.image.error[1]);
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
            editPictureDialog();
            cropImg(6,1);
        };
    
        reader.readAsDataURL(input.files[0]);
    }
}
$("#edit-image-cancel").click(function (e) {
    $(".js__dialog-image-editor").removeClass("unf-user-dialog--show");
    $(".js__template-dialog").addClass("unf-user-dialog--show");

    handleResetEditDialog()
    cropper.destroy();
});
$("#edit-image-save").click(function (e) {
    let imgsrc = cropper.getCroppedCanvas({width: 720, height: 120}).toDataURL("image/jpeg");
    $(".js__dialog-image-editor").removeClass("unf-user-dialog--show");
    $(".js__template-dialog").addClass("unf-user-dialog--show");
    handleShowCroppedImg("#img__ads--cover" ,imgsrc)
    handleResetEditDialog()

    isImg = true;
    cropper.destroy();
    handleCheckInputAds()
});

//

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

function handleCloseAddEditDialog(){
    //put back html 
    $('.js__child-dialog-add-edit-ads').html(addDialog)
    handleDialogClose()
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

// Edit Ads
function handleEditAds(id) {
    addDialog = $('.js__child-dialog-add-edit-ads').html()
    dialogModule.renderDialog({
        title: 'Edit Ads',
        children: $('.js__child-dialog-add-edit-ads'),
        close: true,
        styleClass: 'dialog--414',
        btnTextPrimary: 'Save',
        btnPrimaryDisabled: true,
        init: handleResetInputValueAds,  
        handleClickPrimary: ()=>{handleSaveAds(id)},
        handleClickSecondary:  ()=>{handleCloseAddEditDialog()}
    });
    $('.js__child-dialog-add-edit-ads').html('')
    handleFetchAdsData(id)
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

// Add & Edit handle
function handleSaveAds(id){
    if (!validateURL($('#input__ads--link').val())) {
        handleInputError($('#input__ads--link').parent(), helper.link.error[0], false);
        return false;
    }

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
    initData();
    handleCloseAddEditDialog();
}

// Delete Ads
function handleDeleteAds(id) {
    dialogModule.renderDialog({
        title: 'Delete Ads',
        children: $('.js__child-dialog-delete-ads'),
        close: false,
        styleClass: 'dialog--320',
        btnTextPrimary: 'Yes, Delete',
        handleClickPrimary: ()=> {deleteAds(id)}
    });
}
function deleteAds(id){
    dataAds.map((item, index) => {
        if(item.id === id){
            dataAds.splice(index, 1)
        }
    })
    initData();
    handleDialogClose();
}

// Ads Status
function handleActivateAds(id) {
    handleStatusAds(id , 1)
}
function handleDeactivateAds(id) {
    handleStatusAds(id , 0)
}
function handleChangeAdsStatus(e, id) {
    if(e.selectedIndex === 0){
        dialogModule.renderDialog({
            title: 'Activate Ads',
            children: $('.js__child-dialog-activate-ads'),
            close: false,
            styleClass: 'dialog--320',
            btnTextPrimary: 'Yes, Activate',
            handleClickPrimary: ()=> {handleActivateAds(id)}
        });
    }else{
        dialogModule.renderDialog({
            title: 'Deactivate Ads',
            children: $('.js__child-dialog-deactivate-ads'),
            close: false,
            styleClass: 'dialog--320',
            btnTextPrimary: 'Yes, Deactivate',
            handleClickPrimary: ()=> {handleDeactivateAds(id)}
        });
    }
}

function handleStatusAds(id, val) {
    for (const data of dataAds) {
        if(data.id == id){
            data.status = val
        }
        else{
            data.status = 0
        }
    }
    handleDialogClose();
    initData();
}