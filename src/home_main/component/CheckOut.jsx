// Checkout.jsx
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { div } from "framer-motion/client";
import toast from "react-hot-toast";
import { CiCoins1 } from "react-icons/ci";
import { TokenContext } from "../../utills/context/countContext";

export default function CheckOut() {
  const { token } = useContext(TokenContext);

  const location = useLocation();
  // get order id and paymentid prev page  using use loacation --------------------------->
  const { clientSecret, orderId } = location.state.paymentDetails;

  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //  * Handles the payment submission using Stripe.-------------------------------->
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

      // If Stripe promise fails, update order status to payment failed

      axios
        .put(
          `${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}`,
          {
            status: "payment_fail",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          toast.error("Payment failed. Your order was not paid.");
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (result.paymentIntent.status === "succeeded") {
      toast.success("Payment successfully");

      setSuccess(true);

      // If Stripe promise success, update order status to payment paid

      axios
        .put(
          `${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}`,
          {
            status: "paid",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          navigate("/myorders");
          console.log("run this bro");
        })
        .catch((err) => {
          toast.error("something went awrong please try again");
        });
      setLoading(false);
    }
  };

  return (
    <div>
      {!clientSecret ? (
        <></>
      ) : (
        // card details input strip  form------------------------------------------------>
        <div className="flex justify-center items-center min-h-screen bg-gray-300 p-4">
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

            {/* payment succss after show suceess mesagge------------------------> */}
            {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
            {success && (
              <p className="mt-4 text-green-600 text-center">
                Payment Successful! Thank you ❤️
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
