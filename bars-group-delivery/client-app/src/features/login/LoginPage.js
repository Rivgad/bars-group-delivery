import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { auth } from "../auth/authSlice";
import LoginForm from "./LoginForm";

const LoginPage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const { isLoggedIn } = useSelector(state => state.auth);
    console.log(from);
    const handleSubmit = ({ phone, password }) => {
        dispatch(auth({ phone, password }))
    }

    if (isLoggedIn) {
        return <Navigate to={from} replace />
    }
    return (
        <>
            <Container className='pt-5'>
                <LoginForm onSubmit={handleSubmit} />
            </Container>
        </>
    )
}
export default LoginPage;