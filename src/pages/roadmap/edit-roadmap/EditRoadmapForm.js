import './edit-roadmap-module.css';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import AutoCompleteField from '../../../components/AutoCompleteMapField/AutoCompleteField';
import { initGoogleMapApiScript } from '../../../components/utils/mapFunctions';

const EditRoadmap = (props) => {
    const inputCount = 5;
    const autoCompleteField = 0;

    const { register, handleSubmit, watch } = useForm();
    const custoMedio = watch('custoMedio');

    const { handleModalClose } = props;

    const onChange = (value) => {
        console.log(value);
    };

    const [imageData, setImageData] = useState(getCurrentUserInformation().photoURL);
    const handleImageChange = (imageData) => {
        setImageData(imageData);
        setFormData({
            ...formData,
            profilepic: imageData
        });
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
            new window.google.maps.places.Autocomplete(
                document.getElementById(
                    `inputFieldAut${autoCompleteField - 1}`
                ),
                autoCompleteOptions
            );
        }
    }, [inputCount]);

    const onSubmit = async (data) => {
        // console.log(data);
        // data.userCreatorId = email;
        try {
            const { docId } = props.props;
            console.log(props.props);
            const response = await axios.put('roadmap/edit', {
                documentId: docId,
                newDocData: data,
            });

            if (response.status === 200) {
                console.log(response);
                alert('edit success');
                handleModalClose();
            } else {
                console.log('Some pepino occurred debug it');
            }
        } catch (error) {
            console.log(JSON.stringify(error.response.data).slice(1, -1));
        }
    };

    return (
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <label className="fieldLabel">
                Definir visibilidade do roteiro como pública
            </label>
            <select
                className="form__select"
                defaultValue={props.props.visibilidadePublica}
                {...register('visibilidadePublica')}
            >
                <option value="true">Sim</option>
                <option value="false">Não</option>
            </select>

            <label className="fieldLabel">Nome do roteiro</label>
            <input
                type="text"
                placeholder="Nome do roteiro"
                className="form__input"
                defaultValue={props.props.title}
                {...register('title', {})}
            />

            <label className="fieldLabel">Descrição do roteiro</label>
            <textarea
                className="form__textarea"
                defaultValue={props.props.description}
                {...register('description', {})}
            />

            <label className="fieldLabel">
                Imagem thumb roteiro (só coloque links)
            </label>
            <input
                type="text"
                placeholder="Link imagem"
                defaultValue={props.props.image}
                className="form__input"
                {...register('image', {})}
            />

            <label className="fieldLabel">Cidade do roteiro</label>
            <input
                type="search"
                placeholder="Cidade do roteiro"
                className="form__input"
                defaultValue={props.props.cidadeRoteiro}
                {...register('cidadeRoteiro', {})}
            />

            <label className="fieldLabel">Ponto de partida</label>
            <input
                type="search"
                placeholder="Ponto de partida"
                className="form__input"
                defaultValue={props.props.pontoInicial}
                {...register('pontoInicial', {})}
            />

            <label className="fieldLabel">Destino</label>
            <input
                type="search"
                placeholder="Destino"
                defaultValue={props.props.pontoFinal}
                className="form__input"
                {...register('pontoFinal', {})}
            />

            <label className="fieldLabel">Recomendação de Transporte</label>
            <select
                className="form__select"
                defaultValue={props.props.recomendacaoTransporte}
                {...register('recomendacaoTransporte')}
            >
                <option value="Carro">Carro</option>
                <option value="Transporte público">Transporte público</option>
                <option value="Bicicleta">Bicicleta</option>
                <option value="Andando">A pé</option>
            </select>

            <label className="fieldLabel">
                Adicionar Paradas Recomendadas (máx.: 5)
            </label>
            {[...Array(inputCount)].map((_, index) => {
                return (
                    <div>
                        <AutoCompleteField index={index} register={register} />
                    </div>
                );
            })}
            {/** 
             * <label className="fieldLabel">
                Estimativa de gastos por pessoa
            </label>
            <input
                defaultValue={props.props.custoMedio}
                min="0"
                max="1000"
                type="range"
                placeholder="Estimativa de gastos por pessoa"
                className="form__range"
                step="10"
                {...register('custoMedio', {})}
                onChange={() => onChange(custoMedio)}
            />
            <span>${custoMedio}</span>    */}


            <label className="fieldLabel">Permite pets?</label>
            <select
                className="form__select"
                defaultValue={props.props.petsOk}
                {...register('petsOk')}
            >
                <option value="true">Sim</option>
                <option value="false">Não</option>
            </select>

            <label className="fieldLabel">Recomendado pra crianças?</label>
            <select
                className="form__select"
                defaultValue={props.props.criancaOk}
                {...register('criancaOk')}
            >
                <option value="true">Sim</option>
                <option value="false">Não</option>
            </select>
            <input type="submit" className="form__submit-btn" style={{ width: '50%' }} />
        </form>
    );
};

export default EditRoadmap;
