import React, { useContext, useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import DoctorDashBoard from "./pages/DoctorDashBoard";
import MyBookings from "./pages/MyBookings";
import UpdateMedicalHistory from "./components/UpdateMedicalHistory";
import DoctorPastAppoiments from "./pages/DoctorPastAppoiments";
import OnlineMeeting from "./pages/OnlineMeeting";
import { TokenContext } from "../utills/context/countContext";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FaSignOutAlt } from "react-icons/fa";

export default function DoctorMain() {
  const [iindex, setIndex] = useState(0);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const { token } = useContext(TokenContext);
  const [loaded, setLoaded] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/");

      return;
    }

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/doctors/verify`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.result) {
          toast.success("Doctor authorization successful!");
          setName(res.data.name);
          console.log(res);
        } else {
          navigate("/login");
          toast.error("Unauthorized! Please login to your doctor account.");
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 403) {
          toast.error("Unauthorized! Please login to your doctor account.");
          navigate("/login");
        } else {
          toast.error("Something went wrong. Please try again.");
          navigate("/login");
        }
      });
  }, [token]);

  function logOut() {
    localStorage.removeItem("token");
    navigate("/");
  }

  const navLinks = [
    { name: "DASHBOARD", link: "/doctor/" },
    { name: "TODAY'S BOOKINGS", link: "/doctor/mybookings" },
    { name: "PAST BOOKINGS", link: "/doctor/mypastbookings" },
    { name: "ONLINE MEETINGS", link: "/doctor/meeting" },
  ];

  // Filter links based on search text
  const filteredLinks = navLinks.filter((nav) =>
    nav.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleResultClick = (link) => {
    navigate(link);
    setSearchText(""); // Clear search text
  };

  return (
    <div>
      <div className="h-screen flex">
        {/* Sidebar */}
        <div className="bg-gradient-to-b from-blue-900 to-blue-700 w-1/5 text-white flex flex-col justify-between py-6 shadow-lg">
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 3,
            }}
            transition={{
              duration: 3,
              ease: "easeInOut",
            }}
          >
            <img
              src="https://th.bing.com/th/id/R.5639850d01bdb34de26e3b5754e34347?rik=7%2fJgZHjGcrQe7g&riu=http%3a%2f%2fwww.freeimageslive.com%2fgalleries%2fmedical%2fpics%2fdoctors_diagnostic_tools.jpg&ehk=RYBDd55Vx%2bibHXzBnlkHXr2BohZ0yV3wKObrwhuMypE%3d&risl=&pid=ImgRaw&r=0"
              alt="Doctor"
              className="w-24 h-24 mx-auto rounded-full border-4 border-white shadow-md"
            />
            <h1 className="mt-4 text-2xl font-bold text-white">
              {name ? `👋 Hi Dr. ${name}!` : "👋 Welcome back!"}
            </h1>
            <p className="text-white text-sm mt-1">
              Hope you have a great day at work.
            </p>
          </motion.div>

          <nav className="flex flex-col gap-2 px-4">
            {navLinks.map((nav, index) => (
              <Link
                key={index}
                to={nav.link}
                onClick={() => setIndex(index)}
                className={`block w-full px-4 py-3 rounded-lg transition-all duration-200 ${
                  iindex === index
                    ? "bg-blue-600 shadow-inner"
                    : "hover:bg-blue-800 hover:shadow"
                }`}
              >
                {nav.name}
              </Link>
            ))}
          </nav>
          <div className="px-10">
            <button
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md shadow-md transition duration-200"
              onClick={logOut}
            >
              <FaSignOutAlt />
              LOG OUT
            </button>
          </div>

          <div className="text-center text-sm opacity-70 py-4">
            &copy; 2025 Doctor App
          </div>
        </div>

        {/* Main Content */}
        <div className="w-4/5 flex flex-col relative">
          {/* Top Bar */}
          <div className="h-[10%] bg-white border-b border-gray-200 flex items-center px-8 shadow-sm relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 mr-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={() => {
                if (filteredLinks.length > 0) {
                  navigate(filteredLinks[0].link);
                  setSearchText("");
                }
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700"
            >
              Search
            </button>

            {/* Filtered Results Dropdown */}
            {searchText && filteredLinks.length > 0 && (
              <div className="absolute top-full mt-1 w-1/2 bg-white border border-gray-300 rounded shadow-lg z-50">
                {filteredLinks.map((nav, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleResultClick(nav.link)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {nav.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
            <Routes>
              <Route path="/" element={<DoctorDashBoard />} />
              <Route path="mybookings" element={<MyBookings />} />
              <Route
                path="updatemedicalhistory"
                element={<UpdateMedicalHistory />}
              />
              <Route path="mypastbookings" element={<DoctorPastAppoiments />} />
              <Route path="meeting" element={<OnlineMeeting />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}
