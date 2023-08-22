import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './addRoadmap-module.css';

import { useForm } from 'react-hook-form';
import AutoCompleteField from '../../../components/AutoCompleteMapField/AutoCompleteField';
import { initGoogleMapApiScript } from '../../../components/utils/mapFunctions';
import { getCurrentUserInformation } from '../../../components/utils/userUtils';
import ImageUpload from '../../../components/Input/ImageUpload';

const AddRoadmap = () => {
    const navigate = useNavigate();

    const [imageData, setImageData] = useState(null);

    const user = getCurrentUserInformation();
    const { email } = user;

    const [inputCount, setInputCount] = useState(0);
    const [autoCompleteField, setAutoCompleteField] = useState(0);

    const { register, handleSubmit, watch, setValue } = useForm();
    const custoMedio = watch('custoMedio');

    const handleAddInput = () => {
        if (inputCount < 5) {
            setInputCount(inputCount + 1);
        }
        setAutoCompleteField(autoCompleteField + 1);
    };

    const handleImageChange = (imageData) => {
        setImageData(imageData);
        setValue('image', imageData);
    };

    useEffect(() => {
        const scriptReturned = initGoogleMapApiScript();
        return () => {
            // Clean up by removing the script and window property
            document.body.removeChild(scriptReturned);
            delete window.scriptReturned;
        };
    }, []);
    useEffect(() => {
        const autoCompleteOptions = {
            componentRestrictions: { country: 'br' },
            types: ['establishment'],
        };
        if (autoCompleteField) {
            // eslint-disable-next-line no-new
            new window.google.maps.places.Autocomplete(
                document.getElementById(
                    `inputFieldAut${autoCompleteField - 1}`
                ),
                autoCompleteOptions
            );
        }
    }, [inputCount]);

    const onSubmit = async (data) => {
        data.userType = getCurrentUserInformation().userType;
        data.userCreatorId = email;

        try {
            const response = await axios.post(
                'roadmap/add',
                data
            );

            if (response.status === 201) {
                console.log(response);
                navigate('/home');
            } else {
                console.log('Some pepino occurred debug it');
            }
        } catch (error) {
            console.log(JSON.parse(JSON.stringify(error)));
        }
    };

    return (
        <div className="formBox">
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <label className="fieldLabel">Nome do roteiro</label>
                <input
                    required
                    type="text"
                    placeholder="Nome do roteiro"
                    className="form__input"
                    {...register('title', {})}
                />

                <label className="fieldLabel">Descrição do roteiro</label>
                <textarea
                    required
                    className="form__textarea"
                    {...register('description', {})}
                />

                <label className="fieldLabel">
                    Imagem thumb roteiro
                </label>
                <ImageUpload onImageChange={handleImageChange} />

                <label className="fieldLabel">Cidade do roteiro</label>
                <input
                    type="search"
                    placeholder="Cidade do roteiro"
                    className="form__input"
                    {...register('cidadeRoteiro', {})}
                />

                <label className="fieldLabel">Ponto de partida</label>
                <input
                    type="search"
                    placeholder="Ponto de partida"
                    className="form__input"
                    {...register('pontoInicial', {})}
                />

                <label className="fieldLabel">Destino</label>
                <input
                    type="search"
                    placeholder="Destino"
                    className="form__input"
                    {...register('pontoFinal', {})}
                />

                <label className="fieldLabel">Recomendação de Transporte</label>
                <select
                    className="form__select"
                    {...register('recomendacaoTransporte')}
                >
                    <option value="carro">Carro</option>
                    <option value="transportePublico">
                        Transporte público
                    </option>
                    <option value="bicicleta">Bicicleta</option>
                    <option value="andando">A pé</option>
                </select>

                <label className="fieldLabel">
                    Adicionar Paradas Recomendadas (máx.: 5)
                </label>
                {[...Array(inputCount)].map((_, index) => {
                    return (
                        <div>
                            <AutoCompleteField
                                index={index}
                                register={register}
                            />
                        </div>
                    );
                })}
                <button type="button" onClick={handleAddInput}>
                    Add Input
                </button>
                
                
                <label className="fieldLabel">
                    Estimativa de gastos por pessoa
                </label>
                
                <input
                    min="0"
                    max="1000"
                    type="number"
                    placeholder="Estimativa de gastos por pessoa"
                    className="form__range"
                    step="10"
                    {...register('custoMedio', {})}
                  
                />

                <label className="fieldLabel">Permite pets?</label>
                <select className="form__select" {...register('petsOk')}>
                    <option value="true">Sim</option>
                    <option value="false">Não</option>
                </select>

                <label className="fieldLabel">Recomendado pra crianças?</label>
                <select className="form__select" {...register('criancaOk')}>
                    <option value="true">Sim</option>
                    <option value="false">Não</option>
                </select>

                <input type="submit" className="form__submit-btn" />
            </form>
        </div>
    );
};

export default AddRoadmap;
