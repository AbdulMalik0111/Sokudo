'use client';

import {
   FaFacebookSquare,
   FaTwitter,
   FaInstagram,
   FaYoutube,
   FaPhoneAlt,
   FaEnvelope,
   FaMapMarkerAlt,
} from 'react-icons/fa';

import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
   return (
      <footer className='py-5 pt-0' role='contentinfo'>
         <div className='top-footer bg-black text-white py-8 lg:py-8'>
            <div className='px-4 lg:px-0'>
               <div className='flex flex-col items-center gap-2'>
                  <Image
                     src='/Sokudo Logo White.webp'
                     alt='Sokudo Electric India logo'
                     width={200}
                     height={200}
                     className='h-25 lg:h-40 w-auto'
                  />
               </div>

               <nav
                  className='flex justify-center gap-4 lg:gap-5 mt-6 text-yellow-500 text-xl lg:text-2xl'
                  aria-label='Social media links'
               >
                  <a
                     href='https://www.facebook.com/SokudoElectricIndia/'
                     aria-label='Sokudo Electric on Facebook'
                     className='hover:text-yellow-400 transition'
                     rel='noopener noreferrer'
                     target='_blank'
                  >
                     <FaFacebookSquare aria-hidden='true' />
                  </a>

                  <a
                     href='https://www.facebook.com/SokudoElectricIndia/'
                     aria-label='Sokudo Electric on Twitter'
                     className='hover:text-yellow-400 transition'
                     rel='noopener noreferrer'
                     target='_blank'
                  >
                     <FaTwitter aria-hidden='true' />
                  </a>

                  <a
                     href='https://www.instagram.com/sokudoelectricindia/'
                     aria-label='Sokudo Electric on Instagram'
                     className='hover:text-yellow-400 transition'
                     rel='noopener noreferrer'
                     target='_blank'
                  >
                     <FaInstagram aria-hidden='true' />
                  </a>

                  <a
                     href='http://youtube.com/channel/UCPEtmoVgyfDBi4np3CUuvvA'
                     aria-label='Sokudo Electric on YouTube'
                     className='hover:text-yellow-400 transition'
                     rel='noopener noreferrer'
                     target='_blank'
                  >
                     <FaYoutube aria-hidden='true' />
                  </a>
               </nav>

               <div
                  className='mt-6 flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-10 text-sm'
                  aria-label='Contact information'
               >
                  <a
                     href='tel:+918920649555'
                     className='flex items-center gap-2'
                     aria-label='Call Sokudo Electric'
                  >
                     <FaPhoneAlt
                        className='text-yellow-500'
                        size={22}
                        aria-hidden='true'
                     />
                     <span>+91-8920649555</span>
                  </a>

                  <a
                     href='mailto:info@sokudoindia.com'
                     className='flex items-center gap-2'
                     aria-label='Email Sokudo Electric'
                  >
                     <FaEnvelope
                        className='text-yellow-500'
                        size={22}
                        aria-hidden='true'
                     />
                     <span>info@sokudoindia.com</span>
                  </a>

                  <address className='flex items-start gap-2 max-w-sm not-italic'>
                     <FaMapMarkerAlt
                        className='text-yellow-500 mt-0.5'
                        size={26}
                        aria-hidden='true'
                     />
                     <span>
                        518, Sector 1, Bisrakh Jalalpur, Greater Noida, Uttar
                        Pradesh 201306
                     </span>
                  </address>
               </div>

               <nav
                  className='mt-6 text-center text-[12px] flex flex-wrap justify-center gap-x-4 gap-y-2'
                  aria-label='Footer navigation'
               >
                  <Link
                     href='/privacy-policy'
                     className='hover:text-yellow-500'
                  >
                     Privacy Policy
                  </Link>
                  <span className='hidden lg:inline'>|</span>

                  <Link href='/disclaimer' className='hover:text-yellow-500'>
                     Disclaimer
                  </Link>
                  <span className='hidden lg:inline'>|</span>

                  <Link href='/warranty' className='hover:text-yellow-500'>
                     Warranty
                  </Link>
                  <span className='hidden lg:inline'>|</span>

                  <Link
                     href='/terms-conditions'
                     className='hover:text-yellow-500'
                  >
                     Terms & Conditions
                  </Link>
                  <span className='hidden lg:inline'>|</span>

                  <Link href='/faq' className='hover:text-yellow-500'>
                     FAQ
                  </Link>
               </nav>
            </div>
         </div>

         <div className='bottom-footer bg_white text-black'>
            <div className='text-center text-xs text-gray-500 mt-6 px-4 lg:px-0'>
               © {new Date().getFullYear()} SOKUDO ELECTRIC INDIA PRIVATE
               LIMITED. All rights reserved.
            </div>
         </div>
      </footer>
   );
};

export default Footer;
