import { useEffect, useState } from "react";
import { Button, Col, Container, Image, Offcanvas, Row, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UpDownCounter } from "../base";
import ProductList from "../product-list/product-list";
import DishIcon from './dish-icon.svg';

const arr = Array.from({ length: 10 }).map((_, idx) => {
    return {
        id: idx,
        price: 400,
        title: `Продукт ${idx}`,
        text: `Описание продукта ${idx}`,
        ingredients: [

        ],
        description: [
            `${10 * idx} г`,
            `${100 * idx} ккал`
        ]
    }
});
const updateCartItems = (cartItems, item, idx) => {
    if (item.count === 0) {
        return [
            ...cartItems.slice(0, idx),
            ...cartItems.slice(idx + 1)
        ]
    }

    if (idx === -1) {
        return [
            ...cartItems,
            item
        ]
    }
    return [
        ...cartItems.slice(0, idx),
        item,
        ...cartItems.slice(idx + 1)
    ]
}
const updateCartItem = (product, item = {}, quantity) => {
    const {
        id = product.id,
        count = 0,
        title = product.title,
        ingredients = [...product.ingredients],
        description = [...product.description],
        total = 0
    } = item;

    return {
        id,
        title,
        ingredients: [...ingredients],
        description: [...description],
        count: count + quantity,
        total: total + product.price * quantity
    }
}
const MainPage = () => {
    let navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const toggleShow = () => setShow((s) => !s);

    const AddItem = (id, count) => {
        const product = products.find((item) => item.id === id);
        const itemIndex = cart.findIndex((item) => item.id === id);
        const item = cart[itemIndex];
        const newProduct = updateCartItem(product, item, count);

        setCart((cart) => updateCartItems(cart, newProduct, itemIndex));
    }

    useEffect(() => {
        setProducts(arr)
    }, []);

    return (
        <>
            <Button onClick={toggleShow}>Корзина</Button>
            <Container className='pt-0 pb-5' fluid>
                <Row>
                    <Col className='pt-3'>
                        <ProductList data={products} addItem={AddItem} />
                    </Col>
                </Row>
            </Container>
            <Offcanvas show={show} onHide={handleClose} placement='end' >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Корзина</Offcanvas.Title>
                </Offcanvas.Header>
                {
                    cart.length === 0 ?
                        <Offcanvas.Body>
                            Корзина пуста
                        </Offcanvas.Body>
                        :
                        <>
                            <Offcanvas.Body className='d-flex flex-column align-items-center'>
                                <Stack gap={2}>
                                    {
                                        cart.map((item) => {
                                            return (
                                                <li key={item.id} className=' d-flex'>
                                                    <Container fluid className='ps-2'>
                                                        <Row className='align-items-center'>
                                                            <Col xs={2}>
                                                                <Image style={{ 'width': 40, 'height': 40 }} src={DishIcon} />
                                                            </Col>
                                                            <Col>
                                                                <span >{item.title}</span>
                                                                <UpDownCounter
                                                                    className='mt-1'
                                                                    onIncClick={() => AddItem(item.id, 1)}
                                                                    onDecClick={() => AddItem(item.id, -1)}
                                                                    count={item.count} />
                                                            </Col>
                                                            <Col xs={3} >
                                                                <span>{item.total} ₽</span>
                                                            </Col>
                                                        </Row>
                                                    </Container>

                                                </li>
                                            )
                                        })
                                    }
                                </Stack>
                            </Offcanvas.Body>
                            <Button className=' w-75 m-2 p-3 ms-auto me-auto' onClick={() => navigate('/checkout')}>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div>
                                        Заказать
                                    </div>
                                    <div>
                                        1000 ₽
                                    </div>
                                </div>
                            </Button>

                        </>
                }
            </Offcanvas>

        </>
    );
}

export default MainPage;