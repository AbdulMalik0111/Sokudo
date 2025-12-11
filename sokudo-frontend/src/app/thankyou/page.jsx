"use client";
import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const ThankYouPage = () => {
  const searchParams = useSearchParams();

    const formType = searchParams.get("formType") || "Form";
  const message = searchParams.get("message") || "We have received your submission.";


  return (

    <div className="min-h-screen bg-white text-gray-800">
    
          {/* BANNER — unchanged */}
          <section
            className="relative isolate h-[420px] flex flex-col justify-center items-center text-center transition-all duration-300"
            style={{
              marginTop: "calc(var(--announcement-offset) ",
            }}
          >
            <div
              className="absolute inset-0 -z-10 bg-center bg-cover"
              style={{ backgroundImage: `url("/about.webp")` }}
            />
            <div className="absolute inset-0 -z-10 bg-black/40" />
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.20),transparent_40%),radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.12),transparent_40%)]" />
    
            <div className="page-width mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
              <h1 className="heading !text-white">Thank You</h1>
            </div>
          </section>
    
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
            href="/"
            className="btn !px-6 !py-3 rounded-full bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition"
          >
            Go to Home
          </Link>

          <Link
            href="/contact"
            className="btn !px-6 !py-3 rounded-full !border !border-gray-300 font-semibold !bg-white !text-black !hover:bg-gray-800 transition"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
    </div>
  );
};

export default ThankYouPage;
