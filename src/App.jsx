import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import HomeMain from "./home_main/HomeMain";
import { BrowserRouter, Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";
import AdminHome from "./admin_main/AdminHome";
import LoginForm from "./LoginForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { ImageContext, TokenContext } from "./utills/context/countContext";
import { image } from "framer-motion/client";
import DoctorMain from "./Doctor/DoctorMain";
import CreateAccountForm from "./CreateAccountForm";
import VerifyEmailForm from "./VerifyEmailForm";
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
              <Routes>
                <Route path="/*" element={<HomeMain />}></Route>
                <Route path="/admin/*" element={<AdminHome />}></Route>
                <Route path="/doctor/*" element={<DoctorMain />}></Route>
                <Route path="/login" element={<LoginForm />}></Route>
                <Route
                  path="/createaccount"
                  element={<CreateAccountForm />}
                ></Route>

                <Route
                  path="/verifyemail"
                  element={<VerifyEmailForm />}
                ></Route>
              </Routes>
            </BrowserRouter>
          </Elements>
        </TokenContext.Provider>
      </ImageContext.Provider>
    </>
  );
}

export default App;
