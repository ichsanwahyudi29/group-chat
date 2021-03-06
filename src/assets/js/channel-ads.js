// Data
var isTitle = false;
var isLink = false;
var isImg = false;

var dataAds = [
    {
        id: 1,
        url: 'https://www.tokopedia.com/promokopiluwak',
        status: 1,
        img: './assets/img/gc1.jpg',
        name: 'Promo Kopi Luwak'
    },
    {
        id: 2,
        url: 'https://www.tokopedia.com/detol',
        status: 0,
        img: './assets/img/gc2.jpg',
        name: 'Promo Detol'
    },
    {
        id: 3,
        url: 'https://www.tokopedia.com/',
        status: 0,
        img: './assets/img/bg-header@2x.png',
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
            <div class="table__list">
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
        handleDialogOpen($('.unf-user-dialog--create-ads'));
        $('.unf-user-dialog--create-ads .unf-user-dialog__header').text('Add Ads')
        $('#btn__ads--create').removeAttr('data-id')
      },
    });
});

$(function onScrollTopShadow() {
    $('.customScrollBar--create-ads').on({
      scroll: function() {
        var scroll = $(this).scrollTop();
        var title = $('.unf-user-dialog__header')

        if (scroll > 0) {
         title.addClass('unf-user-dialog__header-shadow');
        } else {
         title.removeClass('unf-user-dialog__header-shadow');
        }
      },
    });
})

$(function handleInputAdsTitle() {
	$('#input__ads--title').on({
	  input: function() {
		counterInput(this, '20');
		if ($(this).val()) {
		  isTitle = true;
		} else {
			isTitle = false;
		}
		handleCheckInputAds();
	  },
	});
});

$(function onChangeAdsImg() {
  $('#upload__ads--cover, #change__ads--cover').on({
    click: function() {
      $('#input__ads--cover').click();
    },
  });
});

$(function onDeleteAdsImg() {
  $('#delete__ads--cover').on({
    click: function() {
      resetInputImageAds()
    },
  });
});

$(function handleInputAdsImg() {
	$('#input__ads--cover').on({
	  change: function() {
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
	  },
	});
  });

$(function handleInputAdsLink() {
	$('#input__ads--link').on({
	  input: function() {
		if ($(this).val()) {
			isLink = true;
		} else {
			isLink = false;
		}
		handleCheckInputAds();
	  },
	});
});

$(function onClickResetValueAds() {
    $('.unf-user-dialog__close--create-ads').on({
      click: function() {
        resetInputValueAds()
      },
    });
});

function resetInputValueAds() {
	// reset input
	$('#input__ads--title').val('');
	$('#input__ads--link').val('');

	// reset img
	resetInputImageAds()
    handleDialogClose();
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
	  $('#btn__ads--create').attr('disabled', false);
	} else {
	  $('#btn__ads--create').attr('disabled', true);
	}
}

// Edit Ads
function clickEditAds(id) {
    handleDialogOpen($('.unf-user-dialog--create-ads'));
    $('#btn__ads--create').attr('data-id', id)
    $('.unf-user-dialog--create-ads .unf-user-dialog__header').text('Edit Ads')
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
$(function clickSaveAds(){
    $('#btn__ads--create').on({
        click: function(){
            var $this = $(this)
            var id = parseInt($this.attr('data-id'))
            if(id === undefined){
                // Add
                var newData = {}
                newData.id = dataAds.length + 1,
                newData.url = $('#input__ads--link').val()
                newData.status = 0
                newData.img = ''
                newData.name = $('#input__ads--title').val()

                dataAds.push(newData)
            }
            else{
                dataAds.map(item => {
                    if(item.id === id){
                        item.name = $('#input__ads--title').val()
                        item.url = $('#input__ads--link').val()
                    }
                })
            }
            initData();
            handleDialogClose();
        }
    })
})

// Delete Ads
function clickDeleteAds(id) {
    handleDialogOpen($('.unf-user-dialog--delete-ads'));
    $('#btn__ads--delete').attr('data-id', id)
}

// Ads Status
$(function onClickActivateAds() {
    $('#btn__ads--activate').on({
      click: function() {
        handleStatusAds(this , 1)
      }
    })
})
$(function onClickDeactivateAds() {
    $('#btn__ads--deactive').on({
      click: function() {
        handleStatusAds(this , 0)
      }
    })
})

function changeAdsStatus(e, id) {
    if(e.selectedIndex === 0){
      handleDialogOpen($('.unf-user-dialog--activate-ads'));
      $('#btn__ads--activate').attr('data-id', id)
    }else{
      handleDialogOpen($('.unf-user-dialog--deactive-ads')); 
      $('#btn__ads--deactive').attr('data-id', id)
    }
}

function handleStatusAds(e, val) {
    var id = $(e).attr('data-id')
  
    updateData(id, 'status', val)
}