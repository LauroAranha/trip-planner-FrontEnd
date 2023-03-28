import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

import styles from './MapContainer-module.css';

class MapContainer extends Component {
  render() {
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
        <Map
          className="map"
          google={this.props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{ lat: -23.5489, lng: -46.6388 }}
        />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBKsYdHxVPivYhamvSD_TkYXJuJbIJ1W1U',
})(MapContainer);
