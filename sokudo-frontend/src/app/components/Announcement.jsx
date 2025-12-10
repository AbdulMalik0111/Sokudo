'use client';

import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';

const Announcement = ({ visible, setVisible }) => {
   const [autoHide, setAutoHide] = useState(false);

   useEffect(() => {
      const offset = visible && !autoHide ? '44px' : '0px';
      document.documentElement.style.setProperty(
         '--announcement-offset',
         offset
      );
   }, [visible, autoHide]);

   useEffect(() => {
      const handleScroll = () => {
         if (window.scrollY > 20) {
            setAutoHide(true);
         } else {
            setAutoHide(false);
         }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   if (!visible) return null;

   return (
      <div
         role='region'
         aria-label='Announcement'
         className={`
        fixed top-0 left-0 w-full z-[0] transition-all duration-300
        bg-gradient-to-r from-[rgba(255,255,255,0.9)]
        via-[rgba(24,30,34,0.9)] to-[#181E22] text-white
        ${autoHide ? '-translate-y-full' : 'translate-y-0'}
      `}
      >
         <div className='max-w-7xl mx-auto flex items-center justify-center px-4 sm:px-6 relative'>
            <p className='w-full text-center text-[13px] sm:text-sm leading-snug sm:leading-6 py-2 sm:py-3 pr-12 sm:pr-14'>
               Introducing SOKUDO the future of motorcycling. Starts at an
               introductory price of ₹89,889.
               <a
                  href='/our-model'
                  className='text-[#FFB200] underline font-medium ml-1'
               >
                  Book Yours Today
               </a>
               .
            </p>

            <button
               type='button'
               onClick={() => setVisible(false)}
               aria-label='Close announcement'
               className='absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-1 sm:p-1.5 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#FFB200]/70'
            >
               <IoClose className='text-[#FFB200] h-5 w-5 sm:h-6 sm:w-6' />
            </button>
         </div>
      </div>
   );
};

export default Announcement;
