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
        setModalInformation(roadmapInformation);
    };

    const handleClose = () => {
        setOpen(false);
        setTriggerUpdate(false)

    };

    const handleDelete = async (docId) => {
        try {
            const res = await axios.delete(`roadmap/delete/${docId}`);
            const responseData = res.data.data;
            if (responseData === 1) {
                setTriggerUpdate(!triggerUpdate)
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleLongDescriptions = (description) => {
        if (description.length > 150) {
            return `${description.slice(0, 150)}...`
        }
        return description
    }

    return (
        <div className="personal-roadmap-card">
            <img src={image} alt="Imagem" />
            <div className='personal-roadmap-card-information'>
                <h2>{title}</h2>
                <p>{handleLongDescriptions(description)}</p>
            </div>
            <div className="personal-roadmap-buttons">
                <button
                    className="edit-button"
                    onClick={() =>
                        handleOpen(props.props)
                    }
                >
                    Edit roadmap
                    <MdEditDocument
                        style={{
                            verticalAlign: 'middle',
                        }}
                    />
                </button>
                <button
                    className="delete-button"
                    onClick={() =>
                        handleDelete(
                            docId
                        )
                    }
                >
                    <Link className="button-text">
                        Delete
                        <MdDelete
                            style={{
                                verticalAlign: 'middle',
                            }}
                        />
                    </Link>
                </button>
                {<EditRoadmapModal open={open} handleClose={handleClose} modalInformation={props.props} />}
            </div>
        </div>
    );
};

export default PersonalRoadmapCard;
