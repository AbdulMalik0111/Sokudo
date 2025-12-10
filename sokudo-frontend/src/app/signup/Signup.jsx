import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from '../features/user/UserSlice';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Signup = () => {
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
   const passwordRef = useRef();
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const { loading } = useSelector((state) => state.user);

   const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
   } = useForm({ mode: 'onBlur' });

   passwordRef.current = watch('password');

   const onSubmit = async (data) => {
      try {
         await dispatch(
            userRegister({
               name: data.username,
               email: data.email,
               password: data.password,
            })
         ).unwrap();

         toast.success('Account created successfully 🎉');
         navigate('/');
      } catch (err) {
         toast.error(err || 'Registration failed. Please try again.');
      }
   };

   const handleGoogleSignup = () => {
      const backend = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      // Navigates to backend which begins the Google OAuth flow
      window.location.href = `${backend}/customers/auth/google`;
   };

   return (
      <div className='min-h-screen py-10 flex items-center justify-center font-sans relative isolate'>
         <div
            className='fixed inset-0 -z-10 overflow-hidden'
            style={{
               backgroundImage: `
          linear-gradient(45deg, transparent 49%, #e5e7eb 49%, #e5e7eb 51%, transparent 51%),
          linear-gradient(-45deg, transparent 49%, #e5e7eb 49%, #e5e7eb 51%, transparent 51%)
        `,
               backgroundSize: '40px 40px',
            }}
         />

         <div className='w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-200'>
            <h2 className='text-3xl font-semibold text-gray-900 mb-8 text-center'>
               Create an Account
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
               {/* Username */}
               <div>
                  <label
                     htmlFor='username'
                     className='block text-sm font-medium text-gray-700 mb-2'
                  >
                     Username
                  </label>
                  <input
                     type='text'
                     id='username'
                     placeholder='Choose a username'
                     {...register('username', {
                        required: 'Username is required',
                        minLength: {
                           value: 3,
                           message: 'Username must be at least 3 characters',
                        },
                     })}
                     className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#ffb20e] focus:outline-none ${
                        errors.username ? 'border-red-500' : 'border-gray-300'
                     }`}
                  />
                  {errors.username && (
                     <p className='text-red-500 text-sm mt-1'>
                        {errors.username.message}
                     </p>
                  )}
               </div>

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
                        placeholder='Create a password (min. 6 characters)'
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
                        onClick={() => setShowPassword((v) => !v)}
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

               {/* Confirm Password */}
               <div>
                  <label
                     htmlFor='confirmPassword'
                     className='block text-sm font-medium text-gray-700 mb-2'
                  >
                     Confirm Password
                  </label>
                  <div className='relative'>
                     <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        id='confirmPassword'
                        placeholder='Re-enter your password'
                        {...register('confirmPassword', {
                           required: 'Please confirm your password',
                           validate: (value) =>
                              value === passwordRef.current ||
                              'The passwords do not match',
                        })}
                        className={`w-full border rounded-lg px-4 py-2 pr-10 focus:ring-2 focus:ring-[#ffb20e] focus:outline-none ${
                           errors.confirmPassword
                              ? 'border-red-500'
                              : 'border-gray-300'
                        }`}
                     />
                     <button
                        type='button'
                        onClick={() => setShowConfirmPassword((v) => !v)}
                        className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500'
                     >
                        {showConfirmPassword ? (
                           <MdVisibilityOff size={20} />
                        ) : (
                           <MdVisibility size={20} />
                        )}
                     </button>
                  </div>
                  {errors.confirmPassword && (
                     <p className='text-red-500 text-sm mt-1'>
                        {errors.confirmPassword.message}
                     </p>
                  )}
               </div>

               {/* Submit */}
               <button
                  type='submit'
                  className='w-full bg-[#ffb20e] text-black font-semibold py-2.5 rounded-lg hover:bg-[#e0a10d] transition mt-6'
                  disabled={loading}
               >
                  {loading ? 'Registering...' : 'Register'}
               </button>

               {/* Google Signup */}
               <button
                  type='button'
                  onClick={handleGoogleSignup}
                  className='w-full flex items-center justify-center border border-gray-300 rounded-lg py-2 mt-2 hover:bg-gray-100 transition'
               >
                  <FcGoogle size={22} className='mr-2' />
                  <span className='text-gray-700 font-medium'>
                     Continue with Google
                  </span>
               </button>
            </form>

            <p className='text-center text-sm text-gray-600 mt-8'>
               Already have an account?{' '}
               <Link
                  to='/login'
                  className='text-[#ffb20e] font-medium hover:underline'
               >
                  Login
               </Link>
            </p>
         </div>
      </div>
   );
};

export default Signup;
