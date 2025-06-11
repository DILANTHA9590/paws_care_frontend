import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { FaChevronCircleLeft } from "react-icons/fa";
import { FaChevronCircleRight } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import { motion, AnimatePresence, delay, color } from "framer-motion";
import { ImWhatsapp } from "react-icons/im";
import { FaInstagram } from "react-icons/fa";
import Header from "../component/Header";
import { PiDogThin } from "react-icons/pi";
import OurServices from "../component/OurServices";
import { div } from "framer-motion/client";
import PetSupportSection from "../component/PetSupportSection";
import AboutUs from "../component/AboutUs";
export default function HomePage() {
  const [index, setIndex] = useState(0);

  console.log(index);

  const doctor = [
    {
      image:
        "https://images.unsplash.com/photo-1673865641073-4479f93a7776?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZlbWFsZSUyMGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D",
      name: "Dr.Anushka",
      Specialist: "Veterinary Surgeon",
    },
    {
      image:
        "https://media.istockphoto.com/id/1301595548/photo/female-doctor-stock-photo.jpg?s=2048x2048&w=is&k=20&c=BLoZsEopjCiEvwmyyy7LZqrRkrB7nvvhwzJsN5bZc9Y=",
      name: "Dr. Harsha Fernando",
      Specialist: "Animal Specialis",
    },

    {
      image:
        "https://media.istockphoto.com/id/1301595548/photo/female-doctor-stock-photo.jpg?s=2048x2048&w=is&k=20&c=BLoZsEopjCiEvwmyyy7LZqrRkrB7nvvhwzJsN5bZc9Y=",
      name: "Dr.Nadeesha Silva",
      Specialist: "Pet Dermatologist",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % doctor.length);
    }, 3000); // every 3 seconds

    return () => clearInterval(interval); // cleanup
  }, [doctor.length]);

  function myone(index) {
    setIndex(index);
  }

  const myimages = ["headerimage1.avif", "headerimage2.jpg"];

  return (
    <>
      <Header />

      {/* Main container for the Services section */}
      <OurServices />
      <PetSupportSection />
      <AboutUs />

      <div className="w-[70%] mx-auto py-10  sm:block hidden ">
        <h2 className="text-3xl font-bold text-center text-amber-700 mb-6">
          🐾 Meet Our Veterinary Experts
        </h2>

        <div className="flex flex-wrap justify-center">
          {doctor.map((val, index) => {
            const { image, name, Specialist } = val;

            return (
              <div
                key={index}
                className="bg-[#f7f7f3] backdrop-blur-2xl border border-amber-600 rounded-xl text-center p-4 m-2"
              >
                <img
                  src={image}
                  alt={name}
                  className="w-[500px] h-[500px]object-cover rounded-full border-4 border-amber-500 mx-auto mb-4"
                />
                <h1 className="text-lg font-semibold text-amber-800">{name}</h1>
                <h2 className="text-sm text-gray-700">{Specialist}</h2>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-6">
          <Link href="#" className="text-amber-600 underline text-sm">
            View More
          </Link>
        </div>
      </div>
    </>
  );
}
