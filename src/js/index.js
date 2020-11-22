console.log('Hello, bro! This project work with Webpack!');
//

// import Swiper JS
import Swiper, { Navigation, Pagination } from 'swiper';
// import Swiper styles
import 'swiper/swiper-bundle.css';
//
// import 'normalize.css';

// import 'materialize-css/dist/css/materialize.min.css';
// import 'materialize-css/dist/js/materialize.min';

//import './materialize-src/js/bin/materialize.min'; 
import '../sass/style.scss';

import { FilterForm, DefaultForm, EventsForm } from './services/forms';

const AJAX_REQUEST_SUBMIT_FORM = 'ajax_submit_form';
const AJAX_REQUEST_SUBMIT_FILTER = 'ajax_submit_filter';
const AJAX_REQUEST_SUBMIT_EVENT = 'ajax_submit_events';

$( document ).ready(function() {
    console.log( "ready!" );

    Swiper.use([Navigation, Pagination]);

    //const swiper = new Swiper();

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
        if (thisPlus.find('.plus__photo').hasClass('active')) {
            thisPlus.find('.plus__photo').removeClass('active');
        } else {
            $('.alley-interactive .plus__photo').removeClass('active');
            thisPlus.find('.plus__photo').addClass('active');
        }
    });

    //слайдеры
    $('.main-slider__wrapper .arrow-prev').click(function() {
        if($(this).hasClass('disabled') == false) {
            let wrapper = $('.main-slider__wrapper');
            let count = wrapper.find('.main-slider__slide').length;
            let actInd = wrapper.find('.main-slider__slide.active').index();
            if (actInd > 0) {
                $('.main-slider__wrapper .arrow-next').removeClass('disabled');
                wrapper.find('.main-slider__slide').fadeOut(300);
                wrapper.find('.main-slider__slide').removeClass('active');
                wrapper.find('.pagination-item').removeClass('active');
                wrapper.find('.main-slider__slide').eq(actInd - 1).fadeIn(300);
                wrapper.find('.main-slider__slide').eq(actInd - 1).addClass('active');
                wrapper.find('.pagination-item').eq(actInd - 1).addClass('active');
                if(actInd == 1) {
                    $('.main-slider__wrapper .arrow-prev').addClass('disabled');
                }
            }
        }
    });

    $('.main-slider__wrapper .arrow-next').click(function() {
        if($(this).hasClass('disabled') == false) {
            let wrapper = $('.main-slider__wrapper');
            let count = wrapper.find('.main-slider__slide').length;
            let actInd = wrapper.find('.main-slider__slide.active').index();
            if (actInd < count - 1) {
                $('.main-slider__wrapper .arrow-prev').removeClass('disabled');
                wrapper.find('.main-slider__slide').fadeOut(300);
                wrapper.find('.main-slider__slide').removeClass('active');
                wrapper.find('.pagination-item').removeClass('active');
                wrapper.find('.main-slider__slide').eq(actInd + 1).fadeIn(300);
                wrapper.find('.main-slider__slide').eq(actInd + 1).addClass('active');
                wrapper.find('.pagination-item').eq(actInd + 1).addClass('active');
                if(actInd == count - 2) {
                    $('.main-slider__wrapper .arrow-next').addClass('disabled');
                }
            }
        }
    });

    const alleySwiper = new Swiper('#alley-slider .swiper-container', {
        navigation: {
            nextEl: '#alley-slider .swiper-button-next',
            prevEl: '#alley-slider .swiper-button-prev',
        },
        pagination: {
            el: '#alley-slider .swiper-pagination',
            type: 'bullets',
            clickable: true,
        }
    });

    // const constructionSwiper = new Swiper('#construction-slider .swiper-container', {
    //     navigation: {
    //         nextEl: '#construction-slider .swiper-button-next',
    //         prevEl: '#construction-slider .swiper-button-prev',
    //     },
    //     pagination: {
    //         el: '#construction-slider .swiper-pagination',
    //         type: 'bullets',
    //         clickable: true,
    //     }
    // });

    $(".flat-card").each(function(index, element){
        var $this = $(this);
        $this.addClass("instance-" + index);
        $this.find(".swiper-button-prev").addClass("btn-prev-" + index);
        $this.find(".swiper-button-next").addClass("btn-next-" + index);
        $this.find(".swiper-pagination").addClass("pagination-" + index);
        var swiper = new Swiper(".instance-" + index + " .swiper-container", {
            navigation: {
                nextEl: ".btn-next-" + index,
                prevEl: ".btn-prev-" + index,
            },
            pagination: {
                el: ".pagination-" + index,
                type: 'bullets',
                clickable: true,
            }
        });
    });

    const newsSwiper = new Swiper('#news-slider .swiper-container', {
        slidesPerView: 'auto',
        navigation: {
            nextEl: '#news-slider .swiper-button-next',
            prevEl: '#news-slider .swiper-button-prev',
        },
        pagination: {
            el: '#news-slider .swiper-pagination',
            type: 'custom',
            renderCustom: function (swiper, current, total) {
                return current + ' / ' + total;
            }
        }
    });

    const filter = FilterForm({
        containerUrl: '.plans',
        actionName: AJAX_REQUEST_SUBMIT_FILTER,
        containerForRenderingUrl: '.plans__flats-wrapper',
        moreBtnUrl: '[data-object="filter_more"]',
    });
    filter.init();
    filter.manage();

    const historyBuildinig = EventsForm({
        containerUrl: '#construction .section-content', 
        containerSelectUrl: '.select-block select', 
        containerTextUrl: '.construction__info-inside', 
        containerSliderUrl: '#construction-slider .swiper-container', 
        actionName: AJAX_REQUEST_SUBMIT_EVENT, 
        eventName: 'bulding-event',
    });
    historyBuildinig.init();
    historyBuildinig.manage();
});





