'use client';

import Image from 'next/image';

const ChooseProduct = () => {
   return (
      <div className='py-12 sm:py-16'>
         <Image
            src='/Frame.png'
            alt='product image'
            width={800}
            height={600}
            className=''
         />
      </div>
   );
};

export default ChooseProduct;
