import React, { useState } from "react";
import { useLocation } from "react-router";
import { motion } from "framer-motion";

export default function AdminDashBoard() {
  const location = useLocation();
  // console.log(location.state);

  const [firstName, setfname] = useState(location.state?.firstName || "k");
  const [lastName, setlname] = useState(location.state?.lastName || "kik");
  return (
    <>
      <div>
        <motion.h1
          className="text-4xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text"
          initial={{
            opacity: 0,
          }}
          animate={{ opacity: 4, y: 0 }}
          transition={{
            duration: 5,
          }}
        >
          Hi Admin{" "}
          {`${
            firstName.charAt(0).toUpperCase() + firstName.slice(1)
          } ${lastName}`}
          , your dashboard is ready!
          <span className="text-black">🚀</span>
        </motion.h1>
      </div>
    </>
  );
}
