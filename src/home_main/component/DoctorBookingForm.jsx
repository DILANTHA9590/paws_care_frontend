import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function DoctorBookingForm() {
  const location = useLocation();
  const { doctorId } = location.state || {};

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
    console.log("llll");
    e.preventDefault();

    const name = "mobileno";
    const number = parseInt(bookingData.mobileno);

    if (isNaN(number) && bookingData.mobileno.length > 10) {
      setBookingData((prev) => {
        return { ...prev, [name]: "InValid Number" };
      });
    }
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pet ID
            </label>
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
              placeholder="07XXXXXXXX"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-xl transition duration-200"
            >
              Book Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
