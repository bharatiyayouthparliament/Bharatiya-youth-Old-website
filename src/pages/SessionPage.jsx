
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';

const SessionPage = () => {
  const { toast } = useToast();

  React.useEffect(() => {
    toast({
      title: "🚧 Page Under Construction 🚧",
      description: "This page isn't fully implemented yet. You can request its completion in a future prompt!",
    });
  }, [toast]);

  return (
    <>
      <Helmet>
        <title>Our Sessions - Bharatiya Youth Parliament</title>
        <meta name="description" content="Details about the past and upcoming sessions of the Bharatiya Youth Parliament." />
      </Helmet>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="font-poppins font-bold text-4xl md:text-5xl text-gray-900 mb-6">
              Parliamentary <span className="text-[#a0291f]">Sessions</span>
            </h1>
            <p className="font-merriweather text-lg text-gray-700 max-w-3xl mx-auto">
              A history of our impactful parliamentary sessions.
            </p>
          </motion.div>

          <div className="space-y-12">
            <div id="4th">
              <h2 className="font-poppins font-bold text-3xl text-gray-900 mb-4">4th Session – Organized by SRRO</h2>
              <p className="font-merriweather text-gray-600">Details about the 4th session will be available here soon.</p>
            </div>
            <div id="3rd">
              <h2 className="font-poppins font-bold text-3xl text-gray-900 mb-4">3rd Session – Organized as VDS</h2>
              <p className="font-merriweather text-gray-600">Details about the 3rd session will be available here soon.</p>
            </div>
            <div id="2nd">
              <h2 className="font-poppins font-bold text-3xl text-gray-900 mb-4">2nd Session – Organized as VDS</h2>
              <p className="font-merriweather text-gray-600">Details about the 2nd session will be available here soon.</p>
            </div>
            <div id="1st">
              <h2 className="font-poppins font-bold text-3xl text-gray-900 mb-4">1st Session – Organized as VDS</h2>
              <p className="font-merriweather text-gray-600">Details about the 1st session will be available here soon.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SessionPage;
