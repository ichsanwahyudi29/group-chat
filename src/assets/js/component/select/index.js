function initCustomSelect(element) {
    $('select').each(function () {
        //prevent convert element more than once
        if ($(this).parent().hasClass('unf-user-select')) {
            return;
        }

        var $this = $(this),
            numberOfOptions = $(this).children('option').length;

        if (this.selectedIndex < 0) {
            this.selectedIndex = 0
        }
        var $selectedVal = this.options[this.selectedIndex].innerHTML;

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

        $styledSelect.click(function (e) {
            e.stopPropagation();
            $('div.unf-user-select__selected.unf-user-select__selected--open')
                .not(this)
                .each(function () {
                    $(this).removeClass('unf-user-select__selected--open');
                });
            $(this).toggleClass('unf-user-select__selected--open');
        });

        $listItems.click(function (e) {
            e.stopPropagation();
            $this.val($(this).attr('rel'));

            if ($this.hasClass('unf-user-select__regular')) {
                $this.change();
            }
            else {
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

        $(document).click(function () {
            $styledSelect.removeClass('unf-user-select__selected--open');
        });
    });
}

//custom select for dynamic element
$(function initCustomSelectDynamic() {
    var $selectedValue;
    $(document).on('click', 'div.unf-user-select__selected', function (e) {
        e.stopPropagation();
        $('div.unf-user-select__selected.unf-user-select__selected--open')
            .not(this)
            .each(function () {
                $(this).removeClass('unf-user-select__selected--open');
            });
        $(this).toggleClass('unf-user-select__selected--open');
        $select = $(this).prev('select')
        $selectedValue = $select[0].options[$select[0].selectedIndex].innerHTML
    })

    $(document).on('click', 'ul.unf-user-select__options>li', function (e) {
        e.stopPropagation();
        var $select = $(this).parent().siblings('select')
        $select.val($(this).attr('rel'))
        if ($select.hasClass('unf-user-select__regular')) {
            $select.change();
        }
        else {
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

    $(document).on('click', 'body', function (e) {
        $('div.unf-user-select__selected').removeClass('unf-user-select__selected--open');
    });
})
