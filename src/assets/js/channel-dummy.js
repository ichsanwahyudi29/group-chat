$(document).ready(function () {
  loopData()
})

function initContainer() {
  $('.channel').remove()
  var channelActive = `
      <div class="card channel channel--active">
        <div class="card__header">
          <div class="card__header-title channel__title">
            Active Channel
          </div>
          <div class="card__header-sorting">
            <h6 class="sorting-title">Sort</h6>
            <div class="sorting-option">
              <select>
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
      </div>
    `

  var channelInactive = `
      <div class="card channel channel--inactive">
        <div class="card__header">
          <div class="card__header-title channel__title">
            Inactive Channel
          </div>
          <div class="card__header-sorting">
            <h6 class="sorting-title">Sort</h6>
            <div class="sorting-option">
              <select>
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
      </div>
    `

  $('.container').append(channelActive)
  $('.container').append(channelInactive)
}

function loopData() {
  initContainer()
  $('.channel .table__list tbody').empty();

  loadJSON('json/channel.json', function(response) {
    var dataChannel = JSON.parse(response);

    for (const data of dataChannel) {
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
              <select class="channel__status-select" onchange="changeStatus(this, ${data.id})">
                <option value="Active" ${data.status === 1 ? 'selected' : ''}>Active</option>
                <option value="Inactive" ${data.status === 2 ? 'selected' : ''}>Inactive</option>
              </select>
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
                  <a class="unf-user-btn unf-user-btn--small group-chat__btn-action group-chat__btn--chat"><span>chat</span></a>
                  <a class="unf-user-btn unf-user-btn--small group-chat__btn-action group-chat__btn--edit"><span>edit</span></a>
                  <a class="unf-user-btn unf-user-btn--small group-chat__btn-action group-chat__btn--preview" onclick="previewChannel(${data.id})"><span>preview</span></a>
                  <a class="unf-user-btn unf-user-btn--small group-chat__btn-action group-chat__btn--archive" onclick="archiveChannel(${data.id})"><span>archive</span></a>
                </div>
              </div>
            </td>
          </tr>
        `
  
      if(!data.archive){
        if (data.status === 1) {
          $('.channel--active .channel__list tbody').append(listChannel)
        } else {
          $('.channel--inactive .channel__list tbody').append(listChannel)
        }
      } 
    }    
  });

  initCustomSelect()
}

function previewChannel(id) {
  handleDialogOpen($('.unf-user-dialog--preview-channel'));
}

function archiveChannel(id) {
  handleDialogOpen($('.unf-user-dialog--archive-channel'));
  $('#btn__channel--archive').attr('data-id', id)
}

function changeStatus(e, id) {
  if(e.selectedIndex === 0){
    handleDialogOpen($('.unf-user-dialog--activate-channel'));
    $('#btn__channel--activate').attr('data-id', id)
  }else{
    handleDialogOpen($('.unf-user-dialog--deactive-channel')); 
    $('#btn__channel--deactive').attr('data-id', id)
  }
}

$(function onClickActivateChannel() {
  $('#btn__channel--activate').on({
    click: function() {
      handleStatusChannel(this , 1)
    }
  })
})

$(function onClickDeactiveChannel(){
  $('#btn__channel--deactive').on({
    click: function() {
      handleStatusChannel(this , 2)
    }
  })
})

$(function onClickArchiveChannel() {
  $('#btn__channel--archive').on({
    click: function() {
      handleArchiveChannel(this, true)
    }
  })
})

function handleStatusChannel(e, val) {
  var id = $(e).attr('data-id')

  updateData(id, 'status', val)
}

function handleArchiveChannel(e, val) {
  var id = $(e).attr('data-id')

  updateData(id, 'archive', val)
}

// CRUD

function pushData(data) {
  dataChannel.push(data)
  handleDialogClose()
  resetInputValueChannel()
  loopData()
}

function updateData(id, state, newValue) {
  for (const data of dataChannel) {
    if(data.id == id){
      data[state] = newValue
      break
    }
  }
  handleDialogClose()
  loopData()
}