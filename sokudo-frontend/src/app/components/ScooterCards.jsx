import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import {
   IoBatteryChargingOutline,
   IoCarSportOutline,
   IoSpeedometerOutline,
} from 'react-icons/io5';

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

/* ---------- HELPERS ---------- */

const findSpec = (product, sectionName, keyName) => {
   try {
      const section = product.sections?.[sectionName];
      if (!section) return 'N/A';
      const spec = section.find((item) =>
         item.key?.toLowerCase().includes(keyName.toLowerCase())
      );
      return spec ? spec.value : 'N/A';
   } catch {
      return 'N/A';
   }
};

const formatPrice = (price) =>
   new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
   }).format(price);

/* ---------- COMPONENT ---------- */

const ScooterCards = () => {
   const products = useSelector((state) => state.product?.items || []);
   const router = useRouter();

   const handleNavigate = (path) => {
      router.push(path);
   };

   return (
      <section
         className='pt-12 pb-12 sm:pt-16 sm:pb-16 bg-white'
         aria-labelledby='scooter-cards-heading'
      >
         <div className='page-width mx-auto px-4 sm:px-6'>
            <h2 id='scooter-cards-heading' className='heading mb-8 text-center'>
               Sokudo Electric Scooters
            </h2>

            <div
               className='relative'
               aria-roledescription='carousel'
               aria-label='Electric scooter product cards'
            >
               <Swiper
                  modules={[Navigation, Pagination, A11y]}
                  spaceBetween={20}
                  slidesPerView={1}
                  grabCursor
                  navigation={{
                     nextEl: '.swiper-button-next-custom',
                     prevEl: '.swiper-button-prev-custom',
                  }}
                  pagination={{ clickable: true, dynamicBullets: true }}
                  breakpoints={{
                     640: { slidesPerView: 2 },
                     1024: { slidesPerView: 3 },
                  }}
                  className='
              scooter-cards-swiper pb-12
              [&_.swiper-pagination-bullet]:bg-gray-300
              [&_.swiper-pagination-bullet-active]:!bg-yellow-500
              [&_.swiper-pagination]:mt-6
              [&_.swiper-pagination]:block md:[&_.swiper-pagination]:hidden
            '
               >
                  {products.map((product) => (
                     <SwiperSlide
                        key={product._id}
                        aria-label={`${product.name} electric scooter`}
                     >
                        <div className='border border-gray-200 rounded-xl h-full flex flex-col transition-all hover:shadow-lg'>
                           {/* IMAGE */}
                           <div className='h-56 sm:h-60 w-full overflow-hidden rounded-t-xl'>
                              <img
                                 src={
                                    product?.colors?.[0]?.images?.[0] ||
                                    product?.images?.[0] ||
                                    '/no-image.png'
                                 }
                                 alt={`${product.name} electric scooter`}
                                 className='w-full h-full object-cover'
                                 draggable='false'
                                 loading='lazy'
                              />
                           </div>

                           {/* BODY */}
                           <div className='p-5 flex flex-col flex-1'>
                              <h3 className='text-lg sm:text-xl font-bold text-center'>
                                 {product.name}
                              </h3>

                              {/* KEY SPECIFICATIONS */}
                              <div className='mt-4 grid grid-cols-2 gap-3'>
                                 <div className='p-3 border border-gray-400 rounded-lg'>
                                    <IoCarSportOutline
                                       aria-hidden='true'
                                       className='text-yellow-500 mb-1'
                                    />
                                    <p className='text-xs text-gray-500'>
                                       Range
                                    </p>
                                    <p className='text-sm font-semibold'>
                                       {findSpec(
                                          product,
                                          'engineAndTransmission',
                                          'range'
                                       )}
                                    </p>
                                 </div>

                                 <div className='p-3 border border-gray-400 rounded-lg'>
                                    <IoSpeedometerOutline
                                       aria-hidden='true'
                                       className='text-yellow-500 mb-1'
                                    />
                                    <p className='text-xs text-gray-500'>
                                       Top Speed
                                    </p>
                                    <p className='text-sm font-semibold'>
                                       {findSpec(
                                          product,
                                          'electricals',
                                          'top speed'
                                       )}
                                    </p>
                                 </div>

                                 <div className='p-3 border border-gray-400 rounded-lg'>
                                    <IoBatteryChargingOutline
                                       aria-hidden='true'
                                       className='text-yellow-500 mb-1'
                                    />
                                    <p className='text-xs text-gray-500'>
                                       Battery
                                    </p>
                                    <p className='text-sm font-semibold'>
                                       {findSpec(
                                          product,
                                          'electricals',
                                          'battery'
                                       )}
                                    </p>
                                 </div>

                                 <div className='p-3 border border-gray-400 rounded-lg'>
                                    <RiArrowGoBackLine
                                       aria-hidden='true'
                                       className='text-yellow-500 mb-1'
                                    />
                                    <p className='text-xs text-gray-500'>
                                       Reverse Gear
                                    </p>
                                    <p className='text-sm font-semibold'>
                                       {findSpec(
                                          product,
                                          'engineAndTransmission',
                                          'reverse'
                                       )}
                                    </p>
                                 </div>
                              </div>

                              {/* PRICE */}
                              <div className='mt-5 mb-6' aria-live='polite'>
                                 <p className='text-xs text-gray-500'>
                                    Ex-Showroom Price
                                 </p>
                                 <p className='text-xl font-semibold text-gray-900'>
                                    {formatPrice(product.netExShowroomPrice)}
                                 </p>
                              </div>

                              {/* CTA */}
                              <button
                                 className='btn w-full mt-auto'
                                 aria-label={`Book ${product.name}`}
                                 onClick={() => handleNavigate('/our-model')}
                              >
                                 Book Now
                              </button>
                           </div>
                        </div>
                     </SwiperSlide>
                  ))}
               </Swiper>

               {/* CUSTOM NAV */}
               <button
                  aria-label='Previous scooters'
                  className='swiper-button-prev-custom hidden md:flex w-9 h-9 border-2 border-yellow-500 rounded-full text-yellow-500 absolute left-[-20px] top-1/2 -translate-y-1/2 items-center justify-center bg-white'
               >
                  <FiChevronLeft className='text-2xl' />
               </button>

               <button
                  aria-label='Next scooters'
                  className='swiper-button-next-custom hidden md:flex w-9 h-9 border-2 border-yellow-500 rounded-full text-yellow-500 absolute right-[-20px] top-1/2 -translate-y-1/2 items-center justify-center bg-white'
               >
                  <FiChevronRight className='text-2xl' />
               </button>
            </div>

            {/* FOOTER NOTE */}
            <div className='mt-6 flex flex-col md:flex-row md:justify-between gap-4 text-sm text-gray-500'>
               <p>*Prices exclude registration, insurance & road tax.</p>
               <button
                  onClick={() => handleNavigate('/our-model')}
                  aria-label='View full scooter specifications'
                  className='underline font-medium text-black hover:text-yellow-600'
               >
                  View Full Specifications
               </button>
            </div>
         </div>
      </section>
   );
};

export default ScooterCards;
