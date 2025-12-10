'use client';

import { Toaster } from 'react-hot-toast';
import { FaWhatsapp } from 'react-icons/fa';

export default function FloatingUI() {
   return (
      <>
         {/* WhatsApp Floating Button */}
         <div className='fixed bottom-5 right-5 z-50'>
            <a
               href='https://wa.me/8920649555'
               target='_blank'
               rel='noopener noreferrer'
            >
               <div className='bg-green-200 hover:bg-green-600 p-3 rounded-full shadow-xl'>
                  <FaWhatsapp size={28} color='#25D366' />
               </div>
            </a>
         </div>
         {/* Toast Notifications */}
         <Toaster
            position='top-right'
            toastOptions={{
               duration: 3000,
               style: {
                  background: '#fff',
                  color: '#333',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
               },
            }}
         />
      </>
   );
}
