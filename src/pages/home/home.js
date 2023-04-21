import './home-module.css';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';

import RoadmapSquare from '../../components/Roadmap-component/RoadmapSquare';

const Home = () => {
    const [roadmapList, setRoadmapList] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('roadmap/recommendedRoadmaps').then((res) => {
            const responseData = res.data.data;
            setRoadmapList(responseData);
            setIsLoading(false);
        });
    }, []);

    return (
        <div className="mainContainer">
            <Helmet>
                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
                    integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
                    crossOrigin="anonymous"
                />
            </Helmet>
            <h1 className="square-title">Recommended Road Maps</h1>
            <div className="squares-container">
                {isLoading ? (
                    <p>carregando</p>
                ) : (
                    roadmapList &&
                    roadmapList.map((object) => {
                        return (
                            <RoadmapSquare
                                image={object.image}
                                title={object.title}
                                description={object.description}
                            />
                        );
                    })
                )}
            </div>
            <h1 className="square-title">Nearby Attractions</h1>
        </div>
    );
};

export default Home;
