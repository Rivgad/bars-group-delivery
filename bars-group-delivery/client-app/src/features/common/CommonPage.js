import { Col, Container, Row } from "react-bootstrap";

const CommonPage = (View) =>{
    return props=> (
        <Container className='py-4' >
            <View/>
        </Container>
    );
}

export default CommonPage;