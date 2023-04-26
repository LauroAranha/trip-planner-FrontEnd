import './roadmaps-module.css';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MdDelete, MdEditDocument, MdAdd } from 'react-icons/md';

import { getCurrentUserInformation } from '../../components/utils/userUtils';
import EditRoadmap from './edit-roadmap/editRoadmap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import PersonalRoadmapCard from '../../components/Roadmap-component/personal-roadmap-card-component/PersonalRoadmapCard';
import EditRoadmapModal from './edit-roadmap/EditRoadmapModal';

const Roadmap = () => {
    const [personalPersonalRoadmapList, setPersonalRoadmapList] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [triggerUpdate, setTriggerUpdate] = useState(true);
    const [open, setOpen] = useState(false);
    const [modalInformation, setModalInformation] = useState('');

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

    const handleOpen = (roadmapInformation) => {
        setOpen(true);
        setModalInformation(roadmapInformation);
    };
    const handleClose = () => {
        setOpen(false);
        setTriggerUpdate(!triggerUpdate)
    };

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
                                <>
                                    <PersonalRoadmapCard
                                        props={roadmapInformation}
                                        handleClose={handleClose}
                                        handleOpen={handleOpen}
                                        stateChanger={setTriggerUpdate}
                                        triggerUpdateProp={triggerUpdate}
                                    />
                                    {EditRoadmapModal}
                                </>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default Roadmap;
