export function DefaultMap(object) {

    const { urlMapContainer, centerCoordinates = [55.620209, 49.395664], iconSize = [20, 20], zoom = 13, objects } = object;

    function _init() {
        DG.then(function () {

            let allMarkers = [];

            const mapContainer = document.querySelector(urlMapContainer);

            const map = DG.map(mapContainer, {
                center: centerCoordinates,
                zoom: zoom
            });

            const pin_sokurov = DG.icon({
                iconUrl: process.env.NODE_ENV == 'development' ? 'dist/images/services/pin_sokurov.svg' : 'https://sokurovpark.ru/wp-content/themes/sokurov_theme/dist/images/services/pin_sokurov.svg',
                iconSize: [60, 60],
            });


            const pins = {
                'pin_school': () => {
                    const pin = DG.divIcon({
                        className: 'pin_school',
                        iconSize: iconSize,
                    });
                    return pin;
                },
                'pin_kindergarten': () => {
                    const pin = DG.divIcon({
                        className: 'pin_kindergarten',
                        iconSize: iconSize,
                    });
                    return pin;
                },
                'pin_market': () => {
                    const pin = DG.divIcon({
                        className: 'pin_market',
                        iconSize: iconSize,
                    });
                    return pin;
                },
                'pin_bus-station': () => {
                    const pin = DG.divIcon({
                        className: 'pin_bus-station',
                        iconSize: iconSize,
                    });
                    return pin;
                }
            }

            function moveOneParam(param) {
                const collection = objects[param];

                const thisPin = pins[`pin_${param}`]();
                
                collection.forEach(item => {
                    allMarkers.push( DG.marker( item, {icon: thisPin} ).addTo(map) );
                });
            }

            function moveStart() {
                const params = Object.keys(objects);
                
                params.forEach(function(item) {
                    moveOneParam(item);
                });

                allMarkers.push( DG.marker( [55.622478, 49.386828], {icon: pin_sokurov} ).addTo(map) );

                const group = DG.featureGroup(allMarkers);
                group.addTo(map);
                group.on('click', function(e) {
                    map.setView([e.latlng.lat, e.latlng.lng]);
                });

                // map.setView(projects[slug]['coordinates'], zoom);
            }

            function move(param) {
                const collection = objects[param];

                if (allMarkers.length > 0) {
                    allMarkers.forEach(item => item.remove());
                    allMarkers.splice(0, allMarkers.length);
                }

                const thisPin = pins[`pin_${param}`]();
                
                collection.forEach(item => {
                    allMarkers.push( DG.marker( item, {icon: thisPin} ).addTo(map) );
                });

                allMarkers.push( DG.marker( [55.622478, 49.386828], {icon: pin_sokurov} ).addTo(map) );

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

            moveStart();
            
        });
    }

    const methods = {
        init() {
            _init();
        },
    }

    return methods;
}