import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ImageSlider from "../component/ImageSlider";
import { FaMinus } from "react-icons/fa";
import { TiPlus } from "react-icons/ti";
import { CountContext } from "../../utills/context/countContext";
import { pre } from "framer-motion/client";
import { addToCart } from "../../utills/cart";
import cart from "./cart";

export default function ProductOverView() {
  const { cartCount, setCartCount } = useContext(CountContext);

  console.log(cartCount);
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [count, setCount] = useState(1);
  const [err, setErr] = useState(null);
  const [productData, setProductData] = useState();

  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      navigate("/product");
    }

    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/productoverview/${id}`
      )
      .then((res) => {
        setProductData(res.data.productData);
        setLoaded(true);
      })
      .catch((err) => {
        console.log(err);
        if (err.status) {
          setErr(err.status);
        } else {
          setErr("network");
        }
      });
  }, []);

  const {
    altNames,
    brand,
    description,
    image,
    lastPrice,
    petType,
    price,
    productId,
    productName,
    quantityInStock,
  } = productData || {};

  function incrementCartCount() {
    console.log("sssssssssssssss", typeof count);
    setCount((prev) => prev + 1);
  }

  function decrementCartCount() {
    setCount((prev) => {
      if (prev > 1) {
        return prev - 1;
      } else {
        return prev;
      }
    });
  }

  return (
    <div className="h-full bg-gradient-to-p-4 md:p-6">
      {!loaded ? (
        <div className="h-full flex justify-center items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row bg-white rounded-2xl  min-h-[80vh] justify-center items-center sm:gap-10">
          {/* Left - Product Image */}
          <div className="md:w-1/2 bg-gray-100 flex items-center justify-center sm:p-14 p-4">
            <ImageSlider image={image} productName={productName} />
          </div>

          {/* Right - Product Details */}
          <div className="md:w-1/2 p-4 md:p-6 space-y-4 md:space-y-6 bg-white overflow-y-auto ">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              {productName}
            </h2>
            {altNames && (
              <p className="text-sm text-gray-500 italic">
                Also known as: {altNames}
              </p>
            )}
            <p className="text-base md:text-lg text-gray-700">{description}</p>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <span className="text-sm text-gray-600">Brand</span>
                <p className="font-medium">{brand}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Pet Type</span>
                <p className="font-medium capitalize">{petType}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Available Stock</span>
                <p className="font-medium">{quantityInStock}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Product ID</span>
                <p className="font-medium">{productId}</p>
              </div>
            </div>

            <div className="mt-4 md:mt-6">
              <p className="text-xl font-bold text-green-700">
                {price > lastPrice && (
                  <span className="line-through text-red-600 block">
                    Rs.{price.toFixed(2)}
                  </span>
                )}

                <span>Rs.{lastPrice.toFixed(2)}</span>
              </p>
            </div>
            <div className="flex gap-3">
              <button onClick={decrementCartCount} className="border p-3">
                <FaMinus />
              </button>
              <h1 className=" p-3">{count}</h1>
              <button onClick={incrementCartCount} className="border p-3">
                <TiPlus />
              </button>
            </div>
            <div className="flex gap-4 mt-4 md:mt-6 ">
              <button className="bg-blue-600 text-white px-4 py-2 md:px-5 md:py-2 rounded-lg shadow hover:bg-blue-700 transition-all duration-200">
                Buy Now
              </button>
              <button
                className="bg-gray-200 text-gray-800 px-4 py-2 md:px-5 md:py-2 rounded-lg shadow hover:bg-gray-300 transition-all duration-200"
                onClick={() => {
                  addToCart(productId, count);
                  setCartCount((prev) => prev + count);
                }}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      )}
      1
    </div>
  );
}
