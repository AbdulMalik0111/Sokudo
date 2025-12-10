import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const leftFeatures = [
   { id: 1, icon: "⚡", text: "High Power Extension", angle: -37 },
  { id: 2, icon: "🔋", text: "Upto 120Km Range", angle: -16 },
  { id: 3, icon: "⏱️", text: "Highly Charged upto 1.5 Hr", angle: 8 },
  { id: 4, icon: "🧰", text: "2 Yrs Warranty", angle: 35 },
];

const rightFeatures = [
   { id: 5, icon: "💻", text: "Digitalized Control", angle: 35 },
  { id: 6, icon: "🔌", text: "Heavy Backup Battery", angle: 8 },
  { id: 7, icon: "⚙️", text: "Multirange Functional Control", angle: -16 },
  { id: 8, icon: "🕹️", text: "HMI Controllers", angle: -37 },
];

const FeatureItem = ({ icon, text, isLeft, angle, radius = 350, delay = 0 }) => {
  const rad = (angle * Math.PI) / 180;
  const x = radius * Math.cos(rad) * (isLeft ? -1 : 1);
  const y = radius * Math.sin(rad);

  return (
    <motion.div
      className="absolute flex items-center w-48 sm:w-52"
      style={{
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
      }}
      variants={{
        hidden: { opacity: 0, rotate: isLeft ? -90 : 90, x: 0, y: 0 },
        visible: {
          opacity: 1,
          rotate: 0,
          x,
          y,
          transition: { duration: 0.8, delay, ease: "easeOut" },
        },
      }}
    >
      {isLeft && (
        <p className="mr-2 text-right text-gray-800 text-sm sm:text-base font-medium">
          {text}
        </p>
      )}
      <motion.div
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black flex items-center justify-center text-white text-lg sm:text-xl shadow-md"
        whileHover={{ scale: 1.2, rotate: 15 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        {icon}
      </motion.div>
      {!isLeft && (
        <p className="ml-2 text-left text-gray-800 text-sm sm:text-base font-medium">
          {text}
        </p>
      )}
    </motion.div>
  );
};

const ScooterFeatureComponent = ({ scooterImage }) => {
  const defaultImage = "/red.png";

  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true, // ✅ animation runs only once
  });

  React.useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  return (
    <section
      ref={ref}
      className="bg-[#f3f4f6] flex flex-col items-center justify-center py-10 overflow-hidden"
    >
      {/* Heading */}
      <motion.h2
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Choose Your Scooter
      </motion.h2>

      {/* 🛵 Desktop layout (with circular animation) */}
      <motion.div
        className="relative hidden sm:flex justify-center items-center w-full max-w-7xl h-[400px] sm:h-[500px] md:h-[520px]"
        initial="hidden"
        animate={controls}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
      >
        {/* Left Features */}
        {leftFeatures.map((feature, index) => (
          <FeatureItem
            key={feature.id}
            {...feature}
            isLeft={true}
            delay={index * 0.2}
          />
        ))}

        {/* Center Scooter (desktop only) */}
        <motion.div
          className="relative z-10 -translate-y-2 sm:-translate-y-6 md:-translate-y-8"
          variants={{
            hidden: { opacity: 0, scale: 0.6, rotate: -15 },
            visible: {
              opacity: 1,
              scale: 1,
              rotate: 0,
              transition: { duration: 0.8, ease: "easeOut" },
            },
          }}
          whileHover={{ scale: 1.08 }}
        >
          <img
            src={scooterImage || defaultImage}
            alt="Scooter"
            className="w-[260px] sm:w-[350px] md:w-[380px] h-auto object-contain drop-shadow-2xl"
          />
        </motion.div>

        {/* Right Features */}
        {rightFeatures.map((feature, index) => (
          <FeatureItem
            key={feature.id}
            {...feature}
            isLeft={false}
            delay={index * 0.2}
          />
        ))}
      </motion.div>

      {/* 🛵 Mobile View — image & list below */}
      <div className="flex flex-col sm:hidden items-center">
        <motion.img
          src={scooterImage || defaultImage}
          alt="Scooter"
          className="w-[250px] h-auto object-contain mb-4 drop-shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        />

        <div className="grid grid-cols-2 gap-3 mt-4 px-6">
          {[...leftFeatures, ...rightFeatures].map((feature) => (
            <motion.div
              key={feature.id}
              className="flex items-center gap-2 bg-white rounded-xl shadow p-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: feature.id * 0.05 }}
            >
              <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white text-base">
                {feature.icon}
              </div>
              <p className="text-gray-700 text-sm font-medium">{feature.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScooterFeatureComponent;
