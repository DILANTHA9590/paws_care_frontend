import React from "react";
import { motion } from "framer-motion";

export default function SuspenseUi() {
  return (
    <div className="h-screen flex justify-center items-center bg-white">
      <div className="flex flex-col items-center">
        <img
          src="happypawslogo.png"
          alt="Happy Paws"
          className="w-32 h-32 mb-8"
        />

        <div className="flex gap-x-4">
          <motion.div
            className="h-8 w-8 rounded-full bg-gradient-to-br from-pink-500 to-yellow-400"
            animate={{ scale: [1, 1.4, 1] }}
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: "easeInOut",
              delay: 0,
            }}
          />

          <motion.div
            className="h-8 w-8 rounded-full bg-gradient-to-br from-pink-500 to-yellow-400"
            animate={{ scale: [1, 1.4, 1] }}
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: "easeInOut",
              delay: 0.2,
            }}
          />

          <motion.div
            className="h-8 w-8 rounded-full bg-gradient-to-br from-pink-500 to-yellow-400"
            animate={{ scale: [1, 1.4, 1] }}
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: "easeInOut",
              delay: 0.4,
            }}
          />
        </div>
      </div>
    </div>
  );
}
