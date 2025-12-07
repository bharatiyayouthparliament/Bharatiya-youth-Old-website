
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import SpeakersCarousel from '@/components/events/SpeakersCarousel';
import GalleryGrid from '@/components/events/GalleryGrid';
import { Calendar, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SessionPageTemplate = ({ eventData }) => {
  const { title, subtitle, date, venue, description, speakers, gallery, patron } = eventData;

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // Only show hero image if it's explicitly set or there's a gallery item with 'hero' placement
  const heroImageItem = gallery.find(item => item.placement === 'hero');
  const backgroundImageUrl = heroImageItem ? heroImageItem.image : 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop';
  const showHeroSection = heroImageItem || title.includes("4th Session"); // Default hero for 4th session if no specific hero image


  return (
    <>
      <Helmet>
        <title>{title} - Bharatiya Youth Parliament</title>
        <meta name="description" content={`Details about the ${title}, held at ${venue}.`} />
      </Helmet>

      {/* Hero Section - Conditional rendering based on showHeroSection */}
      {showHeroSection && (
        <motion.div
          className="relative h-[60vh] bg-cover bg-center text-white flex items-center justify-center"
          style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${backgroundImageUrl})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="text-center p-4">
            <motion.h1
              className="text-4xl md:text-6xl font-extrabold font-poppins mb-4"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              {title}
            </motion.h1>
            <motion.p className="text-lg md:text-2xl font-merriweather mb-6" variants={fadeIn} initial="hidden" animate="visible" style={{ transitionDelay: '0.2s' }}>
              {subtitle}
            </motion.p>
            <motion.div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-6 text-base" variants={fadeIn} initial="hidden" animate="visible" style={{ transitionDelay: '0.4s' }}>
              <div className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                <span>{date}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                <span>{venue}</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}


      <div className="container mx-auto px-4 py-8">
        {/* Description Section */}
        <motion.section className="max-w-4xl mx-auto text-center mb-16" variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-merriweather">
            {description}
          </p>
        </motion.section>

        {/* Speakers Section - Conditional rendering */}
        {speakers && speakers.length > 0 && (
          <motion.section className="mb-16" variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-[#a0291f] font-poppins">⭐ Esteemed Speakers</h2>
            <SpeakersCarousel speakers={speakers} />
          </motion.section>
        )}

        {/* Gallery Section - Conditional rendering */}
        {gallery && gallery.length > 0 && (
          <motion.section className="mb-16" variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-[#a0291f] font-poppins">📸 Session Gallery</h2>
            <GalleryGrid images={gallery} />
          </motion.section>
        )}

        {/* Patron Section - Conditional rendering */}
        {patron && (
           <motion.section className="mb-16" variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
             <Card className="bg-gray-50 border-gray-200">
                <CardHeader>
                  <CardTitle className="text-3xl md:text-4xl font-bold text-center text-[#a0291f] font-poppins">🎖️ Our Patrons</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none text-gray-700 leading-relaxed font-merriweather text-justify">
                    {patron.split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </CardContent>
             </Card>
           </motion.section>
        )}
      </div>
    </>
  );
};

export default SessionPageTemplate;
