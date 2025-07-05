import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { TokenContext } from "../../utills/context/countContext";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import axios from "axios";
import Loading from "../component/err_ui/Loading";
import { div } from "framer-motion/client";
import { uploadImageToCloudinary } from "../../utills/uploadImageCloudinary";

export default function MyPets() {
  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    age: "",
    gender: "",
    weight: "",
    type: "",
    image: "",
  });
  const [isUploading, setIsUploading] = useState(false);
  const { token } = useContext(TokenContext);
  const [loaded, setLoaded] = useState(false);
  const [pets, setPets] = useState([]);
  const [ShowAddPet, setShowAddPet] = useState(false);
  const [image, addImage] = useState("");
  const navigate = useNavigate();

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
        console.log(err);
      });
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const setImageUrl = async (e) => {
    setIsUploading(true);

    const files = e.target.files;

    const imageUrl = [];
    for (let i = 0; i < files.length; i++) {
      const url = await uploadImageToCloudinary(files[i]);
      imageUrl.push(url);
    }

    addImage(imageUrl[0]);

    setFormData((prev) => ({
      ...prev,
      image: imageUrl.toString(),
    }));
    setIsUploading(false);

    toast.success("Image uploaded");
  };

  function handleAddPet(e) {
    e.preventDefault();
    console.log(formData);
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
        <div className="h-full">
          <form
            className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-5"
            onSubmit={handleAddPet}
          >
            <h2 className="text-2xl font-semibold text-center mb-4">
              Add New Pet
            </h2>

            <div>
              <label className="block mb-1 font-medium">Pet Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter pet's name"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Breed</label>
              <input
                type="text"
                name="breed"
                value={formData.breed}
                onChange={handleChange}
                placeholder="Enter breed"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block mb-1 font-medium">Age (years)</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  min="0"
                  placeholder="Age"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="flex-1">
                <label className="block mb-1 font-medium">Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  min="0"
                  placeholder="Weight"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Unknown">Unknown</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Type</label>
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                placeholder="e.g. Dog, Cat"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Image URL</label>

              <div>
                {isUploading ? (
                  <div>
                    <div className="flex w-full items-center justify-center gap-x-5 animate-bounce">
                      <div className="w-6 h-6 rounded bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"></div>
                      <div className="w-6 h-6 rounded bg-gradient-to-r from-green-400 to-blue-500 animate-pulse"></div>
                      <div className="w-6 h-6 rounded bg-gradient-to-r from-pink-500 to-yellow-500 animate-pulse"></div>
                    </div>

                    <h1 className="text-center text-cyan-500">
                      Just a moment — your image is being uploaded.
                    </h1>
                  </div>
                ) : (
                  <input
                    type="file"
                    multiple
                    name="image"
                    onChange={setImageUrl}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded font-semibold hover:bg-purple-700 transition"
            >
              Add Pet
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
