import { useEffect } from "react";
import { Col, Row } from "react-bootstrap"
import { useDispatch } from "react-redux";
import CommonPage from "../common/CommonPage";
import ProfileForm from "./ProfileForm";
import { fetchUserInfo } from "./profileSlice";


const ProfilePage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserInfo());
    }, [dispatch])

    return (
        <>
            <Row className='mb-3 '>
                <h1>Личные данные</h1>
            </Row>
            <Row className='mb-3 bg-light p-5'>
                <Col>
                    <h5 className='mb-3'>Профиль</h5>
                    <ProfileForm />
                </Col>
            </Row>
        </>
    )
}

export default CommonPage(ProfilePage);