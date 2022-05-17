import { Table } from "react-bootstrap"
import { useSelector } from "react-redux";
import { selectOrderIds } from "./ordersSlice";
import OrdersTableRow from "./OrdersTableRow";

const OrdersTable = () => {
    const orderIds = useSelector(selectOrderIds);

    const renderedOrderRows = orderIds?.map((id) => {
        return (<OrdersTableRow id={id} key={id} />);
    });

    return (
        <Table>
            <thead>
                <tr>
                    <th>Номер</th>
                    <th>Дата</th>
                    <th>Сумма</th>
                    <th>Статус</th>
                </tr>
            </thead>
            <tbody>
                {renderedOrderRows}
            </tbody>
        </Table>
    )
}

export default OrdersTable;