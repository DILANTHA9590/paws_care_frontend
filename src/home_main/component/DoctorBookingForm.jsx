import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import PetDataDropDown from "./bookingComponent/PetDataDropDown";
import axios from "axios";
import toast from "react-hot-toast";

export default function DoctorBookingForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { doctorId } = location.state || {};
  const [errMobNo, setErrMobNo] = useState(false);
  const [showmenu, setShowmenu] = useState(false);

  const [bookingData, setBookingData] = useState({
    doctorId: doctorId,
    petId: "",
    mobileno: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setBookingData((prev) => {
      return { ...prev, [name]: value };
    });

    // Send to API or validate
  };

  function handleSubmit(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      navigate("/login");
    }

    const name = "mobileno";
    const number = parseInt(bookingData.mobileno);

    //check is valid mobile no
    if (isNaN(number) && bookingData.mobileno.length > 10) {
      setBookingData((prev) => {
        return { ...prev, [name]: "" };
      });

      setErrMobNo(true);
    }

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/bookings`, bookingData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="h-full bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Book Appointment
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Doctor ID (readonly display) */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Doctor ID
            </label>
            <input
              type="text"
              name="doctorId"
              value={doctorId}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-gray-100 text-gray-600"
            />
          </div>

          {/* Pet ID */}
          <div>
            <div className="flex items-center justify-between h-[40px] relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pet ID
              </label>

              <div className="flex  gap-x-3 items-center relative h-full p-7">
                <h1>Need Help Finding Pet ID</h1>
                <h1 className="text-green-700 ">
                  {" "}
                  <FaPlus
                    onClick={() => setShowmenu(!showmenu)}
                    className="relative"
                  />
                </h1>
              </div>

              {showmenu && (
                <div className="absolute bottom-0 right-0 ">
                  <PetDataDropDown />
                </div>
              )}
            </div>

            <input
              type="text"
              name="petId"
              value={bookingData.petId}
              onChange={handleChange}
              placeholder="Enter your Pet ID"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number
            </label>
            <input
              type="text"
              name="mobileno"
              value={bookingData.mobileno}
              onChange={handleChange}
              placeholder={`  ${errMobNo ? "Invalid Number" : "07XXXXXXXX"} `}
              className={`w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none ${
                errMobNo ? "text-red-700" : "text-black"
              }`}
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-xl transition duration-200`}
            >
              Book Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
