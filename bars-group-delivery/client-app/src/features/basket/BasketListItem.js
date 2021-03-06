import { Col, Container, Image, Row } from "react-bootstrap";
import UpDownCounter from "../common/UpDownCounter";

const BasketListItem = ({ product, handleIncClick, handleDecClick }) => {
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
                            onDecClick={handleDecClick}
                            count={product.count} />
                    </Col>
                    <Col xs={4} className='px-0 justify-content-end d-flex'>
                        <span>{product?.total} ₽</span>
                    </Col>
                </Row>
            </Container>
        </li>
    );
}

export default BasketListItem;