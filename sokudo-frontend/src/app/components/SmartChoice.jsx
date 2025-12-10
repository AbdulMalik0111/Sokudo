import { motion } from "framer-motion";

export default function DealerBenefits() {
  const benefits = [
    {
      title: "High Profit Margins",
      desc: "Earn exceptional returns with industry-leading profit margins on every sale.",
      icon: "💰",
    },
    {
      title: "Strong Brand Support",
      desc: "Get complete marketing, training, and operational support from our team.",
      icon: "🤝",
    },
    {
      title: "Fast-Growing Market",
      desc: "Join the booming EV ecosystem with high demand in every region.",
      icon: "⚡",
    },
    {
      title: "Exclusive Regional Rights",
      desc: "Become the exclusive seller in your selected territory for maximum growth.",
      icon: "📍",
    },
  ];

  return (
    <section className="w-full py-24 relative overflow-hidden bg-gray-50 dark:bg-gray-900">
      
      {/* CENTER CIRCLE */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative mx-auto w-[300px] h-[300px] md:w-[420px] md:h-[420px] rounded-full bg-gradient-to-br z-20 from-yellow-600 to-cyan-400 shadow-xl flex items-center justify-center text-center text-white text-2xl md:text-3xl font-bold"
      >
        Why Becoming a <br /> Sokudo Dealer is <br /> a Smart Choice
      </motion.div>

      {/* DASHED CIRCLE */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[520px] h-[520px] md:w-[680px] md:h-[680px] rounded-full border-4 border-dashed border-yellow-500/40 animate-spin-slow"></div>
      </div>

      {/* BENEFIT CARDS */}
      <div className="relative max-w-6xl mx-auto mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300"
            >
              {/* CONNECTING LINE */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-1 h-10 border-l-2 border-dashed border-yellow-500"></div>

              <div className="text-5xl mb-4 text-yellow-600 text-center">{b.icon}</div>
              <h3 className="text-xl text-center font-semibold text-gray-800 dark:text-white mb-2">
                {b.title}
              </h3>
              <p className="text-center text-gray-600 dark:text-gray-300">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* BUTTON */}
     <motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7 }}
  viewport={{ once: true }}
  className="text-center mt-16"
>
  <button
    onClick={() => {
      const formSection = document.getElementById("dealershipForm");
      formSection?.scrollIntoView({ behavior: "smooth", block: "start" });
    }}
    className="btn inline-block px-12 py-4 rounded-xl bg-yellow-600 hover:bg-black text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
  >
    Apply for Dealership
  </button>
</motion.div>

    </section>
  );
}
