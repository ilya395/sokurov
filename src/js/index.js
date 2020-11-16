console.log('Hello, bro! This project work with Webpack!');
//

// import Swiper JS
import Swiper from 'swiper';
// import Swiper styles
import 'swiper/swiper-bundle.css';
//
// import 'normalize.css';

// import 'materialize-css/dist/css/materialize.min.css';
// import 'materialize-css/dist/js/materialize.min';

//import './materialize-src/js/bin/materialize.min'; 
import '../sass/style.scss';

$( document ).ready(function() {
    console.log( "ready!" );

    const swiper = new Swiper();

    //параллакс фона
    function parallax(){
        var scrolled = $(window).scrollTop();
        $('.bg-ptn1').css('top', -(scrolled * 0.3) + 'px');
        $('.bg-ptn2').css('top', -(scrolled * 0.3) + 'px');
    }
    $(window).scroll(function(e){
        parallax();
    });

    //плавный скролл
    $("a.scrollto").click(function() {
        var elementClick = $(this).attr("href")
        var destination = $(elementClick).offset().top;
        jQuery("html:not(:animated),body:not(:animated)").animate({
            scrollTop: destination
        }, 800);
        return false;
    });

    //меню и анимация бургера
    $('.header__burger-button').click(function() {
    	let burger = $(this);
    	let menu = $('.modal-menu');
    	if(burger.hasClass('active')) {
    		burger.removeClass('active');
    		menu.fadeOut();
    	} else {
    		burger.addClass('active');
    		menu.fadeIn();
    	}
    }); 

    $('.modal-menu__list a').click(function() {
    	$('.header__burger-button').removeClass('active');
    	$('.modal-menu').fadeOut();
    });

    //закрытие модалки с формой
    $('.modal-form .close').click(function() {
    	$('.modal-form').fadeOut();
    });

    $('.modal-form').click(function(e) {
    	if($(e.target).hasClass('modal-form__wrapper')) {
    		$('.modal-form').fadeOut();
    	}
    });

    //открытие модалки с формой
    $('.form-open').click(function() {
    	$('.modal-form .modal-form__inside').css('display', 'block');
    	$('.modal-form .modal-form__success').css('display', 'none');
    	$('.modal-form').fadeIn();
    }); 

    //окно об успешной отправке в модалке
    $('#modal-form').submit(function() {
    	$('.modal-form .modal-form__inside').fadeOut();
    	$('.modal-form .modal-form__success').fadeIn();
    });

    //окно об успешной отправке форма презентации
    $('#presentation-form').submit(function() {
    	$('.form-presentation-card form').fadeOut();
    	$('.form-presentation-card .form-presentation__success').fadeIn();
    });

    //фото в блоке аллея
    $('.alley-interactive .plus').click(function() {
    	let thisPlus = $(this);
    	$('.alley-interactive .plus__photo').removeClass('active');
    	thisPlus.find('.plus__photo').addClass('active');
    });
});





