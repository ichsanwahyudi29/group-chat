var contentCreateChannel;
var isCover = false;
var isName = false;
var isDesc = false;
var isModeratorEmail = false;
var isModeratorName = false;
const pageLimit = 2;

var email = $('#input__channel--moderator-email');
var inputEmail = $('.unf-user-input--moderator-email');
var dataChannel = [
  {
    "id": 201,
    "url": "http://tokopedia.com",
    "status": 1,
    "archive": false,
    "img": "./assets/img/gc1.jpg",
    "name": "2018 FIFA World Cup",
    "description": "Hai para pecinta sepak bola, Ramaikan piala dunia 2018 bersama Tokopedia! Ikuti quiznya dan menangkan Tokocash senilai jutaan rupiah.Buruan, jangan sampai kelewatan!",
    "moderator": "Darius Sinathrya"
  },
  {
    "id": 202,
    "url": "http://tokopedia.com",
    "status": 1,
    "archive": false,
    "img": "./assets/img/gc2.jpg",
    "name": "Pokemon in The 6ix",
    "description": "Hai para pecinta sepak bola, Ramaikan piala dunia 2018 bersama Tokopedia! Ikuti quiznya dan menangkan Tokocash senilai jutaan rupiah.Buruan, jangan sampai kelewatan!",
    "moderator": "Darius Sinathrya"
  },
  {
    "id": 203,
    "url": "http://tokopedia.com",
    "status": 2,
    "archive": false,
    "img": "./assets/img/gc2.jpg",
    "name": "Inactive Channel Example",
    "description": "Hai para pecinta sepak bola, Ramaikan piala dunia 2018 bersama Tokopedia! Ikuti quiznya dan menangkan Tokocash senilai jutaan rupiah.Buruan, jangan sampai kelewatan!",
    "moderator": "Darius Sinathrya"
  }
]

$(document).ready(function () {
  loopData()
})

function initContainer(){
  $('.channel').remove()
  var activeCount = dataChannel.filter(item => item.status === 1)
  var inactiveCount = dataChannel.filter(item => item.status === 2 && item.archive === false)
  var channelActive = '';
  var channelInactive = '';
  if(activeCount.length > 0){
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
            <tbody>
            </tbody>
          </table>
        </div>
        <div class="pagination-container">
          <div class="pagination-items">
            <div class="page-nav page-nav__prev page-nav__prev--disabled" data-nav="prev"></div>
            <div class="page-item active-page" data-page="1">1</div>
            <div class="page-item" data-page="2">2</div>
            <div class="page-item" data-page="3">3</div>
            <div class="page-nav page-nav__next" data-nav="next"></div>
            <span class="page-indicator"></span>
          </div>
        </div>
      </div>`
  }
  if(inactiveCount.length > 0) {
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
            <tbody>
            </tbody>
          </table>
        </div>
        <div class="pagination-container">
          <div class="pagination-items">
            <div class="page-nav page-nav__prev page-nav__prev--disabled" data-nav="prev"></div>
            <div class="page-item active-page" data-page="1">1</div>
            <div class="page-item" data-page="2">2</div>
            <div class="page-item" data-page="3">3</div>
            <div class="page-nav page-nav__next" data-nav="next"></div>
            <span class="page-indicator"></span>
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

function handleRenderChannel(data){
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
            `<input checked type="checkbox" class="unf-user-toggle__checkbox" id="testcheck-${data.id}" onclick="handleChangeChannelStatus(this, ${data.id})">` :
            `<input type="checkbox" class="unf-user-toggle__checkbox" id="testcheck-${data.id}" onclick="handleChangeChannelStatus(this, ${data.id})">`}
            <label for="testcheck-${data.id}"></label>
          </div>
          <label class="status-toggle-label status-toggle-label__right">
            ${data.status === 1 ? `Active` : `Inactive`}
          </label>
        </div>
      </td>
      <td class="channel__list-action">
        <div class="list-action">
          <div class="list-action__set">
            <a class="set-btn set-btn__ads">Set Ads</a>
            <a class="set-btn set-btn__official">Set Official</a>
            <a class="set-btn set-btn__flashsale">Set Flashsale</a>
            <a class="set-btn set-btn__rewards">Set Rewards</a>
            <a class="set-btn set-btn__polling">Set Polling</a>
            <a class="set-btn set-btn__room">Set Room</a>
          </div>
          <div class="list-action__btn">
            <a class="unf-user-btn unf-user-btn--small group-chat__btn-action group-chat__btn--chat" href="./channel-detail.html"><span>chat</span></a>
            <a class="unf-user-btn unf-user-btn--small group-chat__btn-action group-chat__btn--edit"><span>edit</span></a>
            <a class="unf-user-btn unf-user-btn--small group-chat__btn-action group-chat__btn--preview" onclick="previewChannel(${data.id})"><span>preview</span></a>
            <a class="unf-user-btn unf-user-btn--small group-chat__btn-action group-chat__btn--archive" onclick="handleChangeChannelArchive(${data.id})"><span>archive</span></a>
          </div>
        </div>
      </td>
    </tr>`
  return listChannel
}

$(function handleClickPage(){
  $(document).on('click', '.pagination-items span', function(){

  })
})

function previewChannel(id) {
  handleDialogOpen($('.unf-user-dialog--preview-channel'));
}

// CRUD
function pushData(data) {
  dataChannel.push(data)
  loopData()
}

//Create Channel Group Chat
$(function handleClickCreateChannel() {
  $('.group-chat__btn--create').on({
    click: function() {
      contentCreateChannel = $('.js__child-dialog-create-channel').html()
      dialogModule.renderDialog({
        title: 'Create Group Chat',
        children: $('.js__child-dialog-create-channel'),
        close: true,
        init: resetInputValueChannel,
        styleClass: 'dialog--520 create-channel',
        btnTextPrimary: 'Save',
        btnPrimaryDisabled: true,
        handleClickPrimary: handleCreateChannel,
        handleClickSecondary:  handleCloseCreateChannel
      });
    $('.js__child-dialog-create-channel').html('')
    },
  });
});

function handleCloseCreateChannel(){
  //put back html
  $('.js__child-dialog-create-channel').html(contentCreateChannel)
  customCreateDialog('remove')
  handleDialogClose()
}

function customCreateDialog(state){
  if(state === 'add'){
    $('.js__template-dialog').find('.unf-user-dialog__body').addClass('customScrollBar customScrollBar--y customScrollBar--create-channel')
    $('.customScrollBar').scrollbar();

    $('.customScrollBar--create-channel').on({
      scroll: function() {
        var scroll = $(this).scrollTop();
        var title = $('.unf-user-dialog__title')

        if (scroll > 0) {
          title.addClass('unf-user-dialog__header-shadow');
        } else {
          title.removeClass('unf-user-dialog__header-shadow');
        }
      },
    });
  }
  else{
    $('.js__template-dialog').find('.unf-user-dialog__body').removeClass('customScrollBar customScrollBar--y customScrollBar--create-channel')
  }
}

$(function onChangeChannelImg() {
  $(document).on('click', '#upload__channel--cover, #change__channel--cover', function(){
    $('#input__channel--cover').click();
  })
});

$(function onDeleteChannelImg() {
  $(document).on('click', '#delete__channel--cover', function(){
    resetInputImageChannel()
    handleCheckInputChannel()
  })
});

$(function handleInputChannelImg() {
  $(document).on('change', '#input__channel--cover', function(){
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
    handleCheckInputChannel();
  })
});

//cropper
function readURLCrop(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {
      $("#image-editor-canvas").attr("src", e.target.result);
      editPictureDialog();
      cropImg(2,1);
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
  let imgsrc = cropper.getCroppedCanvas({width: 600, height: 300}).toDataURL("image/jpeg");
  
  $(".js__dialog-image-editor").removeClass("unf-user-dialog--show");
  $(".js__template-dialog").addClass("unf-user-dialog--show");
  handleShowCroppedImg("#img__channel--cover" ,imgsrc)
  handleResetEditDialog()

  isCover = true;
  cropper.destroy();
  handleCheckInputChannel()
});

//

$(function handleInputChannelName() {
  $(document).on('input', '#input__channel--name', function(){
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
  $(document).on('input', '#input__channel--desc', function(){
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
  $(document).on('input', '#input__channel--moderator-email', function(){
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
  }).on('focus', '#input__channel--moderator-email', function(){
    handleInputError(
      inputEmail,
      'Please enter your email accounts in Tokopedia',
      true
    );
  }).on('keypress', '#input__channel--moderator-email', function(){
    if (event.charCode == 13) {
      $('#btn__channel--moderator-email').click();
    }
  })
});

$(function checkModeratorEmail() {
  $(document).on('click', '#btn__channel--moderator-email', function(){
    loadingCheckEmail(true);
    var email = $('#input__channel--moderator-email');
    var inputEmail = $('.unf-user-input--moderator-email');
    if (email.val() !== 'i') {
      setTimeout(() => {
        loadingCheckEmail(false);
      }, 500);
      handleInputError(inputEmail, helper.email.error[1], false);
      $('.create-channel__moderator').removeClass('create-channel__moderator--show');
      return false;
    }

    setTimeout(() => {
      loadingCheckEmail(false);
      $('.unf-user-input__icon').addClass('icon-check');
    }, 500);

    isModeratorEmail = true;
    isModeratorName = true;
    handleCheckInputChannel();

    $('.customScrollBar--create-channel .unf-user-dialog__body').animate({ scrollTop: 520 }, 1200);
    $('.create-channel__moderator').addClass('create-channel__moderator--show');
  })
});

$(function handleInputModeratorName() {
  $(document).on('input', '#input__channel--moderator-name', function(){
    if ($(this).val()) {
      isModeratorName = true
    } else {
      isModeratorName = false
    }
    handleCheckInputChannel()
  })
})

function handleCreateChannel() {
  const id = dataChannel[dataChannel.length - 1].id + 1
  const name = $('#input__channel--name').val()
  const description = $('#input__channel--desc').val()
  const moderator = $('#input__channel--moderator-name').val()
  const img = $('#img__channel--cover').prop('src')
  const url = $('#input__channel--moderator-url').val()

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

  pushData(newChannel)
  handleCloseCreateChannel()
}

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

  //custom dialog
  customCreateDialog('add')
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

// Channel Status
function handleChangeChannelStatus(e, id) {
  if($(e).prop('checked')){
      dialogModule.renderDialog({
          title: 'Activate Group Chat',
          children: $('.js__child-dialog-activate-channel'),
          close: false,
          styleClass: 'dialog--320',
          btnTextPrimary: 'Yes, Activate',
          handleClickPrimary: ()=>{handleActivateChannel(id)},
          handleClickSecondary: ()=>{handleCancelStatusChannel(e)}
      });
  }else{
      dialogModule.renderDialog({
          title: 'Deactivate Group Chat',
          children: $('.js__child-dialog-deactive-channel'),
          close: false,
          styleClass: 'dialog--320',
          btnTextPrimary: 'Yes, Deactivate',
          handleClickPrimary: ()=>{handleDeactivateChannel(id)},
          handleClickSecondary: ()=>{handleCancelStatusChannel(e)}
      });
  }
}
function handleActivateChannel(id) {
  handleStatusChannel(id , 1)
}
function handleDeactivateChannel(id) {
  handleStatusChannel(id , 2)
}
function handleStatusChannel(id, val) {
  for (const data of dataChannel) {
      if(data.id == id){
          data.status = val
          break
      }
  }
  handleDialogClose();
  loopData()
}
function handleCancelStatusChannel(e){
  $(e).prop('checked', !e.checked)
  handleDialogClose()
}

// Channel Archive
function handleChangeChannelArchive(id) {
  dialogModule.renderDialog({
      title: 'Archive Group Chat',
      children: $('.js__child-dialog-archive-channel'),
      close: false,
      styleClass: 'dialog--320',
      btnTextPrimary: 'Yes, Archive',
      handleClickPrimary: function() {handleArchiveChannel(id)}
  });
}

function handleArchiveChannel(id) {
  for (const data of dataChannel) {
      if(data.id == id){
          data.archive = true
          break
      }
  }
  handleDialogClose();
  loopData()
}