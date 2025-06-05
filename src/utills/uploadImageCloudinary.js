// src/utils/uploadImageToCloudinary.js
import { v4 as uuidv4 } from "uuid";

export function uploadImageToCloudinary(imageFile) {
  console.log("original file", imageFile);
  let imagename = imageFile.name.split(".");
  let imageName = imagename[0];
  let extention = imagename[1];
  let uniqueId = uuidv4();
  let newImageName = imageName + "_" + uniqueId + "." + extention;

  let renamedFile = new File([imageFile], newImageName, {
    type: imageFile.type,
  });

  console.log("kkkkkk", renamedFile);
  const cloudName = import.meta.env.VITE_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;

  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("file", renamedFile); // 🔄 නව file එක යවමු
    formData.append("upload_preset", uploadPreset);

    fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData,
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Upload failed");
        const data = await res.json();
        resolve(data.secure_url);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
