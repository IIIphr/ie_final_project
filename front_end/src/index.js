import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import store from './store';
import { Provider } from 'react-redux';
import Login from './Login';
import Products_loader from './Products_loader';
import Products from './Products';
import Product from './Product';
import User from './User';
import Shops from './Shops';
import Shop from './Shop';
import Add_shop from './Add_shop';
import Add_new_prod from './Add_new_prod';
import Add_existing_prod from './Add_existing_prod';
import { CookiesProvider } from 'react-cookie';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CookiesProvider>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products_loader" element={<Products_loader />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product" element={<Product />} />
          <Route path="/user" element={<User />} />
          <Route path="/shops" element={<Shops />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/add_shop" element={<Add_shop />} />
          <Route path="/add_new_prod" element={<Add_new_prod />} />
          <Route path="/add_existing_prod" element={<Add_existing_prod />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </CookiesProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
