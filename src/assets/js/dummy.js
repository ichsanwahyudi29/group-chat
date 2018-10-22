var data = [
  {
    id: 201,
    url: '',
    status: 1,
    img: './assets/img/gc1.jpg',
    title: '2018 FIFA World Cup',
    description: 'Hai para pecinta sepak bola, Ramaikan piala dunia 2018 bersama Tokopedia! Ikuti quiznya dan menangkan Tokocash senilai jutaan rupiah.Buruan, jangan sampai kelewatan!',
    moderator: 'Darius Sinathrya',    
  },
  {
    id: 202,
    url: '',
    status: 1,
    img: './assets/img/gc2.jpg',
    title: 'Pokemon in The 6ix',
    description: 'Hai para pecinta sepak bola, Ramaikan piala dunia 2018 bersama Tokopedia! Ikuti quiznya dan menangkan Tokocash senilai jutaan rupiah.Buruan, jangan sampai kelewatan!',
    moderator: 'Darius Sinathrya',
  },
  {
    id: 203,
    url: '',
    status: 2,
    img: './assets/img/gc1.jpg',
    title: '2018 Asian Games',
    description: 'Hai para pecinta sepak bola, Ramaikan piala dunia 2018 bersama Tokopedia! Ikuti quiznya dan menangkan Tokocash senilai jutaan rupiah.Buruan, jangan sampai kelewatan!',
    moderator: 'Ichsan Indra Wahyudi',
  }
]

$(document).ready(function () {
    var channelActive = `
      <div class="content channel channel--active">
              <div class="channel__header">
                <div class="channel__header-title">
                  Active Channel
                </div>
                <div class="channel__header-sorting">
                  <h6 class="sorting-title">Sort</h6>
                  <div class="sorting-option">
                    <select>
                      <option value="created">Created date</option>
                      <option value="updated">Updated date</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="channel__list">
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
      <div class="content channel channel--inactive">
              <div class="channel__header">
                <div class="channel__header-title">
                  Inactive Channel
                </div>
                <div class="channel__header-sorting">
                  <h6 class="sorting-title">Sort</h6>
                  <div class="sorting-option">
                    <select>
                      <option value="created">Created date</option>
                      <option value="updated">Updated date</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="channel__list">
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
    loopData()
})

function loopData() {
  for (const key in data) {
    var listChannel = `
        <tr>
          <td class="channel__list-num">
            <h6 class="list-num__id">ID ${data[key].id}</h6>
            <span class="list-num__url">(URL budCuv)</span>
          </td>
          <td class="channel__list-gc">
            <div class="list-gc">
              <img class="list-gc__photo" src="${data[key].img}" alt="">
              <div class="list-gc__text">
                <h3 class="list-gc__text-title">${data[key].title}</h3>
                <p class="list-gc__text-desc">${data[key].description}</p>
                <p class="list-gc__text-moderator">Moderator: <span>${data[key].moderator}</span></p>
              </div>
            </div>
          </td>
          <td class="channel__list-status">
            <select class="channel__status-select" onchange="changeStatus(this)">
              <option value="Active" ${data[key].status === 1 ? 'selected' : ''}>Active</option>
              <option value="Inactive" ${data[key].status === 2 ? 'selected' : ''}>Inactive</option>
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
                <a class="unf-user-btn unf-user-btn--small group-chat__btn-action group-chat__btn--preview" onclick="preview(${data[key].id})"><span>preview</span></a>
                <a class="unf-user-btn unf-user-btn--small group-chat__btn-action group-chat__btn--archive" onclick="archive(${data[key].id})"><span>archive</span></a>
              </div>
            </div>
          </td>
        </tr>
      `

    if (data[key].status === 1) {
      $('.channel--active .channel__list tbody').append(listChannel)
    } else {
      $('.channel--inactive .channel__list tbody').append(listChannel)
    }
  }
}

function preview(id) {
  handleDialogOpen($('.unf-user-dialog--preview-gc'));
}

function archive(id) {
  handleDialogOpen($('.unf-user-dialog--archive-gc'));
}

function changeStatus(e) {
  console.log(e.selectedIndex)
  if(e.selectedIndex === 0){
    handleDialogOpen($('.unf-user-dialog--activate-gc'));
  }else{
    handleDialogOpen($('.unf-user-dialog--deactive-gc'));
  }
  
}