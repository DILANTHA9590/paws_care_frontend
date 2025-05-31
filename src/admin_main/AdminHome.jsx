import React from "react";
import { Link, Route, Routes } from "react-router";
import CustomersPanel from "./pages/CustomersPanel";

export default function AdminHome() {
  return (
    <>
      <div className="min-h-screen bg-amber-200">
        <div className="h-[15vh] bg-blue-400"></div>
        <div className="bg-amber-100 h-[calc(100vh-15vh)] flex">
          <div className="bg-amber-300 w-[20%] flex flex-col ">
            <Link to={"/admin/"}>Dashboard</Link>
            <Link to={"/admin/manageusers"}>Customers</Link>
            <Link to={"/admin/manageappointment"}>Booking</Link>
          </div>
          <div className="bg-blue-100 w-[80%]">
            <Routes>
              <Route path="/*" element={<h1>Admin dashboard</h1>}></Route>

              <Route path="manageusers" element={<CustomersPanel />}></Route>
              <Route
                path="manageappointment"
                element={<h1>Admin bookings</h1>}
              ></Route>
              <Route path="/*" element={<h1>Admin petprofile</h1>}></Route>
              <Route path="/*" element={<h1>Admin reviws</h1>}></Route>
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}
