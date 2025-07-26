import axios from "axios";
import React, { useState, useContext } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { TokenContext } from "./utills/context/countContext";

export default function LoginForm() {
  const { token, setToken } = useContext(TokenContext);

  const navigate = useNavigate();

  // Local state for email and password inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Loading state to disable button and show message
  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission (login)
  const handleLogin = (e) => {
    e.preventDefault();

    // Validate inputs
    if (!email || !password) {
      if (!email) toast.error("Email is required");
      if (!password) toast.error("Password is required");
      return;
    }

    setIsLoading(true); // Start loading

    // Send login request
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, {
        email,
        password,
      })
      .then((res) => {
        setToken(res.data.token); // Set token in context
        localStorage.setItem("token", res.data.token || ""); // Save token in localStorage

        toast.success(res.data?.message || "Login successfully");

        const { type } = res.data.payload;

        // Navigate user based on their role
        if (type === "admin") {
          navigate("/admin/", {
            state: { ...res.data.payload },
          });
        } else if (type === "doctor") {
          navigate("/doctor/");
        } else if (type === "customer") {
          navigate("/");
        } else {
          toast.error("Unknown user type. Please contact support.");
          navigate("/login");
        }
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Login failed");
      })
      .finally(() => {
        setIsLoading(false); // Stop loading in any case
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
              <p className="text-gray-600 mt-2">Sign in to your account</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <input
                  autoFocus
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                  placeholder="your@email.com"
                  required
                />
              </div>

              {/* Password Input */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                  placeholder="••••••••"
                  required
                />
              </div>

              {/* Submit Button with loading */}
              <button
                type="submit"
                disabled={isLoading} // disable while loading
                className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 transform hover:scale-[1.01] ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            {/* Forgot password link */}
            <div className="mt-6 text-center">
              <a
                href="#"
                className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
              >
                Forgot password?
              </a>
            </div>
          </div>

          {/* Signup link */}
          <div className="bg-gray-50 px-8 py-4 text-center">
            <p className="text-gray-600 text-sm">
              Don't have an account?{" "}
              <Link
                className="text-indigo-600 hover:text-indigo-500 font-medium"
                to={"/createaccount"}
              >
                {" "}
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
