"use client";
import { useEffect, useMemo, useState } from 'react';
import Modal from 'react-modal';

const TAGS = ['All', 'Launch', 'Review', 'Event', 'Press', 'Tutorial'];

const MEDIA_ITEMS = [
   {
      id: 1,
      type: 'image',
      src: '/news-1.png',
      title: 'Sokudo Launch Event Highlights',
      tags: ['Launch', 'Event'],
      date: '2025-07-05',
      source: 'Sokudo',
   },
   {
      id: 2,
      type: 'image',
      src: '/news-1.png',
      title: 'City Commute: Quiet Mornings on Sokudo',
      tags: ['Press'],
      date: '2025-06-28',
      source: 'City Journal',
   },
   {
      id: 3,
      type: 'video',
      src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
      thumbnail: '/news-1.png',
      title: 'Quick Start: Setup and First Ride',
      tags: ['Tutorial'],
      date: '2025-06-20',
      source: 'Sokudo',
   },
   {
      id: 4,
      type: 'image',
      src: '/news-1.png',
      title: 'Matte Grey Photo Shoot',
      tags: ['Press'],
      date: '2025-06-12',
      source: 'AutoMode',
   },
   {
      id: 5,
      type: 'image',
      src: '/news-1.png',
      title: 'Charging Anywhere: Cafe Top-up',
      tags: ['Event'],
      date: '2025-06-02',
      source: 'Sokudo',
   },
   {
      id: 6,
      type: 'video',
      src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
      thumbnail: '/news-1.png',
      title: 'Range Test: Across the City Loop',
      tags: ['Review'],
      date: '2025-05-24',
      source: 'Ride Review',
   },
   {
      id: 7,
      type: 'image',
      src: '/news-1.png',
      title: 'Compact Parking Anywhere',
      tags: ['Press'],
      date: '2025-05-15',
      source: 'Urban Daily',
   },
   {
      id: 8,
      type: 'image',
      src: '/news-1.png',
      title: 'Design Details in Natural Light',
      tags: ['Press'],
      date: '2025-05-02',
      source: 'Design Post',
   },
   {
      id: 9,
      type: 'video',
      src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
      thumbnail: '/news-1.png',
      title: 'Braking and Regen Explained',
      tags: ['Tutorial'],
      date: '2025-04-20',
      source: 'Sokudo',
   },
   {
      id: 10,
      type: 'image',
      src: '/news-1.png',
      title: 'Night Ride: LED Spread in Rain',
      tags: ['Review'],
      date: '2025-04-11',
      source: 'Night Riders',
   },
   {
      id: 11,
      type: 'image',
      src: '/news-1.png',
      title: 'Home Charging, Simple as a Phone',
      tags: ['Tutorial'],
      date: '2025-03-28',
      source: 'Sokudo',
   },
   {
      id: 12,
      type: 'image',
      src: '/news-1.png',
      title: 'Everyday Moments: Groceries on the Go',
      tags: ['Press'],
      date: '2025-03-16',
      source: 'Local Press',
   },
   {
      id: 13,
      type: 'video',
      src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
      thumbnail: '/news-1.png',
      title: 'Suspension Deep Dive',
      tags: ['Review'],
      date: '2025-03-02',
      source: 'Ride Lab',
   },
   {
      id: 14,
      type: 'image',
      src: '/news-1.png',
      title: 'Quiet Mornings, Clean Commutes',
      tags: ['Press'],
      date: '2025-02-18',
      source: 'Eco Times',
   },
   {
      id: 15,
      type: 'image',
      src: '/news-1.png',
      title: 'Owners of Sokudo: Portrait Series',
      tags: ['Event'],
      date: '2025-02-05',
      source: 'Sokudo',
   },
   {
      id: 16,
      type: 'video',
      src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
      thumbnail: '/news-1.png',
      title: 'App Walkthrough & Tips',
      tags: ['Tutorial'],
      date: '2025-01-22',
      source: 'Sokudo',
   },
];

const formatDate = (iso) =>
   new Date(iso).toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
   });

const Media = () => {
   const [query, setQuery] = useState('');
   const [activeTag, setActiveTag] = useState('All');
   const [selectedIndex, setSelectedIndex] = useState(null);

   useEffect(() => {
      Modal.setAppElement("body");
   }, []);

   const filtered = useMemo(() => {
      const q = query.trim().toLowerCase();
      return MEDIA_ITEMS.filter((m) =>
         activeTag === 'All' ? true : m.tags.includes(activeTag)
      )
         .filter((m) =>
            q
               ? [m.title, m.source, ...(m.tags || [])]
                    .join(' ')
                    .toLowerCase()
                    .includes(q)
               : true
         )
         .sort((a, b) => new Date(b.date) - new Date(a.date));
   }, [query, activeTag]);

   const images = useMemo(
      () => filtered.filter((m) => m.type === 'image'),
      [filtered]
   );
   const videos = useMemo(
      () => filtered.filter((m) => m.type === 'video'),
      [filtered]
   );

   const openModalById = (id) => {
      const idx = filtered.findIndex((m) => m.id === id);
      setSelectedIndex(idx >= 0 ? idx : null);
   };
   const closeModal = () => setSelectedIndex(null);
   const hasPrev = selectedIndex !== null && selectedIndex > 0;
   const hasNext =
      selectedIndex !== null && selectedIndex < filtered.length - 1;
   const goPrev = () => hasPrev && setSelectedIndex((i) => i - 1);
   const goNext = () => hasNext && setSelectedIndex((i) => i + 1);

   return (
      <div className='min-h-screen bg-white text-gray-900'>
         {/* Hero */}
        <section
        className="relative isolate h-[420px] flex flex-col justify-center items-center text-center transition-all duration-300"
        style={{
          marginTop: "calc(var(--announcement-offset) ",
        }}
      >
            <div
               className='absolute inset-0 -z-10 bg-center bg-cover'
               style={{ backgroundImage: "url('/videoimage.jpg')" }}
            />
            <div className='absolute inset-0 -z-10 bg-black/40' />
            <div className='absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.20),transparent_40%),radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.12),transparent_40%)]' />
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full'>
               <div className='text-center text-white'>
                  <h1 className='heading !text-white'>Media</h1>
               </div>
            </div>
         </section>

         {/* Toolbar */}
         <section className='py-6 sm:py-8 border-b border-gray-100'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
               <div className='relative w-full sm:max-w-md'>
                  <input
                     type='text'
                     value={query}
                     onChange={(e) => setQuery(e.target.value)}
                     placeholder='Search media, tags, sources…'
                     className='w-full rounded-xl border border-gray-200 bg-white/90 px-4 py-2.5 pr-10 outline-none focus:border-gray-300 focus:ring-2 focus:ring-yellow-300/50'
                  />
                  <svg
                     className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400'
                     fill='none'
                     stroke='currentColor'
                     strokeWidth='2'
                     viewBox='0 0 24 24'
                     aria-hidden='true'
                  >
                     <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z'
                     />
                  </svg>
               </div>

               <div className='flex flex-wrap gap-2'>
                  {TAGS.map((t) => {
                     const active = t === activeTag;
                     return (
                        <button
                           key={t}
                           onClick={() => setActiveTag(t)}
                           className={[
                              'px-3.5 py-1.5 rounded-full border text-sm transition-colors',
                              active
                                 ? 'border-yellow-400 bg-yellow-50 text-yellow-700'
                                 : 'border-gray-200 bg-white hover:bg-gray-50',
                           ].join(' ')}
                        >
                           {t}
                        </button>
                     );
                  })}
               </div>
            </div>
         </section>

         {/* Images grid (all cards same size) */}
         <section className='py-10 sm:py-12'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
               {images.length === 0 ? (
                  <div className='text-center py-16 text-gray-500'>
                     No images found.
                  </div>
               ) : (
                  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6'>
                     {images.map((m) => {
                        const isPressOrEvent =
                           m.tags.includes('Press') || m.tags.includes('Event');
                        return (
                           <article key={m.id} className='group'>
                              <button
                                 onClick={() => openModalById(m.id)}
                                 className='w-full text-left'
                                 aria-label={`Open ${m.title}`}
                              >
                                 <div
                                    className={[
                                       'relative overflow-hidden transform-gpu transition-transform duration-200 hover:scale-[1.02]',
                                       'rounded-2xl border bg-white',
                                       isPressOrEvent
                                          ? 'paper-card'
                                          : 'border-gray-200',
                                    ].join(' ')}
                                 >
                                    <div className='aspect-[4/3]' />
                                    <img
                                       src={m.src}
                                       alt={m.title}
                                       loading='lazy'
                                       className='absolute inset-0 h-full w-full object-cover'
                                    />
                                    <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent' />
                                    <div className='absolute left-3 top-3 flex flex-wrap gap-2'>
                                       {m.tags.slice(0, 2).map((tg) => (
                                          <span
                                             key={tg}
                                             className='rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-gray-800 ring-1 ring-inset ring-gray-200 backdrop-blur'
                                          >
                                             {tg}
                                          </span>
                                       ))}
                                       {m.tags.length > 2 && (
                                          <span className='rounded-full bg-white/80 px-2 py-1 text-[10px] text-gray-600 ring-1 ring-gray-200'>
                                             +{m.tags.length - 2}
                                          </span>
                                       )}
                                    </div>
                                    <div className='absolute inset-x-0 bottom-0 p-4'>
                                       <h3 className='text-white font-semibold drop-shadow-sm line-clamp-2'>
                                          {m.title}
                                       </h3>
                                       <p className='mt-1 text-sm text-white/85 drop-shadow-sm'>
                                          {m.source} • {formatDate(m.date)}
                                       </p>
                                    </div>
                                 </div>
                              </button>
                           </article>
                        );
                     })}
                  </div>
               )}

               {/* Videos heading and grid */}
               {videos.length > 0 && (
                  <>
                     <h2 className='mt-12 mb-4 text-xl font-semibold text-gray-900'>
                        Videos
                     </h2>
                     <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {videos.map((m) => (
                           <article key={m.id} className='group'>
                              <button
                                 onClick={() => openModalById(m.id)}
                                 className='w-full text-left'
                                 aria-label={`Open ${m.title}`}
                              >
                                 <div className='relative overflow-hidden rounded-2xl border border-gray-200 bg-white transform-gpu transition-transform duration-200 hover:scale-[1.02]'>
                                    <div className='aspect-video' />
                                    <img
                                       src={m.thumbnail || ''}
                                       alt={m.title}
                                       loading='lazy'
                                       className='absolute inset-0 h-full w-full object-cover'
                                    />
                                    <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent' />
                                    <div className='absolute inset-0 flex items-center justify-center'>
                                       <span className='inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-gray-900 ring-1 ring-gray-200 transition-transform group-hover:scale-110'>
                                          <svg
                                             className='h-6 w-6'
                                             viewBox='0 0 24 24'
                                             fill='currentColor'
                                             aria-hidden='true'
                                          >
                                             <path d='M8 5v14l11-7L8 5z' />
                                          </svg>
                                       </span>
                                    </div>
                                    <div className='absolute inset-x-0 bottom-0 p-4'>
                                       <h3 className='text-white font-semibold drop-shadow-sm line-clamp-2'>
                                          {m.title}
                                       </h3>
                                       <p className='mt-1 text-sm text-white/85 drop-shadow-sm'>
                                          {m.source} • {formatDate(m.date)}
                                       </p>
                                    </div>
                                 </div>
                              </button>
                           </article>
                        ))}
                     </div>
                  </>
               )}
            </div>
         </section>

         {/* Centered modal (lightweight: react-modal) */}
         <Modal
            isOpen={selectedIndex !== null}
            onRequestClose={closeModal}
            shouldCloseOnOverlayClick
            shouldCloseOnEsc
            style={{
               overlay: {
                  backgroundColor: 'rgba(0,0,0,0.75)',
                  zIndex: 50,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '16px',
               },
               content: {
                  inset: 'unset',
                  padding: 0,
                  border: 'none',
                  borderRadius: '16px',
                  background: 'white',
                  width: '100%',
                  maxWidth: '80rem',
                  maxHeight: '90vh',
                  overflow: 'hidden',
               },
            }}
            contentLabel='Media viewer'
         >
            {selectedIndex !== null && filtered[selectedIndex] && (
               <div className='relative'>
                  <button
                     onClick={closeModal}
                     className='absolute z-10 top-3 right-3 rounded-full bg-white/90 p-2 text-gray-900 ring-1 ring-gray-200 hover:bg-white'
                     aria-label='Close'
                  >
                     <svg
                        className='h-5 w-5'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        fill='none'
                        strokeWidth='2'
                     >
                        <path
                           strokeLinecap='round'
                           strokeLinejoin='round'
                           d='M6 6l12 12M6 18L18 6'
                        />
                     </svg>
                  </button>

                  <div className='bg-black flex items-center justify-center'>
                     {filtered[selectedIndex].type === 'video' ? (
                        <video
                           src={filtered[selectedIndex].src}
                           poster={
                              filtered[selectedIndex].thumbnail || undefined
                           }
                           controls
                           autoPlay
                           className='w-full h-auto max-h-[70vh] object-contain bg-black'
                        />
                     ) : (
                        <img
                           src={filtered[selectedIndex].src}
                           alt={filtered[selectedIndex].title}
                           className='w-full h-auto max-h-[70vh] object-contain bg-black'
                           loading='eager'
                        />
                     )}
                  </div>

                  <div className='p-4 sm:p-5'>
                     <h3 className='text-lg font-semibold text-gray-900'>
                        {filtered[selectedIndex].title}
                     </h3>
                     <p className='mt-1 text-sm text-gray-600'>
                        {filtered[selectedIndex].source} •{' '}
                        {formatDate(filtered[selectedIndex].date)}
                     </p>
                     <div className='mt-3 flex flex-wrap gap-2'>
                        {filtered[selectedIndex].tags.map((tg) => (
                           <span
                              key={tg}
                              className='rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-700 ring-1 ring-inset ring-gray-200'
                           >
                              {tg}
                           </span>
                        ))}
                     </div>
                  </div>

                  {hasPrev && (
                     <button
                        onClick={goPrev}
                        
                        className='absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-gray-900 ring-1 ring-gray-200 hover:bg-white'
                        aria-label='Previous'
                     >
                        <svg
                           className='h-6 w-6'
                           viewBox='0 0 24 24'
                           fill='none'
                           stroke='currentColor'
                           strokeWidth='2'
                        >
                           <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M15 19l-7-7 7-7'
                           />
                        </svg>
                     </button>
                  )}
                  {hasNext && (
                     <button
                        onClick={goNext}
                        className='absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-gray-900 ring-1 ring-gray-200 hover:bg-white'
                        aria-label='Next'
                     >
                        <svg
                           className='h-6 w-6'
                           viewBox='0 0 24 24'
                           fill='none'
                           stroke='currentColor'
                           strokeWidth='2'
                        >
                           <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M9 5l7 7-7 7'
                           />
                        </svg>
                     </button>
                  )}
               </div>
            )}
         </Modal>

         {/* Paper/newspaper vibe for Press/Event */}
         <style>{`
        .paper-card {
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 18px;
          position: relative;
          transform: rotate(-0.25deg);
          box-shadow: 0 10px 18px rgba(0,0,0,0.10);
        }
        .paper-card::before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(ellipse at top left, rgba(255,255,255,0.15), transparent 40%),
            radial-gradient(ellipse at bottom right, rgba(0,0,0,0.05), transparent 50%),
            repeating-linear-gradient(0deg, rgba(0,0,0,0.02) 0px, rgba(0,0,0,0.02) 1px, transparent 1px, transparent 2px),
            repeating-linear-gradient(90deg, rgba(0,0,0,0.02) 0px, rgba(0,0,0,0.02) 1px, transparent 1px, transparent 2px);
          mix-blend-mode: multiply;
        }
      `}</style>
      </div>
   );
};

export default Media;
