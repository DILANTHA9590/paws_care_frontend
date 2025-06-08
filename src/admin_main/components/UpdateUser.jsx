import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";

export default function UpdateUser() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    email = "",
    firstName = "",
    lastName = "",
    type = "",
    whatsappNo = "",
  } = location?.state;

  const [updateData, setUpdateData] = useState({
    email: email,
    firstName: firstName,
    lastName: lastName,
    type: type,
    whatsApp: whatsappNo,
  });

  //click button update user ---------------------------------->
  function handleSubmit(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    if (type != updateData.type) {
      const confirmed = window.confirm(
        "Are you sure you want to change user type?"
      );

      if (confirmed) {
      } else {
        setUpdateData((prev) => ({ ...prev, ["type"]: type }));
        return;
      }
    }
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${updateData.email}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      .then((res) => {
        navigate("/admin/manageusers");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // set value usestate object----------------------------------------------->
  function handleChange(e) {
    const { name, value } = e.target;

    setUpdateData((prev) => ({ ...prev, [name]: value }));
  }
  return (
    <>
      <div className="h-full bg-gray-100 flex items-center justify-center px-4">
        <div
          className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md h-[700px] flex
         flex-col gap-y-20"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Update User
          </h2>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 flex flex-col gap-y-5"
          >
            <input
              type="email"
              required="true"
              name="email"
              disabled
              value={updateData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              required="true"
              name="firstName"
              value={updateData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              name="lastName"
              value={updateData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />

            <input
              type="text"
              name="type"
              value={updateData.type}
              onChange={handleChange}
              placeholder="User Type"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              name="whatsApp"
              value={updateData.whatsApp}
              onChange={handleChange}
              placeholder="WhatsApp Number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Update User
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
