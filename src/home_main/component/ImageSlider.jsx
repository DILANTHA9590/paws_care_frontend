import React from "react";
import { useState } from "react";

export default function ImageSlider({ image = [], productName = "" }) {
  const [preview, setPreview] = useState(image?.[0] || "");

  return (
    <div className="flex flex-col-reverse md:flex-row md:space-x-4 w-full bg-white rounded-lg shadow-md p-4">
      {/* Thumbnail Side Panel */}
      <div className="flex md:flex-col gap-2 md:gap-4 overflow-x-auto md:overflow-y-auto md:max-h-[60vh] mt-2 md:mt-0">
        {image.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Thumbnail ${index}`}
            className={`w-16 h-16 md:w-20 md:h-20 object-cover rounded-md cursor-pointer border-2 transition-transform duration-200 hover:scale-105 ${
              preview === img ? "border-blue-500" : "border-gray-300"
            }`}
            onMouseEnter={() => setPreview(img)}
            onClick={() => setPreview(img)}
          />
        ))}
      </div>

      {/* Main Image Preview */}
      <div className="flex-1 flex items-center justify-center">
        <img
          src={preview}
          alt={productName}
          className="object-contain max-h-[40vh] md:h-[60vh] rounded-xl shadow-md"
        />
      </div>
    </div>
  );
}
