/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Meter from '/meter_v1.png';

const EmiCalculation = () => {
   const [loanAmount, setLoanAmount] = useState(50000);
   const [interestRate, setInterestRate] = useState(6);
   const [loanTenure, setLoanTenure] = useState(12);
   const [dailyDistance, setDailyDistance] = useState(15);
   const [emi, setEmi] = useState(0);
   const [monthlySavings, setMonthlySavings] = useState(0);
   const [effectiveEmi, setEffectiveEmi] = useState(0);

   useEffect(() => {
      const monthlyRate = interestRate / 100 / 12;
      const emiAmount =
         (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTenure)) /
         (Math.pow(1 + monthlyRate, loanTenure) - 1);

      const petrolCostPerKm = 2.5;
      const electricCostPerKm = 0.3;
      const monthlyKm = dailyDistance * 30;
      const savings = (petrolCostPerKm - electricCostPerKm) * monthlyKm;

      setEmi(Math.round(emiAmount));
      setMonthlySavings(Math.round(savings));
      setEffectiveEmi(Math.round(emiAmount - savings));
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

   return (
      <section className='px-4 sm:px-6 py-12 sm:py-16'>
         <div className='text-center mb-10 sm:mb-12'>
            <h2 className='heading mb-2'>EMI Calculator SOKUDO Electric</h2>
            <p className='text-[#666666] text-xl sm:text-2xl mt-3'>
               A Scooter that Pays for Itself
            </p>
         </div>

         <div className='max-w-7xl mx-auto bg-white border border-gray-300 rounded-3xl p-5 sm:p-8'>
            <p className='text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base'>
               Tap on the cards to learn how the amount is calculated.
            </p>

            {/* Main grid: stack on mobile, 2 cols on lg */}
            <div className='grid lg:grid-cols-[2fr_1fr] gap-6 lg:gap-8'>
               {/* Left composite area */}
               <div className='bg-[#E3EAF1] rounded-2xl p-2 sm:p-3 flex flex-col lg:flex-row gap-5 justify-start'>
                  {/* Sliders block */}
                  <div className='bg-white p-5 sm:p-6 flex-1 rounded-2xl border border-[#cccccc]'>
                     <p className='text-black mb-6 sm:mb-8 text-sm sm:text-base'>
                        Adjust the sliders below to calculate your savings based
                        on your loan amount and daily distance travelled
                     </p>

                     {/* Loan Amount Slider */}
                     <div>
                        <div className='flex justify-between mb-3 sm:mb-4 items-center gap-4'>
                           <label className='font-medium text-black text-sm sm:text-base'>
                              Loan Amount (₹)
                           </label>
                           <div className='bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 min-w-[72px] text-center'>
                              <span className='font-semibold text-black text-sm sm:text-base'>
                                 {loanAmount.toLocaleString()}
                              </span>
                           </div>
                        </div>

                        <div className='flex justify-between text-[10px] sm:text-xs md:text-sm text-black px-1'>
                           <span>0</span>
                           <span>30k</span>
                           <span>60k</span>
                           <span>90k</span>
                           <span>1.2L</span>
                           <span>1.5L</span>
                           <span>1.80L</span>
                        </div>

                        <div className='relative mt-2'>
                           <div className='h-2 bg-black rounded-full relative'>
                              <motion.div
                                 className='h-full bg-[#FFB200] rounded-full'
                                 initial={{ width: 0 }}
                                 animate={{ width: `${loanProgress}%` }}
                                 transition={{ duration: 0.3 }}
                              />
                              <div className='absolute inset-0 flex justify-between items-center'>
                                 {[
                                    0, 30000, 60000, 90000, 120000, 150000,
                                    180000,
                                 ].map((bp, i) => {
                                    const isActive = loanAmount >= bp;
                                    return (
                                       <div
                                          key={i}
                                          className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${
                                             isActive
                                                ? 'bg-[#FFB200]'
                                                : 'bg-black'
                                          }`}
                                       />
                                    );
                                 })}
                              </div>
                              <motion.div
                                 className='absolute top-1/2 w-4 h-4 sm:w-5 sm:h-5 bg-[#FFB200] border-4 border-[#FFB200] rounded-full shadow'
                                 style={{
                                    left: `${loanProgress}%`,
                                    transform: 'translate(-50%, -50%)',
                                 }}
                                 animate={{ left: `${loanProgress}%` }}
                                 transition={{ duration: 0.3 }}
                              />
                           </div>
                           <input
                              type='range'
                              min='0'
                              max='180000'
                              step='5000'
                              value={loanAmount}
                              aria-label='Loan amount'
                              onChange={(e) =>
                                 setLoanAmount(Number(e.target.value))
                              }
                              className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                           />
                        </div>
                     </div>

                     {/* Distance Slider */}
                     <div className='mt-6 sm:mt-8'>
                        <div className='flex justify-between mb-3 sm:mb-4 items-center gap-4'>
                           <label className='font-medium text-black text-sm sm:text-base'>
                              Daily Distance (km)
                           </label>
                           <div className='bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 min-w-[56px] text-center'>
                              <span className='font-semibold text-black text-sm sm:text-base'>
                                 {dailyDistance}
                              </span>
                           </div>
                        </div>

                        <div className='flex justify-between text-[10px] sm:text-[11px] md:text-xs lg:text-sm text-black px-1'>
                           {[
                              '15',
                              '25',
                              '50',
                              '75',
                              '100',
                              '125',
                              '175',
                              '200',
                              '212',
                           ].map((v) => (
                              <span key={v}>{v}</span>
                           ))}
                        </div>

                        <div className='relative mt-2'>
                           <div className='h-2 bg-black rounded-full relative'>
                              <motion.div
                                 className='h-full bg-[#FE0000] rounded-full'
                                 initial={{ width: 0 }}
                                 animate={{ width: `${distanceProgress}%` }}
                                 transition={{ duration: 0.3 }}
                              />
                              <div className='absolute inset-0 flex justify-between items-center'>
                                 {[15, 25, 50, 75, 100, 125, 175, 200, 212].map(
                                    (bp, i) => {
                                       const isActive = dailyDistance >= bp;
                                       return (
                                          <div
                                             key={i}
                                             className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${
                                                isActive
                                                   ? 'bg-[#FE0000]'
                                                   : 'bg-black'
                                             }`}
                                          />
                                       );
                                    }
                                 )}
                              </div>
                              <motion.div
                                 className='absolute top-1/2 w-4 h-4 sm:w-5 sm:h-5 bg-[#FE0000] border-4 border-[#FE0000] rounded-full shadow'
                                 style={{
                                    left: `${distanceProgress}%`,
                                    transform: 'translate(-50%, -50%)',
                                 }}
                                 animate={{ left: `${distanceProgress}%` }}
                                 transition={{ duration: 0.3 }}
                              />
                           </div>
                           <input
                              type='range'
                              min='15'
                              max='212'
                              step='1'
                              value={dailyDistance}
                              aria-label='Daily distance in kilometers'
                              onChange={(e) =>
                                 setDailyDistance(Number(e.target.value))
                              }
                              className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                           />
                        </div>
                     </div>
                  </div>

                  {/* Dropdowns block (below sliders on small screens, side on large) */}
                  <div className='bg-white rounded-2xl p-5 sm:p-6 w-full lg:w-[30%] space-y-6 border border-[#cccccc]'>
                     <div>
                        <label className='block text-black font-medium mb-2 text-sm sm:text-base'>
                           Interest Rate
                        </label>
                        <select
                           value={interestRate}
                           onChange={(e) =>
                              setInterestRate(Number(e.target.value))
                           }
                           className='w-full p-2.5 sm:p-3 bg-white border-b border-black text-sm sm:text-base outline-none'
                        >
                           {interestRateOptions.map((r) => (
                              <option key={r} value={r}>
                                 {r}%
                              </option>
                           ))}
                        </select>
                     </div>
                     <div>
                        <label className='block text-black font-medium mb-2 text-sm sm:text-base'>
                           Loan Tenure
                        </label>
                        <select
                           value={loanTenure}
                           onChange={(e) =>
                              setLoanTenure(Number(e.target.value))
                           }
                           className='w-full p-2.5 sm:p-3 bg-white border-b border-black text-sm sm:text-base outline-none'
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

               {/* Right gauges (stack under on mobile) */}
               <div className='space-y-4'>
                  {/* EMI Gauge Card */}
                  <motion.div
                     className='rounded-3xl flex justify-start px-5 sm:px-6 py-4 sm:py-5 text-white relative w-full h-[120px] sm:h-[140px]'
                     style={{ backgroundColor: '#FFB200' }}
                     whileHover={{ scale: 1.01 }}
                     transition={{ duration: 0.2 }}
                  >
                     <div className='w-1/2 sm:w-[60%] relative h-20 sm:h-24 flex justify-center'>
                        <div className='gauge-cont relative w-32 sm:w-40 h-20 sm:h-24'>
                           <div className='gauge w-full h-full relative overflow-hidden'>
                              <div className='mask'></div>
                              <div className='inner'>
                                 <svg
                                    className='w-32 sm:w-40 h-32 sm:h-40 absolute left-0'
                                    viewBox='0 0 80 80'
                                 >
                                    <path
                                       d='M 10 40 A 30 30 0 0 1 70 40'
                                       stroke='rgba(255,255,255,0.3)'
                                       strokeWidth='6'
                                       fill='none'
                                    />
                                 </svg>
                                 <svg
                                    className='absolute inset-0 w-32 sm:w-40 h-32 sm:h-40'
                                    viewBox='0 0 80 80'
                                 >
                                    <motion.path
                                       d='M 10 40 A 30 30 0 0 1 70 40'
                                       stroke='white'
                                       strokeWidth='6'
                                       fill='none'
                                       strokeLinecap='round'
                                       initial={{ pathLength: 0 }}
                                       animate={{
                                          pathLength: emiRotation / 180,
                                       }}
                                       transition={{ duration: 0.8 }}
                                    />
                                 </svg>
                              </div>
                              <motion.div
                                 className='spinner absolute w-1 h-20 bg-transparent'
                                 style={{
                                    transformOrigin: 'bottom center',
                                    bottom: 0,
                                    left: '50%',
                                    marginLeft: '-0.5px',
                                 }}
                                 animate={{ rotate: emiRotation }}
                                 transition={{ duration: 0.8 }}
                              />
                           </div>
                           {/* POINTER */}
                           <motion.div
                              className='pointer absolute w-8 h-8 z-10'
                              animate={{ rotate: emiRotation }}
                              transition={{ duration: 0.8 }}
                           >
                              <img
                                 src={Meter}
                                 alt='Meter pointer'
                                 className='max-w-full'
                              />
                           </motion.div>
                        </div>
                     </div>
                     <div className='w-1/2 sm:w-[40%] flex flex-col justify-center'>
                        <p className='text-white/90 font-medium text-sm sm:text-base'>
                           EMI
                        </p>
                        <p className='text-2xl sm:text-3xl font-bold tabular-nums min-w-[120px] sm:min-w-[140px]'>
                           ₹ {emi.toLocaleString()}
                        </p>
                     </div>
                  </motion.div>

                  {/* Savings Gauge Card */}
                  <motion.div
                     className='rounded-3xl flex justify-start px-5 sm:px-6 py-4 sm:py-5 text-white relative w-full h-[120px] sm:h-[140px]'
                     style={{ backgroundColor: '#16AA51' }}
                     whileHover={{ scale: 1.02 }}
                     transition={{ duration: 0.2 }}
                  >
                     <div className='w-1/2 sm:w-[60%] relative h-20 sm:h-24 flex justify-center'>
                        <div className='gauge-cont relative w-32 sm:w-40 h-20 sm:h-24'>
                           <div className='gauge w-full h-full relative overflow-hidden'>
                              <div className='mask'></div>
                              <div className='inner'>
                                 <svg
                                    className='w-32 sm:w-40 h-32 sm:h-40 absolute left-0'
                                    viewBox='0 0 80 80'
                                 >
                                    <path
                                       d='M 10 40 A 30 30 0 0 1 70 40'
                                       stroke='rgba(255,255,255,0.3)'
                                       strokeWidth='6'
                                       fill='none'
                                    />
                                 </svg>
                                 <svg
                                    className='absolute inset-0 w-32 sm:w-40 h-32 sm:h-40'
                                    viewBox='0 0 80 80'
                                 >
                                    <motion.path
                                       d='M 10 40 A 30 30 0 0 1 70 40'
                                       stroke='white'
                                       strokeWidth='6'
                                       fill='none'
                                       strokeLinecap='round'
                                       initial={{ pathLength: 0 }}
                                       animate={{
                                          pathLength: savingsRotation / 180,
                                       }}
                                       transition={{ duration: 0.8 }}
                                    />
                                 </svg>
                              </div>
                              <motion.div
                                 className='spinner absolute w-1 h-20 bg-transparent'
                                 style={{
                                    transformOrigin: 'bottom center',
                                    bottom: 0,
                                    left: '50%',
                                    marginLeft: '-0.5px',
                                 }}
                                 animate={{ rotate: savingsRotation }}
                                 transition={{ duration: 0.8 }}
                              />
                           </div>
                           {/* POINTER */}
                           <motion.div
                              className='pointer absolute w-8 h-8 z-10'
                              animate={{ rotate: savingsRotation }}
                              transition={{ duration: 0.8 }}
                           >
                              <img
                                 src={Meter}
                                 alt='Meter pointer'
                                 className='max-w-full'
                              />
                           </motion.div>
                        </div>
                     </div>
                     <div className='w-1/2 sm:w-[40%] flex flex-col justify-center'>
                        <p className='text-white/90 font-medium text-sm sm:text-base'>
                           Avg. Monthly Savings
                        </p>
                        <p className='text-2xl sm:text-3xl font-bold tabular-nums min-w-[120px] sm:min-w-[140px]'>
                           ₹ {monthlySavings.toLocaleString()}
                        </p>
                     </div>
                  </motion.div>

                  {/* Effective EMI Card */}
                  <div className='bg-white rounded-2xl p-5 sm:p-6 h-[120px] sm:h-[140px]'>
                     <div className='flex justify-between items-start gap-4 h-full'>
                        <div className='flex-1 pr-2 flex flex-col justify-center'>
                           <p className='text-gray-800 font-semibold text-base sm:text-lg mb-2'>
                              Effective EMI
                           </p>
                           <p className='text-black text-xs sm:text-sm max-w-[95%]'>
                              The Effective EMI is the net price you pay as EMI
                              to your finance provider
                           </p>
                        </div>
                        <div className='min-w-[100px] sm:min-w-[120px] text-right flex items-center justify-end h-full'>
                           <p className='text-xl sm:text-2xl font-bold text-gray-800 whitespace-nowrap tabular-nums'>
                              ₹ {effectiveEmi.toLocaleString()}
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default EmiCalculation;