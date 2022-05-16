import { useState } from "react";
import { useSelector } from 'react-redux'
import { Col, Container, Row } from "react-bootstrap";

import ProductModalPanel from './ProductModalPanel'
import ProductCard from "./ProductCard";
import { selectProductIds } from "./productsSlice";

const ProductGrid = () => {
    const [modalShow, setModalShow] = useState(false);
    const [productData, setProductData] = useState({});
    const [count, setCount] = useState(1);
    const IncCount = () => setCount((count) => count + 1);
    const DecCount = () => {
        setCount((count) => {
            if (count > 0) {
                return count - 1
            }
            return count;
        })
    }
    const openModalPanel = (data) => {
        //console.log(data);
        setProductData(data);
        setModalShow(true);
    }
    const hideModalPanel = () => {
        setModalShow(false);
        setCount(1);
    }

    const productIds = useSelector(selectProductIds);
    const renderedProductCards = productIds.map((id) => (
        <Col key={id}>
            <ProductCard id={id} onButtonClick={(data) => openModalPanel(data)} />
        </Col>
    ))

    return (
        <>
            <Container >
                <Row xs={1} md={2} lg={3} className="g-4">
                    {renderedProductCards}
                </Row>
            </Container>
            {
                productData.id &&
                <ProductModalPanel
                    id={productData.id}
                    incCount={IncCount}
                    decCount={DecCount}
                    count={count}
                    onAddButtonClick={null}
                    show={modalShow}
                    onHide={hideModalPanel}

                />
            }
        </>
    );
}

export default ProductGrid;