import { Badge, Button, Card, Stack } from "react-bootstrap";
import {useSelector} from 'react-redux';
import { selectProductById } from "./productsSlice";

const ProductCard = ({id, onButtonClick}) => {
    const product = useSelector((state)=> selectProductById(state, id));

    return (
        <>
            <Card
                style={{ 'minHeight': '440px' }}
            >
                <Card.Img style={{ 'height': '272px','objectFit': 'cover' }} variant="top" 
                    src={product.photo ? `data:image/png;base64,${product.photo}` : `${process.env.PUBLIC_URL}/dish-icon.svg`}
                />

                <Card.Body style={{ 'position': 'relative' }}>
                    <Card.Title>
                        {
                            product.title
                        }
                    </Card.Title>

                    <Stack direction='horizontal' gap={1} className='flex-wrap'>
                        {
                            product.description?.map((item, idx) => <Badge key={idx} pill>{item}</Badge>)
                        }
                    </Stack>
                </Card.Body>
                <Card.Footer>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div >
                            {
                                product?.price == null ?
                                    'Цена ' :
                                    product.price
                            } ₽</div>
                        <div >
                            <Button onClick={() => {
                                onButtonClick(product)
                            }}>В корзину</Button>
                        </div>
                    </div>
                </Card.Footer>
            </Card>
        </>
    )
}

export default ProductCard;