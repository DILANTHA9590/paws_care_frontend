import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";
export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="bg-amber-100 relative text-amber-900 mt-10 overflow-hidden"
    >
      {/* Paw pattern overlay */}
      <div className="absolute inset-0 bg-[url('/paw-pattern.png')] opacity-5 bg-cover bg-center pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h1 className="text-2xl font-bold text-amber-800 mb-2">
            Happy Paws 🐾
          </h1>
          <p className="text-sm leading-relaxed">
            Heartfelt care for your furry family members. We treat them like our
            own.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h2 className="font-semibold text-lg mb-3">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-amber-600 transition">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-amber-600 transition">
                About Us
              </a>
            </li>
            <li>
              <a href="/services" className="hover:text-amber-600 transition">
                Services
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-amber-600 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="font-semibold text-lg mb-3">Contact Us</h2>
          <p className="text-sm">📍 123 Pet Street, Cat City</p>
          <p className="text-sm">📞 +94 77 123 4567</p>
          <p className="text-sm">✉️ hello@happypaws.lk</p>
        </div>

        {/* Social Links */}
        <div>
          <h2 className="font-semibold text-lg mb-3">Follow Us</h2>
          <div className="flex space-x-4 text-xl mt-2">
            <a href="#" className="hover:text-blue-600 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-pink-500 transition">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-sky-500 transition">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom note */}
      <div className="relative z-10 text-center text-xs py-4 border-t border-amber-300">
        © {new Date().getFullYear()} Happy Paws Care. All rights reserved.
      </div>
    </motion.footer>
  );
}
