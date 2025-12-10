'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiChevronRight } from 'react-icons/fi';

const FAQPreview = () => {
   const [faqs, setFaqs] = useState([]);

   useEffect(() => {
      const fetchFAQ = async () => {
         try {
            const response = await fetch('/faq.json');
            const data = await response.json();
            setFaqs(data.slice(0, 4));
         } catch (error) {
            console.error('FAQ fetch error:', error);
         }
      };

      fetchFAQ();
   }, []);

   return (
      <section className='bg-white py-12' aria-labelledby='faq-preview-heading'>
         <div className='page-width mx-auto px-4'>
            <h2
               id='faq-preview-heading'
               className='heading text-3xl font-semibold text-center text-gray-900 mb-6'
            >
               Frequently Asked Questions
            </h2>

            <div
               className='grid md:grid-cols-2 gap-6'
               role='list'
               aria-label='Frequently asked questions preview'
            >
               {faqs.map((faq, index) => (
                  <div
                     key={index}
                     role='listitem'
                     className='p-5 bg-gray-50 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition'
                  >
                     <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                        {faq.question}
                     </h3>

                     <p className='text-gray-700 text-sm line-clamp-3'>
                        {faq.answer}
                     </p>

                     <Link
                        href='/faq'
                        aria-label={`Read more about: ${faq.question}`}
                        className='text-yellow-600 font-medium text-sm flex items-center mt-2'
                     >
                        Read More
                        <FiChevronRight className='ml-1' aria-hidden='true' />
                     </Link>
                  </div>
               ))}
            </div>

            <div className='text-center mt-8'>
               <Link
                  href='/faq'
                  aria-label='View all frequently asked questions'
                  className='px-6 py-3 btn'
               >
                  View All FAQs
               </Link>
            </div>
         </div>
      </section>
   );
};

export default FAQPreview;
