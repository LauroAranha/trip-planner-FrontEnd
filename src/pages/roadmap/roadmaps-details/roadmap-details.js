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
        <div className="roadmap-details-box">
            <div className='roadmap-details-main'>
                <img src={roadmapDetails.image} alt="Imagem" className="roadmap-details-main-image" />
            </div>
            <div className='roadmap-details-information'>
                <h1 className="roadmap-details-title">{roadmapDetails.title}</h1>

                <h2>Descrição</h2>
                <p>{roadmapDetails.description}</p>

                <h2>Custo médio por pessoa</h2>
                <p>R${roadmapDetails.custoMedio}</p>

                <h2>Cidade do roteiro</h2>
                <p>{roadmapDetails.cidadeRoteiro}</p>

                <h2>
                    Ponto(s) de paradas recomendada(s)
                </h2>
                {roadmapDetails &&
                    roadmapDetails.paradasRecomendadas.map((object) => {
                        countParadas++;
                        if (!object) {
                            return
                        }
                        return (
                            <p>
                                Parada {countParadas}: {object}
                            </p>
                        );
                    })}

                <h2>Ponto de partida</h2>
                <p>{roadmapDetails.pontoInicial}</p>

                <h2>Ponto final</h2>
                <p>{roadmapDetails.pontoFinal}</p>

                {roadmapDetails.petsOk ? (
                    <div className='labelWithIcon'>
                        <h2>Pet friendly</h2>
                        <FontAwesomeIcon icon={faDog} className="roadmap-information-icon" />
                    </div>
                ) : (
                    <div className='labelWithIcon'>
                        <h2>
                            {' '}
                            Não aconselhável a pets
                        </h2>
                        <FontAwesomeIcon icon={faBan} className="roadmap-information-icon" />
                    </div>
                )}

                {roadmapDetails.criancaOk ? (
                    <div className='labelWithIcon'>
                        <h2>
                            Aconselhável a menores de idade
                        </h2>
                        <FontAwesomeIcon icon={faCheck} className="roadmap-information-icon" />
                    </div>
                ) : (
                    <div className='labelWithIcon'>
                        <h2>
                            Não aconselhável a menores de idade
                        </h2>
                        <FontAwesomeIcon icon={faBan} className="roadmap-information-icon" />
                    </div>
                )}
                <h2 className="share">Gostou do roteiro? Compartilhe!</h2>
                <button className="button-link" onClick={handleCopyLink}>
                    {copied ? 'URL na aréa de transferência!' : 'Copiar URL'}
                </button>
            </div>
        </div>
    );
};

export default RoadmapDetails;

