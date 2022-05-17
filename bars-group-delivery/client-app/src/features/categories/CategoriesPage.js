import { Row } from "react-bootstrap";
import CommonPage from "../common/CommonPage"
import CategoriesGrid from "./CategoriesGrid";

const CategoriesPage = () => {

    return (
        <>
            <Row className='mb-3'>
                <h1 >
                    Категории продуктов
                </h1>
            </Row>
            <Row>
                <CategoriesGrid />

            </Row>
        </>
    )
}

export default CommonPage(CategoriesPage);