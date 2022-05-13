import { Col, Container, Row, Stack } from "react-bootstrap";

const CheckoutPage = () => {
    return (
        <>
            <Container className='pt-3 pb-5' >
                <Row>
                    <Col>
                        <Stack gap={3} >

                            <h1>Оформление заказа</h1>

                            <div>
                                Доставка

                            </div>

                        </Stack>
                    </Col>
                    <Col xs={4}>
                        Корзина
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default CheckoutPage;