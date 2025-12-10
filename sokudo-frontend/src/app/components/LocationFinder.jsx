import { FaLocationDot } from 'react-icons/fa6';

const LocationFinder = () => {
   return (
      <section
         className='max-w-full mx-auto pt-12 sm:pt-16'
         id='location-finder'
         aria-labelledby='location-heading'
      >
         {/* Header */}
         <div className='text-center mb-8'>
            <h2 id='location-heading' className='heading'>
               Our Location
            </h2>
         </div>

         {/* Map */}
         <div className='relative bg-white border border-gray-200 overflow-hidden rounded-xl'>
            <div className='contact-map'>
               <iframe
                  title='Sokudo Electric India location on Google Maps'
                  src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7007.912791594737!2d77.42245001171375!3d28.57107205833231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ceff72120e23f%3A0xf614ef3751268ebc!2sSokudo%20Electric%20India!5e0!3m2!1sen!2sin!4v1763070457861!5m2!1sen!2sin'
                  width='100%'
                  height='520'
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading='lazy'
                  referrerPolicy='no-referrer-when-downgrade'
                  className='w-full'
               ></iframe>

               {/* Decorative Marker Icon */}
               <div className='contact-icon' aria-hidden='true'>
                  <FaLocationDot className='contact-icon__svg' />
               </div>

               {/* Decorative Compass Icon */}
               <div
                  className='absolute top-4 right-4 pointer-events-none z-10'
                  aria-hidden='true'
               >
                  <div className='w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-200'>
                     <svg
                        width='20'
                        height='20'
                        viewBox='0 0 24 24'
                        fill='none'
                     >
                        <path d='M12 2L15 9L12 12L9 9L12 2Z' fill='#FF6B35' />
                        <path d='M12 22L9 15L12 12L15 15L12 22Z' fill='#666' />
                        <circle cx='12' cy='12' r='2' fill='#333' />
                     </svg>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default LocationFinder;
