import React, { useState } from "react";
import { FiExternalLink } from "react-icons/fi";
import BannerVideo from "/acutevid.mp4"; 
import Banner from "/press1.webp";

export default function PressReleases() {
  const [popupImage, setPopupImage] = useState(null);

  // ----- PRESS RELEASE LINKS -----
 const pressLinks = [
  {
    url: "https://auto.economictimes.indiatimes.com/news/two-wheelers/sokudo-electric-launches-3-e2ws-aims-to-capture-15-20-market-shares/108068946",
    title: "Sokudo launches 3 new electric scooters targeting 15-20% market share"
  },
  {
    url: "https://economictimes.indiatimes.com/industry/renewables/electric-two-wheeler-maker-sokudo-electric-to-establish-100-flagship-stores-across-india-by-fy25/articleshow/112192627.cms",
    title: "Sokudo to open 100 flagship stores across India by FY25"
  },
  {
    url: "https://evupdatemedia.com/sokudo-electric-unveils-three-new-scooters/",
    title: "Sokudo unveils 3 new electric scooters"
  },
  {
    url: "https://auto.economictimes.indiatimes.com/news/auto-components/sokudo-electric-to-build-in-house-motor-and-controller-plant-to-boost-e2w-rd/109578079",
    title: "Sokudo announces in-house motor & controller plant"
  },
  {
    url: "https://evtechnews.in/sokudo-electric-to-establish-100-flagship-stores-across-india-by-fy-24-25/",
    title: "Sokudo to expand with 100 flagship stores"
  },
  {
    url: "https://restofworld.org/2024/3-minutes-with-prashant-vashishtha/",
    title: "3 Minutes with Prashant Vashishtha – Rest of World"
  },
  {
    url: "https://www.theweekendleader.com/Success/3288/powering-the-charge.html",
    title: "Powering The Charge – Sokudo Success Story"
  },
  {
    url: "https://hindi.news24online.com/auto/top-5-best-mileage-electric-scooters-price-starts-at-51000/869736/",
    title: "Top 5 Mileage Scooters – Includes Sokudo Electric"
  },
  {
    url: "http://deviantart.com/sokudoindiaev/art/The-Surge-of-Electric-Scooters-in-India-A-Greener-1050088848",
    title: "The Surge of Electric Scooters in India – DeviantArt"
  },
  {
    url: "https://auto.hindustantimes.com/auto/electric-vehicles/sokudo-launches-three-electric-scooters-with-riding-range-of-up-to-105-km-41709111438101.html",
    title: "Hindustan Times – Sokudo launches 3 EV scooters"
  }
];


  // ----- PRESS IMAGES -----
 const TOTAL_PRESS_IMAGES = 19; 
const pressImages = Array.from(
  { length: TOTAL_PRESS_IMAGES },
  (_, i) => `/press/press${i + 1}.jpg`
);

  return (
    <>
      {/* ===== PAGE BANNER ===== */}
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
    
            <div className="page-width mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
              <h1 className="heading !text-white">Press Releases</h1>
            </div>
          </section>

      {/* ===== PAGE CONTENT ===== */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        {/* ----------------- TOP: PRESS LINKS WITH IMAGES ----------------- */}
        <h2 className="heading text-center mb-10">Official Articles</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
  {pressLinks.map((item, i) => (
    <a
      key={i}
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm hover:shadow-md transition block"
    >
      <div className="overflow-hidden rounded-lg">
        <img
          src={`/news/news${i + 1}.webp`}
          alt={item.title}
          className="w-full h-40 object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>

      <div className="mt-3 flex items-start gap-2 text-gray-900 text-sm font-semibold leading-tight">
        <span className="line-clamp-2">{item.title}</span>
      </div>
    </a>
  ))}
</div>


        {/* ----------------- BOTTOM: PRESS IMAGES ----------------- */}
        <h2 className="heading text-center mt-16 mb-10">
          Press Coverage Gallery
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6">
          {pressImages.map((img, i) => (
            <div
              key={i}
              className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm hover:shadow-md cursor-pointer transition group"
              onClick={() => setPopupImage(img)}
            >
              <div className="overflow-hidden rounded-lg">
                <img
                  src={img}
                  alt="Press Cutting"
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>
          ))}
        </div>

        {/* ----- Image Zoom Popup ----- */}
        {popupImage && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setPopupImage(null)}
          >
            <img
              src={popupImage}
              className="max-w-[90vw] max-h-[90vh] rounded-xl shadow-xl object-contain"
            />
          </div>
        )}
      </section>
    </>
  );
}
