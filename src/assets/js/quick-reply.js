$(document).ready(function() {
  // handleDialogOpen($('.dialog-quick-reply'));
  loopDataQuickReply();
});

var dataQuickReply = [
  {
    id: 200,
    message: 'Halo',
    status: 0,
  },
  {
    id: 201,
    message: 'Sundul Gan',
    status: 1,
  },
];

function loopDataQuickReply() {
  $('.quick-reply .table__list tbody').empty();
  for (const data of dataQuickReply) {
    var listQuickReply = `
      <tr>
        <td class="table__list-num">
          <h6 class="list-num__id">${data.id}</h6>
        </td>
        <td class="table__list-content">
          <p class="list-content__text-msg">${data.message}</p>
        </td>
        <td class="table__list-action">
          <div class="list-action">
            <div class="list-action__set">
              <select class="table__list-status">
                <option value="">Active</option>
                <option value="">Inactive</option>
              </select>
            </div>
            <div class="list-action__btn">
              <a class="unf-user-btn unf-user-btn--small group-chat__btn-action group-chat__btn--edit" onclick="editQuickReply(${data.id})"><span>edit</span></a>
              <a class="unf-user-btn unf-user-btn--small group-chat__btn-action group-chat__btn--delete" onclick="deleteQuickReply(${data.id})"><span>delete</span></a>
            </div>
          </div>
        </td>
      </tr>
    `;

    $('.quick-reply .table__list tbody').append(listQuickReply);
  }

  initCustomSelect()
}

$(function handleCloseAddQuickReply() {
  $('.dialog-quick-reply__close').on({
    click: function() {
      handleDialogClose();
      resetValueQuickReply();
    },
  });
});

$(function onClickAddQuickReply() {
  $('#btn__quick-reply--add').on({
    click: function() {
      handleDialogOpen($('.dialog-quick-reply'));
      $('.dialog-quick-reply .unf-user-dialog__header').text('Add Quick Reply')
    },
  });
});

$(function onClickEditQuickReply() {
  $('#btn__quick-reply--edit').on({
    click: function() {
      console.log('edit');
    },
  });
});

$(function onInputQuickReply() {
  $('#input__quick-reply').on({
    input: function() {
      var val = $('#input__quick-reply').val();
      if (val) {
        $('#btn__quick-reply--save').attr('disabled', false);
      } else {
        $('#btn__quick-reply--save').attr('disabled', true);
      }
    },
    keypress: function (e) {
      if (e.which === 13) {
        handleEditQuickReply()
      }
    },
  });
});

function handleDeleteQuickReply(id) {
  // dataQuickReply.splice()
}

function resetValueQuickReply() {
  $('#input__quick-reply').val('');
  $('#btn__quick-reply--save').attr('disabled', true);
}

function editQuickReply(id) {
  handleDialogOpen($('.dialog-quick-reply'));
  $('.dialog-quick-reply .unf-user-dialog__header').text('Edit Quick Reply')
  for (const data of dataQuickReply) {
    if(data.id === id){
      $('#input__quick-reply').val(data.message)
      $('#btn__quick-reply--save').attr('disabled', false);
      $('#btn__quick-reply--save').attr('onclick', `handleEditQuickReply(${id})`);
    }
  }
}

function handleEditQuickReply(id) {
  var val = $('#input__quick-reply').val()
  updateDataQuickReply(id, 'message', val)
}

function updateDataQuickReply(id, state, newValue) {
  for (const data of dataQuickReply) {
    if (data.id == id) {
      data[state] = newValue
      break
    }
  }
  handleDialogClose()
  loopDataQuickReply()
}

function deleteQuickReply(id) {
  handleDialogOpen($('.confirmation-dialog'));
  handleConfirmationDialog('delete', 'quick reply', `handleDeleteQuickReply(${id})`)
}

function handleConfirmationDialog(modul, type, func) {
  $('.confirmation-dialog .unf-user-dialog__title').text(`${modul} ${type}`);
  $('.confirmation-dialog .unf-user-dialog__description').text(`Do you want to ${modul} the ${type}?`);
  $('.confirmation-dialog .unf-user-btn--primary').text(`Yes, ${modul}`);
  $('.confirmation-dialog .unf-user-btn--primary').attr('onclick', func);
}
