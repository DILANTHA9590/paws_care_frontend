import React, { useContext, useEffect, useState } from "react";
import { TokenContext } from "../../utills/context/countContext";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { MdDelete } from "react-icons/md"; // 🗑️ Import delete icon
import Loading from "../component/err_ui/Loading";

export default function PetMedicalRecord() {
  const [medicalData, setMedicalData] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const { token } = useContext(TokenContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { petId } = location.state;

  // 👉 When component mounts, check token + fetch medical records for this pet
  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    if (!loaded) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/medical/${petId}`)
        .then((res) => {
          setMedicalData(res.data.medicalHistory);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoaded(true);
        });
    }
  }, [token, loaded]);

  if (!loaded) {
    return <Loading />;
  }

  // 👉 Toggle the accordion open/close for each record
  const toggleAccordion = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  // 👉 Example delete handler (replace with your backend logic)
  const handleDelete = (id) => {
    console.log("Delete this record:", id);
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/api/medical/${id}`)
      .then((res) => {
        console.log(res);
        toast.success("Medical record removed successfully! 🗑️");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to remove record. Please try again.");
      })
      .finally(() => {
        setLoaded(false);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-amber-700 text-center">
        Medical Records - Happy Paws Care
      </h1>

      {medicalData.length === 0 ? (
        <p className="text-gray-600 text-center">
          No medical records found for this pet.
        </p>
      ) : (
        <div className="space-y-4 max-w-4xl mx-auto">
          {medicalData.map((record, index) => (
            <div
              key={record._id}
              className="bg-white shadow-md rounded-lg overflow-hidden border border-amber-300"
            >
              {/* 👉 Accordion Header - Click to open/close */}
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full text-left px-6 py-4 bg-amber-200 hover:bg-amber-300 transition-colors flex justify-between items-center"
              >
                <div>
                  <h2 className="text-xl font-semibold">
                    Visit:{" "}
                    {new Date(record.visitDate).toLocaleDateString("en-GB")}
                  </h2>
                  <p className="text-sm text-gray-700">
                    Doctor:{" "}
                    <span className="font-medium">{record.doctorId}</span>
                  </p>
                </div>
                <span className="text-2xl">
                  {openIndex === index ? "-" : "+"}
                </span>
              </button>

              {/* 👉 Accordion Content - Open section */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 py-4 bg-white"
                  >
                    <p className="mb-2">
                      <span className="font-semibold">Diagnosis:</span>{" "}
                      {record.diagnosis}
                    </p>

                    {/* Treatment List */}
                    {record.treatment && record.treatment.length > 0 && (
                      <div className="mb-2">
                        <h3 className="font-semibold">Treatment:</h3>
                        <ul className="list-disc list-inside">
                          {record.treatment.map((treat, i) => (
                            <li key={i}>{treat}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Prescription List */}
                    {record.prescription && record.prescription.length > 0 && (
                      <div className="mb-2">
                        <h3 className="font-semibold">Prescription:</h3>
                        <ul className="list-disc list-inside">
                          {record.prescription.map((pres, i) => (
                            <li key={i} className="text-sm">
                              <span className="font-medium">Medicine:</span>{" "}
                              {pres.medicine} |
                              <span className="font-medium"> Dosage:</span>{" "}
                              {pres.dosage} |
                              <span className="font-medium"> Duration:</span>{" "}
                              {pres.duration} |
                              <span className="font-medium">
                                {" "}
                                Instructions:
                              </span>{" "}
                              {pres.instructions}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Next Visit */}
                    {record.nextVisit && (
                      <p>
                        <span className="font-semibold">Next Visit:</span>{" "}
                        {new Date(record.nextVisit).toLocaleDateString("en-GB")}
                      </p>
                    )}

                    {/* 👉 Delete Button */}
                    <button
                      onClick={() => handleDelete(record._id)}
                      className="mt-4 flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    >
                      <MdDelete size={20} /> Remove Record
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
