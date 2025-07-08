import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { ImageContext, TokenContext } from "../../utills/context/countContext";

export default function MobileNavBar({ showMobileNav, setShowMobileNav }) {
  const { token } = useContext(TokenContext);
  const { image } = useContext(ImageContext);

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
    <div className="sm:hidden block relative">
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-10 ${
          showMobileNav ? "bg-black/30 backdrop-blur-sm" : "pointer-events-none"
        }`}
      >
        {/* Sidebar */}
        <motion.div
          className="fixed left-0 top-0 h-full w-[80%] max-w-[280px] bg-white shadow-lg z-20 p-6 flex flex-col justify-between"
          initial={false}
          animate={{
            x: showMobileNav ? 0 : -300,
            opacity: showMobileNav ? 1 : 0, // Fixed opacity to valid range
          }}
          transition={{
            duration: 0.2,
          }}
        >
          {/* Profile / Logo */}
          <div className="flex justify-center mb-6">
            <img
              src={image}
              alt="Profile"
              className="h-20 w-20 rounded-full object-cover"
            />
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-4">
            {mobileNavLinks.map((val, index) => {
              const { name, link, hidden, setsvg } = val;
              return (
                <Link
                  key={index}
                  to={link}
                  onClick={() => setShowMobileNav(false)}
                  className={`text-lg font-medium text-gray-700 hover:text-black transition ${
                    token ? "block" : hidden
                  }`}
                >
                  <div className={`${setsvg ? "flex items-center" : ""}`}>
                    {name}
                    {setsvg === "true" && (
                      <svg
                        className="ml-2 text-blue-500"
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
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

          {/* Sign Out Button */}
          <button className="w-full text-center py-2 mt-8 text-white bg-red-500 hover:bg-red-600 rounded-lg transition">
            Sign Out
          </button>
        </motion.div>
      </div>
    </div>
  );
}
