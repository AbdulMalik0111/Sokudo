'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const SokudoFeatureShowcase = () => {
   const leftImages = ['/tab-1.png', '/Web-Partnership-Form.png'];
   const rightImages = ['/tab-2.png', '/tab-4.png', '/tab-5.png'];

   return (
      <section className='w-full py-14 max-w-7xl mx-auto px-4'>
         <h2 className='heading text-center text-3xl md:text-4xl font-bold text-gray-900 mb-12'>
            Know the{' '}
            <span className='heading !text-yellow-500'>
               Sokudo Electric Scooter
            </span>
         </h2>

         <div className='flex items-start justify-center gap-6 flex-wrap'>
            <div className='flex flex-col gap-4 w-full sm:w-[45%] lg:w-[25%]'>
               {leftImages.map((img, index) => (
                  <div
                     key={index}
                     className='bg-[#f3f7fd] rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300'
                  >
                     <Image
                        src={img}
                        alt='Feature'
                        width={800}
                        height={800}
                        className='w-full h-full object-cover'
                     />
                  </div>
               ))}
            </div>

            <div className='w-full sm:w-[90%] lg:w-[40%]'>
               <div className='bg-[#f3f7fd] rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition duration-300'>
                  <Image
                     src='/tab-3.png'
                     alt='Main Feature'
                     width={1200}
                     height={1200}
                     className='w-full h-full object-cover'
                  />
               </div>
            </div>

            <div className='flex flex-col gap-4 w-full sm:w-[45%] lg:w-[25%]'>
               {rightImages.map((img, index) => (
                  <div
                     key={index}
                     className='bg-[#f3f7fd] rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300'
                  >
                     <Image
                        src={img}
                        alt='Feature'
                        width={800}
                        height={800}
                        className='w-full h-full object-cover'
                     />
                  </div>
               ))}
            </div>
         </div>

         <div className='w-full flex justify-center mt-10'>
            <Link
               href='/our-model'
               className='px-8 btn py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-xl text-lg transition'
            >
               Book Now
            </Link>
         </div>
      </section>
   );
};

export default SokudoFeatureShowcase;
