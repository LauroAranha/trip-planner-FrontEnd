import './login-module.css';

import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import ErrorComponent from '../../components/SystemMessagesComponents/ErrorComponent/ErrorComponent';
import Modal from 'react-modal';

const Login = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(faEyeSlash);
    const [values, setValues] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

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

    const openModalPassword = () => {
        setIsOpen(true);
    };
    const closeModalPassword = () => {
        setIsOpen(false);
    };

    return (
        <div className="page-login">
            <section className="ftco-section">
                <div className="d-none d-md-flex col-md-4 col-lg-6 bg-banner container-login-left">
                    <div className="banner-text">
                        <h2>📍 Trip Planner</h2>
                        <p>
                            Faça seu login ou registro, para ter acesso a nossa
                            plataforma.
                        </p>
                    </div>
                </div>
                <div className="container container-login">
                    <div className="row justify-content-center">
                        <div className="col-md-6 text-center mb-5">
                            <div className="page-title-login">
                                <h2 className="heading-section">Login</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-6 col-lg-4">
                            <div className="login-wrap p-0">
                                <form
                                    action="#"
                                    className="signin-form"
                                    onSubmit={handleSubmit}
                                >
                                    <div className="container-input-login">
                                        <div className="form-group">
                                            <input
                                                type="email"
                                                name="email"
                                                className="form-control"
                                                placeholder="Insira seu email"
                                                value={values.email}
                                                onChange={(e) =>
                                                    setValues({
                                                        ...values,
                                                        email: e.target.value,
                                                    })
                                                }
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <div className="login-password-input">
                                                <input
                                                    id="password-field"
                                                    type={type}
                                                    name="password"
                                                    className="form-control"
                                                    placeholder="Insira sua senha"
                                                    value={
                                                        values.currentPassword
                                                    }
                                                    onChange={(e) =>
                                                        setValues({
                                                            ...values,
                                                            currentPassword:
                                                                e.target.value,
                                                        })
                                                    }
                                                    required
                                                />
                                                <span
                                                    className="field-icon toggle-password login-icon-eye"
                                                    onClick={handleToggle}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={icon}
                                                    />
                                                </span>
                                            </div>
                                            <div className="page-link-login">
                                                <a
                                                    href="#"
                                                    style={{ color: '#9a9a9a' }}
                                                >
                                                    <Link
                                                        to=""
                                                        onClick={
                                                            openModalPassword
                                                        }
                                                    >
                                                        Esqueceu sua senha?
                                                    </Link>
                                                </a>
                                                <Modal
                                                    isOpen={isOpen}
                                                    onRequestClose={
                                                        closeModalPassword
                                                    }
                                                    className="custom-modal"
                                                >
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title">
                                                                Recuperação de
                                                                senha
                                                            </h5>
                                                            <button
                                                                type="button"
                                                                className="close"
                                                                data-dismiss="modal"
                                                                aria-label="Close"
                                                                onClick={
                                                                    closeModalPassword
                                                                }
                                                            >
                                                                <span aria-hidden="true">
                                                                    &times;
                                                                </span>
                                                            </button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <input
                                                                type="email"
                                                                name="email"
                                                                className="form-control"
                                                                placeholder="Insira seu email"
                                                                value={
                                                                    values.emailRec
                                                                }
                                                                onChange={(e) =>
                                                                    setValues({
                                                                        ...values,
                                                                        emailRec:
                                                                            e
                                                                                .target
                                                                                .value,
                                                                    })
                                                                }
                                                                required
                                                            />
                                                        </div>
                                                        <div className="modal-footer d-flex justify-content-center">
                                                            <div className="page-login-btn">
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-primary"
                                                                >
                                                                    Enviar
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Modal>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="page-login-btn">
                                        <div className="form-group">
                                            <button
                                                type="submit"
                                                className="form-control btn btn-primary submit px-3"
                                            >
                                                Entrar
                                            </button>
                                            {errorMessage && (
                                                <div className="row">
                                                    <div className="col-12">
                                                        <ErrorComponent
                                                            message={
                                                                errorMessage
                                                            }
                                                            width={'17vw'}
                                                            height={'6vw'}
                                                            margin={
                                                                '1.5vw auto'
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="create-account mt-4">
                                        <div className="d-flex flex-column align-items-center links">
                                            Não tem uma conta?{' '}
                                            <a href="#" className="ml-2">
                                                <Link
                                                    to="/register"
                                                    className="link-login"
                                                >
                                                    Cadastre-se aqui
                                                </Link>
                                            </a>
                                        </div>
                                        <div className="d-flex flex-column align-items-center links">
                                            É uma agencia de turismo?{' '}
                                            <a href="#" className="ml-2">
                                                <Link
                                                    to="/register-agency"
                                                    className="link-login"
                                                >
                                                    Cadastre-se aqui
                                                </Link>
                                            </a>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;
