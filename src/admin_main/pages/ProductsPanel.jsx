import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GrSearch } from "react-icons/gr";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

export default function ProductsPanel() {
  const [productData, setProductData] = useState([]);
  const [searchinput, setSearchInput] = useState("");
  const [totalPage, setTotalPages] = useState(1);
  const [page, setCurruntPage] = useState(1);
  const [loaded, setloaded] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Access denied. Please log in as an Admin.");
      return;
    }

    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/getproductbyadmin`,
        {
          params: {
            searchQuery: searchinput,
            page: page,
            limit: 10,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setProductData(res.data?.products || []);
        setTotalPages(res.data.totalPages);
        setloaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchinput, page, loaded]);

  return (
    <div className="h-[85vh] p-4 overflow-y-auto relative">
      <div className="flex justify-between items-center">
        <div className="flex items-center mb-4 border w-2xl">
          <input
            type="text"
            placeholder="Search by product name or brand"
            value={searchinput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              setloaded(false);
            }}
            className="border-none rounded px-4 py-2 w-64 focus:outline-none grow"
          />
          <GrSearch className="text-3xl font-bold mr-2" />
        </div>
        <div>
          <button className="bg-green-500 px-4 py-2 mb-4 text-white rounded">
            ADD PRODUCT +
          </button>
        </div>
      </div>

      {!loaded ? (
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-[100px] h-[100px] border-6 rounded-full border-t-amber-300 border-t-4 border-white animate-spin"></div>
        </div>
      ) : productData.length <= 0 ? (
        <div className="w-full h-full flex justify-center items-center">
          <p>No Products Found</p>
        </div>
      ) : (
        <div className="rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                  #
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                  Image
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                  Name
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                  Brand
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                  Type
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                  Price
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                  Stock
                </th>
                <th className="px-4 py-2 text-center text-sm font-medium text-gray-600 ">
                  Edit
                </th>
                <th className="px-4 py-2 text-center text-sm font-medium text-gray-600 ">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {productData.map((product, index) => {
                const {
                  image,
                  productName,
                  brand,
                  petType,
                  price,
                  quantityInStock,
                } = product;
                return (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2">
                      <img
                        src={image || "https://via.placeholder.com/40"}
                        alt="Product"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {productName}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">{brand}</td>
                    <td className="px-4 py-2 text-sm text-gray-700 capitalize">
                      {petType}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      ${price}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {quantityInStock}
                    </td>

                    <td className="text-center text-blue-700">
                      {" "}
                      <CiEdit size={20} className="inline-block text-center" />
                    </td>
                    <td className="text-center text-red-600">
                      {" "}
                      <MdDelete size={20} className="inline-block" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {!searchinput && (
        <div className="flex w-full justify-center gap-x-3 p-2 absolute bottom-0">
          {Array.from({ length: totalPage }).map((_, index) => (
            <div
              key={index}
              className="bg-amber-700 text-white px-4 py-2 rounded cursor-pointer"
              onClick={() => {
                setCurruntPage(index + 1);
                setloaded(false);
              }}
            >
              {index + 1}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
