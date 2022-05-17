import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RequestStatus } from "../../helpers";


export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async (id, thunkAPI) => {
        try 
        {
            const { data } = await axios.get(`/api/Products?categoryId=${id}`);
            if(data.length === 0){
                throw new Error();
            }
            return data;
        }
        catch (error) 
        {
            return thunkAPI.rejectWithValue();
        }
    }
)

const initialState = {
    status: RequestStatus.Idle,
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
            state.status = RequestStatus.Succeeded;
        },
        [fetchProducts.rejected]: (state, action) => {
            state.status = RequestStatus.Failed;
            state.entities = {};
        },
        [fetchProducts.pending]: (state, action) => {
            state.status = RequestStatus.Loading;
            state.entities = {};
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