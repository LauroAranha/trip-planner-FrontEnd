import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

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
        userType: 1,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(values);

        try {
            const response = await axios.post(
                'http://localhost:3001/user/register',
                values
            );
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="page-login">
            <section className="ftco-section">
                <div className="d-none d-md-flex col-md-4 col-lg-6 bg-banner container-login-left">
                    <div className="banner-text">
                        <h2>📍 Trip Planner</h2>
                        <p>
                            Você criando uma conta, poderá registrar todas as
                            suas viagens, além de poder acumular pontos e criar
                            grupos com seus amigos.
                        </p>
                    </div>
                </div>
                <div className="container container-login">
                    <div className="row justify-content-center">
                        <div className="col-md-6 text-center mb-5">
                            <div className="page-title-login">
                                <h2 className="heading-section">Cadastre-se</h2>
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
                                                type="text"
                                                name="displayName"
                                                className="form-control"
                                                placeholder="Insira seu nome"
                                                value={values.name}
                                                onChange={(e) =>
                                                    setValues({
                                                        ...values,
                                                        name: e.target.value,
                                                    })
                                                }
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                name="displayName"
                                                className="form-control"
                                                placeholder="Insira seu sobrenome"
                                                value={values.lastName}
                                                onChange={(e) =>
                                                    setValues({
                                                        ...values,
                                                        lastName:
                                                            e.target.value,
                                                    })
                                                }
                                                required
                                            />
                                        </div>
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
                                            <div className="login-password-input">
                                                <input
                                                    id="password-field"
                                                    type={typeConfirm}
                                                    name="confirmPassword"
                                                    className="form-control"
                                                    placeholder="Confirme sua senha"
                                                    value={confirmPassword}
                                                    onChange={(e) =>
                                                        setConfirmPassword(
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                />
                                                <span
                                                    className="field-icon toggle-password login-icon-eye"
                                                    onClick={
                                                        handleToggleConfirmPassword
                                                    }
                                                >
                                                    <FontAwesomeIcon
                                                        icon={iconConfirm}
                                                    />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="page-login-btn">
                                        <div className="form-group">
                                            <button
                                                type="submit"
                                                className="form-control btn btn-primary submit px-3"
                                            >
                                                Cadastrar
                                            </button>
                                            {values.error && (
                                                <div className="row">
                                                    <div className="col-12">
                                                        <p
                                                            className={
                                                                styles.error
                                                            }
                                                        >
                                                            {values.error}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}{' '}
                                        </div>
                                    </div>
                                    <div className="create-account mt-4">
                                        <div className="d-flex flex-column align-items-center links">
                                            Já tem uma conta?{' '}
                                            <a href="#" className="ml-2">
                                                <Link
                                                    to="/"
                                                    className="link-login"
                                                >
                                                    Fazer login
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
                                        {/*
                                        <div className="d-flex flex-column align-items-center links">
                                            É uma agencia e tem login?{' '}
                                            <a href="#" className="ml-2">
                                                <Link
                                                    to="login-agency"
                                                    className="link-login"
                                                >
                                                    Fazer login-agência
                                                </Link>
                                            </a>
                                        </div> 
                                        */}
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

export default Register;
