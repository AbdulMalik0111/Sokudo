'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const cities = [
   { name: 'Shahadra', img: '/loc/l1.webp' },
   { name: 'Uttam Nagar', img: '/loc/l2.webp' },
   { name: 'Mohan Nagar', img: '/loc/l3.webp' },
   { name: 'Bhajanpura', img: '/loc/l5.webp' },
   { name: 'Greater-Noida', img: '/pune.jpg' },
   { name: 'Narela', img: '/kolkata.webp' },
];

const CityAvailability = () => {
   const router = useRouter();

   const handleCityClick = (city) => {
      router.push(`/location?city=${encodeURIComponent(city)}`);
   };

   return (
      <section
         className='relative flex my-6 py-4 items-center justify-center min-h-[85vh] overflow-hidden bg-gray-50'
         aria-labelledby='city-availability-heading'
      >
         <div
            className="absolute py-4 inset-0 bg-[url('/store.webp')] bg-cover bg-right opacity-90"
            aria-hidden='true'
            style={{
               maskImage:
                  'linear-gradient(to right, rgba(0,0,0,0.15) 25%, rgba(0,0,0,1) 100%)',
               WebkitMaskImage:
                  'linear-gradient(to right, rgba(0,0,0,0.15) 25%, rgba(0,0,0,1) 100%)',
            }}
         ></div>

         <div
            className='absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-white/80 via-white/30 to-transparent backdrop-blur-[1px]'
            aria-hidden='true'
         ></div>

         <div className='relative z-10 container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12'>
            <div className='flex-1 max-w-xl'>
               <h2
                  id='city-availability-heading'
                  className='heading text-4xl md:text-5xl font-bold text-gray-900 leading-tight'
               >
                  Come on over. <br />
                  Meet us in <span className='text-yellow-500'>Your City</span>
               </h2>

               <p className='mt-4 text-gray-600 text-lg'>
                  Visit our Sokudo Electric Stores. Because seeing is believing.
               </p>

               <div
                  className='mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'
                  role='list'
                  aria-label='Cities where Sokudo stores are available'
               >
                  {cities.slice(0, 4).map((city) => (
                     <div
                        key={city.name}
                        role='button'
                        tabIndex={0}
                        aria-label={`View Sokudo stores in ${city.name}`}
                        onClick={() => handleCityClick(city.name)}
                        onKeyDown={(e) => {
                           if (e.key === 'Enter') handleCityClick(city.name);
                        }}
                        className='relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-yellow-500'
                     >
                        <Image
                           src={city.img}
                           alt={`Sokudo Electric Store in ${city.name}`}
                           width={300}
                           height={200}
                           className='w-full h-28 object-cover group-hover:scale-105 transition-transform duration-300'
                        />
                        <div className='absolute inset-0 bg-black/40 flex items-end'>
                           <h3 className='text-white text-lg font-medium p-3'>
                              {city.name}
                           </h3>
                        </div>
                     </div>
                  ))}
               </div>

               <div className='mt-6'>
                  <button
                     aria-label='View all Sokudo store locations'
                     onClick={() => router.push('/location')}
                     className='px-5 py-2 btn'
                  >
                     More Places
                  </button>
               </div>
            </div>
         </div>
      </section>
   );
};

export default CityAvailability;
