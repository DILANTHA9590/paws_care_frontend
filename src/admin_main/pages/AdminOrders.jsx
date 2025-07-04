import React, { useContext, useEffect, useState } from "react";
import { TokenContext } from "../../utills/context/countContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import axios from "axios";
import { GrSearch } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { text } from "framer-motion/client";
export default function AdminOrders() {
  const { token } = useContext(TokenContext);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [page, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!token) {
      toast.error("Unauthorized Access");
      navigate("/login");
      return;
    }

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/admin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          searchQuery: searchInput,
          page: page,
          limit: 10,
        },
      })
      .then((res) => {
        setOrders(res.data.data || []);
        setTotalPages(res.data.meta?.totalPages || 1);
        setLoaded(true);
        console.log(res);
      })
      .catch((err) => {
        setLoaded(true);
      });
  }, [searchInput, page, token, loaded]);

  function handleDelete(orderId) {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="h-[85vh] p-4 overflow-y-auto relative">
      {/* Search Bar */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center border rounded px-3 py-2 w-72">
          <input
            type="text"
            placeholder="Search by Order ID"
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
      ) : orders.length == 0 ? (
        <div className="w-full h-full flex justify-center items-center">
          <p>No Orders Found</p>
        </div>
      ) : (
        <div className="rounded-lg shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                {[
                  "#",
                  "Order ID",
                  "Name",
                  "Email",
                  "Mobile",
                  "Address",
                  "Date",
                  "Status",
                  "Total",
                  "Delete",
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
              {orders.map((order, index) => {
                const {
                  orderId,
                  name,
                  email,
                  mobileNumber,
                  address,
                  date,
                  status,
                  totalPrice,
                } = order;

                return (
                  <tr key={orderId} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {(page - 1) * 10 + index + 1}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {orderId}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">{name}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{email}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {mobileNumber}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {address}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {new Date(date).toLocaleDateString()}
                    </td>
                    <td
                      className={`px-4 py-2 text-sm capitalize ${
                        status === "Pending"
                          ? "text-amber-500"
                          : status === "payment_fail"
                          ? "text-red-600"
                          : "text-green-500"
                      }`}
                    >
                      {status}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      ${totalPrice}
                    </td>

                    {/* order delete button ------------------------------------------------------------------------------------------------------> */}
                    <td
                      className={`px-4 py-2 text-sm text-red-600 cursor-pointer `}
                      onClick={() => {
                        handleDelete(orderId);
                        setLoaded(false);
                      }}
                    >
                      <MdDelete size={20} />
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
