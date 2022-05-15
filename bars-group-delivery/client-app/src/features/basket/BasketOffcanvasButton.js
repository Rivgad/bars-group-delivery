import { useState } from "react";
import { Button, Nav, Offcanvas } from "react-bootstrap";
import { Basket3 } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Basket from "./Basket";
import { selectBasketIsEmpty } from "./basketSlice";

const BasketOffcanvasButton = () => {
    let navigate = useNavigate();
    const [show, setshow] = useState(false);

    const basketIsEmpty = useSelector(selectBasketIsEmpty);
    const totalPrice = useSelector(state => state.basket.totalPrice);
    const handleOpen = () => setshow(true);
    const handleClose = () => setshow(false);

    return (
        <>
            <Nav.Link onClick={handleOpen} className=' d-flex justify-content-center align-items-center'>
                <Basket3 width={20} height={20} className='me-2'>

                </Basket3>
                {
                    totalPrice == null || totalPrice <= 0 ?
                        <span>Корзина</span>
                        :
                        `${totalPrice} ₽`
                }
            </Nav.Link>
            <Offcanvas show={show} onHide={handleClose} placement='end' >
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
    )
}

export default BasketOffcanvasButton;