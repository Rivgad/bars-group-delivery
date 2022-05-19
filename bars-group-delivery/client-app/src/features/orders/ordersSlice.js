import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { RequestStatus } from "../../helpers";
import authHeader from "../../services/authHeader";
import { logout } from "../auth/authSlice";

const initialState = {
    currentOrder: {},
    entities: {},
    status: RequestStatus.Idle,
    fetchStatus: RequestStatus.Idle
}

export const createOrderRequest = createAsyncThunk(
    "orders/createOrder",
    async (orderData) => {
        let response = await axios.post(
            '/api/Orders',
            orderData,
            {
                headers: authHeader()
            }
        );
        return response.data;
    }
)
export const fetchOrders = createAsyncThunk(
    "orders/fetchOrders",
    async () => {
        let response = await axios.get(
            '/api/Orders/UserOrders',
            {
                headers: authHeader()
            }
        );

        return response.data;
    }
)

const ordersSlice = createSlice(
    {
        name: "orders",
        initialState,
        reducers: {
            onCurrentOrderClosed(state, action) {
                state.currentOrder = {}
                state.status = RequestStatus.Idle;
            }
        },
        extraReducers: builder => {
            builder
                .addCase(logout.fulfilled, (state, action) => {
                    state.currentOrder = {};
                    state.entities = {};
                })
                .addCase(createOrderRequest.pending, (state, action) => {
                    state.status = RequestStatus.Loading;
                })
                .addCase(createOrderRequest.fulfilled, (state, action) => {
                    state.currentOrder = action.payload;
                    state.status = RequestStatus.Succeeded;
                })
                .addCase(createOrderRequest.rejected, (state, action) => {
                    state.status = RequestStatus.Failed;
                })
                .addCase(fetchOrders.pending, (state, action) => {
                    state.fetchStatus = RequestStatus.Loading;
                })
                .addCase(fetchOrders.fulfilled, (state, action) => {

                    const newEntities = {};
                    action.payload.forEach((order) => {
                        newEntities[order.id] = order;
                    });
                    state.entities = newEntities;
                    state.fetchStatus = RequestStatus.Succeeded;
                })
                .addCase(fetchOrders.rejected, (state, action) => {
                    state.fetchStatus = RequestStatus.Failed;

                })
        }
    }
)

export const fetchStatus = state => state.fetchStatus;

export const selectCurrentOrderIsEmpty = state => Object.keys(state.orders.currentOrder).length === 0;

const selectOrderEntities = state => state.orders.entities ?? {};

export const selectOrders = createSelector(
    selectOrderEntities,
    (entities) => Object.values(entities ?? {})
)

export const selectOrderById = (state, orderId) => {
    return selectOrderEntities(state)[orderId];
}

export const selectOrderIds = createSelector(
    selectOrders,
    (orders) => orders?.map(item => item.id)
)

export default ordersSlice.reducer;

export const { onCurrentOrderClosed } = ordersSlice.actions;