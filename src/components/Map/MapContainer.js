import { useEffect, useRef } from 'react';
import './MapContainer-module.css';

import { Loader } from '@googlemaps/js-api-loader';

const MapContainer = () => {
  useEffect(() => {
    let map;
    const initMap = () => {
      map = new window.google.maps.Map(mapRef.current, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });
    };
    window.initMap = initMap;

    // TODO There may be some better way of doing it / There's no API key to prevent the not neccessary usage of the map requests
    const script1 = document.createElement('script');
    script1.src = `https://maps.googleapis.com/maps/api/js?key=&callback=initMap&v=weekly`;
    script1.defer = true;
    document.head.appendChild(script1);
  }, []);

  const mapRef = useRef(null);

  return (
    <div className="map-container">
      {/* TODO We have to put it in a separate component to be able to reuse mapComponent without the options */}
      <ul className="map-options">
        <li>Restaurants</li>
        <li>Parties</li>
        <li>Ballads</li>
        <li>Stores</li>
        <li>Malls</li>
        <li>Open 24hrs</li>
      </ul>
      <div ref={mapRef} className="map-styles" />
    </div>
  );
};

export default MapContainer;
