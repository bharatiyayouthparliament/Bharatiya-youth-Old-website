import React from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 },
};

const BYPCreative = () => {
  const creatives = [
    {
      image: "/creative/poster1.jpg",
      title: "BYP Promotional Poster",
      description: "Official creative representing the spirit of Bharatiya Youth Parliament.",
    },
    {
      image: "/creative/poster2.jpg",
      title: "Leadership Theme Poster",
      description: "Creative highlighting youth empowerment and leadership initiatives.",
    },
    {
      image: "/creative/poster3.jpg",
      title: "BYP Inspiration Artwork",
      description: "Conceptual artwork celebrating Swami Vivekananda’s timeless message.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>BYP Creative - Bharatiya Youth Parliament</title>
        <meta
          name="description"
          content="Explore official posters, creatives, branding visuals, and conceptual artworks of Bharatiya Youth Parliament."
        />
      </Helmet>

      {/* ================================
          HERO SECTION (ONLY ACTIVE)
      =================================== */}
      <section
        className="relative w-full bg-center bg-cover bg-no-repeat py-24 md:py-32"
        style={{ backgroundImage: `url('/image/cover.jpg')` }}
      >
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-3xl mx-auto px-4"
        >
          <h1 className="font-poppins font-bold text-4xl md:text-5xl text-white mb-4 drop-shadow-[0_0_10px_rgba(0,0,0,0.6)]">
            <span className="text-[#a0291f]">BYP Creative</span>
          </h1>

          <p className="font-merriweather text-base md:text-lg text-black max-w-2xl mx-auto drop-shadow-[0_0_8px_rgba(0,0,0,0.6)]">
            Browse posters, digital creatives, branding materials and artworks representing the vision of Bharatiya Youth Parliament.
          </p>
        </motion.div>
      </section>

      {/*
      ================================
          CREATIVE GRID SECTION — COMMENTED OUT
      ===================================

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">

          <motion.h2
            {...fadeIn}
            className="text-3xl md:text-4xl font-poppins font-bold text-center text-black mb-14"
          >
            Official <span className="text-[#a0291f]">Creatives</span>
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {creatives.map((item, i) => (
              <motion.div
                key={i}
                {...fadeIn}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-all"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover"
                />

                <div className="p-4">
                  <h3 className="font-poppins text-lg font-semibold text-[#a0291f] mb-2">
                    {item.title}
                  </h3>
                  <p className="font-merriweather text-gray-700 text-sm">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
      */}

    </>
  );
};

export default BYPCreative;
