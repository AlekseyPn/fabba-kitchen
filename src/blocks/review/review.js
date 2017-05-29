(function(){
    $('.review__wrapper').slick({
  centerMode: true,
  autoplay: true,
  centerPadding: '100px',
  slidesToShow: 1,
  autoplaySpeed: 4000,
  prevArrow: '<button type="button" class="review__arrow  review__arrow--prev"></button>',
  nextArrow: '<button type="button" class="review__arrow  review__arrow--next"></button>',
  responsive: [
    {
      breakpoint: 768,
      settings: {
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: false,
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: false,
        centerMode: true,
        centerPadding: '20px',
        slidesToShow: 1
      }
    },
    {
      breakpoint: 370,
      settings: {
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: false,
        centerMode: true,
        centerPadding: '10',
        slidesToShow: 1
      }
    }
  ]
});
}());

