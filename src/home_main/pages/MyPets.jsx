import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { TokenContext } from "../../utills/context/countContext";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import axios from "axios";
import Loading from "../component/err_ui/Loading";
import CreatePetForm from "../component/CreatePetForm";
import NetworkErr from "../component/err_ui/NetworkErr";
import ServerErr from "../component/err_ui/ServerErr";

export default function MyPets() {
  const { token } = useContext(TokenContext);
  const [loaded, setLoaded] = useState(false);
  const [pets, setPets] = useState([]);
  const [ShowAddPet, setShowAddPet] = useState(false);
  const navigate = useNavigate();
  const [err, setErr] = useState();

  useEffect(() => {
    // ✅ Check auth and redirect if no token
    if (!token) {
      navigate("/login");
      toast.error("Please login again");
      return;
    }

    // ✅ Fetch pet data
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/pets/mypets`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPets(res.data?.petData || []);
        setLoaded(true);
      })
      .catch((err) => {
        toast.error("Please try again later");
        if (err.status) {
          setErr(err.status);
        } else {
          setErr("network");
        }
      });
  }, [loaded]);

  // ✅ Show server errors
  if ([400, 500, 404, 403].includes(err)) {
    return <ServerErr />;
  }

  // ✅ Show network errors
  if (err === "network") {
    return <NetworkErr />;
  }

  // ✅ Delete pet handler
  function handleDeletePet(petId) {
    setLoaded(false);
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/api/pets/${petId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success("Pet deleted successfully");
        setLoaded(false); // re-fetch
      })
      .catch((err) => {
        toast.error("Failed to delete pet");
        console.error(err);
      });
  }

  // ✅ Motion variants for grid & card animation
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="h-full">
      {/* ✅ Add Pet toggle button */}
      <div
        className="flex justify-end "
        onClick={() => setShowAddPet(!ShowAddPet)}
      >
        <button className="inline-flex items-center gap-2 px-5 py-3 bg-purple-400 text-white text-lg font-semibold rounded-full shadow-md hover:bg-purple-700 hover:shadow-lg transition-all duration-300 ">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Pet
        </button>
      </div>

      {/* ✅ Show Add Form or Pet List */}
      {!ShowAddPet ? (
        <div className="h-full p-8 bg-gradient-to-br from-blue-50 to-white ">
          {!loaded ? (
            // ✅ Show spinner
            <div className="h-full ">
              <Loading />
            </div>
          ) : pets.length > 0 ? (
            // ✅ Show pets grid with motion
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
              variants={container}
              initial="hidden"
              animate="visible"
            >
              {pets.map((pet) => (
                <motion.div
                  key={pet._id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col transition-transform duration-300 hover:shadow-2xl"
                  variants={item}
                  whileHover={{ scale: 1.04 }}
                >
                  {/* ✅ Pet image */}
                  <div className="aspect-w-16 aspect-h-10">
                    <img
                      src={pet.image}
                      alt={pet.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* ✅ Pet details */}
                  <div className="p-6 flex flex-col flex-1">
                    <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                      {pet.name}
                    </h2>
                    <p className="text-gray-600 mb-1">🐾 Breed: {pet.breed}</p>
                    <p className="text-gray-600 mb-1">
                      🎂 Age: {pet.age} years
                    </p>
                    <p className="text-gray-600 mb-1">
                      🚻 Gender: {pet.gender}
                    </p>
                    <p className="text-gray-600 mb-4">
                      ⚖️ Weight: {pet.weight} kg
                    </p>

                    {/* ✅ Action buttons */}
                    <div className="mt-auto flex flex-col gap-2">
                      <button className="w-full py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Edit Details
                      </button>
                      <button
                        className="w-full py-2 bg-red-400 text-white rounded-lg hover:bg-red-600 transition-colors"
                        onClick={() => {
                          handleDeletePet(pet.petId);
                        }}
                      >
                        Remove Pet
                      </button>
                      <button className="w-full py-2 bg-green-400 text-white rounded-lg hover:bg-green-700 transition-colors">
                        View Medical Records
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            // ✅ No pets message
            <p className="text-center text-gray-500">No pets found.</p>
          )}
        </div>
      ) : (
        // ✅ Show Add Pet form with fade-in
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <CreatePetForm setLoaded={setLoaded} setShowAddPet={setShowAddPet} />
        </motion.div>
      )}
    </div>
  );
}
