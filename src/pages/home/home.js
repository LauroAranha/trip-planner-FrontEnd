import './home-module.css';

import { useEffect, useState } from 'react';
import axios from 'axios';

import TravelSquare from '../../components/Travel-component/TravelSquare';

const Home = () => {
  const [travelList, setTravelList] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3001/travel/get/all').then((res) => {
      const { data } = res;
      setTravelList(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="mainContainer">
      <h1 className="square-title">Recommended Road Maps</h1>
      <div className="squares-container">
        {isLoading ? (
          <p>carregando</p>
        ) : (
          travelList &&
          travelList.map((object) => {
            return (
              <TravelSquare
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
