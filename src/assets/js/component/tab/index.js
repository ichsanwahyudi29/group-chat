function optionsTab(e) {
    var _self = $(e)[0];
    var width = _self.offsetWidth;
    var position = _self.offsetLeft;
    var ul = _self.closest('ul');
    var indicatorId = $(ul).find('.tab-options__indicator')[0].id;
    initTabIndicator(indicatorId, width, position);
}

function initTabIndicator(id, w, l) {
    $(`#${id}`).css({
        width: w,
        left: l,
    });
}

// tab use
$('.send-input__tab .tab-options__item-label').on({
    click: function() {
        optionsTab(this);
    },
});