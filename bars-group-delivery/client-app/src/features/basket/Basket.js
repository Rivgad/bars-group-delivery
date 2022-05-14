import { Stack } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import BasketItem from './BasketItem';
import { selectBasketProductIds } from './basketSlice';

const Basket = () => {
    const productIds = useSelector(selectBasketProductIds);

    if (productIds.length === 0) {
        return <>Корзина пуста</>
    }

    const renderedListItems = productIds.map((productId) => {
        return <BasketItem key={productId} id={productId} />
    });

    return (
        <>
            <Stack gap={2}>
                {renderedListItems}
            </Stack>
        </>
    )
}

export default Basket;