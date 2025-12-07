import React from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 },
};

const NewsClippings = () => {
  const clippings = [
    {
      image: "/news/news1.jpg",
      title: "Coverage on Bharatiya Youth Parliament",
      description: "Leading newspapers highlighted youth leadership and national participation.",
    },
    {
      image: "/news/news2.jpg",
      title: "Youth Empowerment Feature",
      description: "Media spotlight on BYP’s impactful discussions and youth policy reforms.",
    },
    {
      image: "/news/news3.jpg",
      title: "National Media Coverage",
      description: "Major news agencies covered BYP’s cultural and leadership initiatives.",
    },
  ];

  const videos = [
    "https://www.youtube.com/embed/dQw4w9WgXcQ",
    "https://www.youtube.com/embed/ysz5S6PUM-U",
  ];

  return (
    <>
      <Helmet>
        <title>News Clippings - Bharatiya Youth Parliament</title>
        <meta
          name="description"
          content="Browse national media coverage, press reports, and official news clippings about Bharatiya Youth Parliament."
        />
      </Helmet>

      {/* ================================
          HERO SECTION (ONLY ACTIVE SECTION)
      =================================== */}
      <section
        className="relative w-full bg-center bg-cover bg-no-repeat py-24 md:py-32"
        style={{ backgroundImage: `url('/image/cover.jpg')` }}
      >
        <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px]"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-3xl mx-auto px-4"
        >
          <h1 className="font-poppins font-bold text-4xl md:text-5xl text-white mb-4 drop-shadow-[0_0_10px_rgba(0,0,0,0.6)]">
            <span className="text-[#a0291f]">News Clippings</span>
          </h1>

          <p className="font-merriweather text-base md:text-lg text-black drop-shadow-[0_0_8px_rgba(0,0,0,0.6)] max-w-2xl mx-auto">
            Explore national media coverage, newspaper highlights, and press recognition of BYP.
          </p>
        </motion.div>
      </section>

      {/*
      ================================
          YOUTUBE VIDEO SECTION — COMMENTED OUT
      ===================================

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <motion.h2 {...fadeIn} className="text-3xl md:text-4xl font-poppins font-bold text-center mb-10">
            Featured <span className="text-[#a0291f]">News Videos</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {videos.map((link, i) => (
              <motion.div key={i} {...fadeIn} className="rounded-xl overflow-hidden shadow-lg">
                <iframe
                  className="w-full h-64 md:h-80 rounded-xl"
                  src={link}
                  title={`News Video ${i}`}
                  allowFullScreen
                ></iframe>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      */}

      {/*
      ================================
          NEWS CLIPPINGS GRID — COMMENTED OUT
      ===================================

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2 {...fadeIn} className="text-3xl md:text-4xl font-poppins font-bold text-center text-black mb-14">
            Newspaper <span className="text-[#a0291f]">Clippings</span>
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {clippings.map((item, i) => (
              <motion.div key={i} {...fadeIn} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                <img src={item.image} className="w-full h-64 object-cover" />

                <div className="p-4">
                  <h3 className="font-poppins text-lg font-semibold text-[#a0291f] mb-2">{item.title}</h3>
                  <p className="font-merriweather text-gray-700 text-sm">{item.description}</p>
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

export default NewsClippings;
