import { Badge, Button, Col, Container, Image, Modal, Row, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { productCountChanged } from "../basket/basketSlice";

import UpDownCounter from "../common/UpDownCounter";
import { selectProductById } from "./productsSlice";

const ProductModalPanel = (props) => {
    const { id, onAddButtonClick, incCount, decCount, count, ...other } = props;
    const {onHide}=other;

    const dispatch = useDispatch();
    const product = useSelector((state)=> selectProductById(state, id));
    
    return (
        <Modal
            {...other}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {product?.title == null ? 'Название продукта' : product?.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <Container className='my-2'>
                    <Row>
                        <Col >
                            <Image width={384} height={384} src={product?.image}></Image>
                        </Col>
                        <Col className='d-flex flex-column'>
                            <Stack gap={2} >
                                <Stack direction='horizontal' gap={1} className='flex-wrap'>
                                    {
                                        product?.description?.map((item, idx) => <Badge key={idx} pill>{item}</Badge>)
                                    }
                                </Stack>
                                <p>{product?.text}</p>
                            </Stack>
                            <div className='d-flex '>
                                <UpDownCounter onDecClick={decCount} onIncClick={incCount} count={count} />
                                <Button
                                    className='ms-auto'
                                    onClick={() => {
                                        dispatch(productCountChanged(product, count));
                                        onHide();
                                    }}
                                >
                                    Добавить {product?.price * count} ₽
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    );
}

export default ProductModalPanel;