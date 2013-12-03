$(function () {
    $('.center').each(function () {
        $(this).css('margin-top', -$(this).outerHeight() / 2);
    });
});