import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { TokenContext } from "../../utills/context/countContext";
import toast from "react-hot-toast";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import Loading from "../component/err_ui/Loading";
import ServerErr from "../component/err_ui/ServerErr";
import NetworkErr from "../component/err_ui/NetworkErr";
import { CiStar } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import RatingComponent from "../component/RatingComponent";

export default function MyBookings() {
  const { token } = useContext(TokenContext);
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [err, setErr] = useState();
  const [iindex, setIndex] = useState([1]);
  const [showRating, setShowRating] = useState(false);

  const [ratingData, setRatingData] = useState({
    doctorId: "",
    customerId: "",
    rating: "",
    Comment: "",
  });

  useEffect(() => {
    if (!token) {
      navigate("/login");
      toast.error("Please sign in again");
      return;
    }

    if (!loaded) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/bookings/customer`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res.data?.bookings.length > 0) {
            setBookingData(res.data?.bookings || []);
          } else {
            toast.success("No available bookings found.");
          }
          setLoaded(true);
        })
        .catch((err) => {
          console.error(err);
          if (err.status) {
            setErr(err.status);
          } else {
            setErr("network");
          }
          setLoaded(true);
        });
    }
  }, [token, loaded]);

  if ([500].includes(err)) {
    return (
      <>
        <ServerErr />
      </>
    );
  }

  if (err == "network") {
    return (
      <>
        <NetworkErr />
      </>
    );
  }

  const handleDeleteBooking = (bookingId) => {
    if (!window.confirm("Are you sure you want to delete this booking?"))
      return;

    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/api/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setLoaded(false);
        toast.success("Booking deleted successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to delete booking");
      });
  };

  if (!loaded) {
    return <Loading />;
  }

  if (bookingData.length === 0 && loaded) {
    return (
      <div className="h-full flex flex-col justify-center items-center p-8 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-purple-400 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h6m-6 4h6m2 4H7a2 2 0 01-2-2V6a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V20a2 2 0 01-2 2z"
          />
        </svg>
        <p className="text-lg text-gray-500 italic mb-2">
          You don’t have any bookings yet.
        </p>
        <p className="text-sm text-gray-400">
          Book a service to see it appear here!
        </p>
      </div>
    );
  }

  const StatusBadge = ({ status }) => {
    const colors = {
      confirm: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      cancelled: "bg-red-100 text-red-800",
      completed: "bg-blue-100 text-blue-800",
      default: "bg-gray-100 text-gray-700",
    };
    const colorClass = colors[status?.toLowerCase()] || colors.default;
    return (
      <span
        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${colorClass} mr-3`}
      >
        Booking Status: {status?.charAt(0).toUpperCase() + status?.slice(1)}
      </span>
    );
  };

  return (
    <div>
      <div className="mx-auto p-8 h-full overflow-hidden overflow-y-auto ">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-purple-700 tracking-wide">
          🗓️ My Bookings
        </h1>

        <ul className="space-y-6">
          {bookingData.map((booking) => (
            <li
              key={booking._id}
              className="border border-purple-300 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white"
            >
              <div className="flex flex-wrap justify-between items-center mb-4 gap-3">
                <div className="flex items-center">
                  <StatusBadge status={booking.status} />
                  <h2 className="text-xl font-bold text-purple-900">
                    Booking Number:{" "}
                    <span className="text-indigo-600">
                      {booking.bookingNumber}
                    </span>
                  </h2>
                </div>

                <button
                  onClick={() => {
                    handleDeleteBooking(booking._id);
                  }}
                  className="text-red-600 hover:text-red-800 transition"
                  aria-label="Delete Booking"
                  title="Delete Booking"
                >
                  <MdDelete size={26} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 mb-4">
                <div>
                  <p>
                    <strong>Booking ID:</strong>{" "}
                    <span className="text-purple-600">{booking.bookingId}</span>
                  </p>
                  <p>
                    <strong>Pet ID:</strong>{" "}
                    <span className="text-purple-600">{booking.petId}</span>
                  </p>
                  <p>
                    <strong>Doctor ID:</strong>{" "}
                    <span className="text-purple-600">{booking.doctorId}</span>
                  </p>
                  <p>
                    <strong>User ID:</strong>{" "}
                    <span className="text-purple-600">{booking.userId}</span>
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Mobile No:</strong>{" "}
                    <span className="text-purple-600">{booking.mobileno}</span>
                  </p>
                  <p>
                    <strong>Booked On:</strong>{" "}
                    <span className="text-purple-600">
                      {new Date(booking.createdAt).toLocaleDateString(
                        undefined,
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </span>
                  </p>
                </div>
              </div>

              {/* ✅ Add Review Button */}
              <div className="mt-4">
                {booking.isConfirm == "no" && (
                  <button
                    onClick={() => {
                      setShowRating(true); // 🔗 Replace this with your navigation
                    }}
                    className="inline-block px-5 py-2 bg-purple-600 text-white font-semibold rounded-full shadow hover:bg-purple-700 transition"
                  >
                    ➕ Add Review
                  </button>
                )}
              </div>

              {showRating && (
                <RatingComponent
                  setShowRating={setShowRating}
                  setLoaded={setLoaded}
                  userData={{
                    bookingId: booking.bookingId,
                    doctor: booking.doctorId,
                    user: booking.userId,
                  }}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
