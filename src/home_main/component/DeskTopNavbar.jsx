import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { IoIosArrowDown } from "react-icons/io";
import { CiLogin } from "react-icons/ci";
import { LiaSignInAltSolid } from "react-icons/lia";
import { motion } from "framer-motion";
import { div } from "framer-motion/client";
import MobileNavBar from "./MobileNavBar";
import ShowProfileNav from "./ShowProfileNav";
import { ImageContext, TokenContext } from "../../utills/context/countContext";

export default function DeskTopNavbar() {
  const [usertoggleMenu, setToggleMenu] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { token } = useContext(TokenContext);
  const { image, setImage } = useContext(ImageContext);

  if (!image) {
    setImage(() => localStorage.getItem("image"));
  }

  // mob nav Arrey -------------------------------->

  return (
    <div>
      {/* mobile nav started ----------------------------------------------------> */}
      <div className="sm:hidden block">
        {/* Overlay */}

        <MobileNavBar
          showMobileNav={showMobileNav}
          setShowMobileNav={setShowMobileNav}
        />
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
          {/* Desktop Nav Links -----------------------------------------------------------------> */}
          <div className="sm:block hidden ">
            <div className="flex gap-4 text-2xl">
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/products">Shop</Link>
              <Link to="/contact">Contact Us</Link>
              <Link to="/bookdoctor">Book Now</Link>
              <Link to="/cart">Cart</Link>
              {token && (
                <div className="relative ">
                  <Link onClick={() => setShowProfileMenu(!showProfileMenu)}>
                    My Profiles
                  </Link>

                  {showProfileMenu && <ShowProfileNav />}
                </div>
              )}
            </div>
          </div>
          <div className="sm:block hidden">
            <div className="flex items-center gap-2">
              {/* if user log and show user profile image */}
              {token ? (
                <div className="relative  flex flex-col  items-center">
                  <div>
                    <img
                      onClick={() => setToggleMenu(true)}
                      className="w-35 border-amber-400 h-25 rounded-full  "
                      src={
                        image
                          ? image
                          : "https://res.cloudinary.com/dfmsi6xmw/image/upload/v1751976851/w7aiug9avfcwvwxida9i.webp"
                      }
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
                        <Link to="/login">Login</Link>
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
                // Guest user profile icon (shown when user is NOT logged in)

                <div className="relative  flex flex-col  items-center">
                  <div>
                    <img
                      onClick={() => setToggleMenu(true)}
                      className="w-40 h-25 rounded-full"
                      src="https://res.cloudinary.com/dfmsi6xmw/image/upload/v1751976851/w7aiug9avfcwvwxida9i.webp"
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
                        <Link to="/login">Login</Link>
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
            className="sm:hidden flex flex-col justify-center items-center w-8 h-8 relative z-40 gap-1 cursor-pointer"
            onClick={() => setShowMobileNav(!showMobileNav)}
          >
            {/* Top Line */}
            <motion.div
              className="w-6 h-0.5 bg-black absolute"
              initial={false}
              animate={{
                rotate: showMobileNav ? 45 : 0,
                y: showMobileNav ? 0 : -8,
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Middle Line */}
            <motion.div
              className="w-6 h-0.5 bg-black absolute"
              initial={false}
              animate={{
                opacity: showMobileNav ? 0 : 1,
              }}
              transition={{ duration: 0.2 }}
            />

            {/* Bottom Line */}
            <motion.div
              className="w-6 h-0.5 bg-black absolute"
              initial={false}
              animate={{
                rotate: showMobileNav ? -45 : 0,
                y: showMobileNav ? 0 : 8,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
