$(document).ready(function () {
  $('.customScrollBar').scrollbar();

  handleDialogOpen($('.unf-user-dialog--preview-gc'))

  $(window).resize(function () {
    if ($(window).width() < 1200 ) {
      $('.group-chat').addClass('group-chat--mini')
    }else{
      $('.group-chat').removeClass('group-chat--mini')
    }
  })

  $(window).scroll(function () {
    // console.log($(this).scrollTop())

    var scroll = $(this).scrollTop()
    var height = 200

    if(scroll > height){
      $('.navbar').addClass('navbar--fixed')
    }else{
      $('.navbar').removeClass('navbar--fixed')      
    }
  })

  $('.navbar__menu').click(function () {
    $('.group-chat').toggleClass('group-chat--mini')
  });
  
  $('.group-chat__btn--create').click(function () {
    handleDialogOpen($('.unf-user-dialog--create-gc'));
  })

  $('.unf-user-dialog__close--create-gc').click(function () {
    handleDialogClose()
  })
})

