import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { fetchProducts } from './productsSlice';
import CommonPage from "../common/CommonPage";
import ProductsGrid from "./ProductGrid";
import { Breadcrumb, BreadcrumbItem, Row } from "react-bootstrap";
import { selectCategoryById } from "../categories/categoriesSlice";
import { LinkContainer } from "react-router-bootstrap";
import { RequestStatus } from "../../helpers";
import ErrorIndicator from "../common/ErrorIndicator";
import PageLoadingIndicator from "../common/PageLoadingIndicator";

const CurrentCategoryPage = () => {
    let { id: categoryId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProducts(categoryId));
    }, [dispatch, categoryId]);

    const category = useSelector(state => selectCategoryById(state, categoryId));
    const requestStatus = useSelector(state => state.products.status);
    const isLoading = requestStatus === RequestStatus.Loading;
    const isError = requestStatus === RequestStatus.Failed;

    let renderedContent = '';
    renderedContent =
        (
            <Row>
                <ProductsGrid />
            </Row>
        );
    if(!category){
        renderedContent=<ErrorIndicator title={"Данной категории не существует"} message={"Перейдите в категории и выберите категорию снова."}/>
    }
    else if (isLoading) {
        renderedContent = <PageLoadingIndicator/>
    }
    else if (isError) {
        renderedContent = <ErrorIndicator message={"В данной категории нет товаров или произошла ошибка. Попробуйте снова."}/>
    }
    return (
        <>
            <Row className='mb-3'>
                <Breadcrumb >
                    <LinkContainer to='/categories'>
                        <BreadcrumbItem >
                            Категории
                        </BreadcrumbItem>
                    </LinkContainer>
                    <BreadcrumbItem active>
                        {category?.title}
                    </BreadcrumbItem>
                </Breadcrumb>
            </Row>
            {renderedContent}
        </>
    );
}

export default CommonPage(CurrentCategoryPage);