import { Outlet, Link } from "react-router-dom";
import Navbar from "./Components/navbar.jsx";
import Footer from "./Components/footer";

export default function Layout() {
    return (
        <>
        <Navbar />
        <Outlet />
        <Footer/>
        </>
    );}