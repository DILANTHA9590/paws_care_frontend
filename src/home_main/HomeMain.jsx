import React from "react";
import { Route, Routes } from "react-router";

export default function HomeMain() {
  return (
    <>
      <div className="min-h-screen bg-amber-400">
        <div className="h-[12vh] bg-amber-500">I am nav</div>
        <div>
          <Routes>
            <Route path="/" element={<h1>Home Page</h1>} />
            <Route path="contact" element={<h1>ContactUs</h1>} />
            <Route path="pet foods" element={<h1>pet foods</h1>} />
          </Routes>
        </div>
      </div>
    </>
  );
}
