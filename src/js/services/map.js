export function DefaultMap(object) {

    const { urlMapContainer, centerCoordinates = [55.620209, 49.395664], iconSize = [48, 48], zoom = 13, objects } = object;

    function _init() {
        DG.then(function () {

            let allMarkers = [];

            const mapContainer = document.querySelector(urlMapContainer);

            const map = DG.map(mapContainer, {
                center: centerCoordinates,
                zoom: zoom
            });

            const pin_school = DG.icon({
                iconUrl: process.env.NODE_ENV == 'development' ? 'images/services/pin_school.svg' : 'https://sokurovpark.ru/wp-content/themes/sokurov_theme/images/services/pin_school.svg',
                iconSize: iconSize,
            });
            const pin_kindergarten = DG.icon({
                iconUrl: process.env.NODE_ENV == 'development' ? 'images/services/pin_kindergarten.svg' : 'https://sokurovpark.ru/wp-content/themes/sokurov_theme/images/services/pin_kindergarten.svg',
                iconSize: iconSize,
            });
            const pin_market = DG.icon({
                iconUrl: process.env.NODE_ENV == 'development' ? 'images/services/pin_market.svg' : 'https://sokurovpark.ru/wp-content/themes/sokurov_theme/images/services/pin_market.svg',
                iconSize: iconSize,
            });
            const pin_busStation = DG.icon({
                iconUrl: process.env.NODE_ENV == 'development' ? 'images/services/pin_bus-station.svg' : 'https://sokurovpark.ru/wp-content/themes/sokurov_theme/images/services/pin_bus-station.svg',
                iconSize: iconSize,
            });


            const pins = {
                pin_school: () => {
                    const pin = DG.icon({
                        iconUrl: process.env.NODE_ENV == 'development' ? 'images/services/pin_school.svg' : 'https://sokurovpark.ru/wp-content/themes/sokurov_theme/images/services/pin_school.svg',
                        iconSize: iconSize,
                    });
                    return pin;
                },
                pin_kindergarten: () => {
                    const pin = DG.icon({
                        iconUrl: process.env.NODE_ENV == 'development' ? 'images/services/pin_kindergarten.svg' : 'https://sokurovpark.ru/wp-content/themes/sokurov_theme/images/services/pin_kindergarten.svg',
                        iconSize: iconSize,
                    });
                    return pin;
                },
                pin_market: () => {
                    const pin = DG.icon({
                        iconUrl: process.env.NODE_ENV == 'development' ? 'images/services/pin_market.svg' : 'https://sokurovpark.ru/wp-content/themes/sokurov_theme/images/services/pin_market.svg',
                        iconSize: iconSize,
                    });
                    return pin;
                },
                'pin_bus-station': () => {
                    const pin = DG.icon({
                        iconUrl: process.env.NODE_ENV == 'development' ? 'images/services/pin_bus-station.svg' : 'https://sokurovpark.ru/wp-content/themes/sokurov_theme/images/services/pin_bus-station.svg',
                        iconSize: iconSize,
                    });
                    return pin;
                }
            }

            function move(param) {
                const collection = objects[param]; // достаем координаты из переданного объекта

                if (allMarkers.length > 0) {
                    allMarkers.forEach(item => item.remove());
                    allMarkers.splice(0, allMarkers.length);
                }

                const thisPin = pins[`pin_${param}`]();
                console.log(thisPin);
                
                collection.forEach(item => { // item - это координаты
                    allMarkers.push( DG.marker( item, {icon: thisPin} ).addTo(map) ); // здесь пушатся дефолтные маркеты в массив, 
                });                                                                   // т.к. кроме координат в маркер ничего не передается

                const group = DG.featureGroup(allMarkers);
                group.addTo(map);
                group.on('click', function(e) {
                    map.setView([e.latlng.lat, e.latlng.lng]);
                });

                // map.setView(projects[slug]['coordinates'], zoom);
            }

            const handler = (event) => {
                if (event.target.dataset.location) {

                    const slug = event.target.dataset.location;

                    move(slug);
                }
            }
            window.addEventListener('click', handler);

            move('bus-station');
            
        });
    }

    const methods = {
        init() {
            _init();
        },
    }

    return methods;
}