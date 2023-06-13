/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.css';

import { PopupMenu } from 'react-simple-widgets';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHouse,
    faMapLocationDot,
    faAngleDown,
} from '@fortawesome/free-solid-svg-icons';
import logo from './img/logo.png';
import { getCurrentUserInformation } from '../utils/userUtils';

const Navbar = () => {
    const [showInterface, setShowInterface] = useState(false);
    const [navClass, setNavClass] = useState('');
    const navigate = useNavigate();

    const handleArrowClick = () => {
        setShowInterface(!showInterface);
    };
    const handleLinkClick = () => {
        setNavClass('fade-in');
        setShowInterface(false);
    };
    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <Link className="brand" to="/home">
                <img src={logo} alt="logo" className="nav-logo" />
            </Link>
            <li className="links_list">
                <li>
                    <Link
                        to="/home"
                        className="option"
                        onClick={handleLinkClick}
                    >
                        <FontAwesomeIcon icon={faHouse} className="nav-icon" />
                        <span className="text">Início</span>
                    </Link>
                </li>
                <li>
                    <Link
                        to="/roadmap"
                        className="option"
                        onClick={handleLinkClick}
                    >
                        <FontAwesomeIcon
                            icon={faMapLocationDot}
                            className="nav-icon"
                        />
                        <span className="text">Roteiros</span>
                    </Link>
                </li>
            </li>
            <li className="profile">
                <PopupMenu>
                    <img
                        src={getCurrentUserInformation().photoURL}
                        alt="Profile Pic"
                        className="profile-pic"
                        onClick={handleArrowClick}
                    />
                    <div className="profile-interface card text-start">
                        <div
                            className="card-body px-4 py-4"
                        >
                            <img
                                id="circle-avatar"
                                className="text-center mx-auto mb-4"
                                src={getCurrentUserInformation().photoUxRL}
                                alt=""
                            />
                            <h5 className="text-center mb-0">
                                {getCurrentUserInformation().displayName}
                            </h5>
                            <p className="text-center mb-2">
                                {getCurrentUserInformation().email}
                            </p>
                            <div
                                className="list-group list-group-flush"
                            >
                                <Link
                                    to="/config"
                                    className="profile-list"
                                    onClick={handleLinkClick}
                                >
                                    <li className="profile-option">
                                        Configurações
                                    </li>
                                </Link>
                                <Link
                                    to="/edit"
                                    className="profile-list"
                                    onClick={handleLinkClick}
                                >
                                    <li className="profile-option">
                                        Editar Perfil
                                    </li>
                                </Link>
                            </div>
                            <hr style={{ margin: '0 -24px 24px' }} />
                            <div className="d-grid">
                                <button
                                    className="profile-logout btn btn-secondary"
                                    onClick={() => handleLogout()}
                                >
                                    <small>Sair</small>
                                </button>
                            </div>
                        </div>
                    </div>
                </PopupMenu>
            </li>
        </nav>
    );
};

export default Navbar;
