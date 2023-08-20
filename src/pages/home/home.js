import './home-module.css';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import RoadmapSquare from '../../components/Roadmap-component/RoadmapSquare';

const Home = () => {
    const [recommendedRoadmapList, setRecommendedRoadmapList] = useState();
    const [publicRoadmapList, setPublicRoadmapList] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('roadmap/getRecommendedRoadmaps').then((res) => {
            const responseData = res.data.data;
            setRecommendedRoadmapList(responseData);
            setIsLoading(false);
        });
    }, []);

    useEffect(() => {
        axios.get('roadmap/public').then((res) => {
            const responseData = res.data.data;
            console.log('responseData');
            setPublicRoadmapList(responseData);
            setIsLoading(false);
        });
    }, []);

    return (
        <div className="main-container">
            <h1 className="main-container-title">Recommended Road Maps</h1>
            <div className="main-roadmap-cards-container">
                {isLoading ? (
                    <p>carregando</p>
                ) : (
                    recommendedRoadmapList &&
                    recommendedRoadmapList.map((object) => {
                        return (
                            <Link to={`/roadmap/${object.docId}`}>
                                <RoadmapSquare
                                    image={object.image}
                                    title={object.title}
                                    description={object.description}
                                />
                            </Link>
                        );
                    })
                )}
            </div>
            <h1 className="main-container-title" style={{ marginTop: '5%' }}>Public Road Maps</h1>
            <div className="main-roadmap-cards-container">
                {isLoading ? (
                    <p>carregando</p>
                ) : (
                    publicRoadmapList &&
                    publicRoadmapList.map((object) => {
                        return (
                            <Link to={`/roadmap/${object.docId}`}>
                                <RoadmapSquare
                                    image={object.image}
                                    title={object.title}
                                    description={object.description}
                                />
                            </Link>
                        );
                    })
                )}
            </div>
            <h1 className="main-container-title" style={{ marginTop: '3%' }}>Nearby Attractions</h1>
        </div>
    );
};

export default Home;
