import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import { IoIosArrowDown } from "react-icons/io";
import { CiLogin } from "react-icons/ci";
import { LiaSignInAltSolid } from "react-icons/lia";
import { h1 } from "framer-motion/client";
import { motion } from "framer-motion";
import DeskTopNavbar from "./component/DeskTopNavbar";
import AboutUs from "./component/AboutUs";
export default function HomeMain() {
  const [token, setToken] = useState(true);
  const [toggleMenu, setToggleMenu] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);

    console.log(token);
  }, []);
  return (
    <>
      <div className="min-h-screen">
        <DeskTopNavbar />

        <div className="h-[calc(100vh-12vh)]">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="contact" element={<h1>ContactUs</h1>} />
            <Route path="about" element={<AboutUs />} />
            <Route path="pet foods" element={<h1>pet foods</h1>} />
          </Routes>
        </div>
      </div>
    </>
  );
}
