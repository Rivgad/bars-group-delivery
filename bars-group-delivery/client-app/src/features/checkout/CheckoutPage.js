import { Button, Col, Container, FloatingLabel, Form, Row} from "react-bootstrap";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Basket from "../basket/Basket";
import { selectBasketIsEmpty } from "../basket/basketSlice";

const CheckoutFrom = (props) => {

    return (
        <Form onSubmit={(event)=> event.preventDefault()}>
            <Form.Label>
                <h4>Доставка</h4>
            </Form.Label>
            <FloatingLabel className='mb-4' controlId="address" label="Телефон">
                <Form.Control type='phone' placeholder="Телефон" />
            </FloatingLabel>
            <FloatingLabel className='mb-4' controlId="address" label="Адрес доставки">
                <Form.Control type='text' placeholder="Адрес доставки" />
            </FloatingLabel>

            <Row className='mb-4'>
                <Col>
                    <FloatingLabel controlId="entrance" label="Подъезд">
                        <Form.Control type='text' placeholder="Подъезд" />
                    </FloatingLabel>
                </Col>
                <Col>
                    <FloatingLabel controlId="intercom" label="Домофон">
                        <Form.Control type='text' placeholder="Домофон" />
                    </FloatingLabel>
                </Col>
                <Col>
                    <FloatingLabel controlId="floor" label="Этаж">
                        <Form.Control type='text' placeholder="Этаж" />
                    </FloatingLabel>
                </Col>
                <Col>
                    <FloatingLabel controlId="flat" label="Квартира">
                        <Form.Control type='number' placeholder="Квартира" />
                    </FloatingLabel>
                </Col>
            </Row>
            <Form.Group className='mb-4' controlId="comment">
                <Form.Label>Комментарий</Form.Label>
                <Form.Control type='text' as='textarea' placeholder="Напишите, как вас найти или пожелания для блюд..." />
            </Form.Group>
            <Button type='submit' className='w-100' size='lg'>Заказать</Button>
        </Form>
    );
}

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
                        <CheckoutFrom/>
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