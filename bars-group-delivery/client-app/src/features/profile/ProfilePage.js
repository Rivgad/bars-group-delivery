import { CloseButton, Col, ListGroupItem, Row } from "react-bootstrap"
import { useSelector } from "react-redux";
import CommonPage from "../common/CommonPage";
import ProfileForm from "./ProfileForm";


const ProfilePage = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const { phone, name } = currentUser;
    const addresses = null ?? [];
    return (
        <>
            <Row className='mb-3 '>
                <h1>Личные данные</h1>
            </Row>
            <Row className='mb-3 bg-light p-5'>
                <Col>
                    <h5 className='mb-3'>Профиль</h5>
                    <ProfileForm phone={phone} name={name} onSubmit={console.log} />
                </Col>
            </Row>
            <Row className='mb-3 bg-light p-5'>
                <Col>
                    <h5 className='mb-3'>Адреса доставки</h5>
                    {
                        Object.values(addresses).map(item =>
                            <ListGroupItem key={item.id} className=' d-flex justify-content-between align-items-center'>
                                {[item.city, item.street, item.house, item.flat].filter(item => item != null).join(', ')}
                                <CloseButton aria-label="Hide" />
                            </ListGroupItem>
                        )
                    }
                </Col>
            </Row>
        </>
    )
}

export default CommonPage(ProfilePage);