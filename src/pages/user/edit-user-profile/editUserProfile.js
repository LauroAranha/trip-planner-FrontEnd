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

    // Set the initial state of the image to null
    const [imageData, setImageData] = useState(getCurrentUserInformation().photoURL);
    const [userId, setUserId] = useState("")
    const [docId, setDocId] = useState("")
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
        })
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`user/get/${uid}`);
                const { name, email, birthdate, password, cep, rg, cpf, gender, phone, city, state, docId, userId } = response.data.data;

                setUserId(userId)
                setDocId(docId);
                setFormData({
                    name,
                    email,
                    birthdate,
                    password,
                    cep,
                    rg,
                    cpf,
                    gender,
                    phone,
                    city,
                    state
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
            <h4 className="panel-title">Edit profile</h4>


            {/* edit form */}
            <form className="form" onSubmit={handleSubmit} noValidate>
                {Object.keys(formData).map((key) => (
                    <div key={key}>
                        <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                        <input
                            className="form-control"
                            type={key === 'email' ? 'email' : 'text'}
                            name={key}
                            value={formData[key]}
                            onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                        />
                    </div>
                ))}
                <ImageUpload onImageChange={handleImageChange} />
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
