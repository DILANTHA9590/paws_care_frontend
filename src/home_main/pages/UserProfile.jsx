import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { ImageContext, TokenContext } from "../../utills/context/countContext";
import { uploadImageToCloudinary } from "../../utills/uploadImageCloudinary";
import Loading from "../component/err_ui/Loading";
import ServerErr from "../component/err_ui/ServerErr";
import NetworkErr from "../component/err_ui/NetworkErr";

export default function UserProfile() {
  const { token } = useContext(TokenContext);
  const { setImage } = useContext(ImageContext);
  const [loaded, setLoaded] = useState(false); // For tracking profile data load
  const [profile, setProfile] = useState(null); // Store user profile data
  const [image, addImage] = useState(""); // Store uploaded image URL
  const [isUploading, setIsUploading] = useState(false); // Show uploading state
  const navigate = useNavigate();
  const [err, setErr] = useState(); //handle back end erros err
  useEffect(() => {
    // If no token, redirect to login
    if (!token) {
      toast.error("Please Sign In Again");
      navigate("/login");
      return;
    }

    // Fetch user profile data from backend
    if (!loaded) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/users/user-data`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setProfile(res.data.user); // Set fetched profile data
          setLoaded(true); // Mark as loaded
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to fetch profile");
        });
    }
  }, [token, loaded]);

  // Handle account delete action
  const handleDelete = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      return; // Cancel delete if user clicks 'No'
    }

    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/delete-account`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Account deleted successfully");
      navigate("/"); // Redirect to home after delete
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete account");
    }
  };

  if (!loaded) {
    return <Loading />; // Show loading spinner while fetching profile
  }

  // Upload image to Cloudinary & store URL
  const setImageUrl = async (e) => {
    setIsUploading(true); // Show uploading state

    const files = e.target.files; // Get selected files

    // Upload each file & get its URL
    const imageUrl = [];
    for (let i = 0; i < files.length; i++) {
      const url = await uploadImageToCloudinary(files[i]);
      imageUrl.push(url);
    }
    setIsUploading(false);

    // Save first uploaded image URL locally
    addImage(imageUrl[0]);

    setLoaded(true); // Done uploading
  };

  // Send uploaded image URL to backend to update user profile
  function handleAddImage() {
    if (!image) {
      toast.error("Please upload an image first!");
      return; // stop function if no image
    }
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/addimage`,
        { image },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toast.success();
        // Optionally refetch profile here if needed
        toast.success("Image added to your profile successfully!");
        localStorage.setItem("image", image);
        setImage(image);
        console.log("image ALInk", image);

        setLoaded(false);
      })
      .catch((err) => {
        toast.error("Failed to add image to profile");
        if (err.status) {
          setErr(err.status); // set interl server erros
        } else {
          setErr("network"); //set network errs
        }
      });

    addImage(null);
  }

  if ([400, 403, 404, 500].includes(err)) {
    return (
      <>
        <ServerErr />
      </>
    );
  }

  //show network err-------------------------------------->
  if (err == "network") {
    return (
      <>
        <NetworkErr />
      </>
    );
  }

  return (
    <div className="flex items-center justify-center sm:min-h-screen bg-white p-4 h-full">
      <div className="bg-gray-100 rounded-2xl shadow-xl p-8 w-full max-w-md text-center hover:shadow-2xl transition duration-300 h-f">
        {/* User profile image */}
        <img
          src={profile.image}
          alt="Profile"
          className="w-32 h-32 sm:w-90 sm:h-90 rounded-full object-center mx-auto mb-4 border-4 border-indigo-500"
        />

        {/* User name and email */}
        <h2 className="text-2xl font-bold text-gray-800 mb-1">
          {profile.firstName} {profile.lastName}
        </h2>
        <p className="text-gray-500 mb-4">{profile.email}</p>

        {/* Image upload & add image buttons */}
        <div>
          <div>
            {isUploading ? (
              // Show uploading animation if uploading
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
              // Show file input & add image button
              <div className="mb-4 flex items-center gap-4">
                <div className="grow">
                  <label className="flex items-center px-5 py-3 bg-indigo-600 text-white rounded-lg shadow-md cursor-pointer hover:bg-indigo-700 transition duration-300 select-none">
                    Choose Image
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={setImageUrl}
                    />
                  </label>
                </div>

                <div
                  className=" cursor-pointer bg-gradient-to-r from-teal-400 to-cyan-500 text-white py-3 rounded-xl shadow-lg flex items-center justify-center w-48 "
                  onClick={handleAddImage}
                >
                  <h1 className="font-extrabold tracking-wide">Add Image</h1>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Other user details */}
        <div className="text-left space-y-2 mb-6">
          <p>
            <span className="font-semibold text-gray-700">WhatsApp:</span>{" "}
            {profile.whatsApp}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Type:</span>{" "}
            {profile.type}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Verified:</span>{" "}
            {profile.isverify ? (
              <span className="text-green-600 font-bold">Yes ✅</span>
            ) : (
              <span className="text-red-600 font-bold">No ❌</span>
            )}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Disabled:</span>{" "}
            {profile.disabled ? (
              <span className="text-red-600 font-bold">Yes ❌</span>
            ) : (
              <span className="text-green-600 font-bold">No ✅</span>
            )}
          </p>
        </div>

        {/* Delete account button */}
        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}
