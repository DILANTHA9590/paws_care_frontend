import React, { useContext, useEffect, useState } from "react";
import { TokenContext } from "../../utills/context/countContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../home_main/component/err_ui/Loading";
import { pre } from "framer-motion/client";
import toast from "react-hot-toast";

export default function DoctorPastAppointments() {
  const [bookings, setPastBookings] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { token } = useContext(TokenContext);
  const [maxDate, setMaxDate] = useState("");
  const [minDate, setMinDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    if (!loaded) {
      axios
        .get(
          `${import.meta.env.VITE_BACKEND_URL}/api/bookings/getpastbooking`,
          {
            params: {
              minRange: minDate,
              maxRange: maxDate,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          setPastBookings(res.data.doctorBookings || []);
          setLoaded(true);
        })
        .catch((err) => {
          console.error(err);
          setLoaded(true);
        });
    }
  }, [token, navigate, loaded]);

  return (
    <div className=" mx-auto p-6 h-full">
      <div className="flex   gap-4 mb-6 h-[30%] w-full  justify-center items-center flex-col">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">
          Past Appointments
        </h1>
        <div className="flex gap-x-3">
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Start Date</label>
            <input
              type="date"
              value={minDate}
              onChange={(e) => setMinDate(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">End Date</label>
            <input
              type="date"
              value={maxDate}
              onChange={(e) => setMaxDate(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            />
          </div>
        </div>
        <div className="flex justify-center items-center gap-x-6">
          <button
            onClick={() => {
              if (!maxDate || !minDate) {
                toast.error("Please select both start and end dates!");
                return;
              }
              setLoaded(false);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded self-end hover:bg-blue-700"
          >
            Filter
          </button>

          <button
            className=" text-white px-4 py-2 rounded self-end bg-black/35"
            onClick={() => {
              setLoaded(false);

              setMinDate("");
              setMaxDate("");
            }}
          >
            Reset
          </button>
        </div>
      </div>

      {loaded ? (
        bookings.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 border">Booking ID</th>
                <th className="p-2 border">Pet ID</th>
                <th className="p-2 border">Mobile</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Created At</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50">
                  <td className="p-2 border">{booking.bookingId}</td>
                  <td className="p-2 border">{booking.petId}</td>
                  <td className="p-2 border">{booking.mobileno}</td>
                  <td className="p-2 border">{booking.status}</td>
                  <td className="p-2 border">
                    {new Date(booking.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="h-[70%] bg-white flex justify-center items-center text-black font-bold">
            No bookings found for this range.
          </p>
        )
      ) : (
        <div className="h-[70%] flex justify-center items-center bg-white ">
          <Loading />
        </div>
      )}
    </div>
  );
}
