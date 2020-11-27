<?php
// tawn.sokurov@mail.ru
// Ate3i3(ptDIT

// хук события подклюсения скриптов
add_action('wp_enqueue_scripts', 'sokurov_wp_media');

function sokurov_wp_media() {
    wp_enqueue_style('vendors_style', get_template_directory_uri() . '/dist/css/vendors~main.2b7c828bfdf06cf41ec4.css', [], null, false);
	wp_enqueue_style('main_style', get_template_directory_uri() . '/dist/css/main.2b7c828bfdf06cf41ec4.css', [], null, false);
	
    wp_register_script( 'jq', 'https://code.jquery.com/jquery-3.4.1.min.js', null, null, true );
    wp_enqueue_script('jq');
    wp_register_script( 'api2gis', 'https://maps.api.2gis.ru/2.0/loader.js?pkg=full', null, null, true );
    wp_enqueue_script('api2gis');

	wp_enqueue_script('vendors_script', get_template_directory_uri() . '/dist/js/vendors~main.2b7c828bfdf06cf41ec4.js', ['jq', 'api2gis'], null, true);
	wp_enqueue_script('main_script', get_template_directory_uri() . '/dist/js/main.2b7c828bfdf06cf41ec4.js', ['jq', 'api2gis'], null, true);

}

// регистрация всякой шняги
add_action('after_setup_theme', 'sokurov_after_setup');

function sokurov_after_setup() {
    // меню
    register_nav_menu('top', 'Top Menu');
    register_nav_menu('bottom', 'Bottom Menu');
    // реегистрируем картинки в постах
    add_theme_support('post-thumbnails');
    // авто заполнение заголовка
    add_theme_support('title-tag');
    //
}

// цепляемся к хуку, чтобы получить url до местного обработчика ajax
add_action('wp_head', 'way_js_vars');

function way_js_vars() {
    
    $site_data = get_field_objects( 29 );
    // var_dump($site_data);
    $pr = NULL;
    if ( isset($site_data['presentation']['value']) ) {
        $pr = $site_data['presentation']['value'];
    }

    $vars = array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'presentation' => array(
                            'url' => $pr,
                            'name' => 'presentation',
                        )
    );

    echo "<script>window.wp = " . json_encode($vars) . "</script>";
};

// регистрирем новые типы записей
add_action('init', 'registering_post_type');

function registering_post_type() {
    // новости
    register_post_type('news', [
        'label'  => null,
        'labels' => [
            'name'               => 'Новости', // основное название для типа записи
            'singular_name'      => 'Новость', // название для одной записи этого типа
            'add_new'            => 'Добавить новость', // для добавления новой записи
            'add_new_item'       => 'Добавление новости', // заголовка у вновь создаваемой записи в админ-панели.
            'edit_item'          => 'Редактирование новости', // для редактирования типа записи
            'new_item'           => 'Новая новость', // текст новой записи
            'view_item'          => 'Смотреть новость', // для просмотра записи этого типа.
            'search_items'       => 'Искать новости', // для поиска по этим типам записи
            'not_found'          => 'Не найдено', // если в результате поиска ничего не было найдено
            'not_found_in_trash' => 'Не найдено в корзине', // если не было найдено в корзине
            'parent_item_colon'  => '', // для родителей (у древовидных типов)
            'menu_name'          => 'Новости', // название меню
        ],
        'description'         => '',
        'public'              => true,
        'publicly_queryable'  => null, // зависит от public
        'exclude_from_search' => null, // зависит от public
        'show_ui'             => null, // зависит от public
        'show_in_menu'        => null, // показывать ли в меню адмнки
        'show_in_admin_bar'   => null, // по умолчанию значение show_in_menu
        'show_in_nav_menus'   => null, // зависит от public
        'show_in_rest'        => null, // добавить в REST API. C WP 4.7
        'rest_base'           => null, // $post_type. C WP 4.7
        'menu_position'       => null,
        'menu_icon'           => 'dashicons-chart-area', 
        //'capability_type'   => 'post',
        //'capabilities'      => 'post', // массив дополнительных прав для этого типа записи
        //'map_meta_cap'      => null, // Ставим true чтобы включить дефолтный обработчик специальных прав
        'hierarchical'        => false,
        'supports'            => array('title','editor','thumbnail','excerpt','custom-fields'), // 'title','editor','author','thumbnail','excerpt','trackbacks','custom-fields','comments','revisions','page-attributes','post-formats'
        'taxonomies'          => array(),
        'has_archive'         => true,
    ]);
    
    // планировки
    register_post_type('plans', [
        'label'  => null,
        'labels' => [
            'name'               => 'Планироки', // основное название для типа записи
            'singular_name'      => 'Планировка', // название для одной записи этого типа
            'add_new'            => 'Добавить планировку', // для добавления новой записи
            'add_new_item'       => 'Добавление планировки', // заголовка у вновь создаваемой записи в админ-панели.
            'edit_item'          => 'Редактирование планировки', // для редактирования типа записи
            'new_item'           => 'Новая планировка', // текст новой записи
            'view_item'          => 'Смотреть планировку', // для просмотра записи этого типа.
            'search_items'       => 'Искать планировку', // для поиска по этим типам записи
            'not_found'          => 'Не найдено', // если в результате поиска ничего не было найдено
            'not_found_in_trash' => 'Не найдено в корзине', // если не было найдено в корзине
            'parent_item_colon'  => '', // для родителей (у древовидных типов)
            'menu_name'          => 'Планировки', // название меню
        ],
        'description'         => '',
        'public'              => true,
        'publicly_queryable'  => null, // зависит от public
        'exclude_from_search' => null, // зависит от public
        'show_ui'             => null, // зависит от public
        'show_in_menu'        => null, // показывать ли в меню адмнки
        'show_in_admin_bar'   => null, // по умолчанию значение show_in_menu
        'show_in_nav_menus'   => null, // зависит от public
        'show_in_rest'        => null, // добавить в REST API. C WP 4.7
        'rest_base'           => null, // $post_type. C WP 4.7
        'menu_position'       => null,
        'menu_icon'           => 'dashicons-images-alt', 
        //'capability_type'   => 'post',
        //'capabilities'      => 'post', // массив дополнительных прав для этого типа записи
        //'map_meta_cap'      => null, // Ставим true чтобы включить дефолтный обработчик специальных прав
        'hierarchical'        => false,
        'supports'            => array('title','editor','thumbnail','excerpt','custom-fields'), // 'title','editor','author','thumbnail','excerpt','trackbacks','custom-fields','comments','revisions','page-attributes','post-formats'
        'taxonomies'          => array(),
        'has_archive'         => true,
    ]);
    
    // данные сайта
    register_post_type('site-data', [
        'label'  => null,
        'labels' => [
            'name'               => 'Информация о сайте', // основное название для типа записи
            'singular_name'      => 'Блок информации о сайте', // название для одной записи этого типа
            'add_new'            => 'Добавить блок информации о сайте', // для добавления новой записи
            'add_new_item'       => 'Добавление блока информации о сайте', // заголовка у вновь создаваемой записи в админ-панели.
            'edit_item'          => 'Редактирование блока информации о сайте', // для редактирования типа записи
            'new_item'           => 'Новый блок информации о сайте', // текст новой записи
            'view_item'          => 'Смотреть блок информации о сайте', // для просмотра записи этого типа.
            'search_items'       => 'Искать блок информации о сайте', // для поиска по этим типам записи
            'not_found'          => 'Не найдено', // если в результате поиска ничего не было найдено
            'not_found_in_trash' => 'Не найдено в корзине', // если не было найдено в корзине
            'parent_item_colon'  => '', // для родителей (у древовидных типов)
            'menu_name'          => 'Информация о сайте', // название меню
        ],
        'description'         => '',
        'public'              => true,
        'publicly_queryable'  => null, // зависит от public
        'exclude_from_search' => null, // зависит от public
        'show_ui'             => null, // зависит от public
        'show_in_menu'        => null, // показывать ли в меню адмнки
        'show_in_admin_bar'   => null, // по умолчанию значение show_in_menu
        'show_in_nav_menus'   => null, // зависит от public
        'show_in_rest'        => null, // добавить в REST API. C WP 4.7
        'rest_base'           => null, // $post_type. C WP 4.7
        'menu_position'       => null,
        'menu_icon'           => 'dashicons-admin-tools', 
        //'capability_type'   => 'post',
        //'capabilities'      => 'post', // массив дополнительных прав для этого типа записи
        //'map_meta_cap'      => null, // Ставим true чтобы включить дефолтный обработчик специальных прав
        'hierarchical'        => false,
        'supports'            => array('title','editor','thumbnail','excerpt','custom-fields'), // 'title','editor','author','thumbnail','excerpt','trackbacks','custom-fields','comments','revisions','page-attributes','post-formats'
        'taxonomies'          => array(),
        'has_archive'         => true,
    ]);
    
    // предложения
    register_post_type('offers', [
        'label'  => null,
        'labels' => [
            'name'               => 'Офферы', // основное название для типа записи
            'singular_name'      => 'Оффер', // название для одной записи этого типа
            'add_new'            => 'Добавить оффер', // для добавления новой записи
            'add_new_item'       => 'Добавление оффера', // заголовка у вновь создаваемой записи в админ-панели.
            'edit_item'          => 'Редактирование оффера', // для редактирования типа записи
            'new_item'           => 'Новый оффер', // текст новой записи
            'view_item'          => 'Смотреть оффер', // для просмотра записи этого типа.
            'search_items'       => 'Искать оффер', // для поиска по этим типам записи
            'not_found'          => 'Не найдено', // если в результате поиска ничего не было найдено
            'not_found_in_trash' => 'Не найдено в корзине', // если не было найдено в корзине
            'parent_item_colon'  => '', // для родителей (у древовидных типов)
            'menu_name'          => 'Офферы', // название меню
        ],
        'description'         => '',
        'public'              => true,
        'publicly_queryable'  => null, // зависит от public
        'exclude_from_search' => null, // зависит от public
        'show_ui'             => null, // зависит от public
        'show_in_menu'        => null, // показывать ли в меню адмнки
        'show_in_admin_bar'   => null, // по умолчанию значение show_in_menu
        'show_in_nav_menus'   => null, // зависит от public
        'show_in_rest'        => null, // добавить в REST API. C WP 4.7
        'rest_base'           => null, // $post_type. C WP 4.7
        'menu_position'       => null,
        'menu_icon'           => 'dashicons-cart', 
        //'capability_type'   => 'post',
        //'capabilities'      => 'post', // массив дополнительных прав для этого типа записи
        //'map_meta_cap'      => null, // Ставим true чтобы включить дефолтный обработчик специальных прав
        'hierarchical'        => false,
        'supports'            => array('title','editor','thumbnail','excerpt','custom-fields'), // 'title','editor','author','thumbnail','excerpt','trackbacks','custom-fields','comments','revisions','page-attributes','post-formats'
        'taxonomies'          => array(),
        'has_archive'         => true,
    ]);
    
    // способы оплаты
    register_post_type('payments', [
        'label'  => null,
        'labels' => [
            'name'               => 'Способы оплаты', // основное название для типа записи
            'singular_name'      => 'Способ оплаты', // название для одной записи этого типа
            'add_new'            => 'Добавить способ оплаты', // для добавления новой записи
            'add_new_item'       => 'Добавление способа оплаты', // заголовка у вновь создаваемой записи в админ-панели.
            'edit_item'          => 'Редактирование способа оплаты', // для редактирования типа записи
            'new_item'           => 'Новый способ оплаты', // текст новой записи
            'view_item'          => 'Смотреть способ оплаты', // для просмотра записи этого типа.
            'search_items'       => 'Искать способ оплаты', // для поиска по этим типам записи
            'not_found'          => 'Не найдено', // если в результате поиска ничего не было найдено
            'not_found_in_trash' => 'Не найдено в корзине', // если не было найдено в корзине
            'parent_item_colon'  => '', // для родителей (у древовидных типов)
            'menu_name'          => 'Способы оплаты', // название меню
        ],
        'description'         => '',
        'public'              => true,
        'publicly_queryable'  => null, // зависит от public
        'exclude_from_search' => null, // зависит от public
        'show_ui'             => null, // зависит от public
        'show_in_menu'        => null, // показывать ли в меню адмнки
        'show_in_admin_bar'   => null, // по умолчанию значение show_in_menu
        'show_in_nav_menus'   => null, // зависит от public
        'show_in_rest'        => null, // добавить в REST API. C WP 4.7
        'rest_base'           => null, // $post_type. C WP 4.7
        'menu_position'       => null,
        'menu_icon'           => 'dashicons-money-alt', 
        //'capability_type'   => 'post',
        //'capabilities'      => 'post', // массив дополнительных прав для этого типа записи
        //'map_meta_cap'      => null, // Ставим true чтобы включить дефолтный обработчик специальных прав
        'hierarchical'        => false,
        'supports'            => array('title','editor','thumbnail','excerpt','custom-fields'), // 'title','editor','author','thumbnail','excerpt','trackbacks','custom-fields','comments','revisions','page-attributes','post-formats'
        'taxonomies'          => array(),
        'has_archive'         => true,
    ]);
    
    // ход строительства
    register_post_type('event', [
        'label'  => null,
		'labels' => [
			'name'               => 'События хода стро-ва', // основное название для типа записи
			'singular_name'      => 'Событие хода стро-ва', // название для одной записи этого типа
			'add_new'            => 'Добавить событие', // для добавления новой записи
			'add_new_item'       => 'Добавление события', // заголовка у вновь создаваемой записи в админ-панели.
			'edit_item'          => 'Редактирование события', // для редактирования типа записи
			'new_item'           => 'Новое событие', // текст новой записи
			'view_item'          => 'Смотреть событие', // для просмотра записи этого типа.
			'search_items'       => 'Искать событие', // для поиска по этим типам записи
			'not_found'          => 'Не найдено', // если в результате поиска ничего не было найдено
			'not_found_in_trash' => 'Не найдено в корзине', // если не было найдено в корзине
			'parent_item_colon'  => '', // для родителей (у древовидных типов)
			'menu_name'          => 'Ход строительства', // название меню
        ],
		'description'         => '',
		'public'              => true,
		'publicly_queryable'  => null, // зависит от public
		'exclude_from_search' => null, // зависит от public
		'show_ui'             => null, // зависит от public
		'show_in_menu'        => null, // показывать ли в меню адмнки
		'show_in_admin_bar'   => null, // по умолчанию значение show_in_menu
		'show_in_nav_menus'   => null, // зависит от public
		'show_in_rest'        => null, // добавить в REST API. C WP 4.7
		'rest_base'           => null, // $post_type. C WP 4.7
		'menu_position'       => null,
		'menu_icon'           => 'dashicons-calendar-alt', 
		//'capability_type'   => 'post',
		//'capabilities'      => 'post', // массив дополнительных прав для этого типа записи
		//'map_meta_cap'      => null, // Ставим true чтобы включить дефолтный обработчик специальных прав
		'hierarchical'        => false,
		'supports'            => array('title', 'editor', 'thumbnail', 'custom-fields'), // 'title','editor','author','thumbnail','excerpt','trackbacks','custom-fields','comments','revisions','page-attributes','post-formats'
		'taxonomies'          => array(),
		'has_archive'         => true,
    ]);
}

// обработка ajax
add_action('wp_ajax_ajax_submit_form', 'ajax_form'); // ajax от админа или авторизованого пользователя
add_action('wp_ajax_nopriv_ajax_submit_form', 'ajax_form'); // ajax от неавторизованного пользователя

// обработка ajax звпроса
function ajax_form() {
    $title = (string)htmlspecialchars(trim($_POST['title']));
    $name = (string)htmlspecialchars(trim($_POST['name']));
    $phone = (string)htmlspecialchars(trim($_POST['phone']));
    
    // данные для сообщения
    $message = array();
    if ($title) {
        $message['title'] = $title;
    }
    if ($name) {
        $message['name'] = $name;
    }
    if ($phone) {
        $message['phone'] = $phone;
    }

    //формируем сообщение
    $text="----------- Заказ звонка с сайта NOVOSTROY -----------\n";
    foreach($message as $key => $value) {
         $text .= "" . $key . ": " . $value . "\n";
    };
    //
    $res = array(
        'text' => $message,
    );
    // отправляем ссобщение
    if ($phone != "") {
//         if (message_to_telegram($text) == true) { // заменить на отправку на email
//             $res[0]['success'] = 'Okay';
//             $res[0]['to_telegram'] = 'Done';
//         } else {
//             $res[0]['error'] = 'Not_okay';
// 		}
// 		//
        if (message_to_email($message) == true) { // заменить на отправку на email
            $res[1]['success'] = 'Okay';
            $res[1]['to_email'] = 'Done';
        } else {
            $res[1]['error'] = 'Not_okay';
        }  
    } else {
        $res['error'] = 'Not_okay';
    };
    // $res['request'] = [$_POST['title'], $name, $phone];
	$a = json_encode($res);
	echo $a;

    wp_die();
}

function message_to_telegram($text) {

	// //  open connection
	$ch = curl_init();
	$bot_token = '919656472:AAFtg4HI0cmd_fkpdJbSomlBMeJPCGIL9jM';
	
	$bot_url = 'https://api.telegram.org/bot' . $bot_token .'/sendMessage';
	
	$post = array(
		'chat_id' => '-1001352697643', // 
		'text' => $text,
	);
	//  set the url
	curl_setopt($ch, CURLOPT_URL, $bot_url);
	//  number of POST vars
	curl_setopt($ch, CURLOPT_POST, 1);
	//  POST data
	curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
	//  To display result of curl
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	// set proxy
	// curl_setopt($ch, CURLOPT_PROXY, 'socks5://tgdm:superslivaestbanan@149.56.15.105:7653');
	// execute post
	$result = curl_exec($ch);
	
	//  close connection
	curl_close($ch);
	
    return true;
	
};

function message_to_email($message) {

    $title = $message['title'];
    $name = $message['name'];
    $phone = $message['phone'];

    $field_obj = get_field_objects( 29 );
    $email_adress = $field_obj['email_for_requestes']['value'];
    
    // Кому отправляем
    $to = get_option('admin_email') . ', ' . $email_adress;
       
    // Тема письма
    $subject = "Заявка с сайта " . get_bloginfo('name');
      
    // Само сообщение
    $message = "Заголовок сообщения: заявка; " . PHP_EOL . "Тема сообщения: " . $title . "; " . PHP_EOL . "Имя: " . $name . "; " . PHP_EOL .  "Номер: " . $phone . "; ";;
       
    // Отправляем письмо
    $sent_message = wp_mail( $to, $subject, $message ) || mail( $to, $subject, $message );

    $result = true;
    if(!$sent_message) {
        $result = false;
    } else {
        $result = true;
    }
    return $result;
};

// обработка ajax
add_action('wp_ajax_ajax_submit_filter', 'ajax_filter'); // ajax от админа или авторизованого пользователя
add_action('wp_ajax_nopriv_ajax_submit_filter', 'ajax_filter'); // ajax от неавторизованного пользователя

// обработка ajax звпроса
function ajax_filter() {
    $args = array( // получает любые записи
        'numberposts' => -1,
        'orderby'     => 'date',
        'order'       => 'DESC',
        'post_type'   => 'plans', // тип получаемых записей
        // 'suppress_filters' => true, // подавление работы фильтров изменения SQL запроса
    ); 
    $posts = get_posts($args);
    global $post;
    $array = array();
    if (count($posts)) {
        foreach( $posts as $post ) {
            setup_postdata($post);
            $arr = array();
            //
            $id_post = get_the_id();
            $arr['id'] = $id_post;
            //
            $fields = get_field_objects( $id_post ); # $post->ID
            $arr['name'] = $fields['name']['value'];
            $arr['plan_flat_1'] = $fields['plan_flat_1']['value'];
            $arr['plan_flat_2'] = $fields['plan_flat_2']['value'];
            $arr['area'] = $fields['area']['value'];
            $arr['type'] = $fields['type']['value'];
            $arr['rooms'] = $fields['rooms']['value'];
            //
            array_push($array, $arr);
        }        
    } else {
        $array['status'] = 'not';
    }

    
    $data = json_encode($array);
	echo $data;
    wp_die();    
}

// обработка ajax
add_action('wp_ajax_ajax_submit_events', 'ajax_events'); // ajax от админа или авторизованого пользователя
add_action('wp_ajax_nopriv_ajax_submit_events', 'ajax_events'); // ajax от неавторизованного пользователя

// обработка ajax звпроса
function ajax_events() {
    $args = array( // получает любые записи
        'numberposts' => -1,
        'orderby'     => 'date',
        'order'       => 'DESC',
        'post_type'   => 'event', // тип получаемых записей
        // 'suppress_filters' => true, // подавление работы фильтров изменения SQL запроса
    ); 
    $posts = get_posts($args);
    global $post;
    $array = array();
    if (count($posts)) {
        foreach( $posts as $post ) {
            setup_postdata($post);
            $arr = array();
            //
            $id_post = get_the_id();
            $arr['id'] = $id_post;
            //
            $content = get_the_content();
            $content = strip_shortcodes( $content );
            $arr['content'] = $content;
            //
            $gal = get_post_gallery( $id_post, false );
            // print_r(count($gal[src]));
            $images = array();
            for($i = 0; $i < count($gal[src]); $i++){
                $item = $gal[src][$i];
                array_push($images, $item);
            };
            $arr['images'] = $images;
            //
            $fields = get_field_objects( $id_post ); # $post->ID
            $name = $fields['date']['value'];
            $arr['name'] = $name;
            //
            array_push($array, $arr);
        }        
    } else {
        $array['status'] = 'not';
    }
    
    $data = json_encode($array);
	echo $data;
    wp_die();
}