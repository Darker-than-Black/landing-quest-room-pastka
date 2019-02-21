"use strict";
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
	$('.loader').css({
		'display': 'flex'
	});

	for(var i = 0; i < $('.tabs__table').length; i++) {
		$('.tabs__table')[i].style.display = "none";
		$('.tab--link')[i].classList.remove("openTab");
	}

	$('.tab--link')[num].classList.add("openTab");
	$('#' + room).css("display", table);

	setTimeout(function () {
		$('.loader').css({
			'display': 'none'
		});
	}, 500);
};

$( document ).ready(function() {
	$('.header__nav a[href*="#"], .header__btn-container a[href*="#"], .quest__qroup a[href*="#"], .in_game__btn a[href*="#"], .footer__nav--site a[href*="#"]')
	.on('click', function(event) {
		$('.loader').css({
			'display': 'flex'
		});


		setTimeout(function () {
			$('.loader').css({
				'display': 'none'
			});
		}, 1000);
	});

	let data = {
		title: null,
		gameTime: null,
		available: null,
		time: null,
		form: {
			count: 1,
			price: null,
			name: null,
			phone: null,
			email: null,
			comment: null,
			totalPrice: null,
		}
	};


	$('.booking__free').click(function(e) {
		if( e.target.className == 'booking__free' ) {
			data.title = $.trim( $('#'+e.target.dataset.room+' .quest__title').text() );
			data.gameTime = $('#'+e.target.dataset.room).data('time');
			data.available = $('#'+e.target.dataset.room).data('available');
			data.form.price = $('#'+e.target.dataset.room).data('price');
			data.time = e.target.dataset.time;

			$('.modal .quest__title').text( data.title );
			$('#reserve_date').text( data.time );
			$('#minutes').text( data.gameTime );
			$('#available').text( data.available + '/' + data.available );
			$('#price').text( data.form.price );
			data.form.count = 1;
			setCountVal();

			for(let i = 0; i < $('.modal .quest__row .col-12:first-child').children().length; i++) {
				$('.modal .quest__row .col-12:first-child').children()[i].style.display = 'none';
			}

			if(e.target.dataset.room == 'quests') {
				$('.modal .quest__row .col-12:first-child').children()[0].style.display = 'block';
			} else if(e.target.dataset.room == 'quests_2') {
				$('.modal .quest__row .col-12:first-child').children()[1].style.display = 'block';
			} else {
				$('.modal .quest__row .col-12:first-child').children()[2].style.display = 'block';
			}

			$('.modal').fadeIn(200);
			setTimeout(function () {
				$('.modal .quest').fadeIn(700);
			}, 250);
		}
	});

	let lateScrollingArray = [];
	let st = 0;
	$(window).on('scroll',function(e){
		st = $(this).scrollTop();

		$('.in_game .triangle--big').css({
			transform: 'translateY(' + st * 0.1 + 'px)',
		});

		$(".in_game .triangle.triangle--smallUp").css({
			transform: 'translateY(' + st * 0.175 +  'px) rotate(-25deg)',
		});

		$(".in_game .triangle.triangle--smallDown").css({
			transform: 'translateY(' +  ( -st * 0.13 ) + 'px) rotate(-52deg)',
		});

		$(".quest .triangle--big").css({
			transform: 'translateY(' + st * 0.2 + 'px) rotate(180deg)',
		});

		if(  $(this).scrollTop() >= $('.header').height() + $('.in_game').height() ) {
			if( !lateScrollingArray[0] ) {
				lateScrollingArray[0] = st;
			}
			$('.quest__legion--two .triangle.triangle--smallDown').css({
				transform: 'translateY(' + (st - lateScrollingArray[0]) * 0.075 + "px) rotate(3deg)",
			});
		}

		if(  $(this).scrollTop() >= $(".quest__legion--two").offset().top ) {
			if( !lateScrollingArray[1] ) {
				lateScrollingArray[1] = st;
			}
			$('.quest__legion--three .triangle.triangle--smallDown').css({
				transform: 'translateY(' + (st - lateScrollingArray[1]) * (-0.22) + "px) rotate(21deg)",
		  		"z-index" : "-1"
			});
		}

		if(  $(this).scrollTop() >= $(".booking").offset().top ) {
			if( !lateScrollingArray[2] ) {
				lateScrollingArray[2] = st;
			}
			$('.contacts .triangle.triangle--smallDown').css({
				transform: 'translateY(' + (st - lateScrollingArray[2]) * 0.15 + "px) rotate(35deg)",
		  		"z-index" : "-1"
			});
		}

		if(  $(this).scrollTop() >= $(".booking").offset().top + 200 ) {
			if( !lateScrollingArray[3] ) {
				lateScrollingArray[3] = st;
			}
			$('.contacts .triangle.triangle--smallUp').css({
				transform: 'translateY(' + (st - lateScrollingArray[3]) * (-0.175) + "px) rotate(17deg)",
		  		"z-index" : "-9"
			});
		}
	});

	let answerText = null;
	$('#reserve__room').on('submit', function (e) {
		e.preventDefault();
		data.form.name = e.target[0].value;
		data.form.phone = e.target[1].value;
		data.form.email = e.target[2].value;
		data.form.comment = e.target[3].value;

		$.post('https://httpbin.org/post', {
			title: data.title,
			time: data.time,
			name: data.form.name,
			phone: data.form.phone,
			email: data.form.email,
			comment: data.form.comment,
			numberOfPlayers: data.form.count,
			totalPrice: data.form.totalPrice
		}).done(function() {
			answerText = 'Запрос успешен';
		}).fail(function() {
			answerText = 'Случилось ошибка, спробуйте еще раз';
		}).always(function() {
			$('.modal .modal__wrapper .modal__conteiner').text( answerText );
			$('.modal .quest').fadeOut(500);
			setTimeout(function () {
				$('.modal .modal__wrapper').fadeIn(500);
			}, 550);
		});
	});
	setCountVal();

	function setCountVal() {
		$('#count').text( data.form.count );
		data.form.totalPrice = data.form.count * data.form.price;
		$('#totalCount').text( data.form.totalPrice );
	};

	$('#minus').click(function () {
		if(data.form.count > 1)
			data.form.count--;
		setCountVal();
	});
	$('#plus').click(function () {
		if(data.form.count < 6)
			data.form.count++;
		setCountVal();
	});

	$('#close').click(function (e) {
		e.preventDefault();
		$('.modal .quest').fadeOut(700);
		$('.modal .modal__wrapper').fadeOut(700);
		setTimeout(function () {
			$('.modal').fadeOut(200);
		}, 750);
	})
});

$( window ).on( "load", function() {
	setTimeout(function () {
		$('.loader').css({
			'display': 'none'
		})
	}, 500);
});