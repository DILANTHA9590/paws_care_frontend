import axios from "axios";
import { div } from "framer-motion/client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";

export default function AllDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [todayDoctors, setTodayDoctors] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  console.log(todayDoctors);

  function handleBookNow(doctorId) {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login before booking a doctor.");
      navigate("/login");
      return;
    }

    navigate("/book-doctor", {
      state: {
        doctorId,
      },
    });
  }

  useEffect(() => {
    Promise.all([
      axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/doctors/getbookingpage`
      ),
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/doctors/getbydays`),
    ])
      .then(([bookingRes, todayRes]) => {
        setDoctors(bookingRes.data.doctors);
        setTodayDoctors(todayRes.data.filteredDoctors);

        setLoaded(true);
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
        setLoaded(true);
      });
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Our Full Team of Doctors
      </h2>

      {/* === All Doctors Section === */}

      <section className="mb-8 p-3">
        {!loaded ? (
          <p className="text-center text-gray-600">Loading doctors...</p>
        ) : doctors.length === 0 ? (
          <p className="text-center text-red-600">
            No doctors available at the moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {doctors.map((doc, index) => (
              <Link to={`/doctor/${doc.doctorId}`} key={doc._id}>
                <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center text-center">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-24 h-24 rounded-full object-cover mb-3"
                  />
                  <h3 className="font-semibold text-lg">{doc.name}</h3>
                  <p className="text-sm text-gray-600">
                    {Array.isArray(doc.specialization)
                      ? doc.specialization.join(", ")
                      : doc.specialization}
                  </p>
                  <p className="text-sm">{doc.availabledays}</p>
                  <p className="text-sm mt-1">🕒 {doc.availableTime}</p>
                  <p className="text-sm">⭐ {doc.rating} / 5</p>
                  <p className="text-sm text-gray-500">
                    {doc.experience} years experience
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* === Today's Available Doctors Section === */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-center text-green-700">
          Book a Vet Available Today
        </h2>

        {todayDoctors.length === 0 ? (
          <p className="text-center text-gray-600">
            No doctors available today.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            {todayDoctors.map((doctor) => (
              <div
                key={doctor._id}
                className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center text-center"
              >
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-24 h-24 rounded-full mb-2 object-cover"
                />
                <h2 className="text-xl font-semibold">{doctor.name}</h2>
                <p className="text-sm text-gray-500 mb-1">
                  {doctor.specialization[0]}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  🗓️ {doctor.availabledays}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  🕒 {doctor.availableTime}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  👨‍⚕️ {doctor.experience}+ Years
                </p>

                <button
                  className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-full text-sm cursor-default"
                  onClick={() => handleBookNow(doctor.doctorId)}
                >
                  Schedule Appointment
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
