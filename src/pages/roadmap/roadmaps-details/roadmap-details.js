import './roadmap-details.css';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faCheck, faDog, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { AiFillLike, AiFillDislike } from "react-icons/ai"
const RoadmapDetails = () => {
    const { roadmapId } = useParams();
    const [roadmapDetails, setRoadmapDetails] = useState('');

    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

    const handleLike = () => {
        setLiked(!liked);
        setDisliked(false);
    };

    const handleDislike = () => {
        setDisliked(!disliked);
        setLiked(false);
    };

    useEffect(() => {
        axios.get(`roadmap/get/${roadmapId}`).then((res) => {
            const responseData = res.data.data;
            setRoadmapDetails(responseData);
        });
    }, []);

    const [copied, setCopied] = useState(false);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
    }

    return (
        <div className="roadmap-details-box">
            <div className="roadmap-details-main">
                <img
                    src={roadmapDetails.image}
                    alt="Imagem"
                    className="roadmap-details-main-image"
                />

                <div className='feedback-section'>
                    <button className="feedback-section-icon-like" onClick={handleLike}>
                        <AiFillLike className='feedback-section-icon' color={liked ? "blue" : "black"} />
                       
                    </button>
                  
                    <button className="feedback-section-icon-dislike" onClick={handleDislike}>
                        <AiFillDislike className='feedback-section-icon' color={disliked ? "red" : "black"} />
                 
                    </button>
              
                </div>
                <div className='clicks-section'>
                <h1 className="clicks"> 177</h1>
                <h1 className="clicks"> 12</h1></div>
            </div>

            <div className="roadmap-details-information">
                <h1 className="roadmap-details-title">
                    {roadmapDetails.title}
                </h1>

                <h2>Descrição</h2>
                <p>{roadmapDetails.description}</p>

                <h2>Custo médio por pessoa</h2>
                <p>R${roadmapDetails.custoMedio}</p>

                <h2>Cidade do roteiro</h2>
                <p>{roadmapDetails.cidadeRoteiro}</p>

                <h2>Ponto de partida</h2>
                <p>{roadmapDetails.pontoInicial}</p>

                <h2>Ponto final</h2>
                <p>{roadmapDetails.pontoFinal}</p>
                {roadmapDetails.petsOk ? (
                    <div className="labelWithIcon">
                        <h2>Pet friendly</h2>
                        <FontAwesomeIcon
                            icon={faDog}
                            className="roadmap-information-icon"
                        />
                    </div>
                ) : (
                    <div className="labelWithIcon">
                        <h2> Não aconselhável a pets</h2>
                        <FontAwesomeIcon
                            icon={faBan}
                            className="roadmap-information-icon"
                        />
                    </div>
                )}

                {roadmapDetails.criancaOk ? (
                    <div className="labelWithIcon">
                        <h2>Aconselhável a menores de idade</h2>
                        <FontAwesomeIcon
                            icon={faCheck}
                            className="roadmap-information-icon"
                        />
                    </div>
                ) : (
                    <div className="labelWithIcon">
                        <h2>Não aconselhável a menores de idade</h2>
                        <FontAwesomeIcon
                            icon={faBan}
                            className="roadmap-information-icon"
                        />
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