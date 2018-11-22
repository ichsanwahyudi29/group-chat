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

function updateData(id, state, newValue) {
    for (const data of dataAds) {
      if(data.id == id){
        data[state] = newValue
        break
      }
    }
    handleDialogClose();
    initData();
}

// Init
function initAdsContainer(){
    if(dataAds.length > 0){
        $('.ads-card').html(
            `<div class="card__header">
                <div class="card__header-title">
                    Ads List
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
            </div>`
        )
    }
    else{
        $('.ads-card').html(
            `<div class="card__header">
                <div class="card__header-title">
                    No Ads
                </div>
            </div>`
        )
    }
}

function initData(){
    initAdsContainer();
    var element = $('.ads-card .table__list tbody');
    var notActiveAds = dataAds.filter( item => item.status === 0 )
    dataAds = dataAds.filter( item => item.status === 1 ).concat(notActiveAds)

    element.empty();
    for(const data of dataAds){
        element.append(
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
                            <select class="list-ads-status__select ${data.status === 0 ? 'list-ads-status__select--inactive' : ''}"  onchange="changeAdsStatus(this, ${data.id})">
                                <option value="Active" ${data.status === 1 ? 'selected' : ''}>Active</option>
                                <option value="Inactive" ${data.status === 0 ? 'selected' : ''}>Inactive</option>
                            </select>
                        </div>
                        <div class="list-ads-status__btn">
                            <a class="unf-user-btn unf-user-btn--small btn-icon btn-icon-action btn-icon--edit" onclick="clickEditAds(${data.id})"></a>
                            ${data.status === 0 ? `<a class="unf-user-btn unf-user-btn--small btn-icon btn-icon-action btn-icon--delete" onclick="clickDeleteAds(${data.id})"></a>`: ``}                            
                        </div>
                    </div>
                </td>
            </tr>`
        )
    }
    initCustomSelect();
}

// Create Ads
$(function onClickCreateAds() {
    $('.group-chat__btn--create').on({
      click: function() {
        addDialog = $('.js__child-dialog-add-edit-ads').html()
        dialogModule.renderDialog({
            title: 'Add Ads',
            children: $('.js__child-dialog-add-edit-ads'),
            close: true,
            btnTextPrimary: 'Save',
            btnPrimaryDisabled: true,
            init: resetInputValueAds,
            handleClickPrimary: function() {clickSaveAds()},
            handleClickSecondary:  function() {handleCloseAddEditDialog()}
        });
        resizeDialog('414px');
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

$(function onChangeAdsImg() {
    $(document).on('click', '#upload__ads--cover, #change__ads--cover', function(){
        $('#input__ads--cover').click();
    })
});

$(function onDeleteAdsImg() {
    $(document).on('click', '#delete__ads--cover', function(){
        resetInputImageAds()
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
			  isImg = true;
			  readURL(this);
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

$(function handleInputAdsLink() {
    $(document).on('input', '#input__ads--link', function(){
		if ($(this).val()) {
			isLink = true;
		} else {
			isLink = false;
		}
		handleCheckInputAds();
    })
});

function resetInputValueAds() {
    isTitle =  false;
    isImg = false;
    isLink = false;
	// reset input
	$('#input__ads--title').val('');
	$('#input__ads--link').val('');
	// reset img
	resetInputImageAds()
    handleCheckInputAds();
}

function handleCloseAddEditDialog(){
    //put back html 
    $('.js__child-dialog-add-edit-ads').html(addDialog)
    handleDialogClose()
}

function resetInputImageAds() {
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
function clickEditAds(id) {
    addDialog = $('.js__child-dialog-add-edit-ads').html()
    dialogModule.renderDialog({
        title: 'Edit Ads',
        children: $('.js__child-dialog-add-edit-ads'),
        close: true,
        btnTextPrimary: 'Save',
        btnPrimaryDisabled: true,
        init: resetInputValueAds,  
        handleClickPrimary: function() {clickSaveAds(id)},
        handleClickSecondary:  function() {handleCloseAddEditDialog()}
    });
    resizeDialog('414px');
    $('.js__child-dialog-add-edit-ads').html('')
    fetchAdsData(id)
}

function fetchAdsData(id){
    var data = dataAds.filter(item => item.id === id)[0]
	$('#input__ads--title').val(data.name);
	$('#input__ads--link').val(data.url);
    revealImg($('#input__ads--cover')[0], data.img);
    isTitle = true;
    isImg = true;
    isLink = true;
    handleCheckInputAds();
}

function revealImg(input, img){
    var fileElem = document.getElementById(input.id).nextElementSibling;
    $('#img__ads--cover').attr('src', img);

    $(fileElem).removeClass('hide');
}

// Add & Edit handle
function clickSaveAds(id){
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
            if(item.id === parseInt(id)){
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
function clickDeleteAds(id) {
    dialogModule.renderDialog({
        title: 'Delete Ads',
        children: $('.js__child-dialog-delete-ads'),
        close: false,
        btnTextPrimary: 'Yes, Delete',
        handleClickPrimary: function() {deleteAds(id)}
    });
    resizeDialog('320px');
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
function onClickActivateAds(id) {
    handleStatusAds(id , 1)
}
function onClickDeactivateAds(id) {
    handleStatusAds(id , 0)
}
function changeAdsStatus(e, id) {
    if(e.selectedIndex === 0){
        dialogModule.renderDialog({
            title: 'Activate Ads',
            children: $('.js__child-dialog-activate-ads'),
            close: false,
            btnTextPrimary: 'Yes, Activate',
            handleClickPrimary: function() {onClickActivateAds(id)}
        });
    }else{
        dialogModule.renderDialog({
            title: 'Deactivate Ads',
            children: $('.js__child-dialog-deactivate-ads'),
            close: false,
            btnTextPrimary: 'Yes, Deactivate',
            handleClickPrimary: function() {onClickDeactivateAds(id)}
        });
    }
    resizeDialog('320px');
}
function handleStatusAds(id, val) {
    updateData(id, 'status', val)
}

// resize dialog

function resizeDialog(sizepx){
    $('.d-inline').css('width', sizepx)
}