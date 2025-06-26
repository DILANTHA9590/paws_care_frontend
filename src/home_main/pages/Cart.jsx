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
      <div className="">
        <button className="relative" onClick={clear}>
          Clear Cart
        </button>
        {cart.length > 0 ? (
          <div>
            {cart.map((val, index) => {
              const { productId, qty } = val;

              return (
                <div key={index} className="">
                  <Cartcart productId={productId} qty={qty} />
                </div>
              );
            })}
          </div>
        ) : (
          <h1> Emty Cart</h1>
        )}
      </div>
    </>
  );
}
