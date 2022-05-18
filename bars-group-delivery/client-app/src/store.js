import {configureStore } from '@reduxjs/toolkit'

import basketReducer from './features/basket/basketSlice'
import productsReducer from './features/products/productsSlice';
import authReducer from './features/auth/authSlice';
import categoriesReducer from './features/categories/categoriesSlice';
import ordersReducer from './features/orders/ordersSlice';
import profileReducer from './features/profile/profileSlice';

const store = configureStore({
    reducer:{
        basket: basketReducer,
        products: productsReducer,
        auth: authReducer,
        categories:categoriesReducer,
        orders:ordersReducer,
        profile:profileReducer
    }
})

export default store;