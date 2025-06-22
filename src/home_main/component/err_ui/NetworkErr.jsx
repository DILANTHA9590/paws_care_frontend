import React from "react";

export default function NetworkErr() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <img
        src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
        alt="No Internet"
        className="w-32 h-32 mb-4 opacity-70"
      />
      <h1 className="text-2xl font-semibold text-red-600">Network Error</h1>
      <p className="text-gray-600 mt-2">
        We’re unable to connect to the server. Please check your internet
        connection and try again.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
      >
        Retry
      </button>
    </div>
  );
}
