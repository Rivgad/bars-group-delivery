import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import LoginForm from "./LoginForm";

const LoginPage = () => {
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const { isLoggedIn } = useSelector(state => state.auth);

    if (isLoggedIn) {
        return <Navigate to={from} replace />
    }
    return (
        <>
            <Container className='pt-5'>
                <LoginForm />
            </Container>
        </>
    )
}
export default LoginPage;