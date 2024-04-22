import { Route, Routes, Navigate } from "react-router";
import { ToastContainer } from "react-toastify";

import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Products from "./components/Products";
import Login from "./components/Login";
import Cart from "./components/Cart";
import User from "./components/User";
import UserEdit from "./components/UserEdit"
import Orders from "./components/Order";
import "./App.css"
import "react-toastify/dist/ReactToastify.css"


function App() {
    return (
        <>
            <ToastContainer />
            <Navbar />
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Signup" element={<Signup />} />
                <Route path="/Orders" element={<Orders />} />
                <Route path="/Cart" element={<Cart />} />
                <Route path="/User" element={<User />} />
                <Route path="/Edit-User" element={<UserEdit />} />
                <Route path="*" element={<Navigate to="/Login" />} />
            </Routes>
        </>
    );
}

export default App;