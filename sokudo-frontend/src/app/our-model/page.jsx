'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Modal from 'react-modal';
import toast from 'react-hot-toast';
import BookNow from '../components/BookNow';
import { RiArrowGoBackLine } from 'react-icons/ri';

import {
   IoClose,
   IoBatteryChargingOutline,
   IoCarSportOutline,
   IoSpeedometerOutline,
} from 'react-icons/io5';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const findSpec = (product, sectionName, keyName) => {
   try {
      const section = product.sections[sectionName];
      if (!section) return 'N/A';
      const spec = section.find((item) =>
         item.key.toLowerCase().includes(keyName.toLowerCase())
      );
      return spec ? spec.value : 'N/A';
   } catch (error) {
      console.error('Error finding spec:', error);
      return 'N/A';
   }
};

const formatPrice = (price) => {
   return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
   }).format(price);
};

const COLOR_MAP = {
   Red: '#FF0000',
   Blue: '#0066FF',
   Black: '#000000',
   White: '#FFFFFF',
   Grey: '#808080',
   Yellow: '#FFD500',
   Green: '#00A651',
   Orange: '#FF7A00',
};

const KeySpecItem = ({ icon: Icon, label, value }) => (
   <div className='flex items-center gap-2'>
      <Icon className='text-[#ffb200]' size={18} />
      <div>
         <p className='text-xs text-gray-500'>{label}</p>
         <p className='text-sm font-semibold text-gray-800'>{value}</p>
      </div>
   </div>
);

const ProductCard = ({ product, onBookNowClick }) => {
   const router = useRouter();

   const [activeColor, setActiveColor] = useState(product.colors?.[0] || null);

   const activeImages = activeColor?.images?.length
      ? activeColor.images
      : product.images;

   const keySpecs = {
      range: findSpec(product, 'engineAndTransmission', 'range'),
      topSpeed: findSpec(product, 'electricals', 'top speed'),
      battery: findSpec(product, 'electricals', 'battery'),
      reverse: findSpec(product, 'engineAndTransmission', 'reverse'),
   };

   return (
      <div className='rounded-2xl border border-gray-200 bg-white overflow-hidden flex flex-col group shadow-sm transition-shadow duration-300'>
         {/* Swiper */}
         <div className='relative bg-gray-50 h-64'>
            <Swiper
               modules={[Navigation]}
               navigation={false}
               onInit={(swiper) => {
                  swiper.params.navigation.prevEl = `.prev-${product._id}`;
                  swiper.params.navigation.nextEl = `.next-${product._id}`;
                  swiper.navigation.init();
                  swiper.navigation.update();
               }}
               slidesPerView={1}
            >
               {activeImages?.map((img, idx) => (
                  <SwiperSlide key={idx}>
                     <img
                        src={img}
                        className='w-full h-64 object-contain'
                        alt={`${product.name}-${idx}`}
                     />
                  </SwiperSlide>
               ))}
            </Swiper>

            {activeImages?.length > 1 && (
               <>
                  <button
                     aria-label='product'
                     className={`prev-${product._id} absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 opacity-0 group-hover:opacity-100 z-20`}
                  >
                     <svg width='24' height='24'>
                        <path
                           d='M15 19l-7-7 7-7'
                           strokeWidth='2'
                           stroke='black'
                        />
                     </svg>
                  </button>

                  <button
                     aria-label='next'
                     className={`next-${product._id} absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 opacity-0 group-hover:opacity-100 z-20`}
                  >
                     <svg width='24' height='24'>
                        <path d='M9 5l7 7-7 7' strokeWidth='2' stroke='black' />
                     </svg>
                  </button>
               </>
            )}
         </div>

         {/* Card Body */}
         <div className='p-5 flex flex-col flex-1'>
            <h3 className='text-xl font-semibold text-gray-900'>
               {product.name}
            </h3>

            {/* Colors */}
            {product.colors?.length > 0 && (
               <div className='flex items-center gap-2 mt-3 mb-3'>
                  {product.colors.map((col, i) => {
                     const hex = COLOR_MAP[col.name] || '#999';
                     return (
                        <button
                           key={i}
                           style={{ backgroundColor: hex }}
                           onClick={() => setActiveColor(col)}
                           title={col.name}
                           className={`h-4 w-4 rounded-full ${
                              activeColor?.name === col.name
                                 ? 'ring-2 ring-black'
                                 : 'border border-gray-400'
                           }`}
                        />
                     );
                  })}
               </div>
            )}

            {/* Key Specs */}
            <div className='mt-4 grid grid-cols-2 gap-4'>
               <div className='p-3 bg-white border border-gray-200 rounded-lg'>
                  <KeySpecItem
                     icon={IoCarSportOutline}
                     label='Range'
                     value={keySpecs.range}
                  />
               </div>
               <div className='p-3 bg-white border border-gray-200 rounded-lg'>
                  <KeySpecItem
                     icon={IoSpeedometerOutline}
                     label='Top Speed'
                     value={keySpecs.topSpeed}
                  />
               </div>
               <div className='p-3 bg-white border border-gray-200 rounded-lg'>
                  <KeySpecItem
                     icon={IoBatteryChargingOutline}
                     label='Battery'
                     value={keySpecs.battery}
                  />
               </div>
               <div className='p-3 bg-white border border-gray-200 rounded-lg'>
                  <KeySpecItem
                     icon={RiArrowGoBackLine}
                     label='Reverse Gear'
                     value={keySpecs.reverse}
                  />
               </div>
            </div>

            {/* Price */}
            <div className='mt-4 mb-4'>
               <span className='text-gray-500 text-sm'>Ex-Showroom Price</span>
               <p className='text-2xl font-semibold text-gray-900'>
                  {formatPrice(product.netExShowroomPrice)}
               </p>
            </div>

            {/* Buttons */}
            <div className='mt-auto border-t border-gray-200 pt-5 flex gap-3'>
               <button
                  onClick={() => router.push(`/product/${product._id}`)}
                  className='flex-1 text-center rounded-[24px] px-3 py-3 text-[13px] font-medium bg-white border border-gray-300 hover:bg-gray-100'
               >
                  VIEW DETAILS
               </button>

               <button
                  onClick={() => onBookNowClick(product)}
                  className='flex-1 text-center rounded-[24px] px-3 py-3 text-[13px] font-medium bg-[#ffb200] hover:bg-yellow-500'
               >
                  BOOK NOW
               </button>
            </div>
         </div>
      </div>
   );
};

const DEFAULT_COLORS = ['Red', 'Blue', 'Black', 'White', 'Grey', 'Yellow'];
const DEFAULT_MODELS = ['Sokudo Plus', 'Sokudo Ultra', 'Sokudo X'];
const DEFAULT_STATES = [
   'Delhi',
   'Maharashtra',
   'Karnataka',
   'Tamil Nadu',
   'Uttar Pradesh',
   'Rajasthan',
   'Gujarat',
   'West Bengal',
];
const DEFAULT_CITIES = {
   Delhi: ['New Delhi', 'Dwarka', 'Rohini'],
   Maharashtra: ['Mumbai', 'Pune', 'Nagpur'],
   Karnataka: ['Bengaluru', 'Mysuru', 'Mangaluru'],
   'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai'],
   'Uttar Pradesh': ['Lucknow', 'Noida', 'Kanpur'],
   Rajasthan: ['Jaipur', 'Udaipur', 'Jodhpur'],
   Gujarat: ['Ahmedabad', 'Surat', 'Vadodara'],
   'West Bengal': ['Kolkata', 'Howrah', 'Durgapur'],
};

const OurModals = () => {
   const [query, setQuery] = useState('');
   const [isBookModalOpen, setIsBookModalOpen] = useState(false);
   const [selectedProduct, setSelectedProduct] = useState(null);

   const { userInfo, isLoggedIn } = useSelector((state) => state.user);
   const products = useSelector((state) => state.product?.items || []);

   useEffect(() => {
      //   Modal.setAppElement('#root');
   }, []);

   const filteredProducts = useMemo(() => {
      if (!Array.isArray(products)) return [];
      const q = query.trim().toLowerCase();
      if (!q) return products;
      return products.filter((p) => p.name?.toLowerCase().includes(q));
   }, [query, products]);

   const userDefaults = useMemo(() => {
      if (isLoggedIn && userInfo) {
         return {
            name: userInfo.name || '',
            email: userInfo.email || '',
            contact: userInfo.contactNumber || userInfo.phone || '',
         };
      }
      return {};
   }, [isLoggedIn, userInfo]);

   const bookingDefaults = useMemo(() => {
      if (!selectedProduct) return userDefaults;
      return {
         ...userDefaults,
         model: selectedProduct.name,
         color: '',
      };
   }, [selectedProduct, userDefaults]);

   const bookingAmount = useMemo(() => {
      if (!selectedProduct) return 0;

      const onRoadPrice =
         selectedProduct.onRoadePrice ||
         selectedProduct.onRoadPrice ||
         selectedProduct.netExShowroomPrice ||
         0;

      const gst = Math.round(onRoadPrice * 0.05); // ✅ 5% GST
      return 999 + gst; // ✅ FINAL BOOKING AMOUNT
   }, [selectedProduct]);

   const openBookModal = (product) => {
      setSelectedProduct(product);
      setIsBookModalOpen(true);
   };

   const closeBookModal = () => {
      setIsBookModalOpen(false);
      setSelectedProduct(null);
   };

   return (
      <div className='min-h-screen bg-gray-50 text-gray-800'>
         <section
            className='relative isolate h-[420px] flex flex-col justify-center items-center text-center transition-all duration-300'
            style={{
               marginTop: 'calc(var(--announcement-offset) ',
            }}
         >
            <div
               className='absolute inset-0 -z-10 bg-center bg-cover'
               style={{ backgroundImage: 'url("/model.webp")' }}
            />
            <div className='absolute inset-0 -z-10 bg-black/40' />
            <div className='absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.20),transparent_40%),radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.12),transparent_40%)]' />

            <div className='page-width mx-auto px-4 sm:px-6 lg:px-8 text-center text-white'>
               <h1 className='heading !text-white'>Our Models</h1>
            </div>
         </section>

         <section className='page-width mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14'>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
               <div className='w-full sm:max-w-md'>
                  <label htmlFor='search' className='sr-only'>
                     Search models
                  </label>
                  <input
                     id='search'
                     type='text'
                     value={query}
                     onChange={(e) => setQuery(e.target.value)}
                     placeholder='Search models (e.g., Acute, Rapid)...'
                     className='w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-black'
                  />
               </div>
               <div className='text-sm text-gray-600'>
                  Showing {filteredProducts.length} of {products.length} models
               </div>
            </div>

            <div className='mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
               {filteredProducts.map((product) => (
                  <ProductCard
                     key={product._id}
                     product={product}
                     onBookNowClick={openBookModal}
                  />
               ))}
            </div>
         </section>

         <Modal
            isOpen={isBookModalOpen}
            onRequestClose={closeBookModal}
            overlayClassName='fixed inset-0 z-50 bg-black/40 p-4 overflow-y-auto'
            className='w-full max-w-3xl outline-none mx-auto'
            style={{
               content: {
                  position: 'static',
                  inset: 'unset',
                  border: 'none',
                  background: 'transparent',
                  padding: 0,
               },
            }}
         >
            <div className='relative rounded-2xl bg-white border border-gray-200 shadow-xl max-h-[90vh] overflow-y-auto'>
               <div className='sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b bg-white'>
                  <h3 className='text-lg font-semibold'>
                     Book: {selectedProduct?.name || 'Electric Scooter'}
                  </h3>
                  <button
                     onClick={closeBookModal}
                     className='inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50'
                     aria-label='Close'
                  >
                     <IoClose size={18} />
                  </button>
               </div>
               <div className='p-4 sm:p-6'>
                  {selectedProduct && (
                     <BookNow
                        productName={selectedProduct.name}
                        bookingAmount={bookingAmount}
                        defaultValues={bookingDefaults}
                        colors={(selectedProduct.colors || DEFAULT_COLORS).map(
                           (c) => (typeof c === 'string' ? c : c.name)
                        )}
                        models={products.map((p) => p.name) || DEFAULT_MODELS}
                        states={DEFAULT_STATES}
                        citiesByState={DEFAULT_CITIES}
                        showTitle={false}
                        onSubmit={closeBookModal}
                     />
                  )}
               </div>
            </div>
         </Modal>
      </div>
   );
};

export default OurModals;
