import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom";
import { fetchProducts } from './productsSlice';
import CommonPage from "../common/CommonPage";
import ProductsGrid from "./ProductGrid";

const CurrentCategoryPage = () => {
    let { id: categoryId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProducts(categoryId));
    }, [dispatch, categoryId]);

    return (
        <>
            <ProductsGrid />
        </>
    );
}

export default CommonPage(CurrentCategoryPage);