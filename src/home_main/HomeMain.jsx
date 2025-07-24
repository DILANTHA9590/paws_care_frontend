import React, { Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import DeskTopNavbar from "./component/DeskTopNavbar";
import { CountContext } from "../utills/context/countContext";
import NotFound from "./component/err_ui/NotFound";
import SuspenseUi from "./component/err_ui/SuspenseUi";

const HomePage = React.lazy(() => import("./pages/HomePage"));
const ContactUs = React.lazy(() => import("./pages/ContactUs"));
const AboutUs = React.lazy(() => import("./component/AboutUs"));
const BookDoctor = React.lazy(() => import("./pages/BookDoctor"));
const DoctorBookingForm = React.lazy(() =>
  import("./component/DoctorBookingForm")
);
const DoctorOverview = React.lazy(() => import("./pages/DoctorOverview"));
const ProductsPage = React.lazy(() => import("./pages/ProductsPage"));
const ProductOverView = React.lazy(() => import("./pages/ProductOverView"));
const CartDetails = React.lazy(() => import("./pages/CartDetails"));
const ShippingPage = React.lazy(() => import("./pages/ShippingPage"));
const CheckOut = React.lazy(() => import("./component/CheckOut"));
const UserProfile = React.lazy(() => import("./pages/UserProfile"));
const MyOrder = React.lazy(() => import("./pages/MyOrder"));
const MyPets = React.lazy(() => import("./pages/MyPets"));
const MyBookings = React.lazy(() => import("./pages/MyBookings"));
const PetMedicalRecord = React.lazy(() => import("./pages/PetMedicalRecord"));

export default function HomeMain() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [cartCount, setCartCount] = useState(1);
  const [token, setToken] = useState();

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
            <Suspense fallback={<SuspenseUi />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="contact" element={<ContactUs />} />
                <Route path="about" element={<AboutUs />} />
                <Route path="bookdoctor" element={<BookDoctor />} />
                <Route path="book-doctor" element={<DoctorBookingForm />} />
                <Route path="doctors/:id" element={<DoctorOverview />} />
                <Route path="products" element={<ProductsPage />} />
                <Route path="product/:id" element={<ProductOverView />} />
                <Route path="cart" element={<CartDetails />} />
                <Route path="shipping" element={<ShippingPage />} />
                <Route path="payment" element={<CheckOut />} />
                <Route path="userprofile" element={<UserProfile />} />
                <Route path="myorders" element={<MyOrder />} />
                <Route path="mypets" element={<MyPets />} />
                <Route path="mybookings" element={<MyBookings />} />
                <Route path="petmedicalrecord" element={<PetMedicalRecord />} />
                {/* <Route path="pe" element={<SuspenseUi />} /> */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </div>
        </div>
      </CountContext.Provider>
    </>
  );
}
