import './AutoCompleteField.css';

const AutoCompleteField = (props) => {
    const { index, register } = props;
    const inputId = `inputFieldAut${index}`;

    return (
        <div>
            <input
                id={inputId}
                key={index}
                type="text"
                placeholder={`Input ${index + 1}`}
                className="form"
                {...register(`paradasRecomendadas.${index}`, {})}
            />
        </div>
    );
};

export default AutoCompleteField;
