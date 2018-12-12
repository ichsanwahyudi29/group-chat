function counterInput(el, maxLength) {
    var _self = $(el);
    var length = _self.val().length;
    var counter = _self.next().find('.unf-user-input__info-counter');
    counter.html(`${length}/${maxLength}`);
}