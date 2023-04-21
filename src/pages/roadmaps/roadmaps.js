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
    const [travelList, setTravelList] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [triggerUpdate, setTriggerUpdate] = useState(true);

    const user = getCurrentUserInformation();
    const userId = user.uid;

    useEffect(() => {
        const fetchCurrentUserTravels = async () => {
            try {
                const res = await axios.get(
                    `travel/getCurrentUserTravels/${userId}`
                );
                const responseData = res.data.data;
                setTravelList(responseData);
                setIsLoading(false);
                setTriggerUpdate(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchCurrentUserTravels();
    }, [triggerUpdate]);

    const handleDelete = (docId) => {
        const deleteTravel = async () => {
            try {
                const res = await axios.delete(`travel/delete/${docId}`);
                const responseData = res.data.data;

                if (responseData === 1) {
                    setIsLoading(false);
                    setTriggerUpdate(true);
                }
            } catch (error) {
                console.error(error);
            }
        };

        deleteTravel();
    };

    return (
        <div>
            <div className="squares-container">
                <div className="mainContainer">
                    <h1 className="square-title">My Road Maps</h1>
                    <div className="addButton">
                        <Link to="/roteiro" className="buttonText">
                            New roadmap
                            <MdAdd />
                        </Link>
                    </div>
                    <div className="squares-container">
                        {isLoading ? (
                            <p>carregando</p>
                        ) : (
                            travelList &&
                            travelList.map((object) => {
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
                                        <button
                                            className="editButton"
                                            // onClick={() =>
                                            //    console.log("teste")
                                            // }
                                        >
                                            <Link
                                                to={{
                                                    pathname: '/roteiro/editar',
                                                    state: 'cu',
                                                }}
                                                state={{ from: object.docId }}
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
