// CSS
import './home-module.css';

import image1 from './img/praia-grande.png';

const Home = () => {
  return (
    <body>
      <h1 className="square-title">Recommended Road Maps</h1>
      <div className="squares-container">
        <div className="square">
          <img src={image1} alt="Imagem" className="square-img" />
          <h2>Título</h2>
          <p>Descrição</p>
        </div>
        <div className="square">
          <img src={image1} alt="Imagem" />
          <h2>Título</h2>
          <p>Descrição</p>
        </div>
        <div className="square">
          <img src={image1} alt="Imagem" />
          <h2>Título</h2>
          <p>Descrição</p>
        </div>
      </div>
    </body>
  );
};

export default Home;
