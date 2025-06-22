import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function ProductOverView() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
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

  return (
    <div className="h-full bg-gradient-to-br from-amber-100 to-amber-200 p-6">
      {!loaded ? (
        <div className="h-full flex justify-center items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden h-full max-h-[90vh]">
          {/* Left - Product Image */}
          <div className="md:w-1/2 bg-gray-100 flex items-center justify-center p-4">
            <img
              src={image?.[0]}
              alt={productName}
              className="object-contain max-h-[80vh] rounded-lg"
            />
          </div>

          {/* Right - Product Details */}
          <div className="md:w-1/2 p-6 space-y-4 bg-white">
            <h2 className="text-3xl font-bold text-gray-800">{productName}</h2>
            {altNames && (
              <p className="text-sm text-gray-500 italic">
                Also known as: {altNames}
              </p>
            )}
            <p className="text-lg text-gray-700">{description}</p>

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

            <div className="mt-6">
              <p className="text-xl font-bold text-green-700">Rs. {price}</p>
              {lastPrice && (
                <p className="text-sm text-gray-400 line-through">
                  Rs. {lastPrice}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
