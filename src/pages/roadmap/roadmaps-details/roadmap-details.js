import './roadmap-details.css';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBan,
    faCheck,
    faDog,
    faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import { Modal, Button, Box, Typography } from '@mui/material'; // Import Modal and other necessary components from MUI
import { getCurrentUserInformation } from '../../../components/utils/userUtils';

const isRoadmapSaved = (roadmapId) => {
    const savedRoadmaps = JSON.parse(localStorage.getItem('savedRoadmaps')) || [];
    return savedRoadmaps.includes(roadmapId);
};

const RoadmapDetails = () => {
    const { roadmapId } = useParams();
    const [roadmapDetails, setRoadmapDetails] = useState('');
    const userInfo = getCurrentUserInformation();

    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [saved, setSaved] = useState(isRoadmapSaved(roadmapId));

    const [values, setValues] = useState([]);

    const handleSubmit = async (event, userInfo) => {
        event.preventDefault();
        try {
            values.name = userInfo.name;
            values.email = userInfo.email;
            values.userId = userInfo.userId;
            values.status = "open";
            values.date = Date.now();
            values.roadmapId = roadmapId;
            await axios.post('roadmap/report', { ...values })
            alert("roadmap denunciado com sucesso")
            setOpen(false)
        } catch (error) {
            console.log('deu ruim: ' + error)
        }
    };

    const handleLike = async () => {
        const abc = await getCurrentUserInformation().uid;
        setLiked(!liked);
        setDisliked(false);

        if (liked === false) {
            axios.put('http://localhost:3001/roadmap/edit/feedback', {
                documentId: roadmapId,
                userId: abc,
                rating: 1,
            });
        } else {
            axios.put('http://localhost:3001/roadmap/edit/feedback', {
                documentId: roadmapId,
                userId: abc,
                rating: 0,
            });
        }
        window.location.reload();
    };

    const handleDislike = async () => {
        const abc = await getCurrentUserInformation().uid;
        setDisliked(!disliked);
        setLiked(false);

        if (disliked === false) {
            axios.put('http://localhost:3001/roadmap/edit/feedback', {
                documentId: roadmapId,
                userId: abc,
                rating: 2,
            });
        } else {
            axios.put('http://localhost:3001/roadmap/edit/feedback', {
                documentId: roadmapId,
                userId: abc,
                rating: 0,
            });
        }

        setTimeout(() => {
            window.location.reload();
        }, 500);
    };

    useEffect(() => {
        axios.get(`roadmap/get/${roadmapId}`).then((res) => {
            const responseData = res.data.data;
            setRoadmapDetails(responseData);
        });
    }, []);
    
    const handleSave = async () => {
        const userId = getCurrentUserInformation().uid;
        try {
            if (saved) {
                await axios.post('http://localhost:3001/roadmap/unsave', {
                    userId: userId,
                    roadmapId: roadmapId,
                });
    
                const savedRoadmaps = JSON.parse(localStorage.getItem('savedRoadmaps')) || [];
                const updatedSavedRoadmaps = savedRoadmaps.filter((savedId) => savedId !== roadmapId);
                localStorage.setItem('savedRoadmaps', JSON.stringify(updatedSavedRoadmaps));
                setSaved(false);
    
                alert('Roteiro removido dos salvos com sucesso');
            } else {
                await axios.post('http://localhost:3001/roadmap/save', {
                    userId: userId,
                    roadmapId: roadmapId,
                });
    
                const savedRoadmaps = JSON.parse(localStorage.getItem('savedRoadmaps')) || [];
                savedRoadmaps.push(roadmapId);
                localStorage.setItem('savedRoadmaps', JSON.stringify(savedRoadmaps));
                setSaved(true);
    
                alert('Roteiro salvo com sucesso');
            }
        } catch (error) {
            console.error('Erro ao salvar ou remover o roteiro:', error);
            alert('Ocorreu um erro ao salvar ou remover o roteiro.');
        }
    };
    
    
    const [copied, setCopied] = useState(false);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
    };

    // Modal State
    const [open, setOpen] = useState(false);

    // Open Modal
    const handleOpen = () => {
        setOpen(true);
    };

    // Close Modal
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="roadmap-details-box">
            <div className="roadmap-details-main">
                <img
                    src={roadmapDetails.image}
                    alt="Imagem"
                    className="roadmap-details-main-image"
                />

                <div className="feedback-section">
                    <button
                        className="feedback-section-icon-like"
                        onClick={handleLike}
                    >
                        <AiFillLike
                            className="feedback-section-icon"
                            color={liked ? 'blue' : 'black'}
                        />
                    </button>

                    <button
                        className="feedback-section-icon-dislike"
                        onClick={handleDislike}
                    >
                        <AiFillDislike
                            className="feedback-section-icon"
                            color={disliked ? 'red' : 'black'}
                        />
                    </button>
                    <Button variant="outlined" color="primary" onClick={handleOpen}>
                        Denunciar roadmap
                    </Button>

                    <button onClick={handleSave}>
                        {saved ? 'Roteiro Salvo' : 'Salvar Roteiro'}
                    </button>
            
                    <Modal
                        open={open}
                        onClose={handleClose}
                    >
                        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 800, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                            <h1>
                                Denunciar roteiro
                            </h1>
                            <form
                                action="#"
                                className="signin-form"
                                onSubmit={event => handleSubmit(event, userInfo)}
                            >
                                <p>Motivo da denúncia</p>
                                <input
                                    type="text"
                                    name="email"
                                    className="form-control"
                                    placeholder="Insira o motivo"
                                    value={values.email}
                                    onChange={(e) =>
                                        setValues({
                                            ...values,
                                            reason: e.target.value,
                                        })
                                    }
                                    required
                                />
                                <p>Descrição</p>
                                <textarea
                                    name="description"
                                    className="form-control"
                                    placeholder="Insira a descricao"
                                    value={values.email}
                                    onChange={(e) =>
                                        setValues({
                                            ...values,
                                            description: e.target.value,
                                        })
                                    }
                                    required
                                />
                                <button
                                    type="submit"
                                    className="form-control btn btn-primary submit px-3"
                                    style={{ 'marginTop': '1vw' }}
                                >
                                    Enviar denúncia
                                </button>
                            </form>
                        </Box>
                    </Modal>
                </div>
                <div className="clicks-section">
                    <h1 className="clicks"> {roadmapDetails.likes}</h1>
                    <h1 className="clicks"> {roadmapDetails.dislikes}</h1>
                </div>
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
                    {copied ? 'URL na área de transferência!' : 'Copiar URL'}
                </button>
            </div>
        </div>
    );
};

export default RoadmapDetails;
