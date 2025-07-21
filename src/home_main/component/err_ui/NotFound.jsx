import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 p-8"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h1 className="text-9xl font-extrabold text-white drop-shadow-lg mb-6">
        404
      </h1>
      <p className="text-2xl md:text-3xl font-semibold text-white mb-4">
        Oops! Page Not Found
      </p>
      <p className="text-white mb-8 max-w-md text-center">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-white text-indigo-600 font-bold rounded-full shadow-lg hover:bg-indigo-50 transition"
      >
        Go Back Home
      </Link>
    </motion.div>
  );
}
