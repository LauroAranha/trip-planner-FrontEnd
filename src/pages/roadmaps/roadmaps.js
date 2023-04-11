/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/button-has-type */
import './roadmaps-module.css';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MdDelete, MdEditDocument, MdAdd } from 'react-icons/md';
import { auth } from '../../firebase';

const Roadmap = () => {
    const [travelList, setTravelList] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [triggerUpdate, setTriggerUpdate] = useState(true);

    const user = auth.currentUser;
    const email = user.reloadUserInfo.email;

    useEffect(() => {
        axios
            .post('http://localhost:3001/travel/getCurrentUserTravels', {
                userCreatorId: email,
            })
            .then((res) => {
                const responseData = res.data.data;
                console.log(responseData);
                setTravelList(responseData);
                setIsLoading(false);
            });
        setTriggerUpdate(false);
    }, [triggerUpdate]);

    const handleDelete = (docId) => {
        axios
            .post('http://localhost:3001/travel/delete', {
                travelId: docId,
            })
            .then((res) => {
                const responseData = res.data.data;
                console.log(responseData);
                setTravelList(responseData);
                setIsLoading(false);
                setTriggerUpdate(true);
            });
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
