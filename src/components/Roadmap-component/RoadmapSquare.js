import './RoadmapSquare.css';

const RoadmapSquare = (props) => {
    const { image, title, description } = props;
    return (
        <div className="square">
            <img src={image} alt="Imagem" />
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    );
};

export default RoadmapSquare;
