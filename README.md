# 🐾 Happy Paws Care 🐾

Happy Paws Care is a full-featured MERN stack veterinary service application built to manage pet care, bookings, products, and user interactions with a focus on responsive design and modern development practices.

---

## ✨ Features

- 👑 **Admin Roles Management:** Admin can manage users, reviews, products, and doctors.
- 🔐 **JWT Authentication:** Secure login and authentication for users and admins.
- ✉️ **Email Verification with OTP:** Users must verify their email via OTP before account activation.
- 🧑‍🤝‍🧑 **User Registration & Profile Management:** Users can register, update profiles, and manage their pets.
- 🩺 **Doctor & Booking Management:** Doctors can manage their availability; users can create bookings with doctors.
- 🐕 **Pet Profiles & Medical History:** Users can create pet profiles and view pet medical history.
- 🛒 **E-Commerce:** Users can buy pet food and other products.
- 🛠️ **Product Management:** Admin can create and manage products.
- 📝 **Customer Reviews:** Users can add reviews; admin can manage and block inappropriate reviews.
- 🚫 **User Blocking:** Admin can block users when necessary.
- 📊 **Pagination, Filtering, Lazy Loading:** Enhanced performance with pagination, filters, lazy load, and code splitting.
- ⏳ **Suspense, Throttle, Debounce:** Optimized UI performance and API calls.
- 📱 **Responsive UI:** Built with Tailwind CSS for a mobile-friendly experience.
- 🎨 **Animations:** Smooth UI interactions with Framer Motion.
- 💳 **- 💳 **Payment Integration:** Stripe payment gateway integrated with test mode enabled for secure and safe transactions during development.
- ☁️ **Image Management:** Cloudinary integration for image uploads and management.
- 🌐 **Global State Management:** Using React Context API for efficient state handling.
- 🚀 **Agile Development:** Built with modern agile principles ensuring maintainable and scalable code.

---

## ✉️ Email Verification & OTP Authentication

- When a user registers, an OTP (One-Time Password) is sent to their email.
- User must enter the OTP to verify their email before activating their account.
- Until email verification is successful, the user **cannot log in**.
- If OTP is invalid or expired, user can request a new OTP.
- Login attempts are blocked if email is not verified.

---

## 🛠️ Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/DILANTHA9590/happy-paws-care.git
cd happy-paws-care
npm install
