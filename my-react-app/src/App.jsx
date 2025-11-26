import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from './Home/home';
import React from 'react';
import Layout from './layout';
import { Menu } from './Menu/menu';
import Cart from './cart/Cart.jsx';
import Login from './auth/login/login.jsx';
import Register from './auth/register/register.jsx';
import AdminLogin from './auth/login/adminlogin/adminlogin.jsx';
import ProductDetails from './Menu/productDetails.jsx';
import { CartProvider } from "./context/CartContext";
import Profile from './profilepage/profile.jsx';

function App() {

  return (
    <>
    <CartProvider>
      <Routes>

        {/* Layout ثابت طول الموقع */}
        <Route path="/" element={<Layout />}>

          {/* دي اللي بتخلي أول صفحة تظهر هي Home */}
          <Route index element={<Home />} />

          {/* صفحات تانية لو عايزة */}
          {/* <Route path="menu" element={<Menu />} /> */}
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetails />} /> 
<Route path="/profile" element={<Profile />} />

        </Route>

<Route path="/auth/login" element={<Login />} />
<Route path="/auth/register" element={<Register />} />
<Route path="/auth/login/adminlogin" element={<AdminLogin />} />

      </Routes>
      </CartProvider>
    </>
  );
}

export default App;
