import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import ImageUpload from '../../components/Input/ImageUpload';
import RegisterForm from './RegisterForm';

const Register = () => {
    const [confirmPassword, setConfirmPassword] = useState('');
    const [imageData, setImageData] = useState(null);
    const [values, setValues] = useState({
        name: '',
        email: '',
        birthdate: '',
        cep: '',
        address: '',
        city: '',
        state: '',
        cpf: '',
        rg: '',
        phone: '',
        gender: '',
        profilepic: ''
    });

    const handleImageChange = (imageData) => {
        setImageData(imageData);
        setValues({
            ...values,
            profilepic: imageData
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(values);

        try {
            console.log(await axios.post('http://localhost:3001/user/register', values));
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
                                            <RegisterForm
                                                handleSubmit={handleSubmit}
                                                values={values}
                                                setValues={setValues}
                                                confirmPassword={confirmPassword}
                                                setConfirmPassword={setConfirmPassword}
                                                handleImageChange={handleImageChange}
                                            />
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
