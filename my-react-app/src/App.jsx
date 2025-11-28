import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Home/home";
import React from "react";
import Layout from "./layout";
import { Menu } from "./Menu/menu";
import Cart from "./cart/Cart.jsx";
import Login from "./auth/login/login.jsx";
import Register from "./auth/register/register.jsx";
import AdminLogin from "./auth/login/adminlogin/adminlogin.jsx";
import ProductDetails from "./Menu/productDetails.jsx";
import { CartProvider } from "./context/CartContext";
import AboutUs from "./AboutUs/AboutUs.jsx";
import Profile from "./profilepage/profile.jsx";
import Restaurants from "./restaurants/restaurants.jsx";
import LayoutAdmin from "./AdminPanel/Layoutadmin.jsx";
import Dashboard from "./AdminPanel/componentadmin/Dashboard.jsx";
import OrderReport from "./AdminPanel/componentadmin/OrderReport.jsx";
import SalesReport from "./AdminPanel/componentadmin/SalesReport.jsx";


function App() {
  return (
    <>
      <CartProvider>
        <Routes>
          {/* Layout ثابت طول الموقع */}
          <Route path="/" element={<Layout />}>
            {/* دي اللي بتخلي أول صفحة تظهر هي Home */}
            <Route index element={<Home />} />

            {/* دي اللي بتخلي أول صفحة تظهر هي Home */}
            <Route index element={<Home />} />

            {/* صفحات تانية لو عايزة */}
            {/* <Route path="menu" element={<Menu />} /> */}
            <Route path="/restaurants" element={<Restaurants/>} />
            <Route path="/menu/:restaurantId" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/profile" element={<Profile />} />

          </Route>

          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />


          <Route path="/auth/login/adminlogin" element={<AdminLogin />} />

   <Route path="/admin" element={<LayoutAdmin />}>
  <Route index element={<Dashboard />} />
  <Route path="orders" element={<OrderReport />} />
  <Route path="sales" element={<SalesReport />} />
</Route>

                                         

        </Routes>
      </CartProvider>
    </>
  );
}

export default App;
