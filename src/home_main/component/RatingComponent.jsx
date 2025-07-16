import React, { useContext, useState } from "react";
import { CiStar } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { TokenContext } from "../../utills/context/countContext";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router";

export default function RatingComponent({
  setShowRating,
  userData,
  setLoaded,
}) {
  // Get token from context
  const { token } = useContext(TokenContext);

  // Destructure doctor and user from props
  const { doctor, user, bookingId } = userData;

  // Local state for selected star index
  const [iindex, setIndex] = useState(1);

  const navigate = useNavigate();

  // Local state for form data
  const [ratingData, setRatingData] = useState({
    accept: true,
    bookingId: bookingId,
    doctorId: doctor,
    customerId: user,
    rating: iindex,
    comment: "ss",
  });

  // Submit review handler
  function handleSubmitReview(e) {
    e.preventDefault();

    if (!token) {
      toast.error("Please login first");
      setLoaded(true); // back to form
      return;
    }

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/reviews`, ratingData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success("Review submitted successfully");
      })
      .catch((err) => {
        toast.error("Failed to submit review");
      })
      .finally(() => {
        setLoaded(false);
        setShowRating(false);
      });
  }

  // Update form field values
  function setFieldData(e) {
    const { value, name } = e.target;
    setRatingData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center backdrop-blur-sm">
      <form
        className="max-w-md mx-auto p-6 bg-white rounded-lg shadow space-y-4"
        onSubmit={handleSubmitReview}
      >
        {/* Close button */}
        <div className="flex justify-end">
          <IoClose
            onClick={() => {
              setShowRating(false);
            }}
          />
        </div>

        {/* Doctor ID (disabled) */}
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

        {/* Customer ID (disabled) */}
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
            required
          />
        </div>

        {/* Star rating selector */}
        <div className="flex items-center justify-between w-full">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              onClick={() => {
                setIndex(index + 1);
                setRatingData((prev) => ({
                  ...prev,
                  rating: index + 1, // Update selected rating
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

        {/* Comment input */}
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
            onChange={setFieldData}
          ></textarea>
        </div>

        {/* Submit button */}
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
