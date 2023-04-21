import './roteiro-details.css';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import axios from 'axios';

const RoadmapDetails = () => {
    const { roadmapId } = useParams();
    const [roadmapDetails, setRoadmapDetails] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`roadmap/get/${roadmapId}`).then((res) => {
            const responseData = res.data.data;
            console.log(responseData.cidadeRoteiro);
            setRoadmapDetails(responseData.cidadeRoteiro);
            setIsLoading(false);
        });
    }, []);

    return (
        <div className="teste">
            <p>{roadmapDetails}</p>
        </div>
    );
};

export default RoadmapDetails;
