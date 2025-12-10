import React from "react";
import { NavLink } from "react-router-dom";
import Banner from "/pd1.webp";
import SokudoFeatureGrid from "./FeaturesGrid";

const FeatureSections = () => {
  const sections = [
    {
      id: 1,
      title: "Endurance Tested",
      heading: "Reliable Safety For Peace Of Mind.",
      points: ["IP67 Water & Dust Resistance", "AIS 156 Certified", "Crash, Fall & Anti-Theft Alert", "Disc Brakes"],
      description:
        "Experience the confidence of superior safety features, designed to offer reliable protection and peace of mind on every journey.",
      btn: "Book Sukodo",
      img: "/productImg/DSC_9125.jpg",
      reverse: false,
      bg: "bg-gradient-to-br from-yellow-300 via-cyan-200 to-blue-300",
    },
    {
      id: 2,
      title: "Power Packed",
      heading: "Performance That Excites.",
      points: ["High Torque Motor", "Smooth Acceleration", "Long Riding Range", "Fast Charging Support"],
      description:
        "Enjoy thrilling performance with a reliable system built for daily commuting and long routes.",
      btn: "Explore Performance",
      img: "/productImg/seven.webp",
      reverse: true,
      bg: "bg-gradient-to-bl from-yellow-200 via-blue-200 to-cyan-300",
    },
    {
      id: 3,
      title: "Smart Technology",
      heading: "Connected Riding Experience.",
      points: ["Smart Dashboard", "Bluetooth Connectivity", "Live Vehicle Tracking", "Anti-Theft Alerts"],
      description:
        "Stay connected and ride smart with features that bring convenience and control right at your fingertips.",
      btn: "Discover Smart Tech",
      img: "/productImg/DSC_9179.jpg",
      reverse: false,
      bg: "bg-gradient-to-r from-yellow-300 via-cyan-100 to-blue-200",
    },
  ];

  return (
    <div className="w-full">

      {/* Banner */}
      <section
        className="relative isolate h-[420px] flex flex-col justify-center items-center text-center transition-all duration-300"
        style={{
          marginTop: "calc(var(--announcement-offset) ",
        }}
      >
        <div
          className="absolute inset-0 -z-10 bg-center bg-cover"
          style={{ backgroundImage: `url(${Banner})` }}
        />
        <div className="absolute inset-0 -z-10 bg-black/40" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.20),transparent_40%),radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.12),transparent_40%)]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className=" heading !text-white">
            Sokudo Features
          </h1>
        </div>
      </section>

      {/* ⭐ Added Header Below Banner */}
      <h2 className="heading text-center text-3xl font-semibold mt-6 mb-[-4px] text-gray-900">
        Features
      </h2>

      {/* Sections */}
      <div className="w-full flex flex-col gap-4 py-6">
        {sections.map((sec) => (
          <div
            key={sec.id}
            className={`${sec.bg} rounded-3xl py-2 px-4 flex flex-col 
            ${sec.reverse ? "md:flex-row-reverse" : "md:flex-row"} 
            items-center justify-between gap-6 shadow-xl`}
          >
            {/* Image */}
            <div className="w-full md:w-1/2">
              <img
                src={sec.img}
                alt={sec.heading}
                className="w-full rounded-2xl shadow-md object-cover"
              />
            </div>

            {/* Text */}
            <div className="w-full md:w-1/2 flex flex-col gap-3 px-2 md:px-6">
              <p className="text-lg font-semibold text-gray-700">{sec.title}</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{sec.heading}</h2>

              <ul className="flex flex-col gap-1.5 text-lg">
                {sec.points.map((p, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span>✔️</span> {p}
                  </li>
                ))}
              </ul>

              <p className="text-gray-700">{sec.description}</p>

              <NavLink
                to="/our-model"
                className="mt-3 btn w-fit px-5 py-2.5 bg-black text-white rounded-xl hover:bg-gray-800 transition"
              >
                {sec.btn}
              </NavLink>
            </div>
          </div>
        ))}
      </div>

      <SokudoFeatureGrid />
    </div>
  );
};

export default FeatureSections;
