"use strict";
// Smooth scroll to anchor

// var time = 2000;
if( navigator.userAgent.search('Edge') >= 0 ) {
	$('.header__nav')[0].style.display = "grid";
}

if( $(window).width() > 992 ) {
	var table = "table"
} else {
	var table = "flex"
}

$('.tabs__table')[0].style.display = table;
function openTabs(e, room, num) {
	for(var i = 0; i < $('.tabs__table').length; i++) {
		$('.tabs__table')[i].style.display = "none";
		$('.tab--link')[i].classList.remove("openTab");
	}

	$('.tab--link')[num].classList.add("openTab");
	$('#' + room).css("display", table)
}

$( document ).ready(function() {
	$('.header__nav a[href*="#"], .header__btn-container a[href*="#"], .quest__qroup a[href*="#"], .in_game__btn a[href*="#"]')
		.not('[href="#"]')
		.not('[href="#0"]')
		.click(function(event) {
		var time =  Math.abs( ($("#" + event.target.dataset.path).offset().top - $(this).offset().top ) / 2.5 );

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
		    }, time, function() {
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


	$('.booking__free').click(function(e) {
		console.log(e)

		if( e.target.className == 'booking__free' ) {
			console.log( e.target.dataset.time )
		}
	});


	var lateScrollingArray = [];
	$(window).scroll(function(e){
		var st = $(this).scrollTop();

		$(".in_game .triangle--big").css({
		  "transform" : "translate(0%, " + st*0.05 + "%" 
		});

		$(".in_game .triangle.triangle--smallUp").css({
		  "bottom" : + 23 - st*0.03 + "vh",
		  "transform" : " rotate(" + (st*0.04-25) + "deg)"
		}); 

		$(".in_game .triangle.triangle--smallDown").css({
		  "bottom" : + 7 - st*0.03 + "vh",
		  "transform" : " rotate(" + (-st*0.07-52) + "deg)"
		});

		$(".quest .triangle--big").css({
		  "top" : + 2+st*0.02 + "vh",
		});


		if(  $(this).scrollTop() >= $('.header').height() + $('.in_game').height() ) {
			if( !lateScrollingArray[0] ) {
				lateScrollingArray[0] = st;
			}
			$('.quest__legion--two .triangle.triangle--smallDown').css({
			  "top" : + (10+(st-lateScrollingArray[0])*0.03) + "vh",
			  "transform" : " rotate(" + (st*0.1+3) + "deg)"
			});
		}

		if(  $(this).scrollTop() >= $(".quest__legion--two").offset().top ) {
			// console.log('fghj')
			if( !lateScrollingArray[1] ) {
				lateScrollingArray[1] = st;
			}
			$('.quest__legion--three .triangle.triangle--smallDown').css({
			  "top" : + (10+(st-lateScrollingArray[1])*0.03) + "vh",
			  "transform" : " rotate(" + (st*0.1+3) + "deg)",
			  "z-index" : "-1"
			});
		}

		if(  $(this).scrollTop() >= $(".booking").offset().top ) {
			if( !lateScrollingArray[2] ) {
				lateScrollingArray[2] = st;
			}
			$('.contacts .triangle.triangle--smallDown').css({
			  "top" : + (-5+(st-lateScrollingArray[2])*0.04) + "vh",
			  "transform" : " rotate(" + (st*0.05+3) + "deg)",
			  "z-index" : "-1"
			});
		}

		if(  $(this).scrollTop() >= $(".booking").offset().top + 200 ) {
			if( !lateScrollingArray[3] ) {
				lateScrollingArray[3] = st;
			}
			$('.contacts .triangle.triangle--smallUp').css({
			  "bottom" : + (14-(st-lateScrollingArray[3])*0.03) + "vh",
			  "transform" : " rotate(" + (st*0.07+3) + "deg)",
			  "z-index" : "9"
			});
		}



		// console.log( $('.header').height() + $('.in_game').height()  )
		// console.log( $(".quest .triangle--big").offset()  )

	});
    
});