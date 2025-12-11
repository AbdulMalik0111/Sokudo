'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setUserAfterGoogle } from '../../features/user/UserSlice';
import toast, { Toaster } from 'react-hot-toast';

const AuthSuccess = () => {
   const dispatch = useDispatch();
   const router = useRouter();

   useEffect(() => {
      const searchParams = new URLSearchParams(window.location.search);
      const token = searchParams.get('token');
      const name = searchParams.get('name');
      const email = searchParams.get('email');
      const avatar = searchParams.get('avatar');

      if (!token) {
         toast.error('No token found. Redirecting...');
         setTimeout(() => router.replace('/login'), 1500);
         return;
      }

      dispatch(
         setUserAfterGoogle({
            token,
            user: { name, email, avatar },
         })
      );

      if (typeof window !== 'undefined') {
         localStorage.setItem('token', token);
         if (name) localStorage.setItem('name', name);
         if (email) localStorage.setItem('email', email);
         if (avatar) localStorage.setItem('avatar', avatar);
      }

      toast.success('Login successful!');
      setTimeout(() => router.replace('/'), 1800);
   }, [dispatch, router]);

   return (
      <div className='min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#f1f5ff] via-white to-[#fff8f5]'>
         <Toaster position='top-center' />

         <div className='relative bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl px-12 py-10 flex flex-col items-center text-center animate-fadeIn w-[90%] max-w-md'>
            <div className='mb-6 p-4 rounded-2xl bg-white shadow-lg'>
               <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='70'
                  height='70'
                  viewBox='0 0 48 48'
               >
                  <path
                     fill='#4285F4'
                     d='M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.954 4 4 12.954 4 24s8.954 20 20 20s20-8.954 20-20c0-1.342-.138-2.652-.389-3.917z'
                  />
                  <path
                     fill='#34A853'
                     d='M6.305 14.691L12.99 19.59C14.758 15.223 18.982 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.305 14.691z'
                  />
                  <path
                     fill='#FBBC05'
                     d='M24 44c5.154 0 9.86-1.977 13.409-5.212l-6.157-5.204C29.268 35.947 26.715 36.999 24 37c-5.202 0-9.619-3.317-11.303-8H5.998l-.088.68C8.411 38.043 15.65 44 24 44z'
                  />
                  <path
                     fill='#EA4335'
                     d='M43.611 20.083H42V20H24v8h11.303c-.79 2.232-2.227 4.118-4.051 5.449l.003.002l6.157 5.204C40.045 34.834 44 29.049 44 22c0-1.342-.138-2.652-.389-3.917z'
                  />
               </svg>
            </div>

            <h2 className='text-3xl font-bold text-gray-900 mb-2 tracking-tight'>
               Signing you in...
            </h2>

            <p className='text-gray-600 leading-relaxed text-sm'>
               Connecting your Google account securely.
               <br />
               You will be redirected shortly.
            </p>

            <div className='w-full h-2 bg-gray-200 rounded-full mt-6 overflow-hidden'>
               <div className='h-full w-1/2 bg-gradient-to-r from-[#4285F4] to-[#EA4335] animate-loadingBar'></div>
            </div>
         </div>

         <style jsx>{`
            .animate-loadingBar {
               animation: loading 1.4s ease-in-out infinite alternate;
            }
            @keyframes loading {
               from {
                  width: 10%;
               }
               to {
                  width: 90%;
               }
            }
            .animate-fadeIn {
               animation: fadeIn 0.7s ease-out;
            }
            @keyframes fadeIn {
               0% {
                  opacity: 0;
                  transform: translateY(10px);
               }
               100% {
                  opacity: 1;
                  transform: translateY(0);
               }
            }
         `}</style>
      </div>
   );
};

export default AuthSuccess;
