import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { GrSearch } from "react-icons/gr";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

export default function AdminDoctors() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [page, setCurrentPage] = useState(1);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Access denied. Please log in as an Admin.");
      navigate("/login");
      return;
    }

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/doctors`, {
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
        console.log(res);
        setUserData(res.data?.userData || []);
        setTotalPages(res.data.totalPages || 1);
        setLoaded(true);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to fetch doctors.");
        setLoaded(true);
      });
  }, [searchInput, page, loaded]);

  //DELETE DOCTORS BY DOCTOR ID------------------------------------->
  function clickHandleDelete(doctorId) {
    setLoaded(false);
    console.log(doctorId);
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/api/doctors/${doctorId}`, {
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
      {/* Search & Add Doctor Button */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center border rounded px-3 py-2 w-72">
          <input
            type="text"
            placeholder="Search by name, email or type"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              setLoaded(false);
            }}
            className="flex-grow outline-none"
          />
          <GrSearch className="text-xl text-gray-500" />
        </div>
        <Link
          to="/admin/createdoctor"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          ADD DOCTOR +
        </Link>
      </div>

      {/* Loading Spinner */}
      {!loaded ? (
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-16 h-16 border-4 border-white border-t-amber-700 rounded-full animate-spin" />
        </div>
      ) : userData.length <= 0 ? (
        <div className="w-full h-full flex justify-center items-center">
          <p>No Doctors Found</p>
        </div>
      ) : (
        <div className="rounded-lg shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                {[
                  "#",
                  "Image",
                  "Name",
                  "Email",
                  "Doctor ID",
                  "Type",
                  "Verified",
                  "Edit",
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
              {userData.map((doctor, index) => {
                const { _id, image, email, name, doctorId, type, isverify } =
                  doctor;

                return (
                  <tr key={_id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {(page - 1) * 10 + index + 1}
                    </td>
                    <td className="px-4 py-2">
                      <img
                        src={image || "https://via.placeholder.com/40"}
                        alt="Doctor"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">{name}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{email}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {doctorId}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700 capitalize">
                      {type}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {isverify ? "Verified" : "Pending"}
                    </td>
                    <td className="px-4 py-2 text-sm text-blue-600 cursor-pointer">
                      <CiEdit size={20} />
                    </td>

                    {/* Delete button ----------------------------------------------------------------------> */}
                    <td className="px-4 py-2 text-sm text-red-600 cursor-pointer">
                      <MdDelete
                        size={20}
                        onClick={() => clickHandleDelete(_id)}
                      />
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
