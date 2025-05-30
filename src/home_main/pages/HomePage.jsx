import React from "react";
import { Link } from "react-router";
import { FaChevronCircleLeft } from "react-icons/fa";
import { FaChevronCircleRight } from "react-icons/fa";
export default function HomePage() {
  const myimages = ["headerimage1.avif", "headerimage2.jpg"];
  return (
    <>
      <div
        className="bg-cover bg-center h-full flex flex-col items-center justify-center relative"
        style={{ backgroundImage: `url(/${myimages[1]})` }}
      >
        <div className="bg-black/10  w-full h-full bottom-0 absolute "></div>
        <div className="flex items-center justify-between w-full gap-x-5">
          <h1 className="text-5xl text-white sm:p-4">
            <FaChevronCircleLeft />{" "}
          </h1>
          <h1 className="text-4xl  md:text-6xl font-extrabold text-center text-white leading-tight">
            Welcome to <span className="">HappyPaws Care</span>
            <br />
            <span className="text-white">Your Pet’s Second Home</span>
          </h1>
          <h1 className="text-5xl text-white sm:p-4">
            <FaChevronCircleRight />
          </h1>
        </div>
        {/* <Link className="inline-block bg-green-400 p-6 font-bold"></Link> */}
        <div className="flex absolute bottom-0 gap-1 p-3 ">
          {myimages.map((_, index) => {
            console.log(index);
            return (
              <div key={index} className="">
                <div
                  className={`bg-black/30  w-[50px] h-[50px] rounded-full  `}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
