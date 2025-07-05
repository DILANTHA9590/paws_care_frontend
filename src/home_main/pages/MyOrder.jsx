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
        setOrders(res.data.orderData || []); // Adjust based on your response structure
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load orders");
      })
      .finally(() => setLoading(false));
  }, [token, navigate]);

  if (loading) {
    return <Loading />;
  }

  if (!orders.length) {
    return (
      <div className="text-center py-10 text-lg text-gray-700">
        You have no orders yet.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">My Orders</h1>

      <ul className="space-y-6">
        {orders.map((order) => (
          <li
            key={order._id}
            className="border rounded-lg p-4 shadow hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-bold text-xl">Order ID: {order.orderId}</h2>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  order.status === "Pending"
                    ? "bg-yellow-200 text-yellow-800"
                    : order.status === "Paid"
                    ? "bg-green-400 text-green-800"
                    : "bg-red-600 text-gray-800"
                }`}
              >
                {order.status}
              </span>
            </div>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(order.date).toLocaleString(undefined, {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>
            <p>
              <strong>Total Price:</strong> Rs : {order.totalPrice}
            </p>
            <p>
              <strong>Shipping Address:</strong> {order.address}
            </p>
            <p>
              <strong>Contact:</strong> {order.name} - {order.mobileNumber}
            </p>

            <div className="mt-4">
              <h3 className="font-semibold mb-2">Ordered Items:</h3>
              <ul className="list-disc list-inside">
                {order.orderedItems.map((item, idx) => (
                  <li key={idx}>
                    {item.productName} x {item.quantity} - Rs : {item.price}
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
