import './roteiro-details.css';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import axios from 'axios';

const RoadmapDetails = () => {
    const { travelId } = useParams();
    const [travelDetails, setTravelDetails] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`travel/get/${travelId}`).then((res) => {
            const responseData = res.data.data;
            console.log(responseData.cidadeRoteiro);
            setTravelDetails(responseData.cidadeRoteiro);
            setIsLoading(false);
        });
    }, []);

    return (
        <div className="teste">
            <p>{travelDetails}</p>
        </div>
    );
};

export default RoadmapDetails;
