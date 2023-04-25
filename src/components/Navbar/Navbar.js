import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar-module.css';

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
                <img
                    src={getCurrentUserInformation().photoURL}
                    alt="Profile Pic"
                    className="profile-pic"
                />
                <FontAwesomeIcon
                    icon={faAngleDown}
                    className={`down-arrow ${showInterface ? 'rotate' : ''}`}
                    onClick={handleArrowClick}
                />
                {showInterface && (
                    <div className="profile-interface">
                        <ul>
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
                            <li
                                className="profile-option"
                                style={{ color: 'red' }}
                            >
                                Sair
                            </li>
                        </ul>
                    </div>
                )}
            </li>
        </nav>
    );
};

export default Navbar;
