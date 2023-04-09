import { useEffect } from 'react';
import './MapContainer-module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUtensils,
    faBirthdayCake,
    faGlassCheers,
    faShoppingBag,
    faShoppingBasket,
    faClock,
} from '@fortawesome/free-solid-svg-icons';

import { initMapWithAutocompleteField } from '../utils/mapFunctions';

const MapContainer = () => {
    useEffect(() => {
        window.initMapWithAutocompleteField = initMapWithAutocompleteField;

        // Load Google Maps JavaScript API
        const script = document.createElement('script');
        const mapApiKey = '';
        script.src = `https://maps.googleapis.com/maps/api/js?key=${mapApiKey}&callback=initMapWithAutocomplete&libraries=places&v=weekly`;
        script.defer = true;
        document.body.appendChild(script);

        return () => {
            // Clean up by removing the script and window property
            document.body.removeChild(script);
            delete window.initMapWithAutocompleteField;
        };
    }, []);

    return (
        <div className="map-container">
            <input
                id="pac-input"
                className="controls"
                type="text"
                placeholder="Search For Nearby Attractions"
            />
            {/* TODO We have to put it in a separate component to be able to reuse mapComponent without the options */}
            <ul className="map-options">
                <li>
                    <FontAwesomeIcon icon={faUtensils} className="map-icon" />
                    Restaurants
                </li>
                <li>
                    <FontAwesomeIcon
                        icon={faBirthdayCake}
                        className="map-icon"
                    />
                    Parties
                </li>
                <li>
                    <FontAwesomeIcon
                        icon={faGlassCheers}
                        className="map-icon"
                    />
                    Ballads
                </li>
                <li>
                    <FontAwesomeIcon
                        icon={faShoppingBag}
                        className="map-icon"
                    />
                    Stores
                </li>
                <li>
                    <FontAwesomeIcon
                        icon={faShoppingBasket}
                        className="map-icon"
                    />
                    Malls
                </li>
                <li>
                    <FontAwesomeIcon icon={faClock} className="map-icon" />
                    Open 24hrs
                </li>
            </ul>
            <div id="map" className="map-styles" />
        </div>
    );
};

export default MapContainer;
