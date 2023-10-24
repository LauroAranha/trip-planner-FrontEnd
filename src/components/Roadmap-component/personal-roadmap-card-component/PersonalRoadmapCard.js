import './PersonalRoadmapCard.css';

import { useState } from 'react';
import axios from 'axios';

import { MdDelete, MdEditDocument } from 'react-icons/md';
import { Link } from 'react-router-dom';

import EditRoadmapModal from '../../../pages/roadmap/edit-roadmap/EditRoadmapModal';

const PersonalRoadmapCard = (props) => {
    const { image, title, description, docId } = props.props;
    const { setTriggerUpdate, triggerUpdate } = props;
    const [open, setOpen] = useState(false);

    const handleOpen = (roadmapInformation) => {
        setOpen(true);
      
    };

    const handleClose = () => {
        setOpen(false);
        setTriggerUpdate(!triggerUpdate);
    };

    const handleDelete = async (docId) => {
        try {
            const res = await axios.delete(`roadmap/delete/${docId}`);
            const responseData = res.data.data;
            if (responseData === 1) {
                setTriggerUpdate(!triggerUpdate);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleLongDescriptions = (description) => {
        if (description.length > 150) {
            return `${description.slice(0, 150)}...`;
        }
        return description;
    };

    return (
        <div
            className="personal-roadmap-content card"
            style={{ width: '20rem' }}
        >
            <img
                src={image}
                alt="Imagem"
                className="personal-roadmap-image img-fluid"
                style={{ width: '100%', height: '200px' }}
            />
            <div className="card-body">
                <Link to={`/roadmap/${docId}`}>
                    <h2 className="card-title">{title}</h2>
                </Link>
                <p className="card-text">
                    {handleLongDescriptions(description)}
                </p>
            </div>
            <div className="personal-roadmap-buttons">
                <button
                    className="edit-button btn btn-primary"
                    onClick={() => handleOpen(props.props)}
                >
                    Editar
                    <MdEditDocument
                        style={{
                            verticalAlign: 'middle',
                        }}
                    />
                </button>
                <button
                    className="delete-button btn btn-primary"
                    onClick={() => handleDelete(docId)}
                >
                    <Link className="button-text">
                        Deletar
                        <MdDelete
                            style={{
                                verticalAlign: 'middle',
                            }}
                        />
                    </Link>
                </button>
                {
                    <EditRoadmapModal
                        open={open}
                        handleClose={handleClose}
                        modalInformation={props.props}
                    />
                }
            </div>
        </div>
    );
};

export default PersonalRoadmapCard;
