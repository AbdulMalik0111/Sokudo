"use client"
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { submitContactForm } from '../features/services/Services';
import LocationFinder from '../components/LocationFinder';
import { useRouter } from "next/navigation";


const Contact = () => {
   const [isSubmitting, setIsSubmitting] = useState(false);
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm();
    const router = useRouter();

   const onSubmit = async (data) => {
      try {
         setIsSubmitting(true);
         const response = await submitContactForm(data);
      

         toast.success(response.message || 'Message sent successfully!');
         reset();
         const formType = "Contact";
  const message = "Your Application has been submitted successfully. Our team will contact you shortly.";

  router.push(
    `/thankyou?formType=${encodeURIComponent(formType)}&message=${encodeURIComponent(message)}`
  );
          
      } catch (error) {
         console.error('Contact form error:', error);
         if (error.response?.status === 429) {
            toast.error('Too many requests. Please try again later.');
         } else if (error.response?.status === 400) {
            toast.error(error.response.data.message || 'Invalid form data');
         } else if (!navigator.onLine) {
            toast.error(
               'No internet connection. Please try again when online.'
            );
         } else {
            toast.error(
               error.response?.data?.message ||
                  'Failed to send message. Please try again.'
            );
         }
      } finally {
         setIsSubmitting(false);
      }
   };
   return (
      <div className='min-h-screen bg-white text-gray-900'>
         {/* Top Banner (like Media) */}
            <section
        className="relative isolate h-[420px] flex flex-col justify-center items-center text-center transition-all duration-300"
        style={{
          marginTop: "calc(var(--announcement-offset) ",
        }}
      >
                 <div
                   className="absolute inset-0 -z-10 bg-center bg-cover"
                   style={{ backgroundImage: 'url("/contact.webp")' }}
                 />
                 <div className="absolute inset-0 -z-10 bg-black/40" />
                 <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.20),transparent_40%),radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.12),transparent_40%)]" />
         
                 <div className="page-width mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                   <h1 className="heading !text-white">Contact Us</h1>
                 </div>
               </section>

         {/* Content */}
         <section className='py-10 !pb-0 sm:py-12'>
            <div className='page-width mx-auto px-4 sm:px-6 lg:px-8'>
               <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                  {/* Details (left) */}
                  <aside className='lg:col-span-1 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm'>
                     <h2 className='text-2xl font-semibold'>Sokudo India</h2>
                     <p className='mt-4 text-gray-700'>
                        518 Bisrakh Jalalpur, Infront of Gaur Mulberry Mansion,
                        Sector 1 Greater Noida, Pin Code - 201306, Uttar
                        Pradesh.
                     </p>

                     <div className='mt-6 space-y-3 text-gray-800'>
                        <p>
                           <span className='font-medium'>Email: </span>
                           <a
                              className='text-gray-900 underline decoration-yellow-400 underline-offset-4 hover:text-gray-700'
                              href='mailto:sokudoelectricindia@gmail.com'
                           >
                              sokudoelectricindia@gmail.com
                           </a>
                        </p>
                        <p>
                           <span className='font-medium'>Phone: </span>
                           <a
                              className='text-gray-900 underline decoration-yellow-400 underline-offset-4 hover:text-gray-700'
                              href='tel:+918920649555'
                           >
                              +91-8920649555
                           </a>
                        </p>
                     </div>

                     {/* Socials */}
                     <div className='mt-6'>
                        <p className='text-sm font-medium text-gray-600'>
                           Follow us
                        </p>
                        <div className='mt-3 flex items-center gap-3'>
                           <a
                              href='https://www.facebook.com/profile.php?id=100086849227450'
                              target='_blank'
                              rel='noreferrer'
                              aria-label='facebook'
                              className='inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50'
                           >
                              <FaFacebook className='h-5 w-5 text-[#1877F2]' />
                           </a>
                           <a
                              href='https://twitter.com/sokudoindia'
                              target='_blank'
                              rel='noreferrer'
                               aria-label='twitter'
                              className='inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50'
                           >
                              <FaTwitter className='h-5 w-5 text-[#1DA1F2]' />
                           </a>
                           <a
                              href='https://www.instagram.com/sokudoindia/'
                              target='_blank'
                              rel='noreferrer'
                               aria-label='instagram'
                              className='inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50'
                           >
                              <FaInstagram className='h-5 w-5 text-[#E4405F]' />
                           </a>
                           <a
                              href='https://www.youtube.com/channel/UCPEtmoVgyfDBi4np3CUuvvA'
                              target='_blank'
                              rel='noreferrer'
                               aria-label='youtube'
                              className='inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50'
                           >
                              <FaYoutube className='h-5 w-5 text-[#FF0000]' />
                           </a>
                        </div>
                     </div>
                  </aside>

                  {/* Form (right) */}
                  <div className='lg:col-span-2 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm'>
                     <h2 className='text-2xl font-semibold'>Contact Us</h2>

                     <form
                        className='mt-6 grid grid-cols-1 gap-5'
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                     >
                        {/* Name */}
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
                              aria-invalid={!!errors.name}
                              {...register('name', {
                                 required: 'Name is required',
                                 minLength: {
                                    value: 2,
                                    message: 'Min 2 characters',
                                 },
                              })}
                              placeholder='Enter your Name'
                              className={`mt-2 w-full rounded-xl border px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#ffb20e] focus:border-[#ffb20e] ${
                                 errors.name
                                    ? 'border-red-500'
                                    : 'border-gray-300'
                              }`}
                           />
                           {errors.name && (
                              <span className='text-red-500 text-xs'>
                                 {errors.name.message}
                              </span>
                           )}
                        </div>

                        {/* Email + Phone */}
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                           <div>
                              <label
                                 htmlFor='email'
                                 className={`block text-sm font-medium ${
                                    errors.email
                                       ? 'text-red-500'
                                       : 'text-gray-700'
                                 }`}
                              >
                                 Email <span className='text-red-500'>*</span>
                              </label>
                              <input
                                 id='email'
                                 type='email'
                                 aria-invalid={!!errors.email}
                                 {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                       value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                       message: 'Enter a valid email address',
                                    },
                                 })}
                                 placeholder='Enter your Email'
                                 className={`mt-2 w-full rounded-xl border px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#ffb20e] focus:border-[#ffb20e] ${
                                    errors.email
                                       ? 'border-red-500'
                                       : 'border-gray-300'
                                 }`}
                              />
                              {errors.email && (
                                 <span className='text-red-500 text-xs'>
                                    {errors.email.message}
                                 </span>
                              )}
                           </div>
                           <div>
                              <label
                                 htmlFor='phone'
                                 className={`block text-sm font-medium ${
                                    errors.phone
                                       ? 'text-red-500'
                                       : 'text-gray-700'
                                 }`}
                              >
                                 Phone <span className='text-red-500'>*</span>
                              </label>
                              <input
                                 id='phone'
                                 type='tel'
                                 inputMode='numeric'
                                 maxLength={10}
                                 aria-invalid={!!errors.phone}
                                 onInput={(e) => {
                                    e.currentTarget.value =
                                       e.currentTarget.value
                                          .replace(/\D/g, '')
                                          .slice(0, 10);
                                 }}
                                 {...register('phone', {
                                    required: 'Phone is required',
                                    pattern: {
                                       value: /^\d{10}$/,
                                       message: 'Enter 10-digit phone number',
                                    },
                                 })}
                                 placeholder='Enter your Phone'
                                 className={`mt-2 w-full rounded-xl border px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#ffb20e] focus:border-[#ffb20e] ${
                                    errors.phone
                                       ? 'border-red-500'
                                       : 'border-gray-300'
                                 }`}
                              />
                              {errors.phone && (
                                 <span className='text-red-500 text-xs'>
                                    {errors.phone.message}
                                 </span>
                              )}
                           </div>
                        </div>

                        {/* Message */}
                        <div>
                           <label
                              htmlFor='message'
                              className={`block text-sm font-medium ${
                                 errors.message
                                    ? 'text-red-500'
                                    : 'text-gray-700'
                              }`}
                           >
                              Message <span className='text-red-500'>*</span>
                           </label>
                           <textarea
                              id='message'
                              rows={5}
                              aria-invalid={!!errors.message}
                              {...register('message', {
                                 required: 'Message is required',
                              })}
                              placeholder='Enter your message'
                              className={`mt-2 w-full rounded-xl border px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#ffb20e] focus:border-[#ffb20e] ${
                                 errors.message
                                    ? 'border-red-500'
                                    : 'border-gray-300'
                              }`}
                           />
                           {errors.message && (
                              <span className='text-red-500 text-xs'>
                                 {errors.message.message}
                              </span>
                           )}
                        </div>

                        {/* Actions (career button color) */}
                        <div className='pt-2 flex items-center justify-end gap-3'>
                           <button
                              type='reset'
                              className='capitalize font-semibold inline-flex items-center justify-center rounded-[24px] border border-gray-300 px-10 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50'
                              onClick={() => reset()}
                           >
                              RESET
                           </button>
                           <button
                              type='submit'
                              disabled={isSubmitting}
                              className='btn inline-flex items-center justify-center rounded-xl bg-[#ffb20e] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#e0a10d] disabled:opacity-70'
                           >
                              {isSubmitting ? 'Sending...' : 'Send Message'}
                           </button>
                        </div>
                     </form>
                  </div>
               </div>
            </div>

            {/* Map (full width, shorter height) */}
            <div className='mt-10'>
              <LocationFinder />
            </div>
         </section>
      </div>
   );
};

export default Contact;
