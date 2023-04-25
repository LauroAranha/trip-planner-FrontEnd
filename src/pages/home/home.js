import './home-module.css';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
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
    <div className="main-container">
      <h1 className="main-container-title">Recommended Road Maps</h1>
      <div className="main-roadmap-cards-container">
        {isLoading ? (
          <p>carregando</p>
        ) : (
          roadmapList &&
          roadmapList.map((object) => {
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
      <h1 className="main-container-title">Nearby Attractions</h1>
    </div>
  );
};

export default Home;
