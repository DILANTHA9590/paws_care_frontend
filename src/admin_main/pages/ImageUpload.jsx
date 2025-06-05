// src/components/ImageUploader.jsx
import React, { useState } from "react";
import { uploadImageToCloudinary } from "../../utills/uploadImageCloudinary.js";

export default function ImageUploader() {
  const [imageUrl, setImageUrl] = useState();
  const [error, setError] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files;
    if (!file) return;

    try {
      let imageUrl = [];
      for (let i = 0; i < file.length; i++) {
        imageUrl.push(await uploadImageToCloudinary(file[i]));
      }

      console.log(imageUrl);

      setImageUrl(imageUrl);
    } catch (err) {
      console.error(err);
      setError("Upload failed. .");
    }
  };

  return (
    <div className="p-4">
      {imageUrl}
      <h2 className="text-xl mb-4">upload image</h2>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
      />
      {error && <p className="mt-2 text-red-500">{error}</p>}
      {imageUrl && (
        <div className="mt-4">
          <p>Uploaded Image Link:</p>
          <a
            href={imageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {imageUrl}
          </a>
          <div className="mt-2">
            <img
              src={imageUrl[2]}
              alt="Uploaded"
              className="w-48 h-auto rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
}
