import React, { useState } from "react";
import { Link } from "react-router-dom"; // 🟢 ✅ use `react-router-dom` for Link!
import {
  FaChevronCircleLeft,
  FaChevronCircleRight,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";
import { ImWhatsapp } from "react-icons/im";
import { motion } from "framer-motion";

export default function Header() {
  const [index, setIndex] = useState(0);
  const myimages = ["headerimage1.avif", "headerimage2.jpg"];

  return (
    <div
      className="bg-cover bg-center h-screen flex flex-col items-center justify-center relative"
      style={{ backgroundImage: `url(/${myimages[index]})` }}
    >
      <div className="bg-black/40 w-full h-full absolute inset-0 z-0"></div>

      {/* Social Links */}
      <div className="fixed right-0 top-28 flex flex-col gap-y-8 text-3xl sm:pr-8 z-20">
        <motion.div
          whileHover={{ scale: 1.2 }}
          initial={{ x: 200 }}
          animate={{ x: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <FaFacebookF className="text-[#0862fd]" />
          </a>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.2 }}
          initial={{ x: 200 }}
          animate={{ x: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <a href="https://wa.me/123456789" target="_blank" rel="noreferrer">
            <ImWhatsapp className="text-[#28aa32]" />
          </a>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.2 }}
          initial={{ x: 200 }}
          animate={{ x: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
        >
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <FaInstagram className="text-[#E1306C]" />
          </a>
        </motion.div>
      </div>

      {/* Slide Arrows */}
      <div className="flex items-center justify-between w-full z-10">
        <FaChevronCircleLeft
          onClick={() =>
            setIndex((prev) => (prev > 0 ? prev - 1 : myimages.length - 1))
          }
          className="text-white text-5xl cursor-pointer hidden md:block ml-6"
        />

        {/* Title & CTA */}
        <motion.div
          className="text-center z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
        >
          <h1 className="text-white text-4xl md:text-6xl font-extrabold mb-4">
            Welcome to <span className="text-purple-300">HappyPaws Care</span>
          </h1>
          <p className="text-white text-xl md:text-2xl mb-6">
            Your Pet’s Second Home
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/shop"
              className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-green-700 transition"
            >
              🛒 Shop Now
            </Link>
            <Link
              to="/book"
              className="bg-purple-600 text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-purple-700 transition"
            >
              📅 Book Now
            </Link>
          </div>
        </motion.div>

        <FaChevronCircleRight
          onClick={() =>
            setIndex((prev) => (prev < myimages.length - 1 ? prev + 1 : 0))
          }
          className="text-white text-5xl cursor-pointer hidden md:block mr-6"
        />
      </div>

      {/* Bottom Dots */}
      <div className="absolute bottom-6 flex gap-2 z-10">
        {myimages.map((_, idx) => (
          <div
            key={idx}
            onClick={() => setIndex(idx)}
            className={`w-4 h-4 rounded-full cursor-pointer ${
              idx === index ? "bg-white" : "bg-white/50"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
