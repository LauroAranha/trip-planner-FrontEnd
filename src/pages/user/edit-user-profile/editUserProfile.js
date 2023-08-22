import './editUserProfile-module.css';

import { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import 'firebase/auth';
import axios from 'axios';
import {
    getCurrentUserInformation,
    getCurrentUserToken,
} from '../../../components/utils/userUtils';
import ImageUpload from '../../../components/Input/ImageUpload';

const EditUserProfile = () => {
    const { uid } = getCurrentUserInformation();

    const [imageData, setImageData] = useState(getCurrentUserInformation().photoURL);
    const [userId, setUserId] = useState("");
    const [docId, setDocId] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        birthdate: "",
        password: "",
        cep: "",
        rg: "",
        cpf: "",
        gender: "",
        phone: "",
        city: "",
        state: "",
        profilepic: "",
    });

    const handleImageChange = (imageData) => {
        setImageData(imageData);
        setFormData({
            ...formData,
            profilepic: imageData
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`user/get/${uid}`);
                const { name, email, birthdate, password, cep, rg, cpf, gender, phone, city, state, docId, userId } = response.data.data;

                setUserId(userId);
                setDocId(docId);
                setFormData({
                    name,
                    email,
                    birthdate: new Date(birthdate).toISOString().split('T')[0],
                    password,
                    cep,
                    rg,
                    cpf,
                    gender,
                    phone,
                    city,
                    state,
                });

                console.log(response);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchData();
    }, [uid]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            formData.userId = userId;
            formData.docId = docId;

            await axios.put(
                'user/edit',
                formData,
                {
                    headers: {
                        auth: getCurrentUserToken(),
                    },
                }
            );
            console.log("edited")
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    };

    return (
        <div className="page-edit">
            {/* profile preview */}
            <h4 className="panel-title">Editar perfil</h4>
            <div
                className="d-flex justify-content-center align-items-center rounded-circle"
                style={{
                    height: '160px',
                    width: '170px',
                    backgroundColor:
                        'rgb(233, 236, 239)',
                    backgroundImage:
                        imageData
                            ? `url(${imageData})`
                            : 'none',
                    backgroundSize:
                        'cover',
                    backgroundPosition:
                        'center',
                    border: '3px solid rgb(215, 215, 215)',
                    borderWidth: '4px',
                    borderStyle:
                        'solid',
                }}
                onMouseOver={(e) => {
                    e.target.style.boxShadow =
                        '0 0 10px 0 #42B0FF';
                }}
                onMouseOut={(e) => {
                    e.target.style.boxShadow =
                        'none';
                }}
            />

            <div className="col" style={{ marginTop: '100px' }}>
                <h4 className="panel-title">Edit profile</h4>
                <div className="row">
                    <div className="col mb-3">
                        <div
                            className="card"
                            style={{
                                width: '105%',
                                borderRadius: '16px',
                                marginLeft: '-10px',
                                marginBottom: '-20px',
                                border: 'none',
                            }}
                        >
                            <div className="card-body">
                                <div className="e-profile">
                                    <div className="row align-items-start">
                                        <div className="col-12 col-sm-auto mb-3">
                                            <div
                                                className="mx-auto"
                                                style={{
                                                    width: '160px',
                                                }}
                                            >
                                                <label htmlFor="fileUpload">
                                                    <div
                                                        className="d-flex justify-content-center align-items-center rounded-circle"
                                                        style={{
                                                            height: '160px',
                                                            width: '170px',
                                                            backgroundColor:
                                                                'rgb(233, 236, 239)',
                                                            backgroundImage:
                                                                imagem
                                                                    ? `url(${imagem})`
                                                                    : 'none',
                                                            backgroundSize:
                                                                'cover',
                                                            backgroundPosition:
                                                                'center',
                                                            border: '3px solid rgb(215, 215, 215)',
                                                            borderWidth: '4px',
                                                            borderStyle:
                                                                'solid',
                                                        }}
                                                        onMouseOver={(e) => {
                                                            e.target.style.boxShadow =
                                                                '0 0 10px 0 #42B0FF';
                                                        }}
                                                        onMouseOut={(e) => {
                                                            e.target.style.boxShadow =
                                                                'none';
                                                        }}
                                                    >
                                                        {/* Aqui, você pode adicionar um ícone de upload ou algum texto indicando que é possível fazer upload de uma imagem */}
                                                    </div>
                                                    <input
                                                        type="file"
                                                        id="fileUpload"
                                                        className="d-none"
                                                        onChange={
                                                            handleImagemSelecionada
                                                        }
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                        <div
                                            className="col d-flex flex-column flex-sm-row justify-content-between mb-3"
                                            style={{ marginTop: '30px' }}
                                        >
                                            <div className="text-center text-sm-left mb-2 mb-sm-0">
                                                <h4 className="pt-sm-2 pb-1 mb-0 text-nowrap">
                                                    {values.name}{' '}
                                                    {values.lastName}
                                                </h4>
                                                <p className="mb-0">
                                                    {values.email}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
=======
            <div src={formData.profilepic}></div>
            {/* edit form */}
            <form className="form" onSubmit={handleSubmit} noValidate>

                <label htmlFor="name">Selecionar nova imagem de perfil</label>
                <ImageUpload onImageChange={handleImageChange} />

                <div>
                    <label htmlFor="name">Nome</label>
                    <input
                        className="form-control"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>

                {/* email e celular */}
                <div className="input-container">
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            className="form-control"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="phone">Celular</label>
                        <input
                            className="form-control"
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="password">Senha</label>
                    <input
                        className="form-control"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                </div>

                {/* rg e cpf */}
                <div className="input-container">
                    <div>
                        <label htmlFor="rg">RG</label>
                        <input
                            className="form-control"
                            type="text"
                            name="rg"
                            value={formData.rg}
                            onChange={(e) => setFormData({ ...formData, rg: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="cpf">CPF</label>
                        <input
                            className="form-control"
                            type="text"
                            name="cpf"
                            value={formData.cpf}
                            onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                        />
                    </div>
                </div>

                {/* data de nascimento e genero */}
                <div className="input-container">
                    <div>
                        <label htmlFor="birthdate">Data de nascimento</label>
                        <input
                            className="form-control"
                            type="date"
                            name="birthdate"
                            value={formData.birthdate}
                            onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="gender">Gênero</label>
                        <select
                            className="form-control"
                            name="gender"
                            value={formData.gender}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        >
                            <option value="male">Masculino</option>
                            <option value="female">Feminino</option>
                            <option value="others">Outros</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label htmlFor="cep">CEP</label>
                    <input
                        className="form-control"
                        type="text"
                        name="cep"
                        value={formData.cep}
                        onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
                    />
                </div>

                {/* cidade e estado */}
                <div className="input-container">
                    <div>
                        <label htmlFor="city">Cidade</label>
                        <input
                            className="form-control"
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="state">Estado</label>
                        <input
                            className="form-control"
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        />
                    </div>
                </div>
                <button
                    className="save-btn btn btn-success btn-rounded btn-lg"
                    type="submit"
                >
                    Salvar alterações
                </button>
            </form>
        </div>
    );
};

export default EditUserProfile;
