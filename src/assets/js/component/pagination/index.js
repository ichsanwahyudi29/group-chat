function renderPagination(dataLength, limit, page) {
    var pageCount = Math.ceil(dataLength / limit)
    var pagination = ''
    if(pageCount > 1){
        page = (page !== undefined) ? page : 1
        pagination += '<div class="pagination-items">'
        if (page > 1) {
            pagination += `<div class="page-nav page-nav__prev" data-page="${page - 1}" data-nav="prev"></div>`
        }
        else {
            pagination += `<div class="page-nav page-nav__prev page-nav__prev--disabled" data-nav="prev"></div>`
        }

        for (var i = 1; i < pageCount + 1; i++) {
            if (page === i) {
                pagination += `<div class="page-item active-page" data-page="${i}">${i}</div>`
            } else {
                pagination += `<div class="page-item" data-page="${i}">${i}</div>`
            }
        }

        if (page < pageCount) {
            pagination += `<div class="page-nav page-nav__next" data-page="${page + 1}" data-nav="next"></div>`
        }
        else {
            pagination += `<div class="page-nav page-nav__next page-nav page-nav__next--disabled" data-nav="next"></div>`
        }

        pagination += '<span class="page-indicator"></span></div>'
    }
    else{
        pagination += '<div class="pagination-items hide"></div>'
    }

    return pagination
}

$(function handlePagination() {
    $(document).on('click', '.pagination-items .page-item', function () {
        var $this = $(this)
        if (!$this.hasClass('active-page')) {
            $this.siblings().removeClass('active-page').end()
                .addClass('active-page')

            handleCheckArrow($this.parent(), $this.data('page'))
            handlePaginationIndicator($this.siblings('.page-indicator'), $this[0].offsetWidth, $this[0].offsetLeft)
        }
    })
})

$(function handlePaginationArrow() {
    $(document).on('click', '.pagination-items .page-nav', function () {
        var $this = $(this)
        if (!$(this).hasClass('page-nav__next--disabled') && !$(this).hasClass('page-nav__prev--disabled')) {
            var nav = $this.data('nav')
            var active = $this.siblings('.active-page')
            $this.siblings('.active-page').removeClass('active-page')
            if (nav === 'next') {
                active.next().addClass('active-page')
            }
            else {
                active.prev().addClass('active-page')
            }
        }

        handleCheckArrow($this.parent(), $this.siblings('.active-page').data('page'))
        handlePaginationIndicator($this.siblings('.page-indicator'), $this.siblings('.active-page')[0].offsetWidth, $this.siblings('.active-page')[0].offsetLeft)
    })
})

function handleCheckArrow(parent, page) {
    var arrowNext = parent.find('.page-nav__next')
    var arrowPrev = parent.find('.page-nav__prev')
    if (page > 1) {
        arrowPrev.removeClass('page-nav__prev--disabled')
    }
    else {
        arrowPrev.addClass('page-nav__prev--disabled')
    }

    if (page < parent.find('.page-item').length) {
        arrowNext.removeClass('page-nav__next--disabled')
    }
    else {
        arrowNext.addClass('page-nav__next--disabled')
    }
}

function handlePaginationIndicator(el, w, l) {
    el.css({
        width: w,
        left: l,
    });
}