import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import Loading from "./err_ui/Loading";
import { motion } from "framer-motion";

export default function AllDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [todayDoctors, setTodayDoctors] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  function handleBookNow(doctorId) {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login before booking a doctor.");
      navigate("/login");
      return;
    }
    navigate("/book-doctor", { state: { doctorId } });
  }

  useEffect(() => {
    Promise.all([
      axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/doctors/getbookingpage`
      ),
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/doctors/getbydays`),
    ])
      .then(([bookingRes, todayRes]) => {
        setDoctors(bookingRes.data?.doctors || []);

        setTodayDoctors(todayRes.data.filteredDoctors || []);
        setLoaded(true);
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
        setLoaded(true);
      });
  }, []);

  const containerVariant = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <div className="h-full">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Our Full Team of Doctors
      </h2>

      {loaded ? (
        <motion.div initial="hidden" animate="show" variants={containerVariant}>
          {/* === All Doctors Section === */}
          <section className="mb-8 p-3">
            {doctors.length === 0 ? (
              <p className="text-center text-red-600">
                No doctors available at the moment.
              </p>
            ) : (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
                variants={containerVariant}
              >
                {doctors.map((doc) => (
                  <Link to={`/doctors/${doc.doctorId}`} key={doc._id}>
                    <motion.div
                      variants={cardVariant}
                      className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center text-center"
                      whileHover={{ scale: 1.03 }}
                    >
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
                    </motion.div>
                  </Link>
                ))}
              </motion.div>
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
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 cursor-pointer"
                variants={containerVariant}
                initial="hidden"
                animate="show"
              >
                {todayDoctors.map((doctor) => (
                  <motion.div
                    key={doctor._id}
                    variants={cardVariant}
                    className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center text-center"
                    whileHover={{ scale: 1.03 }}
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

                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-full text-sm"
                      onClick={() => handleBookNow(doctor.doctorId)}
                    >
                      Schedule Appointment
                    </motion.button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </section>
        </motion.div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
