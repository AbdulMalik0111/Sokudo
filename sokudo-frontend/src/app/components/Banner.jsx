const Banner = () => {
   return (
      <section
         aria-hidden='true'
         className='relative w-full h-[540px] sm:h-[620px] md:h-screen bg-cover bg-center bg-no-repeat transition-all duration-300'
         style={{
            backgroundImage: "url('/ban12.webp')",
            marginTop: 'calc(var(--announcement-offset))',
         }}
      ></section>
   );
};

export default Banner;
