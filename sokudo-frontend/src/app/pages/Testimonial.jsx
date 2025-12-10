import React from "react";
import Banner from "/bb2.webp";

const Testimonial = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Top Banner */}
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
        <div className="absolute inset-0 -z-10 bg-black/50" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.20),transparent_40%),radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.12),transparent_40%)]" />

        <div className="page-width mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="heading !text-white">Testimonials</h1>
        </div>
      </section>

      {/* Google Review Embed */}
      <div className="heading w-full page-width px-4 py-10">
        <div class="elfsight-app-2aa188de-f645-4af2-ad13-d200520b514d" data-elfsight-app-lazy></div>
      </div>

      {/* Optional Heading Below Widget */}
      <div className="text-center pb-16">
       
        <p className="mt-2 text-gray-600">
          Real reviews fetched directly from Google.
        </p>
      </div>
    </div>
  );
};

export default Testimonial;
