import { Badge, Button, Col, Container, Image, Modal, Row, Stack } from "react-bootstrap";
import { UpDownCounter } from "../base";

const ProductModalPanel = (props) => {
    const { data, onAddButtonClick, incCount, decCount, count, ...other } = props;
    const {onHide}=other;
    return (
        <Modal
            {...other}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {data?.title == null ? 'Название продукта' : data?.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <Container className='my-2'>
                    <Row>
                        <Col >
                            <Image width={384} height={384} src={data?.image}></Image>
                        </Col>
                        <Col className='d-flex flex-column'>
                            <Stack gap={2} >
                                <Stack direction='horizontal' gap={1} className='flex-wrap'>
                                    {
                                        data?.description?.map((item, idx) => <Badge key={idx} pill>{item}</Badge>)
                                    }
                                </Stack>
                                <p>{data?.text}</p>
                            </Stack>
                            <div className='d-flex '>
                                <UpDownCounter onDecClick={decCount} onIncClick={incCount} count={count} />
                                <Button
                                    className='ms-auto'
                                    onClick={() => {
                                        onAddButtonClick(Number(data?.id), count);
                                        onHide();
                                    }}
                                >
                                    Добавить {data?.price * count} ₽
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