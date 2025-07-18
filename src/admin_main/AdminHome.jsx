import React, { useContext, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import CustomersPanel from "./pages/CustomersPanel";
import ProductsPanel from "./pages/ProductsPanel";
import AdminBookingPanel from "./pages/AdminBookingPanel";
import ImageUploader from "./pages/ImageUpload";
import AdminDoctors from "./pages/AdminDoctors";
import AdminDashBoard from "./pages/AdminDashBoard";
import AddProduct from "./components/AddProduct";
import UpdateUser from "./components/UpdateUser";
import ManageReviews from "./pages/ManageReviews";
import AdminOrders from "./pages/AdminOrders";
import DoctorCreate from "./pages/DoctorCreate";
import { FaSignOutAlt } from "react-icons/fa";
import { TokenContext } from "../utills/context/countContext";

export default function AdminHome() {
  const { token } = useContext(TokenContext);

  useEffect(() => {
    er;
  }, []);
  function logOut() {
    localStorage.removeItem("token");
    navigate("/");
  }
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="h-[15vh] bg-blue-700 flex items-center justify-center shadow-md">
        <h1 className="text-white text-3xl font-bold tracking-wide">
          Admin Dashboard
        </h1>
      </header>

      {/* Layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-[18%] bg-gray-800 text-white p-6 space-y-5">
          <nav className="flex flex-col gap-4 text-base font-medium">
            <Link
              to="/admin/"
              className="hover:bg-blue-600 px-4 py-2 rounded transition"
            >
              🏠 Dashboard
            </Link>
            <Link
              to="/admin/manageusers"
              className="hover:bg-blue-600 px-4 py-2 rounded transition"
            >
              👥 Customers
            </Link>
            <Link
              to="/admin/products"
              className="hover:bg-blue-600 px-4 py-2 rounded transition"
            >
              📦 Products
            </Link>
            <Link
              to="/admin/manageappointment"
              className="hover:bg-blue-600 px-4 py-2 rounded transition"
            >
              📅 Bookings
            </Link>
            <Link
              to="/admin/managedoctors"
              className="hover:bg-blue-600 px-4 py-2 rounded transition"
            >
              🩺 Doctors
            </Link>
            <Link
              to="/admin/manageorders"
              className="hover:bg-blue-600 px-4 py-2 rounded transition"
            >
              📦 Manage Orders
            </Link>
            <Link
              to="/admin/image"
              className="hover:bg-blue-600 px-4 py-2 rounded transition"
            >
              📁 Upload Image
            </Link>

            <Link
              to="/admin/managereviews"
              className="hover:bg-blue-600 px-4 py-2 rounded transition"
            >
              🌟 Manege reviews
            </Link>

            <div className="px-5 p-4">
              <button
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md shadow-md transition duration-200"
                onClick={logOut}
              >
                <FaSignOutAlt />
                LOG OUT
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-white overflow-y-auto shadow-inner">
          <Routes>
            <Route path="/*" element={<AdminDashBoard />} />
            <Route path="manageusers" element={<CustomersPanel />} />
            <Route path="products" element={<ProductsPanel />} />
            <Route path="manageappointment" element={<AdminBookingPanel />} />
            <Route path="image" element={<ImageUploader />} />
            <Route path="managedoctors" element={<AdminDoctors />} />
            <Route path="reviews" element={<h1>Admin Reviews</h1>} />
            <Route path="updateuser" element={<UpdateUser />} />

            <Route path="addproduct" element={<AddProduct />} />
            <Route path="managereviews" element={<ManageReviews />} />
            <Route path="manageorders" element={<AdminOrders />} />
            <Route path="createdoctor" element={<DoctorCreate />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
