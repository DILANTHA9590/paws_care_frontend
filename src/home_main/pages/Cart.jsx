import { div, h1 } from "framer-motion/client";
import React, { useEffect, useState } from "react";
import { clearCart, loadCart } from "../../utills/cart";
import Cartcart from "../component/Cartcart";
import axios from "axios";

export default function cart() {
  const [cart, setCart] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [price, setPrice] = useState();

  console.log("sssssssssssss", price);

  console.log(loaded);

  useEffect(() => {
    const cart = loadCart();

    setCart(cart);

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/products/quote`, {
        orderedItems: loadCart(),
      })
      .then((res) => {
        setPrice(res.data.paymentDetails);
      })
      .catch((err) => {
        console.log(err);
      });

    setLoaded(false);
  }, [loaded]);
  function clear() {
    localStorage.removeItem("cart");
    setLoaded(true);
  }

  function handleCheckOut() {}
  return (
    <>
      <h1>{price?.total}</h1>
      <div className="h-full overflow-hidden overflow-y-auto">
        <button className="relative" onClick={clear}>
          Clear Cart
        </button>
        {cart.length > 0 ? (
          <div className="h-full">
            {cart.map((val, index) => {
              const { productId, qty } = val;

              return (
                <div key={index} className="">
                  <Cartcart productId={productId} qty={qty} />
                </div>
              );
            })}
            <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg border-t border-gray-200 z-50">
              <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between p-4 space-y-2 sm:space-y-0">
                <div className="flex flex-col sm:flex-row sm:space-x-8 text-gray-800">
                  <h2 className="text-lg sm:text-2xl font-medium">
                    Total Discount:{" "}
                    <span className="text-orange-500">
                      Rs. {price?.discount.toFixed(2)}
                    </span>
                  </h2>
                  <h2 className="text-lg sm:text-2xl font-medium">
                    Total:{" "}
                    <span className="text-green-600">
                      Rs. {price?.total.toFixed(2)}
                    </span>
                  </h2>
                </div>
                <button
                  onClick={handleCheckOut}
                  className="bg-orange-500 hover:bg-orange-600 transition-colors text-white font-semibold rounded-lg px-6 py-3 shadow-md"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <h1> Emty Cart</h1>
        )}
      </div>
    </>
  );
}
