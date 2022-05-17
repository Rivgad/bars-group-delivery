import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { fetchProducts } from './productsSlice';
import CommonPage from "../common/CommonPage";
import ProductsGrid from "./ProductGrid";
import { Breadcrumb, BreadcrumbItem, Row } from "react-bootstrap";
import { selectCategoryById } from "../categories/categoriesSlice";
import { LinkContainer } from "react-router-bootstrap";

const CurrentCategoryPage = () => {
    let { id: categoryId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProducts(categoryId));
    }, [dispatch, categoryId]);

    const category = useSelector(state => selectCategoryById(state, categoryId));
    return (
        category &&
        <>
            <Row className='mb-3'>
                <Breadcrumb >
                    <LinkContainer to='/categories'>
                        <BreadcrumbItem >
                            Категории
                        </BreadcrumbItem>
                    </LinkContainer>
                    <BreadcrumbItem active>
                        {category.title}
                    </BreadcrumbItem>
                </Breadcrumb>
            </Row>
            <Row>
                <ProductsGrid />
            </Row>
        </>
    );
}

export default CommonPage(CurrentCategoryPage);