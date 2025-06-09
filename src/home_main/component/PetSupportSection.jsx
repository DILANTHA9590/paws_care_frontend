import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { div } from "framer-motion/client";
import { useScroll } from "framer-motion";

export default function PetSupportSection() {
  const [clinet, setCilent] = useState(0);
  const [profetional, setProfetional] = useState(0);
  const [yearExperience, setyearExperience] = useState(0);

  useEffect(() => {
    let i = 0;
    const client = setInterval(() => {
      if (i <= 100) {
        setCilent(i);
        i++;
      } else {
        clearInterval(client); // stop once it reaches 30
      }
    }, 10); // 100ms delay between increments

    const profetional = setInterval(() => {
      if (i <= 34) {
        setProfetional(i);
        i++;
      } else {
        clearInterval(profetional); // stop once it reaches 30
      }
    }, 40); // 100ms delay between increments

    const year = setInterval(() => {
      if (i <= 24) {
        setyearExperience(i);
        i++;
      } else {
        clearInterval(year); // stop once it reaches 30
      }
    }, 100); // 100ms delay between increments
    return () => {
      clearInterval(client);
      clearInterval(profetional);
      clearInterval(year);
    };
  }, []);

  const aboutCard = [
    { number: clinet, text: "Happy Client", color: "bg-[#65d2d6]", icon: "+" },
    { number: profetional, text: "Professionals", color: "bg-[#0d4d60]" },
    { number: yearExperience, text: "Year Experience", color: "bg-[#3b8497]" },
  ];

  return (
    <>
      <div>
        <h1></h1>
        <div
          className="w-full h-[70vh] bg-cover bg-center mt-6  flex flex-col items-center justify-center relative "
          style={{ backgroundImage: "url('/mysection1.jpg')" }}
        >
          <div className="flex  w-full sm:ml-100 text-center">
            <div className=" sm:w-[30%] bg-white/30 sm:backdrop-blur-sm rounded-2xl     flex flex-col sm:gap-y-16  p-4 justify-center items-center w-full ">
              <h1 className="text-3xl font-bold">
                We are here to help you <br /> with your pets
              </h1>
              <h1 className="text-2xl text-gray-900 ">
                Caring for your pets is our top priority. Whether it’s advice on
                nutrition, grooming, or general well-being — we’re here to guide
                you every step of the way. Your furry friends deserve the best,
                and we’re committed to supporting their happiness and health.{" "}
                <br />
                💬 Have questions?{" "}
                <span className="text-blue-600"> Contact Us</span> — Our team is
                ready to assist you anytime!
              </h1>

              <Link className="text-3xl bg-orange-500 rounded-sm p-1 font-bold">
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* //map  expirence cards----------------------------------------> */}

        <div className="flex inli sm:gap-5 justify-center -m-6 w-full mx-auto sm:flex-row flex-col gap-10 mt-6 sm:mt-0">
          {aboutCard.map((val, index) => {
            const { number, text, color, icon } = val;
            return (
              <div
                className={`h-[150px] sm:w-[600px]  -mt-8 relative className= ${color} flex flex-col justify-center items-center text-3xl font-bold text-white rounded-2xl`}
              >
                <h1>
                  {number}
                  {icon}
                </h1>
                <h1>{text}</h1>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
