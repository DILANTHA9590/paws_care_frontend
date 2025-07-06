import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { TokenContext } from "../../utills/context/countContext";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import axios from "axios";
import Loading from "../component/err_ui/Loading";
import CreatePetForm from "../component/CreatePetForm";

export default function MyPets() {
  const { token } = useContext(TokenContext);
  const [loaded, setLoaded] = useState(false);
  const [pets, setPets] = useState([]);
  const [ShowAddPet, setShowAddPet] = useState(false);
  const navigate = useNavigate();
  const [err, setErr] = useState();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      toast.error("Please login again");
      return;
    }

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

  if ([400, 500, 404, 403].includes(err)) {
    <Net />;
  }
  return (
    <div className="h-full">
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

      {!ShowAddPet ? (
        <div className="h-full p-8 bg-gradient-to-br from-blue-50 to-white ">
          {!loaded ? (
            <div className="h-full ">
              <Loading />
            </div>
          ) : pets.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {pets.map((pet) => (
                <motion.div
                  key={pet._id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col transition-transform duration-300 hover:shadow-2xl"
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="aspect-w-16 aspect-h-10">
                    <img
                      src={pet.image}
                      alt={pet.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
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

                    <div className="mt-auto flex flex-col gap-2">
                      <button className="w-full py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Edit Details
                      </button>
                      <button className="w-full py-2 bg-red-400 text-white rounded-lg hover:bg-red-600 transition-colors">
                        Remove Pet
                      </button>
                      <button className="w-full py-2 bg-green-400 text-white rounded-lg hover:bg-green-700 transition-colors">
                        View Medical Records
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No pets found.</p>
          )}
        </div>
      ) : (
        <CreatePetForm setLoaded={setLoaded} setShowAddPet={setShowAddPet} />
      )}
    </div>
  );
}
