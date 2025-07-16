import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useLocation } from "react-router";

export default function VerifyEmailForm() {
  // Get email passed from previous page
  const location = useLocation();
  const { email } = location.state;

  // State for email, OTP input, and loading spinner
  const [userEmail, setUserEmail] = useState(email);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle verify button click
  const handleVerify = async (e) => {
    e.preventDefault();
    setIsLoading(true); // start loading

    // Call backend API to verify OTP
    const res = await axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/otp/verify`, {
        email: userEmail,
        otp: otp,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false); // always stop loading
      });
  };

  // Handle resend OTP click
  function handleResendOtp() {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/otp`, {
        email: email,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false); // always stop loading
      });
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-full max-w-sm">
        {/* Title */}
        <h2 className="text-xl font-bold mb-2 text-center">
          Verify Your Email
        </h2>

        {/* Info text */}
        <p className="text-gray-600 text-sm mb-4">
          We have sent a 6-digit OTP to your email. The code is valid for{" "}
          <span className="font-semibold text-blue-600">1 minute only</span>.
        </p>

        {/* Verify form */}
        <form onSubmit={handleVerify} className="space-y-4">
          {/* Email input (disabled) */}
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              value={userEmail}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* OTP input */}
          <div>
            <label className="block text-sm mb-1">Enter OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP here"
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          {/* Verify button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? "Verifying..." : "Verify"}
          </button>

          {/* Resend OTP */}
          <h1 className="text-center text-blue-600" onClick={handleResendOtp}>
            Resend Otp
          </h1>
        </form>
      </div>
    </div>
  );
}
