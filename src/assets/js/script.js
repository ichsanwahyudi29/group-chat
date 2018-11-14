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

function initCustomSelect() {
  $('select').each(function() {
    var $this = $(this),
      numberOfOptions = $(this).children('option').length;

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
      // if (status === 'channel__status-select') {
        if ($selectedVal !== $this.val()) {
          $this.change();
          return;
        }
      // }

      $styledSelect
        .removeClass('unf-user-select__selected--open')
        .children('span')
        .text($(this).text());
      // $list.hide();
      //console.log($this.val());
    });

    $(document).click(function() {
      $styledSelect.removeClass('unf-user-select__selected--open');
      // $list.hide();
    });
  });
}
