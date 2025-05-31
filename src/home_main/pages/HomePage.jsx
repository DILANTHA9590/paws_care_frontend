import React, { useState } from "react";
import { Link } from "react-router";
import { FaChevronCircleLeft } from "react-icons/fa";
import { FaChevronCircleRight } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import { motion, AnimatePresence, delay } from "framer-motion";
import { ImWhatsapp } from "react-icons/im";
import { FaInstagram } from "react-icons/fa";
import Header from "../component/Header";
export default function HomePage() {
  const [index, setIndex] = useState(0);
  const myimages = ["headerimage1.avif", "headerimage2.jpg"];

  return (
    <>
      <Header />
    </>
  );
}
