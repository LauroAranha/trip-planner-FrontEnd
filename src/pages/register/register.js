import './register-module.css';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
document.body.style.overflow = 'hidden';

const Register = () => {
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
    name: '',
    email: '',
    currentPassword: '',
    error: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(values);
    axios.post('http://localhost:3001/user/register', values);
  };

  return (
    <body className="page-register">
      <div className="container-register">
        <h1>Create an account</h1>
        <p>
          You creating an account, will be able to register all your trips,{' '}
          <br></br>
          in addition to being able to earn points and create groups with
          <br></br>
          your friends.
        </p>
      </div>
      <h1 className="page-title-register">Get started</h1>
      <form onSubmit={handleSubmit}>
        <div className="page-input-register">
          <label>
            <input
              type="text"
              name="displayName"
              required
              placeholder="Enter your name"
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
          </label>
          {'\n'}
          <label>
            <input
              type="text"
              name="displayName"
              required
              placeholder="Enter your last name"
              value={values.lastName}
              onChange={(e) =>
                setValues({ ...values, lastName: e.target.value })
              }
            />
          </label>
          {'\n'}
          <label>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter a email"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </label>
          {'\n'}
          <label>
            <input
              type={type}
              name="password"
              required
              placeholder="Enter a password"
              value={values.currentPassword}
              onChange={(e) =>
                setValues({ ...values, currentPassword: e.target.value })
              }
            />
            <span onClick={handleToggle} className="icon-eye-register">
              <FontAwesomeIcon icon={icon} />
            </span>
          </label>
          {'\n'}
          <label className="confirmpass">
            <input
              type={typeConfirm}
              name="confirmPassword"
              required
              placeholder="Confirm your password"
              className="confirmpass-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span
              onClick={handleToggleConfirmPassword}
              className="icon-eye-register"
            >
              <FontAwesomeIcon icon={iconConfirm} />
            </span>
          </label>
        </div>
        {'\n'}
        {values.error && <p className={styles.error}>{values.error}</p>}{' '}
        <button className="register-btn">Complete</button>
        <div className="page-link">
          <Link to="/" className="link-register">
            I'm already registered
          </Link>
        </div>
      </form>
    </body>
  );
};

export default Register;
