import './roadmap-details.css';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faCheck, faDog } from '@fortawesome/free-solid-svg-icons';

const RoadmapDetails = () => {
    const { roadmapId } = useParams();
    const [roadmapDetails, setRoadmapDetails] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    let countParadas = 0;

    useEffect(() => {
        axios.get(`roadmap/get/${roadmapId}`).then((res) => {
            const responseData = res.data.data;
            setRoadmapDetails(responseData);
            setIsLoading(false);
        });
    }, []);

    const [copied, setCopied] = useState(false);

    function handleCopyLink() {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
    }

    return (
        <div className="roadmapBox">
            <h1 className="title">{roadmapDetails.title}</h1>

            <img src={roadmapDetails.image} alt="Imagem" className="image" />

            <h2 className="roadmapInformation">Descrição</h2>
            <p className="roadmapInformation">{roadmapDetails.description}</p>

            <h2 className="roadmapInformation">Custo médio por pessoa</h2>
            <p className="roadmapInformation">R${roadmapDetails.custoMedio}</p>

            <h2 className="roadmapInformation">Cidade do roteiro</h2>
            <p className="roadmapInformation">{roadmapDetails.cidadeRoteiro}</p>

            <h2 className="roadmapInformation">
                Ponto(s) de parada recomendado(s)
            </h2>
            {roadmapDetails &&
                roadmapDetails.paradasRecomendadas.map((object) => {
                    countParadas++;
                    return (
                        <p className="roadmapInformation">
                            Parada {countParadas}: {object}
                        </p>
                    );
                })}

            <h2 className="roadmapInformation">Ponto de partida</h2>
            <p className="roadmapInformation">{roadmapDetails.pontoInicial}</p>

            <h2 className="roadmapInformation">Ponto final</h2>
            <p className="roadmapInformation">{roadmapDetails.pontoFinal}</p>

            {roadmapDetails.petsOk ? (
                <>
                    <h2 className="roadmapInformation">Pet friendly</h2>
                    <FontAwesomeIcon icon={faDog} className="nav-icon" />
                </>
            ) : (
                <>
                    <h2 className="roadmapInformation">
                        {' '}
                        Não aconselhável a pets
                    </h2>
                    <FontAwesomeIcon icon={faBan} className="nav-icon" />
                </>
            )}

            {roadmapDetails.criancaOk ? (
                <>
                    <h2 className="roadmapInformation">
                        Aconselhável a menores de idade
                    </h2>
                    <FontAwesomeIcon icon={faCheck} className="nav-icon" />
                </>
            ) : (
                <>
                    <h2 className="roadmapInformation">
                        Não aconselhável a menores de idade
                    </h2>
                    <FontAwesomeIcon icon={faBan} className="nav-icon" />
                </>
            )}
            <h2 className="share">Gostou do roteiro? Compartilhe!</h2>
            <button className="buttonLink" onClick={handleCopyLink}>
                {copied ? 'URL na aréa de transferência!' : 'Copiar URL'}
            </button>
        </div>
    );
};

export default RoadmapDetails;