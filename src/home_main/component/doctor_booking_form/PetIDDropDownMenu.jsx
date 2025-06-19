import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function PetIDDropDownMenu() {
  const [petData, setPetData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first");
      return;
    }

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/pets/getpetid`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPetData(res.data.petData || []);
        setLoaded(true);
      })
      .catch((err) => {
        console.log(err);
        setLoaded(true);
      });
  }, []);

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="absolute w-full bg-white border rounded-lg shadow-md z-50  -left-15 sm:left-0">
        {loaded ? (
          petData.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {petData.map((val) => (
                <li
                  key={val._id}
                  className="flex justify-between items-center px-4 py-3 hover:bg-blue-100 transition"
                >
                  <span className="font-semibold text-gray-700">
                    {val.petId}
                  </span>
                  <span className="text-sm text-gray-500">{val.name}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500 py-4 w-30">No pets found</p>
          )
        ) : (
          <p className="text-center text-gray-400 py-4">Loading...</p>
        )}
      </div>
    </div>
  );
}
