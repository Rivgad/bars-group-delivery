import { Button, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Stack } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { OrderStatus } from "../../helpers";
import { onCurrentOrderClosed } from "./ordersSlice";

const OrderModalPanel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClose = () => dispatch(onCurrentOrderClosed());
    const handleClick=()=>{
        navigate('/orders');
        handleClose();
    }

    const currentOrder = useSelector((state) => state.orders.currentOrder);
    const show = Object.entries(currentOrder).length !== 0;
    
    return (
        <Modal show={show} onHide={handleClose} >
            <ModalHeader closeButton>
                <ModalTitle>Ваш заказ успешно создан!</ModalTitle>
            </ModalHeader>
            <ModalBody className='p-4'>
                <Stack gap={3} className=' align-items-center'>
                    <span><b>Адрес доставки: </b>{currentOrder.address}</span>
                    <span><b>Статус заказа: </b> {OrderStatus[currentOrder.status]?.text}</span>
                </Stack>
            </ModalBody>
            <ModalFooter>
                <Button onClick={handleClick}>
                    Мои заказы
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default OrderModalPanel;