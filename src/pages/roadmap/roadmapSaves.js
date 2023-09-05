import './roadmaps-module.css';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { getCurrentUserInformation } from '../../components/utils/userUtils';
import RoadmapSquare from '../../components/Roadmap-component/RoadmapSquare';


const RoadmapSaves = () => {

    // const [savedRoadmapIds, setSavedRoadmapIds] = useState([]);
    // const [savedRoadmaps, setSavedRoadmaps] = useState([]);
    // const userInfo = getCurrentUserInformation();
    
    // useEffect(() => {
    //     const fetchSavedRoadmapIds = async () => {
    //         try {
    //             const response = await axios.post('http://localhost:3001/roadmap/savedRoadmapIds', {
    //             userId: userInfo.userId,
    //             });
    
    //             setSavedRoadmapIds(response.data.savedRoadmapIds);
    //             } catch (error) {
    //                 console.error('Erro ao buscar IDs dos roteiros salvos:', error);
    //             }
    //     };
    //     fetchSavedRoadmapIds();
    // }, [userInfo.userId]);

    return (
        <div>
            <h1>Roteiros Salvos</h1>
            <div className="saved-roadmap-cards-container">
                {savedRoadmaps.map((roadmap) => (
                    <RoadmapSquare
                        key={roadmap.docId}
                        image={roadmap.image}
                        title={roadmap.title}
                        description={roadmap.description}
                    />
                ))}
            </div>
        </div>
    );
};

export default RoadmapSaves;
