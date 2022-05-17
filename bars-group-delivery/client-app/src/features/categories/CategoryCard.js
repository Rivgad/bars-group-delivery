import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCategoryById } from "./categoriesSlice";

const CategoryCard = ({ id }) => {
    const category = useSelector((state) => selectCategoryById(state, id));
    const navigate = useNavigate();

    return (
        <Card
            role='button'
            onClick={() => navigate(`/categories/${id}`)}
            className=' bg-dark text-white d-flex overflow-hidden'
            style={{ height: 300 }}
        >
            <Card.Img src={`data:image/png;base64,${category.photo}`} className=' opacity-50 h-100 ' style={{ 'objectFit': 'cover' }} />
            <Card.ImgOverlay>
                <Card.Title>{category.title}</Card.Title>

            </Card.ImgOverlay>
        </Card>
    )
}
export default CategoryCard;