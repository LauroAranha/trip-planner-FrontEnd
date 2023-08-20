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
