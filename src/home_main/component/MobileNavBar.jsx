import { link } from "framer-motion/client";
import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { ImageContext, TokenContext } from "../../utills/context/countContext";

export default function MobileNavBar({ showMobileNav, setShowMobileNav }) {
  const { token, setToken } = useContext(TokenContext);
  const { image, setImage } = useContext(ImageContext);

  const mobileNavLinks = [
    { name: "Login", link: "/login" },
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Shop", link: "/products" },
    { name: "Contact Us", link: "/contact" },
    { name: "Book now", link: "/bookdoctor" },
    { name: "Cart", link: "/cart" },
    { name: "Order", link: "/myorders", hidden: "hidden" },
    { name: "My Bookings", link: "/mybookings", hidden: "hidden" },
    { name: "My pets", link: "/mypets", hidden: "hidden" },
    {
      name: "Go to Profile",
      link: "/userprofile",
      hidden: "hidden",
      setsvg: "true",
    },
  ];

  return (
    <>
      <div className="sm:hidden block relative">
        {/* Overlay */}
        <div
          className={`fixed ${
            showMobileNav && "inset-0 bg-black/30 backdrop-blur-sm hi"
          } z-10`}
        >
          {/* Sidebar */}
          <motion.div
            className="w-[75%] max-w-xs bg-white h-full shadow-lg z-20 p-6 flex flex-col justify-between"
            initial={false}
            animate={{
              x: showMobileNav ? 0 : -300,
              opacity: showMobileNav ? 3 : 0,
            }}
            transition={{
              duration: showMobileNav ? 0.2 : 0,
            }}
          >
            {/* Top Section */}
            <div className="space-y-6">
              {/* Close Menu Button */}

              {/* Profile / Logo */}
              <div className="flex justify-center">
                <img src={image} alt="" className="h-34 w-34" />
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col space-y-4 ">
                {mobileNavLinks.map((val, index) => {
                  const { name, link, hidden, setsvg } = val;
                  return (
                    <Link
                      onClick={() => {
                        setShowMobileNav(false);
                      }}
                      key={index}
                      to={link}
                      className={`text-lg font-medium text-gray-700 hover:text-black transition  ${
                        token ? "block" : hidden
                      } `}
                    >
                      <div className={`${setsvg && "flex items-center"}`}>
                        {name}

                        {setsvg == "true" && (
                          <svg
                            className="pl-1. text-blue-300 font-bold"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Sign Out Button */}
            <div>
              <button
                // replace with your sign out handler
                className="w-full text-center py-2 mt-4 text-white bg-red-500 hover:bg-red-600 rounded-lg transition"
              >
                Sign Out
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
