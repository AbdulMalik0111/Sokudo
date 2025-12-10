import React from "react";

const ScooterLoader = () => {
  return (
    <div
      className="loader-wrapper"
      role="status"
      aria-live="polite"
      aria-label="Page is loading"
      style={{
        backgroundColor: "#fff",
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(75, 85, 99, 0.08) 20px, rgba(75, 85, 99, 0.08) 21px),
          repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(107, 114, 128, 0.06) 30px, rgba(107, 114, 128, 0.06) 31px),
          repeating-linear-gradient(60deg, transparent, transparent 40px, rgba(55, 65, 81, 0.05) 40px, rgba(55, 65, 81, 0.05) 41px),
          repeating-linear-gradient(150deg, transparent, transparent 35px, rgba(31, 41, 55, 0.04) 35px, rgba(31, 41, 55, 0.04) 36px)
        `,
      }}
    >
      {/* Brand Logo */}
      <img
        src="/Sokudo Logo Black.webp"
        alt="Sokudo Electric India logo"
        className="loader-logo h-[400px]"
      />

      {/* Decorative smoke animation */}
      <div className="smoke-container" aria-hidden="true">
        <span className="smoke smoke-1" />
        <span className="smoke smoke-2" />
        <span className="smoke smoke-3" />
      </div>

      {/* Moving scooter illustration */}
      <img
        src="/movingLoader.webp"
        alt="Electric scooter loading animation"
        className="scooter-img"
        draggable="false"
      />

      {/* Loading text */}
      <p className="loading-text text-yellow-600">
        Welcome to SOKUDO...
      </p>
    </div>
  );
};

export default ScooterLoader;
