import './RoadmapSquare.css';

const RoadmapSquare = (props) => {
    const { image, title, description } = props;

    const handleLongDescriptions = (description) => {
        if (description.length > 150) {
            return `${description.slice(0, 150)}...`
        }
        return description
    }
    return (
        <div className="roadmap-card">
            <img src={image} alt="Imagem" />
            <div className='roadmap-card-information'>
                <h2>{title}</h2>
                <p>{handleLongDescriptions(description)}</p>
            </div>
        </div>
    );
};

export default RoadmapSquare;
