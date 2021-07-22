<?php
	/*
        Template Name: Главная
		Template PostType: page
	*/
?>
<?php get_header(); ?>

    <div class="bg-ptn1"></div>
    <div class="bg-ptn2"></div>

    <div class="work-area main-page">

    <?php get_template_part( 'head' ); ?>

        <section class="main-slider">
            <div class="section-content">
                <div class="container-main-slider">
                    <div class="main-slider__wrapper">
                        <?php
                            // wp_reset_postdata();
                            $offers_args = array( // получает любые записи
                                'numberposts' => -1,
                                'orderby'     => 'date',
                                'order'       => 'ASC',
                                'post_status' => 'publish',
                                'post_type'   => 'offers', // тип получаемых записей
                                // 'suppress_filters' => true, // подавление работы фильтров изменения SQL запроса
                            ); 
                            $offers = get_posts($offers_args);
                            $offers_count = 0;
                        ?>
                        <?php
                            foreach ($offers as $offer) {
                                setup_postdata($offer);
                                $offer_data = get_field_objects( $offer->ID );
                                // var_dump( $offer_data['lids']['value']['value'] == 'yep' );
                        ?>
                        <div class="main-slider__slide <?php if ($offers_count == 0) { echo 'active'; }; ?>">
                            <div class="image-block__slide">
                                <img src="<?php echo get_the_post_thumbnail_url( $offer->ID ); ?>">
                            </div>
                            <div class="info-block__slide">
                                <div class="info-slide__inside">

                                        <?php echo $offer_data['name']['value']; ?>

                                    <div class="info-slide__subtitle"><?php echo $offer_data['subtitle']['value']; ?></div>
                                    <a 
                                        class="btn1<?php isset( $offer_data['lids']['choices'] ) ? ' form-open' : ''; ?>" 
                                        data-attr="<?php echo $offer_data['attr']['value']; ?>"
                                        <?php
                                            if ( $offer_data['lids']['value']['value'] == 'yep' ) {
                                        ?>
                                                data-action="form-open" 
                                                data-title="<?php echo $offer_data['name']['value']; ?>"
                                        <?php
                                            } else {
                                        ?>
                                                href="<?php echo $offer_data['link']['value']; ?>"
                                                data-link="simple-link"
                                        <?php
                                            }
                                        ?>  
                                    >
                                        <?php echo $offer_data['link_name']['value']; ?>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <?php        
                                $offers_count += 1;
                            }
                        ?>

                        <div class="arrow arrow-prev disabled">
                            <img src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/arrow-prev.svg">
                        </div>
                        <div class="arrow arrow-next">
                            <img src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/arrow-next.svg">
                        </div>

                        <div class="pagination">
                            <?php
                                for ( $i = 0; $i < $offers_count; $i += 1 ) {
                            ?>
                                <div class="pagination-item <?php if ($i == 0) { echo 'active'; } ?>"></div>
                            <?php
                                }
                            ?>
                        </div>
                    </div>        
                </div>
            </div>
        </section>

        <section class="about-complex" id="complex">
            <div class="section-content">
                <div class="container">
                    <div class="section-title">о комплексе</div>
                    <div class="about-complex__info">
                        <h2 class="main-zagolovok">
                            Мечтаете о комфорте – купите дом таунхаус в пригороде Казани напрямую от застройщика!
                        </h2>
						<!--<h2>Таун-парк — современный формат загородной жизни</h2>-->
                        <p>
							<b>Вдали от суеты мегаполиса</b><br>
Место застройки выбрано с учетом максимальной близости к природе. В Лаишевском районе вы будете дышать чистым воздухом, наслаждаться размеренной, спокойной жизнью и живописным ландшафтом. Купить таунхаус в таун-парке SOKUROV в пригороде Казани без посредников от застройщика сейчас выгодно!</p>
						<p><b>Самые современные решения</b><br>
Застройка выполнена в европейском стиле: аккуратные аллеи, вдоль которых располагаются квадрохаусы и таунхаусы с кирпичной отделкой. Территория утопает в зелени, созданы все условия для комфортной жизни за городом: охраняемая территория, уютные места для прогулок с детьми, удобные парковки.

                        </p>
                        <div class="about-complex__place-note">
                            <div class="icon"><img src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/pin.svg"></div>
                            <div class="text">с.Сокуры в 15 минутах от Казани</div>
                        </div>
                    </div>
                </div>
                <div class="about-complex__image">
                    <img class="mobile" src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/k3_new.png">
                    <img class="tablet" src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/k3_new.png">
                    <img class="desktop" src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/k3_new.png">
                </div>
                <div class="about-complex__cards">
                    <div class="about-complex__cards-wrapper">
                        <div class="about-complex__card">
                            <div class="card-title">Вблизи природы</div>
                            <p>
                                Таун-парк SOKUROV расположен в селе Сокуры Лаишевского района. Живописные виды, чистый воздух, тишина и спокойствие — ради этого действительно стоит переехать за город. 
                            </p>
                        </div>
                        <div class="about-complex__card">
                            <div class="card-title">Европейская архитектура</div>
                            <p>
                                Аллеи таун-парка пропитаны атмосферой уюта: аккуратные стильные дома, малоэтажная застройка, кирпичный фасад, ландшафтное озеленение, малые архитектурные формы — всё радует глаз!
                            </p>
                        </div>
                        <div class="about-complex__card">
                            <div class="card-title">Охраняемый комплекс</div>
                            <p>
                                Будьте спокойны за себя и свою семью: закрытая территория и видеонаблюдение на территории таун-парка SOKUROV обеспечивает вашу безопасность 24 часа в сутки.
                            </p>
                        </div>
                    </div>
                </div> 
            </div>  
        </section>

        <section class="alley" id="alley">
            <div class="section-content">
                <div class="container">
                    <div class="section-title white">живописная аллея</div>
                    <div class="alley-info">
                        <h2 class="main-zagolovok-white white">Выбирайте таунхаус: даже в пригороде Казани вы остаетесь в центре активной жизни!</h2>
						<!--<h2>Всё для актив​ной жизни</h2>-->
                        <p class="white">
                            Отдых для всей семьи продуман в таунхаусе в пригороде Казани до мелочей: здесь созданы все условия для занятий спортом, прогулок и развлечений. От самых маленьких до пожилых – для каждого жителя таун-парка найдется занятие по душе!
                        </p>
                    </div>
                </div>

                <div class="alley-slider" id="alley-slider">
                    <div class="alley-slider-wrapper swiper-container">
                        <div class="alley-slides-wrapper swiper-wrapper">
                            <div class="alley-slide swiper-slide"><img src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/pic_park_001.jpg"></div>
                            <div class="alley-slide swiper-slide"><img src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/pic_park_002.jpg"></div>
                            <div class="alley-slide swiper-slide"><img src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/pic_park_003.jpg"></div>
                            <div class="alley-slide swiper-slide"><img src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/pic_park_004.jpg"></div>
                        </div>
                    </div>

                    <div class="arrow arrow-prev swiper-button-prev">
                        <img src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/arrow-prev.svg">
                    </div>
                    <div class="arrow arrow-next swiper-button-next">
                        <img src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/arrow-next.svg">
                    </div>

                    <div class="pagination swiper-pagination">
                        <!-- <div class="pagination-item active"></div>
                        <div class="pagination-item"></div>
                        <div class="pagination-item"></div>
                        <div class="pagination-item"></div> -->
                    </div>
                </div>

                <div class="alley-interactive desktop">
                    <div class="interactive__image">
                        <img src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/к0.jpg">
                    </div> 
                    <div class="plus plus1 right-photo">
                        <img class="plus__img" src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/plus.svg">
                        <div class="plus__photo">
                            <img src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/pic_park_001.jpg">
                        </div>
                    </div>
                    <div class="plus plus2 right-photo">
                        <img class="plus__img" class="plus__img" src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/plus.svg">
                        <div class="plus__photo">
                            <img src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/pic_park_002.jpg">
                        </div>
                    </div>
                    <div class="plus plus3 left-photo">
                        <img class="plus__img" src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/plus.svg">
                        <div class="plus__photo">
                            <img src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/pic_park_003.jpg">
                        </div>
                    </div>
                    <div class="plus plus4 left-photo">
                        <img class="plus__img" src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/plus.svg">
                        <div class="plus__photo">
                            <img src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/pic_park_004.jpg">
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="presentation" id="presentation">
            <div class="section-content">
                <div class="container">
                    <div class="presentation__info">
                        <div class="section-title">Информация</div> <!-- презентация PDF -->
                        <h1>Хотите узнать больше о&nbsp;таун-парке SOKUROV?</h1>
                        <p style="display: none;">Скачайте подробную презентацию, заполнив небольшую форму</p>
                    </div>
                    <div class="presentaton-image" style="display: none;"><img src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/presentation.png"></div>
                    <div class="form-presentation-card">
                        <form id="presentation-form">
                            <input type="hidden" name="title" value="Скачали презентацию">
                            <input class="text-input" type="text" name="name" placeholder="Ваше имя">
                            <input class="text-input phonemask" type="phone" name="phone" placeholder="Ваш телефон">
                            <div class="check-block">
                                <input type="checkbox" name="" checked="checked">
                                <label>Согласен на <a href="https://novastroyrt.ru/politika-konfidenczialnosti/?preview=true" target="_blank">обработку персональных данных</a></label>
                            </div>
                            <button class="btn2">отправить</button>
                        </form>
                        <div class="form-presentation__success">
                            Спасибо!<br>
                            Данные успешно отправлены.
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="houses-types" id="houses-types">
            <div class="section-content">
                <div class="container">
                    <div class="section-title white">виды домов</div>
                    <div class="houses-types__info">
                        <h2 class="main-zagolovok-white white">Купите дом в таун-парке в Лаишевском районе Казани – оцените уникальное сочетание загородной жизни и городского комфорта!</h2>
						<!--<h2>Таунхаусы и квадрохаусы</h2>-->
                        <p class="white">
                           Вы можете <b>купить дом в Лаишевском районе Казани</b>, выбрав один из двух вариантов. Отдельный собственный дом в два этажа, построенный по принципу городской квартиры, со всеми удобствами, отдельным входом, собственным участком и парковкой – таунхаус. Или дом на четыре семьи, для тесного общения и крепкой дружбы с добрыми соседями – квадрохаус. Вам нужно только выбрать!
                        </p>
                    </div> 
                    <a href="#catalog" class="scrollto btn3">к планировкам</a>   
                </div>
                <div class="houses-types__image">
                    <img class="mobile" src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/rndr_6.jpg">
                    <img class="tablet" src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/rndr_6.jpg">
                    <img class="desktop" src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/rndr_6.jpg">
                </div>
                <div class="houses-types__cards">
                    <div class="houses-types__cards-wrapper">
                        <div class="houses-types__card">
                            <div class="card-title">Двухэтажные таунхаусы </div>
                            <p>
                                Почувствуйте настоящую свободу и комфорт в собственном двухэтажном доме! Парковка на два автомобиля, отдельный вход, небольшой дворик у дома — всё в лучших традициях загородного жилья. 
                            </p>
                        </div>
                        <div class="houses-types__card">
                            <div class="card-title">квадрохаусы</div>
                            <p>
                                Квадрохаусы состоят из 4 секций и рассчитаны всего на 4 семьи. Здесь вы знаете всех своих соседей, а у ваших детей будет больше друзей — в таун-парке царит особая атмосфера теплоты и добрососедства!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="catalog" id="catalog">
            <div class="section-content">
                <div class="container">
                    <div class="section-title">выбор планировки</div>
                    <div class="houses-types__info">
                        <h2 class="main-zagolovok">Любимая европейцами планировка таунхауса в черте города Казани теперь доступна и вам!</h2>
						<!--<h2>Заголовок для продвижения</h2>-->
                        <p>
                            Таун-парк  SOKUROV предлагает много вариантов планировки таунхауса в черте города Казани. Здесь воплощены самые удачные идеи планировки жилых домов, реализованные в Европе. Мы отобрали для вас только лучшее! Вы можете приобрести трех-, четырех- и пятикомнатные таунхаусы площадью от 81,61 кв.м до 113,76 кв.м.
                        </p>
                    </div> 
                    <a href="<?php echo home_url(); ?>/wp-content/themes/sokurov_theme/docs/prez.pdf" class="btn5 desktop plans-dwnld" download style="opacity: 0;">скачать презентацию</a>

                    <div class="plans">
                        <div class="plans__filter">
                            <div class="filter__type">
                                <div class="filter-type__btn active" data-object="filter_type" data-value="toun">таунхаусы</div>
                                <div class="filter-type__btn" data-object="filter_type" data-value="qvadro">квадрохаусы</div>
                            </div>
                            <div class="filter__rooms">
                                <div class="label">Кол-во комнат</div>
                                <div class="filter-room__btns">
<!--                                     <div class="filter-room__btn active" data-object="filter_rooms" data-value="3">3</div> -->
                                    <div class="filter-room__btn active" data-object="filter_rooms" data-value="4">4</div>
                                    <div class="filter-room__btn" data-object="filter_rooms" data-value="5">5</div>
									<div class="filter-room__btn" data-object="filter_rooms" data-value="6">6</div>
                                </div>
                            </div>
                        </div>
                        <div class="plans__flats-wrapper">
                            <div class="flat-card">
                                <div class="flat-card__top">
                                    <div class="floor">1 / 2 этаж</div>
                                    <div class="arrows">
                                        <div class="arrow arrow-prev swiper-button-prev">
                                            <img src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/arrow-prev-black.svg">
                                        </div>
                                        <div class="arrow arrow-next swiper-button-next">
                                            <img src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/arrow-next-black.svg">
                                        </div>
                                    </div>
                                </div>
                                <div class="plan-images-slider swiper-container">
                                    <div class="plan-images-wrapper swiper-wrapper">
                                        <div class="plan-image swiper-slide"><img src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/plan.svg"></div>
                                        <div class="plan-image swiper-slide"><img src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/plan.svg"></div>
                                    </div>
                                    <div class="pagination swiper-pagination"></div>
                                </div>
                                <div class="flat-info">
                                    <div class="flat-info__plan">
                                        <div class="flat-info__title">Планировка</div>
                                        <div class="flat-info__value">5А.1-1</div>
                                    </div>
                                    <div class="flat-info__area">
                                        <div class="flat-info__title">Площадь</div>
                                        <div class="flat-info__value">150 м<sup>2</sup></div>
                                    </div>
                                </div>
                                <div class="btn5 form-open">узнать цену</div>
                            </div>
                            <div class="flat-card">
                                <div class="flat-card__top">
                                    <div class="floor">1 / 2 этаж</div>
                                    <div class="arrows">
                                        <div class="arrow arrow-prev swiper-button-prev">
                                            <img src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/arrow-prev-black.svg">
                                        </div>
                                        <div class="arrow arrow-next swiper-button-next">
                                            <img src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/arrow-next-black.svg">
                                        </div>
                                    </div>
                                </div>
                                <div class="plan-images-slider swiper-container">
                                    <div class="plan-images-wrapper swiper-wrapper">
                                        <div class="plan-image swiper-slide"><img src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/plan.svg"></div>
                                        <div class="plan-image swiper-slide"><img src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/plan.svg"></div>
                                    </div>
                                    <div class="pagination swiper-pagination"></div>
                                </div>
                                <div class="flat-info">
                                    <div class="flat-info__plan">
                                        <div class="flat-info__title">Планировка</div>
                                        <div class="flat-info__value">5А.1-1</div>
                                    </div>
                                    <div class="flat-info__area">
                                        <div class="flat-info__title">Площадь</div>
                                        <div class="flat-info__value">150 м<sup>2</sup></div>
                                    </div>
                                </div>
                                <div class="btn5 form-open">узнать цену</div>
                            </div>
                            <div class="flat-card">
                                <div class="flat-card__top">
                                    <div class="floor">1 / 2 этаж</div>
                                    <div class="arrows">
                                        <div class="arrow arrow-prev swiper-button-prev">
                                            <img src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/arrow-prev-black.svg">
                                        </div>
                                        <div class="arrow arrow-next swiper-button-next">
                                            <img src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/arrow-next-black.svg">
                                        </div>
                                    </div>
                                </div>
                                <div class="plan-images-slider swiper-container">
                                    <div class="plan-images-wrapper swiper-wrapper">
                                        <div class="plan-image swiper-slide"><img src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/plan.svg"></div>
                                        <div class="plan-image swiper-slide"><img src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/plan.svg"></div>
                                    </div>
                                    <div class="pagination swiper-pagination"></div>
                                </div>
                                <div class="flat-info">
                                    <div class="flat-info__plan">
                                        <div class="flat-info__title">Планировка</div>
                                        <div class="flat-info__value">5А.1-1</div>
                                    </div>
                                    <div class="flat-info__area">
                                        <div class="flat-info__title">Площадь</div>
                                        <div class="flat-info__value">150 м<sup>2</sup></div>
                                    </div>
                                </div>
                                <div class="btn5 form-open">узнать цену</div>
                            </div>
                            <div class="flat-card">
                                <div class="flat-card__top">
                                    <div class="floor">1 / 2 этаж</div>
                                    <div class="arrows">
                                        <div class="arrow arrow-prev swiper-button-prev">
                                            <img src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/arrow-prev-black.svg">
                                        </div>
                                        <div class="arrow arrow-next swiper-button-next">
                                            <img src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/arrow-next-black.svg">
                                        </div>
                                    </div>
                                </div>
                                <div class="plan-images-slider swiper-container">
                                    <div class="plan-images-wrapper swiper-wrapper">
                                        <div class="plan-image swiper-slide"><img src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/plan.svg"></div>
                                        <div class="plan-image swiper-slide"><img src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/plan.svg"></div>
                                    </div>
                                    <div class="pagination swiper-pagination"></div>
                                </div>
                                <div class="flat-info">
                                    <div class="flat-info__plan">
                                        <div class="flat-info__title">Планировка</div>
                                        <div class="flat-info__value">5А.1-1</div>
                                    </div>
                                    <div class="flat-info__area">
                                        <div class="flat-info__title">Площадь</div>
                                        <div class="flat-info__value">150 м<sup>2</sup></div>
                                    </div>
                                </div>
                                <div class="btn5 form-open">узнать цену</div>
                            </div>
                            <div class="flat-card">
                                <div class="flat-card__top">
                                    <div class="floor">1 / 2 этаж</div>
                                    <div class="arrows">
                                        <div class="arrow arrow-prev swiper-button-prev">
                                            <img src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/arrow-prev-black.svg">
                                        </div>
                                        <div class="arrow arrow-next swiper-button-next">
                                            <img src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/arrow-next-black.svg">
                                        </div>
                                    </div>
                                </div>
                                <div class="plan-images-slider swiper-container">
                                    <div class="plan-images-wrapper swiper-wrapper">
                                        <div class="plan-image swiper-slide"><img src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/plan.svg"></div>
                                        <div class="plan-image swiper-slide"><img src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/plan.svg"></div>
                                    </div>
                                    <div class="pagination swiper-pagination"></div>
                                </div>
                                <div class="flat-info">
                                    <div class="flat-info__plan">
                                        <div class="flat-info__title">Планировка</div>
                                        <div class="flat-info__value">5А.1-1</div>
                                    </div>
                                    <div class="flat-info__area">
                                        <div class="flat-info__title">Площадь</div>
                                        <div class="flat-info__value">150 м<sup>2</sup></div>
                                    </div>
                                </div>
                                <div class="btn5 form-open">узнать цену</div>
                            </div>
                            <div class="flat-card">
                                <div class="flat-card__top">
                                    <div class="floor">1 / 2 этаж</div>
                                    <div class="arrows">
                                        <div class="arrow arrow-prev swiper-button-prev">
                                            <img src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/arrow-prev-black.svg">
                                        </div>
                                        <div class="arrow arrow-next swiper-button-next">
                                            <img src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/arrow-next-black.svg">
                                        </div>
                                    </div>
                                </div>
                                <div class="plan-images-slider swiper-container">
                                    <div class="plan-images-wrapper swiper-wrapper">
                                        <div class="plan-image swiper-slide"><img src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/plan.svg"></div>
                                        <div class="plan-image swiper-slide"><img src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/plan.svg"></div>
                                    </div>
                                    <div class="pagination swiper-pagination"></div>
                                </div>
                                <div class="flat-info">
                                    <div class="flat-info__plan">
                                        <div class="flat-info__title">Планировка</div>
                                        <div class="flat-info__value">5А.1-1</div>
                                    </div>
                                    <div class="flat-info__area">
                                        <div class="flat-info__title">Площадь</div>
                                        <div class="flat-info__value">150 м<sup>2</sup></div>
                                    </div>
                                </div>
                                <div class="btn5 form-open">узнать цену</div>
                            </div>
                        </div>
                        <div class="btn2" data-object="filter_more" data-value="more-plans">больше планировок</div>
                    </div>
                </div>
            </div>
        </section>

        <section class="payment" id="payment">
            <div class="section-content">
                <div class="container">
                    <h1>Способы покупки</h1>
                    <div class="payment-cards">
                        <?php
                            // wp_reset_postdata();
                            $payments_args = array( // получает любые записи
                                'numberposts' => -1,
                                'orderby'     => 'date',
                                'order'       => 'ASC',
                                'post_status' => 'publish',
                                'post_type'   => 'payments', // тип получаемых записей
                                // 'suppress_filters' => true, // подавление работы фильтров изменения SQL запроса
                            ); 
                            $payments = get_posts($payments_args);
                            $payments_count = 0;
                        ?>
                        <?php
                            foreach ($payments as $payment) {
                                setup_postdata($payment);
                                $payment_data = get_field_objects( $payment->ID );
                        ?>
                        <div class="payment-card">
                            <div class="card-title"><?php echo $payment_data['title']['value']; ?></div>
                            <p>
                                <?php echo $payment_data['content']['value']; ?>
                            </p>
                        </div>
                        <?php        
                                $payments_count += 1;
                            }
                        ?>
                        <!--<div class="payment-card">-->
                        <!--    <div class="card-title">Рассрочка от Застройщика</div>-->
                        <!--    <p>-->
                        <!--        Вы оплачиваете первоначальный взнос (не менее 50%), а оставшуюся суммы вносите равными платежами в течение нескольких месяцев без переплат. -->
                        <!--    </p>-->
                        <!--</div>-->
                        <!--<div class="payment-card">-->
                        <!--    <div class="card-title">Трейд-ин</div>-->
                        <!--    <p>-->
                        <!--        Программа “Трейд-ин” позволяет максимально быстро и выгодно приобрести новую квартиру , вырученные с продажи старого жилья. -->
                        <!--    </p>-->
                        <!--</div>-->
                    </div>
                    <div class="btn5 form-open" data-action="form-open" data-title="Консультация">консультация</div>
                </div>
            </div>
        </section>

		<?php
			wp_reset_postdata();
			$event_args = array( // получает любые записи
				'numberposts' => -1,
				'orderby'     => 'date',
				'order'       => 'DESC',
				'post_status' => 'publish',
				'post_type'   => 'event', // тип получаемых записей
				// 'suppress_filters' => true, // подавление работы фильтров изменения SQL запроса
			); 
			$events = get_posts($event_args);
			$events_count = 0;
			
			if (count($events) > 0) {
		?>
        <section class="construction" id="construction">
            <div class="section-content">
                <div class="container">
                    <h1 class="white">Ход строительства</h1>
                    <div class="select-block">
                        <select name="">
                            <?php
                                foreach ($events as $event) {
                                    setup_postdata($event);
                                    
                                    $event_data = get_field_objects( $event->ID );
									var_dump($event_data['video']['value']);
                            ?>
                                <option value="<?php echo $event_data['date']['value']; ?>" data-plan-index="<?php echo $event->ID; ?>" <?php if ($events_count == 0) { echo 'selected="selected"'; } ?>><?php echo $event_data['date']['value']; ?></option>
                            <?php        
                                    $events_count += 1;
                                }
                                
                                $first_event = $events[0];
                                
                                $gal = get_post_gallery( $first_event->ID, false );
                                // print_r(count($gal[src]));
                                $images = array();
                                for($i = 0; $i < count($gal[src]); $i++){
                                    $item = $gal[src][$i];
                                    array_push($images, $item);
                                };
                            ?>
                       </select>
                    </div>
                </div>
                <div class="container-tablet">
                    <div class="construction__data">
                        <div class="construction__slider" id="construction-slider">
                            <div class="construction-slider__wrapper swiper-container">
                                <div class="construction-slider__slides swiper-wrapper">
                                    <?php
                                        foreach ($images as $image) {
                                    ?>
                                        <div class="construction-slider__slide swiper-slide">
                                            <img src="<?php echo $image; ?>">
                                        </div>
                                    <?php
                                        }
										if ($event_data['video']['value']) {
									?>
										<div class="construction-slider__slide swiper-slide">
											<iframe width="100%" height="100%" src="<?php echo $event_data['video']['value'] ?>" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                        </div>
									<?php
										}
                                    ?>
                                </div>
                            </div>

                            <div class="arrow arrow-prev swiper-button-prev">
                                <img class="mobile" src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/arrow-prev.svg">
                                <img class="tab-desk" src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/arrow-prev-black.png">
                            </div>
                            <div class="arrow arrow-next swiper-button-next">
                                <img class="mobile" src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/arrow-next.svg">
                                <img class="tab-desk" src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/arrow-next-black.png">
                            </div>

                            <div class="pagination swiper-pagination">
                                <!-- <div class="pagination-item active"></div>
                                <div class="pagination-item"></div>
                                <div class="pagination-item"></div> -->
                            </div>
                        </div>
                        <div class="construction__info">
                            <div class="construction__info-inside">
                                <?php
                                    // var_dump($first_event);
                                    echo strip_shortcodes( $first_event->post_content );
                                ?>
                            </div>
                            <div class="limiter limiter-top desktop"></div>
                            <div class="limiter limiter-bottom desktop"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
		<?php
			}
		?>

		<?php
			wp_reset_postdata();
			$news_args = array( // получает любые записи
				'numberposts' => -1,
				'orderby'     => 'date',
				'order'       => 'DESC',
				'post_status' => 'publish',
				'post_type'   => 'news', // тип получаемых записей
				// 'suppress_filters' => true, // подавление работы фильтров изменения SQL запроса
			); 
			$all_news = get_posts($news_args);
			if ( count($all_news) > 0 ) {
		?>
        <section class="news" id="news">
            <div class="section-content">
                <div class="container">
                    <h1 class="white">Новости проекта</h1>
                    <div class="news__slider" id="news-slider">
                        <div class="news__slider-top">
                            <div class="count swiper-pagination"></div>
                            <div class="arrows">
                                <div class="arrow arrow-prev swiper-button-prev"><img src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/arrow-prev.svg"></div>
                                <div class="arrow arrow-next swiper-button-next"><img src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/arrow-next.svg"></div>
                            </div>
                        </div>
                        <div class="news__slider-wrapper swiper-container">
                            <div class="news__slider-slides swiper-wrapper">
                                <?php
                                    foreach ($all_news as $news) {
                                        setup_postdata($news);
                                ?>
                                <div class="news__slider-slide swiper-slide">
                                    <div class="news-card">
                                        <div class="news-card__title">
                                            <?php echo wp_trim_words( get_the_title( $news->ID ), 10, '...' ); ?>
                                        </div>
                                        <p>
                                            <?php
                                                if ($news->post_excerpt) {
                                                    echo wp_trim_words(get_the_excerpt( $news->ID ), 20, '...');
                                                } else {
                                                    $sub_content = get_the_content();
                                                    $my_sub_content = wp_trim_words($sub_content, 20, '...');
                                                    echo $my_sub_content;
                                                }
                                            ?>
                                        </p>
                                        <div class="date"><?php echo get_the_date('j F Y'); ?></div>
                                        <a href="<?php echo get_the_permalink( $news->ID ); ?>" class="btn5 more">подробнее</a>
                                    </div>
                                </div>
                                <?php
                                    }
                                ?>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
		<?php
			}
		?>

        <section class="infrastructure" id="infrastructure">
            <div class="section-content">
                <div class="container">
                    <div class="infrastructure__wrapper">
                        <div class="infrastructure__info">
                            <h1>Развитая инфраструктура</h1>
                            <p>
                                Больше не придется тратить время на дорогу: в шаговой доступности расположены магазины, школы и детские сады, остановки пяти рейсовых автобусов.
                            </p>
                        </div>
                        <div class="infrastructure__items">
                            <div class="infrastructure__item">
                                <div class="item-icon icon1" data-location="school"><img src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/school-icon.svg"></div>
                                <div class="item-name" data-location="school">Школа</div>
                            </div>
                            <div class="infrastructure__item">
                                <div class="item-icon icon2" data-location="kindergarten"><img src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/kindergarden-icon.svg"></div>
                                <div class="item-name" data-location="kindergarten">детский сад</div>
                            </div>
                            <div class="infrastructure__item">
                                <div class="item-icon icon3" data-location="market"><img src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/store-icon.svg"></div>
                                <div class="item-name" data-location="market">магазин</div>
                            </div>
                            <div class="infrastructure__item">
                                <div class="item-icon icon4" data-location="bus-station"><img src="<?php echo get_template_directory_uri(); ?>/dist/images/main-page/stop-icon.svg"></div>
                                <div class="item-name" data-location="bus-station">Остановка</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="infrastructure__map" id="map">
                    <!-- <img class="mobile" src="images/main-page/map-mobile.jpg">
                    <img class="tablet" src="images/main-page/map-tablet.jpg">
                    <img class="desktop" src="images/main-page/map-desktop.jpg"> -->
                </div>
            </div>
        </section>

<?php get_footer(); ?>