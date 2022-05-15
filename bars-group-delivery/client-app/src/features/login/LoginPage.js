import { Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { login } from "../auth/authSlice";

const LoginPage = ()=>{
    const dispatch = useDispatch();
    const {isLoggedIn}= useSelector(state=>state.auth);

    if(isLoggedIn){
        return <Navigate to='/profile'/>
    }
    return(
        <>
            <Container className='pt-5'>
                <Button onClick={()=>dispatch(login({phone:'79393374139', password:'123'}))}>
                    Login
                </Button>
            </Container>
        </>
    )
}
export default LoginPage;