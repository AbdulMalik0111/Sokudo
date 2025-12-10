const SwitchToSavings = () => {
  return (
    <section
      className="page-width mx-4 px-[24px] md:mx-[24px] border rounded-[32px] sm:rounded-[40px] border-[#CCCCCC] !my-[12px] sm:my-16 sm:px-8 py-10 sm:py-12 bg-white"
      aria-labelledby="switch-to-savings-heading"
    >
      {/* Header */}
      <div className="text-center mb-10 sm:mb-14">
        <h2
          id="switch-to-savings-heading"
          className="text-3xl sm:text-[44px] font-semibold sm:font-medium leading-tight text-black mb-3"
        >
          Switch to Savings
        </h2>
        <p className="text-base sm:text-xl font-medium text-[#5C5C5C]">
          Save Enough to Pay for Your Next Scooter
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row justify-center items-stretch gap-6 lg:gap-10">
        {/* Electric Scooter */}
        <div className="flex flex-col items-center text-center flex-1">
          <p className="text-base sm:text-lg text-[#5C5C5C] mb-4 leading-snug">
            Running Cost for
            <br />
            Sokudo Electric
          </p>
          <div className="mb-0 md:mb-6">
            <p
              className="text-xl sm:text-2xl font-semibold text-black relative inline-block"
              aria-live="polite"
            >
              9 paise/km
              <span
                className="block h-[3px] w-full mt-1 rounded-sm bg-[linear-gradient(90deg,#FFB200_0%,#000000_100%)]"
                aria-hidden="true"
              />
            </p>
          </div>
          <img
            src="/ev-charging-station.png"
            alt="Electric scooter charging cost illustration"
            className="w-44 sm:w-[220px] h-auto"
            loading="lazy"
            draggable="false"
          />
        </div>

        {/* Divider (mobile / tablet) */}
        <div className="h-px bg-[#E5E5E5] lg:hidden" aria-hidden="true" />

        {/* Petrol Scooter */}
        <div className="flex flex-col items-center text-center flex-1">
          <p className="text-base sm:text-lg text-[#5C5C5C] mb-4 leading-snug">
            Running Cost for
            <br />
            Petrol Scooters
          </p>
          <div className="mb-0 md:mb-6">
            <p
              className="text-xl sm:text-2xl font-semibold text-black border-b-2 border-[#B8B8B8] inline-block"
              aria-live="polite"
            >
              ₹ 2/km
            </p>
          </div>
          <img
            src="/petrol-station.png"
            alt="Petrol scooter fuel cost illustration"
            className="w-44 sm:w-[220px] h-auto"
            loading="lazy"
            draggable="false"
          />
        </div>

        {/* Divider (mobile / tablet) */}
        <div className="h-px bg-[#E5E5E5] lg:hidden" aria-hidden="true" />

        {/* Savings Section */}
        <div className="flex flex-col items-center justify-center text-center flex-1 px-2 sm:px-4">
          <div className="flex flex-col items-center gap-5 sm:gap-6 max-w-xs sm:max-w-none">
            <p className="text-base sm:text-lg text-black leading-snug">
              Estimated Savings Over 5 Years
              <br />
              with a Daily 45 km Ride
            </p>
            <p
              className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-[linear-gradient(90deg,#151D2A_0%,#16AA51_100%)] tracking-wide"
              aria-live="polite"
            >
              ₹ 1,46,813
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SwitchToSavings;
