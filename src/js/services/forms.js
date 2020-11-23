import { imOkey, searchData, sendAjax, plansCard, makeMasks } from '../utils/functions';

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
            type: 'input',
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
        btn.addEventListener('click', _handlerBtn)
    }
    function _dontListenBtn() {
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

    }

    function _filter(data, options) {

        console.log(data, options)

        let resultArray = [];
        for (let i of data) {
            if (+i.rooms == +options.filter_rooms && i.type.value == options.filter_type) {
                resultArray.push({...i});
            }
        }

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
            container.addEventListener('give-more-plans', hand)
            _listenBtn();
            // рисуй до лимита
            draw(0, limit);
        }

        function hand() {
            // дорисуй до лимита
            if ((data.length - count) > limit) {
                draw(count, limit);
            } else {
                draw(count, data.length - count);
                btn.style.opacity = 0;
                _dontListenBtn();
            }
        }

        function draw(start, end) {
            for (let i = start; i < end; i++) {
                const html = htmlTemplate({i, ...data[i]});
                container.insertAdjacentHTML('beforeend', html);
                count++;
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

    // let constructionSwiper = null;

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
        return result.length > 0 ? result : null;
    }

    function _fetch(string) {
        sendAjax({
            containerUrl,
            formData: `action=${string}`,
            eventName
        });
    }

    async function _putData(obj) {
        if (obj != null) {
            let constructionSwiper = null;

            const { images } = obj;

            containerTxt.innerHTML(obj.content);

            function __create() {
                slider.innerHTML = '';

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
            }

            function __destroy() {
                if (constructionSwiper) {
                    constructionSwiper.destroy();
                    constructionSwiper = null;
                }
            }

            await __destroy();
            await __create();
            await __init();
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
                _putData( _findData(event.target.dataset.planIndex) );
            }
            select.addEventListener('change', handler)
        }
    } 

    return methods;

}