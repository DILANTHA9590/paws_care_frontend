import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import DeskTopNavbar from "./component/DeskTopNavbar";
import AboutUs from "./component/AboutUs";
import BookDoctor from "./pages/BookDoctor";
import DoctorOverview from "./pages/DoctorOverview";
import DoctorBookingForm from "./component/DoctorBookingForm";
import ProductsPage from "./pages/ProductsPage";
import ProductOverView from "./pages/ProductOverView";

import CartDetails from "./pages/CartDetails";
import { CountContext } from "../utills/context/countContext";
import ShippingPage from "./pages/ShippingPage";

export default function HomeMain() {
  const [token, setToken] = useState(true);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [cartCount, setCartCount] = useState(1);
  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);

    console.log(token);
  }, []);
  return (
    <>
      <CountContext.Provider value={{ cartCount, setCartCount }}>
        <div className="min-h-screen">
          <DeskTopNavbar />

          <div className="h-[calc(100vh-12vh)]">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="contact" element={<h1>ContactUs</h1>} />
              <Route path="about" element={<AboutUs />} />
              <Route path="pet foods" element={<h1>pet foods</h1>} />
              <Route path="bookdoctor" element={<BookDoctor />} />
              <Route path="book-doctor" element={<DoctorBookingForm />} />
              <Route path="doctor/:id" element={<DoctorOverview />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="product/:id" element={<ProductOverView />} />
              <Route path="cart" element={<CartDetails />} />
              <Route path="shipping" element={<ShippingPage />} />
            </Routes>
          </div>
        </div>
      </CountContext.Provider>
    </>
  );
}
