'use client';

import React from 'react';
import { IoClose } from 'react-icons/io5';
import BookNow from './BookNow';

const BookNowModal = ({ isOpen, onClose }) => {
   if (!isOpen) return null;

   return (
      <div className='fixed inset-0 z-[999] bg-black/60 flex items-center justify-center px-4'>
         <div className='bg-white rounded-2xl w-full max-w-3xl relative shadow-xl overflow-y-auto max-h-[95vh]'>
            <button
               onClick={onClose}
               aria-label='close'
               className='absolute right-3 top-3 bg-gray-200 hover:bg-gray-300 p-2 rounded-full'
            >
               <IoClose size={24} />
            </button>

            <BookNow
               models={[
                  'Acute',
                  'Acute 2.2',
                  'Rapid 2.2',
                  'Select 2.2',
                  'Sokudo Plus',
                  'Sokudo Pace',
               ]}
               colors={['Red', 'Blue', 'Black']}
               states={[
                  'Punjab',
                  'Haryana',
                  'Delhi',
                  'Uttar Pradesh',
                  'Rajasthan',
                  'Maharashtra',
                  'Gujarat',
                  'Karnataka',
                  'West Bengal',
                  'Tamil Nadu',
               ]}
               citiesByState={{
                  Punjab: [
                     'Amritsar',
                     'Jalandhar',
                     'Ludhiana',
                     'Patiala',
                     'Mohali',
                     'Bathinda',
                  ],
                  Haryana: [
                     'Gurgaon',
                     'Faridabad',
                     'Panipat',
                     'Karnal',
                     'Hisar',
                     'Sonipat',
                  ],
                  Delhi: [
                     'New Delhi',
                     'Dwarka',
                     'Rohini',
                     'Saket',
                     'Janakpuri',
                     'Karol Bagh',
                  ],
                  'Uttar Pradesh': [
                     'Lucknow',
                     'Kanpur',
                     'Varanasi',
                     'Noida',
                     'Ghaziabad',
                     'Agra',
                  ],
                  Rajasthan: [
                     'Jaipur',
                     'Udaipur',
                     'Jodhpur',
                     'Kota',
                     'Bikaner',
                     'Ajmer',
                  ],
                  Maharashtra: [
                     'Mumbai',
                     'Pune',
                     'Nagpur',
                     'Nashik',
                     'Thane',
                     'Aurangabad',
                  ],
                  Gujarat: [
                     'Ahmedabad',
                     'Surat',
                     'Vadodara',
                     'Rajkot',
                     'Gandhinagar',
                     'Bhavnagar',
                  ],
                  Karnataka: [
                     'Bengaluru',
                     'Mysuru',
                     'Mangaluru',
                     'Hubballi',
                     'Belagavi',
                  ],
                  'West Bengal': [
                     'Kolkata',
                     'Howrah',
                     'Siliguri',
                     'Durgapur',
                     'Asansol',
                  ],
                  'Tamil Nadu': [
                     'Chennai',
                     'Coimbatore',
                     'Madurai',
                     'Salem',
                     'Tiruchirappalli',
                  ],
               }}
            />
         </div>
      </div>
   );
};

export default BookNowModal;
