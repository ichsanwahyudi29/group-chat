$(document).ready(function () {
    windowSizeCheck()
    $('.customScrollBar').scrollbar();
})

// Sidebar
function windowSizeCheck() {
    var width = 1200;
    if ($(window).width() < width) {
        $('.group-chat').addClass('group-chat--mini');
    } else {
        $('.group-chat').removeClass('group-chat--mini');
    }
}
$(document).ready(function () {
    $('.navbar__menu').on({
        click: function (e) {
            var _self = $(this);
            $('.group-chat').toggleClass('group-chat--mini');
        },
    });
})

// Sidebar & Navbar
$(window).on({
    resize: function () {
        windowSizeCheck()
    },
    scroll: function () {
        var scroll = $(this).scrollTop();
        var height = 200;

        if (scroll > height) {
            $('.navbar').addClass('navbar--fixed');
            $('.navbar').css('opacity', 1)
        } else {
            if (scroll >= height / 2) {
                $('.navbar').css('opacity', 0)
            }
            else {
                $('.navbar').css('opacity', 1)
                $('.navbar').removeClass('navbar--fixed');
            }
        }
    },
});

// JSON
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