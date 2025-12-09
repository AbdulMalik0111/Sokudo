import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useRazorpay } from 'react-razorpay';
import { useDispatch, useSelector } from 'react-redux';
import {
   createOrderThunk,
   verifyPaymentThunk,
   logPaymentFailureThunk,
} from '../features/order/OrderSlice.js';
import { useNavigate } from 'react-router-dom';

const BookNow = ({
   productName = 'Electric Scooter',
   bookingAmount = 0,
   colors = [],
   models = [],
   states = [],
   citiesByState = {},
   onSubmit: handleSubmitExternal,
   showTitle = true,
   title = 'Book Your Electric Scooter',
   className = '',
   defaultValues = {},
}) => {
   const {
      register,
      handleSubmit,
      watch,
      reset,
      setValue,
      formState: { errors, isSubmitSuccessful },
   } = useForm();

   const { Razorpay } = useRazorpay();
   const dispatch = useDispatch();
   const { loading: isSubmitting, error } = useSelector((state) => state.order);

   const { isLoggedIn } = useSelector((state) => state.user);
   const navigate = useNavigate();


   useEffect(() => {
      if (defaultValues && Object.keys(defaultValues).length) {
         reset({ ...defaultValues });
      }
   }, [defaultValues, reset]);

   const selectedState = watch('state');
   const cityOptions = citiesByState[selectedState] || [];

   useEffect(() => {
      setValue('city', '');
   }, [selectedState, setValue]);

   const handlePaymentAndSubmit = async (data) => {
      try {
         const orderDetails = await dispatch(
            createOrderThunk({
               formDetails: data,
               bookingAmount,
               productName,
            })
         ).unwrap();

         if (!orderDetails || !orderDetails.razorpay_order_id) {
            toast.error('Failed to create payment order');
            return;
         }

         const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: orderDetails.amount,
            currency: 'INR',
            name: productName,
            description: `Booking for ${productName}`,
            order_id: orderDetails.razorpay_order_id,
            handler: async function (response) {
               try {
                  await dispatch(
                     verifyPaymentThunk({
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                     })
                  ).unwrap();

                  toast.success('Payment Verified Successfully ✅');
                   navigate("/thankyou", {
      state: {
        formType: "Career",
        message: `Your Application has been submitted successfully. Our team will contact you shortly.`,
      },});
                  if (handleSubmitExternal) await handleSubmitExternal(data);
                  reset();
               } catch (err) {
                  toast.error(err || 'Payment verification failed ❌');
               }
            },
            prefill: {
               name: data.name,
               email: data.email,
               contact: data.contact,
            },
            theme: {
               color: '#FFB200',
            },
         };

         const rzp = new Razorpay(options);

         rzp.on('payment.failed', function (response) {
            dispatch(
               logPaymentFailureThunk({
                  razorpay_order_id: response.error.metadata.order_id,
               })
            );
            toast.error(`Payment Failed: ${response.error.description}`);
         });

         rzp.open();
      } catch (err) {
         toast.error(err || 'Payment initialization failed');
      }
   };

   const isModelDisabled = Boolean(defaultValues?.model);
   const isNameDisabled = Boolean(defaultValues?.name);
   const isEmailDisabled = Boolean(defaultValues?.email);
   const isContactDisabled = Boolean(defaultValues?.contact);

   return (
      <section className={`w-full ${className} `}>
         <div className='rounded-2xl border border-gray-200 '>
            {showTitle && (
               <div className='px-6 sm:px-8 pt-8'>
                  <h2 className='text-2xl sm:text-3xl font-semibold text-gray-900 text-center'>
                     {title}
                  </h2>
                  <p className='mt-2 text-center text-sm text-gray-500'>
                     Fields marked with <span className='text-red-500'>*</span>{' '}
                     are required
                  </p>
                  {isSubmitSuccessful && !isSubmitting && (
                     <p className='text-green-600 text-center mt-2 font-semibold'>
                        Submitted successfully!
                        
                     </p>
                    
                  )}
                  {error && (
                     <p className='text-red-600 text-center mt-2 font-semibold'>
                        {error}
                     </p>
                  )}
               </div>
            )}

            <form
               onSubmit={handleSubmit(handlePaymentAndSubmit)}
               className='px-6 sm:px-8 py-8 space-y-6'
               noValidate
            >
               {/* ... all your form fields ... */}
               {/* (I'm skipping the form fields here for brevity, they are all correct and do not change) */}

               <div className='grid sm:grid-cols-2 gap-6'>
                  <div>
                     <label
                        htmlFor='color'
                        className={`block text-sm font-medium ${
                           errors.color ? 'text-red-500' : 'text-gray-700'
                        }`}
                     >
                        Scooter Color <span className='text-red-500'>*</span>
                     </label>
                     <select
                        id='color'
                        {...register('color', {
                           required: 'Please choose a color',
                        })}
                        className={`mt-2 w-full rounded-xl border px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#ffb200] focus:border-[#ffb200] ${
                           errors.color ? 'border-red-500' : 'border-gray-300'
                        }`}
                        defaultValue=''
                     >
                        <option value='' disabled>
                           Choose Scooter Color
                        </option>
                        {colors.map((c) => (
                           <option key={c} value={c}>
                              {c}
                           </option>
                        ))}
                     </select>
                     {errors.color && (
                        <span className='text-red-500 text-xs'>
                           {errors.color.message}
                        </span>
                     )}
                  </div>

                  <div>
                     <label
                        htmlFor='model'
                        className={`block text-sm font-medium ${
                           errors.model ? 'text-red-500' : 'text-gray-700'
                        }`}
                     >
                        Scooter Model <span className='text-red-500'>*</span>
                     </label>
                     <select
                        id='model'
                        {...register('model', {
                           required: 'Please choose a model',
                        })}
                        disabled={isModelDisabled}
                        className={`mt-2 w-full rounded-xl border px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#ffb200] focus:border-[#ffb200] ${
                           errors.model ? 'border-red-500' : 'border-gray-300'
                        } ${
                           isModelDisabled
                              ? 'disabled:bg-gray-100 disabled:text-gray-500'
                              : ''
                        }`}
                        defaultValue=''
                     >
                        <option value='' disabled>
                           Choose Scooter Model
                        </option>
                        {models.map((m) => (
                           <option key={m} value={m}>
                              {m}
                           </option>
                        ))}
                     </select>
                     {errors.model && (
                        <span className='text-red-500 text-xs'>
                           {errors.model.message}
                        </span>
                     )}
                  </div>
               </div>

               <div className='grid sm:grid-cols-2 gap-6'>
                  <div>
                     <label
                        htmlFor='name'
                        className={`block text-sm font-medium ${
                           errors.name ? 'text-red-500' : 'text-gray-700'
                        }`}
                     >
                        Name <span className='text-red-500'>*</span>
                     </label>
                     <input
                        id='name'
                        type='text'
                        placeholder='Enter your name'
                        {...register('name', { required: 'Name is required' })}
                        disabled={isNameDisabled}
                        className={`mt-2 w-full rounded-xl border px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#ffb200] focus:border-[#ffb200] ${
                           errors.name ? 'border-red-500' : 'border-gray-300'
                        } ${
                           isNameDisabled
                              ? 'disabled:bg-gray-100 disabled:text-gray-500'
                              : ''
                        }`}
                     />
                     {errors.name && (
                        <span className='text-red-500 text-xs'>
                           {errors.name.message}
                        </span>
                     )}
                  </div>

                  <div>
                     <label
                        htmlFor='email'
                        className={`block text-sm font-medium ${
                           errors.email ? 'text-red-500' : 'text-gray-700'
                        }`}
                     >
                        Email Id <span className='text-red-500'>*</span>
                     </label>
                     <input
                        id='email'
                        type='email'
                        placeholder='Enter your email id'
                        {...register('email', {
                           required: 'Email is required',
                           pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: 'Enter a valid email',
                           },
                        })}
                        disabled={isEmailDisabled}
                        className={`mt-2 w-full rounded-xl border px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#ffb200] focus:border-[#ffb200] ${
                           errors.email ? 'border-red-500' : 'border-gray-300'
                        } ${
                           isEmailDisabled
                              ? 'disabled:bg-gray-100 disabled:text-gray-500'
                              : ''
                        }`}
                     />
                     {errors.email && (
                        <span className='text-red-500 text-xs'>
                           {errors.email.message}
                        </span>
                     )}
                  </div>
               </div>

               <div>
                  <label
                     htmlFor='contact'
                     className={`block text-sm font-medium ${
                        errors.contact ? 'text-red-500' : 'text-gray-700'
                     }`}
                  >
                     Contact Number <span className='text-red-500'>*</span>
                  </label>
                  <input
                     id='contact'
                     type='tel'
                     placeholder='Enter your contact'
                     {...register('contact', {
                        required: 'Contact number is required',
                        pattern: {
                           value: /^[0-9+\-\s()]{7,}$/,
                           message: 'Enter a valid contact number',
                        },
                     })}
                     disabled={isContactDisabled}
                     className={`mt-2 w-full rounded-xl border px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#ffb200] focus:border-[#ffb200] ${
                        errors.contact ? 'border-red-500' : 'border-gray-300'
                     } ${
                        isContactDisabled
                           ? 'disabled:bg-gray-100 disabled:text-gray-500'
                           : ''
                     }`}
                  />
                  {errors.contact && (
                     <span className='text-red-500 text-xs'>
                        {errors.contact.message}
                     </span>
                  )}
               </div>

               <div className='grid sm:grid-cols-2 gap-6'>
                  <div>
                     <label
                        htmlFor='state'
                        className={`block text-sm font-medium ${
                           errors.state ? 'text-red-500' : 'text-gray-700'
                        }`}
                     >
                        State <span className='text-red-500'>*</span>
                     </label>
                     <select
                        id='state'
                        defaultValue=''
                        {...register('state', {
                           required: 'Please select a state',
                        })}
                        className={`mt-2 w-full rounded-xl border px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#ffb200] focus:border-[#ffb200] ${
                           errors.state ? 'border-red-500' : 'border-gray-300'
                        }`}
                     >
                        <option value='' disabled>
                           Select a state
                        </option>
                        {states.map((s) => (
                           <option key={s} value={s}>
                              {s}
                           </option>
                        ))}
                     </select>
                     {errors.state && (
                        <span className='text-red-500 text-xs'>
                           {errors.state.message}
                        </span>
                     )}
                  </div>

                  <div>
                     <label
                        htmlFor='city'
                        className={`block text-sm font-medium ${
                           errors.city ? 'text-red-500' : 'text-gray-700'
                        }`}
                     >
                        City <span className='text-red-500'>*</span>
                     </label>
                     <select
                        id='city'
                        defaultValue=''
                        disabled={!selectedState}
                        {...register('city', {
                           required: 'Please select a city',
                        })}
                        className={`mt-2 w-full rounded-xl border px-4 py-2.5 text-gray-900 disabled:bg-gray-100 disabled:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#ffb200] focus:border-[#ffb200] ${
                           errors.city ? 'border-red-500' : 'border-gray-300'
                        }`}
                     >
                        <option value='' disabled>
                           {selectedState
                              ? 'Select a city'
                              : 'Select a state first'}
                        </option>
                        {cityOptions.map((c) => (
                           <option key={c} value={c}>
                              {c}
                           </option>
                        ))}
                     </select>
                     {errors.city && (
                        <span className='text-red-500 text-xs'>
                           {errors.city.message}
                        </span>
                     )}
                  </div>
               </div>

               <div className='grid sm:grid-cols-2 gap-6'>
                  <div>
                     <label
                        htmlFor='address'
                        className={`block text-sm font-medium ${
                           errors.address ? 'text-red-500' : 'text-gray-700'
                        }`}
                     >
                        Address <span className='text-red-500'>*</span>
                     </label>
                     <textarea
                        id='address'
                        rows={4}
                        placeholder='Enter your Address'
                        {...register('address', {
                           required: 'Address is required',
                        })}
                        className={`mt-2 w-full rounded-xl border px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#ffb200] focus:border-[#ffb200] ${
                           errors.address ? 'border-red-500' : 'border-gray-300'
                        }`}
                     />
                     {errors.address && (
                        <span className='text-red-500 text-xs'>
                           {errors.address.message}
                        </span>
                     )}
                  </div>

                  <div>
                     <label
                        htmlFor='landmark'
                        className={`block text-sm font-medium ${
                           errors.landmark ? 'text-red-500' : 'text-gray-700'
                        }`}
                     >
                        Landmark <span className='text-red-500'>*</span>
                     </label>
                     <input
                        id='landmark'
                        type='text'
                        placeholder='Enter your Landmark'
                        {...register('landmark', {
                           required: 'Landmark is required',
                        })}
                        className={`mt-2 w-full rounded-xl border px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#ffb200] focus:border-[#ffb200] ${
                           errors.landmark
                              ? 'border-red-500'
                              : 'border-gray-300'
                        }`}
                     />
                     {errors.landmark && (
                        <span className='text-red-500 text-xs'>
                           {errors.landmark.message}
                        </span>
                     )}

                     <div className='mt-6'>
                        <label
                           htmlFor='pincode'
                           className={`block text-sm font-medium ${
                              errors.pincode ? 'text-red-500' : 'text-gray-700'
                           }`}
                        >
                           Pincode <span className='text-red-500'>*</span>
                        </label>
                        <input
                           id='pincode'
                           type='text'
                           inputMode='numeric'
                           placeholder='Enter your Pincode'
                           {...register('pincode', {
                              required: 'Pincode is required',
                              pattern: {
                                 value: /^\d{6}$/,
                                 message: 'Enter a valid 6-digit pincode',
                              },
                           })}
                           className={`mt-2 w-full rounded-xl border px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#ffb200] focus:border-[#ffb200] ${
                              errors.pincode
                                 ? 'border-red-500'
                                 : 'border-gray-300'
                           }`}
                        />
                        {errors.pincode && (
                           <span className='text-red-500 text-xs'>
                              {errors.pincode.message}
                           </span>
                        )}
                     </div>
                  </div>
               </div>

               <div className='flex items-center gap-3'>
                  <input
                     id='agree'
                     type='checkbox'
                     {...register('agree', {
                        required: 'You must agree to the terms & conditions',
                     })}
                     className=' h-4 w-4 rounded border-gray-300 accent-[#ffb200] focus:ring-[rgba(255,178,0,0.5)]'
                  />
                  <label
                     htmlFor='agree'
                     className={`text-sm ${
                        errors.agree ? 'text-red-600' : 'text-gray-700'
                     }`}
                  >
                     I agree to the terms & conditions
                  </label>
               </div>
               {errors.agree && (
                  <span className='text-red-500 text-xs'>
                     {errors.agree.message}
                  </span>
               )}

               <div className='capitalize  pt-2 flex items-center justify-end'>
                  <button
   type="submit"
   aria-label='announcement'
   disabled={!isLoggedIn || isSubmitting}
   className={`inline-flex items-center justify-center rounded-[24px] px-5 py-2.5 text-sm font-semibold text-white
      ${!isLoggedIn ? "bg-gray-400 cursor-not-allowed" : "bg-[#FFB200] hover:brightness-95"}
      disabled:opacity-50`}
>
   {!isLoggedIn
      ? "Login Required"
      : isSubmitting
      ? "Processing..."
      : `Book Now for ₹999 + GST = ${new Intl.NumberFormat("en-IN", {
           style: "currency",
           currency: "INR",
           minimumFractionDigits: 0,
        }).format(bookingAmount)}`}
</button>

               </div>
            </form>
         </div>
      </section>
   );
};

export default BookNow;
