import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GrSearch } from "react-icons/gr";

export default function AdminBookingPanel() {
  const [bookingData, setBookingData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [page, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/bookings`, {
        params: {
          searchQuery: searchInput,
          page,
          limit: 10,
        },
      })
      .then((res) => {
        setBookingData(res.data.bookings || []);
        setTotalPages(res.data.totalPages || 1);
        setLoaded(true);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to fetch bookings.");
      });
  }, [searchInput, page]);

  return (
    <div className="h-[85vh] p-4 overflow-y-auto relative">
      {/* Search Input */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center border rounded px-3 py-2 w-72">
          <input
            type="text"
            placeholder="Search by booking ID or status"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              setLoaded(false);
            }}
            className="flex-grow outline-none"
          />
          <GrSearch className="text-xl text-gray-500" />
        </div>
      </div>

      {/* Loading Spinner or Table */}
      {!loaded ? (
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-16 h-16 border-4 border-white border-t-amber-300 rounded-full animate-spin" />
        </div>
      ) : bookingData.length <= 0 ? (
        <div className="w-full h-full flex justify-center items-center">
          <p>No Bookings Found</p>
        </div>
      ) : (
        <div className="rounded-lg shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                {[
                  "#",
                  "Booking ID",
                  "User ID",
                  "Pet ID",
                  "Mobile No",
                  "Doctor ID",
                  "Status",
                  "Confirmed",
                  "Created At",
                ].map((head, idx) => (
                  <th
                    key={idx}
                    className="px-4 py-2 text-left text-sm font-medium text-gray-600"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookingData.map((booking, index) => {
                const {
                  bookingId,
                  userId,
                  petId,
                  mobileno,
                  doctorId,
                  status,
                  isConfirm,
                  createdAt,
                  _id,
                } = booking;

                return (
                  <tr key={_id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {(page - 1) * 10 + index + 1}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {bookingId}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {userId}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">{petId}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {mobileno}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {doctorId}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700 capitalize">
                      {status}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {isConfirm ? "Yes" : "No"}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {new Date(createdAt).toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {
        <div className="flex justify-center gap-2 mt-4 absolute bottom-2 left-0 right-0">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded ${
                page === index + 1
                  ? "bg-amber-700 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
              onClick={() => {
                setCurrentPage(index + 1);
                setLoaded(false);
              }}
            >
              {index + 1}
            </button>
          ))}
        </div>
      }
    </div>
  );
}
