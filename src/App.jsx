import { useState } from "react";
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
const stripePromise = loadStripe(
  "pk_test_51RSFLcP2O6eKPEmTYzM7SuHBXwwjcSDhD4S8E1kKiA2S6TSiuYZKJcPrctaGfcL4UX1IzqkiKwvr5ffaWzaqBXiN00R5Ne6Qug"
);
function App() {
  const [token, setToken] = useState();
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
