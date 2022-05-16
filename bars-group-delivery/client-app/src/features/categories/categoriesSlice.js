import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



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

const Status = {
    Idle: 'idle',
    Loading: 'loading',
    Succeeded: 'succeeded',
    Failed: 'failed',
}

const initialState = {
    status: Status.Idle,
    entities: {},
}

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: initialState,
    extraReducers: {
        [fetchCategories.fulfilled]: (state, action) => {
            const newEntities = {};
            action.payload.forEach((category) => {
                newEntities[category.id] = category;
            });
            state.entities = newEntities;
            state.status = Status.Succeeded;
        },
        [fetchCategories.rejected]: (state, action) => {
            state.status = Status.Failed;
            state.entities = null;
        },
        [fetchCategories.pending]: (state, action) => {
            state.status = Status.Loading;
            state.entities = null;
        }
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