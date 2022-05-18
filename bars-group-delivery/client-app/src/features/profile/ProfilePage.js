import { useEffect } from "react";
import { Col, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { RequestStatus } from "../../helpers";
import CommonPage from "../common/CommonPage";
import ProfileForm from "./ProfileForm";
import { fetchUserInfo, updateUserInfo } from "./profileSlice";


const ProfilePage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserInfo());
    },[dispatch])

    const isLoading = useSelector(state=> state.profile.status) === RequestStatus.Loading;
    let phone = useSelector(state => state.profile.phone);
    let name = useSelector(state => state.profile.name);
    const onSubmit =(values)=>{
        dispatch(updateUserInfo(values))
    }
    return (
        <>
            <Row className='mb-3 '>
                <h1>Личные данные</h1>
            </Row>
            <Row className='mb-3 bg-light p-5'>
                <Col>
                    <h5 className='mb-3'>Профиль</h5>
                    <ProfileForm name={name} phone={phone} isLoading={isLoading} onSubmit={onSubmit}/>
                </Col>
            </Row>
        </>
    )
}

export default CommonPage(ProfilePage);