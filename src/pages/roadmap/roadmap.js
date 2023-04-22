/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/button-has-type */
import './roadmaps-module.css';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MdDelete, MdEditDocument, MdAdd, MdEdit } from 'react-icons/md';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { getCurrentUserInformation } from '../../components/utils/userUtils';
import EditRoadmap from './edit-roadmap/editRoadmap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const Roadmap = () => {
    const [roadmapList, setRoadmapList] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [triggerUpdate, setTriggerUpdate] = useState(true);
    const [open, setOpen] = useState(false);
    const [modalInformation, setModalInformation] = useState('');

    const user = getCurrentUserInformation();
    const userId = user.uid;

    useEffect(() => {
        const fetchCurrentUserRoadmaps = async () => {
            try {
                const res = await axios.get(
                    `roadmap/getCurrentUserRoadmaps/${userId}`
                );
                const responseData = res.data.data;
                setRoadmapList(responseData);
                setIsLoading(false);
                setTriggerUpdate(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchCurrentUserRoadmaps();
    }, [triggerUpdate]);

    const handleOpen = (roadmapInformation) => {
        setOpen(true);
        setModalInformation(roadmapInformation);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = (docId) => {
        const deleteRoadmap = async () => {
            try {
                const res = await axios.delete(`roadmap/delete/${docId}`);
                const responseData = res.data.data;

                if (responseData === 1) {
                    setIsLoading(false);
                    setTriggerUpdate(!triggerUpdate);
                }
            } catch (error) {
                console.error(error);
            }
        };

        deleteRoadmap();
    };

    const modalRoamap = (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
        >
            <Box
                sx={{
                    ...style,
                    width: '50%',
                    height: '80%',
                    overflowY: 'scroll',
                }}
            >
                <h2
                    className="title"
                    style={{
                        display: 'flex',
                    }}
                >
                    <p
                        style={{
                            fontWeight: 'bold',
                            justifyContent: 'flex-start',
                        }}
                    >
                        Editar roteiro
                    </p>{' '}
                    <p
                        style={{
                            marginLeft: '10px',
                            fontWeight: 'lighter',
                            justifyContent: 'flex-start',
                        }}
                    >
                        {modalInformation.title}
                    </p>
                    <Button
                        onClick={handleClose}
                        style={{
                            position: 'flex',
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faClose}
                            className="nav-icon"
                            color="red"
                        />
                    </Button>
                </h2>
                <EditRoadmap props={modalInformation} />
            </Box>
        </Modal>
    );

    return (
        <div>
            <div className="squares-container">
                <div className="mainContainer">
                    <h1 className="square-title">My Road Maps</h1>
                    <div className="addButton">
                        <Link to="/roadmap/add" className="buttonText">
                            New roadmap
                            <MdAdd />
                        </Link>
                    </div>
                    <div className="squares-container">
                        {isLoading ? (
                            <p>carregando</p>
                        ) : (
                            roadmapList &&
                            roadmapList.map((roadmapInformation) => {
                                return (
                                    <div
                                        className="square"
                                        id={roadmapInformation.docId}
                                    >
                                        <p> {roadmapInformation.title} </p>
                                        <img src={roadmapInformation.image} />
                                        <p>{roadmapInformation.description}</p>
                                        <p>
                                            {
                                                roadmapInformation.recomendacaoTransporte
                                            }
                                        </p>
                                        <p>{roadmapInformation.custoMedio}</p>
                                        <button
                                            className="deleteButton"
                                            onClick={() =>
                                                handleDelete(
                                                    roadmapInformation.docId
                                                )
                                            }
                                        >
                                            <Link className="buttonText">
                                                Delete
                                                <MdDelete
                                                    style={{
                                                        verticalAlign: 'middle',
                                                    }}
                                                />
                                            </Link>
                                        </button>
                                        <button
                                            className="editButton"
                                            onClick={() =>
                                                handleOpen(roadmapInformation)
                                            }
                                        >
                                            Edit roadmap
                                            <MdEdit
                                                style={{
                                                    verticalAlign: 'middle',
                                                }}
                                            />
                                        </button>
                                        {modalRoamap}
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Roadmap;
