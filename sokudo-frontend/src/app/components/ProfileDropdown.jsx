'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LuUser, LuPencil, LuShoppingBasket, LuLogOut } from 'react-icons/lu';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/user/UserSlice';
import toast from 'react-hot-toast';
import { AiOutlineUser } from 'react-icons/ai';

const ProfileDropdown = () => {
   const [open, setOpen] = useState(false);
   const dropdownRef = useRef();
   const dispatch = useDispatch();
   const router = useRouter();

   const { user, isLoggedIn } = useSelector((state) => state.user);

   const handleLogout = () => {
      dispatch(logout());
      setOpen(false);
      router.push('/');
      toast.success('Logged out successfully 👋');
   };

   useEffect(() => {
      const handleClick = (e) => {
         if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setOpen(false);
         }
      };
      document.addEventListener('mousedown', handleClick);
      return () => document.removeEventListener('mousedown', handleClick);
   }, []);

   const userInitial =
      user?.name && user.name.length > 0
         ? user.name.charAt(0).toUpperCase()
         : 'U';

   return (
      <div className='relative' ref={dropdownRef}>
         <button
            type='button'
            aria-label='Close announcement'
            onClick={() => setOpen(!open)}
            className='cursor-pointer rounded-full'
         >
            {isLoggedIn ? (
               <div
                  className='flex items-center justify-center size-9.5 rounded-full font-bold text-lg text-white'
                  style={{ backgroundColor: '#FFB200' }}
               >
                  {userInitial}
               </div>
            ) : (
               <AiOutlineUser
                  aria-label='Profile'
                  className='text-white size-7'
               />
            )}
         </button>

         {open && (
            <div className='absolute right-0 mt-2 z-50 bg-white shadow-lg rounded-lg border border-gray-200 w-64 sm:w-72'>
               <div className='p-4 border-b border-gray-200 flex items-center gap-3'>
                  <div className='relative inline-block'>
                     {isLoggedIn ? (
                        <div
                           className='flex items-center justify-center size-12 rounded-full font-bold text-2xl text-white'
                           style={{ backgroundColor: '#FFB200' }}
                        >
                           {userInitial}
                        </div>
                     ) : (
                        <AiOutlineUser className='text-white size-7' />
                     )}
                     {isLoggedIn && (
                        <span className='absolute -bottom-0.5 right-0 block h-3 w-3 rounded-full bg-green-500 border-2 border-white'></span>
                     )}
                  </div>
                  <div>
                     <h6 className='font-semibold text-gray-800'>
                        {isLoggedIn ? user?.name || 'User' : 'Guest'}
                     </h6>
                     <p className='text-sm text-gray-500'>
                        {isLoggedIn ? user?.email : 'Not logged in'}
                     </p>
                  </div>
               </div>

               <div className='p-2 text-black bg-white'>
                  {isLoggedIn ? (
                     <>
                        <Link
                           href='/account'
                           onClick={() => setOpen(false)}
                           className='menu-item flex items-center gap-3 py-2 px-3 rounded-md hover:bg-gray-100'
                        >
                           <LuUser size={18} /> View Profile
                        </Link>

                        

                        <Link
                           href='/account'
                           onClick={() => setOpen(false)}
                           className='menu-item flex items-center gap-3 py-2 px-3 rounded-md hover:bg-gray-100'
                        >
                           <LuShoppingBasket size={18} /> My Orders
                        </Link>

                        <div className='border-t border-gray-200 my-2'></div>

                        <button
                           onClick={handleLogout}
                           aria-label='Logout'
                           className='flex items-center gap-3 w-full text-left py-2 px-3 rounded-md text-red-500 hover:bg-red-600 hover:text-white transition'
                        >
                           <LuLogOut size={18} /> Logout
                        </button>
                     </>
                  ) : (
                     <div className='flex flex-col gap-2'>
                        <Link
                           href='/login'
                           onClick={() => setOpen(false)}
                           className='w-full text-center py-2 rounded-md bg-[#FFB200] text-white font-medium hover:bg-[#e0a100] transition'
                        >
                           Login
                        </Link>
                        <Link
                           href='/register'
                           onClick={() => setOpen(false)}
                           className='w-full text-center py-2 rounded-md border border-[#FFB200] text-[#FFB200] font-medium hover:bg-yellow-50 transition'
                        >
                           Register
                        </Link>
                     </div>
                  )}
               </div>
            </div>
         )}
      </div>
   );
};

export default ProfileDropdown;
