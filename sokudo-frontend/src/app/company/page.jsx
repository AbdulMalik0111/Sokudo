"use client";

import { motion } from "framer-motion";

export default function Company() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* BANNER */}
      <section
        className="relative isolate h-[420px] flex flex-col justify-center items-center text-center transition-all duration-300"
        style={{
          marginTop: "calc(var(--announcement-offset))",
        }}
      >
        <div
          className="absolute inset-0 -z-10 bg-center bg-cover"
          style={{ backgroundImage: 'url("/about.webp")' }}
        />
        <div className="absolute inset-0 -z-10 bg-black/40" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.20),transparent_40%),radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.12),transparent_40%)]" />

        <div className="page-width mx-auto px-4 text-white">
          <h1 className="heading !text-white">About Sokudo</h1>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="heading text-center">About Sokudo India</h2>

          <p className="mt-6 text-gray-700 text-lg leading-8">
            We are a quality-seeking and quality-conscious organisation...
          </p>

          <p className="mt-6 text-gray-700 text-lg leading-8">
            Sokudo is a revolution to your travel-to-work experience...
          </p>
        </div>
      </section>

      {/* IMAGE + VISION / MISSION */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 px-4 items-start">
          {/* LEFT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="rounded-3xl overflow-hidden shadow-xl">
              <img
                src="/Web-Partnership-Form.png"
                className="w-full h-[400px] md:h-[600px] object-cover"
              />
            </div>
          </motion.div>

          {/* RIGHT CONTENT */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="rounded-3xl bg-white border p-8 shadow-md"
            >
              <h3 className="text-2xl font-semibold">Vision</h3>
              <p className="mt-4 text-gray-700 text-lg leading-8">
                India is undergoing a significant shift toward electromobility...
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="rounded-3xl bg-white border p-8 shadow-md"
            >
              <h3 className="text-2xl font-semibold">Mission</h3>
              <p className="mt-4 text-gray-700 text-lg leading-8">
                To establish electric mobility as the most trusted alternative...
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CMD SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4">
          <img
            src="/prashantsir.jpg"
            className="mx-auto w-52 h-52 rounded-full object-contain shadow-xl ring-4 ring-emerald-500"
          />

          <div className="mt-10 bg-white border rounded-3xl p-10 shadow-xl text-left">
            <span className="badge">CMD</span>

            <h3 className="heading mt-4">Prashant Vashishtha</h3>

            <p className="mt-6 text-gray-700 text-lg leading-8">
              Mr. Vashishtha, a management graduate...
            </p>

            <blockquote className="mt-8 border-l-4 border-emerald-500 pl-6 italic text-xl">
              “We're not just Mobility; we're the future of the future.”
            </blockquote>
          </div>
        </div>
      </section>
    </div>
  );
}
