import { Container, Form, Row } from "react-bootstrap"

const ProfileForm = (props) => {

    return (
        <Form onSubmit={(event)=> event.preventDefault()}>

        </Form>
    )
}

const ProfilePage = () => {
    return (
        <Container className='pt-4 pb-5'>
            <Row className='mb-3'>
                <h1>Личные данные</h1>
            </Row>
            <Row>
                <ProfileForm/>
            </Row>
        </Container>

    )
}

export default ProfilePage;