import './RoadmapSquare.css';

const RoadmapSquare = (props) => {
    const { image, title, description } = props;

    const handleLongDescriptions = (description) => {
        if (description.length > 150) {
            return `${description.slice(0, 150)}...`;
        }
        return description;
    };
    return (
        <div className="personal-roadmap-content card" style={{width: '20rem'}}>
            <img src={image} alt="Imagem" className="personal-roadmap-image img-fluid" style={{ width: '100%', height: '200px' }} />
            <div className="roadmap-card-information card-body">
                <h2 className="card-title">{title}</h2>
                <p className="card-text">{handleLongDescriptions(description)}</p>
            </div>
        </div>
    );
};

export default RoadmapSquare;
