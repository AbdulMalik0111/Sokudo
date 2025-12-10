import React from "react";
import { Tab } from "@headlessui/react";

const ProductTabs = () => {
  return (
    <div className="w-full py-10 px-10 border border-solid border-gray-200 rounded-2xl mt-16 bg-white shadow-sm">
      <Tab.Group>
        {/* --- Tabs Header --- */}
        <Tab.List className="flex flex-wrap gap-3 bg-gray-50 p-2 rounded-xl border border-gray-100">
          {["Description", "Additional Info", "Purchase Guide", "Reviews"].map(
            (tab, index) => (
              <Tab
                key={index}
                className={({ selected }) =>
                  `w-full sm:w-auto flex-1 text-center py-2.5 px-5 text-sm font-semibold rounded-lg transition-all duration-200 border ${
                    selected
                      ? "bg-[#FFB200] text-white border-[#FFB200] shadow-md"
                      : "bg-white text-gray-700 border-gray-200 hover:border-[#FFB200]/60 hover:text-[#FFB200]"
                  }`
                }
              >
                {tab}
              </Tab>
            )
          )}
        </Tab.List>

        {/* --- Tab Content --- */}
        <Tab.Panels className="mt-8 text-gray-700 text-[15px] leading-relaxed">
          {/* DESCRIPTION TAB */}
          <Tab.Panel>
            <div>
              <p className="py-1">
                <strong>Sokudo EVs</strong> are engineered for unmatched
                efficiency and performance — integrating cutting-edge electric
                mobility technology with modern design.
              </p>
              <p className="py-1">
                Every scooter passes through strict quality control to ensure
                durability, safety, and reliability for Indian roads.
              </p>

              <h4 className="mt-8 text-lg font-semibold text-gray-900">
                Specifications
              </h4>
              <hr className="my-3 border-dotted border-gray-300" />

              <ul className="mt-4 divide-y divide-gray-100">
                <li className="flex justify-between py-2">
                  <span>Battery Type</span> <span className="font-medium">Lithium-ion</span>
                </li>
                <li className="flex justify-between py-2">
                  <span>Charging Time</span> <span className="font-medium">3 Hours</span>
                </li>
                <li className="flex justify-between py-2">
                  <span>Top Speed</span> <span className="font-medium">70 km/h</span>
                </li>
                <li className="flex justify-between py-2">
                  <span>Range</span> <span className="font-medium">120 km</span>
                </li>
              </ul>
            </div>
          </Tab.Panel>

          {/* ADDITIONAL INFO TAB */}
          <Tab.Panel>
            <ul className="space-y-3">
              <li>⚙️ <span className="font-medium">Warranty:</span> 3 Years Battery & Motor</li>
              <li>🛠️ <span className="font-medium">Service Support:</span> Available in 100+ Cities</li>
              <li>🔄 <span className="font-medium">Replacement Policy:</span> 7-day return on manufacturing defects</li>
            </ul>
          </Tab.Panel>

          {/* PURCHASE GUIDE TAB */}
          <Tab.Panel>
            <h4 className="font-semibold text-gray-900 mb-3">Steps to Purchase</h4>
            <ol className="list-decimal ml-6 space-y-2">
              <li>Select your preferred model and color.</li>
              <li>Confirm booking by completing secure online payment.</li>
              <li>Our support team will contact you for delivery arrangements.</li>
              <li>Receive your eco-friendly ride and start your journey!</li>
            </ol>
          </Tab.Panel>

          {/* REVIEWS TAB */}
          <Tab.Panel>
            <p className="text-gray-600 italic">
              No reviews yet. Be the first to share your experience!
            </p>
            <button aria-label='Review' className="mt-5 px-5 py-2 rounded-lg bg-[#FFB200] text-white font-medium hover:bg-black transition-all">
              Write a Review
            </button>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default ProductTabs;
