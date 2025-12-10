'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBlogs } from '../features/blogs/BlogSlice';

const stripHtml = (html = '') => {
   const temp = document.createElement('div');
   temp.innerHTML = html;
   return temp.textContent || temp.innerText || '';
};

const SkeletonCard = () => (
   <div
      className='h-full flex flex-col rounded-md overflow-hidden bg-white border-[#E8E8E8] border animate-pulse'
      aria-hidden='true'
   >
      <div className='w-full h-48 bg-gray-200' />
      <div className='px-4 pt-4 pb-8 flex-grow flex flex-col'>
         <div className='h-16 mb-4 bg-gray-200 rounded' />
         <hr className='border-[#CCCCCC] mb-3' />
         <div className='h-4 bg-gray-200 rounded w-full mb-2' />
         <div className='h-4 bg-gray-200 rounded w-5/6' />
      </div>
   </div>
);

const NewArticlesBlogs = () => {
   const dispatch = useDispatch();
   const router = useRouter();

   const { items: blogs = [], status } = useSelector(
      (state) => state.blogs || {}
   );

   useEffect(() => {
      dispatch(fetchAllBlogs());
   }, [dispatch]);

   const visible = blogs.slice(0, 4);

   return (
      <section
         className='page-width mx-auto py-12 sm:py-16 px-4'
         aria-labelledby='new-articles-heading'
         aria-busy={status === 'loading'}
      >
         <div className='text-center mb-12'>
            <h2 id='new-articles-heading' className='heading'>
               New Articles & Blogs
            </h2>
         </div>

         <div
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-15'
            role='list'
            aria-label='Latest blog articles'
         >
            {status === 'loading' || visible.length === 0
               ? [1, 2, 3, 4].map((i) => <SkeletonCard key={i} />)
               : visible.map((b, index) => {
                    const imgSrc =
                       b.images ||
                       (Array.isArray(b.images) && b.images[0]) ||
                       b.image ||
                       '/blogImages/placeholder.jpg';

                    const title = b.title || 'Untitled Blog';

                    const rawDescription =
                       b.description || b.excerpt || stripHtml(b.content || '');

                    const description =
                       rawDescription.length > 140
                          ? rawDescription.slice(0, 137) + '...'
                          : rawDescription;

                    const gradients = [
                       'linear-gradient(174.3deg, #FFE6DC 0%, #FFFFFF 39.46%)',
                       'linear-gradient(174.74deg, #FFFAD4 0%, #FFFFFF 39.46%)',
                       'linear-gradient(173.15deg, #E1F2D7 0%, #FFFFFF 39.46%)',
                       'linear-gradient(175.12deg, #E1F2FC 0%, #FFFFFF 39.46%)',
                    ];

                    const shadows = [
                       '0px 22px 20px -20px #E5CFC6',
                       '0px 20px 20px -20px #DED9B5',
                       '0px 25px 20px -20px #E1F2D7',
                       '0px 25px 20px -20px #CDDEE8',
                    ];

                    const gradient = b.gradient || gradients[index];
                    const shadow = b.shadow || shadows[index];

                    return (
                       <div
                          key={b._id || index}
                          role='listitem'
                          tabIndex={0}
                          aria-label={`Read blog article: ${title}`}
                          onClick={() => router.push('/blog')}
                          onKeyDown={(e) => {
                             if (e.key === 'Enter') router.push('/blog');
                          }}
                          className='h-full cursor-pointer flex flex-col rounded-md overflow-hidden bg-white border-[#E8E8E8] border hover:shadow-xl transition focus:outline-none focus:ring-2 focus:ring-yellow-500'
                          style={{ boxShadow: shadow }}
                       >
                          <div>
                             <img
                                src={imgSrc}
                                alt={title}
                                className='w-full h-48 object-cover'
                                loading='lazy'
                                draggable='false'
                             />
                          </div>

                          <div
                             className='px-4 pt-4 pb-8 flex-grow flex flex-col'
                             style={{ background: gradient }}
                          >
                             <h3 className='text-md font-medium overflow-hidden text-black h-18 flex items-start mb-2'>
                                {title}
                             </h3>

                             <hr className='border-[#CCCCCC] mb-3' />

                             <p className='text-md text-black flex-grow'>
                                {description}
                             </p>
                          </div>
                       </div>
                    );
                 })}
         </div>

         <div className='pl-1 text-center'>
            <Link
               href='/blog'
               aria-label='Read more blog articles'
               className='gap-2 bg-[#ffb200] px-6 py-3 btn'
            >
               Read More
            </Link>
         </div>
      </section>
   );
};

export default NewArticlesBlogs;
