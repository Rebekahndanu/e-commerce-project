import { Route, Routes } from "react-router";
import Home from "./Home";
import Navbar from "./Navbar";
import LoginForm from "./Login";
import RegisterForm from "./Register";

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/products" element={<Home />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </>
    );
}

export default App;