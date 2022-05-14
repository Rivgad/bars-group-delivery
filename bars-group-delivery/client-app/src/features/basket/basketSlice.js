import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen:false,
    entities:{},
    totalPrice:0
}

const updateCartItem = (product, item = {}, quantity) => {
    const {
        id = product.id,
        count = 0,
        title = product.title,
        price = product.price,
        total = 0,
    } = item;
    
    const newItem ={
        id,
        title,
        price,
        count: count + quantity,
        total: total + product.price * quantity
    }
    
    return newItem; 
}

const basketSlice = createSlice(
    {
        name: 'basket',
        initialState,
        reducers: {
            productCountChanged: {
                reducer(state, action) {
                    const { product, count } = action.payload;
                    const item = state.entities[product.id];
                    const newProduct = updateCartItem(product, item, count);
                    
                    if(newProduct.count <= 0){
                        delete state.entities[product.id];
                    }
                    else{
                        state.entities[product.id] = newProduct;
                    }
                    state.totalPrice = state.totalPrice + product.price * count; 
                },
                prepare(product, count) {
                    return {
                        payload: { product, count }
                    }
                }
            },
            isOpenChanged(state, action){
                state.isOpen = action.payload;
            }
        }
    }
)

export const { productCountChanged, isOpenChanged } = basketSlice.actions;

export default basketSlice.reducer;

const selectBasketEntities = state => state.basket.entities;

export const selectBasketIsEmpty = createSelector(
    selectBasketEntities,
    (entities) => Object.keys(entities).length === 0
) 

export const selectBasketProducts = createSelector(
    selectBasketEntities,
    (entities) => Object.values(entities)
)

export const selectBasketProductIds = createSelector(
    selectBasketProducts,
    (products) => products.map(item => item.id)
);

export const selectBasketProductById = (state, productId) => {
    return selectBasketEntities(state)[productId];
}