// Importing atributes
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar-module.css';

// Importing custom, fonts & icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faMapLocationDot,
  faAngleDown,
} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import profilePic from './img/profile-pic.png';

// Importing img
import logo from './img/logo.png';

const Navbar = () => {
  const [showInterface, setShowInterface] = useState(false);

  const handleArrowClick = () => {
    setShowInterface(!showInterface);
  };

  return (
    <nav className="navbar">
      <NavLink className="brand" to="/home">
        <img src={logo} alt="logo" className="nav-logo" />
      </NavLink>
      <ul className="links_list">
        <li>
          <NavLink to="/home" className="option">
            <FontAwesomeIcon icon={faHouse} className="nav-icon" /> Home{' '}
          </NavLink>
        </li>
        <li>
          <NavLink to="/roadmaps" className="option">
            <FontAwesomeIcon icon={faMapLocationDot} className="nav-icon" />{' '}
            Road Maps{' '}
          </NavLink>
        </li>
      </ul>
      <li className="profile">
        <img src={profilePic} alt="Profile Pic" className="profile-pic" />
        <FontAwesomeIcon
          icon={faAngleDown}
          className={`down-arrow ${showInterface ? 'rotate' : ''}`}
          onClick={handleArrowClick}
        />

        {showInterface && (
          <div className="profile-interface">
            <ul>
              <li className="profile-option">Configurações</li>
              <li className="profile-option">Editar Perfil</li>
              <li className="profile-option" style={{ color: 'red' }}>Sair</li>
            </ul>
          </div>
        )}
      </li>
    </nav>
  );
};

export default Navbar;
