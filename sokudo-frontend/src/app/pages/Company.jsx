import Banner from "/about.webp";
import CMD from "/prashantsir.jpg";
// import About from "/blogImages/blog-3.jpg";
// import Web-Partnership-Form from "/Web-Partnership-Form.jpg";
import { motion } from "framer-motion";


const Company = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">

      {/* BANNER — unchanged */}
      <section
        className="relative isolate h-[420px] flex flex-col justify-center items-center text-center transition-all duration-300"
        style={{
          marginTop: "calc(var(--announcement-offset) ",
        }}
      >
        <div
          className="absolute inset-0 -z-10 bg-center bg-cover"
          style={{ backgroundImage: `url(${Banner})` }}
        />
        <div className="absolute inset-0 -z-10 bg-black/40" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.20),transparent_40%),radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.12),transparent_40%)]" />

        <div className="page-width mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="heading !text-white">About Sokudo</h1>
        </div>
      </section>

      {/* FULL WIDTH "ABOUT SOKUDO INDIA" SECTION */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto  px-4 sm:px-6 lg:px-8">
          <h2 className="heading text-3xl sm:text-4xl font-bold text-center text-gray-900">About Sokudo India</h2>

          <p className="mt-6 text-gray-700 leading-8 text-lg">
            We are a quality-seeking and quality-conscious organisation. Before it reaches our customers, every product we manufacture is thoroughly inspected, rigorously tested by quality engineers, and subjected to stringent quality checks. Sokudo, as a certified organization, Guarantees that it is highly environment conscious, socially responsible and professionally ethical in its business operations.
          </p>

          <p className="mt-6 text-gray-700 leading-8 text-lg">
            Sokudo is a revolution to your travel-to-work experience by enabling the smooth connectivity of technology and mobility solutions.
          </p>
        </div>
      </section>

      
<section className="py-16">
  <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 px-4 sm:px-6 lg:px-8 items-start">

    {/* LEFT SMALLER IMAGE WITH SLIDE-IN */}
    <motion.div
      initial={{ opacity: 0, x: -80 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full"
    >
      <div className="relative rounded-3xl overflow-hidden shadow-xl ring-1 ring-gray-200">
        <img
          src="/Web-Partnership-Form.png"
          className="w-full  md:h-[600px] h-[400px] md:object-cover object-cover aspect-[4/6]"  // ↓ smaller height
        />
      </div>
    </motion.div>

    {/* RIGHT — VISION + MISSION STACKED */}
    <div className="space-y-8">

      {/* VISION — RIGHT SLIDE */}
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="rounded-3xl bg-white border border-gray-200 p-8 shadow-md"
      >
        <h3 className="text-2xl font-semibold text-gray-900">Vision</h3>
        <p className="mt-4 text-gray-700 leading-8 text-lg">
          India is undergoing a significant shift toward electromobility. Sokudo aims to assist in this transition to electrification by establishing the necessary policy frameworks across India to ensure that people can capitalise on the use of more and more electric vehicles and make India a better place to live.
        </p>
      </motion.div>

      {/* MISSION — RIGHT SLIDE WITH DELAY */}
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
        className="rounded-3xl bg-white border border-gray-200 p-8 shadow-md"
      >
        <h3 className="text-2xl font-semibold text-gray-900">Mission</h3>
        <p className="mt-4 text-gray-700 leading-8 text-lg">
          To establish electric mobility as the most trusted and preferred
          alternative to fuel-based vehicles by delivering world-class,
          reliable, and technologically advanced electric scooters.
        </p>
      </motion.div>

    </div>
  </div>
</section>


      {/* CMD SECTION — CENTER IMAGE + BOX CONTENT */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          {/* Center Image */}
          <div className="flex justify-center">
            <img
              src={CMD}
              className="w-50 h-50  rounded-full object-contain shadow-xl ring-4 ring-emerald-500"
            />
          </div>

          {/* BOX BELOW IMAGE */}
          <div className="mt-10 bg-white border border-gray-200 rounded-3xl p-10 shadow-xl text-left">

            <span className="inline-flex items-center px-4 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200">
              CMD
            </span>

            <h3 className="heading text-3xl font-bold text-gray-900 mt-4">Prashant Vashishtha</h3>

            <p className="mt-6 text-gray-700 leading-8 text-lg">
              Mr. Vashishtha, a management graduate from one of India's leading institutions,
              has over 25 years of leadership experience and has contributed to influential
              business bodies across multiple sectors.
            </p>

            <p className="mt-6 text-gray-700 leading-8 text-lg">
              He is a strong advocate for innovation, development, and sustainable progress.
              His passion for empowering India’s EV ecosystem inspires Sokudo’s mission.
            </p>

            {/* Message */}
            <h4 className="text-xl font-semibold text-gray-900 mt-10">His Message</h4>

            <p className="mt-5 text-gray-700 leading-8 text-lg">
              The world is confronting a serious climate challenge. Fossil-fuel vehicles
              significantly contribute to pollution, and India needs a sustainable,
              future-positive mobility shift.
            </p>

            <p className="mt-5 text-gray-700 leading-8 text-lg">
              Inspired by this, we created a fully eco-friendly, Make-in-India electric vehicle
              brand. At Sokudo, we believe e-mobility is the only pathway to a cleaner future.
            </p>

            <blockquote className="mt-8 border-l-4 border-emerald-500 pl-6 italic text-gray-900 text-xl font-medium">
              “We're not just Mobility; we're the future of the future. India is no longer a
              country of locals — it's a country of globally accepted products.”
            </blockquote>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Company;
