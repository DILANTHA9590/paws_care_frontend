// Checkout.jsx
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function CheckOut() {
  const location = useLocation();
  const { clientSecret, orderId } = location.state.paymentDetails;

  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      setError(result.error.message);
      setLoading(false);
    } else if (result.paymentIntent.status === "succeeded") {
      setSuccess(true);
      await axios.post("/api/update-order-status", {
        orderId: orderId,
        status: "paid",
      });
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Complete Your Payment
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="border border-gray-300 rounded-md p-4">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#32325d",
                    "::placeholder": {
                      color: "#a0aec0",
                    },
                  },
                  invalid: {
                    color: "#fa755a",
                  },
                },
              }}
            />
          </div>
          <button
            type="submit"
            disabled={!stripe || loading || success}
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>

        {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
        {success && (
          <p className="mt-4 text-green-600 text-center">
            Payment Successful! Thank you ❤️
          </p>
        )}
      </div>
    </div>
  );
}
