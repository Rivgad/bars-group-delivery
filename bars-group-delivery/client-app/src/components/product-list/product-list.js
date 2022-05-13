import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ProductCard from "../product-card";
import ProductModalPanel from "../product-modal-panel/product-modal-panel";

const ProductList = ({ data, addItem }) => {
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
        setCount(1);
        setProductData(data);
        setModalShow(true);
    }
    const hideModalPanel = ()=>{
        setModalShow(false);
    }
    return (
        <>
            <Container >
                <Row xs={2} md={2} lg={3} className="g-4">
                    {data.map((item, idx) => (
                        <Col key={item.id}>
                            <ProductCard data={item} onButtonClick={(data) => openModalPanel(data)} />
                        </Col>
                    ))}
                </Row>
            </Container>
            <ProductModalPanel
                incCount={IncCount}
                decCount={DecCount}
                count={count}
                onAddButtonClick={addItem}
                data={productData}
                show={modalShow}
                onHide={hideModalPanel}
            />
        </>
    );
}

export default ProductList;