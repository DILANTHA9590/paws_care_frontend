import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { TokenContext } from "../../utills/context/countContext";
import toast from "react-hot-toast";
import axios from "axios";

export default function MyBookings() {
  const { token } = useContext(TokenContext);
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      toast.error("Please sign in again");
      return;
    }

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setBookingData(res.data.bookings || []);
        setLoaded(true);
      })
      .catch((err) => {
        toast.error("Failed to load bookings. Please try again later.");
        console.error(err);
        setLoaded(true);
      });
  }, [token, navigate]);

  if (!loaded) {
    return (
      <div className="p-8 text-center text-lg text-purple-700 font-semibold animate-pulse">
        Loading bookings...
      </div>
    );
  }

  if (bookingData.length === 0) {
    return (
      <p className="p-8 text-center text-gray-400 italic text-lg">
        No bookings found.
      </p>
    );
  }

  // Utility to format status with badges and colors
  const StatusBadge = ({ status }) => {
    const colors = {
      confirm: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      cancelled: "bg-red-100 text-red-800",
      completed: "bg-blue-100 text-blue-800",
      default: "bg-gray-100 text-gray-700",
    };
    const colorClass = colors[status?.toLowerCase()] || colors.default;
    return (
      <span
        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${colorClass}`}
      >
        {status?.charAt(0).toUpperCase() + status?.slice(1)}
      </span>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-purple-700 tracking-wide">
        🗓️ My Bookings
      </h1>
      <ul className="space-y-6">
        {bookingData.map((booking) => (
          <li
            key={booking._id}
            className="border border-purple-300 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white"
          >
            <div className="flex flex-wrap justify-between items-center mb-4 gap-3">
              <h2 className="text-xl font-bold text-purple-900">
                Booking #{booking.bookingNumber}
              </h2>
              <StatusBadge status={booking.status} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
              <div>
                <p>
                  <strong>Booking ID:</strong>{" "}
                  <span className="text-purple-600">{booking.bookingId}</span>
                </p>
                <p>
                  <strong>Pet ID:</strong>{" "}
                  <span className="text-purple-600">{booking.petId}</span>
                </p>
                <p>
                  <strong>Doctor ID:</strong>{" "}
                  <span className="text-purple-600">{booking.doctorId}</span>
                </p>
              </div>

              <div>
                <p>
                  <strong>Mobile No:</strong>{" "}
                  <span className="text-purple-600">{booking.mobileno}</span>
                </p>
                <p>
                  <strong>Booked On:</strong>{" "}
                  <span className="text-purple-600">
                    {new Date(booking.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
