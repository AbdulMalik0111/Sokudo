import React, { useState, useEffect, useRef } from "react";
import { HiArrowRight } from "react-icons/hi";

const ScooterBanner = ({ slides = [], autoRotateTime = 5000 }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!slides.length) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    setAnimationKey((k) => k + 1);
    timerRef.current = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, autoRotateTime);

    return () => timerRef.current && clearTimeout(timerRef.current);
  }, [activeIndex, slides.length, autoRotateTime]);

  if (!slides.length) return null;

  const current = slides[activeIndex];
  const isFirstSlide = activeIndex === 0;

  return (
    <section
      className="page-width py-12 sm:py-16 px-4 sm:px-6 overflow-x-hidden"
      aria-roledescription="carousel"
      aria-label="Scooter promotional banner"
      aria-live="polite"
    >
      <div className="mx-auto">
        {/* ================= FIRST SLIDE ================= */}
        {isFirstSlide ? (
          <div className="relative rounded-2xl overflow-hidden shadow-md">
            <img
              src={current.imageUrl}
              alt="Sokudo electric scooter promotional banner"
              className="w-full h-[420px] sm:h-[480px] lg:h-[300px] object-cover"
              draggable={false}
              loading="eager"
            />

            <div className="absolute inset-0 flex items-end sm:items-center justify-center sm:justify-end p-6 sm:p-10">
              <a href={current.buttonLink}>
                <button
                  className="inline-flex items-center gap-2 px-5 py-5 rounded-full font-semibold shadow-lg"
                  aria-label="Explore scooter models"
                  style={{
                    background: current.buttonBg,
                    color: current.buttonTextColor,
                  }}
                >
                  <HiArrowRight
                    className="text-2xl"
                    aria-hidden="true"
                  />
                </button>
              </a>
            </div>
          </div>
        ) : (
          /* ================= OTHER SLIDES ================= */
          <div
            style={{ background: current.bgColor }}
            className="flex flex-col lg:flex-row items-center lg:items-stretch rounded-2xl overflow-hidden shadow-sm lg:shadow-md"
          >
            {/* Image */}
            <div className="w-full lg:max-w-[380px] xl:max-w-[420px] flex-shrink-0">
              <img
                src={current.imageUrl}
                alt={`${current.heading} electric scooter`}
                className="w-full h-full object-cover aspect-[4/3]"
                draggable={false}
                loading="lazy"
              />
            </div>

            {/* Text */}
            <div className="flex flex-col lg:flex-row flex-1">
              <div className="flex-1 px-6 py-8 text-center lg:text-left">
                <h2 className="heading mb-4">{current.heading}</h2>
                <p className="text-lg max-w-xl mx-auto lg:mx-0">
                  {current.paragraph}
                </p>

                {/* Mobile button */}
                <div className="mt-6 lg:hidden">
                  <a href={current.buttonLink}>
                    <button
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full"
                      aria-label={`Learn more about ${current.heading}`}
                      style={{
                        background: current.buttonBg,
                        color: current.buttonTextColor,
                      }}
                    >
                      Learn More{" "}
                      <HiArrowRight aria-hidden="true" />
                    </button>
                  </a>
                </div>
              </div>

              {/* Desktop icon button */}
              <div className="hidden lg:flex w-[160px] items-center justify-center">
                <a href={current.buttonLink}>
                  <button
                    className="rounded-full p-5 hover:scale-105 transition"
                    aria-label={`View details for ${current.heading}`}
                    style={{ background: current.buttonBg }}
                  >
                    <HiArrowRight
                      className="text-2xl"
                      aria-hidden="true"
                      style={{ color: current.buttonTextColor }}
                    />
                  </button>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ================= DOTS ================= */}
        <div className="flex justify-center gap-2 mt-6">
          {slides.map((_, i) => {
            const active = i === activeIndex;
            return (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={active ? "true" : "false"}
                className={`h-1.5 rounded-full transition-all ${
                  active ? "w-10 bg-gray-400" : "w-6 bg-gray-200"
                }`}
              >
                {active && (
                  <span
                    key={animationKey}
                    className="block h-full bg-black"
                    style={{
                      animation: `bannerFill ${autoRotateTime}ms linear forwards`,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ScooterBanner;
