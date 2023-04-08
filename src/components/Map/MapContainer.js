import { useEffect, useRef } from 'react';
import './MapContainer-module.css';

import { Loader } from '@googlemaps/js-api-loader';
import { initAutocomplete } from '../utils/mapFunctions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUtensils,
    faBirthdayCake,
    faGlassCheers,
    faShoppingBag,
    faShoppingBasket,
    faClock,
} from '@fortawesome/free-solid-svg-icons';

const MapContainer = () => {
    useEffect(() => {
        window.initAutocomplete = initAutocomplete;

        // Load Google Maps JavaScript API
        const script = document.createElement('script');
        script.src =
            'https://maps.googleapis.com/maps/api/js?key=&callback=initAutocomplete&libraries=places&v=weekly';
        script.defer = true;
        document.body.appendChild(script);

        return () => {
            // Clean up by removing the script and window property
            document.body.removeChild(script);
            delete window.initAutocomplete;
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
