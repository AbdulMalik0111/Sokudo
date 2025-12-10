'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const LandingPagePopup = () => {
   const [showPopup, setShowPopup] = useState(false);

   const [formData, setFormData] = useState({
      name: '',
      pincode: '',
      phone: '',
      productInterested: '',
   });

   const [loading, setLoading] = useState(false);
   const [success, setSuccess] = useState('');
   const [error, setError] = useState('');

   const router = useRouter();

   useEffect(() => {
      const lastClosed = localStorage.getItem('sokudo_popup_last_closed');
      const now = Date.now();
      const ONE_HOUR = 60 * 60 * 1000;

      if (lastClosed && now - Number(lastClosed) < ONE_HOUR) {
         setShowPopup(false);
         return;
      }

      const timer = setTimeout(() => {
         setShowPopup(true);
      }, 20000);

      return () => clearTimeout(timer);
   }, []);

   if (!showPopup) return null;

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleClose = () => {
      setShowPopup(false);
      localStorage.setItem('sokudo_popup_last_closed', Date.now().toString());
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError('');
      setSuccess('');

      try {
         const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/leads`,
            {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify(formData),
            }
         );

         const result = await response.json();

         if (response.ok) {
            setSuccess("Thank you! We'll contact you soon.");
            setFormData({
               name: '',
               pincode: '',
               phone: '',
               productInterested: '',
            });

            router.push(
               `/thankyou?formType=Interest&message=Your Application has been submitted successfully. Our team will contact you shortly.`
            );

            setShowPopup(false);
            localStorage.setItem('sokudo_popup_shown', 'true');
         } else {
            setError(result.message || 'Something went wrong.');
         }
      } catch (err) {
         setError('Server error. Please try again later.');
         console.error(err);
      }

      setLoading(false);
   };

   return (
      <>
         <div
            className='fixed inset-0 bg-black/60 z-40'
            onClick={handleClose}
            aria-hidden='true'
         ></div>

         <div
            className='fixed inset-0 z-50 flex items-center justify-center px-4'
            role='dialog'
            aria-modal='true'
            aria-labelledby='landing-popup-heading'
         >
            <div className='bg-white shadow-xl w-full max-w-4xl md:max-h-[540px] flex flex-col md:flex-row overflow-hidden relative rounded-lg'>
               <button
                  onClick={handleClose}
                  className='absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl'
                  aria-label='Close popup'
                  type='button'
               >
                  ×
               </button>

               <div className='w-1/2 hidden md:ml-[-11px] md:block h-[540px] relative'>
                  <Image
                     src='/landing.webp'
                     alt='Sokudo electric scooter promotional offer'
                     fill
                     className='object-cover'
                     loading='lazy'
                  />
               </div>

               <div className='w-full md:w-1/2 p-4 sm:p-6 flex flex-col justify-center'>
                  <h2
                     id='landing-popup-heading'
                     className='text-2xl sm:text-3xl font-semibold text-gray-900 mb-2 text-center md:text-left'
                  >
                     Leaving so soon?
                  </h2>

                  <p className='text-gray-600 mb-5 text-xs sm:text-sm text-center md:text-left'>
                     We’ve got some exciting offers exclusively for you. Share
                     your details and get your hands on it.
                  </p>

                  <form
                     className='space-y-3 sm:space-y-4'
                     onSubmit={handleSubmit}
                     aria-label='Lead capture form'
                  >
                     <input
                        type='text'
                        name='name'
                        placeholder='Name'
                        value={formData.name}
                        onChange={handleChange}
                        className='w-full border border-gray-300 bg-gray-100 px-3 py-2 sm:px-4 sm:py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#ffb200]'
                        required
                     />

                     <input
                        type='number'
                        name='pincode'
                        placeholder='Pincode'
                        value={formData.pincode}
                        onChange={handleChange}
                        className='w-full border border-gray-300 bg-gray-100 px-3 py-2 sm:px-4 sm:py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#ffb200]'
                        required
                     />

                     <input
                        type='number'
                        name='phone'
                        placeholder='Phone No'
                        value={formData.phone}
                        onChange={handleChange}
                        className='w-full border border-gray-300 bg-gray-100 px-3 py-2 sm:px-4 sm:py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#ffb200]'
                        required
                     />

                     <select
                        name='productInterested'
                        value={formData.productInterested}
                        onChange={handleChange}
                        className='w-full border border-gray-600 bg-gray-100 px-3 py-2 sm:px-4 sm:py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#ffb200]'
                        required
                     >
                        <option value=''>Product interested in</option>
                        <option value='Acute'>Sokudo Acute</option>
                        <option value='Acute 2.2'>Sokudo Acute 2.2</option>
                        <option value='Rapid 2.2'>Sokudo Rapid 2.2</option>
                        <option value='Select 2.2'>Sokudo Select 2.2</option>
                        <option value='Plus'>Sokudo Plus</option>
                        <option value='Pace'>Sokudo Pace</option>
                     </select>

                     <button
                        type='submit'
                        disabled={loading}
                        className='btn w-full bg-[#ffb200] hover:bg-gray-800 text-black font-semibold py-2 sm:py-3 rounded-[20px]'
                     >
                        {loading ? 'Submitting...' : 'I am Interested'}
                     </button>

                     {success && (
                        <p className='text-green-600 mt-2' role='status'>
                           {success}
                        </p>
                     )}
                     {error && (
                        <p className='text-red-600 mt-2' role='alert'>
                           {error}
                        </p>
                     )}
                  </form>
               </div>
            </div>
         </div>
      </>
   );
};

export default LandingPagePopup;
