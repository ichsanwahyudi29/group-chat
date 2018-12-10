$(document).ready(function() {
  $('.customScrollBar').scrollbar();
});

function readURL(input) {
  var fileElem = document.getElementById(input.id).nextElementSibling;
  var previewImg = fileElem.children[0];
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {
      previewImg.src = e.target.result;
    };
    $(fileElem).removeClass('hide');

    reader.readAsDataURL(input.files[0]);
  }
}

function counterInput(el, maxLength) {
  var _self = $(el);
  var length = _self.val().length;
  var counter = _self.next().find('.unf-user-input__info-counter');
  counter.html(`${length}/${maxLength}`);
}

function initCustomSelect(element) {
  $('select').each(function() {
    //prevent convert element more than once
    if($(this).parent().hasClass('unf-user-select')){
      return;
    }
    var $this = $(this),
      numberOfOptions = $(this).children('option').length;

    if(this.selectedIndex < 0){
    this.selectedIndex = 0
    }
    var $selectedVal = this.options[this.selectedIndex].innerHTML;
    
    var status = this.className;

    $this.wrap('<div class="unf-user-select"></div>');
    $this.after(
      `<div class="unf-user-select__selected ${
        this.className
      }"><div class="unf-user-select__selected-arrow"></div><span></span></div>`
    );
    var $styledSelect = $this.next('div.unf-user-select__selected');
    $styledSelect.children('span').text($selectedVal);

    var $list = $('<ul />', {
      class: 'unf-user-select__options',
    }).insertAfter($styledSelect);

    for (var i = 0; i < numberOfOptions; i++) {
      $('<li />', {
        text: $this
          .children('option')
          .eq(i)
          .text(),
        rel: $this
          .children('option')
          .eq(i)
          .val(),
      }).appendTo($list);
    }

    var $listItems = $list.children('li');

    $styledSelect.click(function(e) {
      e.stopPropagation();
      $('div.unf-user-select__selected.unf-user-select__selected--open')
        .not(this)
        .each(function() {
          $(this).removeClass('unf-user-select__selected--open');
        });
      $(this).toggleClass('unf-user-select__selected--open');
    });

    $listItems.click(function(e) {
      e.stopPropagation();
      $this.val($(this).attr('rel'));

      if($this.hasClass('unf-user-select__regular')){
        $this.change();
      }
      else{
        if ($selectedVal !== $this.val()) {
          $this.change();
          return
        }
      }

      $styledSelect
        .removeClass('unf-user-select__selected--open')
        .children('span')
        .text($(this).text());
    });

    $(document).click(function() {
      $styledSelect.removeClass('unf-user-select__selected--open');
    });
  });
}

//custom select for dynamic element
$(function initCustomSelectDynamic(){
  var $selectedValue;
  $(document).on('click', 'div.unf-user-select__selected', function(e){
    e.stopPropagation();
    $('div.unf-user-select__selected.unf-user-select__selected--open')
      .not(this)
      .each(function() {
        $(this).removeClass('unf-user-select__selected--open');
      });
    $(this).toggleClass('unf-user-select__selected--open');
    $select = $(this).prev('select')
    $selectedValue = $select[0].options[$select[0].selectedIndex].innerHTML
  })
  
  $(document).on('click', 'ul.unf-user-select__options>li', function(e) {
    e.stopPropagation();
    var $select = $(this).parent().siblings('select')
    $select.val($(this).attr('rel'))
    if($select.hasClass('unf-user-select__regular')){
      $select.change();
    }
    else{
      if ($selectedValue !== $select.val()) {
        $select.change();
        return
      }
    }
    $select.next('div.unf-user-select__selected')
      .removeClass('unf-user-select__selected--open')
      .children('span')
      .text($(this).text());
  });
  
  $(document).on('click', 'body', function(e){
    $('div.unf-user-select__selected').removeClass('unf-user-select__selected--open');
  });
})

function loadJSON(fileJSON, callback) {   
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', fileJSON, true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);  
}

function validateURL(val) {
  var regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g;

  if (!regex.test(val)) {
    return false;
  }

  return true;
}
function getChatTime(){
  var date = new Date
  var jam = date.getHours()
  var menit = date.getMinutes()
  var result = ("0" + jam).slice(-2)+"."+("0" + menit).slice(-2)
  return result
}

//cropper
let cropper = "";
function cropImg(wRatio, hRatio) {
  const image = document.getElementById("image-editor-canvas");
  cropper = new Cropper(image, {
    aspectRatio: wRatio / hRatio,
    viewMode: 1,
    background: false,
    movable: false,
    zoomOnWheel: false,
    guides: false
  });
}
function editPictureDialog() {
  handleDialogOpen(".js__dialog-image-editor");
  $(".js__template-dialog").removeClass("unf-user-dialog--show");
}
function handleResetEditDialog(){
  $("#image-editor-canvas").attr("src", '');
  $(".edit-image-dialog__slider").val(0);
}
function handleShowCroppedImg(destElement, img){
  $(destElement).parent().removeClass("hide");
  $(destElement).attr("src", img);
}
$(function handleSliderImageEditor(){
  $(".edit-image-dialog__slider").on("input", function () {
    let sliderVal = $(".edit-image-dialog__slider").val();
    cropper.scale(sliderVal);
  });
})

//pagination
function renderPagination(dataLength, limit, page){
  var pageCount = Math.ceil(dataLength/limit)
  var pagination = ''
  page = (page !== undefined) ? page : 1
  if(page > 1){
    pagination += `<div class="page-nav page-nav__left" data-page="${page-1}"></div>`
  }
  else{
    pagination += `<div class="page-nav page-nav__left page-nav page-nav__left--disabled"></div>`
  }
  for(var i =1;i < pageCount+1;i++){
    if(page === i){
      pagination += `<div data-page="${i}" class="page__active">${i}</div>`
    }else{      
      pagination += `<div data-page="${i}">${i}</div>`
    }
  }
  if(page < pageCount){
    pagination += `<div class="page-nav page-nav__right" data-page="${page+1}"></div>`
  }
  else{
    pagination += `<div class="page-nav page-nav__right page-nav page-nav__right--disabled"></div>`
  }

  pagination += '<span class="page-indicator"></span>'
  
  return pagination
}

$(function handlePagination(){
  $(document).on('click', '.pagination-items .page-item',function(){
    var $this = $(this)
    if(!$this.hasClass('active-page')){
      $this.siblings().removeClass('active-page').end()
            .addClass('active-page')
            
      handleCheckArrow($this.parent(), $this.data('page'))
      handlePaginationIndicator($this.siblings('.page-indicator'), $this[0].offsetWidth, $this[0].offsetLeft)
    }
  })
})
$(function handlePaginationArrow(){
  $(document).on('click', '.pagination-items .page-nav',function(){
    var $this = $(this)
    if(!$(this).hasClass('page-nav__next--disabled') && !$(this).hasClass('page-nav__prev--disabled')){
      var nav = $this.data('nav')
      var active = $this.siblings('.active-page')
      $this.siblings('.active-page').removeClass('active-page')
      if(nav === 'next'){
        active.next().addClass('active-page')
      }
      else{
        active.prev().addClass('active-page')
      }
    }

    handleCheckArrow($this.parent(), $this.siblings('.active-page').data('page'))
    handlePaginationIndicator($this.siblings('.page-indicator'), $this.siblings('.active-page')[0].offsetWidth, $this.siblings('.active-page')[0].offsetLeft)
  })
})
function handleCheckArrow(parent, page){
  var arrowNext = parent.find('.page-nav__next')
  var arrowPrev = parent.find('.page-nav__prev')
  if(page > 1){
    arrowPrev.removeClass('page-nav__prev--disabled')
  }
  else{
    arrowPrev.addClass('page-nav__prev--disabled')
  }

  if(page < parent.find('.page-item').length){
    arrowNext.removeClass('page-nav__next--disabled')
  }
  else{
    arrowNext.addClass('page-nav__next--disabled')
  }
}

function handlePaginationIndicator(el, w, l) {
  el.css({
    width: w,
    left: l,
  });
}