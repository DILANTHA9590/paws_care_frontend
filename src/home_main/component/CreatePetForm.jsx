import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { uploadImageToCloudinary } from "../../utills/uploadImageCloudinary";
import { TokenContext } from "../../utills/context/countContext";
import toast from "react-hot-toast";
import axios from "axios";

export default function CreatePetForm({ setLoaded, setShowAddPet }) {
  const { token } = useContext(TokenContext);

  const [isUploading, setIsUploading] = useState(false);
  const [image, addImage] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    age: "",
    gender: "",
    weight: "",
    type: "",
    image: "",
  });

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
    setIsUploading(false);

    addImage(imageUrl[0]);

    setFormData((prev) => ({
      ...prev,
      image: imageUrl.toString(),
    }));

    setLoaded(true);

    toast.success("Image uploaded");
  };

  function handleAddPet(e) {
    e.preventDefault();

    if (!token) {
      navigate("/login");
      return;
    }

    setLoaded(false);
    setShowAddPet(false);

    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/api/pets`,
        {
          formData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="h-full">
      <form
        className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-5"
        onSubmit={handleAddPet}
      >
        <h2 className="text-2xl font-semibold text-center mb-4">Add New Pet</h2>

        <div>
          <label className="block mb-1 font-medium">Pet Name</label>
          <input
            type="text"
            required
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
            required
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
              required
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
              required
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
            required
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
            required
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
  );
}
