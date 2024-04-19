import { Route, Routes } from "react-router";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Products from "./components/Products";
import Login from "./components/Login";
import Cart from "./components/Cart";


function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Signup" element={<Signup />} />
                <Route path="/Cart" element={<Cart />} />
                
            </Routes>
        </>
    );
}

export default App;