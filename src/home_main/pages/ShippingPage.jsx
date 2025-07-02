import { IoClose } from "react-icons/io5";
import React, { useEffect, useState } from "react";
import { clearCart, loadCart } from "../../utills/cart";
import Cartcart from "../component/Cartcart";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import ShippingData from "../component/ShippingData";
import ServerErr from "../component/err_ui/ServerErr";
import NetworkErr from "../component/err_ui/NetworkErr";

export default function ShippingPage() {
  const [cart, setCart] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [paymentProcess, setPaymentProcess] = useState(false);
  const [price, setPrice] = useState();
  const [showForm, setShowForm] = useState(false);
  const [err, setErr] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState();

  const [customerData, setCustomerData] = useState({
    name: "",
    mobileNumber: "",
    address: "",
  });

  const navigate = useNavigate();

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

  function handleCheckOut(e) {
    setPaymentProcess(true);
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to place your order.", {
        position: "top-center",
        autoClose: 10000,
      });
      return;
    }

    setShowForm(true);

    if (isNaN(Number(customerData.mobileNumber))) {
      setErr(true);
      setCustomerData((prev) => ({
        ...prev,
        mobileNumber: "Invalid Number",
      }));
    }

    customerData.orderedItems = cart;

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, customerData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setPaymentProcess(false);
        setPaymentDetails(res.data.paymentData);

        navigate("/payment", {
          state: {
            paymentDetails: res.data.paymentData,
          },
        });
      })

      .catch((err) => {
        console.log(err);
        setPaymentProcess(false);
        if (err.status) {
          setErr(err.status);
        } else {
          setErr("network");
        }
      });
  }
  function handleFormChange(e) {
    setCustomerData({ ...customerData, [e.target.name]: e.target.value });
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    console.log("Order Placed with:", customerData);

    // API call or logic to save order here...

    toast.success("Order placed successfully!", {
      position: "top-center",
    });

    clear(); // clear cart
    navigate("/"); // redirect to home or success page
  }

  if ([400, 403, 404, 500].includes(err)) {
    return (
      <>
        <ServerErr />
      </>
    );
  }

  //show network err-------------------------------------->
  if (err == "network") {
    return (
      <>
        <NetworkErr />
      </>
    );
  }
  return (
    <>
      <h1>{price?.total}</h1>
      <div>
        <div className="overflow-hidden overflow-y-auto h-[70vh]">
          <button className="relative" onClick={clear}>
            Clear Cart
          </button>
          {cart.length > 0 ? (
            <div className="">
              {cart.map((val, index) => {
                const { productId, qty } = val;

                return (
                  <div key={index}>
                    <ShippingData productId={productId} qty={qty} />
                  </div>
                );
              })}
              <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg border-t border-gray-200 z-50 ">
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
                  {!showForm && (
                    <button
                      type="submit"
                      onClick={() => setShowForm(true)}
                      className="bg-orange-500 hover:bg-orange-600 transition-colors text-white font-semibold rounded-lg px-6 py-3 shadow-md"
                    >
                      Place Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <h1>Empty Cart</h1>
          )}
        </div>
      </div>

      {/* Customer Details Form */}
      {showForm && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center  backdrop-blur-sm">
          <form
            className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md relative"
            onSubmit={handleCheckOut}
          >
            <IoClose
              className="absolute right-0 top-0 text-4xl  pr-2"
              onClick={() => setShowForm(false)}
            />
            <h2 className="text-2xl font-bold mb-6 text-center">
              Enter Shipping Details
            </h2>

            <div className="mb-4">
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={customerData.name}
                onChange={handleFormChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Your Name"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium">Phone Number</label>
              <input
                type="tel"
                name="mobileNumber"
                value={customerData.phone}
                onChange={handleFormChange}
                className={`w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400  ${
                  err && "text-red-700"
                }`}
                placeholder="07XXXXXXXX"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block mb-1 font-medium">Address</label>
              <textarea
                name="address"
                value={customerData.address}
                onChange={handleFormChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Your Address"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 transition-colors text-white font-semibold rounded-lg px-6 py-3 shadow-md"
            >
              Place Order
            </button>
          </form>
        </div>
      )}
      {paymentProcess && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-70 z-50 backdrop-blur-2xl">
          <div className="text-center">
            <div className="w-20 h-20 border-8 border-t-8 border-t-yellow-400 border-gray-200 rounded-full animate-spin mx-auto"></div>
            <h2 className="text-white text-xl mt-4 font-semibold">
              Placing Your Order...
            </h2>
            <p className="text-gray-300 text-sm">
              Please wait while we process your payment
            </p>
          </div>
        </div>
      )}
    </>
  );
}
