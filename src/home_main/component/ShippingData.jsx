import axios from "axios";
import { div } from "framer-motion/client";
import React, { useEffect, useState } from "react";

export default function ShippingData({ productId, qty }) {
  const [product, setProduct] = useState();
  const [loaded, setLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // submit logic here
  };

  useEffect(() => {
    if (!loaded) {
      axios
        .get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/products/productcart/${productId}`
        )
        .then((res) => {
          if (res.data.productData != null) {
            setProduct(res.data.productData);
            setLoaded(true);
          }
        })
        .catch((err) => {
          setLoaded(true);

          if (err.message.status) {
            setLoaded(true);
          }
          console.log(err);
        });
    }
  }, []);

  return (
    <div className="h-full relative">
      <div className="w-full sm:max-w-7xl mx-auto my-6 h-full ">
        {product ? (
          <div className="border rounded-xl shadow-md p-4 bg-white overflow-x-auto h-full">
            <table className="w-full table-fixed h-full">
              <colgroup>
                <col className="sm:w-24" /> {/* Image column */}
                <col className="sm:w-64" /> {/* Product name column */}
                <col className="sm:w-16" /> {/* Qty column */}
                <col className="sm:w-24" /> {/* Price column */}
                <col className="sm:w-24" /> {/* Total column */}
              </colgroup>
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-sm uppercase">
                  <th className="p-3 font-bold text-left">Image</th>
                  <th className="p-3 font-bold text-left">Product</th>
                  <th className="p-3 font-bold text-center">Qty</th>
                  <th className="p-3 font-bold text-right">Price</th>
                  <th className="p-3 font-bold text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t hover:bg-amber-50 h-full">
                  <td className="p-3">
                    <img
                      src={product.image[0]}
                      alt={product.productName}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td
                    className="p-3 font-medium truncate"
                    title={product.productName}
                  >
                    {product.productName}
                  </td>
                  <td className="p-3 text-center">{qty}</td>
                  <td className="p-3 text-right">
                    Rs. {product.lastPrice.toFixed(2)}
                  </td>
                  <td className="p-3 font-semibold text-green-600 text-right">
                    Rs. {(product.lastPrice * qty).toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500">
            Loading product...
          </div>
        )}
      </div>
    </div>
  );
}
