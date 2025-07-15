import React, { useState } from "react";

import { CiStar } from "react-icons/ci";
import { IoClose } from "react-icons/io5";

export default function RatingComponent({ setShowRating, userData }) {
  console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk", userData);
  const { doctor, user } = userData;
  const [iindex, setIndex] = useState(1);
  const [ratingData, setRatingData] = useState({
    doctorId: doctor,
    customerId: user,
    rating: iindex,
    comment: "",
  });

  console.log(iindex);

  function o(e) {
    e.preventDefault();
    console.log(ratingData);
  }

  function setFieldData(e) {
    const { value, name } = e.target;

    setRatingData((prev) => ({ ...prev, [name]: value }));
  }
  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center  backdrop-blur-sm">
      <form
        className="max-w-md mx-auto p-6 bg-white rounded-lg shadow space-y-4"
        onSubmit={o}
      >
        {/* Accept */}
        <div className="flex justify-end">
          <IoClose
            onClick={() => {
              setShowRating(false);
            }}
          />
        </div>
        {/* Doctor ID */}
        <div>
          <label
            htmlFor="doctorId"
            className="block text-gray-700 font-medium mb-1"
          >
            Doctor ID
          </label>
          <input
            type="text"
            disabled
            value={doctor}
            id="doctorId"
            name="doctorId"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter Doctor ID"
            onChange={setFieldData}
            required
          />
        </div>

        {/* Customer ID */}
        <div>
          <label
            htmlFor="customerId"
            className="block text-gray-700 font-medium mb-1"
          >
            Customer ID
          </label>
          <input
            value={user}
            disabled
            type="text"
            id="customerId"
            name="customerId"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter Customer ID"
            setFieldData
            required
          />
        </div>

        {/* Rating */}
        <div className="flex items-center justify-between w-full">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              onClick={() => {
                setIndex(index + 1);
                setRatingData((prev) => ({
                  ...prev,
                  rating: index + 1, // ⭐️ state එකත් update කරන්න!
                }));
              }}
            >
              <CiStar
                size={28}
                className={`${
                  index < iindex ? "text-amber-500" : "text-gray-400"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Comment */}
        <div>
          <label
            htmlFor="comment"
            className="block text-gray-700 font-medium mb-1"
          >
            Comment
          </label>
          <textarea
            id="comment"
            name="comment"
            rows="4"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Write your comment..."
            required
            setFieldData
            onChange={setFieldData}
          ></textarea>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
}
