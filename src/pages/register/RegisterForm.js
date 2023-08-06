import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import ImageUpload from '../../components/Input/ImageUpload';

const RegisterForm = ({ handleSubmit, values, setValues, confirmPassword, setConfirmPassword, handleImageChange }) => {
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(faEyeSlash);

    const [typeConfirm, setTypeConfirm] = useState('password');
    const [iconConfirm, setIconConfirm] = useState(faEyeSlash);

    const handleImageUpload = (imageData) => {
        handleImageChange(imageData);
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

    const handleToggleConfirmPassword = () => {
        if (typeConfirm === 'password') {
            setIconConfirm(faEye);
            setTypeConfirm('text');
        } else {
            setIconConfirm(faEyeSlash);
            setTypeConfirm('password');
        }
    };

    return (
        <form className="" onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                    type="text"
                    name="displayName"
                    className="form-control"
                    placeholder="Insira seu nome"
                    value={values.name}
                    onChange={(e) => setValues({ ...values, name: e.target.value })}
                    required
                />
            </div>
            <div className="form-group">
                <input
                    type="email"
                    name="displayName"
                    className="form-control"
                    placeholder="Insira seu email"
                    value={values.email}
                    onChange={(e) => setValues({ ...values, email: e.target.value })}
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
                        value={values.password}
                        onChange={(e) => setValues({ ...values, password: e.target.value })}
                        required
                    />
                    <span className="field-icon toggle-password login-icon-eye" onClick={handleToggle}>
                        <FontAwesomeIcon icon={icon} />
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
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <span className="field-icon toggle-password login-icon-eye" onClick={handleToggleConfirmPassword}>
                        <FontAwesomeIcon icon={iconConfirm} />
                    </span>
                </div>
                <div className="form-group">
                    <input
                        type="date"
                        name="birthdate"
                        className="form-control"
                        placeholder="Insira sua data de nascimento"
                        value={values.birthdate}
                        onChange={(e) => setValues({ ...values, birthdate: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        name="cep"
                        className="form-control"
                        placeholder="Insira seu CEP"
                        value={values.cep}
                        onChange={(e) => setValues({ ...values, cep: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        name="address"
                        className="form-control"
                        placeholder="Insira seu endereço"
                        value={values.address}
                        onChange={(e) => setValues({ ...values, address: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        name="city"
                        className="form-control"
                        placeholder="Insira sua cidade"
                        value={values.city}
                        onChange={(e) => setValues({ ...values, city: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        name="state"
                        className="form-control"
                        placeholder="Insira seu estado"
                        value={values.state}
                        onChange={(e) => setValues({ ...values, state: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        name="cpf"
                        className="form-control"
                        placeholder="Insira seu CPF"
                        value={values.cpf}
                        onChange={(e) => setValues({ ...values, cpf: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        name="rg"
                        className="form-control"
                        placeholder="Insira seu RG"
                        value={values.rg}
                        onChange={(e) => setValues({ ...values, rg: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        name="phone"
                        className="form-control"
                        placeholder="Insira seu telefone"
                        value={values.phone}
                        onChange={(e) => setValues({ ...values, phone: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <select
                        name="gender"
                        className="form-control"
                        value={values.gender}
                        onChange={(e) => setValues({ ...values, gender: e.target.value })}
                        required
                    >
                        <option value="">Selecione o gênero</option>
                        <option value="male">Masculino</option>
                        <option value="female">Feminino</option>
                        <option value="other">Outro</option>
                    </select>
                </div>
                <ImageUpload onImageChange={handleImageChange} />
                <div className="form-group">
                    {values.error && (
                        <div className="row">
                            <div className="col-12">
                                <p className={styles.error}>{values.error}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="form-group">
                {values.error && (
                    <div className="row">
                        <div className="col-12">
                            <p className={styles.error}>{values.error}</p>
                        </div>
                    </div>
                )}
            </div>
        </form>
    );
};

export default RegisterForm;
