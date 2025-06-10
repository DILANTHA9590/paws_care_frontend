import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { IoIosArrowDown } from "react-icons/io";
import { CiLogin } from "react-icons/ci";
import { LiaSignInAltSolid } from "react-icons/lia";
import { motion } from "framer-motion";
import { div } from "framer-motion/client";

export default function DeskTopNavbar() {
  const [token, setToken] = useState(true);
  const [usertoggleMenu, setToggleMenu] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);

    console.log(token);
  }, []);

  // mob nav Arrey -------------------------------->

  const mobileNavLinks = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Shop", link: "/" },
    { name: "Contact Us", link: "/contact" },
    { name: "Book now", link: "/" },
  ];
  return (
    <div>
      {/* mobile nav started ----------------------------------------------------> */}
      <div className="sm:hidden block">
        <div className="w-full h-screen absolute bg-black/50 backdrop-blur-sm z-10">
          <motion.div
            className="w-[70%] bg-white h-full shadow-xl"
            initial={false}
            animate={{
              x: showMobileNav ? 0 : -300,
            }}
          >
            <div className="h-full flex flex-col p-4">
              <div className="flex justify-center py-6">
                <div className="h-30 w-30 bg-gray-200 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex-1">
                {mobileNavLinks.map((val, index) => {
                  const { name, link } = val;
                  console.log(link);
                  return (
                    <div
                      key={index}
                      className="px-4 py-3 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Link
                        to={`${link}`}
                        className="block text-gray-700 hover:text-indigo-600 font-medium"
                      >
                        {name}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* mobile nav started ----------------------------------------------------> */}
      <div className="h-[12vh] bg-gray-100 font-bold">
        <div className="h-full flex items-center justify-between px-10 text-2xl">
          <div className="flex items-center gap-2">
            <img
              className="w-10 h-10"
              src="https://th.bing.com/th/id/OIP.on2xxMjEjqaEsBK_xvP_9wHaHa?r=0&pid=ImgDet&w=203&h=203&c=7"
              alt="logo"
            />
          </div>

          <div className="sm:block hidden ">
            <div className="flex gap-4 text-2xl">
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/shop">Shop</Link>
              <Link to="/contact">Contact Us</Link>
              <Link to="/booking">Book Now</Link>
            </div>
          </div>
          <div className="sm:block hidden">
            <div className="flex items-center gap-2">
              {token ? (
                <div className="relative  flex flex-col  items-center">
                  <div>
                    <img
                      onClick={() => setToggleMenu(true)}
                      className="w-20 h-20 rounded-full"
                      src="https://th.bing.com/th/id/OIP.l93Rr1tSI165Dpr6sAFlqAHaHa?w=190&h=190&c=7&r=0&o=7&pid=1.7&rm=3"
                      alt="profile"
                    />
                  </div>

                  {usertoggleMenu && token && (
                    <motion.div
                      initial={false}
                      animate={{}}
                      className="absolute w-[150px] h-[130px] bg-white/40  backdrop-blur-md z-50 -bottom-33 flex flex-col justify-center items-center gap-1 rounded-md text-[20px]"
                    >
                      <motion.h1
                        initial={{ rotate: 0 }}
                        whileInView={{ rotate: 180 }}
                        transition={{ duration: 1 }}
                      >
                        <motion.div>
                          <IoIosArrowDown
                            onClick={() => setToggleMenu(false)}
                            title="close"
                          />
                        </motion.div>
                      </motion.h1>

                      <div className="flex items-center">
                        <CiLogin />
                        <h1> Login</h1>
                      </div>
                      <div className="flex items-center">
                        <LiaSignInAltSolid className="rotate-89b " />

                        <h1>Signup</h1>
                      </div>

                      <div className="flex items-center">
                        <LiaSignInAltSolid className="rotate-89b " />

                        <h1>Log Out</h1>
                      </div>
                      <h1></h1>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="relative  flex flex-col  items-center">
                  <div>
                    <img
                      onClick={() => setToggleMenu(true)}
                      className="w-20 h-20 rounded-full"
                      src="https://th.bing.com/th/id/OIP.l93Rr1tSI165Dpr6sAFlqAHaHa?w=190&h=190&c=7&r=0&o=7&pid=1.7&rm=3"
                      alt="profile"
                    />
                  </div>

                  {usertoggleMenu && token == null && (
                    <motion.div
                      initial={false}
                      animate={{}}
                      className="absolute w-[150px] h-[120px] bg-white/40  backdrop-blur-md z-50 -bottom-33 flex flex-col justify-center items-center gap-1 rounded-md"
                    >
                      <motion.h1
                        initial={{ rotate: 0 }}
                        whileInView={{ rotate: 180 }}
                        transition={{ duration: 1 }}
                      >
                        <motion.div>
                          <IoIosArrowDown
                            onClick={() => setToggleMenu(false)}
                            title="close"
                          />
                        </motion.div>
                      </motion.h1>

                      <div className="flex items-center ">
                        <CiLogin />
                        <h1> Login</h1>
                      </div>
                      <div className="flex items-center">
                        <LiaSignInAltSolid className="rotate-89b " />

                        <h1>Signup</h1>
                      </div>

                      <h1></h1>
                    </motion.div>
                  )}
                </div>
              )}
              <div className="flex">
                <h1 className="">Contact Us</h1>
              </div>
            </div>
          </div>
          <div
            className={`flex flex-col  sm:hidden relative z-40  focus:outline-0 ${
              showMobileNav ? "gap-0" : "gap-2"
            }`}
            onClick={() => setShowMobileNav(!showMobileNav)}
          >
            <motion.div
              className="w-17 h-1 bg-black "
              initial={false}
              animate={{
                rotate: showMobileNav ? 135 : 0,
              }}
            ></motion.div>
            <motion.div
              className={`w-19 h-1 bg-black   ${
                showMobileNav ? "hidden" : "block"
              } `}
            ></motion.div>
            <motion.div
              className="w-17 h-1 bg-black"
              initial={false}
              animate={{
                rotate: showMobileNav ? -135 : 0,
              }}
            ></motion.div>
            {/* <motion.div className="w-11 h-1 bg-black"></motion.div> */}

            {/* <motion.div className="w-11 h-1 bg-black"></motion.div> */}

            {/* <motion.div className="w-16 h-1 bg-black"></motion.div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
