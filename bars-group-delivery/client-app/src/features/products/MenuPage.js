import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom";
import ProductGrid from "./ProductGrid";
import { fetchProducts } from './productsSlice';
import CommonPage from "../common/CommonPage";

const MenuPage = () => {
    let { id: categoryId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProducts(categoryId));
    }, [dispatch, categoryId]);

    return (
        <>
            <ProductGrid />
        </>
    );
}

export default CommonPage(MenuPage);