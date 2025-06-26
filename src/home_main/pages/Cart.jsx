import { div, h1 } from "framer-motion/client";
import React, { useEffect, useState } from "react";
import { clearCart, loadCart } from "../../utills/cart";
import Cartcart from "../component/Cartcart";

export default function cart() {
  const [cart, setCart] = useState([]);
  const [loaded, setLoaded] = useState(false);

  console.log(loaded);

  useEffect(() => {
    const cart = loadCart();

    setCart(cart);
    setLoaded(false);
  }, [loaded]);

  function clear() {
    localStorage.removeItem("cart");
    setLoaded(true);
  }
  return (
    <>
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
            <div className=" h-[50px] sm:text-3xl p-2 text-2xl">
              <div className="max-w-7xl mx-auto flex justify-end">
                <button className="bg-orange-500 p-3 rounded-2xl px-7  text-white">
                  CheckOut
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
