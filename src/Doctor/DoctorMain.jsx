import { div, h1 } from "framer-motion/client";
import React, { useState } from "react";
import { Link, Route, Routes } from "react-router";
import DoctorDashBoard from "./pages/DoctorDashBoard";
import AboutUs from "../home_main/component/AboutUs";
import MyBookings from "./pages/MyBookings";
import UpdateMedicalHistory from "./components/UpdateMedicalHistory";
import DoctorPastAppoiments from "./pages/DoctorPastAppoiments";

export default function DoctorMain() {
  const [input, setInput] = useState();
  const [switchInput, setSwitchInput] = useState();
  const [iindex, setIndex] = useState(0);
  const navLinks = [
    {
      name: "DASHBOARD",
      link: "/doctor/dashboard",
    },
    {
      name: "TODAY,S BOOKINGS",
      link: "/doctor/mybookings",
    },

    {
      name: "PAST BOOKIGS",
      link: "/doctor/mypastbookings",
    },

    {
      name: "DASHBOARD",
      link: "/doctor/dashboard",
    },

    {
      name: "DASHBOARD",
      link: "/doctor/dashboard",
    },

    {
      name: "DASHBOARD",
      link: "/doctor/dashboard",
    },
  ];

  return (
    <div className="h-[100vh]  flex">
      <div className="bg-red-500 h-[100%] w-[20%] ">
        <div className="text-center justify-between items-center h-full flex flex-col bg-amber-400">
          <div>
            <img
              src="https://th.bing.com/th/id/R.5639850d01bdb34de26e3b5754e34347?rik=7%2fJgZHjGcrQe7g&riu=http%3a%2f%2fwww.freeimageslive.com%2fgalleries%2fmedical%2fpics%2fdoctors_diagnostic_tools.jpg&ehk=RYBDd55Vx%2bibHXzBnlkHXr2BohZ0yV3wKObrwhuMypE%3d&risl=&pid=ImgRaw&r=0"
              alt=""
            />
          </div>
          {navLinks.map((nav, index) => {
            const { name, link, id } = nav;
            return (
              <div
                key={index}
                className="w-full "
                onClick={() => {
                  setIndex(index);
                }}
              >
                <Link
                  to={link}
                  className={`${
                    iindex == index && "bg-blue-900"
                  } w-full block p-4 rounded-l-full ml-5 rounded-tl-2xl`}
                >
                  {name}
                </Link>
              </div>
            );
          })}

          <div>
            <h1>ll</h1>
          </div>
        </div>
      </div>
      <div className="bg-blue-600 h-[100%] w-[80%]">
        <div className="h-[10%] bg-amber-100 flex justify-center items-center">
          <input type="text" className="border w-7xl p-4" />
          <h1 className="p-4 bg-amber-300 border">Search</h1>
        </div>
        <div className="h-[90%] bg-white">
          <Routes>
            <Route path="dashboard" element={<DoctorDashBoard />} />
            <Route path="mybookings" element={<MyBookings />} />
            <Route
              path="updatemedicalhistory"
              element={<UpdateMedicalHistory />}
            />

            <Route path="mypastbookings" element={<DoctorPastAppoiments />} />
          </Routes>
        </div>
        <div></div>
      </div>
    </div>
  );
}
