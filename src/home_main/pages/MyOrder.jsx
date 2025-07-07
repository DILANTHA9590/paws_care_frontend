import React, { useContext, useEffect, useState } from "react";
import { TokenContext } from "../../utills/context/countContext";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import axios from "axios";
import Loading from "../component/err_ui/Loading";

export default function MyOrder() {
  const { token } = useContext(TokenContext);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch orders when component mounts
  useEffect(() => {
    if (!token) {
      navigate("/login");
      toast.error("Please Sign In again");
      return;
    }

    setLoading(true);

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setOrders(res.data.orderData || []);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load orders");
      })
      .finally(() => setLoading(false));
  }, [token, navigate]);

  // ✅ Show loading spinner while fetching
  if (loading) {
    return <Loading />;
  }

  // ✅ Show fallback if no orders
  if (!orders.length) {
    return (
      <div className="text-center py-10 text-lg text-gray-500 italic">
        🛒 You have no orders yet.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-purple-700 text-center">
        🧾 My Orders
      </h1>

      <ul className="space-y-8">
        {orders.map((order) => (
          <li
            key={order._id}
            className="border border-purple-300 rounded-xl p-6 shadow-lg hover:shadow-2xl transition duration-300 bg-white"
          >
            {/* ✅ Order header with ID + Status badge */}
            <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
              <h2 className="text-xl font-bold text-purple-900">
                Order ID:{" "}
                <span className="text-indigo-600">{order.orderId}</span>
              </h2>
              <span
                className={`px-4 py-1 rounded-full text-sm font-bold shadow-sm ${
                  order.status === "Pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : order.status === "Paid"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {order.status}
              </span>
            </div>

            {/* ✅ Order details section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
              <div>
                <p>
                  <strong>Date:</strong>{" "}
                  <span className="text-purple-700">
                    {new Date(order.date).toLocaleString(undefined, {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </span>
                </p>
                <p>
                  <strong>Total:</strong>{" "}
                  <span className="text-green-700">Rs {order.totalPrice}</span>
                </p>
              </div>

              <div>
                <p>
                  <strong>Shipping Address:</strong>{" "}
                  <span className="text-purple-700">{order.address}</span>
                </p>
                <p>
                  <strong>Contact:</strong>{" "}
                  <span className="text-purple-700">
                    {order.name} - {order.mobileNumber}
                  </span>
                </p>
              </div>
            </div>

            {/* ✅ Ordered items list */}
            <div className="mt-4">
              <h3 className="font-semibold text-gray-800 mb-2">
                🗂️ Ordered Items:
              </h3>
              <ul className="space-y-1">
                {order.orderedItems.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between bg-purple-50 rounded px-3 py-2"
                  >
                    <span>
                      {item.productName} x {item.quantity}
                    </span>
                    <span>Rs {item.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
