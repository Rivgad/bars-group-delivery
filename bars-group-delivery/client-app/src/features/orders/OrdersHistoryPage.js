import { useEffect } from "react";
import { useDispatch } from "react-redux";
import CommonPage from "../common/CommonPage";
import { fetchOrders } from "./ordersSlice";
import OrdersTable from "./OrdersTable";

const OrdersHistoryPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    return (
        <>
            <h1 className='mb-3'>История заказов</h1>
            <OrdersTable />
        </>
    );
}

export default CommonPage(OrdersHistoryPage);