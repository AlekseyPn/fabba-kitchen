
$('.show-inside__slider').slick({
  centerMode: true,
  autoplay: true,
  centerPadding: '60px',
  slidesToShow: 5,
  autoplaySpeed: 4000,
  prevArrow: '<button type="button" class="show-inside__arrow  show-inside__arrow--prev"></button>',
  nextArrow: '<button type="button" class="show-inside__arrow  show-inside__arrow--next"></button>',
  responsive: [
    {
      breakpoint: 768,
      settings: {
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 3
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
        slidesToShow: 3
      }
    }
  ]
});

