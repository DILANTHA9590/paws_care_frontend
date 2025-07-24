import React from "react";
import { motion, AnimatePresence, delay, color } from "framer-motion";
import { Link } from "react-router";
export default function AboutUs() {
  return (
    <div className="w-[100%] ">
      <div className="flex sm:w-[70%] mx-auto justify-center items-center flex-col sm:flex-row mt-10">
        <div className="flex flex-col gap-y-9 sm:w-[70%] w-[90%]">
          {/* about main header --------------------------------------------------------------------> */}
          <motion.h1
            initial={{
              y: -50,
              opacity: 0,
            }}
            whileInView={{ y: 0, opacity: 3 }}
            className="text-4xl font-bold"
            transition={{
              duration: 1.1,
            }}
            viewport={{ once: true }}
          >
            About Us
          </motion.h1>

          {/* about use second header  -------------------------------------------------------------------> */}
          <motion.h2
            className="text-3xl "
            initial={{
              y: -170,
              opacity: 0,
            }}
            whileInView={{ y: 0, opacity: 3 }}
            transition={{
              duration: 1.3,
            }}
            viewport={{ once: true }}
          >
            Our goal: Happy & Healthy Pets
          </motion.h2>

          {/* about   us paragrph----------------------------------------------------------------------> */}

          <motion.h1
            className="sm:leading-9 leading-7.5 sm:text-2xl"
            initial={{
              y: -500,
              opacity: 0,
            }}
            whileInView={{ y: 0, opacity: 3 }}
            transition={{
              duration: 1.5,
            }}
            viewport={{ once: true }}
          >
            At Happy Paws Care, our mission is to ensure every pet feels loved,
            safe, and healthy — just like at home. We believe that pets are not
            just animals — they’re family. That’s why we work every day to offer
            trusted veterinary services, quality pet products, and caring
            support for pet owners. With a dedicated team of experienced vets
            and friendly staff, we are here to help your furry friends live
            their happiest, healthiest lives. From regular check-ups to
            emergency care, grooming, nutrition advice, and more — Happy Paws
            Care is your pet’s second home.
          </motion.h1>

          <motion.div
            initial={{
              x: -300,
            }}
            whileInView={{ x: 0 }}
            transition={{
              duration: 1.5,
            }}
            viewport={{ once: true }}
          >
            <Link
              className="bg-orange-400 sm:w-[200px] w-[150px] p-2 rounded-md sm:text-2xl block"
              onClick={() => {
                console.log("hallow");
              }}
            >
              More About Us
            </Link>
          </motion.div>
        </div>
        <div>
          <img
            src="https://wordpress-337999-1211616.cloudwaysapps.com/wp-content/uploads/2020/03/dog-and-cat-725x1024.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
