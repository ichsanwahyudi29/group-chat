$(document).ready(function() {
  handleDialogOpen($('.dialog-banned-user'));
});

$(function onInputSearchBannedUser() {
  $('#input__banned-user').on({
    keypress: function(e) {
      if (e.which === 13) {
        $('#btn__banned-user--search').click();
      }
    },
  });
});

$(function SearchBannedUser() {
  $('#btn__banned-user--search').on({
    click: function() {
      var val = $('#input__banned-user').val();
      $('.empty-input').text(`No results for “${val}”`)
      $('.dialog-banned-user__search').addClass('dialog-banned-user__search--empty');
    },
  });
});

// $(function handleCloseAddQuickReply() {
//   $('.unf-user-dialog__close--add-pin').on({
//     click: function () {
//       handleDialogClose();
//     },
//   });
// });

// $(function onClickAddQuickReply() {
//   $('#btn__quick-reply--add').on({
//     click: function () {
//       handleDialogOpen($('.unf-user-dialog--add-quick-reply'));
//     },
//   });
// });

// $(function onClickEditQuickReply() {
//   $('#btn__quick-reply--edit').on({
//     click: function () {
//       console.log('edit');
//     },
//   });
// });

// $(function onClickDeleteQuickReply() {
//   $('#btn__quick-reply--delete').on({
//     click: function (e) {
//       console.log('delete');
//     },
//   });
// });

// function deleteQuickReply(e) {
//   handleDialogOpen($('.unf-user-dialog--delete-quick-reply'));
// }
