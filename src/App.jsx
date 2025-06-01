import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import HomeMain from "./home_main/HomeMain";
import { BrowserRouter, Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";
import AdminHome from "./admin_main/AdminHome";
import LoginForm from "./LoginForm";

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/*" element={<HomeMain />}></Route>
          <Route path="/admin/*" element={<AdminHome />}></Route>
          <Route path="/login" element={<LoginForm />}></Route>
          <Route path="/signnup" element={<HomeMain />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
