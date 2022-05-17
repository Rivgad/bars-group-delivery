import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

import Basket from "../basket/Basket";
import { selectBasketIsEmpty, selectBasketProducts } from "../basket/basketSlice";
import OrderModalPanel from "../orders/OrderModalPanel";
import { createOrderRequest } from "../orders/ordersSlice";
import CheckoutFrom from "./ChechoutForm";


const CheckoutPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const basketIsEmpty = useSelector(selectBasketIsEmpty);
    const totalPrice = useSelector(state => state.basket.totalPrice);
    const { user: currentUser } = useSelector((state) => state.auth);
    const currentOrder = useSelector((state) => state.orders.currentOrder);

    const basketProducts = useSelector(selectBasketProducts);

    if (basketIsEmpty && !currentOrder) {
        return <Navigate to='/' />
    }
    const handleSubmit = async (values) => {
        if (!currentUser) {
            navigate('/login');
            return;
        }
        const { address, entrance, flat, floor, intercom, comment } = values;
        try {
            console.log(flat)
            const requestData = {
                address: [
                    address,
                    flat === "" ? null : `кв. ${flat}`,
                    floor === "" ? null : `Этаж ${floor}`,
                    entrance === "" ? null : `Подъезд ${entrance}`,
                    intercom === "" ? null : `Домофон ${intercom}`
                ].filter(x => typeof x === 'string' && x.length > 0).join(', '),
                products: basketProducts.map(item => {
                    return {
                        id: item.id,
                        quantity: item.count
                    }
                }),
                comment
            };

            dispatch(createOrderRequest(requestData));
        }
        catch (error) {
            console.log(error);
        }

    }

    return (
        <>
            <Container className='pt-3 pb-5'>
                <Row className='mb-3'>
                    <h1>Оформление заказа</h1>
                </Row>
                <Row>
                    <Col className='px-5 mx-3 py-4 bg-light'>
                        <CheckoutFrom onSubmit={handleSubmit} />
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

            <OrderModalPanel/>
        </>
    );
}

export default CheckoutPage;