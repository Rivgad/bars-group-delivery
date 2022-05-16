import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const Status = {
    Idle: 'idle',
    Loading: 'loading',
    Succeeded: 'succeeded',
    Failed: 'failed',
}

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async (id, thunkAPI) => {
        try 
        {
            const response = await axios.get(`/api/Products?categoryId=${id}`);
            return response.data;
        }
        catch (error) 
        {
            return thunkAPI.rejectWithValue();
        }
    }
)

const initialState = {
    status: Status.Idle,
    entities: { },
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    extraReducers:{
        [fetchProducts.fulfilled]: (state, action) => {
            const newEntities = {};
            action.payload.forEach((product) => {
                newEntities[product.id] = product;
            });
            state.entities = newEntities;
            state.status = Status.Succeeded;
        },
        [fetchProducts.rejected]: (state, action) => {
            state.status = Status.Failed;
            state.entities = null;
        },
        [fetchProducts.pending]: (state, action) => {
            state.status = Status.Loading;
            state.entities = null;
        }
    }
})

export const { productsLoading, productsLoaded } = productsSlice.actions;
export default productsSlice.reducer;

const selectProductEntities = state => state.products.entities;

export const selectProducts = createSelector(
    selectProductEntities,
    (entities) => Object.values(entities ?? {})
)

export const selectProductById = (state, productId) => {
    return selectProductEntities(state)[productId];
}

export const selectProductIds = createSelector(
    selectProducts,
    (products) => products.map(item => item.id)
)