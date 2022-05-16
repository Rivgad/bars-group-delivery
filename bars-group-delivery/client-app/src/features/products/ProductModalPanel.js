import { Button, Col, Container, Image, Modal, Row, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { productCountChanged } from "../basket/basketSlice";

import UpDownCounter from "../common/UpDownCounter";
import { selectProductById } from "./productsSlice";

const DescriptionItem = ({ value, text }) => {

    return (
        (value !== 0 && value != null) &&
        <div className=' rounded-3 shadow d-flex flex-wrap px-1' style={{ minWidth: 60, height: 60 }}>
            <span className=' mx-auto align-self-center w-100 text-center'>
                {value}
                <br />{text}
            </span>
        </div>
    );
}

const ProductModalPanel = (props) => {
    const { id, onAddButtonClick, incCount, decCount, count, ...other } = props;
    const { onHide } = other;

    const dispatch = useDispatch();
    const product = useSelector((state) => selectProductById(state, id));

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
                    <Row className='mb-3'>
                        <Col >
                            <Image width={384} height={384}
                                src={product.photo ? `data:image/png;base64,${product.photo}` : `${process.env.PUBLIC_URL}/dish-icon.svg`}
                                alt='Изображение'
                            />
                        </Col>
                        <Col className='d-flex flex-column'>
                            <Stack gap={2} >
                                <Stack direction='horizontal' gap={1} className='flex-wrap'>
                                    <DescriptionItem value={product?.weight} text='грамм' />
                                    <DescriptionItem value={product?.proteins} text='белки' />
                                    <DescriptionItem value={product?.fats} text='жиры' />
                                    <DescriptionItem value={product?.carbs} text='углеводы' />
                                    <DescriptionItem value={product?.kcal} text='ккал' />
                                </Stack>
                                <h5>Состав: </h5>
                                <Stack direction='horizontal' gap={2} className='flex-wrap'>
                                    {
                                        product?.ingredients?.map((item) => (
                                            <span key={item.id}
                                                style={{ border: '1px solid', fontSize: 15, borderRadius: 30, textAlign: 'center' }}
                                                className='px-2'
                                            >
                                                {item.title}
                                            </span>
                                        ))
                                    }
                                </Stack>
                            </Stack>
                        </Col>
                    </Row>
                    <Row >
                        <div className='d-flex justify-content-end'>
                            <UpDownCounter onDecClick={decCount} onIncClick={incCount} count={count} />
                            <Button
                                className='ms-3'
                                onClick={() => {
                                    dispatch(productCountChanged(product, count));
                                    onHide();
                                }}
                            >
                                Добавить {product?.price * count} ₽
                            </Button>
                        </div>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    );
}

export default ProductModalPanel;