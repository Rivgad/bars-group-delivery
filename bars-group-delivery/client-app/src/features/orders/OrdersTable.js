import { Alert, Table } from "react-bootstrap"
import { useSelector } from "react-redux";
import { RequestStatus } from "../../helpers";
import ErrorIndicator from "../common/ErrorIndicator";
import PageLoadingIndicator from "../common/PageLoadingIndicator";
import { selectOrderIds } from "./ordersSlice";
import OrdersTableRow from "./OrdersTableRow";

const OrdersTable = () => {
    const orderIds = useSelector(selectOrderIds);
    const status = useSelector(state => state.orders.fetchStatus);

    if (status === RequestStatus.Loading) {
        return <PageLoadingIndicator />
    }
    if(status === RequestStatus.Failed){
        return <ErrorIndicator/>
    }
    if(orderIds.length === 0)
    return(
        <Alert>
            <Alert.Heading>У вас ещё нет ни одного заказа!</Alert.Heading>
        </Alert>
    )

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