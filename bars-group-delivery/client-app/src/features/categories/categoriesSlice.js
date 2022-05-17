import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RequestStatus } from "../../helpers";



export const fetchCategories = createAsyncThunk(
    "category/fetchCategories",
    async (thunkAPI) => {
        try {
            const response = await axios.get('/api/categories');

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue();
        }
    }
)

const initialState = {
    status: RequestStatus.Idle,
    entities: {},
}

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: initialState,
    extraReducers: builder => {
        builder
            .addCase(fetchCategories.pending, (state, action) => {
                state.status = RequestStatus.Loading;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                const newEntities = {};
                action.payload.forEach((category) => {
                    newEntities[category.id] = category;
                });
                state.entities = newEntities;
                state.status = RequestStatus.Succeeded;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = RequestStatus.Failed;
            })
    }
});

const selectCategoryEntities = state => state.categories.entities;

export const selectCategories = createSelector(
    selectCategoryEntities,
    (entities) => Object.values(entities ?? {})
)

export const selectCategoryById = (state, categoryId) => {
    return selectCategoryEntities(state)[categoryId];
}

export const selectCategoryIds = createSelector(
    selectCategories,
    (category) => category.map(item => item.id)
)

export default categoriesSlice.reducer;