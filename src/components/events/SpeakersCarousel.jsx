
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const SpeakersCarousel = ({ speakers }) => {
  const [index, setIndex] = useState(0);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 768px)");
  
  let itemsPerPage = 1;
  if(isDesktop) itemsPerPage = 4;
  else if (isTablet) itemsPerPage = 2;

  const totalPages = Math.ceil(speakers.length / itemsPerPage);

  const paginate = (newDirection) => {
    setIndex((prevIndex) => (prevIndex + newDirection + totalPages) % totalPages);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const startIndex = index * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSpeakers = speakers.slice(startIndex, endIndex);

  return (
    <div className="relative w-full max-w-6xl mx-auto overflow-hidden">
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            <AnimatePresence initial={false}>
              {currentSpeakers.map((speaker, i) => (
                <motion.div
                  key={startIndex + i}
                  custom={i}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: 'spring', stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="w-full"
                >
                  <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="aspect-[3/4] overflow-hidden">
                       <img class="w-full h-full object-cover" alt={speaker.name} src="https://images.unsplash.com/photo-1595500982573-a1132d41df41" />
                    </div>
                    <CardContent className="p-4 text-center">
                      <h3 className="text-lg font-bold font-poppins">{speaker.name}</h3>
                      {speaker.designation && <p className="text-sm text-gray-600 font-merriweather">{speaker.designation}</p>}
                       {speaker.timeSlot && <p className="text-xs text-[#a0291f] font-semibold mt-2">{speaker.timeSlot}</p>}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
        </div>
      </div>

      <button
        onClick={() => paginate(-1)}
        className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-10"
      >
        <ArrowLeft className="h-6 w-6 text-[#a0291f]" />
      </button>
      <button
        onClick={() => paginate(1)}
        className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-10"
      >
        <ArrowRight className="h-6 w-6 text-[#a0291f]" />
      </button>
    </div>
  );
};

export default SpeakersCarousel;
