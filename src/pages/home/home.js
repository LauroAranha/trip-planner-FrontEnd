import './home-module.css';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';

import { auth } from '../../firebase';

import TravelSquare from '../../components/Travel-component/TravelSquare';

const Home = () => {
  const [travelList, setTravelList] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3001/travel/recommendedTravels').then((res) => {
      const responseData = res.data.data;
      setTravelList(responseData);
      setIsLoading(false);
    });
    const user = auth.currentUser;
    console.log(user);
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
