import React from "react";
import { useLocation, Link } from "react-router-dom";

const ThankYouPage = () => {
  const location = useLocation();

  const {
    formType = "Form",
    message = "We have received your submission.",
  } = location.state || {};

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-xl w-full bg-white shadow-xl rounded-3xl p-8 text-center">

        {/* ICON */}
        <div className="w-16 h-16 mx-auto flex items-center justify-center 
                        rounded-full bg-green-100 text-green-600 text-3xl">
          ✓
        </div>

        {/* TITLE */}
        <h1 className="heading text-3xl font-bold mt-6">
          Thank You!
        </h1>

        {/* FORM TYPE */}
        <p className="mt-2 text-lg text-gray-700">
          Your <span className="font-semibold">{formType}</span> request has been submitted successfully.
        </p>

        {/* MESSAGE */}
        <p className="mt-4 text-gray-500">
          {message}
        </p>

        {/* CTA */}
        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/"
            className="btn !px-6 !py-3 rounded-full bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition"
          >
            Go to Home
          </Link>

          <Link
            to="/contact"
            className="btn !px-6 !py-3 rounded-full !border !border-gray-300 font-semibold !bg-white !text-black !hover:bg-gray-800 transition"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ThankYouPage;
