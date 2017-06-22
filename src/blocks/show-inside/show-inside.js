'use strict'
var ldspCarousel = document.querySelector('#show-facade-ldsp');
var mdfCarousel = document.querySelector('#show-facade-mdf');
var plasticCarousel = document.querySelector('#show-facade-plastic');

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

var toggleCarousel = function (slider) {
  var cls;
  $('.show-inside__slider').each(function () {
    if ($(this).hasClass('show-inside__slider--show')) {
      cls = $(this);
    }
  })

  $(cls).removeClass('show-inside__slider--show');
  $(slider).addClass('show-inside__slider--show');
};

$('#show-ldsp').click(function () {
  toggleCarousel(ldspCarousel);
})

$('#show-mdf').click(function () {
  toggleCarousel(mdfCarousel);
})

$('#show-plastic').click(function () {
  toggleCarousel(plasticCarousel);
})

var cfg = {
  scrollDuration: 800
};

var cls;
var ssSmoothScroll = function () {

  $('.scroll').on('click', function (e) {
    var t = e.target,
      hiddenElem,
      cls = t.closest('.show-inside__item'),
      target = this.hash,
      $target = $(target);

    e.preventDefault();
    e.stopPropagation();

    $('.show-inside__tab-item').each(function () {
      if ($(this).hasClass('show-inside__tab-item--show')) {
        hiddenElem = this;
      }
    })


    $(hiddenElem).removeClass('show-inside__tab-item--show');

    switch ($(cls).data('toggle')) {
      case "facade":
        $('#tab-facade').addClass('show-inside__tab-item--show');
        break
      case "table":
        $('#tab-table').addClass('show-inside__tab-item--show');
        break
      case "body":
        $('#tab-body').addClass('show-inside__tab-item--show');
        break
      case "furniture":
        $('#tab-furniture').addClass('show-inside__tab-item--show');
        break
    }

    $('html, body').stop().animate({
      'scrollTop': $target.offset().top - 100
    }, cfg.scrollDuration, 'swing').promise().done(function () {

      // window.location.hash = target;
      // console.log(target)
    });
  });

};
ssSmoothScroll();
