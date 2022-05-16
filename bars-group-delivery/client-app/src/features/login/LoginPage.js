import {  Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { auth } from "../auth/authSlice";
import LoginForm from "./LoginForm";

const LoginPage = () => {
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector(state => state.auth);

    if (isLoggedIn) {
        return <Navigate to='/' />
    }
    return (
        <>
            <Container className='pt-5'>
                <LoginForm onSubmit={({ phone, password }) => dispatch(auth({ phone, password }))} />
            </Container>
        </>
    )
}
export default LoginPage;