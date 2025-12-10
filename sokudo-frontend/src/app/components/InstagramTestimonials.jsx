'use client';

import React, { useEffect } from 'react';

const bannerPoster = '/videoimage.jpg'; // fallback image
const bannerVideoSrc = '/videos/testimonials.mp4';

const IG_URLS = [
   'https://www.instagram.com/reel/DMnctEkgYR5',
   'https://www.instagram.com/reel/DMIG-a5AZrp',
   'https://www.instagram.com/reel/DL9aYYqgFo1',
];

function ensureInstaScript() {
   return new Promise((resolve) => {
      if (window.instgrm?.Embeds?.process) return resolve();

      const id = 'ig-embed-js';
      let script = document.getElementById(id);

      if (!script) {
         script = document.createElement('script');
         script.id = id;
         script.async = true;
         script.src = 'https://www.instagram.com/embed.js';
         script.onload = () => resolve();
         document.body.appendChild(script);
      } else {
         script.addEventListener('load', resolve, { once: true });
      }
   });
}

const InstagramTestimonials = () => {
   useEffect(() => {
      ensureInstaScript().then(() => window.instgrm?.Embeds?.process());
   }, []);

   const urls = IG_URLS.map((u) => (u.endsWith('/') ? u : `${u}/`));

   return (
      <section className='relative isolate'>
         {/* Banner */}
         <div className='relative mt-[-80px] h-[320px] sm:h-[380px] flex items-center overflow-hidden'>
            {/* Video background */}
            <video
               className='absolute inset-0 -z-20 w-full h-full object-cover'
               src={bannerVideoSrc}
               poster={bannerPoster}
               autoPlay
               loop
               muted
               playsInline
               preload='metadata'
            ></video>

            {/* Overlays */}
            <div className='absolute inset-0 -z-10 bg-black/40' />
            <div className='absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.20),transparent_40%),radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.12),transparent_40%)]' />

            {/* Heading */}
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white'>
               <h1 className='heading !text-white'>Instagram Video</h1>
            </div>
         </div>

         {/* Instagram Embeds */}
         <div className='max-w-6xl mx-auto px-4 py-10'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
               {urls.map((url) => (
                  <blockquote
                     key={url}
                     className='instagram-media'
                     data-instgrm-permalink={`${url}?utm_source=ig_embed&utm_campaign=loading`}
                     data-instgrm-version='14'
                     style={{
                        background: '#fff',
                        border: 0,
                        margin: 0,
                        maxWidth: '540px',
                        width: '100%',
                     }}
                  >
                     <a href={url} target='_blank' rel='noreferrer'></a>
                  </blockquote>
               ))}
            </div>
         </div>
      </section>
   );
};

export default InstagramTestimonials;
