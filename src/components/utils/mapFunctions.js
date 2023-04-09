// if you fill it with out apikey, please dont commit it.
// Only use it to test occasionally in order to limit our usage of the request limit while developing and testing
const mapApiKey = '';

// This function will initialize the google maps api via a script, passing as a parameter a
// function name that will be used as callback
export function initGoogleMapApiScript(scriptName) {
    // Load Google Maps JavaScript API
    let scriptCallback = '';
    if (scriptName) {
        scriptCallback = `&callback=${scriptName}`;
    }
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${mapApiKey}${scriptCallback}&libraries=places&v=weekly`;
    script.defer = true;
    document.body.appendChild(script);
    return script;
}

export const initMapWithAutocompleteField = () => {
    // Makes map render in certain coordinate (currently is set to fatec)
    const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: -23.521518735620543, lng: -46.476514255821115 },
        zoom: 13,
        mapTypeId: 'roadmap',
    });

    const input = document.getElementById('pac-input');
    const searchBox = new window.google.maps.places.SearchBox(input);

    map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(input);

    map.addListener('bounds_changed', () => {
        searchBox.setBounds(map.getBounds());
    });

    let markers = [];

    searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces();

        if (places.length === 0) {
            return;
        }

        markers.forEach((marker) => {
            marker.setMap(null);
        });
        markers = [];

        const bounds = new window.google.maps.LatLngBounds();

        places.forEach((place) => {
            if (!place.geometry || !place.geometry.location) {
                console.log('Returned place contains no geometry');
                return;
            }

            const icon = {
                url: place.icon,
                size: new window.google.maps.Size(71, 71),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(17, 34),
                scaledSize: new window.google.maps.Size(25, 25),
            };

            markers.push(
                new window.google.maps.Marker({
                    map,
                    icon,
                    title: place.name,
                    position: place.geometry.location,
                })
            );

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
    const options = {
        componentRestrictions: { country: 'br' },
        types: ['establishment'],
    };
    // eslint-disable-next-line no-new
    new window.google.maps.places.Autocomplete(input, options);
};
