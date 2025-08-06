import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

export default function ContactUs() {
  return (
    <div className="h-full overflow-hidden overflow-y-auto flex flex-col items-center bg-gray-50 p-6 ">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-amber-600 mb-2">
          Contact Happy Paws Care
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We’re here to help your pets stay healthy and happy! Reach out to book
          your vet appointment or ask anything.
        </p>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <form className="bg-white p-8 shadow-2xl rounded-2xl flex flex-col gap-4">
          <h2 className="text-2xl font-semibold mb-2">Send Us a Message</h2>
          <div>
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Email Address</label>
            <input
              type="email"
              placeholder="john@example.com"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Phone Number</label>
            <input
              type="tel"
              placeholder="+94 77 123 4567"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Message</label>
            <textarea
              rows="5"
              placeholder="Tell us how we can help you..."
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition font-semibold"
          >
            Send Message
          </button>
        </form>

        {/* Contact Details */}
        <div className="flex flex-col gap-6">
          <div className="bg-white p-8 shadow-2xl rounded-2xl">
            <h2 className="text-2xl font-semibold mb-4">Our Contact Info</h2>
            <p className="flex items-center gap-2 mb-2">
              <FaPhoneAlt className="text-amber-600" /> +94 77 123 4567
            </p>
            <p className="flex items-center gap-2 mb-2">
              <FaEnvelope className="text-amber-600" /> info@happypawscare.lk
            </p>
            <p className="flex items-center gap-2 mb-2">
              <FaMapMarkerAlt className="text-amber-600" /> 123 Pet Street,
              Colombo, Sri Lanka
            </p>
          </div>

          <div className="bg-white p-8 shadow-2xl rounded-2xl">
            <h2 className="text-2xl font-semibold mb-4">Opening Hours</h2>
            <p className="flex items-center gap-2 mb-1">
              <FaClock className="text-amber-600" /> Mon - Fri: 8:00 AM - 8:00
              PM (Doctors available)
            </p>
            <p className="flex items-center gap-2 mb-1">
              <FaClock className="text-amber-600" /> Saturday: 9:00 AM - 5:00 PM
              (Limited appointments)
            </p>
            <p className="flex items-center gap-2 mb-1">
              <FaClock className="text-amber-600" /> Sunday: Closed (Emergency
              only)
            </p>
          </div>

          <div className="bg-white p-8 shadow-2xl rounded-2xl">
            <h2 className="text-2xl font-semibold mb-4">Follow Us</h2>
            <div className="flex gap-4 text-white text-2xl">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 p-3 rounded-full hover:bg-blue-700"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-pink-500 to-yellow-500 p-3 rounded-full hover:opacity-90"
              >
                <FaInstagram />
              </a>
              <a
                href="https://wa.me/94771234567"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 p-3 rounded-full hover:bg-green-600"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>

          <div className="bg-white p-8 shadow-2xl rounded-2xl">
            <h2 className="text-2xl font-semibold mb-4">Our Location</h2>
            <div className="w-full h-64 rounded-lg overflow-hidden">
              <iframe
                title="Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63343.64698193031!2d79.8562051!3d6.927078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2595f6ef762d7%3A0xe40a8962e2b2fc90!2sColombo!5e0!3m2!1sen!2slk!4v1689589166621!5m2!1sen!2slk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
