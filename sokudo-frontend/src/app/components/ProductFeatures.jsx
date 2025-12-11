import React, { useState } from 'react';
import Image from 'next/image';

const Tab1 = '/one.webp';
const Tab2 = '/productImg/four.webp';
const Tab3 = '/productImg/three.webp';
const Tab4 = '/productImg/two.webp';
const Tab5 = '/productImg/eighth.webp';
const Tab6 = '/productImg/DSC_9179.jpg';

const d1 = '/design/Design.webp';
const d2 = '/bseat.webp';
const d3 = '/battery.png';
const p1 = '/p1.webp';
const p2 = '/p2.webp';
const p4 = '/p4.webp';

const ProductFeatures = () => {
   const [activeTab, setActiveTab] = useState('Design');

   const designImages = [d1, p1, Tab4, Tab2, Tab5];
   const performanceImages = [p2, Tab3, p4, Tab6, d1];

   const mobileRender = () => {
      let imgs = [];
      if (activeTab === 'Design') imgs = designImages;
      if (activeTab === 'Performance') imgs = performanceImages;

      return (
         <div className='grid grid-cols-2 gap-2 md:hidden' aria-live='polite'>
            {imgs.map((src, i) => (
               <div
                  key={i}
                  className={`overflow-hidden rounded-lg ${
                     i === 0 ? 'col-span-2' : ''
                  }`}
               >
                  <Image
                     src={src}
                     alt={`${activeTab} feature image ${i + 1}`}
                     width={800}
                     height={600}
                     className='w-full h-full object-cover aspect-[4/3]'
                     loading='lazy'
                  />
               </div>
            ))}
         </div>
      );
   };

   const desktopRender = () => {
      switch (activeTab) {
         case 'Design':
            return (
               <div className='hidden md:grid grid-cols-3 grid-rows-2 gap-4 h-[600px]'>
                  <div className='relative rounded-lg overflow-hidden'>
                     <Image
                        src={d1}
                        alt='Iconic scooter design and headlamp'
                        fill
                        className='object-cover'
                     />
                     <div className='absolute inset-0 z-10 p-6 bg-gradient-to-b from-black/50 via-transparent to-transparent'>
                        <h3 className='text-white text-2xl font-bold'>
                           Iconic Headle
                        </h3>
                        <p className='text-white/80 text-sm mt-1'>
                           Like the moon, but better.
                        </p>
                     </div>
                  </div>

                  <div className='row-span-2 relative rounded-lg overflow-hidden'>
                     <Image
                        src={p1}
                        alt='Digital display of electric scooter'
                        fill
                        className='object-cover'
                     />
                  </div>

                  <div className='relative rounded-lg overflow-hidden'>
                     <Image
                        src={d3}
                        alt='High capacity scooter battery'
                        fill
                        className='object-cover'
                     />
                     <div className='absolute inset-0 z-10 p-6 bg-gradient-to-b from-black/50 via-transparent to-transparent'>
                        <h3 className='text-white text-2xl font-bold'>
                           Battery
                        </h3>
                        <p className='text-white/80 text-sm mt-1 max-w-xs'>
                           Long-lasting power. Efficient, reliable and built for
                           extended adventures.
                        </p>
                     </div>
                  </div>

                  <div className='relative rounded-lg overflow-hidden'>
                     <Image
                        src={Tab2}
                        alt='High torque electric motor'
                        fill
                        className='object-cover'
                     />
                     <div className='absolute inset-0 z-10 p-6 bg-gradient-to-b from-black/50 via-transparent to-transparent'>
                        <h3 className='text-white text-2xl font-bold'>Motor</h3>
                        <p className='text-white/80 text-sm mt-1 max-w-xs'>
                           Silent power, maximum torque. Thrilling performance
                           in every ride.
                        </p>
                     </div>
                  </div>

                  <div className='relative rounded-lg overflow-hidden'>
                     <Image
                        src={Tab5}
                        alt='Durable tyres with superior grip'
                        fill
                        className='object-cover'
                     />
                     <div className='absolute inset-0 z-10 p-6 bg-gradient-to-b from-black/50 via-transparent to-transparent'>
                        <h3 className='text-white text-2xl font-bold'>Tyre</h3>
                        <p className='text-white/80 text-sm mt-1 max-w-xs'>
                           Superior grip for every terrain. Durable, reliable,
                           and built for smooth rides.
                        </p>
                     </div>
                  </div>
               </div>
            );

         case 'Performance':
            return (
               <div className='hidden md:grid grid-cols-3 grid-rows-2 gap-4 h-[600px]'>
                  <div className='relative rounded-lg overflow-hidden'>
                     <Image
                        src={p2}
                        alt='Electric scooter acceleration'
                        fill
                        className='object-cover'
                     />
                  </div>

                  <div className='row-span-2 relative rounded-lg overflow-hidden'>
                     <Image
                        src={Tab3}
                        alt='Advanced performance display'
                        fill
                        className='object-cover'
                     />
                  </div>

                  <div className='relative rounded-lg overflow-hidden'>
                     <Image
                        src={d2}
                        alt='Comfortable scooter back seat'
                        fill
                        className='object-cover'
                     />
                  </div>

                  <div className='relative rounded-lg overflow-hidden'>
                     <Image
                        src={Tab6}
                        alt='Powerful drivetrain'
                        fill
                        className='object-cover'
                     />
                  </div>

                  <div className='relative rounded-lg overflow-hidden'>
                     <Image
                        src={p4}
                        alt='Performance components'
                        fill
                        className='object-contain'
                     />
                  </div>
               </div>
            );

         default:
            return null;
      }
   };

   return (
      <section
         aria-labelledby='product-features-heading'
         className='relative py-12 sm:py-16 px-4'
         style={{
            background:
               'linear-gradient(104.73deg, #579BD9 0%, #001A2C 60.41%)',
         }}
      >
         <div className='max-w-7xl mx-auto'>
            <div className='flex justify-center mb-10'>
               <div className='flex overflow-x-auto gap-2 border-b border-white/30 px-2'>
                  {['Design', 'Performance'].map((tab) => (
                     <button
                        key={tab}
                        role='tab'
                        aria-selected={activeTab === tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-5 md:px-6 py-2 md:py-3 text-white font-medium relative ${
                           activeTab === tab
                              ? 'opacity-100'
                              : 'opacity-60 hover:opacity-80'
                        }`}
                     >
                        {tab}
                        {activeTab === tab && (
                           <span className='absolute bottom-0 left-0 w-full h-[2px] bg-white'></span>
                        )}
                     </button>
                  ))}
               </div>
            </div>

            <div className='text-center mb-10'>
               <h2
                  id='product-features-heading'
                  className='text-4xl text-white font-bold mb-4'
               >
                  Smart Style. Practical Design. Unmatched Build.
               </h2>
               <p className='text-white/80 max-w-3xl mx-auto'>
                  We are the best electric two wheeler manufacturer in India who
                  focus on performance and style.
               </p>
            </div>

            {mobileRender()}
            {desktopRender()}
         </div>
      </section>
   );
};

export default ProductFeatures;
