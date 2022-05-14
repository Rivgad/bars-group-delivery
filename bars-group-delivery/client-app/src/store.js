import {configureStore } from '@reduxjs/toolkit'

import basketReducer from './features/basket/basketSlice'
import productsReducer from './features/products/productsSlice';

const store = configureStore({
    reducer:{
        basket: basketReducer,
        products: productsReducer
    }
})

export default store;