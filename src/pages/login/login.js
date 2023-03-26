import './login-module.css';

import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye, faUser } from '@fortawesome/free-solid-svg-icons';

document.body.style.overflow = 'hidden';

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    axios.post('http://localhost:3000/user/login ', values);
  };

  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(faEyeSlash);

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

  return (
    <body className="page-login">
      <div className="container-login">
        <h1>📍 Trip Planner</h1>
      </div>
      <h1 className="page-title-login">Login</h1>
      <div className="page-input-login">
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
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
              placeholder="Enter your password"
              value={values.password}
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
            />
            <span onClick={handleToggle} className="icon-eye">
              <FontAwesomeIcon icon={icon} />
            </span>
            <div className="page-link-login">
              <a href="" className="name-link">
                Forgot your password?
              </a>
            </div>
          </label>
          {'\n'}
          <button className="login-btn">Enter</button>
          <div className="create-account">
            <span className="login-sign-in">Don't have an account?</span>
            <Link to="/register" className="link-login">
              Sign up now
            </Link>
          </div>
        </form>
      </div>
    </body>
  );
};

export default Login;
