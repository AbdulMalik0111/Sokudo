'use client';

import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { IoClose } from 'react-icons/io5';
import toast from 'react-hot-toast';
import axios from 'axios';

const CITY_OPTIONS = [
   { value: 'delhi', label: 'Delhi' },
   { value: 'noida', label: 'Noida' },
   { value: 'ghaziabad', label: 'Ghaziabad' },
   { value: 'gurugram', label: 'Gurugram' },
   { value: 'lucknow', label: 'Lucknow' },
   { value: 'faridabad', label: 'Faridabad' },
   { value: 'palam', label: 'Palam' },
   { value: 'hapur', label: 'Hapur' },
   { value: 'haryana', label: 'Haryana' },
   { value: 'muzaffarpur', label: 'Muzaffarpur' },
   { value: 'rajasthan', label: 'Rajasthan' },
   { value: 'assam', label: 'Assam' },
   { value: 'kolkata', label: 'Kolkata' },
];

const BookingModal = ({ isOpen, onClose, formData, onSuccess }) => {
   const products = useSelector((state) => state.product.items || []);
   const [selectedCity, setSelectedCity] = useState('');
   const [selectedModelId, setSelectedModelId] = useState('');
   const [loading, setLoading] = useState(false);

   const selectedProduct = useMemo(
      () => products.find((p) => p._id === selectedModelId),
      [products, selectedModelId]
   );

   const handleConfirmBooking = async () => {
      if (!selectedProduct) {
         toast.error('Please select a scooter model');
         return;
      }

      if (!selectedCity) {
         toast.error('Please select a city');
         return;
      }

      try {
         setLoading(true);

         await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/test-ride/book`, {
            name: formData?.name,
            email: formData?.email,
            phone: formData?.phone,
            pincode: formData?.pincode,
            date: formData?.date,
            time: formData?.time,
            city: selectedCity,
            cityLabel:
               CITY_OPTIONS.find((c) => c.value === selectedCity)?.label || '',
            modelId: selectedProduct._id,
            modelName: selectedProduct.name,
         });

         if (onSuccess) onSuccess();

         setSelectedCity('');
         setSelectedModelId('');
         onClose();
      } catch (err) {
         toast.error(
            err?.response?.data?.message ||
               'Failed to book test ride. Try again.'
         );
      } finally {
         setLoading(false);
      }
   };

   if (!isOpen) return null;

   return (
      <div className='fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-4'>
         <div className='bg-white w-full max-w-md rounded-xl shadow-lg'>
            <div className='flex justify-between items-center px-5 py-4 border-b'>
               <h3 className='font-semibold text-lg'>Confirm Test Ride</h3>
               <button onClick={onClose}>
                  <IoClose size={18} />
               </button>
            </div>

            <div className='p-5 space-y-4'>
               <select
                  className='input'
                  value={selectedModelId}
                  onChange={(e) => setSelectedModelId(e.target.value)}
               >
                  <option value=''>Select Scooter Model</option>
                  {products.map((p) => (
                     <option key={p._id} value={p._id}>
                        {p.name}
                     </option>
                  ))}
               </select>

               <select
                  className='input'
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
               >
                  <option value=''>Select City</option>
                  {CITY_OPTIONS.map((c) => (
                     <option key={c.value} value={c.value}>
                        {c.label}
                     </option>
                  ))}
               </select>

               <button
                  onClick={handleConfirmBooking}
                  disabled={loading || !selectedCity || !selectedModelId}
                  className={`btn w-full py-2 ${
                     loading || !selectedCity || !selectedModelId
                        ? 'opacity-60 cursor-not-allowed'
                        : ''
                  }`}
               >
                  {loading ? 'Booking...' : 'Confirm Test Ride'}
               </button>
            </div>
         </div>
      </div>
   );
};

export default BookingModal;
