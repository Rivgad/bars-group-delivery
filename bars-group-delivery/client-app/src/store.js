import {configureStore } from '@reduxjs/toolkit'

import basketReducer from './features/basket/basketSlice'
import productsReducer from './features/products/productsSlice';
import authReducer from './features/auth/authSlice';

const store = configureStore({
    reducer:{
        basket: basketReducer,
        products: productsReducer,
        auth: authReducer
    }
})

export default store;