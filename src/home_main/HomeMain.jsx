import React from "react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";

export default function HomeMain() {
  return (
    <>
      <div className="min-h-screen">
        <div className="h-[12vh] bg-gray-100">I am nav</div>
        <div className="h-[calc(100vh-12vh)]">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="contact" element={<h1>ContactUs</h1>} />
            <Route path="pet foods" element={<h1>pet foods</h1>} />
          </Routes>
        </div>
      </div>
    </>
  );
}
