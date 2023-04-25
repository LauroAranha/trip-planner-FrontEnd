/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar-module.css';

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

    const handleArrowClick = () => {
        setShowInterface(!showInterface);
    };

    const handleLinkClick = () => {
        setNavClass('fade-in');
        setShowInterface(false);
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
                        <FontAwesomeIcon icon={faHouse} className="nav-icon" />{' '}
                        Home{' '}
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
                        />{' '}
                        Road Maps{' '}
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

                    <div className="card text-start">
                        <div
                            className="card-body px-4 py-4"
                            style={{ width: '12vw' }}
                        >
                            <img
                                id="circle-avatar"
                                className="text-center mx-auto mb-4"
                                src={getCurrentUserInformation().photoURL}
                                alt="logo"
                            />

                            <h5 className="text-center mb-0">
                                {getCurrentUserInformation().displayName}
                            </h5>
                            <p className="text-center mb-2">
                                {getCurrentUserInformation().email}
                            </p>

                            <div
                                className="list-group list-group-flush"
                                style={{ margin: '0 -24px 0' }}
                            >
                                <Link
                                    to="/config"
                                    className=""
                                    onClick={handleLinkClick}
                                >
                                    <li className="profile-option">
                                        Configurações
                                    </li>
                                </Link>
                                <Link
                                    to="/edit"
                                    className=""
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
                                    className="btn btn-secondary"
                                    style={{ backgroundColor: 'red' }}
                                >
                                    <small>Logout</small>
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
