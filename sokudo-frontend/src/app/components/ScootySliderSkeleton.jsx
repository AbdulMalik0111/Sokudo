import React from "react";

const ScootySliderSkeleton = () => {
  return (
    <section className="pt-12 sm:pt-16 px-5 animate-pulse">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-gray-300 h-6 w-72 mb-4 rounded"></div>
        <div className="bg-gray-200 h-4 w-60 rounded"></div>
      </div>

      {/* Top Cards Skeleton */}
      <div className="bg-white pt-6 sm:pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="px-2 text-center">
              <div className="bg-gray-300 mx-auto h-56 sm:h-64 md:h-72 lg:h-80 w-full rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Names */}
      <div className="max-w-4xl mx-auto mt-6 flex justify-center gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-300 h-4 w-20 rounded"></div>
        ))}
      </div>

      {/* Specs */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="text-center">
            <div className="bg-gray-200 h-3 w-16 mx-auto mb-2 rounded"></div>
            <div className="bg-gray-300 h-5 w-20 mx-auto rounded"></div>
          </div>
        ))}
      </div>

      {/* Price Skeleton */}
      <div className="max-w-4xl mx-auto mt-6 bg-gray-100 p-6 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="bg-gray-300 h-5 w-48 mb-3 rounded"></div>
            <div className="bg-gray-200 h-3 w-80 rounded"></div>
          </div>
          <div className="flex flex-col items-end gap-3">
            <div className="bg-gray-300 h-6 w-24 rounded"></div>
            <div className="bg-gray-400 h-10 w-32 rounded"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScootySliderSkeleton;
