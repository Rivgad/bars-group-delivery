import { useSelector, useDispatch } from 'react-redux'
import BasketListItem from "./BasketListItem";
import { productCountChanged, selectBasketProductById } from "./basketSlice";

const BasketItem = ({ id }) => {
    const dispatch = useDispatch();
    const product = useSelector((state) => selectBasketProductById(state, id));

    const handleIncClick = () => dispatch(productCountChanged(product, 1));
    const handleDecClick = () => dispatch(productCountChanged(product, -1));

    return (
        <BasketListItem
            product={product}
            handleDecClick={handleDecClick}
            handleIncClick={handleIncClick}
        />
    );
}

export default BasketItem;