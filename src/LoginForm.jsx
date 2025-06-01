import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { data, useNavigate } from "react-router";

export default function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("lll");
  const [password, setPassword] = useState("");

  useEffect(() => {}, []);
  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      if (!email) toast.error("Email is required");
      if (!password) toast.error("Password is required");
      return;
    }

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, {
        email,
        password,
      })
      .then((res) => {
        //set token local storage
        localStorage.setItem("token", res.data.token || "");

        // const token = localStorage.getItem("token");

        toast.success(res.data?.message || "Login successfully");

        const { type } = res.data.payload;

        // Check user type and navigate to the correct authorized dashboard
        if (type == "admin") {
          navigate("/admin/");
        } else if (type == "doctor") {
          navigate("");
        } else if (type == "customer") {
          navigate("/");
        } else {
          toast.error("Unknown user type. Please contact support.");
          navigate("/login");
        }
      })
      .catch((error) => {
        toast.error("error", error.response?.data?.message || "Login failed");
      });
  };

  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <div className="sm:w-[25%]">
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-y-7 border p-6 rounded h-[40vh] justify-center">
              <h1 className="text-center">Login Form</h1>
              <input
                type="email"
                value={email}
                className="border p-4"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // මෙතන password line එකේ typing error එකක් තිබ්බා
                className="border p-4"
                required
              />
              <button type="submit" className="block">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
