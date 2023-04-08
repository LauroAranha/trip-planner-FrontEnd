import { useEffect, useRef } from 'react';
import './MapContainer-module.css';

import { Loader } from '@googlemaps/js-api-loader';
import { initAutocomplete } from '../utils/mapFunctions';

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
        <li>Restaurants</li>
        <li>Parties</li>
        <li>Ballads</li>
        <li>Stores</li>
        <li>Malls</li>
        <li>Open 24hrs</li>
      </ul>

      <div id="map" className="map-styles" />
    </div>
  );
};

export default MapContainer;
