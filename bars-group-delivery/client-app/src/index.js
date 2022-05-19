import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import store from './store';

import App from './App';
import CheckoutPage from './features/checkout/CheckoutPage';
import ProfilePage from './features/profile/ProfilePage';
import LoginPage from './features/login/LoginPage'
import { fetchCategories } from './features/categories/categoriesSlice';
import OrdersHistoryPage from './features/orders/OrdersHistoryPage';
import RequireAuth from './features/auth/RequireAuth';
import CategoriesPage from './features/categories/CategoriesPage';
import CurrentCategoryPage from './features/products/CurrentCategoryPage';
import NotFoundPage from './features/common/NotFoundPage';

store.dispatch(fetchCategories())

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} >
            <Route index element={<CategoriesPage />} />
            <Route path='categories' element={<CategoriesPage />} />
            <Route path='categories/:id' element={<CurrentCategoryPage />} />
            <Route
              path='orders'
              element={
                <RequireAuth>
                  <OrdersHistoryPage />
                </RequireAuth>
              }
            />
            <Route path='checkout' element={<CheckoutPage />} />
            <Route
              path='profile'
              element={
                <RequireAuth>
                  <ProfilePage />
                </RequireAuth>
              }
            />
            <Route path='login' element={<LoginPage />} />
            <Route path='*' element={<NotFoundPage/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);