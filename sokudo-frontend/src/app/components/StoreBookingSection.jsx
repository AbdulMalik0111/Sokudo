import React, { useState } from "react";
import BookingModal from "./BookingModal";
import toast from "react-hot-toast";

const StoreBookingSection = () => {
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

  const isFormComplete = Object.values(formData).every(Boolean);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBookingSuccess = () => {
    toast.success("Test Ride Booked Successfully ");
    setFormData(initialFormState);
    setOpenModal(false);
  };

  return (
    <>
      {/* MODAL */}
      <BookingModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        formData={formData}
        onSuccess={handleBookingSuccess}
      />

      <section
        id="test-ride"
        className="relative py-14 px-4 bg-gradient-to-b from-gray-50 to-white"
        aria-labelledby="test-ride-heading"
      >
        <div className="text-center mb-12">
          <h2 id="test-ride-heading" className="heading">
            Book Your Test Ride
          </h2>
        </div>

        <div className="page-width max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-stretch">

            {/* LEFT IMAGE */}
            <div className="flex items-center justify-center lg:h-[520px]">
              <img
                src="/store.webp"
                alt="Sokudo Electric Store showroom"
                className="h-full w-full object-cover rounded-3xl shadow-xl"
                loading="lazy"
                draggable="false"
              />
            </div>

            {/* RIGHT FORM */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8 lg:h-[520px] flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-1">
                Sokudo Electric Store
              </h3>
              <p className="text-gray-500 mb-6 text-sm">
                Schedule your test ride at the nearest store.
              </p>

              <form
                className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                role="form"
                aria-label="Book test ride form"
              >
                {/* Name */}
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="name"
                    className="text-xs font-medium text-gray-600"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="px-4 py-3 rounded-full border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>


                 <div className="flex flex-col gap-1">
    <label htmlFor="email" className="text-xs font-medium text-gray-600">
      Email Address
    </label>
    <input
      id="email"
      name="email"
      placeholder="Email"
      type="email"
      value={formData.email}
      onChange={handleChange}
      className="px-4 py-3 rounded-full border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400r"
    />
  </div>

                {/* Phone */}
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="phone"
                    className="text-xs font-medium text-gray-600"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 9XXXXXXXXX"
                    className="px-4 py-3 rounded-full border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>

                {/* Pincode */}
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="pincode"
                    className="text-xs font-medium text-gray-600"
                  >
                    Pincode
                  </label>
                  <input
                    id="pincode"
                    name="pincode"
                    type="number"
                    autoComplete="postal-code"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="Area pincode"
                    className="px-4 py-3 rounded-full border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>

                {/* Date */}
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="date"
                    className="text-xs font-medium text-gray-600"
                  >
                    Preferred Date
                  </label>
                  <input
                    id="date"
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="px-4 py-3 rounded-full border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>

                {/* Time */}
                <div className="flex flex-col gap-1 ">
                  <label
                    htmlFor="time"
                    className="text-xs font-medium text-gray-600"
                  >
                    Preferred Time
                  </label>
                  <input
                    id="time"
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="px-4 py-3 rounded-full border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>

                {/* Button */}
                <button
                  type="button"
                  disabled={!isFormComplete}
                  aria-disabled={!isFormComplete}
                  aria-label="Open test ride booking confirmation"
                  onClick={() => setOpenModal(true)}
                  className={`mt-4 sm:col-span-2 rounded-full py-3 text-sm font-semibold tracking-wide transition duration-200
                    ${
                      isFormComplete
                        ? "bg-[#ffb200] hover:bg-yellow-400 text-black shadow-md"
                        : "bg-gray-300 cursor-not-allowed text-gray-600"
                    }`}
                >
                  BOOK TEST RIDE
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default StoreBookingSection;
