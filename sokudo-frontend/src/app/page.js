'use client';

import React, { useState, useEffect } from 'react';

import ScooterLoader from './components/ScooterLoader';
import Banner from './components/Banner';
import ChooseProduct from './components/ChooseProduct';
import CityAvailabilitySection from './components/CityAvailabilitySection';
import EmiCalculation from './components/EmiCalculation';
import FAQPreview from './components/FAQPreview';
import GoogleReviewsWidget from './components/GoogleReviews';
import HyperchargerSection from './components/HyperchargerSection';
import ImageGallery from './components/ImageGallery';
import LandingPagePopup from './components/LndingPagePopUp';
import LocationFinder from './components/LocationFinder';
import NewArticlesBlogs from './components/NewArticlesBlogs';
import PricingComponent from './components/PricingComponent';
import ProductFeatures from './components/ProductFeatures';
import ProductShowcase from './components/ProductShowcase';
import Revolution from './components/Revolution';
import ScooterBanner from './components/ScooterBanner';
import ScooterCards from './components/ScooterCards';
import ScooterFeatureComponent from './components/ScooterFeatureComponent';
import CardCarousel from './components/ScootySlider';
import SokudoSteps from './components/SokudoSteps';
import StoreBookingSection from './components/StoreBookingSection';
import SwitchToSavings from './components/SwitchToSavings';
import Video from './components/Video';

const bannerSlides = [
   {
      buttonLink: '/our-model',
      imageUrl: '/slid.webp',
      bgColor: '#BAC9E8',
      buttonBg: '#FFB200',
      buttonTextColor: '#000',
   },
   {
      heading: 'Introducing the all new Scooters',
      paragraph:
         'Book your Sokudo Ride with newly launch High Speed Electric Scooters. Dealership available call now 9891229777.',
      buttonLink: '/our-model',
      imageUrl: '/productImg/DSC_9179.jpg',
      bgColor: '#BAC9E8',
      buttonBg: '#FFB200',
      buttonTextColor: '#000',
   },
   {
      heading: 'Rapid 2.2 - Power Meets Efficiency',
      paragraph:
         'Experience the thrill of 75 km/h top speed with 120km range on a single charge.',
      buttonLink: '/our-model',
      imageUrl: '/productImg/DSC_8967.jpg',
      bgColor: '#F7E6C4',
      buttonBg: '#FFB200',
      buttonTextColor: '#000',
   },
   {
      heading: 'Acute Series - City Commuter',
      paragraph:
         'Perfect for daily urban rides with smart features and comfortable ergonomics.',
      buttonLink: '/our-model',
      imageUrl: '/productImg/DSC_9125.jpg',
      bgColor: '#E6F7F1',
      buttonBg: '#FFB200',
      buttonTextColor: '#000',
   },
   {
      heading: 'Government Subsidies Available',
      paragraph:
         'Get up to ₹17,000 off with government EV incentives. Limited time offer!',
      buttonLink: '/our-model',
      imageUrl: '/productImg/DSC_9417.jpg',
      bgColor: '#F5D6D6',
      buttonBg: '#FFB200',
      buttonTextColor: '#000',
   },
];

export default function Home() {
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      const LOADER_KEY = 'homepage_loader_time';
      const ONE_HOUR = 60 * 60 * 1000;

      const lastShownTime = localStorage.getItem(LOADER_KEY);
      const currentTime = Date.now();

      if (!lastShownTime || currentTime - lastShownTime > ONE_HOUR) {
         setLoading(true);

         const timer = setTimeout(() => {
            setLoading(false);
            localStorage.setItem(LOADER_KEY, currentTime);
         }, 1000);

         return () => clearTimeout(timer);
      }
   }, []);

   if (loading)
      return (
         <div aria-busy='true'>
            <ScooterLoader />
         </div>
      );

   return (
      <main role='main'>
         <h1 className='sr-only'>
            Sokudo Electric Scooters – High Speed EV Scooters in India
         </h1>

         <LandingPagePopup />
         <Banner />
         <CardCarousel />
         <ScooterCards />

         <ProductFeatures />
         <ScooterBanner slides={bannerSlides} autoRotateTime={5000} />

         <CityAvailabilitySection />
         <EmiCalculation />
         <SokudoSteps />
         <SwitchToSavings />
         <Revolution />
         <Video />
         <NewArticlesBlogs />

         <section
            className='w-full page-width px-4 py-6'
            aria-labelledby='testimonials-heading'
         >
            <h2 id='testimonials-heading' className='heading !text-center pb-6'>
               Testimonials
            </h2>
            <div
               className='elfsight-app-2aa188de-f645-4af2-ad13-d200520b514d'
               data-elfsight-app-lazy
               aria-hidden='true'
            ></div>
         </section>

         <FAQPreview />
         <StoreBookingSection />
         <LocationFinder />
      </main>
   );
}
