import './roadmap-details.css';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import axios from 'axios';

const RoadmapDetails = () => {
  const { roadmapId } = useParams();
  const [roadmapDetails, setRoadmapDetails] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`roadmap/get/${roadmapId}`).then((res) => {
      const responseData = res.data.data;
      console.log(responseData);
      setRoadmapDetails(responseData);
      setIsLoading(false);
    });
  }, []);
  const array = roadmapDetails.paradasRecomendadas;

  return (
    <div className="roadmapBox">
      <p className="title">{roadmapDetails.title}</p>
      <img src={roadmapDetails.image} alt="Imagem" className="image" />
      <p>{roadmapDetails.description}</p>
      <p>{roadmapDetails.custoMedio}</p>
      <p>{roadmapDetails.cidadeRoteiro}</p>
      <div className="paradas "></div>
      <p>{roadmapDetails.pontoInicial}</p>
      <p>{roadmapDetails.pontoFinal}</p>
      <p>{roadmapDetails.petsOk}</p>
      <p>{roadmapDetails.criancaOk}</p>
    </div>
  );
};

export default RoadmapDetails;
