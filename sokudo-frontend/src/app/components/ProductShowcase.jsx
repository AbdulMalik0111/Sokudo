import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import { FaCheck } from 'react-icons/fa';

const products = [
   {
      name: 'Acute 2.2',
      images: {
         '#0047AB': ['/red.png', '/red.png'],
         '#E10600': ['/red.png', '/red.png', '/red.png'],
         '#F7E600': ['/red.png', '/red.png', '/red.png'],
         '#000': ['/red.png', '/red.png', '/red.png'],
      },
      specs: { range: '150 km', battery: '2.2 kWh', charging: '4 h – 5 h' },
      colors: ['#0047AB', '#E10600', '#F7E600', '#000'],
      price: '₹ 1 899/month',
      oneTime: '₹ 91 899*',
   },
   {
      name: 'Select 2.2',
      images: {
         '#0047AB': ['/red.png', '/red.png'],
         '#E10600': ['/red.png', '/red.png', '/red.png'],
         '#F7E600': ['/red.png', '/red.png', '/red.png'],
         '#000': ['/red.png', '/red.png', '/red.png'],
      },
      specs: { range: '160 km', battery: '2.5 kWh', charging: '4 h – 5 h' },
      colors: ['#0047AB', '#E10600', '#F7E600', '#000'],
      price: '₹ 2 099/month',
      oneTime: '₹ 99 899*',
   },
   {
      name: 'Acute',
      images: {
         '#0047AB': ['/red.png', '/red.png'],
         '#E10600': ['/red.png', '/red.png', '/red.png'],
         '#F7E600': ['/red.png', '/red.png', '/red.png'],
         '#000': ['/red.png', '/red.png', '/red.png'],
      },
      specs: { range: '140 km', battery: '2.0 kWh', charging: '4 h – 5 h' },
      colors: ['#0047AB', '#E10600', '#F7E600', '#000'],
      price: '₹ 1 699/month',
      oneTime: '₹ 85 899*',
   },
];

const colorBtnStyles = [
   {
      background: 'linear-gradient(#0047AB 50%, #fff 50%)',
      border: '1px solid #000',
   },
   {
      background: 'linear-gradient(#E10600 50%, #fff 50%)',
      border: '1px solid #000',
   },
   {
      background: 'linear-gradient(#F7E600 50%, #fff 50%)',
      border: '1px solid #000',
   },
   {
      background: '#000',
      border: '1px solid #000',
   },
];

const ProductShowcase = () => {
   const [mainIndex, setMainIndex] = useState(0);
   const [colorIndexes, setColorIndexes] = useState(products.map(() => 0));
   const [imageIndexes, setImageIndexes] = useState(products.map(() => 0));
   const swiperRef = useRef(null);

   const handleColorSelect = (cardIdx, colorIdx) => {
      setColorIndexes((prev) =>
         prev.map((val, idx) => (idx === cardIdx ? colorIdx : val))
      );
      setImageIndexes((prev) =>
         prev.map((val, idx) => (idx === cardIdx ? 0 : val))
      );
   };

   return (
      <section className='bg-white py-16 px-2 md:px-0 relative'>
         {/* Use public path for SVG background image */}
         <Image
            src='/right-side.svg'
            alt='rightSide img'
            className='absolute right-0 z-9 h-4/5 top-1/2 -translate-y-1/2'
            width={300}
            height={600}
            style={{ objectFit: 'contain' }}
         />
         <div className='max-w-7xl mx-auto'>
            <h2 className='heading text-center mb-8'>
               Reinventing mobility solutions, with our new variants
            </h2>
            {/* Tabs */}
            <div className='flex justify-center gap-0 mb-6'>
               {products.map((p, idx) => (
                  <button
                     key={p.name}
                     aria-label='Products'
                     onClick={() => {
                        swiperRef.current.slideTo(idx);
                     }}
                     className={`relative pb-2 text-lg font-medium border-b-2 ${
                        mainIndex === idx
                           ? 'border-black border-b-3 text-black'
                           : 'border-[#666] text-[#666]'
                     }`}
                     style={{ minWidth: 120 }}
                  >
                     {p.name}
                  </button>
               ))}
            </div>
            {/* Main Card Swiper */}
            <div className='relative flex items-center justify-center'>
               {/* Main arrows */}
               <button
                  onClick={() => swiperRef.current.slidePrev()}
                  aria-label='Previous'
                  className='absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full border border-black'
               >
                  <span className='text-xl'>&#60;</span>
               </button>
               <Swiper
                  slidesPerView={1.2}
                  centeredSlides={true}
                  onSlideChange={(swiper) => setMainIndex(swiper.activeIndex)}
                  onSwiper={(swiper) => (swiperRef.current = swiper)}
                  spaceBetween={32}
                  modules={[Navigation]}
               >
                  {products.map((product, cardIdx) => {
                     const color = product.colors[colorIndexes[cardIdx]];
                     const images = product.images[color];
                     const imgIdx = imageIndexes[cardIdx];
                     return (
                        <SwiperSlide key={product.name}>
                           <div
                              className='px-6 py-8 relative transition-all duration-300'
                              style={{
                                 background:
                                    'linear-gradient(179.54deg, rgba(81, 66, 255, 0.11) 0.26%, #FFFFFF 23.66%)',
                                 border: '1px solid #E8E8E8',
                                 borderRadius: '15px',
                              }}
                           >
                              {/* Image slider with dots and arrows */}
                              <div className='flex flex-col items-center'>
                                 <img
                                    src={images[imgIdx]}
                                    alt={product.name}
                                    className='mx-auto h-[320px] md:h-[360px] object-contain'
                                 />
                                 {/* Dots and arrows container */}
                                 <div className='flex items-center justify-center mt-4 bg-white rounded-full border border-gray-400 px-4 py-2 gap-2'>
                                    <button
                                       aria-label='Previous image'
                                       onClick={() => {
                                          setImageIndexes((prev) =>
                                             prev.map((val, idx) =>
                                                idx === cardIdx
                                                   ? val === 0
                                                      ? images.length - 1
                                                      : val - 1
                                                   : val
                                             )
                                          );
                                       }}
                                       className='w-6 h-6 flex items-center justify-center'
                                    >
                                       <span className='text-lg'>&#60;</span>
                                    </button>
                                    {images.map((_, idx) => (
                                       <button
                                          key={idx}
                                          aria-label='Select image'
                                          onClick={() =>
                                             setImageIndexes((prev) =>
                                                prev.map((val, i) =>
                                                   i === cardIdx ? idx : val
                                                )
                                             )
                                          }
                                          className={`w-4 h-4 rounded-full mx-1 ${
                                             imgIdx === idx
                                                ? 'bg-black'
                                                : 'bg-gray-300'
                                          }`}
                                       />
                                    ))}
                                    <button
                                       aria-label='Next image'
                                       onClick={() => {
                                          setImageIndexes((prev) =>
                                             prev.map((val, idx) =>
                                                idx === cardIdx
                                                   ? val === images.length - 1
                                                      ? 0
                                                      : val + 1
                                                   : val
                                             )
                                          );
                                       }}
                                       className='w-6 h-6 flex items-center justify-center'
                                    >
                                       <span className='text-lg'>&#62;</span>
                                    </button>
                                 </div>
                              </div>
                              {/* Product Name with border above and below */}
                              <div className='flex flex-col items-center my-6'>
                                 <div className='w-full flex items-center'>
                                    <div className='flex-1 border-t border-[#E8E8E8] mx-2'></div>
                                    <span className='text-xl font-bold px-4'>
                                       {product.name}
                                    </span>
                                    <div className='flex-1 border-t border-[#E8E8E8] mx-2'></div>
                                 </div>
                              </div>
                              {/* Specs & Colors */}
                              <div className='flex flex-col md:flex-row justify-between items-center gap-6 mb-6'>
                                 <div className='flex items-center'>
                                    <div className='pr-4'>
                                       <p className='text-xs text-gray-500'>
                                          IDC Range
                                       </p>
                                       <p className='font-medium'>
                                          {product.specs.range}
                                       </p>
                                    </div>
                                    <div className='h-10 border-r border-gray-300'></div>
                                    <div className='px-4'>
                                       <p className='text-xs text-gray-500'>
                                          Battery
                                       </p>
                                       <p className='font-medium'>
                                          {product.specs.battery}
                                       </p>
                                    </div>
                                    <div className='h-10 border-r border-gray-300'></div>
                                    <div className='pl-4'>
                                       <p className='text-xs text-gray-500'>
                                          0–100% Charging
                                       </p>
                                       <p className='font-medium'>
                                          {product.specs.charging}
                                       </p>
                                    </div>
                                 </div>
                                 {/* Colors */}
                                 <div className='flex gap-3 items-center'>
                                    {product.colors.map((color, idx) => (
                                       <button
                                          key={color}
                                          onClick={() =>
                                             handleColorSelect(cardIdx, idx)
                                          }
                                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                             colorIndexes[cardIdx] === idx
                                                ? 'border-black border-2'
                                                : 'border-gray-300 border-2'
                                          }`}
                                          style={colorBtnStyles[idx]}
                                          aria-label={`Select color ${color}`}
                                       >
                                          {colorIndexes[cardIdx] === idx && (
                                             <span className='text-black text-lg'>
                                                <FaCheck />
                                             </span>
                                          )}
                                       </button>
                                    ))}
                                 </div>
                              </div>
                              {/* Price & Buttons with border above */}
                              <div className='flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-[#E8E8E8]'>
                                 <div>
                                    <p className='text-xs text-gray-500'>
                                       Starting From
                                    </p>
                                    <p className='font-bold text-lg'>
                                       {product.price}{' '}
                                       <span className='text-sm ml-4 text-gray-500'>
                                          or {product.oneTime}{' '}
                                       </span>
                                    </p>
                                 </div>
                                 <div className='flex gap-4'>
                                    <button
                                       aria-label='Compare'
                                       className='px-6 py-2 border-1 border-[#FFB200] rounded text-black font-medium hover:bg-[#FFB200] hover:text-white transition'
                                    >
                                       Compare
                                    </button>
                                    <button
                                       aria-label='Explore'
                                       className='btn'
                                    >
                                       Explore
                                    </button>
                                 </div>
                              </div>
                           </div>
                        </SwiperSlide>
                     );
                  })}
               </Swiper>
               {/* Main arrows */}
               <button
                  onClick={() => swiperRef.current.slideNext()}
                  aria-label='Next'
                  className='absolute right-[-40px] top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full border border-black'
               >
                  <span className='text-xl'>&#62;</span>
               </button>
            </div>
         </div>
      </section>
   );
};

export default ProductShowcase;
