import { Col, Container, Row } from "react-bootstrap"
import { useSelector } from "react-redux";
import { selectCategoryIds } from "./categoriesSlice";
import CategoryCard from "./CategoryCard"

const CategoryGrid = () => {
    const categoryIds = useSelector(selectCategoryIds);

    const renderedProductCards = categoryIds?.map((id) => (
        <Col key={id}>
            <CategoryCard id={id} />
        </Col>
    ))

    return (
        <Container>
            <Row xs={1} md={2} lg={3} xl={4} className='g-4'>
                {renderedProductCards}
            </Row>
        </Container>
    )
}

export default CategoryGrid;