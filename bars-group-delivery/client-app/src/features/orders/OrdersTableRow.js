import { useSelector } from "react-redux";
import { OrderStatus } from "../../helpers";
import { selectOrderById } from "./ordersSlice";

const OrdersTableRow = ({ id }) => {
    const order = useSelector((state) => selectOrderById(state, id))
    var date = new Date(order?.createTime).toLocaleString();

    return (
        <>
            <tr>
                <td>{order.id}</td>
                <td>{date}</td>
                <td>{order.price} ₽</td>
                <td>{OrderStatus[order.status].text}</td>
            </tr>
        </>
    )
}

export default OrdersTableRow;