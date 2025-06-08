import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GrSearch } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

export default function ManageReviews() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [reviewData, setReviewData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setCurrentPage] = useState(1);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Access denied. Please log in as an Admin.");
      navigate("/login");
      return;
    }

    setLoaded(false);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/reviews`, {
        params: {
          searchQuery: searchInput,
          page: page,
          limit: 10,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setReviewData(res.data.reviews || []);
        setTotalPages(res.data.totalPages || 1);
        setLoaded(true);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to fetch reviews.");
      });
  }, [searchInput, page]);

  return (
    <div className="h-[85vh] p-4 overflow-y-auto relative">
      {/* Search Bar */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center border rounded px-3 py-2 w-72">
          <input
            type="text"
            placeholder="Search by comment or customer ID"
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

      {/* Loading Spinner */}
      {!loaded ? (
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-16 h-16 border-4 border-white border-t-amber-300 rounded-full animate-spin" />
        </div>
      ) : reviewData.length <= 0 ? (
        <div className="w-full h-full flex justify-center items-center">
          <p>No Reviews Found</p>
        </div>
      ) : (
        <div className="rounded-lg shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                {[
                  "#",
                  "Customer ID",
                  "Doctor ID",
                  "Rating",
                  "Stars",
                  "Review Date",
                  "Comment",
                  "reviews Access",
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
              {reviewData.map((review, index) => {
                const {
                  _id,
                  doctorId,
                  customerId,
                  rating,
                  reviewDate,
                  comment,
                  accept,
                } = review;

                return (
                  <tr key={_id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {(page - 1) * 10 + index + 1}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {customerId}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {doctorId}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {rating}
                    </td>
                    <td className="px-4 py-2 text-sm text-yellow-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i}>{i < rating ? "★" : "☆"}</span>
                      ))}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {reviewDate}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {comment}
                    </td>

                    <td
                      className={`px-4 py-2 text-sm text-black  text-center font-bold rounded-4xl  ${
                        accept ? " bg-green-600" : "bg-red-300"
                      }`}
                    >
                      {accept ? "accept" : "decline"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {!searchInput && loaded && totalPages > 1 && (
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
      )}
    </div>
  );
}
