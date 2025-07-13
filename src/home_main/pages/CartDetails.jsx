import React, { useEffect, useState } from "react";
import { clearCart, loadCart } from "../../utills/cart";
import Cartcart from "../component/Cartcart";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export default function CartDetails() {
  const [cart, setCart] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [price, setPrice] = useState();
  const [pricee, setPricee] = useState(false);

  const navigate = useNavigate();

  // Load cart and price
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
  }, [loaded, pricee]);

  // Clear cart items
  function clear() {
    localStorage.removeItem("cart");
    setLoaded(true);
  }

  // Handle checkout
  function handleCheckOut() {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to place your order.", {
        position: "top-center",
        autoClose: 10000,
      });
      return;
    }

    navigate("/shipping", {
      state: {
        item: loadCart(),
      },
    });
  }

  return (
    <>
      <div className="relative p-4 h-[100%]  overflow-hidden">
        <h1 className="text-xl font-bold mb-4">Cart Details</h1>

        {/* Clear Cart button */}
        <button
          onClick={clear}
          className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow-md"
        >
          Clear Cart
        </button>

        {cart.length > 0 ? (
          <div className="h-full">
            {cart.map((val, index) => {
              const { productId, qty } = val;

              return (
                <div key={index}>
                  <Cartcart
                    productId={productId}
                    qty={qty}
                    setLoaded={setLoaded}
                    loaded={loaded}
                  />
                </div>
              );
            })}

            {/* Bottom bar */}
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

                {/* Checkout button */}
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
          <div className="text-center text-gray-500 h-full flex justify-center items-center">
            <h1> Empty Cart</h1>
          </div>
        )}
      </div>
    </>
  );
}
