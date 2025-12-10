'use client';

import React, { useEffect, useRef } from 'react';

const ElfsightWidget = () => {
   const widgetRef = useRef(null);

   useEffect(() => {
      if (!widgetRef.current) return;

      // Load external Elfsight script only once
      if (
         !document.querySelector(
            'script[src="https://elfsightcdn.com/platform.js"]'
         )
      ) {
         const script = document.createElement('script');
         script.src = 'https://elfsightcdn.com/platform.js';
         script.async = true;
         document.body.appendChild(script);
      }

      // Re-initialize Elfsight widget if script already loaded
      if (
         window.elfsightWidgets &&
         typeof window.elfsightWidgets.load === 'function'
      ) {
         window.elfsightWidgets.load();
      }
   }, []);

   return (
      <div
         ref={widgetRef}
         className='elfsight-app-916edc92-b20b-4acb-9bba-b56023ab399b'
         data-elfsight-app-lazy
      ></div>
   );
};

export default ElfsightWidget;
