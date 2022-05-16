import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import store from './store';

import App from './App';
import CheckoutPage from './features/checkout/CheckoutPage';
import MenuPage from './features/products/MenuPage';
import ProfilePage from './features/profile/ProfilePage';
import LoginPage from './features/login/LoginPage'
import CategoryPage from './features/categories/CategoryPage';
import { fetchCategories } from './features/categories/categoriesSlice';

const root = ReactDOM.createRoot(document.getElementById('root'));

store.dispatch(fetchCategories())

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} >
            <Route index element={<CategoryPage />} />
            <Route path='categories/:id' element={<MenuPage />} />

            <Route path='checkout' element={<CheckoutPage />} />
            <Route path='profile' element={<ProfilePage />} />
            <Route path='login' element={<LoginPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);