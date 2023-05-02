import './roadmaps-module.css';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';

import { getCurrentUserInformation } from '../../components/utils/userUtils';

import PersonalRoadmapCard from '../../components/Roadmap-component/personal-roadmap-card-component/PersonalRoadmapCard';

const Roadmap = () => {
    const [personalPersonalRoadmapList, setPersonalRoadmapList] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [triggerUpdate, setTriggerUpdate] = useState(true);

    const user = getCurrentUserInformation();
    const userId = user.email;

    useEffect(() => {
        const fetchCurrentUserRoadmaps = async () => {
            console.log(getCurrentUserInformation());
            try {
                const res = await axios.get(
                    `roadmap/getCurrentUserRoadmaps/${userId}`
                );
                const responseData = res.data.data;
                setPersonalRoadmapList(responseData);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchCurrentUserRoadmaps();
    }, [triggerUpdate]);

    return (
        <div className="personal-roadmap-container">
            <div className="main-container">
                <h1 className="personal-roadmap-title">My Road Maps</h1>
                <p className="add-button">
                    <Link to="/roadmap/add" className="button-text">
                        New roadmap
                        <MdAdd />
                    </Link>
                </p>


                <div className="personal-roadmap-container-grid">
                    {isLoading ? (
                        <p>carregando</p>
                    ) : (
                        personalPersonalRoadmapList &&
                        personalPersonalRoadmapList.map((roadmapInformation) => {
                            return (

                                <PersonalRoadmapCard
                                    props={roadmapInformation}
                                    setTriggerUpdate={setTriggerUpdate}
                                    triggerUpdate={triggerUpdate}
                                />

                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default Roadmap;
