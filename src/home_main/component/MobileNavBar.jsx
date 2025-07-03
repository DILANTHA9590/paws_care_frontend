import { link } from "framer-motion/client";
import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { TokenContext } from "../../utills/context/countContext";

export default function MobileNavBar({ showMobileNav, setNumber, number }) {
  const { token, setToken } = useContext(TokenContext);

  const mobileNavLinks = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Shop", link: "/products" },
    { name: "Contact Us", link: "/contact" },
    { name: "Book now", link: "/" },
    { name: "Cart", link: "/cart" },
    { name: "Order", link: "/cart", hidden: "hidden" },
    { name: "My Bookings", link: "/cart", hidden: "hidden" },
    { name: "My pets", link: "/cart", hidden: "hidden" },
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
          >
            {/* Top Section */}
            <div className="space-y-6">
              {/* Close Menu Button */}

              {/* Profile / Logo */}
              <div className="flex justify-center">
                <div className="h-20 w-20 bg-black rounded-full" />
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col space-y-4">
                {mobileNavLinks.map((val, index) => {
                  const { name, link, hidden } = val;
                  return (
                    <Link
                      key={index}
                      to={link}
                      className={`text-lg font-medium text-gray-700 hover:text-black transition  ${
                        token ? "block" : hidden
                      } `}
                    >
                      {name}
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
