import React, { useState } from "react";
import { uploadImageToCloudinary } from "../../utills/uploadImageCloudinary";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import axios from "axios";
import { CiCoins1 } from "react-icons/ci";
import { div } from "framer-motion/client";

export default function AddProduct() {
  const [image, setImage] = useState();
  const [isUploading, setIsUploading] = useState(false);

  console.log("laoded", isUploading);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    productId: "",
    productName: "",
    brand: "",
    petType: "",
    altNames: "",
    description: "",
    price: null,
    lastPrice: null,
    image: [],
  });

  console.log("my images", image);

  function handleSetField(e) {
    const { name, value } = e.target;

    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));

    userData.image = image;
  }

  const setImageUrl = async (e) => {
    setIsUploading(true);

    const files = e.target.files;

    const imageUrl = [];
    for (let i = 0; i < files.length; i++) {
      const url = await uploadImageToCloudinary(files[i]);
      imageUrl.push(url);
    }

    setImage(imageUrl);

    setUserData((prev) => ({
      ...prev,
      image: imageUrl,
    }));

    setIsUploading(false);
    toast.success("uploaded successfully");
  };

  const handleAddProduct = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Access denied. Please log in as an Admin.");
      navigate("/login");
      return;
    }

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/products/`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="h-full">
        <div className=" h-full w-full flex items-center justify-center w-">
          <form
            onSubmit={handleAddProduct}
            className="bg-white shadow-xl rounded-lg p-8 space-y-4 w-full max-w-lg"
          >
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Add New Product
            </h2>

            <input
              type="text"
              name="productId"
              onChange={handleSetField}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Product ID"
              required="true"
            />

            <input type="text" age="" className="hidden" />

            <input
              type="text"
              name="productName"
              onChange={handleSetField}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Product Name"
              required="true"
            />

            <input
              type="text"
              name="brand"
              onChange={handleSetField}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Brand"
            />

            <input
              type="text"
              name="petType"
              onChange={handleSetField}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Pet Type"
              required="true"
            />

            <input
              type="text"
              name="altNames"
              onChange={handleSetField}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Alternative Names"
              required="true"
            />

            <textarea
              type=""
              name="description"
              onChange={handleSetField}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Description"
              required="true"
            />

            <input
              type="number"
              name="price"
              onChange={handleSetField}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Price"
            />

            <input
              type="number"
              name="lastPrice"
              onChange={handleSetField}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Last Price"
            />

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

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Create Product
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
