import React, { useContext, useEffect, useState } from "react";
import { TokenContext } from "../../utills/context/countContext";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import axios from "axios";

export default function MyBookings() {
  const { token } = useContext(TokenContext);
  const [loading, setLoading] = useState(false);
  const [bookingData, setBookingData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
      toast.error("Please Sign In Again");
      return;
    }

    setLoading(true);

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/bookings/doctor`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setBookingData(res.data.doctorBookings || []);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to fetch bookings");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>

      {loading ? (
        <p>Loading...</p>
      ) : bookingData.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">Booking ID</th>
              <th className="border p-2">Pet ID</th>
              <th className="border p-2">User ID</th>
              <th className="border p-2">Booking Number</th>

              <th className="border p-2">Mobile No</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Created At</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {bookingData.map((booking) => (
              <tr key={booking._id}>
                <td className="border p-2">{booking.bookingId}</td>
                <td className="border p-2">{booking.petId}</td>
                <td className="border p-2">{booking.userId}</td>
                <td className="border p-2">{booking.bookingNumber}</td>
                <td className="border p-2">{booking.mobileno}</td>
                <td className="border p-2">{booking.status}</td>

                <td className="border p-2">
                  {new Date(booking.createdAt).toLocaleString()}
                </td>

                <td className="border p-2">
                  <button
                    onClick={() => {
                      navigate("/doctor/updatemedicalhistory", {
                        state: {
                          petId: booking.petId,
                          doctorId: booking.doctorId,
                        },
                      });
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                  >
                    Add Medical Record
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
