import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function DoctorOverview() {
  const [doctorDetails, setDoctorDetails] = useState("");
  const [doctorReview, settDoctorRiview] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .all([
        axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/doctors/getdoctordetails/${id}`
        ),
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/reviews/${id}`),
      ])
      .then(([doctorRes, reviewRes]) => {
        setDoctorDetails(doctorRes.data.doctor);
        settDoctorRiview(reviewRes.data.reviews);
      })
      .catch((error) => {
        console.error("Error fetching doctor or reviews:", error);
      });
  }, [id]);

  return (
    <div className="h-screen w-full flex flex-col">
      {/* Top Doctor Info Section */}
      <div className="h-[70%] flex flex-col md:flex-row sm:bg-amber-100 shadow-lg rounded-b-2xl overflow-hidden">
        <div className="flex-1 flex items-center justify-center p-6 ">
          <img
            src={doctorDetails.image}
            alt={doctorDetails.name}
            className="sm:w-172 sm:h-172 object-cover sm:rounded-2xl rounded-full shadow-md   w-72 h-72"
          />
        </div>
        <div className="flex-1 p-8 sm:bg-amber-50 flex flex-col justify-center text-amber-900 space-y-3">
          <h1 className="text-3xl font-bold">{doctorDetails.name}</h1>
          <p className="text-lg">🩺 {doctorDetails.specialization}</p>
          <p>🕒 Available: {doctorDetails.availableTime}</p>
          <p>📆 Days: {doctorDetails.availabledays}</p>
          <p>🎓 Experience: {doctorDetails.experience} Years</p>
          <p>⭐ Rating: {doctorDetails.rating}</p>
        </div>
      </div>

      {/* Bottom Review Section */}
      <div className="h-[30%] bg-amber-50 p-4 overflow-y-auto shadow-inner">
        <h2 className="text-2xl font-semibold text-amber-800 mb-3">
          Patient Reviews
        </h2>
        <div className="space-y-4">
          {doctorReview.map((val, index) => {
            const { reviewDate, customerId, rating, commnet } = val;
            return (
              <div key={index} className="bg-white p-3 rounded-lg shadow">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium text-gray-700">
                    {new Date(reviewDate).toDateString()} • {customerId}
                  </h3>
                  <div className="text-yellow-500 flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i}>{i < rating ? "★" : "☆"}</span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-1">{commnet}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
