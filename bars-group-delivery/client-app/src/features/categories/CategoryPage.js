import { useEffect } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { fetchCategories } from "./categoriesSlice"
import CategoryGrid from "./CategoryGrid"

const CategoryPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch])

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