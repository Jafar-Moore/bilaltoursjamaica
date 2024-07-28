
!(function($) {
  "use strict";

  jQuery(window).scroll(function() {    
      var scroll = jQuery(window).scrollTop();
      if (scroll >= 80) {
          jQuery(".header").addClass("darkHeader");
      } else {
          jQuery(".header").removeClass("darkHeader");
      }
  });

  // Mobile Navigation


  $(".navbar-toggler").click(function(){
    $(".nav-menu").addClass("open-menu");
    $("body").addClass("open-menu");
  });

  $(".hide-menu").click(function(){
    $(".nav-menu").removeClass("open-menu");
    $("body").removeClass("open-menu");
  });

  $(".nav-item.nav-dropdown a").click(
    function () {
      var active = $('.nav-dropdown.open-dropdown');
      active.next().removeClass('disabled');
      $('.nav-dropdown.open-dropdown, body').removeClass('open-dropdown');
      $(this).parent('.nav-dropdown').toggleClass('open-dropdown');
      $('body').addClass('open-menu');
    }
  );

  $(".close-nav-megadropdown, .menu-backdrop").click(function(){
    $(".nav-dropdown.open-dropdown").removeClass("open-dropdown");
    $("body").removeClass("open-menu");
  });



  // Initi AOS
  AOS.init({
    duration: 800,
    easing: "ease-in-out"
  });

  $('.local-sight-area').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: false
  });

  



  var $gallery = $('#gallery');
  var $boxes = $('.revGallery-anchor');
  $boxes.hide(); 

  $gallery.imagesLoaded( {background: true}, function() {
    $boxes.fadeIn();

    $gallery.isotope({
      // options
      sortBy : 'original-order',
      layoutMode: 'fitRows',
      itemSelector: '.revGallery-anchor',
      stagger: 30,
    });
  });	

    $('button').on( 'click', function() {
      var filterValue = $(this).attr('data-filter');
      $('#gallery').isotope({ filter: filterValue });
      $gallery.data('lightGallery').destroy(true);
      $gallery.lightGallery({
          selector: filterValue.replace('*','')
      });
  });


  $("#gallery").lightGallery({          
  }); 
 

  //button active mode
  $('.button').click(function(){
    $('.button').removeClass('is-checked');
    $(this).addClass('is-checked');
  });


  //CSS Gram Filters on Mouse enter
  $("#gallery a .nak-gallery-poster").addClass("inkwell");

  $("#gallery a").on({
  mouseenter : function() {
      $(this).find(".nak-gallery-poster").removeClass("inkwell").addClass("walden");
  },
  mouseleave : function() {
      $(this).find(".nak-gallery-poster").removeClass("walden").addClass("inkwell");
  }
  }); 



  $('.banner-slider').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
    fade: true,
    cssEase: 'linear',
    pauseOnHover: false
  });

  


})(jQuery);



