
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';

const TeamPage = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  return (
    <>
      <Helmet>
        <title>Our Team - Bharatiya Youth Parliament</title>
        <meta name="description" content="Meet the dedicated teams behind the Bharatiya Youth Parliament, including the Organization and Reception Committees." />
      </Helmet>

      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            {...fadeIn}
            className="text-center mb-16"
          >
            <h1 className="font-poppins font-bold text-4xl md:text-5xl text-gray-900 mb-6">
              Our <span className="text-[#a0291f]">Team</span>
            </h1>
            <p className="font-merriweather text-lg text-gray-700 max-w-3xl mx-auto">
              The driving force behind the Bharatiya Youth Parliament, comprised of dedicated committees ensuring the event's success.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              {...fadeIn}
              transition={{ delay: 0.2 }}
              className="bg-gray-50 p-8 rounded-lg shadow-md text-center flex flex-col items-center"
            >
              <Users className="text-[#a0291f] mb-4" size={48} />
              <h2 id="organization" className="font-poppins font-bold text-3xl text-gray-900 mb-4">Organization Committee</h2>
              <p className="font-merriweather text-gray-600 mb-6 flex-grow">
                The core team responsible for the strategic planning, management, and execution of all BYP events and initiatives.
              </p>
              <Link to="/team/organizing-committee">
                <Button className="bg-[#a0291f] hover:bg-[#7a1f17] text-white font-poppins font-semibold rounded-xl">
                  View Committee
                </Button>
              </Link>
            </motion.div>

            <motion.div
              {...fadeIn}
              transition={{ delay: 0.4 }}
              className="bg-gray-50 p-8 rounded-lg shadow-md text-center flex flex-col items-center"
            >
              <Users className="text-[#a0291f] mb-4" size={48} />
              <h2 id="reception" className="font-poppins font-bold text-3xl text-gray-900 mb-4">Reception Committee</h2>
              <p className="font-merriweather text-gray-600 mb-6 flex-grow">
                The welcoming team dedicated to ensuring a seamless and positive experience for all our participants, speakers, and guests.
              </p>
              <Link to="/team/reception-committee">
                <Button className="bg-[#a0291f] hover:bg-[#7a1f17] text-white font-poppins font-semibold rounded-xl">
                  View Committee
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TeamPage;
