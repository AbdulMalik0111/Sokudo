'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import { FiZap } from 'react-icons/fi';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

import Image from 'next/image';
const Tab5 = '/ev-charging-station.webp';
import Link from 'next/link';

const chargers = [
   {
      title: 'Sokudo Hypercharger, Rmz Eco World, Bellandur',
      address:
         'Sokudo Hypercharger, Rmz Eco World, Bellandur, Rmz Ecoworld 30 Rmz Ecospace, Adarsh Palm Retreat. Bellandur. Bengaluru.',
   },
   {
      title: 'Sokudo Hypercharger, Jrr Towers, Jayanagar',
      address:
         'Sokudo Hypercharger, Jrr Towers, Jayanagar, Jrr Towers, First Floor, 36/1, Patalamma Temple Rd. Basavanagudi. Bengaluru. Karnataka',
   },
   {
      title: 'Sokudo Hypercharger, Sri Udupi Food Hub, Gandhi',
      address:
         'Sokudo Hypercharger, Sri Udupi Food Hub, Gandhi Nagar, Sri Udupi Food Hub, 2, The Kanishka Grand Building, 2nd Main Rd.',
   },
   {
      title: 'Sokudo Hypercharger, MG Road',
      address:
         'Sokudo Hypercharger, MG Road, 123 Main Street, MG Road, Bengaluru, Karnataka',
   },
   {
      title: 'Sokudo Hypercharger, Whitefield',
      address:
         'Sokudo Hypercharger, Whitefield, Near Phoenix Mall, Whitefield Main Rd, Bengaluru.',
   },
   {
      title: 'Sokudo Hypercharger, Indiranagar',
      address:
         'Sokudo Hypercharger, Indiranagar, 80 Feet Road, Near Metro Station, Bengaluru.',
   },
];

export default function HyperchargerSection() {
   return (
      <section className='max-w-7xl mx-auto py-16 px-4'>
         {/* Top Section */}
         <div className='flex flex-col md:flex-row items-center justify-between gap-10'>
            <div className='md:w-1/2'>
               <h2 className='heading !leading-14 !font-bold'>
                  Find a Hypercharger near you in{' '}
                  <span className='text-green-600'>City</span>
               </h2>
               <p className='text-gray-500 mt-4 text-lg'>
                  We&apos;re expanding Sokudo’s Hypercharging network rapidly
                  across India.
               </p>

               <Link
                  href='#location-finder'
                  className='mt-6 inline-block text-green-600 font-semibold hover:underline'
               >
                  See our entire network
               </Link>
            </div>

            {/* RIGHT IMAGE */}
            <div className='md:w-1/2 relative flex justify-end items-center'>
               <Image src={Tab5} alt='Hypercharger' className='h-96 w-auto' />
            </div>
         </div>

         {/* Slider Header with Arrows */}
         <div className='flex justify-end items-center mb-4'>
            <button
               aria-label='left'
               className='swiper-button-prev-custom bg-white p-2 rounded-full shadow hover:bg-gray-100 transition mr-5'
            >
               <MdKeyboardArrowLeft size={32} />
            </button>
            <button
               aria-label='right'
               className='swiper-button-next-custom bg-white p-2 rounded-full shadow hover:bg-gray-100 transition'
            >
               <MdKeyboardArrowRight size={32} />
            </button>
         </div>

         {/* Card Slider */}
         <Swiper
            modules={[Navigation]}
            navigation={{
               nextEl: '.swiper-button-next-custom',
               prevEl: '.swiper-button-prev-custom',
            }}
            slidesPerView={3}
            slidesPerGroup={1}
            spaceBetween={20}
            breakpoints={{
               640: { slidesPerView: 2 },
               1024: { slidesPerView: 3 },
            }}
         >
            {chargers.map((charger, index) => (
               <SwiperSlide key={index}>
                  <div className='p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition flex flex-col justify-between min-h-[220px] h-full'>
                     <FiZap className='text-gray-300 text-3xl mb-4' />

                     <div>
                        <h3 className='text-lg font-semibold text-gray-800'>
                           {charger.title}
                        </h3>
                        <p className='text-gray-500 text-sm mt-2'>
                           {charger.address}
                        </p>
                     </div>
                  </div>
               </SwiperSlide>
            ))}
         </Swiper>
      </section>
   );
}
