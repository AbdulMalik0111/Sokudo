'use client';

import { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import Link from 'next/link';

const Tab1 = '/productImg/one.webp';
const Tab2 = '/2.webp';
const Tab3 = '/sokudo.webp';

const tabs = [
   {
      title: 'Visit a Sokudo Store',
      description:
         'Come to your nearest Sokudo showroom and explore our latest models.',
      image: Tab1,
   },
   {
      title: 'Choose Your Model',
      description:
         'Pick the perfect Sokudo e-bike that matches your style and needs.',
      image: Tab2,
   },
   {
      title: 'Ride Home Your Sokudo',
      description: 'Purchase easily with full payment or flexible EMI options.',
      image: Tab3,
   },
];

export default function SokudoSteps() {
   const [activeIndex, setActiveIndex] = useState(0);
   const [progress, setProgress] = useState(0);
   const duration = 4000;
   const swiperRef = useRef(null);
   const rafRef = useRef(null);
   const startTimeRef = useRef(null);

   useEffect(() => {
      const loop = (ts) => {
         if (!startTimeRef.current) startTimeRef.current = ts;
         const elapsed = ts - startTimeRef.current;
         const pct = Math.min(100, (elapsed / duration) * 100);
         setProgress(pct);

         if (pct >= 100) {
            startTimeRef.current = null;
            const next = (activeIndex + 1) % tabs.length;
            setActiveIndex(next);
            swiperRef.current?.slideTo(next);
         } else {
            rafRef.current = requestAnimationFrame(loop);
         }
      };

      rafRef.current = requestAnimationFrame(loop);
      return () => {
         cancelAnimationFrame(rafRef.current);
         startTimeRef.current = null;
      };
   }, [activeIndex]);

   const handleTabClick = (idx) => {
      if (idx === activeIndex) return;
      setActiveIndex(idx);
      setProgress(0);
      startTimeRef.current = null;
      swiperRef.current?.slideTo(idx);
   };

   return (
      <section
         className='page-width mx-auto px-4 sm:px-6 py-12 sm:py-16'
         aria-labelledby='sokudo-steps-heading'
         aria-roledescription='carousel'
      >
         <h2
            id='sokudo-steps-heading'
            className='heading text-center mb-8 sm:mb-12'
         >
            Buy Your Sokudo in 3 Steps
         </h2>

         <div className='flex flex-col md:flex-row items-stretch gap-6'>
            <div className='md:w-1/2 w-full order-1'>
               <Swiper
                  slidesPerView={1}
                  modules={[Autoplay]}
                  autoplay={{ delay: duration, disableOnInteraction: false }}
                  onSwiper={(swiper) => (swiperRef.current = swiper)}
                  onSlideChange={(swiper) => {
                     setActiveIndex(swiper.realIndex);
                     setProgress(0);
                     startTimeRef.current = null;
                  }}
                  className='rounded-xl overflow-hidden'
               >
                  {tabs.map((tab, i) => (
                     <SwiperSlide
                        key={i}
                        aria-label={`Step ${i + 1}: ${tab.title}`}
                     >
                        <img
                           src={tab.image}
                           alt={`${tab.title} - Sokudo buying step`}
                           className='w-full h-60 xs:h-72 sm:h-80 md:h-[450px] object-cover'
                           loading='lazy'
                           draggable='false'
                        />
                     </SwiperSlide>
                  ))}
               </Swiper>

               <div
                  className='flex md:hidden justify-center gap-2 mt-4'
                  aria-hidden='true'
               >
                  {tabs.map((_, i) => {
                     const active = i === activeIndex;
                     return (
                        <div
                           key={i}
                           className={`relative h-1.5 rounded-full overflow-hidden ${
                              active ? 'w-12 bg-gray-200' : 'w-6 bg-gray-200'
                           }`}
                           onClick={() => handleTabClick(i)}
                        >
                           {active && (
                              <span
                                 className='absolute inset-0 bg-[#ffb200]'
                                 style={{ width: `${progress}%` }}
                              />
                           )}
                        </div>
                     );
                  })}
               </div>
            </div>

            <div
               className='md:w-1/2 w-full flex flex-col gap-4 sm:gap-6 order-2'
               role='tablist'
               aria-label='Steps to buy Sokudo electric scooter'
               aria-live='polite'
            >
               {tabs.map((tab, i) => {
                  const isActive = i === activeIndex;
                  return (
                     <button
                        type='button'
                        key={i}
                        role='tab'
                        aria-selected={isActive}
                        aria-label={`Step ${i + 1}: ${tab.title}`}
                        onClick={() => handleTabClick(i)}
                        className={`group text-left relative flex gap-4 p-4 sm:p-5 rounded-xl border transition-all ${
                           isActive
                              ? 'bg-gray-100 border-gray-200 shadow-sm'
                              : 'bg-white border-transparent hover:border-gray-200'
                        }`}
                     >
                        <div
                           className='hidden sm:block w-1 bg-gray-200 rounded-full overflow-hidden'
                           aria-hidden='true'
                        >
                           {isActive && (
                              <div
                                 className='bg-[#ffb200]'
                                 style={{ height: `${progress}%` }}
                              />
                           )}
                        </div>

                        <div className='flex-1'>
                           <h3
                              className={`font-semibold text-base sm:text-lg md:text-xl mb-1 ${
                                 isActive ? 'text-black' : 'text-gray-800'
                              }`}
                           >
                              {tab.title}
                           </h3>
                           <p className='text-gray-600 text-sm sm:text-base'>
                              {tab.description}
                           </p>
                        </div>
                     </button>
                  );
               })}

               <div className='pl-1'>
                  <Link
                     href='/our-model'
                     aria-label='Buy Sokudo electric scooter now'
                     className='gap-2 btn px-6 py-3'
                  >
                     Buy Now
                  </Link>
               </div>
            </div>
         </div>
      </section>
   );
}
