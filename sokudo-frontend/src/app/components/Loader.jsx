import React from 'react';

const Loader = ({ message = 'Loading products...' }) => {
   return (
      <div
         style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 12,
            background: 'transparent',
         }}
      >
         <div
            aria-hidden='true'
            style={{
               width: 56,
               height: 56,
               borderRadius: '50%',
               border: '6px solid rgba(0,0,0,0.08)',
               borderTopColor: '#111827',
               animation: 'spin 1s linear infinite',
            }}
         />
         <div style={{ color: '#111827', fontSize: 16 }}>{message}</div>

         <style>{`
            @keyframes spin {
               to { transform: rotate(360deg); }
            }
         `}</style>
      </div>
   );
};

export default Loader;
