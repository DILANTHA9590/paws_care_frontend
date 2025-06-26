import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Cartcart({ productId, qty }) {
  const [product, setProduct] = useState();
  const [loaded, setLoaded] = useState(false);

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
          console.log(err);
        });
    }
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto my-6">
      {product ? (
        <div className="border rounded-xl shadow-md p-4 bg-white">
          <table className="w-full table-auto text-left">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm uppercase">
                <th className="p-2">Image</th>
                <th className="p-2">Product</th>
                <th className="p-2">Qty</th>
                <th className="p-2">Price</th>
                <th className="p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t text-sm hover:bg-amber-100">
                <td className="p-2">
                  <img
                    src={product.image[0]}
                    alt={product.productName}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </td>
                <td className="p-2 font-medium">{product.productName}</td>
                <td className="p-2">{qty}</td>
                <td className="p-2">Rs. {product.lastPrice.toFixed(2)}</td>
                <td className="p-2 font-semibold text-green-600">
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
  );
}
