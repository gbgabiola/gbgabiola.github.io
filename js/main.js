$(document).ready(function() {

  /* Scroll hire me button to contact page */
  $('.about-me').click(function() {
    $('html, body').animate({
      scrollTop: $($(this).attr('href')).offset().top
    }, 1000);
    return false;
  });

  /* For Bootstrap current state on portfolio sorting */
  $('ul.nav-pills li a').click(function(e) {
    $('ul.nav-pills li.active').removeClass('active')
    $(this).parent('li').addClass('active')
  })

  /* Featherlight gallery */
  $('.design-group a').featherlightGallery({
		galleryFadeIn: 100,          /* fadeIn speed when slide is loaded */
		galleryFadeOut: 300          /* fadeOut speed before slide is loaded */
	});

  /* Scrollspy and scroll filter */
  $('#main-menu').onePageNav({
    currentClass: "active",
    changeHash: false,
    scrollThreshold: 0.5,
    scrollSpeed: 750,
    filter: ":not(#external)",
    easing: "swing"
  });

});
