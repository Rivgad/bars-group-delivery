import { Button, Col, Container, Offcanvas, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Basket from "../basket/Basket";
import { isOpenChanged, selectBasketIsEmpty } from "../basket/basketSlice";
import ProductGrid from "./ProductGrid";

const MenuPage = () => {
    let navigate = useNavigate();
    const basketShow = useSelector(state => state.basket.isOpen);
    const basketIsEmpty = useSelector(selectBasketIsEmpty);
    const totalPrice = useSelector(state => state.basket.totalPrice);

    const dispatch = useDispatch();

    const handleClose = () => dispatch(isOpenChanged(false));

    return (
        <>
            <Container className='pt-0 pb-5' fluid>
                <Row>
                    <Col className='pt-3'>
                        <ProductGrid />
                    </Col>
                </Row>
            </Container>

            <Offcanvas show={basketShow} onHide={handleClose} placement='end' >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Корзина</Offcanvas.Title>
                </Offcanvas.Header>

                <Offcanvas.Body>
                    <Basket />
                </Offcanvas.Body>
                {
                    basketIsEmpty === true ?
                        <></>
                        :
                        <Button className=' w-75 m-2 p-3 ms-auto me-auto' onClick={() => {
                            navigate('/checkout')
                            handleClose();
                        }}>
                            <div className='d-flex justify-content-between align-items-center'>
                                <div>
                                    Заказать
                                </div>
                                <div>
                                    {totalPrice} ₽
                                </div>
                            </div>
                        </Button>
                }
            </Offcanvas>
        </>
    );
}

export default MenuPage;