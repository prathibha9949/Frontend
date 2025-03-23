import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Signup from "./components/SignUp";
import Login from "./components/Login";
import About from "./components/About";
import Home from "./components/Home";
import AddProduct from "./components/AddProduct";
import ProductsPage from "./components/ProductsPage";
import Cart from "./components/Cart"; // Ensure Cart is correctly imported
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { CartProvider } from "./context/CartContext"; // Ensure the path is correct
import UpdateProduct from "./components/UpdateProduct";
function App() {
    return (
        <CartProvider>
            <div className="App">
                <BrowserRouter>
                    <Navbar />
                    <div className="container mt-5">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/add-product" element={<AddProduct />} />
                            <Route path="/products" element={<ProductsPage />} />
                            <Route path="/cart" element={<Cart />} /> 
                            <Route path="/update-product/:id" element={<UpdateProduct />} />
                        </Routes>
                    </div>
                </BrowserRouter>
            </div>
        </CartProvider>
    );
}

export default App;
