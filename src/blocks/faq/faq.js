$('.faq__item').click(function (e) {
    var target = e.target;
    var el = $(target).children('.faq__descr')
    if ($(this).hasClass('faq__item--show')) {
        $(this).removeClass('faq__item--show');
        // $(el).animate({
        //     height: 'hide'
        // }, {
        //     duration: 200,
        //     specialEasing: {
        //         height: 'linear'
        //     }
        // })
    } else {
        $(this).addClass('faq__item--show');
        // $(el).animate({
        //     height: 'show'
        // }, {
        //     duration: 1000,
        //     specialEasing: {
        //         height: 'linear'
        //     }
        // })
    }

});