import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import authHeader from "../../services/authHeader";
import { RequestStatus } from "../../helpers";

const initialState = {
    currentOrder: {},
    entities: {},
    status: RequestStatus.Idle
}

export const createOrderRequest = createAsyncThunk(
    "basket/createOrderStatus",
    async (orderData, thunkAPI)=>{
        orderData = {...orderData, status: 0 }
        return orderData; 
        // let response = await axios.post(
        //     '/api/Checkout/CreateOrder',
        //     orderData,
        //     {
        //         headers: authHeader()
        //     }
        // );
        // return response.data;
    }
)


const ordersSlice = createSlice(
    {
        name: "orders",
        initialState,
        reducers:{
            onCurrentOrderClosed(state, action){
                state.currentOrder = {}
                state.status = RequestStatus.Idle;
            }
        },
        extraReducers:builder=>{
            builder
                .addCase(createOrderRequest.pending,(state,action)=>{
                    state.status = RequestStatus.Loading;
                })
                .addCase(createOrderRequest.fulfilled, (state,action)=>{
                    state.currentOrder = action.payload;
                    state.status = RequestStatus.Succeeded;
                })
                .addCase(createOrderRequest.rejected, (state,action)=>{
                    state.status = RequestStatus.Failed;
                })
        }
    }
)

export default ordersSlice.reducer;

export const { onCurrentOrderClosed } = ordersSlice.actions;