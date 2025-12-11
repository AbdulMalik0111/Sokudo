'use client';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../features/user/UserSlice';

const Login = () => {
   const [showPassword, setShowPassword] = useState(false);
   const dispatch = useDispatch();
   const router = useRouter();

   const { loading, error, isLoggedIn } = useSelector((state) => state.user);

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({ mode: 'onBlur' });

   const onSubmit = (data) => {
      dispatch(userLogin(data));
   };

   const handleGoogleLogin = () => {
      const backend =
         process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      window.location.href = `${backend}/customers/auth/google`;
   };

   // ✅ Redirect on success
   useEffect(() => {
      if (isLoggedIn) {
         toast.success('Login successful 🎉');
         router.push('/');
      }
   }, [isLoggedIn, router]);

   // ✅ Show backend error toast
   useEffect(() => {
      if (error) toast.error(error);
   }, [error]);

   return (
      <div className='min-h-screen py-10 flex items-center justify-center font-sans relative isolate'>
         {/* Background pattern */}
         <div
            className='fixed inset-0 -z-10 overflow-hidden'
            style={{
               backgroundImage: `
            linear-gradient(45deg, transparent 49%, #e5e7eb 49%, #e5e7eb 51%, transparent 51%),
            linear-gradient(-45deg, transparent 49%, #e5e7eb 49%, #e5e7eb 51%, transparent 51%)
          `,
               backgroundSize: '40px 40px',
            }}
         ></div>

         <div className='w-full max-w-md bg-white rounded-2xl z-10 shadow-xl p-8 border border-gray-200'>
            <h2 className='text-3xl font-semibold text-gray-900 mb-8 text-center'>
               Login to Your Account
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
               {/* Email */}
               <div>
                  <label
                     htmlFor='email'
                     className='block text-sm font-medium text-gray-700 mb-2'
                  >
                     Email Address
                  </label>
                  <input
                     type='email'
                     id='email'
                     placeholder='you@example.com'
                     {...register('email', {
                        required: 'Email is required',
                        pattern: {
                           value: /^\S+@\S+$/i,
                           message: 'Please enter a valid email',
                        },
                     })}
                     className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#ffb20e] focus:outline-none ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                     }`}
                  />
                  {errors.email && (
                     <p className='text-red-500 text-sm mt-1'>
                        {errors.email.message}
                     </p>
                  )}
               </div>

               {/* Password */}
               <div>
                  <label
                     htmlFor='password'
                     className='block text-sm font-medium text-gray-700 mb-2'
                  >
                     Password
                  </label>
                  <div className='relative'>
                     <input
                        type={showPassword ? 'text' : 'password'}
                        id='password'
                        placeholder='••••••••'
                        {...register('password', {
                           required: 'Password is required',
                           minLength: {
                              value: 6,
                              message: 'Password must be at least 6 characters',
                           },
                        })}
                        className={`w-full border rounded-lg px-4 py-2 pr-10 focus:ring-2 focus:ring-[#ffb20e] focus:outline-none ${
                           errors.password
                              ? 'border-red-500'
                              : 'border-gray-300'
                        }`}
                     />
                     <button
                        type='button'
                        onClick={() => setShowPassword(!showPassword)}
                        className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500'
                     >
                        {showPassword ? (
                           <MdVisibilityOff size={20} />
                        ) : (
                           <MdVisibility size={20} />
                        )}
                     </button>
                  </div>
                  {errors.password && (
                     <p className='text-red-500 text-sm mt-1'>
                        {errors.password.message}
                     </p>
                  )}
               </div>

               {/* Remember Me / Forgot Password */}
               <div className='flex items-center justify-between text-sm'>
                  <label className='flex items-center gap-2 text-gray-700'>
                     <input type='checkbox' className='accent-[#ffb20e]' />
                     Remember Me
                  </label>
                  <a href='/forget' className='text-[#ffb20e] hover:underline'>
                     Forgot Password?
                  </a>
               </div>

               {/* Submit Button */}
               <button
                  type='submit'
                  disabled={loading}
                  className='w-full bg-[#ffb20e] text-black font-semibold py-2.5 rounded-lg hover:bg-[#e0a10d] transition disabled:opacity-70'
               >
                  {loading ? 'Signing in...' : 'Sign In'}
               </button>

               {/* OR Divider */}
               <div className='flex items-center justify-center pt-4'>
                  <span className='h-px bg-gray-300 w-1/4'></span>
                  <span className='mx-3 text-gray-500 text-sm'>OR</span>
                  <span className='h-px bg-gray-300 w-1/4'></span>
               </div>

               {/* Google Login */}
               <button
                  type='button'
                  onClick={handleGoogleLogin}
                  className='w-full flex items-center justify-center border border-gray-300 rounded-lg py-2 mt-2 hover:bg-gray-100 transition'
               >
                  <FcGoogle size={22} className='mr-2' />
                  <span className='text-gray-700 font-medium'>
                     Continue with Google
                  </span>
               </button>
            </form>

            {/* Signup Link */}
            <p className='text-center text-sm text-gray-600 mt-8'>
               Don’t have an account?{' '}
               <Link
                  href='/register'
                  className='text-[#ffb20e] font-medium hover:underline'
               >
                  Register
               </Link>
            </p>
         </div>
      </div>
   );
};

export default Login;
