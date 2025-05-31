import React, { useState } from "react";
import { Link } from "react-router";
import { FaChevronCircleLeft } from "react-icons/fa";
import { FaChevronCircleRight } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import { motion, AnimatePresence, delay } from "framer-motion";
import { ImWhatsapp } from "react-icons/im";
import { FaInstagram } from "react-icons/fa";
export default function Header() {
  const [index, setIndex] = useState(0);
  const myimages = ["headerimage1.avif", "headerimage2.jpg"];
  return (
    <>
      <div
        className="bg-cover bg-center h-full flex flex-col items-center justify-center relative"
        style={{ backgroundImage: `url(/${myimages[index]})` }}
      >
        <div className="bg-black/10  w-full h-full bottom-0 absolute "></div>

        {/* left fixed socal linnks ---------------------------------------> */}
        <div className=" fixed right-0  sm:top-45 flex flex-col gap-y-10 text-4xl sm:pr-10 justify-center items-center  top-28 ">
          <motion.div
            whileHover={{ scale: 1.2 }}
            initial={{
              x: 200,
            }}
            animate={{
              x: 0,
            }}
            transition={{
              duration: 1,
              delay: 1.1,
            }}
          >
            <Link
              to="https://facebook.com"
              target="_blank"
              className="flex justify-center"
            >
              <FaFacebookF className="text-[#0862fd] text-3xl" />
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.2 }}
            initial={{
              x: 200,
            }}
            animate={{
              x: 0,
            }}
            transition={{
              duration: 1,
              delay: 1.3,
            }}
          >
            <Link
              to="https://wa.me/123456789"
              target="_blank"
              className="flex justify-center"
            >
              <ImWhatsapp className="text-[#28aa32] text-3xl" />
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.2 }}
            initial={{
              x: 200,
            }}
            animate={{
              x: 0,
            }}
            transition={{
              duration: 1,
              delay: 1.5,
            }}
          >
            <Link
              to="https://instagram.com"
              target="_blank"
              className="flex justify-center"
            >
              <FaInstagram className="text-[#E1306C] text-4xl" />
            </Link>
          </motion.div>
        </div>

        {/* left image slidew arrow ---------------------------------------->  */}
        <div className="flex items-center justify-between w-full gap-x-5 ">
          <h1
            className="text-5xl text-white sm:p-4 hidden md:block "
            // onClick={() => setIndex(index++)}
          >
            <FaChevronCircleLeft />{" "}
          </h1>

          {/* header title -----------------------------------------------> */}
          <motion.div
            className="gap-4 text-4xl font-bold md:text-6xl"
            initial={{
              opacity: 0,
              y: 100,
            }}
            whileInView={{ opacity: 4, y: 0 }}
            transition={{
              delay: 0,
              duration: 3,
            }}
          >
            <motion.h1 className="  font-extrabold text-center text-white leading-tight">
              Welcome to <span className="">HappyPaws Care</span>
              <br />
            </motion.h1>
            <h1 className="text-white text-center ">Your Pet’s Second Home</h1>
          </motion.div>

          {/* right image slidew arrow ---------------------------------------->  */}
          <h1 className="text-5xl text-white sm:p-4 hidden md:block">
            <FaChevronCircleRight onClick={() => setIndex(1)} />
          </h1>
        </div>
        {/* <Link className="inline-block bg-green-400 p-6 font-bold"></Link> */}

        <div className="flex absolute bottom-0 gap-1 p-3 ">
          {myimages.map((_, index) => {
            console.log(index);
            return (
              <div key={index} className="">
                <div
                  className={`bg-black/30  w-[50px] h-[50px] rounded-full  `}
                  onMouseMove={() => setIndex(index)}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
