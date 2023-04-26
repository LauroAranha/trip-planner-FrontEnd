import { MdDelete, MdEditDocument } from 'react-icons/md';
import './PersonalRoadmapCard.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PersonalRoadmapCard = (props) => {
    const { image, title, description, docId } = props.props;
    const { handleOpen, setTriggerUpdate, triggerUpdate } = props;
    console.log(docId);

    const handleDelete = (docId) => {
        const deleteRoadmap = async () => {
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

        deleteRoadmap();
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

            </div>
        </div>
    );
};

export default PersonalRoadmapCard;
