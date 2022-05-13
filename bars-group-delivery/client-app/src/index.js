import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './components/app';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './components/main-page';
import CheckoutPage from './components/pages/checkout-page/checkout-page';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} >
            <Route index element={<MainPage />} />
            <Route path='checkout' element={<CheckoutPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  </React.StrictMode>
);