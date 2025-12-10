import React, { useState } from "react";
import BookingModal from "../components/BookingModal";
import toast from "react-hot-toast";
import LocationFinder from "../components/LocationFinder";
import { useNavigate } from "react-router-dom";

const TestRidePage = () => {
  const [openModal, setOpenModal] = useState(false);

  const initialFormState = {
    name: "",
    email: "",
    phone: "",
    pincode: "",
    date: "",
    time: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  const navigate = useNavigate();

  // ✅ same logic as StoreBookingSection
  const isFormComplete = Object.values(formData).every(Boolean);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ same success handler style
  const handleBookingSuccess = () => {
    navigate("/thankyou", {
      state: {
        formType: "Test Ride",
        message: `Your test ride  has been booked successfully. Our team will contact you shortly.`,
      },});
    toast.success("Test Ride Booked Successfully ");
    setFormData(initialFormState);
    setOpenModal(false);

  };

  return (
    <>
      {/* MODAL – same props as StoreBookingSection */}
      <BookingModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        formData={formData}
        onSuccess={handleBookingSuccess}
      />

      {/* HERO SECTION */}
      <section
        className="relative min-h-[90vh] flex items-center px-4 py-8"
        style={{
          marginTop: "calc(var(--announcement-offset))",
        }}
      >
        {/* BG IMAGE */}
        <div
          className="absolute inset-0 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: "url('/test1.webp')" }}
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />

        {/* CONTENT */}
        <div className="relative z-10 w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start text-white">
          {/* LEFT CONTENT */}
          <div className="pt-10">
            <span className="uppercase tracking-widest text-sm text-yellow-400">
              Test Ride
            </span>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight mt-4">
              Experience the Ride <br />
              <span className="text-yellow-400">Before You Decide</span>
            </h1>

            <p className="mt-6 text-gray-300 max-w-lg">
              Book a test ride and feel the real power, comfort, and performance.
              Our team will assist you in choosing the perfect ride.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-4 max-w-sm">
              <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                ⚡ Zero Emission
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                🛵 Smooth Ride
              </div>
            </div>
          </div>

          {/* RIGHT FORM – same data handling as StoreBookingSection */}
          <div className="bg-white text-black rounded-3xl shadow-2xl border border-gray-100 p-8 md:p-10 mt-16 lg:mt-12">
            <h2 className="text-2xl font-bold mb-2">Book Your Test Ride</h2>
            <p className="text-gray-500 mb-8 text-sm">
              Fill in your details and we’ll contact you shortly.
            </p>

            <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-600">
                  Full Name
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="px-5 py-3 rounded-full border focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-600">
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  className="px-5 py-3 rounded-full border focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-600">
                  Phone Number
                </label>
                <input
                  name="phone"
                  type="tel"
                  placeholder="+91 9XXXXXXXXX"
                  value={formData.phone}
                  onChange={handleChange}
                  className="px-5 py-3 rounded-full border focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              {/* Pincode */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-600">
                  Pincode
                </label>
                <input
                  name="pincode"
                  type="number"
                  placeholder="Area pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="px-5 py-3 rounded-full border focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              {/* Date */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-600">
                  Preferred Date
                </label>
                <input
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="px-5 py-3 rounded-full border focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              {/* Time */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-600">
                  Preferred Time
                </label>
                <input
                  name="time"
                  type="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="px-5 py-3 rounded-full border focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              {/* BUTTON */}
              <button
                type="button"
                disabled={!isFormComplete}
                onClick={() => setOpenModal(true)}
                className={`sm:col-span-2 mt-6 rounded-full py-4 text-sm font-semibold transition
                  ${
                    isFormComplete
                      ? "bg-[#ffb200] hover:bg-yellow-400 text-black"
                      : "bg-gray-300 text-gray-600 cursor-not-allowed"
                  }`}
              >
                BOOK TEST RIDE
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* LOCATION SECTION */}
      <LocationFinder />
    </>
  );
};

export default TestRidePage;
