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
import { TokenContext } from "./utills/context/countContext";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
function App() {
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  return (
    <>
      <TokenContext.Provider value={{ token, setToken }}>
        <Elements stripe={stripePromise}>
          <BrowserRouter>
            <Toaster />
            <Routes>
              <Route path="/*" element={<HomeMain />}></Route>
              <Route path="/admin/*" element={<AdminHome />}></Route>
              <Route path="/login" element={<LoginForm />}></Route>
              <Route path="/signnup" element={<HomeMain />}></Route>
            </Routes>
          </BrowserRouter>
        </Elements>
      </TokenContext.Provider>
    </>
  );
}

export default App;
