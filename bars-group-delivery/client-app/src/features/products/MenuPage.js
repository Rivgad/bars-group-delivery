import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ProductGrid from "./ProductGrid";
import { fetchProducts } from './productsSlice';

const MenuPage = () => {
    let { id: categoryId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProducts(categoryId));
    }, [dispatch, categoryId]);

    return (
        <>
            <Container className='pt-0 pb-5' fluid>
                <h1>{categoryId}</h1>
                <Row>
                    <Col className='pt-3'>
                        <ProductGrid />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default MenuPage;