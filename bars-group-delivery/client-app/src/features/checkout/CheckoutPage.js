import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Basket from "../basket/Basket";
import { selectBasketIsEmpty } from "../basket/basketSlice";
import CheckoutFrom from "./ChechoutForm";


const CheckoutPage = () => {
    const basketIsEmpty = useSelector(selectBasketIsEmpty);
    const totalPrice = useSelector(state => state.basket.totalPrice);

    if (basketIsEmpty) {
        return <Navigate to='/' />
    }


    return (
        <>
            <Container className='pt-3 pb-5'>
                <Row className='mb-3'>
                    <h1>Оформление заказа</h1>
                </Row>
                <Row>
                    <Col className='px-5 mx-3 py-4 bg-light'>
                        <CheckoutFrom onSubmit={console.log} />
                    </Col>
                    <Col xs={4} className='mt-3'>
                        <h4>Ваш заказ</h4>
                        <Basket />
                        <div className='d-flex justify-content-between mt-4'>
                            <h4>Итого</h4>
                            <h4>{totalPrice} ₽</h4>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default CheckoutPage;