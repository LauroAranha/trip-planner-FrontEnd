/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
import './roteiro-module.css';

import { useForm } from 'react-hook-form';
import AutoCompleteField from '../../components/AutoCompleteMapField/AutoCompleteField';
import { initGoogleMapApi } from '../../components/utils/mapFunctions';

const Roteiro = () => {
    const [inputCount, setInputCount] = useState(0);
    const [autoCompleteField, setAutoCompleteField] = useState(0);

    const { register, handleSubmit, watch } = useForm();
    const custoMedio = watch('custoMedio');

    const handleAddInput = () => {
        if (inputCount < 5) {
            setInputCount(inputCount + 1);
        }
        setAutoCompleteField(autoCompleteField + 1);
    };
    const onChange = (value) => {
        console.log(value);
    };

    useEffect(() => {
        initGoogleMapApi();
    }, []);
    useEffect(() => {
        if (autoCompleteField) {
            // eslint-disable-next-line no-new
            new window.google.maps.places.Autocomplete(
                document.getElementById(`inputFieldAut${autoCompleteField - 1}`)
            );
        }
    }, [inputCount]);

    const onSubmit = (data) => console.log(data);

    return (
        <div className="formBox">
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <label className="fieldLabel">Nome do roteiro</label>
                <input
                    required
                    type="text"
                    placeholder="Nome do roteiro"
                    className="form__input"
                    {...register('nomeRoteiro', {})}
                />

                <label className="fieldLabel">Descrição do roteiro</label>
                <textarea
                    required
                    className="form__textarea"
                    {...register('descricaoRoteiro', {})}
                />

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
                    type="range"
                    placeholder="Estimativa de gastos por pessoa"
                    className="form__range"
                    step="10"
                    {...register('custoMedio', {})}
                    onChange={() => onChange(custoMedio)}
                />
                <span>${custoMedio}</span>

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

export default Roteiro;
