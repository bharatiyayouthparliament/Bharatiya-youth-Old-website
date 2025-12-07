import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

const AwardsPage = () => {
  return (
    <>
      <Helmet>
        <title>Swami Vivekananda Award - Bharatiya Youth Parliament</title>
        <meta
          name="description"
          content="Swami Vivekananda Awards at Bharatiya Youth Parliament honor exceptional individuals contributing to Environment, Peace, and Social Service."
        />
      </Helmet>

      {/* -----------------------------------
          HERO BACKGROUND SECTION
      ------------------------------------ */}
      <section
        className="relative w-full bg-center bg-cover bg-no-repeat py-20 md:py-28"
        style={{
          backgroundImage: `url('/image/cover.jpg')`, // <-- ADD YOUR HEADER IMAGE HERE
        }}
      >
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-3xl mx-auto px-4"
        >
          <h1 className="font-poppins font-bold text-3xl md:text-5xl text-white mb-4">
            <span className="text-[#a0291f]">Swami Vivekananda Awards</span>
          </h1>

          <p className="font-merriweather text-sm md:text-lg text-black max-w-2xl mx-auto leading-relaxed">
            Honoring distinguished individuals who embody the ideals of Swami Vivekananda through service,
            peace, and sustainable development.
          </p>
        </motion.div>
      </section>

      {/* -----------------------------------
          PAGE CONTENT
      ------------------------------------ */}
      <section className="bg-white py-12 sm:py-14 md:py-16">
        <div className="container mx-auto px-4">

          {/* ABOUT SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/60 backdrop-blur-md border border-black/10 p-6 sm:p-8 md:p-10 rounded-3xl shadow-xl mb-14"
          >
            <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-gray-900 mb-4">
              ✨ About the Awards
            </h2>

            <p className="font-merriweather text-gray-700 text-sm sm:text-base leading-relaxed">
              The Swami Vivekananda Awards celebrate outstanding individuals whose work reflects
              selfless service, peace-building efforts, and environmental conservation.
              <br /><br />
              A dedicated Selection Committee—comprising experts from academic, social, and cultural
              backgrounds—evaluates nominations through a transparent and merit-based process to honor
              the most deserving leaders.
            </p>
          </motion.div>

          {/* CATEGORY SECTION HEADER */}
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-center mb-10 text-gray-900">
            Vivekananda Award Categories
          </h2>

          {/* CATEGORIES */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 mb-20">

            {/* ENVIRONMENT */}
            <div className="bg-white p-6 sm:p-8 shadow-md border border-gray-200 rounded-2xl hover:shadow-xl transition">
              <h3 className="font-poppins text-xl sm:text-2xl text-[#a0291f] mb-4">🌿 Environment</h3>
              <p className="text-gray-700 font-merriweather text-sm sm:text-base leading-relaxed">
                a. Environmental protection initiatives <br />
                b. Water conservation & afforestation <br />
                c. Pollution reduction (air, water, noise) <br />
                d. Climate & anti-plastic campaigns
              </p>
            </div>

            {/* PEACE */}
            <div className="bg-white p-6 sm:p-8 shadow-md border border-gray-200 rounded-2xl hover:shadow-xl transition">
              <h3 className="font-poppins text-xl sm:text-2xl text-[#a0291f] mb-4">🕊 Peace</h3>
              <p className="text-gray-700 font-merriweather text-sm sm:text-base leading-relaxed">
                a. Spiritual harmony & unity promotion <br />
                b. Peace education & brotherhood <br />
                c. Social conflict resolution <br />
                d. Value-based harmony
              </p>
            </div>

            {/* SOCIAL SERVICE */}
            <div className="bg-white p-6 sm:p-8 shadow-md border border-gray-200 rounded-2xl hover:shadow-xl transition">
              <h3 className="font-poppins text-xl sm:text-2xl text-[#a0291f] mb-4">🤝 Social Service</h3>
              <p className="text-gray-700 font-merriweather text-sm sm:text-base leading-relaxed">
                a. Humanitarian & relief work <br />
                b. Support for elderly, children & specially abled <br />
                c. Medical, disability & crisis support <br />
                d. Pandemic & emergency help
              </p>
            </div>

          </div>

          {/* SELECTION PROCESS */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="bg-gradient-to-r from-[#9C1F17] to-[#C43B30] text-white p-8 sm:p-10 md:p-12 rounded-3xl shadow-xl"
          >
            <h2 className="font-poppins font-bold text-3xl sm:text-4xl mb-6">
              Award Selection Process
            </h2>

            <p className="font-merriweather text-white/90 text-sm sm:text-base leading-relaxed mb-10">
              The Selection Committee evaluates nominations on measurable impact, social value, 
              leadership qualities, and contribution to humanity.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">

              <motion.div whileHover={{ scale: 1.05 }} className="bg-white/10 p-6 rounded-2xl border border-white/20">
                <h3 className="font-poppins text-lg sm:text-xl mb-3">📘 Evaluation Criteria</h3>
                <p className="font-merriweather text-white/90 text-sm sm:text-base">
                  Sustainability & measurable social impact.
                </p>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} className="bg-white/10 p-6 rounded-2xl border border-white/20">
                <h3 className="font-poppins text-lg sm:text-xl mb-3">🌟 Leadership</h3>
                <p className="font-merriweather text-white/90 text-sm sm:text-base">
                  Inspirational & transformative leadership.
                </p>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} className="bg-white/10 p-6 rounded-2xl border border-white/20">
                <h3 className="font-poppins text-lg sm:text-xl mb-3">🕊 Social Responsibility</h3>
                <p className="font-merriweather text-white/90 text-sm sm:text-base">
                  Contribution to peace & community upliftment.
                </p>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
};

export default AwardsPage;
