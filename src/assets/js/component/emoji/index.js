$(document).ready(function(){
    // 1 - 80 emoji
    for(var i = 0; i < 80; i++){
        var iString = i.toString(16)
        if(iString.length < 2){
            iString = '0'+iString
        }
        else{
            iString = iString
        }
        var emoji = `
        <a class="emoji-outer">
            <span class="emoji-icon">&#x1F6${iString}</span>
        </a>`;
        $('.unf-user-input__emoji-content').append(emoji);
    }

    $(function handleEmoji() {
        $(document).click(function(e){
            var container = $('.unf-user-input__icon-emoji')
            if(!container.is(e.target) && container.has(e.target).length === 0 && container.hasClass('unf-user-input__icon-emoji--show')){
                container.removeClass('unf-user-input__icon-emoji--show')
            }
        })
        $(document).on('click', '.unf-user-input__icon-emoji', function(){
            $(this).toggleClass('unf-user-input__icon-emoji--show');
        })
        $(document).on('click', '.emoji-outer', function(e){
            var $thisEmoji = $(this).children().html()
            var $targetInput = $(this).parents('.unf-user-input__icon-emoji').prev('input');
            $targetInput[0].value += $thisEmoji
            $targetInput.focus()
        })
    })
})
