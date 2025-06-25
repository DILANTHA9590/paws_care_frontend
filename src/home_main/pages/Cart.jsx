import { div, h1 } from "framer-motion/client";
import React, { useEffect, useState } from "react";
import { loadCart } from "../../utills/cart";

export default function cart() {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const cart = loadCart();

    if (cart.length != 0) {
      setCart(cart);
    }
  }, []);
  return (
    <>
      <div>
        {cart.length > 0 ? (
          <div>
            {cart.map((val, index) => {
              const { productId, qty } = val;

              return (
                <div>
                  <h1>{productId}</h1>
                  <h1>{qty}</h1>
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
