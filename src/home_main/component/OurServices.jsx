import React from "react";

import { PiDogThin } from "react-icons/pi";
import { motion, AnimatePresence, delay } from "framer-motion";
export default function OurServices() {
  return (
    <>
      <div>
        {/* Header section: title and description */}
        <div className="">
          <h1 className="text-center font-bold text-6xl">OUR SERVICES</h1>
          <h2 className="text-center sm:w-[800px] mx-auto mt-10 text-3xl text-gray-800 leading-relaxed">
            At HappyPaws Care, we treat your pets like family. From vet
            appointments to healthy pet food and expert advice, we’re here to
            keep your furry friend happy, healthy, and well-loved — because
            every paw matters.
          </h2>
        </div>

        {/* Container for all service cards */}
        <div className="w-[90%] mx-auto text-3xl text-center  mt-5 sm:w-[80%]">
          {/* First row of service cards with scroll animation */}
          <motion.div
            className=" flex gap-5  sm:flex-row flex-col"
            initial={{
              opacity: 0,
              y: 50,
            }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0,
              duration: 1.5,
            }}
          >
            {/* Card 1 - Veterinary Service */}
            <div className="border shadow-2xl  pb-2">
              <div>
                <img src="/headerimage1.avif" alt="" />
              </div>
              <div>
                <PiDogThin className="inline-block  text-orange-500" />
                <h1>Vertinary Service</h1>
              </div>
            </div>

            {/* Card 2 - Vaccines */}
            <div className="border shadow-2xl  pb-2">
              <div>
                <img src="/headerimage1.avif" alt="" />
              </div>
              <div>
                <PiDogThin className="inline-block text-orange-500" />
                <h1>Vaccines</h1>
              </div>
            </div>

            {/* Card 3 - Small Pets Care */}
            <div className="border shadow-2xl  pb-2">
              <div>
                <img src="/headerimage1.avif" alt="" />
              </div>
              <div>
                <PiDogThin className="inline-block  text-orange-500" />
                <h1>Small Pets Care</h1>
              </div>
            </div>
          </motion.div>

          {/* Second row of service cards with scroll animation */}
          <motion.div
            className=" flex  mt-10  gap-5  sm:flex-row flex-col"
            initial={{
              opacity: 0,
              y: 50,
            }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0,
              duration: 1.5,
            }}
          >
            {/* Card 4 - Dental Treatments */}
            <div className="border  pb-2 shadow-2xl">
              <div>
                <img src="/headerimage1.avif" alt="" />
              </div>
              <div>
                <PiDogThin className="inline-block  text-orange-500" />
                <h1>Dental Treatments</h1>
              </div>
            </div>

            {/* Card 5 - Physiotherapy */}
            <div className="border shadow-2xl  pb-2">
              <div>
                <img src="/headerimage1.avif" alt="" />
              </div>
              <div>
                <PiDogThin className="inline-block  text-orange-500" />
                <h1>Physiotherapy</h1>
              </div>
            </div>

            {/* Card 6 - Spaying & Neutering */}
            <div className="border shadow-2x  pb-2">
              <div>
                <img src="/headerimage1.avif" alt="" />
              </div>
              <div>
                <PiDogThin className="inline-block  text-orange-500" />
                <h1>Spaying & Neutering</h1>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
