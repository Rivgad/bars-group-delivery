import { Col, Container, Image, Row } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux'

import UpDownCounter from '../common/UpDownCounter';
import { productCountChanged, selectBasketProductById } from "./basketSlice";

const BasketItem = ({ id }) => {
    const dispatch = useDispatch();
    const product = useSelector((state) => selectBasketProductById(state, id));
    const handleIncClick = () => {
        dispatch(productCountChanged(product, 1));
    };

    return (
        <li className=' d-flex'>
            <Container fluid className='ps-2'>
                <Row className='align-items-center'>
                    <Col xs={2}>
                        <Image style={{ 'width': 40, 'height': 40 }}
                            src={product.photo ? `data:image/png;base64,${product.photo}` : `${process.env.PUBLIC_URL}/dish-icon.svg`}
                        />
                    </Col>
                    <Col>
                        <span >{product?.title}</span>
                        <UpDownCounter
                            className='mt-1'
                            onIncClick={handleIncClick}
                            onDecClick={() => dispatch(productCountChanged(product, -1))}
                            count={product.count} />
                    </Col>
                    <Col xs={3} >
                        <span>{product?.total} ₽</span>
                    </Col>
                </Row>
            </Container>
        </li>
    );
}

export default BasketItem;