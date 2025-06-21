import axios from "axios";
import { div, h1 } from "framer-motion/client";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [searchInput, setSearchInput] = useState();
  const [maxvalue, setMaxValue] = useState(0);
  const [minvalue, setMinValue] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loaded) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/products/getproduct`, {
          params: {
            search: searchInput,
            maxPrice: undefined,
            minPrice: undefined,
          },
        })
        .then((res) => {
          setProducts(res.data.products);
          setLoaded(true);
        })
        .catch((err) => {
          console.log(err);
          setLoaded(true);
        });
    }
  }, [searchInput, loaded]);

  if (loaded) {
    <div className="bg-amber-300 h-screen w-full">ss</div>;
  }
  const handleViewDetails = (product) => {
    navigate("/product-overview", { state: { product } });
  };

  return (
    <div className="h-full bg-gray-100 p-6 overflow-hidden overflow-y-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-4 py-6 bg-white shadow rounded-xl w-full ">
        {/* 🔍 Search Bar - Center in desktop, top in mobile */}
        <div className="flex items-center justify-center w-full md:justify-center">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full sm:w-[300px] border border-gray-300 px-4 py-2 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500
            
            
            "
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              setLoaded(false);
            }}
          />
          <button className="bg-blue-600 text-white px-5 py-2 rounded-r-full hover:bg-blue-700 transition duration-200">
            Search
          </button>
        </div>

        {/* 💰 Price Filters - Right side on desktop, below on mobile */}
        <div className="flex gap-3 w-full md:w-auto justify-center md:justify-end">
          <input
            type="number"
            value={minvalue}
            placeholder="Min Price"
            className="w-full sm:w-[120px] border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            value={maxvalue}
            placeholder={`max`}
            className="w-full sm:w-[120px] border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {loaded && products.length === 0 && (
        <div className=" flex justify-center items-center h-full">
          <p className=" text-gray-600 ">No products found.</p>
        </div>
      )}

      {loaded ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {products.map((product) => {
            const {
              brand,
              description,
              image,
              lastPrice,
              petType,
              price,
              productName,
              _id,
            } = product;

            return (
              <div
                key={_id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300 overflow-hidden flex flex-col"
              >
                <div>
                  <img
                    src={image[0]}
                    alt={productName}
                    className="w-full h-48 object-center"
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-lg font-semibold">{productName}</h2>
                  <p className="text-sm text-gray-500">Brand: {brand}</p>
                  <p className="text-sm text-gray-500 mb-2">Pet: {petType}</p>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {description}
                  </p>

                  <div className="mt-auto">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-green-600 font-bold">${price}</span>
                      {lastPrice && lastPrice > price && (
                        <span className="line-through text-gray-400 text-sm">
                          ${lastPrice}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => handleViewDetails(product)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition duration-200"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="h-full flex justify-center items-center bg-white">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
