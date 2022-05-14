import { createSelector, createSlice } from "@reduxjs/toolkit";

const Status = {
    Idle: 'idle',
    Loading: 'loading',
    Succeeded: 'succeeded',
    Failed: 'failed',
}

const createProduct = (id) => {
    return (
        {
            id: id,
            price: 400,
            title: `Продукт ${id}`,
            text: `Описание продукта ${id}`,
            ingredients: [

            ],
            description: [
                `${10 * id} г`,
                `${100 * id} ккал`,
                `${100 * id} белки`,
                `${100 * id} жиры`,
                `${100 * id} углеводы`,
            ]
        }
    );
}
const initialState = {
    status: Status.Idle,
    entities: { },
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        productsLoading(state, action) {
            state.status = Status.Loading;
        },
        productsLoaded(state, action) {
            const newEntities = {};
            action.payload.forEach((product) => {
                newEntities[product.id] = product;
            });
            state.entities = newEntities;
            state.status = Status.Idle;
        }
    }
})

export const { productsLoading, productsLoaded } = productsSlice.actions;
export default productsSlice.reducer;

export const fetchProducts = () => async (dispatch) => {
    dispatch(productsLoading());

    await setTimeout(() => {
        const products = Array.from({ length:10 }).map((_, idx)=> createProduct(idx));
        let response = { products };
        dispatch(productsLoaded(response.products));
    }, 1000);
}

const selectProductEntities = state => state.products.entities;

export const selectProducts = createSelector(
    selectProductEntities,
    (entities) => Object.values(entities)
)

export const selectProductById = (state, productId) => {
    return selectProductEntities(state)[productId];
}

export const selectProductIds = createSelector(
    selectProducts,
    (products) => products.map(item => item.id)
)