import './login-module.css';

import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';

import { getAuth, signInWithCustomToken } from 'firebase/auth';

import { auth } from '../../firebase';

document.body.style.overflow = 'hidden';

const Login = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: 'lauro@lauro.com',
        password: 'lauro123',
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post(
            'http://localhost:3001/user/login',
            values
        );
        if (response.status === 200) {
            sessionStorage.setItem('userToken', response.data.data.token);
            sessionStorage.setItem(
                'currentUserInfo',
                JSON.stringify(response.data.data.currentUserInfo)
            );
        } else {
            setErrorMessage('Invalid username or password');
        }
    };

    const errorMessageDiv = (
        <p
            style={{
                color: 'red',
                margin: 'auto',
                fontSize: '26px',
                fontFamily: 'sans-serif',
                marginLeft: '100px',
            }}
        >
            {errorMessage}
        </p>
    );

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
        <div className="page-login">
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
                            onChange={(e) =>
                                setValues({ ...values, email: e.target.value })
                            }
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
                                setValues({
                                    ...values,
                                    password: e.target.value,
                                })
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
                    <button type="submit" className="login-btn">
                        Enter
                    </button>
                    {errorMessage && errorMessageDiv}
                    <div className="create-account">
                        <span className="login-sign-in">
                            Don't have an account?
                        </span>
                        <Link to="/register" className="link-login">
                            Sign up now
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
