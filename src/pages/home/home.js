// CSS
import './home-module.css';

import image1 from './img/praia-grande.png';
import image2 from './img/passeio-ibm.png';
import image3 from './img/visita-fatec.png';
import image4 from './img/parque-ibirapuera.png';

const Home = () => {
  return (
    <body>
      <h1 className="square-title">Recommended Road Maps</h1>
      <div className="squares-container">
        <div className="square">
          <img src={image1} alt="Imagem" />
          <h2>Day trip to Praia Grande</h2>
          <p>
            Round trip from SP - Praia Grande, passing by some beaches and local
            restaurants...
          </p>
        </div>
        <div className="square">
          <img src={image2} alt="Imagem" />
          <h2>IBM Ride</h2>
          <p>
            Itinerary including trip to IBM Tutoia and Ibirapuera, departing
            from Paraíso subway station.
          </p>
        </div>
        <div className="square">
          <img src={image3} alt="Imagem" />
          <h2>Visit FATEC</h2>
          <p>
            Itinerary to get to know Fatec in São Paulo, located near the
            Tiradentes metro station
          </p>
        </div>
        <div className="square">
          <img src={image4} alt="Imagem" />
          <h2>Meet Ibirapuera</h2>
          <p>
            Get to know this great park in São Paulo, with large leisure areas
            and walks to relax.
          </p>
        </div>
      </div>
      <h1 className="map-title">Nearby attractions</h1>
    </body>
  );
};

export default Home;
