import axios from "axios";
import { div, h1, tr } from "framer-motion/client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { GrSearch } from "react-icons/gr";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
export default function CustomersPanel() {
  const navigate = useNavigate();
  const [loaded, setloaded] = useState(false);
  console.log("my loaded", loaded);
  const [searchinput, setSearchInput] = useState();
  const [totalPage, setTotalPages] = useState();
  const [page, setCurruntPage] = useState();
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Check if token exists
    if (!token) {
      toast.error("Access denied. Please log in as an Admin.");

      navigate("/login");
      return;
    }

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/users`, {
        params: {
          searchQuery: searchinput,
          page: page,
          limit: 10,
        },

        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUserData(res.data.users);
        setloaded(true);
        setTotalPages(res.data.totalPages);
        console.log("dataaaaaaaa", res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchinput, loaded]);

  if (!loaded) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-[100px] h-[100px] border-6 rounded-full border-t-amber-300 border-t-4 border-white animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <div className="h-[85vh] p-4  overflow-hidden overflow-y-auto relative ">
        <div className="flex  justify-between items-center">
          <div className="flex items-center mb-4 w-2xl border">
            <input
              type="text"
              placeholder="Search by name or email"
              value={searchinput}
              onChange={(e) =>
                setSearchInput(e.target.value) || setloaded(false)
              }
              className="border-none rounded px-4 py-2 w-64  focus:outline-none flex grow"
            />
            <GrSearch className="text-3xl font-bold" />
          </div>
          <div>
            <Link className="bg-green-500 px-4 py-2 mb-4">ADD USER +</Link>
          </div>
        </div>
        {userData.length > 0 ? (
          <div className="  rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200 bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                    #
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                    Image
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                    Name
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                    Email
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                    disable
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                    WhatsApp
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                    Type
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                    Verified
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                    Edit
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {userData.map((user, index) => {
                  const {
                    image,
                    email,

                    disabled,
                    firstName,
                    lastName,
                    isverify,
                    type,
                    whatsApp,
                  } = user;
                  return (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 text-sm text-gray-700">
                        {index + 1}
                      </td>
                      <td className="px-4 py-2">
                        <img
                          src={image || "https://via.placeholder.com/40"}
                          alt="User"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-700">
                        {firstName} {lastName}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-700">
                        {email}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-700">
                        {disabled ? " Block 🔴" : "UnBlock🟢"}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-700">
                        {whatsApp}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-700 capitalize">
                        {type}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-700">
                        {isverify ? (
                          <span className="text-green-600 font-medium">
                            Yes ✅
                          </span>
                        ) : (
                          <span className="text-red-500 font-medium">
                            No ❌
                          </span>
                        )}
                      </td>
                      <td>
                        <button className="px-4 py-2 text-sm text-gray-700">
                          <CiEdit className="text-2xl" />
                        </button>
                      </td>

                      <td>
                        <button className="px-4 py-2 text-sm text-gray-700">
                          <MdDelete className="text-2xl" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No users found.</p>
        )}

        {
          <div className="flex w-full justify-center grow absolute bottom-0 gap-x-3 p-2">
            {Array.from({ length: totalPage }).map((_, index) => {
              return (
                <div
                  className="bg-amber-700 p-10 "
                  onClick={() => setCurruntPage(index + 1) || setloaded(false)}
                  key={index}
                >
                  {index + 1}
                </div>
              );
            })}
          </div>
        }
      </div>
    </>
  );
}
