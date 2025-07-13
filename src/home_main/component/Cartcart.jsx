import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { deleteCart } from "../../utills/cart";
import toast from "react-hot-toast";

export default function Cartcart({ productId, qty, setLoaded, loaded }) {
  const [product, setProduct] = useState();

  // Load product details by ID
  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/products/productcart/${productId}`
      )
      .then((res) => {
        if (res.data.productData != null) {
          setProduct(res.data.productData);
        } else {
          // Remove item if product not found
          deleteCart(productId);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loaded]);

  return (
    <div>
      <div className="w-full sm:max-w-8xl mx-auto my-6">
        {product ? (
          <div className="border rounded-xl shadow-md p-4 bg-white overflow-x-auto h-full">
            <table className="w-full table-fixed h-full">
              <colgroup>
                <col className="sm:w-24" /> {/* Image */}
                <col className="sm:w-64" /> {/* Product */}
                <col className="sm:w-16" /> {/* Qty */}
                <col className="sm:w-24" /> {/* Price */}
                <col className="sm:w-24" /> {/* Total */}
                <col className="sm:w-12" /> {/* Delete */}
              </colgroup>
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-sm uppercase">
                  <th className="p-3 font-bold text-left">Image</th>
                  <th className="p-3 font-bold text-left">Product</th>
                  <th className="p-3 font-bold text-center">Qty</th>
                  <th className="p-3 font-bold text-right">Price</th>
                  <th className="p-3 font-bold text-right">Total</th>
                  <th className="p-3 font-bold text-center"></th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t hover:bg-amber-50">
                  {/* Product Image */}
                  <td className="p-3">
                    <img
                      src={product.image[0]}
                      alt={product.productName}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>

                  {/* Product Name */}
                  <td
                    className="p-3 font-medium truncate"
                    title={product.productName}
                  >
                    {product.productName}
                  </td>

                  {/* Quantity */}
                  <td className="p-3 text-center">{qty}</td>

                  {/* Price */}
                  <td className="p-3 text-right">
                    Rs. {product.lastPrice.toFixed(2)}
                  </td>

                  {/* Total */}
                  <td className="p-3 font-semibold text-green-600 text-right">
                    Rs. {(product.lastPrice * qty).toFixed(2)}
                  </td>

                  {/* Delete Button */}
                  <td className="p-3 text-center">
                    <MdDelete
                      className="text-red-500 cursor-pointer hover:scale-110 duration-200"
                      onClick={() => {
                        toast.success("Item removed from cart successfully!");
                        deleteCart(productId);
                        setLoaded(!loaded);
                      }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          // Loading state
          <div className="text-center py-10 text-gray-500">
            Loading product...
          </div>
        )}
      </div>
    </div>
  );
}
