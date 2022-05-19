import { Alert } from "react-bootstrap";

const ErrorIndicator = ({ message, ...other }) => {
    return (
        <>
            <Alert variant="danger" {...other}>
                <Alert.Heading>О нет! Произошла ошибка!</Alert.Heading>
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