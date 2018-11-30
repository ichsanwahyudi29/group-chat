$(document).ready(function() {
  // handleDialogOpen($('.dialog-banned-user'));
  loopDataBannedUser();
});

var banUserContent, searchVal;
var isSearchUser = false;

var dataBannedUser = [
  {
    id: 5512939,
    participantId: 123321,
    name: 'Ichsan Tokped',
    status: 0,
  },
  {
    id: 6512939,
    participantId: 223321,
    name: 'Shinta Tokped',
    status: 0,
  },
  {
    id: 7512939,
    participantId: 323321,
    name: 'Leo Tokped',
    status: 0,
  },
  {
    id: 8512939,
    participantId: 423321,
    name: 'Farrah Tokped',
    status: 1,
  },
  {
    id: 9512939,
    participantId: 523321,
    name: 'Zahrah Tokped',
    status: 1,
  },
  {
    id: 4512523,
    participantId: 623321,
    name: 'Adek Tokped',
    status: 0,
  },
  {
    id: 4512928,
    participantId: 623321,
    name: 'rachel Tokped',
    status: 0,
  },
  {
    id: 4509721,
    participantId: 623321,
    name: 'Eraz Tokped',
    status: 0,
  },
];

function loopDataBannedUser() {
  $('.banned-user .table__list tbody').empty();
  for (const data of dataBannedUser) {
    var listBannedUser = `
      <tr>
        <td class="table__list-num">
          <h6 class="list-num__id">${data.id}</h6>
          <span class="list-num__url">(Participant ID ${
            data.participantId
          })</span>
        </td>
        <td class="table__list-content">
          <h6 class="list-content__text-msg list-content__text-msg--name">${
            data.name
          }</h6>
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
}

$(function handleSearchBanUser() {
  $('#btn__banned-user--add').on({
    click: function() {
      banUserContent = $('.js__child-dialog-ban-user').html()
      dialogModule.renderDialog({
        title: 'Ban User',
        children: $('.js__child-dialog-ban-user'),
        close: true,
        styleClass: 'dialog--414 pb-0 dialog-banned-user',
        actionButton: false,
        handleClickSecondary: handleCloseBanUser
      });
      $('.js__child-dialog-ban-user').html('')
    },
  });
});

$(function onInputSearchBannedUser() {
  $(document).on('keypress', '#input__banned-user', function(e){
    if (e.which === 13) {
      $('#btn__banned-user--search').click();
    }
  })
});

$(function SearchBannedUser() {
  $(document).on('click','#btn__banned-user--search', function(){
    searchVal = $('#input__banned-user').val();
    renderSearchResult(searchVal)
  })
});

function renderSearchResult(val){
  if(val === undefined){
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
            <img class="result__img" src="./assets/img/gc1.jpg" alt="" srcset="">
            <span class="result__name">${resultName}</span>
          </div>
          ${
            data.status === 0
              ? `<button class="unf-user-btn unf-user-btn--medium unf-user-btn--primary" onclick="handleStatusBan(${data.id})">Ban</button>`
              : `<button class="unf-user-btn unf-user-btn--medium unf-user-btn--secondary" onclick="handleStatusBan(${data.id})">Unban</button>`
          }
          
        </div>
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

function handleStatusBan(id){
  dataBannedUser.map(item => {
    if(item.id === id){
      if(item.status === 1){
        item.status = 0
      }
      else{
        item.status = 1
      }
    }
  })
  loopDataBannedUser()
  renderSearchResult(searchVal)
}

function handleCloseBanUser(){
  //put back html 
  $('.js__child-dialog-ban-user').html(banUserContent)
  handleDialogClose()
}

function initialSearchBanUser(){
  isSearchUser = false;
}