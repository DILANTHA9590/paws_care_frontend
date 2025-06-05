// src/utils/uploadImageToCloudinary.js

export function uploadImageToCloudinary(imageFile) {
  const cloudName = import.meta.env.VITE_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;

  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", uploadPreset);

    fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData,
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Upload failed");
        const data = await res.json();

        //get img url
        resolve(data.secure_url);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
