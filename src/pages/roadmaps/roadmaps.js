import './roadmaps-module.css';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
//import { MdDelete, MdEditDocument } from 'react-icons/md';
import TravelSquare from '../../components/Travel-component/TravelSquare';

const Home = () => {
    const [travelList, setTravelList] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const teste = axios
            .post('http://localhost:3001/travel/getCurrentUserTravels', {
                currentUserId: '2Rp0A5n0gvhjvMIZ0PfE',
            })
            .then((res) => {
                const responseData = res.data.data;
                console.log(responseData);
                setTravelList(responseData);
                // setIsLoading(false);
            });
    }, []);

    return (
        <div className="mainContainer">
            <h1 className="square-title">My Road Maps</h1>
            <Link to="/roteiro" className="button">
                + NEW ROADMAP
            </Link>
            <Link to="/roteiro" className="button"></Link>
            <div className="squares-container">
                {isLoading ? (
                    <p>carregando</p>
                ) : (
                    travelList &&
                    travelList.map((object) => {
                        return (
                            <div className="square">
                                {object.data.title}
                                {object.data.image}
                                {object.data.description}
                                {object.data.recomendacaoTransporte}
                                {object.data.custoMedio}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default Home;
