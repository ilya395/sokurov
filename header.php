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
	<link rel="canonical" href="https://sokurovpark.ru/">
	<meta name="yandex-verification" content="f8f8420294e9d972" />
    <meta name="google-site-verification" content="30vdtt3rXw9A2G_Mc6yVg6FZUGAo3DDxGgJ4AiVvU64" />
	
    <style>
        .preloader {
            position: fixed;
            display: flex;
            width: 100%;
            height: 100%;
            background-color: #F0F0F0;
            top: 0;
            left: 0;
            z-index: 10000;
        }
        .lds-ripple {
          display: block;
          position: relative;
          margin: auto;
          width: 80px;
          height: 80px;
        }
        .lds-ripple div {
          position: absolute;
          border: 4px solid #4F738B;
          opacity: 1;
          border-radius: 50%;
          animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
        }
        .lds-ripple div:nth-child(2) {
          animation-delay: -0.5s;
        }
        @keyframes lds-ripple {
          0% {
            top: 36px;
            left: 36px;
            width: 0;
            height: 0;
            opacity: 1;
          }
          100% {
            top: 0px;
            left: 0px;
            width: 72px;
            height: 72px;
            opacity: 0;
          }
        }
    </style>
    
    <?php
    	wp_head();
    ?>
    <?php get_template_part( 'includes/counters' ); ?>
</head>
<body>
    <script>
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
        });
        
        window.onload = function() {
            preloader.style.opacity = '0';
        };
    </script>
    <div class="preloader" id="preloader">
        <div class="lds-ripple"><div></div><div></div></div>  
    </div>

