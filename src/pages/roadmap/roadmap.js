/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/button-has-type */
import './roadmaps-module.css';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MdDelete, MdEditDocument, MdAdd, MdEdit } from 'react-icons/md';
import { getCurrentUserInformation } from '../../components/utils/userUtils';

const Roadmap = () => {
    const [roadmapList, setRoadmapList] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [triggerUpdate, setTriggerUpdate] = useState(true);

    const user = getCurrentUserInformation();
    const userId = user.uid;

    useEffect(() => {
        const fetchCurrentUserRoadmaps = async () => {
            try {
                const res = await axios.get(
                    `roadmap/getCurrentUserRoadmaps/${userId}`
                );
                const responseData = res.data.data;
                setRoadmapList(responseData);
                setIsLoading(false);
                setTriggerUpdate(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchCurrentUserRoadmaps();
    }, [triggerUpdate]);

    const handleDelete = (docId) => {
        const deleteRoadmap = async () => {
            try {
                const res = await axios.delete(`roadmap/delete/${docId}`);
                const responseData = res.data.data;

                if (responseData === 1) {
                    setIsLoading(false);
                    setTriggerUpdate(true);
                }
            } catch (error) {
                console.error(error);
            }
        };

        deleteRoadmap();
    };

    return (
        <div>
            <div className="squares-container">
                <div className="mainContainer">
                    <h1 className="square-title">My Road Maps</h1>
                    <div className="addButton">
                        <Link to="/roadmap/add" className="buttonText">
                            New roadmap
                            <MdAdd />
                        </Link>
                    </div>
                    <div className="squares-container">
                        {isLoading ? (
                            <p>carregando</p>
                        ) : (
                            roadmapList &&
                            roadmapList.map((object) => {
                                return (
                                    <div className="square" id={object.docId}>
                                        <p> {object.title} </p>
                                        <img src={object.image} />
                                        <p>{object.description}</p>
                                        <p>{object.recomendacaoTransporte}</p>
                                        <p>{object.custoMedio}</p>
                                        <button
                                            className="deleteButton"
                                            onClick={() =>
                                                handleDelete(object.docId)
                                            }
                                        >
                                            <Link className="buttonText">
                                                Delete
                                                <MdDelete
                                                    style={{
                                                        verticalAlign: 'middle',
                                                    }}
                                                />
                                            </Link>
                                        </button>
                                        <button className="editButton">
                                            <Link
                                                to={{
                                                    pathname: '/roadmap/edit',
                                                }}
                                                state={{
                                                    roadmapInformation: object,
                                                }}
                                                className="buttonText"
                                            >
                                                Edit roadmap
                                                <MdEdit
                                                    style={{
                                                        verticalAlign: 'middle',
                                                    }}
                                                />
                                            </Link>
                                        </button>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Roadmap;
