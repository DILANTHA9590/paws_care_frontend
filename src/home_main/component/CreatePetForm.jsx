import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { uploadImageToCloudinary } from "../../utills/uploadImageCloudinary";
import { TokenContext } from "../../utills/context/countContext";
import toast from "react-hot-toast";
import axios from "axios";

export default function CreatePetForm({ setLoaded, setShowAddPet }) {
  const { token } = useContext(TokenContext);

  // State to track image upload progress
  const [isUploading, setIsUploading] = useState(false);
  // State to store uploaded image URL
  const [image, addImage] = useState("");
  const navigate = useNavigate();

  // State to store all form input values
  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    age: "",
    gender: "",
    weight: "",
    type: "",
    image: "",
  });

  // Handle form input changes and update formData state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image file input change and upload to Cloudinary
  const setImageUrl = async (e) => {
    setIsUploading(true);

    const files = e.target.files;

    // Upload each selected file and store URLs
    const imageUrl = [];
    for (let i = 0; i < files.length; i++) {
      const url = await uploadImageToCloudinary(files[i]);
      imageUrl.push(url);
    }
    setIsUploading(false);

    // Store the first uploaded image URL locally
    addImage(imageUrl[0]);

    // Update formData with uploaded image URL(s)
    setFormData((prev) => ({
      ...prev,
      image: imageUrl.toString(),
    }));

    // Indicate loading is complete
    setLoaded(true);

    // Notify user of successful upload
    toast.success("Image uploaded");
  };

  // Handle form submission to add a new pet
  function handleAddPet(e) {
    e.preventDefault();

    // Redirect to login if no valid token found
    if (!token) {
      navigate("/login");
      return;
    }

    // Set loading and hide form on submission

    // Send form data to backend API to create new pet record
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
        // Notify user of success response from server
        toast.success(res.data.message);
      })
      .catch((err) => {
        // Log any errors from API request
        console.log(err);
      })
      .finally(() => {
        setLoaded(false);
        setShowAddPet(false);
      });
  }

  return (
    <div className="h-full">
      {/* Pet creation form */}
      <form
        className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-5"
        onSubmit={handleAddPet}
      >
        <h2 className="text-2xl font-semibold text-center mb-4">Add New Pet</h2>

        {/* Input for pet name */}
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

        {/* Input for pet breed */}
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

        {/* Inputs for age and weight side-by-side */}
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

        {/* Dropdown to select gender */}
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

        {/* Input for pet type */}
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

        {/* File input for image upload with uploading state */}
        <div>
          <label className="block mb-1 font-medium">Image URL</label>

          <div>
            {isUploading ? (
              // Show loading animation while uploading
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
              // File input for selecting images
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

        {/* Submit button to add pet */}
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
