var openFacade = document.querySelector('#open-modules');
var ldspSlider = document.querySelector('#ldsp-facade');
var mdfSlider = document.querySelector('#mdf-facade');
var plasticSlider = document.querySelector('#plastic-facade');
var toggleSlider = function(slider) {
    var cls;
    $('.constructor__slider').each(function(){
        if($(this).hasClass('constructor__slider--show')) {
            cls = $(this);
        }
    })
    
    $(cls).removeClass('constructor__slider--show');
    $(slider).addClass('constructor__slider--show')
};

$('#facade-ldsp').click(function(){
    toggleSlider(ldspSlider);
})
$('#facade-mdf').click(function(){
    toggleSlider(mdfSlider);
})
$('#facade-plastic').click(function(){
    toggleSlider(plasticSlider);
})

$('.constructor__slider').slick({   
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,     
    prevArrow: '<button type="button" class="constructor__arrow  constructor__arrow--prev"></button>',
    nextArrow: '<button type="button" class="constructor__arrow  constructor__arrow--next"></button>',
})
