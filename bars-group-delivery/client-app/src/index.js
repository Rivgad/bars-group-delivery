import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <>
    <h1>
      сервис доставки еды
    </h1>
    <Button variant='primary'>Кнопка</Button>
    <button className='btn btn-primary' type='button'></button>
    </>
  </React.StrictMode>
);