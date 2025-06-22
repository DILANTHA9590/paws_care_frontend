import React from "react";

export default function ServerErr() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <svg
        className="w-24 h-24 text-red-600 mb-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>

      <h1 className="text-3xl font-bold text-red-700 mb-2">
        500 - Server Error
      </h1>
      <p className="text-gray-600 mb-4">
        Something went wrong on our end. Please try again later.
      </p>

      <button
        onClick={() => window.location.reload()}
        className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
      >
        Retry
      </button>
    </div>
  );
}
