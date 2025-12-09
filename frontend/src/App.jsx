import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './layout/Layout.jsx';
import Home from './pages/Home.jsx';
import Company from './pages/Company.jsx';
import RnD from './pages/RnD.jsx';
import Career from './pages/Career.jsx';
import Dealership from './pages/Dealership.jsx';
import Testimonial from './pages/Testimonial.jsx';
import Contact from './pages/Contact.jsx';
import Media from './pages/Media.jsx';
import Blog from './pages/Blog.jsx';
import OurModals from './pages/OurModals.jsx';
import InstagramTestimonials from './components/InstagramTestimonials.jsx';
import ProductDetail from './pages/ProductDetails.jsx';
import { fetchAllProducts } from './features/products/ProductSlice';
import LoginForm from './login/Login.jsx';
import Signup from './signup/Signup.jsx';
import AuthSuccess from './signup/AuthSuccess.jsx';
import BlogDetails from './pages/BlogDetails.jsx';
import Account from './pages/Account.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import TermsConditions from './pages/TermsAndCondition.jsx';
import Disclaimer from './pages/Disclaimer.jsx';
import Warranty from './pages/Warrenty.jsx';
import FAQ from './pages/Faq.jsx';
import ForgotPassword from './pages/ForgetPassword.jsx';
import VerifyOtp from './pages/Verify.jsx';
import CreatePassword from './pages/ResetPassword.jsx';
import LocationDetails from './pages/LocationDetailPage.jsx';
import Locations from './pages/LocationDetailPage.jsx';
import PressReleases from './pages/PressRelease.jsx';
import SokudoVariantPage from './components/Variant.jsx';
import FeatureSections from './components/Variant.jsx';
import { FaWhatsapp } from "react-icons/fa";
import TestRidePage from './pages/TestRide.jsx';
import ThankYouPage from './pages/ThnakyouPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';


const router = createBrowserRouter([
   {
      path: '/login',
      element: <LoginForm />,
   },
   {
      path: '/register',
      element: <Signup />,
   },
   {
      path: '/auth/success',
      element: <AuthSuccess />,
   },

   {
      path: '/forget',
      element: <ForgotPassword />,
   },
   {
      path: '/verify',
      element: <VerifyOtp />,
   },
   {
      path: '/reset',
      element: <CreatePassword />,
   },
   { path: '/thankyou', element: <ThankYouPage /> },

   {
      path: '/',
      element: <Layout />,

      children: [
         { index: true, element: <Home /> },

         {
            path: 'account',
            element: <Account />,
         },

         { path: 'company', element: <Company /> },
         { path: 'r&d', element: <RnD /> },
         { path: 'our-model', element: <OurModals /> },
         { path: 'career', element: <Career /> },
         { path: 'privacy-policy', element: <PrivacyPolicy /> },
         { path: 'terms-conditions', element: <TermsConditions /> },
         { path: 'disclaimer', element: <Disclaimer /> },
         { path: 'warranty', element: <Warranty /> },
         { path: 'faq', element: <FAQ /> },
         { path: 'dealership', element: <Dealership /> },
         { path: 'testimonial', element: <Testimonial /> },
         { path: 'location', element: <Locations /> },
         { path: 'news', element: <PressReleases /> },
         { path: 'variants', element: <FeatureSections /> },
         { path: 'test-ride', element: <TestRidePage /> },
         
         {
            path: '/instagram-testimonials',
            element: <InstagramTestimonials />,
         },
         { path: 'media', element: <Media /> },
         { path: 'blog', element: <Blog /> },
         { path: 'contact', element: <Contact /> },
         { path: 'product/:id', element: <ProductDetail /> },
         { path: 'blog/:slug', element: <BlogDetails /> },
         { path: 'login', element: <LoginForm /> },
         { path: '*', element: <NotFoundPage/> },
      ],
   },
]);

const App = () => {
   const dispatch = useDispatch();
   const products = useSelector((state) => state.product.items);
   const loading = useSelector((state) => state.product.loading);

   useEffect(() => {
      if (!products || products.length === 0) {
         if (!loading) {
            dispatch(fetchAllProducts());
         }
      }
   }, [products, loading]);

   return (
      <>
         <RouterProvider router={router} />
         <div className='fixed bottom-5 right-5 z-50 '>
            <a
               href='https://wa.me/8920649555'
               target='_blank'
               rel='noopener noreferrer'
            >
               <div aria-label='Close whatsapp' className=' bg-green-200 hover:bg-green-600 p-3 rounded-full shadow-xl  '>
                  <FaWhatsapp size={28} color="#25D366" />
               </div>
            </a>
         </div>
         <Toaster
            position='top-right'
            toastOptions={{
               duration: 3000,
               style: {
                  background: '#fff',
                  color: '#333',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
               },
               success: {
                  iconTheme: {
                     primary: '#10B981',
                     secondary: '#fff',
                  },
               },
               error: {
                  iconTheme: {
                     primary: '#EF4444',
                     secondary: '#fff',
                  },
               },
            }}
         />
      </>
   );
};

export default App;
