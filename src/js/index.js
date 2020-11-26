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

import { AJAX_REQUEST_SUBMIT_FORM, AJAX_REQUEST_SUBMIT_FILTER, AJAX_REQUEST_SUBMIT_EVENT, EVENT_STATIC_FORM, EVENT_MODAL_FORM } from './utils/constants';

import { DefaultMap } from '../js/services/map';

import { makingDownload } from '../js/utils/functions';

$( document ).ready(function() {
    console.log( "ready!" );

    Swiper.use([Navigation, Pagination]);

    let s_width = $(window).width();

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

    //хэдер
    function headerModify() {
        var scrolled = $(window).scrollTop();
        if (scrolled > 120) {
            $('header').addClass('modify');
        } else {
            $('header').removeClass('modify');
        }
    }

    if (s_width >=1200) {
        $(window).scroll(function(e){
            headerModify();
        });
    }

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

//////////////////////////////////////////////////////////////////////////////
/////////////////////////////// карта: начало ////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

    const objectsOnMap = {
        school: [
            [55.619765, 49.39361]
        ],
        kindergarten: [
            [55.620835, 49.389501]
        ],
        market: [
            [55.621133, 49.393318],
            [5.619713, 49.395687],
            [55.618043, 49.400012]
        ],
        'bus-station': [
            [55.621405, 49.393316],
            [55.620732, 49.394353],
            [55.618159, 49.39944],
            [55.617658, 49.400178]
        ]
    }

    const defMap = DefaultMap({
        urlMapContainer: '#map',
        objects: objectsOnMap,
        zoom: 14,
    });
    
    if (window.location.pathname == '/') {
        defMap.init();
    }


//////////////////////////////////////////////////////////////////////////////
/////////////////////////////// карта: конец /////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
////////////////////////////// модалка: начало ///////////////////////////////
//////////////////////////////////////////////////////////////////////////////

    const modalForm = DefaultForm({
        containerUrl: '#modal-form', 
        actionName: AJAX_REQUEST_SUBMIT_FORM, 
        eventName: EVENT_MODAL_FORM,        
    });
    if ( window.location == '/' ) {
        modalForm.init();
    }
    function handlerModalFormRequest() {
        // console.log('успешный успех');
        //окно об успешной отправке в модалке
        $('.modal-form .modal-form__inside').fadeOut();
        $('.modal-form .modal-form__success').fadeIn();
        // $('#modal-form').submit(function() {
            // $('.modal-form .modal-form__inside').fadeOut();
            // $('.modal-form .modal-form__success').fadeIn();
        // });
        const form = document.querySelector('#modal-form');
        form.elements.phone.value = '';
        form.elements.name.value = '';
        
    }
    window.addEventListener(`${EVENT_MODAL_FORM}_success`, handlerModalFormRequest);

    //закрытие модалки с формой
    $('.modal-form .close').click(function() {
        $('.modal-form').fadeOut();
        $('.modal-form').find('input[name="title"]').val('Форма обратной связи');
        //
        // document.removeEventListener(`${EVENT_MODAL_FORM}_success`, handlerModalFormRequest);
    });

    $('.modal-form').click(function(e) {
    	if($(e.target).hasClass('modal-form__wrapper')) {
    		$('.modal-form').fadeOut();
            $('.modal-form').find('input[name="title"]').val('Форма обратной связи');
        }
        //
        // document.removeEventListener(`${EVENT_MODAL_FORM}_success`, handlerModalFormRequest);
    });

    //открытие модалки с формой
    $('[data-action="form-open"]').click(function() {
    	$('.modal-form .modal-form__inside').css('display', 'block');
    	$('.modal-form .modal-form__success').css('display', 'none');
        let formString = $(this).attr('data-title') || 'Форма обратной связи';
        $('.modal-form').find('input[name="title"]').val(formString);
        $('.modal-form').fadeIn();
        //
        // document.addEventListener(`${EVENT_MODAL_FORM}_success`, handlerModalFormRequest);
    }); 

    function handlerFormOpen(event) {
        // console.log('вот куда кликнул: ',event.target);
        if(event.target.getAttribute('data-action') == 'form-open') {
            // console.log('наш случай');
            event.preventDefault();
            let planString = event.target.getAttribute('data-title');
            $('.modal-form').find('input[name="title"]').val(planString);
            $('.modal-form .modal-form__inside').css('display', 'block');
            $('.modal-form .modal-form__success').css('display', 'none');
            $('.modal-form').fadeIn();
            //
            // document.addEventListener(`${EVENT_MODAL_FORM}_success`, handlerModalFormRequest);
        }
        smoothLink(event);
    }

    // if (document.getElementById('catalog')) {
    //     document.getElementById('catalog').addEventListener('click', handlerFormOpen);
    // }
    
    document.addEventListener('click', handlerFormOpen);

//////////////////////////////////////////////////////////////////////////////
////////////////////////////// модалка: конец ////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
///////////////////////// форма презентации: начало //////////////////////////
//////////////////////////////////////////////////////////////////////////////
    
    const staticForm = DefaultForm({
        containerUrl: '#presentation-form', 
        actionName: AJAX_REQUEST_SUBMIT_FORM, 
        eventName: EVENT_STATIC_FORM,
    });
    if ( window.location == '/' ) {
        staticForm.init();
    }
    window.addEventListener(`${EVENT_STATIC_FORM}_success`, function() {
        //окно об успешной отправке форма презентации
        $('.form-presentation-card form').fadeOut();
        $('.form-presentation-card .form-presentation__success').fadeIn();
        // $('#presentation-form').submit(function() {
        //     $('.form-presentation-card form').fadeOut();
        //     $('.form-presentation-card .form-presentation__success').fadeIn();
        // });       
        //
        // вызвать функцию для скачивания
        makingDownload(
            window.wp.presentation.url,
            window.wp.presentation.name,
        )
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

//////////////////////////////////////////////////////////////////////////////
////////////////////////// форма презентации: конец //////////////////////////
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
///////////////////////////// слайдеры: начало ///////////////////////////////
//////////////////////////////////////////////////////////////////////////////

    //main slider
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

    $('.main-slider__wrapper .pagination-item').click(function() {
        if($(this).hasClass('active') == false) {
            let ind = $(this).index();
            let wrapper = $('.main-slider__wrapper');
            let count = wrapper.find('.main-slider__slide').length;

            wrapper.find('.main-slider__slide').fadeOut(300);
            wrapper.find('.main-slider__slide').removeClass('active');
            wrapper.find('.main-slider__slide').eq(ind).fadeIn(300);
            wrapper.find('.main-slider__slide').eq(ind).addClass('active');
            wrapper.find('.pagination-item').removeClass('active');
            wrapper.find('.pagination-item').eq(ind).addClass('active');

            $('.main-slider__wrapper .arrow-next').removeClass('disabled');
            $('.main-slider__wrapper .arrow-prev').removeClass('disabled');

            if (ind == 0) {
                $('.main-slider__wrapper .arrow-prev').addClass('disabled');
            } else if (ind == count - 1) {
                $('.main-slider__wrapper .arrow-next').addClass('disabled');
            }
        }
    });

    //flat-card slider 
    function flatCardPrevClick(index) {
        let sliderWrap = $('.instance-' + index).find('.swiper-wrapper');
        let slide = $('.instance-' + index).find('.swiper-slide');
        let btnPrev = $('.btn-prev-' + index);
        let btnNext = $('.btn-next-' + index);
        let pagination = $('.pagination-' + index);

        sliderWrap.css('margin-left', 0);
        btnNext.removeClass('swiper-button-disabled');
        btnPrev.addClass('swiper-button-disabled');
        pagination.find('.swiper-pagination-bullet').eq(0).addClass('swiper-pagination-bullet-active');
        pagination.find('.swiper-pagination-bullet').eq(1).removeClass('swiper-pagination-bullet-active');

    }
    function flatCardNextClick(index) {
        let sliderWrap = $('.instance-' + index).find('.swiper-wrapper');
        let slide = $('.instance-' + index).find('.swiper-slide');
        let btnPrev = $('.btn-prev-' + index);
        let btnNext = $('.btn-next-' + index);
        let pagination = $('.pagination-' + index);
        let slideMargin = -parseInt(slide.css('width')) + 'px';

        sliderWrap.css('margin-left', slideMargin);
        btnNext.addClass('swiper-button-disabled');
        btnPrev.removeClass('swiper-button-disabled');
        pagination.find('.swiper-pagination-bullet').eq(1).addClass('swiper-pagination-bullet-active');
        pagination.find('.swiper-pagination-bullet').eq(0).removeClass('swiper-pagination-bullet-active');
    }
    function handlerFlatCardPrevClick(event) {
        let btn = $(event.target).parent();
        if(
                (btn.hasClass('swiper-button-prev') && 
                btn.hasClass('swiper-button-disabled') == false) ||
                ($(event.target).hasClass('swiper-pagination-bullet') && 
                $(event.target).eq(0) && 
                $(event.target).hasClass('swiper-pagination-bullet-active') == false)
            ) {
            let ind = btn.closest('.flat-card').attr('data-index');
            flatCardPrevClick(ind);
        }
    }
    function handlerFlatCardNextClick(event) {
        let btn = $(event.target).parent();
        if(
                (btn.hasClass('swiper-button-next') && 
                btn.hasClass('swiper-button-disabled') == false) ||
                ($(event.target).hasClass('swiper-pagination-bullet') && 
                $(event.target).eq(1) && 
                $(event.target).hasClass('swiper-pagination-bullet-active') == false)
            ) {
            let ind = btn.closest('.flat-card').attr('data-index');
            flatCardNextClick(ind);
        }
    }

    if ( window.location == '/' ) {
        document.getElementById('catalog').addEventListener('click', handlerFlatCardPrevClick);
        document.getElementById('catalog').addEventListener('click', handlerFlatCardNextClick);
    }




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

    const constructionSwiper = new Swiper('#construction-slider .swiper-container', {
        navigation: {
            nextEl: '#construction-slider .swiper-button-next',
            prevEl: '#construction-slider .swiper-button-prev',
        },
        pagination: {
            el: '#construction-slider .swiper-pagination',
            type: 'bullets',
            clickable: true,
        }
    });

    // $(".flat-card").each(function(index, element){
    //     var $this = $(this);
    //     $this.addClass("instance-" + index);
    //     $this.find(".swiper-button-prev").addClass("btn-prev-" + index);
    //     $this.find(".swiper-button-next").addClass("btn-next-" + index);
    //     $this.find(".swiper-pagination").addClass("pagination-" + index);
    //     var swiper = new Swiper(".instance-" + index + " .swiper-container", {
    //         navigation: {
    //             nextEl: ".btn-next-" + index,
    //             prevEl: ".btn-prev-" + index,
    //         },
    //         pagination: {
    //             el: ".pagination-" + index,
    //             type: 'bullets',
    //             clickable: true,
    //         }
    //     });
    // });

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
//////////////////////////////////////////////////////////////////////////////
///////////////////////////// слайдеры: конец ///////////////////////////////
//////////////////////////////////////////////////////////////////////////////

    const filter = FilterForm({
        containerUrl: '.plans',
        actionName: AJAX_REQUEST_SUBMIT_FILTER,
        containerForRenderingUrl: '.plans__flats-wrapper',
        moreBtnUrl: '[data-object="filter_more"]',
        eventName: 'filter-event'
    });
    if ( window.location == '/' ) {
        filter.init();
        filter.manage();
    }

    const historyBuildinig = EventsForm({
        containerUrl: '#construction .section-content', 
        containerSelectUrl: '.select-block select', 
        containerTextUrl: '.construction__info-inside', 
        containerSliderUrl: '#construction .construction-slider__slides.swiper-wrapper',// '#construction-slider .swiper-container', 
        actionName: AJAX_REQUEST_SUBMIT_EVENT, 
        eventName: 'bulding-event',
    });
    if ( window.location == '/' ) {
        historyBuildinig.init();
        historyBuildinig.manage();
    }
});

function smoothLink(event) {

    function move(url) {
        const target = document.querySelector(url);
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });        
    }

    if (event.target.classList.contains('smooth-link')) { // click on <li>
        const child = event.target.firstElementChild;
        event.preventDefault();
        move(child.getAttribute('href'));
    }
    if (event.target.parentElement.classList.contains('smooth-link')) { // click on <a>
        event.preventDefault();
        move(event.target.getAttribute('href'));
    }
    if (event.target.dataset.link) { // click on simple link
        const linkString = event.target.getAttribute('href');
        if ( linkString.indexOf('http') == -1 ) { // нет совпадений - якорь
            event.preventDefault();
            move(event.target.getAttribute('href'));
        } else {
            window.location = event.target.getAttribute('href');
        }
         
    }
}



