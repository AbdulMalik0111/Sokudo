import React from "react";
import { Link } from "react-router-dom";
import Banner from "/pd.webp";
import { GiScooter } from "react-icons/gi";

const NotFoundPage = () => {
  return (
    <div
      className="min-h-screen bg-white text-gray-800"
      style={{
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(75, 85, 99, 0.08) 20px, rgba(75, 85, 99, 0.08) 21px),
          repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(107, 114, 128, 0.06) 30px, rgba(107, 114, 128, 0.06) 31px),
          repeating-linear-gradient(60deg, transparent, transparent 40px, rgba(55, 65, 81, 0.05) 40px, rgba(55, 65, 81, 0.05) 41px),
          repeating-linear-gradient(150deg, transparent, transparent 35px, rgba(31, 41, 55, 0.04) 35px, rgba(31, 41, 55, 0.04) 36px)
        `,
      }}
    >
      {/* TOP BANNER */}
      <section
        className="relative isolate h-[420px] flex flex-col justify-center items-center text-center"
        style={{ marginTop: "calc(var(--announcement-offset))" }}
      >
        <div
          className="absolute inset-0 -z-10 bg-center bg-cover"
          style={{ backgroundImage: `url(${Banner})` }}
        />
        <div className="absolute inset-0 -z-10 bg-black/40" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.20),transparent_40%),radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.12),transparent_40%)]" />

        <div className="page-width mx-auto px-4 text-white">
          <h1 className="heading !text-white">Not Found</h1>
        </div>
      </section>

      {/* CONTENT */}
      <section className="flex items-center justify-center text-center px-6 py-16">
        <div className="max-w-lg">

          {/* ICON */}
          <div className="flex justify-center">
            <GiScooter className="text-[90px] text-gray-700" />
          </div>

          {/* TITLE */}
          <h2 className="mt-8 text-3xl md:text-4xl font-bold text-gray-900">
            404 – Page Not Found
          </h2>

          {/* DESCRIPTION */}
          <p className="mt-6 text-gray-600 text-base md:text-lg">
            Looks like this route took a wrong turn.
            The page you are trying to reach doesn’t exist anymore.
          </p>

          {/* BUTTON */}
          <Link
            to="/"
            className="inline-block mt-10 px-8 py-3 rounded-full bg-gray-900 text-white text-sm font-semibold hover:bg-black transition"
          >
            Back to Home
          </Link>

          {/* FOOTER */}
          <p className="mt-12 text-xs text-gray-400">
            © {new Date().getFullYear()} Sokudo. All rights reserved.
          </p>
        </div>
      </section>
    </div>
  );
};

export default NotFoundPage;
