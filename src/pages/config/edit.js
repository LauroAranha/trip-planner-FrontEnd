import './Config-module.css';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

document.body.style.overflow = 'hidden';

const Edit = () => {
  const [confirmPassword, setConfirmPassword] = useState('');

  // State for the main password field
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(faEyeSlash);

  // State for password confirmation field
  const [typeConfirm, setConfirmPasswordType] = useState('password');
  const [iconConfirm, setConfirmPasswordIcon] = useState(faEyeSlash);

  const handleToggle = () => {
    // For the main password field
    if (type === 'password') {
      setIcon(faEye);
      setType('text');
    } else {
      setIcon(faEyeSlash);
      setType('password');
    }
  };

  const handleToggleConfirmPassword = () => {
    if (typeConfirm === 'password') {
      setConfirmPasswordIcon(faEye);
      setConfirmPasswordType('text');
    } else {
      setConfirmPasswordIcon(faEyeSlash);
      setConfirmPasswordType('password');
    }
  };

  const [values, setValues] = useState({
    currentEmail: '',
    currentPassword: '',
    name: '',
    lastName: '',
    email: '',
    password: '',

    error: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(values);
    axios.post('http://localhost:3005/user/edit', values);
  };

  return (
    <div className="page-edit">
      <form onSubmit={handleSubmit}>
        <div className="page-input-edit">
          <div>
            <label className="label-name">
              <h3>Name:</h3>
              <input
                type="text"
                name="displayName"
                placeholder="Enter your new name"
                value={values.name}
                onChange={(e) => setValues({ ...values, name: e.target.value })}
              />
            </label>
            <label className="label-last-name">
              <h3>Last Name:</h3>
              <input
                type="text"
                name="displayName"
                placeholder="Enter your new last name"
                value={values.lastName}
                onChange={(e) =>
                  setValues({ ...values, lastName: e.target.value })
                }
              />
            </label>
          </div>
          {'\n'}
          <label>
            <h3>Email:</h3>
            <input
              type="email"
              name="currentEmail"
              required
              placeholder="Enter your current email"
              value={values.currentEmail}
              onChange={(e) =>
                setValues({ ...values, currentEmail: e.target.value })
              }
            />
          </label>
          {'\n'}
          <label>
            <h3>New Email:</h3>
            <input
              type="password"
              name="currentPassword"
              required
              placeholder="Enter your current password"
              value={values.currentPassword}
              onChange={(e) =>
                setValues({ ...values, currentPassword: e.target.value })
              }
            />
          </label>
          {'\n'}
          <label>
            <h3>Password:</h3>
            <input
              type="email"
              name="email"
              placeholder="Enter your new email"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </label>
          <span onClick={handleToggleConfirmPassword} className="icon-eye-edit">
            <FontAwesomeIcon icon={iconConfirm} />
          </span>
          {'\n'}
          <label className="confirmpass-edit">
            <h3>New Password:</h3>
            <input
              type={type}
              name="password"
              placeholder="Enter your new password"
              value={values.password}
              className="confirmpass-input-edit"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
            />
          </label>
          {'\n'}
          <span onClick={handleToggleConfirmPassword} className="icon-eye-edit">
            <FontAwesomeIcon icon={iconConfirm} />
          </span>
        </div>
        {'\n'}
        {values.error && <p className={styles.error}>{values.error}</p>}{' '}
        <button className="edit-btn">Update</button>
      </form>
    </div>
  );
};

export default Edit;
