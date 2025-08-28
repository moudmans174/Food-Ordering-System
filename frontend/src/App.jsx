// src/App.jsx
import React, { useState } from "react";
import Navbar from "./components/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import Placeorder from "./pages/placeorder/Placeorder";
import Footer from "./components/footer/Footer";
import LoginPopup from "./components/LoginPopUp/LoginPopup";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/place-order" element={<Placeorder />} />{" "}
          {/* Place Order Route */}
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default App;
