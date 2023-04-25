import './login-module.css';

import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(faEyeSlash);
    const [values, setValues] = useState({
        email: 'lauro@lauro.com',
        password: 'lauro123',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('user/login', values);
            if (response.status === 200) {
                sessionStorage.setItem('userToken', response.data.data.token);
                sessionStorage.setItem(
                    'currentUserInfo',
                    JSON.stringify(response.data.data.currentUserInfo)
                );
                navigate('/home');
            }
        } catch (error) {
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

    const handleToggle = () => {
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
            <div className="container-input-login">
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="login-input-fields">
                        <h1 className="page-title-login">Login</h1>
                        <label className="login-form-label">
                            Insira seu e-mail
                        </label>
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
                        <label className="login-form-label">
                            Insira sua senha
                        </label>
                        <div className="inputWithSpan">
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
                        </div>
                    </div>
                    <div className="page-link-login">
                        <a href="a" className="name-link">
                            Esqueceu sua senha?
                        </a>
                    </div>
                    <button type="submit" className="login-btn">
                        Enter
                    </button>
                    {errorMessage && errorMessageDiv}
                    <div className="create-account">
                        <span className="login-sign-in">
                            Não tem uma conta?
                        </span>
                        <Link to="/register" className="link-login">
                            Registre-se agora!
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
