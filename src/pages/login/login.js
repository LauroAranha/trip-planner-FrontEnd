import './login-module.css';

import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import ErrorComponent from '../../components/SystemMessagesComponents/ErrorComponent/ErrorComponent';

const Login = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(faEyeSlash);
    const [values, setValues] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('user/login', values);
            if (response.status === 200) {
                const authInfo = response.data.data.currentUserInfo;
                const userInfo = (await axios.get(`user/get/${response.data.data.currentUserInfo.uid}`));
                const completeUserInfo = { ...authInfo, ...userInfo.data.data };

                sessionStorage.setItem('userToken', response.data.data.token);
                sessionStorage.setItem(
                    'currentUserInfo',
                    JSON.stringify(completeUserInfo)
                );

                if (completeUserInfo.userType === 2) {
                    navigate('/agency-home');
                } else {
                    navigate('/home');
                }
            }
        } catch (error) {
            setErrorMessage('Invalid username or password');
        }
    };

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
                        <label className="login-form-label">Insira sua senha</label>
                        <div className="inputWithSpan">
                            <input
                                type={type}
                                name="password"
                                required
                                placeholder="Enter your password"
                                value={values.currentPassword}
                                onChange={(e) =>
                                    setValues({
                                        ...values,
                                        currentPassword: e.target.value,
                                    })
                                }
                            />
                            <span onClick={handleToggle} className="icon-eye">
                                <FontAwesomeIcon icon={icon} />
                            </span>
                        </div>
                    </div>

                    <div className="page-link-login">
                        <Link to="" className="link-login">
                            Forgot your password?
                        </Link>
                    </div>
                    <button type="submit" className="login-btn">
                        Enter
                    </button>

                    {errorMessage && <ErrorComponent title={"Sign in error!"} message={errorMessage} width={"15vw"} height={"10vw"} margin={"1vw auto"} />}

                    <div className="create-account">
                        <span className="login-sign-in">
                            Não possui uma conta?
                        </span>
                        <Link to="/register" className="link-login">
                            Cadastre-se agora
                        </Link>
                    </div>
                    <div className="create-account">
                        <span className="login-sign-in">
                            Agência de turismo?
                        </span>
                        <Link to="/register-agency" className="link-login">
                            Cadastre-se aqui
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;

