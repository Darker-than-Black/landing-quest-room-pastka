"use strict";
// Smooth scroll to anchor
$('.header__nav a[href*="#"], .header__btn-container a[href*="#"], .quest__qroup a[href*="#"]')
	.not('[href="#"]')
	.not('[href="#0"]')
	.click(function(event) {
	if (
	  location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
	  && 
	  location.hostname == this.hostname
	) {
	  var target = $(this.hash);
	  target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
	  if (target.length) {
	    event.preventDefault();
	    $('html, body').animate({
	      scrollTop: target.offset().top
	    }, 1000, function() {
	      var $target = $(target);
	      $target.focus();
	      if ($target.is(":focus")) {
	        return false;
	      } else {
	        $target.attr('tabindex','-1');
	        $target.focus();
	      };
	    });
	  }
	}
});


if( navigator.userAgent.search('Edge') >= 0 ) {
	$('.header__nav')[0].style.display = "grid";
}

if( $(window).width() > 992 ) {
	var table = "table"
} else {
	var table = "flex"
}
$('.tabs__table')[0].style.display = table;

function openTabs(e, room) {
	for(var i = 0; i < $('.tabs__table').length; i++) {
		$('.tabs__table')[i].style.display = "none";
	}

	$('#' + room).css("display", table)
}


$('.booking__free').click(function(e) {
	console.log(e)

	if( e.target.className == 'booking__free' ) {
		console.log( e.target.dataset.time )
	}
});