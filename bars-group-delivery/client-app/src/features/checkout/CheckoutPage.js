import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import Basket from "../basket/Basket";
import { selectBasketIsEmpty, selectBasketProducts } from "../basket/basketSlice";
import OrderModalPanel from "../orders/OrderModalPanel";
import { createOrderRequest, selectCurrentOrderIsEmpty } from "../orders/ordersSlice";
import CheckoutFrom from "./ChechoutForm";


const CheckoutPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const basketIsEmpty = useSelector(selectBasketIsEmpty);
    const totalPrice = useSelector(state => state.basket.totalPrice);
    const { user: currentUser } = useSelector((state) => state.auth);
    const currentOrderIsEmpty = useSelector(selectCurrentOrderIsEmpty);

    const basketProducts = useSelector(selectBasketProducts);

    if (basketIsEmpty && currentOrderIsEmpty) {
        return <Navigate to='/' />
    }
    const handleSubmit = async (values) => {
        if (!currentUser) {
            navigate('/login', { state:{ from:location }, replace: true });
            return;
        }
        const { address, entrance, flat, floor, intercom, comment } = values;

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

    return (
        <>
            <Container className='py-5' >
                <h1 className='mb-4'>Оформление заказа</h1>

                <Row>
                    <Col md={12} lg={8} className='py-3 px-4 bg-light'>
                        <CheckoutFrom onSubmit={handleSubmit} />
                    </Col>
                    <Col md={12} lg={4} className='p-3' >
                        <h4>Ваш заказ</h4>
                        <Basket />
                        <div className='d-flex justify-content-between mt-4'>
                            <h4>Итого</h4>
                            <h4>{totalPrice} ₽</h4>
                        </div>
                    </Col>
                </Row>
            </Container>

            <OrderModalPanel />
        </>
    );
}

export default CheckoutPage;