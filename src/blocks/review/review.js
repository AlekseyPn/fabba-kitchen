var reviewSlider = document.getElementById('bee-3d');
var reviewItem = document.querySelectorAll('.review__item');
var focusItem = Math.floor((reviewItem.length / 2));



var slider3D = new Bee3D (reviewSlider, {    
    selector: '.review__item',    
    effect: 'arc',    
    focus: focusItem,
    listeners: {
        keys: true,
        touches: true,
        clicks: true,
        drag: true
    },
    navigation: {
        enabled: true,
        next: '.review__arrow.review__arrow--next',
        prev: '.review__arrow.review__arrow--prev'
    }        
})




