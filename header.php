<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset') ?>">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title><?php bloginfo('name') . ' | ' . wp_get_document_title(); ?></title>
    
    <link rel="icon" sizes="16x16" href="<?php echo get_template_directory_uri() . '/favs/favicon.ico' ?>" type="image/x-icon" />
    <link rel="shortcut icon" sizes="16x16" href="<?php echo get_template_directory_uri() . '/favs/favicon.ico' ?>" type="image/x-icon" />
    <link rel="icon" sizes="32x32" href="<?php echo get_template_directory_uri() . '/favs/152.png' ?>" type="image/x-icon" />
    <link rel="shortcut icon" sizes="32x32" href="<?php echo get_template_directory_uri() . '/favs/152.png' ?>" type="image/x-icon" />
    
    <style>
        .preloader {
            position: fixed;
            width: 100%;
            height: 100%;
            background-color: #F0F0F0;
            top: 0;
            left: 0;
            z-index: 10000;
        }
        
        .preloader .marquee__inside {
            height: 6.25vh;
            width: 300vw;
            background-image: url(<?php echo get_template_directory_uri(); ?>/dist/images/main-page/logo-preloader.svg);
            background-repeat: repeat-x;
            background-size: auto 100%;
        }
        .preloader .preloader__logo {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
        }
        
        .preloader__logo img {
            width: 500px;
            margin: auto;
        }
    </style>
    
    <?php
    	wp_head();
    ?>
</head>
<body>
    <script>
        (function() {
            var FX = {
                easing: {
                    linear: function(progress) {
                        return progress;
                    },
                    quadratic: function(progress) {
                        return Math.pow(progress, 2);
                    },
                    swing: function(progress) {
                        return 0.5 - Math.cos(progress * Math.PI) / 2;
                    },
                    circ: function(progress) {
                        return 1 - Math.sin(Math.acos(progress));
                    },
                    back: function(progress, x) {
                        return Math.pow(progress, 2) * ((x + 1) * progress - x);
                    },
                    bounce: function(progress) {
                        for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
                            if (progress >= (7 - 4 * a) / 11) {
                                return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2);
                            }
                        }
                    },
                    elastic: function(progress, x) {
                        return Math.pow(2, 10 * (progress - 1)) * Math.cos(20 * Math.PI * x / 3 * progress);
                    }
                },
                animate: function(options) {
                    var start = new Date;
                    var id = setInterval(function() {
                        var timePassed = new Date - start;
                        var progress = timePassed / options.duration;
                        if (progress > 1) {
                            progress = 1;
                        }
                        options.progress = progress;
                        var delta = options.delta(progress);
                        options.step(delta);
                        if (progress == 1) {
                            clearInterval(id);
                            options.complete();
                        }
                    }, options.delay || 10);
                },
                fadeOut: function(element, options) {
                    var to = 1;
                    this.animate({
                        duration: options.duration,
                        delta: function(progress) {
                            progress = this.progress;
                            return FX.easing.swing(progress);
                        },
                        complete: options.complete,
                        step: function(delta) {
                            element.style.opacity = to - delta;
                        }
                    });
                },
                fadeIn: function(element, options) {
                    var to = 0;
                    this.animate({
                        duration: options.duration,
                        delta: function(progress) {
                            progress = this.progress;
                            return FX.easing.swing(progress);
                        },
                        complete: options.complete,
                        step: function(delta) {
                            element.style.opacity = to + delta;
                        }
                    });
                }
            };
            window.FX = FX;
        })()
        
        var preloader = '';
        
        window.addEventListener('DOMContentLoaded', function() {
            preloader = document.getElementById('preloader');
            preloader.style.transition = '0.3s all linear';
            function handler() {
                preloader.style.display = 'none';
                preloader.style.zIndex = '-9999';
                preloader.removeEventListener('transitionend', handler);
            }
            preloader.addEventListener('transitionend', handler);
            console.log(preloader);            
        });
        
        window.onload = function() {
            // FX.fadeOut(document.getElementById('preloader'), { // вываливается с ошибкой
            //     duration: 1000
            // });
            console.log(preloader)
            preloader.style.opacity = '0';
        };
    </script>
    <div class="preloader" id="preloader">
        <marquee behavior="alternate" scrollamount="3" loop="4">
            <div class="marquee__inside"></div>
        </marquee>
        <marquee behavior="alternate" scrollamount="3" direction="right" loop="4">
            <div class="marquee__inside"></div>
        </marquee>
        <marquee behavior="alternate" scrollamount="3" loop="4">
            <div class="marquee__inside"></div>
        </marquee>
        <marquee behavior="alternate" scrollamount="3" direction="right" loop="4">
            <div class="marquee__inside"></div>
        </marquee>
        <marquee behavior="alternate" scrollamount="3" loop="4">
            <div class="marquee__inside"></div>
        </marquee>
        <marquee behavior="alternate" scrollamount="3" direction="right" loop="4">
            <div class="marquee__inside"></div>
        </marquee>
        <marquee behavior="alternate" scrollamount="3" loop="4">
            <div class="marquee__inside"></div>
        </marquee>
        <marquee behavior="alternate" scrollamount="3" direction="right" loop="4">
            <div class="marquee__inside"></div>
        </marquee>
        <marquee behavior="alternate" scrollamount="3" loop="4">
            <div class="marquee__inside"></div>
        </marquee>
        <marquee behavior="alternate" scrollamount="3" direction="right" loop="4">
            <div class="marquee__inside"></div>
        </marquee>
        <marquee behavior="alternate" scrollamount="3" loop="4">
            <div class="marquee__inside"></div>
        </marquee>
        <marquee behavior="alternate" scrollamount="3" direction="right" loop="4">
            <div class="marquee__inside"></div>
        </marquee>
        <marquee behavior="alternate" scrollamount="3" loop="4">
            <div class="marquee__inside"></div>
        </marquee>
        <marquee behavior="alternate" scrollamount="3" direction="right" loop="4">
            <div class="marquee__inside"></div>
        </marquee>
        <marquee behavior="alternate" scrollamount="3" loop="4">
            <div class="marquee__inside"></div>
        </marquee>
        <marquee behavior="alternate" scrollamount="3" direction="right" loop="4">
            <div class="marquee__inside"></div>
        </marquee>
        <div class="preloader__logo"><img src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/logo.svg"></div>  
    </div>

