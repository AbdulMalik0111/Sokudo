import { useState } from 'react';
import { PiPlusCircleDuotone, PiMinusCircleDuotone } from 'react-icons/pi';
import { FaShieldAlt, FaRoad, FaMobile, FaChartBar } from 'react-icons/fa';
import { IoPhonePortrait } from 'react-icons/io5';
import { BiSolidCarGarage } from 'react-icons/bi';
import { MdStorage } from 'react-icons/md';
import { GiHelmet } from 'react-icons/gi';

const PricingComponent = () => {
   const [selectedVariant, setSelectedVariant] = useState('Aqilla 2.2');
   const [selectedState, setSelectedState] = useState('Delhi');
   const [selectedCity, setSelectedCity] = useState('Delhi');
   const [selectedColor, setSelectedColor] = useState('blue');
   const [accessoriesOpen, setAccessoriesOpen] = useState(false);

   const colors = [
      { name: 'blue', class: 'bg-blue-500' },
      { name: 'red', class: 'bg-red-500' },
      { name: 'black', class: 'bg-black' },
      { name: 'yellow', class: 'bg-yellow-500' },
   ];

   const inclusiveFeatures = [
      {
         icon: <FaShieldAlt className='w-6 h-6' />,
         title: '3 Year Warranty',
         description: '',
         color: '#E0877B',
      },
      {
         icon: <FaRoad className='w-6 h-6' />,
         title: '1 Year Roadside Assistance',
         description: '',
         color: '#E5C955',
      },
      {
         icon: <FaMobile className='w-6 h-6' />,
         title: 'Standard Accessories',
         description: '',
         color: '#70B488',
      },
      {
         icon: <FaChartBar className='w-6 h-6' />,
         title: '1 Year Advanced Subscription',
         description: '',
         color: '#4797BF',
      },
   ];

   const accessories = [
      {
         icon: <IoPhonePortrait className='w-8 h-8' />,
         name: 'Phone Holder',
         price: '₹ 299',
      },
      {
         icon: <BiSolidCarGarage className='w-8 h-8' />,
         name: 'Side Mirrors',
         price: '₹ 499',
      },
      {
         icon: <MdStorage className='w-8 h-8' />,
         name: 'Storage Box',
         price: '₹ 799',
      },
      {
         icon: <GiHelmet className='w-8 h-8' />,
         name: 'Safety Helmet',
         price: '₹ 1,299',
      },
   ];

   return (
      <div className='max-w-7xl mx-auto py-16 bg-white'>
         {/* Header */}
         <h1 className='heading text-center mb-10'>Pricing</h1>

         {/* Main Content */}
         <div className='grid lg:grid-cols-2 gap-8 mb-8 border border-[#999999] rounded-4xl overflow-hidden'>
            {/* Left Side - Full Image */}
            <div className='relative'>
               <img
                  src='/pricing.jpg'
                  alt='Smart Scooter'
                  className='w-full h-full object-cover rounded-l-2xl'
               />
            </div>

            {/* Right Side - Pricing Info */}
            <div className='space-y-6 p-10'>
               {/* Variant Selection - 50% width */}
               <div className='w-1/2'>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                     Select Variant
                  </label>
                  <select
                     value={selectedVariant}
                     onChange={(e) => setSelectedVariant(e.target.value)}
                     className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  >
                     <option>Aqilla 2.2</option>
                     <option>Aqilla 3.0</option>
                     <option>Aqilla Pro</option>
                  </select>
               </div>

               {/* Location Selection */}
               <div className='grid grid-cols-2 gap-4'>
                  <div>
                     <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Select State
                     </label>
                     <select
                        value={selectedState}
                        onChange={(e) => setSelectedState(e.target.value)}
                        className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                     >
                        <option>Delhi</option>
                        <option>Mumbai</option>
                        <option>Bangalore</option>
                     </select>
                  </div>
                  <div>
                     <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Select City
                     </label>
                     <select
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                     >
                        <option>Delhi</option>
                        <option>Gurgaon</option>
                        <option>Noida</option>
                     </select>
                  </div>
               </div>

               {/* Color Selection */}
               <div className='flex justify-between items-center'>
                  <label className='block text-md font-medium text-[#666666] mb-2'>
                     Available Colours
                  </label>
                  <div className='flex space-x-3'>
                     {colors.map((color) => (
                        <button
                           key={color.name}
                           aria-label='colors'
                           onClick={() => setSelectedColor(color.name)}
                           className={`w-7 h-7 rounded-full ${color.class} ${
                              selectedColor === color.name
                                 ? 'ring-2 ring-gray-400 ring-offset-2'
                                 : ''
                           }`}
                        />
                     ))}
                  </div>
               </div>

               {/* Pricing */}
               <div className='space-y-3'>
                  <div className='flex justify-between items-center'>
                     <span className='text-md font-medium text-[#666666]'>
                        Ex-Showroom Price (including charger and GST)
                     </span>
                     <span className='font-semibold text-[#666666]'>
                        ₹ 1,06,889
                     </span>
                  </div>
                  <div className='flex justify-between items-center text-[#666666] text-md'>
                     <span className='text-md font-medium text-[#666666]'>
                        PM E-Drive
                     </span>
                     <span className='text-[#46A02E]'>-₹ 5,000</span>
                  </div>
                  <div className='flex justify-between items-center border-t-2 border-b-2 border-[#CCCCCC] py-3'>
                     <span className='text-md font-medium text-[#666666]'>
                        Effective Ex-Showroom Price *
                     </span>
                     <span className='font-bold  text-[#666666] text-sm'>
                        ₹ 1,01,889
                     </span>
                  </div>
               </div>

               {/* Disclaimer */}
               <p className='text-sm text-black'>
                  *The price displayed above excludes road taxes, insurance,
                  registration and other charges. Click on Book Now to find the
                  detailed price breakup.
               </p>

               {/* Book Now Button */}
               <button aria-label='Book now' className='btn'>Book Now</button>
            </div>
         </div>

         {/* Inclusive Features */}
         <div className='mb-8'>
            <h3 className='text-xl font-semibold mb-6'>Inclusive of</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
               {inclusiveFeatures.map((feature, index) => (
                  <div
                     key={index}
                     className='rounded-[15px] p-4 text-center border-1 flex justify-start items-center gap-6'
                     style={{ borderColor: feature.color }}
                  >
                     <div className='' style={{ color: feature.color }}>
                        {feature.icon}
                     </div>
                     <h4 className='font-medium text-sm'>{feature.title}</h4>
                  </div>
               ))}
            </div>
         </div>

         {/* Accessories Dropdown */}
         <div className='border border-[#999999] rounded-2xl bg-[#f7f7f7]'>
            <button
               onClick={() => setAccessoriesOpen(!accessoriesOpen)}
               aria-label='Open'
               className='w-full flex items-center justify-between p-4 text-left'
            >
               <span className='font-medium'>
                  Accessories available at all dealerships
               </span>
               <div className='flex items-center'>
                  {accessoriesOpen ? (
                     <PiMinusCircleDuotone className='w-6 h-6 text-black' />
                  ) : (
                     <PiPlusCircleDuotone className='w-6 h-6 text-black' />
                  )}
               </div>
            </button>

            {accessoriesOpen && (
               <div className='border-t border-gray-200 p-4'>
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                     {accessories.map((accessory, index) => (
                        <div
                           key={index}
                           className='border border-[#999999] rounded-lg p-3 text-center'
                        >
                           <div className='text-gray-600 mb-2 flex justify-center'>
                              {accessory.icon}
                           </div>
                           <h5 className='font-medium'>{accessory.name}</h5>
                           <p className='text-sm text-gray-600'>
                              {accessory.price}
                           </p>
                        </div>
                     ))}
                  </div>
               </div>
            )}
         </div>
      </div>
   );
};

export default PricingComponent;
