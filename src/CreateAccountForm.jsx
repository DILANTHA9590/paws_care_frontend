import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";

export default function CreateAccountForm() {
  const navigate = useNavigate();

  // State to toggle password visibility
  const [showPassword, setshowPassword] = useState(false);

  // State to handle loading spinner during form submission
  const [isLoading, setIsLoading] = useState(false);

  // Form data state to store user input values
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    whatsApp: "",
  });

  // Handle changes in form input fields dynamically
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission when user clicks register
  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit
    setIsLoading(true); // Show loading spinner

    // Destructure fields from formData for validation
    const { email, password, firstName, lastName, whatsApp } = formData;

    // Basic validation to check if all fields are filled
    if (!email || !password || !firstName || !lastName || !whatsApp) {
      toast.error("Please fill in all fields");
      setIsLoading(false); // Stop loading if validation fails
      return;
    }

    // Make API call to create a new user account
    await axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/users`, {
        email,
        password,
        firstName,
        lastName,
        whatsApp,
        type: "customer",
      })
      .then((res) => {
        // Show success toast message
        toast.success(res.data?.message || "Account created successfully");
        // Navigate to login page after successful registration
        navigate("/verifyemail", {
          state: {
            email: formData.email,
          },
        });
      })
      .catch((err) => {
        // Show error toast message if registration fails
        toast.error(err.response?.data?.message || "Registration failed");
      })
      .finally(() => {
        setIsLoading(false); // Hide loading spinner regardless of success or failure
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-8">
            {/* Form header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">
                Create Account
              </h1>
              <p className="text-gray-600 mt-2">
                Join us today! Please fill out the form.
              </p>
            </div>

            {/* Registration form */}
            <form onSubmit={handleRegister} className="space-y-6">
              {/* First Name input */}
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  First Name
                </label>
                <input
                  autoFocus
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                  placeholder="John"
                  required
                />
              </div>

              {/* Last Name input */}
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                  placeholder="Doe"
                  required
                />
              </div>

              {/* Email input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                  placeholder="your@email.com"
                  required
                />
              </div>

              {/* Password input with toggle for show/hide */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1 flex justify-between items-center"
                >
                  <span>Password</span>
                  <button
                    type="button"
                    onClick={() => setshowPassword(!showPassword)}
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaRegEye />}
                  </button>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                  placeholder="••••••••"
                  required
                />
              </div>

              {/* WhatsApp Number input */}
              <div>
                <label
                  htmlFor="whatsApp"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  WhatsApp Number
                </label>
                <input
                  type="text"
                  id="whatsApp"
                  name="whatsApp"
                  value={formData.whatsApp}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                  placeholder="07XXXXXXXX"
                  required
                />
              </div>

              {/* Submit button with disabled state and loading text */}
              <button
                type="submit"
                disabled={isLoading} // Disable button during loading
                className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 transform hover:scale-[1.01] ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Creating your account..." : "Create Account"}
              </button>
            </form>

            {/* Link to login page for existing users */}
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Already have an account?{" "}
                <Link
                  to={"/login"}
                  className="text-indigo-600 hover:text-indigo-500 font-medium"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>

          {/* Terms of service and privacy policy links */}
          <div className="bg-gray-50 px-8 py-4 text-center">
            <p className="text-gray-600 text-xs">
              By signing up, you agree to our{" "}
              <Link
                to={"https://policies.google.com/privacy"}
                className="text-indigo-600 hover:text-indigo-500 font-medium"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to={"https://policies.google.com/terms"}
                className="text-indigo-600 hover:text-indigo-500 font-medium"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
