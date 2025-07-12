import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { TokenContext } from "../../utills/context/countContext";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function AdminDashBoard() {
  const location = useLocation();
  const [dashboardSummary, setDashboardSummary] = useState(null);
  const { token } = useContext(TokenContext);
  const navigate = useNavigate();

  const [firstName, setfname] = useState(location.state?.firstName || "Admin");
  const [lastName, setlname] = useState(location.state?.lastName || "");

  const fakeBookingData = [
    { date: "Mon", bookings: 5 },
    { date: "Tue", bookings: 8 },
    { date: "Wed", bookings: 6 },
    { date: "Thu", bookings: 9 },
    { date: "Fri", bookings: 7 },
    { date: "Sat", bookings: 4 },
    { date: "Sun", bookings: 6 },
  ];

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/admin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDashboardSummary(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [token, navigate]);

  return (
    <div className="p-8">
      <motion.h1
        className="text-4xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
      >
        Hi Admin{" "}
        {`${firstName.charAt(0).toUpperCase() + firstName.slice(1)} ${
          lastName.charAt(0).toUpperCase() + lastName.slice(1)
        }`}
        , your dashboard is ready! 🚀
      </motion.h1>

      {/* Summary Boxes */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded shadow text-center">
          <h3 className="text-lg font-semibold mb-2">Doctors</h3>
          <p className="text-3xl font-bold">
            {dashboardSummary?.doctorsCount ?? "Loading..."}
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow text-center">
          <h3 className="text-lg font-semibold mb-2">Bookings</h3>
          <p className="text-3xl font-bold">
            {dashboardSummary?.bookingsCount ?? "Loading..."}
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow text-center">
          <h3 className="text-lg font-semibold mb-2">Orders</h3>
          <p className="text-3xl font-bold">
            {dashboardSummary?.ordersCount ?? "Loading..."}
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow text-center">
          <h3 className="text-lg font-semibold mb-2">Pets</h3>
          <p className="text-3xl font-bold">
            {dashboardSummary?.petsCount ?? "Loading..."}
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow text-center">
          <h3 className="text-lg font-semibold mb-2">Products</h3>
          <p className="text-3xl font-bold">
            {dashboardSummary?.productsCount ?? "Loading..."}
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow text-center">
          <h3 className="text-lg font-semibold mb-2">Users</h3>
          <p className="text-3xl font-bold">
            {dashboardSummary?.usersCount ?? "Loading..."}
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow text-center col-span-2 md:col-span-1">
          <h3 className="text-lg font-semibold mb-2">Revenue (Today)</h3>
          <p className="text-3xl font-bold">
            ${dashboardSummary?.todayRevenue ?? "Loading..."}
          </p>
        </div>
      </div>

      {/* Bookings Line Chart */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Bookings Over Last Week</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={fakeBookingData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="bookings"
              stroke="#8884d8"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
