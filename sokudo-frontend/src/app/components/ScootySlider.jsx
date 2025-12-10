import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Controller } from 'swiper/modules';
import 'swiper/css';
import { useSelector } from 'react-redux';
import ScootySliderSkeleton from './ScootySliderSkeleton';
import {
   IoSpeedometerOutline,
   IoFlashOutline,
   IoBatteryChargingOutline,
} from 'react-icons/io5';
import { FiClock } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const ScootySlider = () => {
   const router = useRouter();
   const [active, setActive] = useState(0);
   const [mainSwiper, setMainSwiper] = useState(null);
   const [nameSwiper, setNameSwiper] = useState(null);

   const { items: products = [], loading } = useSelector(
      (state) => state.product
   );

   const handleViewDetails = (product) => {
      router.push(`/product/${product._id}`);
   };

   useEffect(() => {
      if (mainSwiper && nameSwiper) {
         mainSwiper.controller.control = nameSwiper;
         nameSwiper.controller.control = mainSwiper;
      }
   }, [mainSwiper, nameSwiper]);

   const handleSlideChange = (swiper) => setActive(swiper.realIndex);

   const getProductSpecs = (product) => {
      const electricals = product.sections?.electricals || [];
      const engineSpecs = product.sections?.engineAndTransmission || [];

      return {
         range:
            engineSpecs.find((spec) => spec.key === 'Range')?.value || 'N/A',
         speed:
            engineSpecs.find((spec) => spec.key === 'Top Speed')?.value ||
            '70 km/h',
         'charging Time':
            electricals.find((spec) => spec.key === 'Charging Time')?.value ||
            'N/A',
         'battery Capacity':
            electricals.find((spec) => spec.key === 'Battery Voltage')?.value ||
            'N/A',
      };
   };

   if (loading || !products.length) {
      return <ScootySliderSkeleton />;
   }

   return (
      <section
         className='pt-12 sm:pt-16 px-5'
         aria-labelledby='scooty-slider-heading'
      >
         <div className='max-w-3xl mx-auto px-4 sm:px-6'>
            <h3 id='scooty-slider-heading' className='heading mb-4'>
               Best (EV) Electric Scooters in India
            </h3>
            <p className='paragraph mb-2'>
               SOKUDO - Where Commutation Meets Convenience
            </p>
         </div>

         {/* TOP SLIDER */}
         <div className='bg-white pt-6 sm:pt-8'>
            <div
               className='relative max-w-7xl mx-auto px-4 sm:px-6'
               aria-roledescription='carousel'
               aria-label='Electric scooter product images'
            >
               <Swiper
                  onSwiper={setMainSwiper}
                  centeredSlides={true}
                  spaceBetween={16}
                  slidesPerView={1}
                  loop={true}
                  speed={500}
                  autoplay={{ delay: 3000, disableOnInteraction: false }}
                  breakpoints={{
                     640: { slidesPerView: 2 },
                     1024: { slidesPerView: 3 },
                  }}
                  modules={[Autoplay, Controller]}
                  onSlideChange={handleSlideChange}
               >
                  {products.map((product, i) => (
                     <SwiperSlide key={product._id} aria-label={product.name}>
                        <motion.div
                           initial={{ scale: 0.85, opacity: 0.6 }}
                           animate={{
                              scale: i === active ? 1 : 0.85,
                              opacity: i === active ? 1 : 0.6,
                              y: i === active ? -10 : 0,
                           }}
                           transition={{ duration: 0.25, ease: 'easeInOut' }}
                           className='px-2 text-center'
                        >
                           <img
                              src={
                                 product?.colors?.[0]?.images?.[0] ||
                                 product?.images?.[0] ||
                                 '/no-image.png'
                              }
                              alt={`${product.name} electric scooter`}
                              className='mx-auto w-full object-contain h-56 sm:h-64 md:h-72 lg:h-80 cursor-grab active:cursor-grabbing'
                              loading='lazy'
                           />
                        </motion.div>
                     </SwiperSlide>
                  ))}
               </Swiper>
            </div>
         </div>

         {/* NAME SLIDER */}
         <div
            className='py-8'
            style={{
               backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 5px, rgba(75,85,99,0.06) 5px, rgba(75,85,99,0.06) 6px, transparent 6px, transparent 15px),
            repeating-linear-gradient(90deg, transparent, transparent 5px, rgba(75,85,99,0.06) 5px, rgba(75,85,99,0.06) 6px, transparent 6px, transparent 15px)
          `,
            }}
            aria-roledescription='carousel'
            aria-label='Scooter model names'
         >
            <div className='max-w-4xl mx-auto mb-7 px-4 sm:px-6 border-t border-b border-[#CCCCCC] p-3 sm:p-4'>
               <Swiper
                  onSwiper={setNameSwiper}
                  slidesPerView={2}
                  centeredSlides={true}
                  loop={true}
                  spaceBetween={32}
                  breakpoints={{ 640: { slidesPerView: 3 } }}
                  modules={[Controller]}
               >
                  {products.map((product, i) => (
                     <SwiperSlide key={product._id}>
                        <div
                           className={`w-full text-center cursor-pointer transition-transform duration-200 ${
                              i === active
                                 ? 'text-black font-bold scale-110'
                                 : 'text-gray-500'
                           }`}
                           aria-current={i === active ? 'true' : 'false'}
                        >
                           <div className='text-lg'>{product.name}</div>
                        </div>
                     </SwiperSlide>
                  ))}
               </Swiper>
            </div>

            {/* ACTIVE PRODUCT DETAILS */}
            {products[active] && (
               <div
                  className='max-w-4xl mx-auto px-4 sm:px-6'
                  aria-live='polite'
               >
                  {/* SPECS */}
                  <div className='grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-6 border-b border-gray-300 pb-4 sm:pb-6 place-items-center'>
                     <div className='flex flex-col items-center text-center'>
                        <IoSpeedometerOutline
                           aria-hidden='true'
                           className='text-[#ffb200] mb-1'
                           size={24}
                        />
                        <div className='text-xs sm:text-sm text-gray-500'>
                           RANGE
                        </div>
                        <div className='text-2xl font-medium'>
                           {getProductSpecs(products[active]).range}
                        </div>
                     </div>

                     <div className='flex flex-col items-center text-center'>
                        <IoFlashOutline
                           aria-hidden='true'
                           className='text-[#ffb200] mb-1'
                           size={24}
                        />
                        <div className='text-xs sm:text-sm text-gray-500'>
                           TOP SPEED
                        </div>
                        <div className='text-2xl font-medium'>
                           {getProductSpecs(products[active]).speed}
                        </div>
                     </div>

                     <div className='flex flex-col items-center text-center'>
                        <IoBatteryChargingOutline
                           aria-hidden='true'
                           className='text-[#ffb200] mb-1'
                           size={24}
                        />
                        <div className='text-xs sm:text-sm text-gray-500'>
                           BATTERY
                        </div>
                        <div className='text-2xl font-medium'>
                           {
                              getProductSpecs(products[active])[
                                 'battery Capacity'
                              ]
                           }
                        </div>
                     </div>

                     <div className='flex flex-col items-center text-center'>
                        <FiClock
                           aria-hidden='true'
                           className='text-[#ffb200] mb-1'
                           size={24}
                        />
                        <div className='text-xs sm:text-sm text-gray-500'>
                           CHARGING TIME
                        </div>
                        <div className='text-2xl font-medium'>
                           {getProductSpecs(products[active])['charging Time']}
                        </div>
                     </div>
                  </div>

                  {/* PRICE */}
                  <div className='mt-6 bg-[#F1F3F8] p-4 sm:p-6 rounded-lg'>
                     <div className='grid grid-cols-1 md:grid-cols-3 items-center gap-4 sm:gap-6'>
                        <div className='md:col-span-2'>
                           <div className='text-lg sm:text-xl'>
                              Effective Ex-Showroom Price
                           </div>
                           <div className='description text-sm text-gray-500 max-w-[60ch]'>
                              *Excludes taxes, insurance & registration charges.
                           </div>
                        </div>
                        <div className='flex flex-col items-end gap-3'>
                           <div className='text-lg sm:text-xl font-semibold'>
                              ₹{products[active].netExShowroomPrice}*
                           </div>
                           <button
                              onClick={() =>
                                 handleViewDetails(products[active])
                              }
                              aria-label={`Check on-road price for ${products[active].name}`}
                              className='btn w-full md:w-auto'
                           >
                              Check on-road price
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            )}
         </div>
      </section>
   );
};

export default ScootySlider;
