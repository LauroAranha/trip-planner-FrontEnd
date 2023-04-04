import './MapContainer-module.css';

import { Loader } from '@googlemaps/js-api-loader';

const MapContainer = () => {
  const mapStyles = {
    display: 'flex',
    width: '60%',
    height: '40%',
    borderRadius: '30px',
    padding: '0.5%',
    border: '16px solid #42B0FF',
    marginTop: '20px',
  };

  return (
    <div className="map-container">
      <ul className="map-options">
        <li>Restaurants</li>
        <li>Parties</li>
        <li>Ballads</li>
        <li>Stores</li>
        <li>Malls</li>
        <li>Open 24hrs</li>
      </ul>
    </div>
  );
};

export default MapContainer;
