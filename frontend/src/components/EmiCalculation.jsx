import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const EmiCalculation = () => {
  const [loanAmount, setLoanAmount] = useState(50000);
  const [interestRate, setInterestRate] = useState(6);
  const [loanTenure, setLoanTenure] = useState(12);
  const [dailyDistance, setDailyDistance] = useState(15);
  const [emi, setEmi] = useState(0);
  const [monthlySavings, setMonthlySavings] = useState(0);
  const [effectiveEmi, setEffectiveEmi] = useState(0);
  const [isSavingsCoveringEmi, setIsSavingsCoveringEmi] = useState(false);

  useEffect(() => {
    const monthlyRate = interestRate / 100 / 12;
    let emiAmount;
    if (monthlyRate === 0) {
      emiAmount = loanAmount / loanTenure;
    } else {
      const power = Math.pow(1 + monthlyRate, loanTenure);
      emiAmount = (loanAmount * monthlyRate * power) / (power - 1);
    }

    const petrolCostPerKm = 2.0;
    const electricCostPerKm = 0.18;
    const monthlyKm = dailyDistance * 30;
    const savings = (petrolCostPerKm - electricCostPerKm) * monthlyKm;

    const rawEffectiveEmi = emiAmount - savings;
    const roundedEmi = Math.round(emiAmount);
    const roundedSavings = Math.round(savings);
    const clampedEffectiveEmi = Math.max(0, Math.round(rawEffectiveEmi));

    setEmi(roundedEmi);
    setMonthlySavings(roundedSavings);
    setEffectiveEmi(clampedEffectiveEmi);
    setIsSavingsCoveringEmi(rawEffectiveEmi <= 0);
  }, [loanAmount, interestRate, loanTenure, dailyDistance]);

  const loanProgress = Math.max(2, Math.min(98, (loanAmount / 180000) * 100));
  const distanceProgress = Math.max(
    2,
    Math.min(98, ((dailyDistance - 15) / (212 - 15)) * 100)
  );
  const emiRotation = Math.min((emi / 8000) * 180, 180);
  const savingsRotation = Math.min((monthlySavings / 1500) * 180, 180);

  const interestRateOptions = [5, 6, 7, 8, 9, 10, 12, 15];
  const tenureOptions = [6, 12, 18, 24, 36, 48];

  const MeterPointer = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="4" fill="white"/>
      <path d="M16 16 L16 4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );

  return (
    <section className="px-3 sm:px-6 py-8 sm:py-16">
      <div className="text-center mb-6 sm:mb-12 px-2">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">EMI Calculator SOKUDO Electric</h2>
        <p className="text-gray-600 text-base sm:text-xl md:text-2xl mt-2 sm:mt-3">
          A Scooter that Pays for Itself
        </p>
      </div>
      <div className="max-w-7xl mx-auto bg-white border border-gray-300 rounded-2xl sm:rounded-3xl p-3 sm:p-8">
        
        <div className="grid lg:grid-cols-[2fr_1fr] gap-4 sm:gap-6 lg:gap-8">
          {/* Left composite area */}
          <div className="bg-[#E3EAF1] rounded-xl sm:rounded-2xl p-3 sm:p-3 flex flex-col gap-4 sm:gap-5">
            {/* Sliders block */}
            <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-300">
              <p className="text-gray-700 mb-5 sm:mb-8 text-xs sm:text-base leading-relaxed">
                Adjust the sliders below to calculate your savings based on your
                loan amount and daily distance travelled
              </p>
              {/* Loan Amount Slider */}
              <div className="mb-6 sm:mb-8">
                <div className="flex justify-between mb-3 items-center gap-2">
                  <label className="font-semibold text-gray-900 text-sm sm:text-base">
                    Loan Amount (₹)
                  </label>
                  <div className="bg-gray-100 border border-gray-300 rounded-lg px-2.5 sm:px-3 py-1.5 sm:py-2 min-w-[70px] sm:min-w-[80px]">
                    <span className="font-bold text-gray-900 text-sm sm:text-base">
                      {loanAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between text-[9px] sm:text-xs text-gray-600 px-0.5 mb-1">
                  <span>0</span>
                  <span>30k</span>
                  <span>60k</span>
                  <span>90k</span>
                  <span>1.2L</span>
                  <span>1.5L</span>
                  <span>1.8L</span>
                </div>
                <div className="relative mt-2">
                  <div className="h-2 bg-gray-800 rounded-full relative">
                    <motion.div
                      className="h-full bg-[#FFB200] rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${loanProgress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute inset-0 flex justify-between items-center px-0.5">
                      {[0, 30000, 60000, 90000, 120000, 150000, 180000].map(
                        (bp, i) => {
                          const isActive = loanAmount >= bp;
                          return (
                            <div
                              key={i}
                              className={`w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full ${
                                isActive ? "bg-[#FFB200]" : "bg-gray-800"
                              }`}
                            />
                          );
                        }
                      )}
                    </div>
                    <motion.div
                      className="absolute top-1/2 w-4 h-4 sm:w-5 sm:h-5 bg-white border-[3px] border-[#FFB200] rounded-full shadow-lg"
                      style={{
                        left: `${loanProgress}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                      animate={{ left: `${loanProgress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="180000"
                    step="5000"
                    value={loanAmount}
                    aria-label="Loan amount"
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>
              {/* Distance Slider */}
              <div>
                <div className="flex justify-between mb-3 items-center gap-2">
                  <label className="font-semibold text-gray-900 text-sm sm:text-base">
                    Daily Distance (km)
                  </label>
                  <div className="bg-gray-100 border border-gray-300 rounded-lg px-2.5 sm:px-3 py-1.5 sm:py-2 min-w-[50px] sm:min-w-[60px]">
                    <span className="font-bold text-gray-900 text-sm sm:text-base">
                      {dailyDistance}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between text-[8px] sm:text-[10px] md:text-xs text-gray-600 px-0.5 mb-1">
                  {["15", "25", "50", "75", "100", "125", "175", "200", "212"].map((v) => (
                    <span key={v}>{v}</span>
                  ))}
                </div>
                <div className="relative mt-2">
                  <div className="h-2 bg-gray-800 rounded-full relative">
                    <motion.div
                      className="h-full bg-[#FE0000] rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${distanceProgress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute inset-0 flex justify-between items-center px-0.5">
                      {[15, 25, 50, 75, 100, 125, 175, 200, 212].map(
                        (bp, i) => {
                          const isActive = dailyDistance >= bp;
                          return (
                            <div
                              key={i}
                              className={`w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full ${
                                isActive ? "bg-[#FE0000]" : "bg-gray-800"
                              }`}
                            />
                          );
                        }
                      )}
                    </div>
                    <motion.div
                      className="absolute top-1/2 w-4 h-4 sm:w-5 sm:h-5 bg-white border-[3px] border-[#FE0000] rounded-full shadow-lg"
                      style={{
                        left: `${distanceProgress}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                      animate={{ left: `${distanceProgress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="212"
                    step="1"
                    value={dailyDistance}
                    aria-label="Daily distance in kilometers"
                    onChange={(e) => setDailyDistance(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>
            {/* Dropdowns block */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-1 border border-gray-300">
              <div>
                <label className="block text-gray-900 font-semibold mb-2 text-sm sm:text-base">
                  Interest Rate
                </label>
                <select
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full p-2 sm:p-3 bg-white border-2 border-gray-300 rounded-lg text-sm sm:text-base outline-none focus:border-[#FFB200] transition-colors"
                >
                  {interestRateOptions.map((r) => (
                    <option key={r} value={r}>
                      {r}%
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-900 font-semibold mb-2 text-sm sm:text-base">
                  Loan Tenure
                </label>
                <select
                  value={loanTenure}
                  onChange={(e) => setLoanTenure(Number(e.target.value))}
                  className="w-full p-2 sm:p-3 bg-white border-2 border-gray-300 rounded-lg text-sm sm:text-base outline-none focus:border-[#FFB200] transition-colors"
                >
                  {tenureOptions.map((t) => (
                    <option key={t} value={t}>
                      {t} months
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {/* Right gauges */}
          <div className="space-y-3 sm:space-y-4">
            {/* EMI Gauge Card */}
            <motion.div
              className="rounded-xl sm:rounded-3xl flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 text-white relative min-h-[110px] sm:h-[140px]"
              style={{ backgroundColor: "#FFB200" }}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex-1 flex flex-col justify-center pr-2">
                <p className="text-white/90 font-medium text-xs sm:text-base mb-1">
                  EMI
                </p>
                <p className="text-2xl sm:text-3xl font-bold tabular-nums">
                  ₹{emi.toLocaleString()}
                </p>
              </div>
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
                <svg className="absolute inset-0" viewBox="0 0 100 100">
                  <path
                    d="M 20 80 A 40 40 0 0 1 80 80"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="8"
                    fill="none"
                  />
                  <motion.path
                    d="M 20 80 A 40 40 0 0 1 80 80"
                    stroke="white"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: emiRotation / 180 }}
                    transition={{ duration: 0.8 }}
                  />
                </svg>
                <motion.div
                  className="absolute w-6 h-6 sm:w-8 sm:h-8"
                  style={{ bottom: "8%", left: "50%", marginLeft: "-12px" }}
                  animate={{ rotate: emiRotation - 90 }}
                  transition={{ duration: 0.8 }}
                >
                  <MeterPointer />
                </motion.div>
              </div>
            </motion.div>
            {/* Savings Gauge Card */}
            <motion.div
              className="rounded-xl sm:rounded-3xl flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 text-white relative min-h-[110px] sm:h-[140px]"
              style={{ backgroundColor: "#16AA51" }}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex-1 flex flex-col justify-center pr-2">
                <p className="text-white/90 font-medium text-xs sm:text-base mb-1">
                  Avg. Monthly Savings
                </p>
                <p className="text-2xl sm:text-3xl font-bold tabular-nums">
                  ₹{monthlySavings.toLocaleString()}
                </p>
              </div>
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
                <svg className="absolute inset-0" viewBox="0 0 100 100">
                  <path
                    d="M 20 80 A 40 40 0 0 1 80 80"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="8"
                    fill="none"
                  />
                  <motion.path
                    d="M 20 80 A 40 40 0 0 1 80 80"
                    stroke="white"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: savingsRotation / 180 }}
                    transition={{ duration: 0.8 }}
                  />
                </svg>
                <motion.div
                  className="absolute w-6 h-6 sm:w-8 sm:h-8"
                  style={{ bottom: "8%", left: "50%", marginLeft: "-12px" }}
                  animate={{ rotate: savingsRotation - 90 }}
                  transition={{ duration: 0.8 }}
                >
                  <MeterPointer />
                </motion.div>
              </div>
            </motion.div>
            {/* Effective EMI Card */}
            <div className="bg-white border border-gray-300 rounded-xl sm:rounded-2xl p-4 sm:p-6 min-h-[110px] sm:h-[140px]">
              <div className="flex flex-col h-full justify-center gap-2">
                <div className="flex justify-between items-start gap-3">
                  <p className="text-gray-800 font-bold text-base sm:text-lg">
                    Effective EMI
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900 whitespace-nowrap tabular-nums">
                    ₹{effectiveEmi.toLocaleString()}
                  </p>
                </div>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  {isSavingsCoveringEmi
                    ? "Your savings fully cover the EMI!"
                    : "The net price you pay as EMI to your finance provider"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmiCalculation;