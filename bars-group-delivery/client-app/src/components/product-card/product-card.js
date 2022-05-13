import { Badge, Button, Card, Stack } from "react-bootstrap";

const ProductCard = (props) => {
    const { data, onButtonClick, ...other } = props;
    return (
        <>
            <Card
                style={{ 'minHeight': '416px' }}
                {...other}
            >
                <Card.Img style={{ 'height': '272px' }} variant="top" src={data?.image} />

                <Card.Body style={{ 'position': 'relative' }}>
                    <Card.Title>
                        {
                            data?.title == null ? 'Название' : data.title
                        }
                    </Card.Title>

                    <Stack direction='horizontal' gap={1} className='flex-wrap'>
                        {
                            data?.description?.map((item, idx) => <Badge key={idx} pill>{item}</Badge>)
                        }
                    </Stack>
                </Card.Body>
                <Card.Footer>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div >
                            {
                                data?.price == null ?
                                    'Цена ' :
                                    data.price
                            } ₽</div>
                        <div >
                            <Button onClick={() => onButtonClick(data)}>В корзину</Button>
                        </div>
                    </div>
                </Card.Footer>
            </Card>
        </>
    )
}

export default ProductCard;