"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { submitDealershipForm } from '../features/services/Services';
import toast from 'react-hot-toast';
import { FiHeadphones } from "react-icons/fi";
import { BsGraphUpArrow } from "react-icons/bs";
import { MdOutlineLocationOn } from "react-icons/md";
import { RiBatteryChargeLine } from "react-icons/ri";
import { FaHandHoldingDollar } from "react-icons/fa6";
import SmartChoiceSection from '../components/SmartChoice';
import { useRouter } from "next/navigation";

/* Options */
const qualificationOptions = [
   'High School',
   'Diploma',
   "Bachelor's",
   "Master's",
   'Doctorate',
   'Other',
];

const businessOptions = [
   'Automobile',
   'Retail',
   'Manufacturing',
   'Services',
   'Trading',
   'Startup',
   'Other',
];

const yearsOptions = ['0–1', '2–5', '6–10', '11–15', '16+'];
const turnoverOptions = [
   'Under ₹25 Lakhs',
   '₹25 Lakhs – ₹1 Crore',
   '₹1 – ₹5 Crore',
   '₹5 – ₹10 Crore',
   '₹10 Crore+',
];

const investmentOptions = [
   '₹25 - ₹35 Lakhs',
   '₹35 - ₹50 Lakhs',
   '₹50 Lakhs - ₹1 Crore',
   '₹1 Crore+',
];

const Dealership = () => {
   const [isSubmitting, setIsSubmitting] = useState(false);
   const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const router = useRouter();

   const onSubmit = async (data) => {
      try {
         setIsSubmitting(true);
         const response = await submitDealershipForm(data);
         toast.success(response.message || 'Application submitted!');
         reset();
          const formType = "Dealership";
  const message = "Your Application has been submitted successfully. Our team will contact you shortly.";

  router.push(
    `/thankyou?formType=${encodeURIComponent(formType)}&message=${encodeURIComponent(message)}`
  );
      } catch (error) {
         toast.error(error.response?.data?.message || 'Submission failed!');
      } finally {
         setIsSubmitting(false);
      }
   };

   return (
      <div className="min-h-screen bg-white">

         {/* TOP BANNER */}
            <section
        className="relative isolate h-[420px] flex flex-col justify-center items-center text-center transition-all duration-300"
        style={{
          marginTop: "calc(var(--announcement-offset) ",
        }}
      >
                 <div
                   className="absolute inset-0 -z-10 bg-center bg-cover"
                   style={{ backgroundImage: "url('/deal.webp')" }}
                 />
                 <div className="absolute inset-0 -z-10 bg-black/40" />
                 <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.20),transparent_40%),radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.12),transparent_40%)]" />
         
                 <div className="page-width mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                   <h1 className="heading !text-white">Dealership</h1>
                 </div>
               </section>

         {/* SECTION 1 – WHY CHOOSE US */}
         <section className="page-width mx-auto px-4 py-16">
  <h2 className="text-4xl font-bold text-center mb-10">Why Choose Us</h2>

  <p className="text-center max-w-3xl mx-auto text-gray-600 mb-12">
    Join hands with <span className="text-[#FFB200] font-semibold">Sokudo Electric India</span> to start your EV dealership journey. 
    With unmatched product quality, high ROI and complete training support, 
    you can build a profitable and future-proof business.
  </p>

  <div className="grid md:grid-cols-3 gap-6">

    {/* Card 1 */}
    <div className="rounded-2xl p-8 bg-[#FFE7CC] text-center shadow">
      <FiHeadphones className="mx-auto text-5xl text-[#FF8A00] mb-4" />
      <h3 className="font-semibold text-lg">
        End-to-End Business <br /> Support & Training
      </h3>
    </div>

    {/* Card 2 */}
    <div className="rounded-2xl p-8 bg-[#D9EEFF] text-center shadow">
      <BsGraphUpArrow className="mx-auto text-5xl text-[#0077CC] mb-4" />
      <h3 className="font-semibold text-lg">
        Profitable & Future-Proof <br /> Business Model
      </h3>
    </div>

    {/* Card 3 */}
    <div className="rounded-2xl p-8 bg-[#E9D7FF] text-center shadow">
      <MdOutlineLocationOn className="mx-auto text-5xl text-[#7F3DFF] mb-4" />
      <h3 className="font-semibold text-lg">
        Nationwide Brand <br /> Recall
      </h3>
    </div>

    {/* Card 4 */}
    <div className="rounded-2xl p-8 bg-[#DBFFE8] text-center shadow">
      <RiBatteryChargeLine className="mx-auto text-5xl text-[#0FB36D] mb-4" />
      <h3 className="font-semibold text-lg">8-Year Battery Warranty</h3>
    </div>

    {/* Card 5 */}
    <div className="rounded-2xl p-8 bg-[#FFD8D8] text-center shadow">
      <FaHandHoldingDollar className="mx-auto text-5xl text-[#D73333] mb-4" />
      <h3 className="font-semibold text-lg">
        High ROI Dealership <br /> Opportunity
      </h3>
    </div>

  </div>
</section>


         {/* SECTION 2 – SMART CHOICE CIRCLE SECTION */}
        

<SmartChoiceSection/>

      


         {/* DEALERSHIP FORM (WIDTH REDUCED) */}
         <section id="dealershipForm" className="max-w-3xl mx-auto px-4 py-16">

            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
               <div className="px-6 pt-8 text-center">
                  <h1 className="text-3xl font-semibold text-gray-900">
                     Become a <span className="text-[#ffb20e]">SOKUDO</span> Dealer
                  </h1>
                  <p className="mt-1 text-sm text-gray-500">Fields marked with * are required</p>
               </div>

               {/* FORM START */}
               <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-8 space-y-6" noValidate>
                 {/* Name + Email */}
                  <div className='grid sm:grid-cols-2 gap-6'>
                     <div>
                        <label
                           htmlFor='name'
                           className={`block text-sm font-medium ${
                              errors.name ? 'text-red-500' : 'text-gray-700'
                           }`}
                        >
                           Name of the applicant{' '}
                           <span className='text-red-500'>*</span>
                        </label>
                        <input
                           id='name'
                           {...register('name', {
                              required: 'Name is required',
                           })}
                           type='text'
                           placeholder='Enter your name'
                           className={`mt-2 w-full rounded-xl border px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#ffb20e] focus:border-[#ffb20e] ${
                              errors.name ? 'border-red-500' : 'border-gray-300'
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
                           Email ID of the applicant{' '}
                           <span className='text-red-500'>*</span>
                        </label>
                        <input
                           id='email'
                           {...register('email', {
                              required: 'Email is required',
                              pattern: {
                                 value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                 message: 'Enter a valid email address',
                              },
                           })}
                           type='email'
                           placeholder='Enter your Email ID'
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
                  </div>

                  {/* Contact + Age */}
                  <div className='grid sm:grid-cols-2 gap-6'>
                     <div>
                        <label
                           htmlFor='contact'
                           className={`block text-sm font-medium ${
                              errors.contact ? 'text-red-500' : 'text-gray-700'
                           }`}
                        >
                           Applicant&apos;s Contact Number{' '}
                           <span className='text-red-500'>*</span>
                        </label>
                        <input
                           id='contact'
                           {...register('contact', {
                              required: 'Contact number is required',
                              pattern: {
                                 value: /^[0-9+\-\s()]{7,}$/,
                                 message: 'Enter a valid contact number',
                              },
                           })}
                           type='tel'
                           inputMode='tel'
                           placeholder='Enter your contact'
                           className={`mt-2 w-full rounded-xl border px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#ffb20e] focus:border-[#ffb20e] ${
                              errors.contact
                                 ? 'border-red-500'
                                 : 'border-gray-300'
                           }`}
                        />
                        {errors.contact && (
                           <span className='text-red-500 text-xs'>
                              {errors.contact.message}
                           </span>
                        )}
                     </div>
                     <div>
                        <label
                           htmlFor='age'
                           className={`block text-sm font-medium ${
                              errors.age ? 'text-red-500' : 'text-gray-700'
                           }`}
                        >
                           Applicant&apos;s Age{' '}
                           <span className='text-red-500'>*</span>
                        </label>
                        <input
                           id='age'
                           {...register('age', {
                              required: 'Age is required',
                              min: { value: 18, message: 'Minimum age is 18' },
                              max: { value: 80, message: 'Maximum age is 80' },
                           })}
                           type='number'
                           placeholder='Enter Your Age'
                           className={`mt-2 w-full rounded-xl border px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#ffb20e] focus:border-[#ffb20e] ${
                              errors.age ? 'border-red-500' : 'border-gray-300'
                           }`}
                        />
                        {errors.age && (
                           <span className='text-red-500 text-xs'>
                              {errors.age.message}
                           </span>
                        )}
                     </div>
                  </div>

                  {/* Qualification + Present Business */}
                  <div className='grid sm:grid-cols-2 gap-6'>
                     <div>
                        <label
                           htmlFor='qualification'
                           className={`block text-sm font-medium ${
                              errors.qualification
                                 ? 'text-red-500'
                                 : 'text-gray-700'
                           }`}
                        >
                           Applicant&apos;s Educational Qualification{' '}
                           <span className='text-red-500'>*</span>
                        </label>
                        <select
                           id='qualification'
                           {...register('qualification', {
                              required: 'Qualification is required',
                           })}
                           defaultValue=''
                           className={`mt-2 w-full rounded-xl border px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#ffb20e] focus:border-[#ffb20e] ${
                              errors.qualification
                                 ? 'border-red-500'
                                 : 'border-gray-300'
                           }`}
                        >
                           <option value='' disabled>
                              Enter Your Qualification
                           </option>
                           {qualificationOptions.map((q) => (
                              <option key={q}>{q}</option>
                           ))}
                        </select>
                        {errors.qualification && (
                           <span className='text-red-500 text-xs'>
                              {errors.qualification.message}
                           </span>
                        )}
                     </div>
                     <div>
                        <label
                           htmlFor='presentBusiness'
                           className={`block text-sm font-medium ${
                              errors.presentBusiness
                                 ? 'text-red-500'
                                 : 'text-gray-700'
                           }`}
                        >
                           Present Business{' '}
                           <span className='text-red-500'>*</span>
                        </label>
                        <select
                           id='presentBusiness'
                           {...register('presentBusiness', {
                              required: 'Present business is required',
                           })}
                           defaultValue=''
                           className={`mt-2 w-full rounded-xl border px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#ffb20e] focus:border-[#ffb20e] ${
                              errors.presentBusiness
                                 ? 'border-red-500'
                                 : 'border-gray-300'
                           }`}
                        >
                           <option value='' disabled>
                              Enter your present business
                           </option>
                           {businessOptions.map((b) => (
                              <option key={b}>{b}</option>
                           ))}
                        </select>
                        {errors.presentBusiness && (
                           <span className='text-red-500 text-xs'>
                              {errors.presentBusiness.message}
                           </span>
                        )}
                     </div>
                  </div>

                  {/* Address */}
                  <div>
                     <label
                        htmlFor='address'
                        className={`block text-sm font-medium ${
                           errors.address ? 'text-red-500' : 'text-gray-700'
                        }`}
                     >
                        Applicant Address{' '}
                        <span className='text-red-500'>*</span>
                     </label>
                     <textarea
                        id='address'
                        {...register('address', {
                           required: 'Address is required',
                        })}
                        rows={3}
                        placeholder='Enter your address'
                        className={`mt-2 w-full rounded-xl border px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#ffb20e] focus:border-[#ffb20e] ${
                           errors.address ? 'border-red-500' : 'border-gray-300'
                        }`}
                     />
                     {errors.address && (
                        <span className='text-red-500 text-xs'>
                           {errors.address.message}
                        </span>
                     )}
                  </div>

                  {/* Years in Business + Turnover */}
                  <div className='grid sm:grid-cols-2 gap-6'>
                     <div>
                        <label
                           htmlFor='years'
                           className={`block text-sm font-medium ${
                              errors.years ? 'text-red-500' : 'text-gray-700'
                           }`}
                        >
                           No. of Years in Business{' '}
                           <span className='text-red-500'>*</span>
                        </label>
                        <select
                           id='years'
                           {...register('years', {
                              required: 'Years in business is required',
                           })}
                           defaultValue=''
                           className={`mt-2 w-full rounded-xl border px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#ffb20e] focus:border-[#ffb20e] ${
                              errors.years
                                 ? 'border-red-500'
                                 : 'border-gray-300'
                           }`}
                        >
                           <option value='' disabled>
                              Enter years
                           </option>
                           {yearsOptions.map((y) => (
                              <option key={y}>{y}</option>
                           ))}
                        </select>
                        {errors.years && (
                           <span className='text-red-500 text-xs'>
                              {errors.years.message}
                           </span>
                        )}
                     </div>
                     <div>
                        <label
                           htmlFor='turnover'
                           className={`block text-sm font-medium ${
                              errors.turnover ? 'text-red-500' : 'text-gray-700'
                           }`}
                        >
                           Your Turnover <span className='text-red-500'>*</span>
                        </label>
                        <select
                           id='turnover'
                           {...register('turnover', {
                              required: 'Turnover is required',
                           })}
                           defaultValue=''
                           className={`mt-2 w-full rounded-xl border px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#ffb20e] focus:border-[#ffb20e] ${
                              errors.turnover
                                 ? 'border-red-500'
                                 : 'border-gray-300'
                           }`}
                        >
                           <option value='' disabled>
                              Enter your turnover
                           </option>
                           {turnoverOptions.map((t) => (
                              <option key={t}>{t}</option>
                           ))}
                        </select>
                        {errors.turnover && (
                           <span className='text-red-500 text-xs'>
                              {errors.turnover.message}
                           </span>
                        )}
                     </div>
                  </div>

                  {/* Investment Capacity */}
                  <div>
                     <label
                        htmlFor='investment'
                        className={`block text-sm font-medium ${
                           errors.investment ? 'text-red-500' : 'text-gray-700'
                        }`}
                     >
                        Investment Capacity{' '}
                        <span className='text-red-500'>*</span>
                     </label>
                     <select
                        id='investment'
                        {...register('investment', {
                           required: 'Investment capacity is required',
                        })}
                        defaultValue=''
                        className={`mt-2 w-full rounded-xl border px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#ffb20e] focus:border-[#ffb20e] ${
                           errors.investment
                              ? 'border-red-500'
                              : 'border-gray-300'
                        }`}
                     >
                        <option value='' disabled>
                           Enter your investment
                        </option>
                        {investmentOptions.map((i) => (
                           <option key={i}>{i}</option>
                        ))}
                     </select>
                     {errors.investment && (
                        <span className='text-red-500 text-xs'>
                           {errors.investment.message}
                        </span>
                     )}
                  </div>

                  {/* Comments */}
                  <div>
                     <label
                        htmlFor='comments'
                        className={`block text-sm font-medium ${
                           errors.comments ? 'text-red-500' : 'text-gray-700'
                        }`}
                     >
                        Please leave any comments or suggestions below{' '}
                        <span className='text-red-500'>*</span>
                     </label>
                     <textarea
                        id='comments'
                        {...register('comments', {
                           required: 'Comments are required',
                        })}
                        rows={5}
                        placeholder='Your Answer'
                        className={`mt-2 w-full rounded-xl border px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#ffb20e] focus:border-[#ffb20e] ${
                           errors.comments
                              ? 'border-red-500'
                              : 'border-gray-300'
                        }`}
                     />
                     {errors.comments && (
                        <span className='text-red-500 text-xs'>
                           {errors.comments.message}
                        </span>
                     )}
                  </div>

                 


                  {/* Reset + Submit */}
                  <div className="pt-2 flex justify-end gap-3">
                     <button
                        type="reset"
                        onClick={() => reset()}
                       className="flex-1 inline-flex items-center justify-center rounded-[24px] px-3 py-3 text-[13px]  font-medium text-gray-700 bg-white border border-gray-300 uppercase cursor-pointer transition-colors duration-200 hover:bg-gray-50">
                        Reset
                     </button>
                     <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 inline-flex items-center justify-center rounded-[24px] px-3 py-3 text-[13px]  font-medium text-black bg-[#ffb200] border-none uppercase cursor-pointer transition-colors duration-200 hover:bg-yellow-500"
  >
                        {isSubmitting ? 'Submitting…' : 'Submit Application'}
                     </button>
                  </div>
               </form>
            </div>
         </section>
      </div>
   );
};

export default Dealership;
