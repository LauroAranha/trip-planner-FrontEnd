import './PersonalRoadmapCard.css';

import { useState } from 'react';
import axios from 'axios';

import { MdDelete, MdEditDocument } from 'react-icons/md';
import { Link } from 'react-router-dom';


const SaveRoadmapCard = (props) => {
    const { image, title, description, docId, roadmapId } = props.props;

    const handleLongDescriptions = (description) => {
        if (description.length > 150) {
            return `${description.slice(0, 150)}...`;
        }
        return description;
    };

    return (
        <div className="personal-roadmap-content card" style={{ width: '20.2rem', height: '22rem' }}>
            <img
                src={image}
                alt="Imagem"
                className="personal-roadmap-image img-fluid"
                style={{ width: '100%', height: '180px' }}
            />
            <div className="card-body">
            <Link to={`/roadmap/${roadmapId}`}>
                    <h2 className="card-title">{title}</h2>
                </Link>
                <p className="card-text">
                    {handleLongDescriptions(description)}
                </p>
            </div>
            </div>
    );
};

export default SaveRoadmapCard;