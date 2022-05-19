import { Alert } from "react-bootstrap";

const ErrorIndicator = ({ title, message, ...other }) => {
    return (
        <>
            <Alert variant="danger" {...other}>
                <Alert.Heading>{title ?? "О нет! Произошла ошибка!"}</Alert.Heading>
                <p>
                    {
                        message ?? "Попробуйте снова."
                    }
                </p>
            </Alert>
        </>
    );
}

export default ErrorIndicator;