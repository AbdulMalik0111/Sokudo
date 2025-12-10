import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Banner from "/videoimage.jpg";

const cityKeywords = {
  "Delhi NCR": ["delhi", "greater noida", "noida", "ghaziabad", "gurugram", "gurgaon", "faridabad"],
  "Mumbai": ["mumbai", "thane", "palghar"],
  "Bangalore": ["bangalore", "bengaluru"],
  "Hyderabad": ["hyderabad", "secunderabad"],
  "Pune": ["pune", "pimpri", "chinchwad"],
  "Kolkata": ["kolkata", "howrah", "hooghly", "hasimnagar"],
  "Chennai": ["chennai"],
  "Jaipur": ["jaipur"],
  // add or tweak mappings as needed
};

const Locations = () => {
  const [showrooms, setShowrooms] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12); // initially show 12
  const [searchParams] = useSearchParams();
  const cityParam = searchParams.get("city"); // e.g. "Delhi NCR"

  useEffect(() => {
    fetch("/showrooms.json")
      .then((res) => res.json())
      .then((data) => setShowrooms(data))
      .catch((err) => console.error("Error loading data:", err));
  }, []);

  const handleReadMore = () => {
    setVisibleCount((prev) => prev + 12); // load 12 more on click
  };

  // create a normalized matcher for filtering
  const normalize = (s) => (s ? s.toString().toLowerCase() : "");

  const filteredShowrooms = React.useMemo(() => {
    if (!cityParam) return showrooms;
    const keywords = cityKeywords[cityParam] ?? [cityParam.toLowerCase()];
    return showrooms.filter((item) => {
      const cityField = normalize(item.City);
      const locationField = normalize(item["Showroom Location"]);
      const showroomName = normalize(item["Showroom (GMB)"]);
      // check if any keyword appears in city or location or showroom name
      return keywords.some((kw) => cityField.includes(kw) || locationField.includes(kw) || showroomName.includes(kw));
    });
  }, [showrooms, cityParam]);

  const visibleShowrooms = filteredShowrooms.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Top Banner */}
      <section
        className="relative isolate h-[420px] flex flex-col justify-center items-center text-center transition-all duration-300"
        style={{
          marginTop: "calc(var(--announcement-offset) ",
        }}
      >
        <div className="absolute inset-0 -z-10 bg-center bg-cover" style={{ backgroundImage: `url(${Banner})` }} />
        <div className="absolute inset-0 -z-10 bg-black/40" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.20),transparent_40%),radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.12),transparent_40%)]" />

        <div className="page-width mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="heading !text-white">{cityParam ? `Showrooms in ${cityParam}` : "Our Showrooms"}</h1>
          <p className="mt-2 text-lg md:text-xl">Discover Sokudo Showrooms Across India</p>
        </div>
      </section>

      {/* Showrooms Grid */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <h2 className="heading text-3xl font-semibold text-center text-gray-900 mb-12">
          {cityParam ? ` "${cityParam}"` : "Sokudo Showrooms All Over India"}
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleShowrooms.map((item, index) => {
             const showroomImage =
              item.image ||
              item.Image ||
              item["Showroom Image"] ||
              item["img"] ||
              item["Image Path"] ||
              "/news/ss.png";
               return(
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
              <div className="h-44 md:h-48 w-full bg-cover bg-center" style={{ backgroundImage: `url('${showroomImage}')`  }} />
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{item["Showroom (GMB)"]}</h3>
                <p className="text-gray-700 text-sm mb-1">📍 {item["Showroom Location"]}</p>
                <p className="text-gray-600 text-sm flex-1">{item["Showroom Address"]}</p>
                <a
                  href={item["Google Business Profile Link"]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn mt-4 inline-block bg-yellow-400 text-black font-semibold px-4 py-2 rounded-lg text-sm text-center hover:bg-yellow-500 transition"
                >
                  View on Google Maps
                </a>
              </div>
            </div>
          )})}
        </div>

        {/* Read More Button */}
        {visibleCount < filteredShowrooms.length && (
          <div className="flex justify-center mt-8">
            <button onClick={handleReadMore} className="btn bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
              Read More
            </button>
          </div>
        )}

        {/* No results */}
        {filteredShowrooms.length === 0 && (
          <div className="text-center mt-12 text-gray-600">
            No showrooms found for <strong>{cityParam}</strong>. Try another city or view <a href="/location" className="text-blue-600 underline">all locations</a>.
          </div>
        )}
      </section>

      {/* Bottom Models Section */}
      <section className="my-16">
        <h2 className="text-3xl font-semibold text-center text-gray-900 mb-12">Some Models Available at Our Store</h2>
        <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <img src="/productImg/image2.jpg" alt="Model 1" className="rounded-xl shadow-lg hover:scale-105 transition-transform" />
          <img src="/productImg/image5.jpg" alt="Model 2" className="rounded-xl shadow-lg hover:scale-105 transition-transform" />
          <img src="/productImg/image8.jpg" alt="Model 3" className="rounded-xl shadow-lg hover:scale-105 transition-transform" />
        </div>
      </section>
    </div>
  );
};

export default Locations;
