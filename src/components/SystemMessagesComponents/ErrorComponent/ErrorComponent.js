
import { Alert, AlertTitle } from '@mui/material';

const ErrorComponent = (props) => {
    const { width, height, margin, title, message } = props
    return (
        <div style={{ width: width, height: height, margin: margin }}>
            <Alert severity="error" width="20%">
                <AlertTitle>{title}</AlertTitle>
                {message}
            </Alert>
        </div>
    );
};

export default ErrorComponent;