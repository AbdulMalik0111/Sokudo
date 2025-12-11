'use client';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

const noLayoutRoutes = [
   '/login',
   '/register',
   '/forget',
   '/reset',
   '/verify',
];

export default function AppShell({ children }) {
   const pathname = usePathname();
   const hideLayout = noLayoutRoutes.includes(pathname);

   return (
      <>
         {!hideLayout && <Header />}
         {children}
         {!hideLayout && <Footer />}
      </>
   );
}
