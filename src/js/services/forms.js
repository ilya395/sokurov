import { imOkey, searchData, sendAjax, plansCard, makeMasks } from '../utils/functions';
import Swiper from 'swiper';

export function DefaultForm(object) {

    const {containerUrl, actionName, eventName} = object;

    const form = document.querySelector(containerUrl);

    function _fetch() {
        const name = form.querySelector('form input[name="name"]');
        const phone = form.querySelector('form input[name="phone"]');
        const title = form.querySelector('form input[name="title"]');

        // let formData = `action=${actionName}&name=${name ? name.value : ''}&phone=${phone ? phone.value : ''}&title=${title ? title.value : ''}`;

        const data = searchData({
            containerUrl, 
            actionName,
            type: ['input'],
        });

        if (
            name.value != '' && name.value.length < 25 && 
            phone.value != '' && imOkey(phone.value) == true && 
            item.value.indexOf(' ', 0) != -1 && item.value.indexOf(' ', 0) != 0 && item.value.length < 100
        ) {
            sendAjax({
                containerUrl,
                formData: data.dataString,
                eventName
            });
        }
    }


    const methods = {
        init() {
            makeMasks();
            function handler(event) {
                event.preventDefault();
                _fetch();
            }
            form.addEventListener('submit', handler);
        },
        submit() {
            _fetch();
        }
    }

    return methods;
}

export function FilterForm(object) {

    const { containerUrl, actionName, eventName, manageItems = ['[data-object="filter_type"]', '[data-object="filter_rooms"]'], containerForRenderingUrl, moreBtnUrl, limit = 6, htmlTemplate = plansCard } = object;

    let globalData = null;
    const btn = document.querySelector(moreBtnUrl);

    function _handlerBtn() {
        console.log('давай больше планировок, уже нажали кнопку');
        const morePlan = new CustomEvent(`give-more-plans`, {
            bubbles: true,
            // detail: {
            //     data: response,
            // },
        });
        // document.querySelector(containerUrl).dispatchEvent(morePlan);
        btn.dispatchEvent(morePlan);
    }
    function _listenBtn() {
        console.log('слушвем кнопку');
        btn.addEventListener('click', _handlerBtn)
    }
    function _dontListenBtn() {
        console.log('не слушвем кнопку');
        btn.removeEventListener('click', _handlerBtn)
    }

    function _fetch() {

        const dataForRequest = searchData({
            containerUrl, 
            actionName,
            type: manageItems // null,
        });     
        
        sendAjax({
            containerUrl,
            formData: dataForRequest.dataString,
            eventName,
        });

        // const test = [
        //     {
        //         area: "81,61",
        //         id: 107,
        //         name: "3А.2",
        //         plan_flat_1: "http://sokurovpark.ru/wp-content/uploads/2020/11/3_a.2_81_61-3.svg",
        //         plan_flat_2: "http://sokurovpark.ru/wp-content/uploads/2020/11/3_a.2_81_61-4.svg",
        //         rooms: "3",
        //         type: {
        //             label: "Таунхаус",
        //             value: "toun",
        //         }
        //     },
        //     {
        //         area: "81,61",
        //         id: 107,
        //         name: "3А.2",
        //         plan_flat_1: "http://sokurovpark.ru/wp-content/uploads/2020/11/3_a.2_81_61-3.svg",
        //         plan_flat_2: "http://sokurovpark.ru/wp-content/uploads/2020/11/3_a.2_81_61-4.svg",
        //         rooms: "3",
        //         type: {
        //             label: "Таунхаус",
        //             value: "toun",
        //         }
        //     },
        //     {
        //         area: "81,61",
        //         id: 107,
        //         name: "3А.2",
        //         plan_flat_1: "http://sokurovpark.ru/wp-content/uploads/2020/11/3_a.2_81_61-3.svg",
        //         plan_flat_2: "http://sokurovpark.ru/wp-content/uploads/2020/11/3_a.2_81_61-4.svg",
        //         rooms: "3",
        //         type: {
        //             label: "Таунхаус",
        //             value: "toun",
        //         }
        //     },
        //     {
        //         area: "81,61",
        //         id: 107,
        //         name: "3А.2",
        //         plan_flat_1: "http://sokurovpark.ru/wp-content/uploads/2020/11/3_a.2_81_61-3.svg",
        //         plan_flat_2: "http://sokurovpark.ru/wp-content/uploads/2020/11/3_a.2_81_61-4.svg",
        //         rooms: "3",
        //         type: {
        //             label: "Таунхаус",
        //             value: "toun",
        //         }
        //     },
        //     {
        //         area: "81,61",
        //         id: 107,
        //         name: "3А.2",
        //         plan_flat_1: "http://sokurovpark.ru/wp-content/uploads/2020/11/3_a.2_81_61-3.svg",
        //         plan_flat_2: "http://sokurovpark.ru/wp-content/uploads/2020/11/3_a.2_81_61-4.svg",
        //         rooms: "3",
        //         type: {
        //             label: "Таунхаус",
        //             value: "toun",
        //         }
        //     },
        //     {
        //         area: "81,61",
        //         id: 107,
        //         name: "3А.2",
        //         plan_flat_1: "http://sokurovpark.ru/wp-content/uploads/2020/11/3_a.2_81_61-3.svg",
        //         plan_flat_2: "http://sokurovpark.ru/wp-content/uploads/2020/11/3_a.2_81_61-4.svg",
        //         rooms: "3",
        //         type: {
        //             label: "Таунхаус",
        //             value: "toun",
        //         }
        //     },
        //     {
        //         area: "81,61",
        //         id: 107,
        //         name: "3А.2",
        //         plan_flat_1: "http://sokurovpark.ru/wp-content/uploads/2020/11/3_a.2_81_61-3.svg",
        //         plan_flat_2: "http://sokurovpark.ru/wp-content/uploads/2020/11/3_a.2_81_61-4.svg",
        //         rooms: "3",
        //         type: {
        //             label: "Таунхаус",
        //             value: "toun",
        //         }
        //     },
        //     {
        //         area: "81,61",
        //         id: 107,
        //         name: "3А.2",
        //         plan_flat_1: "http://sokurovpark.ru/wp-content/uploads/2020/11/3_a.2_81_61-3.svg",
        //         plan_flat_2: "http://sokurovpark.ru/wp-content/uploads/2020/11/3_a.2_81_61-4.svg",
        //         rooms: "3",
        //         type: {
        //             label: "Таунхаус",
        //             value: "toun",
        //         }
        //     },
        //     {
        //         area: "81,61",
        //         id: 107,
        //         name: "3А.2",
        //         plan_flat_1: "http://sokurovpark.ru/wp-content/uploads/2020/11/3_a.2_81_61-3.svg",
        //         plan_flat_2: "http://sokurovpark.ru/wp-content/uploads/2020/11/3_a.2_81_61-4.svg",
        //         rooms: "3",
        //         type: {
        //             label: "Таунхаус",
        //             value: "toun",
        //         }
        //     },
        // ];

        // const successEvent = new CustomEvent(`${eventName}_success`, {
        //     bubbles: true,
        //     detail: {
        //         data: test,
        //     },
        // });
        // document.querySelector(containerUrl).dispatchEvent(successEvent);

    }

    function _filter(obj) {

        const { data, options } = obj;

        console.log(`### data :`, data);
        console.log(`### options :`, options)

        let resultArray = [];
        for (let i of data) {
            console.log(i.rooms, options.filter_rooms, i.type.value, options.filter_type);
            if (+i.rooms == +options.filter_rooms && i.type.value == options.filter_type) {
                resultArray.push({...i});
            }
        }
        console.log(resultArray)
        return resultArray;
    }

    function _render(data, param = true) {
        console.log(data, param);

        const container = document.querySelector(containerForRenderingUrl);
        if (param == true) {
            container.innerHTML = '';
        }
        const btn = document.querySelector(moreBtnUrl);
        btn.style.opacity = 1;
        let count = 0;
        // let hasCollection = 0;
        // let newCollection = data.length - hasCollection;
        
        if ((data.length - limit) < 0) {
            btn.style.opacity = 0;
            _dontListenBtn();
            // рисуй сколько есть
            draw(0, data.length);
        } else {
            btn.style.opacity = 1;
            document.querySelector(containerUrl).addEventListener('give-more-plans', hand);
            _listenBtn();
            // рисуй до лимита
            draw(0, limit);
        }

        function hand() {
            console.log('нужно больше планировок!');
            // дорисуй до лимита
            if ((data.length - count) > limit) {
                draw(count, limit);
            } else {
                draw(count, data.length);
                btn.style.opacity = 0;
                _dontListenBtn();
            }
        }

        function draw(start, end) {
            console.log(`от ${start} до ${end}`)
            if (start == 0 && end == 0) {
                container.insertAdjacentHTML('beforeend', `<p>Данные объекты закончились...<p>`);
            } else {
                for (let i = start; i < end; i++) {
                    const html = htmlTemplate({i, ...data[i]});
                    container.insertAdjacentHTML('beforeend', html);
                    count++;
                }
            }
        }

        // const alreadyHavePlans = container.querySelectorAll('[data-plan-index]');

    }

    const methods = {
        init() {
            function handler(event) {
                console.log(event);
                // const data = event.detail.data; // JSON.parse();
                // globalData = data; // {...data};
                globalData = event.detail.data;

                const result = _filter({
                    data: globalData,
                    options: searchData({
                        containerUrl, 
                        actionName,
                        type: manageItems,
                    }).dataObject,
                });
                _render(result, true);
            }
            document.addEventListener(`${eventName}_success`, handler);
            _fetch();
            // _filter(
            //     [
            //         {
            //             area: "90,18",
            //             id: 249,
            //             name: "4А.6",
            //             plan_flat_1: "http://sokurovpark.ru/wp-content/uploads/2020/11/4_a.6_90_18.svg",
            //             plan_flat_2: "http://sokurovpark.ru/wp-content/uploads/2020/11/4_a.6_90_18-1.svg",
            //             rooms: "4",
            //             type: {value: "toun", label: "Таунхаус"},
            //         },
            //         {
            //             area: "89,61",
            //             id: 244,
            //             name: "4А.5",
            //             plan_flat_1: "http://sokurovpark.ru/wp-content/uploads/2020/11/4_a.5_89_61.svg",
            //             plan_flat_2: "http://sokurovpark.ru/wp-content/uploads/2020/11/4_a.5_89_61-1.svg",
            //             rooms: "4",
            //             type: {value: "toun", label: "Таунхаус"},
            //         },
            //     ],
            //     {
            //         action: "ajax_submit_filter",
            //         filter_rooms: "3",
            //         filter_type: "toun",
            //     }
            // );
            // _render([]);
        },
        manage() {
            function handl(event) {
                console.log(event.target);
                if (event.target.dataset.object) {
                    let st = `[data-object="${event.target.dataset.object}"]`;
                    console.log(st, manageItems.includes(st));
                    if (manageItems.includes(st)) {
                        document.querySelectorAll(`[data-object=${event.target.dataset.object}]`).forEach(item => item.classList.remove('active'));
                        event.target.classList.add('active');

                        _dontListenBtn();
                        const result = _filter({
                            data: globalData,
                            options: searchData({
                                containerUrl, 
                                actionName,
                                type: manageItems,
                            }).dataObject,
                        });
                        _render(result, true);
                         
                    }
                }
            }
            document.querySelector(containerUrl).addEventListener('click', handl);
        }
    }

    return methods;
}

export function EventsForm(object) {

    const { containerUrl, containerSelectUrl, containerTextUrl, containerSliderUrl, actionName, eventName } = object;
    const container = document.querySelector(containerUrl);
    const containerTxt = document.querySelector(containerTextUrl);
    const select = document.querySelector(containerSelectUrl);
    const slider = document.querySelector(containerSliderUrl);

    let constructionSwiper = null;

    let globalData = null;

    function _findData(index) {
        // const data = `action=${actionName}&event_id=${arg}`;
        // return data;
        
        let result = {};
        if (globalData.length > 0) {
            for (let i of globalData) {
                if (i.id == index) {
                    result = {...i}; 
                }
            }
        } else {
            console.log('погоди, данные не пришли еще!');
        }
        return Object.keys(result).length > 0 ? result : null;
    }

    function _fetch(string) {
        sendAjax({
            containerUrl,
            formData: `action=${string}`,
            eventName
        });

        // const test = [
        //     {
        //         content: "Есть много вариантов Lorem Ipsum, но большинство из них имеет не всегда приемлемые модификации, например, юмористические вставки или слова, которые даже отдалённо не напоминают латынь. Если вам нужен Lorem Ipsum для серьёзного проекта, вы наверняка не хотите какой-нибудь шутки, скрытой в середине абзаца. Также все другие известные генераторы Lorem Ipsum используют один и тот же текст, который они просто повторяют, пока не достигнут нужный объём. Это делает предлагаемый здесь генератор единственным настоящим Lorem Ipsum генератором. Он использует словарь из более чем 200 латинских слов, а также набор моделей предложений. В результате сгенерированный Lorem Ipsum выглядит правдоподобно, не имеет повторяющихся абзацей или \"невозможных\" слов",
        //         id: 47,
        //         images: [
        //             "http://sokurovpark.ru/wp-content/uploads/2020/11/rectangle-3-1.jpg",
        //             "http://sokurovpark.ru/wp-content/uploads/2020/11/rectangle-3.jpg"
        //         ],
        //         name: "15 октября 2020"
        //     },
        //     {
        //         content: "<strong>Lorem Ipsum</strong> - это текст-\"рыба\", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной \"рыбой\" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum",
        //         id: 46,
        //         images: [
        //             "http://sokurovpark.ru/wp-content/uploads/2020/11/rectangle-3-1.jpg",
        //             "http://sokurovpark.ru/wp-content/uploads/2020/11/rectangle-3-2.jpg"
        //         ],
        //         name: "5 сентября 2020"
        //     }
        // ]

        // const successEvent = new CustomEvent(`${eventName}_success`, {
        //     bubbles: true,
        //     detail: {
        //         data: test,
        //     },
        // });
        // container.dispatchEvent(successEvent);

    }

    async function _putData(obj) {
        console.log(obj);
        if (obj != null) {

            function __put() {
                containerTxt.innerHTML = obj.content;
            }

            function __create() {
                console.log('__create');

                slider.innerHTML = '';

                const { images } = obj;
                console.log(images);

                function htmlTpl(url = 'images/main-page/pic_park_001.jpg') {
                    const html = `
                        <div class="construction-slider__slide swiper-slide">
                            <img src="${url}">
                        </div>
                    `
                    return html;
                }

                for (let i in images) {
                    slider.insertAdjacentHTML('beforeend', htmlTpl(images[i]));
                }
            }

            function __init() {
                console.log('__init');
                if (!constructionSwiper) {
                    
                    constructionSwiper = new Swiper('#construction-slider .swiper-container', {
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
                }
                console.log(constructionSwiper);
            }

            function __destroy() {
                console.log('__destroy');
                if (constructionSwiper) {
                    constructionSwiper.destroy();
                    constructionSwiper = null;
                    
                }
                console.log(constructionSwiper);
            }

            await __destroy();
            await __create();
            await __init();
            await __put();
        }
    }

    const methods = {
        init() {
            function handl(event) {
                console.log(event);
                // const data = event.detail.data; // JSON.parse(event.detail.data);
                // globalData = data; // {...data};
                globalData = event.detail.data;
            }
            container.addEventListener(`${eventName}_success`, handl);

            _fetch(actionName);
        },
        manage() {
            function handler(event) {
                console.log('#### выбор index: ', select.options[select.selectedIndex].dataset.planIndex );
                const result = _findData( +select.options[select.selectedIndex].dataset.planIndex );
                console.log(result);
                _putData( result );
            }
            select.addEventListener('change', handler)
        }
    } 

    return methods;

}