import { Col, Container, Row } from "react-bootstrap"
import CategoryGrid from "./CategoryGrid"

const CategoryPage = () => {

    return (
        <Container className='pt-0 pb-5' fluid>
            <Row>
                <Col className='pt-3'>
                    <CategoryGrid />
                </Col>
            </Row>
        </Container>
    )
}

export default CategoryPage;