import { Alert, AlertTitle } from '@mui/material';

const ErrorComponent = (props) => {
    const { title, message } = props;
    return (
        <div className="error-component">
            <Alert
                className="alert alert-danger"
                severity="error"
                style={{
                    borderRadius: '15px',
                    fontSize: '15px',
                    marginTop: '20px',
                }}
            >
                <AlertTitle>{title}</AlertTitle>
                {message}
            </Alert>
        </div>
    );
};

export default ErrorComponent;
