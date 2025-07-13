import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { image } from "framer-motion/client";
import { uploadImageToCloudinary } from "../../utills/uploadImageCloudinary";
import Loading from "../../home_main/component/err_ui/Loading";
import { TokenContext } from "../../utills/context/countContext";
import { useNavigate } from "react-router";

export default function DoctorCreate() {
  const [isUploading, setIsUploading] = useState(false);
  const [image, addImage] = useState("");
  const [loaded, setLoaded] = useState(true);
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const { token } = useContext(TokenContext);

  const [formData, setFormData] = useState({
    doctorId: "",
    email: "",
    phone: "",
    password: "",
    name: "",
    specialization: "",
    experience: "",
    availabledays: "",
    availableTime: "",
    image: "",
    type: "doctor",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    if (!token) {
      navigate("/");
      return;
    }

    setLoaded(false);
    console.log(formData);

    await axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/api/doctors/createdoctor`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toast.success("Doctor created successfully!");
        setLoaded(true);
        navigate("/admin/managedoctors");
      })
      .catch((err) => {
        if (err.status == 400) {
          //   setFormData({
          //     doctorId: "",
          //     email: "",
          //     phone: "",

          //     name: "",
          //     specialization: "",
          //     experience: "",
          //     availabledays: "",
          //     availableTime: "",
          //   });
          setErr(true);
          console.log("run thbis");
          //   setFormData((prev) => ({
          //     ...prev,
          //     password: err.response.data.message,
          //   }));
        }
        console.log(err);
        toast.error("Doctor creation fail please try agin");

        setLoaded(true);
      });
    toast.success("Doctor created successfully!");
  };

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

  if (!loaded) {
    return (
      <>
        <Loading />
      </>
    );
  }
  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Create Doctor</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
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

        <input
          type="text"
          name="doctorId"
          placeholder="Doctor ID"
          value={formData.doctorId}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type={err ? "text" : "password"}
          name="password"
          placeholder={`${
            err ? "Password is required (min 6 chars)" : "password"
          }`}
          value={formData.password}
          onChange={handleChange}
          className={`w-full border px-3 py-2 rounded ${
            setErr && "text-red-600"
          }`}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          name="specialization"
          placeholder="Specialization (comma separated)"
          value={formData.specialization}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="number"
          name="experience"
          placeholder="Experience (years)"
          value={formData.experience}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          name="availabledays"
          placeholder="Available Days (e.g. Mon-Fri)"
          value={formData.availabledays}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          name="availableTime"
          placeholder="Available Time (e.g. 9am - 5pm)"
          value={formData.availableTime}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          name="type"
          disabled
          placeholder="User type"
          value={formData.type}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Create Doctor
        </button>
      </form>
    </div>
  );
}
