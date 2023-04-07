/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import './roteiro-module.css';

import { useForm } from 'react-hook-form';

const Roteiro = () => {
  const [inputCount, setInputCount] = useState(1);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleAddInput = () => {
    if (inputCount < 5) {
      setInputCount(inputCount + 1);
    }
  };

  const onChange = (value) => {
    console.log(value);
  };

  const custoMedio = watch('custoMedio');

  const onSubmit = (data) => console.log(data);

  return (
    <div className="formBox">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <label className="fieldLabel">Nome do roteiro</label>
        <input
          type="text"
          placeholder="Nome do roteiro"
          className="form__input"
          {...register('nomeRoteiro', {})}
        />

        <label className="fieldLabel">Descrição do roteiro</label>
        <textarea
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
          <option value="transportePublico">Transporte público</option>
          <option value="bicicleta">Bicicleta</option>
          <option value="andando">A pé</option>
        </select>

        <label className="fieldLabel">Paradas Recomendadas (máx.: 5)</label>
        {[...Array(inputCount)].map((_, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Input ${index + 1}`}
            className="form__input"
            {...register(`paradasRecomendadas.${index}`, {})}
          />
        ))}
        <button type="button" onClick={handleAddInput}>
          Add Input
        </button>

        <label className="fieldLabel">Estimativa de gastos por pessoa</label>
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
