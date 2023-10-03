import './roadmaps-module.css';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { getCurrentUserInformation } from '../../components/utils/userUtils';

import SavesRoadmapCard from '../../components/Roadmap-component/personal-roadmap-card-component/SaveRoadmapCard';

const RoadmapSaves = () => {

    const [savedRoadmaps, setSavedRoadmaps] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [triggerUpdate, setTriggerUpdate] = useState(true);

    const user = getCurrentUserInformation();
    const userId = user.uid;

    useEffect(() => {
    const fetchSavedRoadmaps = async () => {
        console.log(getCurrentUserInformation());
        try {
            const res = await axios.get(
                `roadmap/getSavedRoadmaps/${userId}`
            );
            const responseData = res.data.data;
            setSavedRoadmaps(responseData);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    fetchSavedRoadmaps();
}, [triggerUpdate]);

    return (
        <div className="personal-roadmap-container">
        <div className="main-container">
            <h1 className="personal-roadmap-title">Roteiros Salvos</h1>
            <div className="personal-roadmap-container-grid">
                {isLoading ? (
                    <p>carregando</p>
                ) : (
                    savedRoadmaps &&
                    savedRoadmaps.map(
                        (roadmapInformation) => {
                            return (
                                <SavesRoadmapCard
                                    props={roadmapInformation}
                                    setTriggerUpdate={setTriggerUpdate}
                                    triggerUpdate={triggerUpdate}
                                />
                            );
                        }
                    )
                )}
            </div>
        </div>
    </div>
    );
};

export default RoadmapSaves;
