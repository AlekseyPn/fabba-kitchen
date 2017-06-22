var openFacade = document.querySelector('#open-facade');
var ldspPatternSlider = document.querySelector('#ldsp-pattern-facade');
var mdfPatternSlider = document.querySelector('#mdf-pattern-facade');
var plasticPatternSlider = document.querySelector('#plastic-pattern-facade');

var ldspGlossSlider = document.querySelector('#ldsp-gloss-facade');
var mdfGlossSlider = document.querySelector('#mdf-gloss-facade');
var plasticGlossSlider = document.querySelector('#plastic-gloss-facade');

var whiteBtn = document.querySelector('#white-color');
var greenBtn = document.querySelector('#green-color');
var blueBtn = document.querySelector('#blue-color');
var yellowBtn = document.querySelector('#yellow-color');
var redBtn = document.querySelector('#red-color');
var darkBtn = document.querySelector('#dark-color');

var colorFacade = document.querySelector('#color-slides');
var slick;
var img
var cls = ldspPatternSlider;

var toggleSlider = function (slider) {
    $(colorFacade).empty();    
    $('.constructor__slider, .constructor__color-slider').each(function () {
        if ($(this).hasClass('constructor__slider--show') && $(this).data('checked') == 'check') {
            cls = $(this);
        }
    })
    
    $(cls).removeClass('constructor__slider--show');
    $(cls).removeAttr('data-checked');
    $(slider).addClass('constructor__slider--show');
    $(slider).attr('data-checked', 'check')
    cls = slider;    
};


// обработчик для фильтра по цвету фасада
var toggleColorFacade = function (color) {
    
    var src = [];
    

    if (cls !== undefined) {
        img = cls.querySelectorAll('.constructor__slide');
        console.log(cls)
        console.log(img)
        var i = 0;
        var maxImg = img.length;
        for (i; i < maxImg; i++) {
            if ($(img[i]).data('color') === color && !($(img[i]).hasClass('slick-cloned'))) {
                src.push($(img[i]).attr('src'))                
            }
        
        }

        if (src.length == 0) {            
            return false
        } else {
            var j = 0;
            var maxSrc = src.length;
            if (slick) {
                $(colorFacade).slick('unslick')                
                $(colorFacade).empty();
                for (j; j < maxSrc; j++) {
                    $(colorFacade).append('<img width="1024" height="768" class="constructor__slide" src="' + src[j] + '">')
                }
                $(cls).removeClass('constructor__slider--show');
                $(colorFacade).addClass('constructor__slider--show');                 
                if (src.length > 1) {
                    $(colorFacade).slick({
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: true,
                        prevArrow: '<button type="button" class="constructor__arrow  constructor__arrow--prev"></button>',
                        nextArrow: '<button type="button" class="constructor__arrow  constructor__arrow--next"></button>'
                    });                    
                }
                if(src.length < 1) {
                    slick = false
                }                
            } else {
                $(colorFacade).empty();
                for (j; j < maxSrc; j++) {
                    $(colorFacade).append('<img width="1024" height="768" class="constructor__slide" src="' + src[j] + '">')
                }

                $(cls).removeClass('constructor__slider--show');
                $(colorFacade).addClass('constructor__slider--show');
                
                if (src.length > 1) {
                    $(colorFacade).slick({
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: true,
                        prevArrow: '<button type="button" class="constructor__arrow  constructor__arrow--prev"></button>',
                        nextArrow: '<button type="button" class="constructor__arrow  constructor__arrow--next"></button>'
                    });
                    slick = true;
                }
            }

        }
    } else {
        return false;
    }



}

// Темные слайдеры
$('#ldsp-pattern').click(function () {
    toggleSlider(ldspPatternSlider);
})
$('#mdf-pattern').click(function () {
    toggleSlider(mdfPatternSlider);
})
$('#plastic-pattern').click(function () {
    toggleSlider(plasticPatternSlider);
})

// Светлые слайдеры
$('#ldsp-gloss').click(function () {
    toggleSlider(ldspGlossSlider);
})
$('#mdf-gloss').click(function () {
    toggleSlider(mdfGlossSlider);
})
$('#plastic-gloss').click(function () {
    toggleSlider(plasticGlossSlider);
})

// Цвета

$(whiteBtn).click(function () {
    toggleColorFacade('white')
})

$(greenBtn).click(function () {
    toggleColorFacade('green')
})
$(blueBtn).click(function () {
    toggleColorFacade('blue')
})
$(yellowBtn).click(function () {
    toggleColorFacade('yellow')
})
$(redBtn).click(function () {
    toggleColorFacade('red')
})
$(darkBtn).click(function () {
    toggleColorFacade('dark')
})

$('#lock').click(function () {
    toggleSlider(openFacade);
})
$('.constructor__slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: '<button type="button" class="constructor__arrow  constructor__arrow--prev"></button>',
    nextArrow: '<button type="button" class="constructor__arrow  constructor__arrow--next"></button>',
});
