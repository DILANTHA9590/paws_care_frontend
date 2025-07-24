import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence, delay, color } from "framer-motion";

export default function DoctorHomeSection() {
  const [index, setIndex] = useState(0);

  const doctor = [
    {
      image:
        "https://res.cloudinary.com/dfmsi6xmw/image/upload/v1753116469/ob6uef8dr8jbf3fjm3gi.jpg",
      name: "Dr. Sachini Weerasinghe",
      Specialist: "Veterinary Surgeon",
      h: 1,
    },
    {
      image:
        "https://res.cloudinary.com/dfmsi6xmw/image/upload/v1753116683/y49stuq1ag06zswpyg6m.avif",
      name: "Dr. Dinuka Ranasinghe",
      Specialist: "Small Animal Specialist",
      h: 2,
    },

    {
      image:
        "https://res.cloudinary.com/dfmsi6xmw/image/upload/v1753193800/mazmz1mkj6twzxuyk6k2.jpg",
      name: "Dr. Amila Kumuduni",
      Specialist: "Pet Nutritionist",
      h: 3,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % doctor.length);
    }, 3000); // every 3 seconds

    return () => clearInterval(interval); // cleanup
  }, [doctor.length]);

  return (
    <div>
      <div className="w-[70%] mx-auto py-10  sm:block hidden">
        <h2 className="text-3xl font-bold text-center text-amber-700 mb-6">
          🐾 Meet Our Veterinary Experts
        </h2>

        <div className="flex flex-wrap justify-center">
          {doctor.map((val, index) => {
            const { image, name, Specialist, h } = val;

            return (
              <motion.div
                initial={{
                  opacity: 0,
                }}
                whileInView={{ opacity: h }}
                transition={{
                  duration: 3,
                }}
                key={index}
                className="bg-[#f7f7f3] backdrop-blur-2xl border border-amber-600 rounded-xl text-center p-4 m-2"
              >
                <img
                  src={image}
                  alt={name}
                  className="w-[500px] h-[500px]object-cover rounded-full border-4 border-amber-500 mx-auto mb-4"
                />
                <motion.h1
                  className="text-lg font-semibold text-amber-800"
                  initial={{ y: 30 }}
                  whileInView={{ y: 0, opacity: 3 }}
                  transition={{
                    delay: 0.1,
                    duration: 1,
                  }}
                >
                  {name}
                </motion.h1>
                <motion.h2
                  className="text-sm text-gray-700"
                  initial={{ y: 30 }}
                  whileInView={{ y: 0, opacity: 3 }}
                  transition={{
                    delay: 0.2,
                    duration: 1,
                  }}
                >
                  {Specialist}
                </motion.h2>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-6">
          <Link
            href="#"
            className="bg-orange-400 p-4 rounded-sm underline text-sm"
          >
            View More
          </Link>
        </div>
      </div>
      <motion.div
        className="sm:hidden block"
        initial={{
          opacity: 0,
        }}
        whileInView={{ opacity: 3 }}
        transition={{
          delay: 0.1,
          duration: 4,
        }}
      >
        <div className="w-full   flex justify-center ">
          <div className="flex flex-col items-center bg-amber-50 p-6 rounded-xl shadow-lg max-w-md w-full">
            <h2 className="text-3xl font-bold text-amber-700 mb-6 text-center">
              🐾 Meet Our Veterinary Experts
            </h2>

            <img
              src={doctor[index].image}
              alt={doctor[index].name}
              className="h-[40vh] w-[40vh] object-cover rounded-full border-4 border-amber-400 mb-4"
            />

            <h1 className="text-xl font-semibold text-amber-800 mb-1">
              {doctor[index].name}
            </h1>
            <h2 className="text-sm text-gray-700 mb-6">
              {doctor[index].Specialist}
            </h2>

            <div className="flex justify-center mb-4">
              {Array.from({ length: doctor.length }).map((_, dotIndex) => (
                <div
                  key={dotIndex}
                  onClick={() => setIndex(dotIndex)}
                  className={`h-4 w-4 mx-1 rounded-full cursor-pointer transition-all duration-300 ${
                    dotIndex === index
                      ? "bg-orange-500 scale-110"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            <div className="bg-ora">
              <Link
                to=""
                className="text-sm underline cursor-pointer inline-block bg-amber-500 font-bold p-1 rounded-sm"
              >
                View more
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
