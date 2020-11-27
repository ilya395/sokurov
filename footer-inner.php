
        <?php
            $site_info = get_field_objects( 29 );
        ?>
        <footer>
            <div class="section-content">
                <div class="container">
                    <div class="footer__wrapper">
                        <div class="footer__logo"><img src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/logo.svg"></div>
                        <div class="footer__info">
                            Офис продаж:<br>
                            <?php echo $site_info['address']['value']; ?>
                        </div>
                        <?php 
                            $menu_args = array(
                                'theme location' => 'bottom',
                                'container'       => 'false',
                                'container_class' => '', 
                                'container_id'    => '',
                                'menu_class'      => 'menu', 
                                'menu_id'         => '',
                                'items_wrap'      => '<ul class="footer__menu">%3$s</ul>', 
                            );
                            wp_nav_menu($menu_args); 
                        ?>
                        <div class="footer__socials">
                            <div class="social-item"><img src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/facebook.svg"></div>
                            <div class="social-item"><img src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/facebook.svg"></div>
                            <div class="social-item"><img src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/vk.svg"></div>
                        </div>
                        <div class="footer__note">
                            Сайт носит информационный характер и не является публичной офертой согласно положениям Статьи 437 Гражданского кодекса Российской Федерации.
                        </div>
                        <div class="divider"></div>
                        <div class="gorilla"><img src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/gorilla.svg"></div>
                        <div class="footer__p fp1">Сделано в Gorilla company</div>
                        <div class="footer__p fp2">© 2020. Все права защищены</div>
                    </div>
                </div>
            </div>
        </footer>


        <div class="modal-menu">
            <div class="modal-menu__wrapper">
                <div class="modal-menu__inside">
                    <?php 
                        $menu_args = array(
                            'theme location' => 'bottom',
                            'container'       => 'false',
                            'container_class' => '', 
                            'container_id'    => '',
                            'menu_class'      => 'menu', 
                            'menu_id'         => '',
                            'items_wrap'      => '<ul class="modal-menu__list">%3$s</ul>', 
                        );
                        wp_nav_menu($menu_args); 
                    ?>
                    <a href="tel:<?php echo $site_info['phone']['value']; ?>" class="btn1 modal-phone"><?php echo $site_info['phone']['value']; ?></a>
                </div>
            </div>
        </div>

        <div class="modal-form">
            <div class="modal-form__wrapper">
                <div class="modal-form__card">
                    <div class="close"><img src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/close.png"></div>
                    <div class="modal-form__inside">
                        <h1>Оставьте свой номер телефона, и мы вам перезвоним</h1>
                        <form id="modal-form">
                            <input type="hidden" name="title" value="Форма обратной связи">
                            <input class="text-input" type="text" name="name" placeholder="Ваше имя">
                            <input class="text-input phonemask" type="phone" name="phone" placeholder="Ваш телефон">
                            <div class="check-block">
                                <input type="checkbox" name="agree" checked="checked">
                                <label>Согласен на <a href="#">обработку персональных данных</a></label>
                            </div>
                            <button class="btn2">отправить</button>
                        </form>
                    </div>
                    <div class="modal-form__success">
                        <h1>Спасибо!<br>Данные успешно отправлены.</h1>
                    </div>
                </div>
            </div>
        </div>

    </div>
    
    <?php
    	wp_footer();
    ?> 	
    
</body>
</html>