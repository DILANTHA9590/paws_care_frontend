import React, { useState } from "react";
import { Link } from "react-router";
import { FaChevronCircleLeft } from "react-icons/fa";
import { FaChevronCircleRight } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import { motion, AnimatePresence, delay } from "framer-motion";
import { ImWhatsapp } from "react-icons/im";
import { FaInstagram } from "react-icons/fa";
import Header from "../component/Header";
import { PiDogThin } from "react-icons/pi";
import OurServices from "../component/OurServices";
import { div } from "framer-motion/client";
export default function HomePage() {
  const [index, setIndex] = useState(0);

  function myone(index) {
    setIndex(index);
  }

  const myimages = ["headerimage1.avif", "headerimage2.jpg"];

  return (
    <>
      <Header />

      {/* Main container for the Services section */}
      <OurServices />
      <div
        className="w-full h-[70vh] bg-cover bg-center mt-6 ba"
        style={{ backgroundImage: "url('/mysection1.jpg')" }}
      ></div>
    </>
  );
}
