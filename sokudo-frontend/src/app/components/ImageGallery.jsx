'use client';

import React from 'react';
import Image from 'next/image';

const ImageGallery = () => {
   const newsItems = [
      {
         id: 1,
         image: '/news-1.png',
         title: 'Inauguration of First Sokudo Showroom',
         date: 'September 10, 2023',
      },
      {
         id: 2,
         image: '/news-1.png',
         title: 'Sokudo New Showroom Opened Near Bombay Hospital',
         date: 'August 25, 2023',
      },
      {
         id: 3,
         image: '/news-1.png',
         title: 'Sokudo New Showroom Opened Near Bombay Hospital',
         date: 'August 25, 2023',
      },
      {
         id: 4,
         image: '/news-1.png',
         title: 'Sokudo New Showroom Opened Near Bombay Hospital',
         date: 'August 25, 2023',
      },
   ];

   return (
      <section className='max-w-7xl mx-auto py-16'>
         {/* Header */}
         <div className='text-center mb-15'>
            <h2 className='heading'>Image Gallery</h2>
         </div>

         {/* News Grid */}
         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-15'>
            {newsItems.map((item) => (
               <div key={item.id} className='flex flex-col'>
                  <div className='mb-4'>
                     <Image
                        src={item.image}
                        alt={item.title}
                        width={400}
                        height={300}
                        className='w-full h-full object-cover rounded-lg'
                     />
                  </div>

                  {/* Title */}
                  <h3 className='text-sm font-bold text-[#484848] mb-2 line-clamp-2'>
                     {item.title}
                  </h3>

                  {/* Date */}
                  <p className='text-[18px] font-bold text-[#555555]'>
                     {item.date}
                  </p>
               </div>
            ))}
         </div>

         {/* Show More Button */}
         <div className='text-center'>
            <button aria-label='See more' className='btn'>
               Show More
            </button>
         </div>
      </section>
   );
};

export default ImageGallery;
