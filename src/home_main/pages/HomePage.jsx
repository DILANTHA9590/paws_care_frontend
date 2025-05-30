import React from "react";
import { Link } from "react-router";

export default function HomePage() {
  const myimages = ["headerimage1.avif", "headerimage2.jpg"];
  return (
    <>
      <div
        className="bg-cover bg-center h-full flex flex-col items-center justify-center relative"
        style={{ backgroundImage: `url(/${myimages[1]})` }}
      >
        <div className="bg-black/10  w-full h-full bottom-0 absolute "></div>\
        <div className="flex">
          <h1 className="text-5xl">left </h1>
          <h1 className="text-5xl md:text-6xl font-extrabold text-center text-white leading-tight">
            Welcome to <span className="">HappyPaws Care</span>
            <br />
            <span className="text-white">Your Pet’s Second Home</span>
          </h1>
          <h1 className="text-5xl">left </h1>
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
