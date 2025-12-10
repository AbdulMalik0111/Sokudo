'use client';

import React from 'react';
import Link from 'next/link';

export default function PressGallery() {
   const data = [
      {
         url: 'https://www.business-standard.com/industry/auto/electric-two-wheeler-manufacturers-seek-reforms-in-the-gst-structure-124033100338_1.html',
         thumb: '/pr/bs.png',
         year: '2025',
         title: "Citing 'disparity', Electric two-wheeler manufacturers call for GST reforms",
      },
      {
         url: 'https://www.news18.com/auto/can-wireless-fast-charging-transform-indias-ev-landscape-heree-what-we-know-8861622.html',
         thumb: '/pr/18.png',
         year: '2025',
         title: "Can Wireless & Fast Charging Transform India's EV Landscape? Here's What We Know",
      },
      {
         url: 'https://auto.economictimes.indiatimes.com/news/auto-components/sokudo-electric-to-build-in-house-motor-and-controller-plant-to-boost-e2w-rd/109578079',
         thumb: '/pr/et.png',
         year: '2024',
         title: 'Sokudo Electric to build in-house motor and controller plant to boost E2W R&D',
      },
      {
         url: 'https://www.theweekendleader.com/Success/3270/turning-waste-profitable.html',
         thumb: '/pr/twl.png',
         year: '2024',
         title: 'First-Generation Entrepreneurs from Middle-Class Families Turn Waste into Rs 80 Crore Turnover Business',
      },
   ];

   const openExternal = (url) => {
      window.open(url, '_blank', 'noopener,noreferrer');
   };

   return (
      <section
         className='page-width mx-auto px-4 py-12 sm:py-16'
         aria-labelledby='press-gallery-heading'
      >
         <div className='text-center mb-12'>
            <h2 id='press-gallery-heading' className='heading'>
               Watch the Electric Revolution Unfold
            </h2>
         </div>

         <div
            className='grid grid-cols-1 md:grid-cols-2 gap-10'
            role='list'
            aria-label='Sokudo press coverage'
         >
            {data.map((item, i) => (
               <div
                  key={i}
                  role='listitem'
                  tabIndex={0}
                  aria-label={`Read article: ${item.title}`}
                  className='flex gap-6 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded-md'
                  onClick={() => openExternal(item.url)}
                  onKeyDown={(e) => {
                     if (e.key === 'Enter') openExternal(item.url);
                  }}
               >
                  <div className='w-24 h-24 sm:w-28 sm:h-28 overflow-hidden rounded-lg border flex-shrink-0'>
                     <img
                        src={item.thumb}
                        alt={`${item.title} publication logo`}
                        className='w-full h-full object-contain transition-transform duration-300 group-hover:scale-110'
                        loading='lazy'
                        draggable='false'
                     />
                  </div>

                  <div className='flex flex-col justify-center'>
                     <p className='text-sm text-gray-500'>{item.year}</p>
                     <h3 className='text-lg font-semibold text-gray-900 leading-snug group-hover:text-black'>
                        {item.title}
                     </h3>
                  </div>
               </div>
            ))}
         </div>

         <div className='text-center mt-10'>
            <Link
               href='/news'
               aria-label='Read more Sokudo news articles'
               className='btn px-6 py-2'
            >
               Read More
            </Link>
         </div>
      </section>
   );
}
