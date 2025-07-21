import React, { useEffect, useState, Suspense } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { ImageContext, TokenContext } from "./utills/context/countContext";

// ✅ Lazy load main pages
const HomeMain = React.lazy(() => import("./home_main/HomeMain"));
const AdminHome = React.lazy(() => import("./admin_main/AdminHome"));
const DoctorMain = React.lazy(() => import("./Doctor/DoctorMain"));
const LoginForm = React.lazy(() => import("./LoginForm"));
const CreateAccountForm = React.lazy(() => import("./CreateAccountForm"));
const VerifyEmailForm = React.lazy(() => import("./VerifyEmailForm"));

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function App() {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [image, setImage] = useState();

  return (
    <>
      <ImageContext.Provider value={{ image, setImage }}>
        <TokenContext.Provider value={{ token, setToken }}>
          <Elements stripe={stripePromise}>
            <BrowserRouter>
              <Toaster />
              {/* ✅ Wrap all lazy loaded routes in Suspense */}
              <Suspense
                fallback={<div className="text-center p-10">Loading...</div>}
              >
                <Routes>
                  <Route path="/*" element={<HomeMain />} />
                  <Route path="/admin/*" element={<AdminHome />} />
                  <Route path="/doctor/*" element={<DoctorMain />} />
                  <Route path="/login" element={<LoginForm />} />
                  <Route
                    path="/createaccount"
                    element={<CreateAccountForm />}
                  />
                  <Route path="/verifyemail" element={<VerifyEmailForm />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </Elements>
        </TokenContext.Provider>
      </ImageContext.Provider>
    </>
  );
}

export default App;
