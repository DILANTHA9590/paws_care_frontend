// src/components/ImageUploader.jsx
import React, { useState } from "react";
import { uploadImageToCloudinary } from "../../utills/uploadImageCloudinary.js";
import { map } from "framer-motion/client";

export default function ImageUploader() {
  const [imageUrl, setImageUrl] = useState();

  const [count, setCount] = useState(0);
  const [error, setError] = useState("");

  const [user, setUser] = useState([]);

  const [userdata, setUserData] = useState({
    name: " ",
    age: " ",
    city: "",
    gender: true,
    id: "",
  });
  function deleteUser(userId) {
    setUser((prev) => prev.filter((user) => user.id != userId));
  }
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

  function clickMe() {
    setCount((prev) => {
      if (prev < 30) {
        return prev + 5;
      } else {
        return prev;
      }
    });
  }

  function handleSetValue(e) {
    console.log(e.target.value);
    console.log(e.target.name);

    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  }

  function clickM() {
    setUser((prev) => [...prev, userdata]);

    setUser((prev) => {
      if (prev) {
        return [...prev, userdata];
      } else {
        return;
      }
    });

    console.log(user);
  }

  function showdata() {
    console.log(userdata);
    console.log(user);
  }

  function changegender(id, gender) {
    setUser((prev) =>
      prev.map((val) => (val.id === id ? { ...val, gender } : val))
    );
  }
  return (
    <div className="p-4">
      {/* {imageUrl}
      <h2 className="text-xl mb-4">upload image</h2>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
      /> */}

      <div className="text-6xl flex gap-5 items-center">
        <button
          onClick={() =>
            setCount((prev) => {
              if (prev > 1) {
                return prev - 1;
              } else {
                return prev;
              }
            })
          }
        >
          -
        </button>
        <button
          onClick={() =>
            setCount((prev) => {
              if (prev < 50) {
                return prev + 1;
              } else {
                return prev;
              }
            })
          }
        >
          +
        </button>
        <h1></h1>
        <button onClick={clickMe}>Click me +5</button>=
        <h1 className="text-5xl">{count}</h1>
      </div>
      {/* {error && <p className="mt-2 text-red-500">{error}</p>}
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
      )} */}

      <div className="flex flex-col w-2xl gap-3">
        <input
          type="text"
          name="id"
          onChange={handleSetValue}
          className="border"
        />
        <input
          type="text"
          name="name"
          onChange={handleSetValue}
          className="border"
        />
        <input
          type="text"
          name="age"
          onChange={handleSetValue}
          className="border"
        />
        <input
          type="text"
          name="city"
          onChange={handleSetValue}
          className="border"
        />
        <input
          type="text"
          name="gender"
          onChange={handleSetValue}
          className="border"
        />
      </div>

      <div>
        {user.map((val, index) => {
          const { id, name, age, city, gender } = val;
          return (
            <>
              <div key={index} className="flex gap-x-5 ">
                <h1>{id}</h1>
                <h1>{name}</h1>
                <h1>{age}</h1>
                <h1>{city}</h1>
                <h1 onClick={() => changegender(id, !gender)}>
                  {gender ? "male" : "female"}
                </h1>
                <button onClick={() => deleteUser(id)}>Delete</button>
              </div>
            </>
          );
        })}
      </div>

      <button className="text-7xl bg-amber-200 mt-11" onClick={clickM}>
        {" "}
        click me
      </button>

      <div className="flex flex-col w-2xl gap-3">
        <input
          type="text"
          name="id"
          onChange={handleSetValue}
          className="border"
        />
        <input
          type="text"
          name="name"
          onChange={handleSetValue}
          className="border"
        />
        <input
          type="text"
          name="age"
          onChange={handleSetValue}
          className="border"
        />
        <input
          type="text"
          name="city"
          onChange={handleSetValue}
          className="border"
        />
        <input
          type="text"
          name="gender"
          onChange={handleSetValue}
          className="border"
        />
      </div>
    </div>
  );
}
