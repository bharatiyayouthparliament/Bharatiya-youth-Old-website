
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { allEvents } from '@/utils/eventData';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const ParliamentarySessionsPage = () => {
  const sortedEvents = [...allEvents].sort((a, b) => parseInt(b.id) - parseInt(a.id));

  return (
    <>
      <Helmet>
        <title>Parliamentary Sessions - Bharatiya Youth Parliament</title>
        <meta name="description" content="A history of our impactful parliamentary sessions." />
      </Helmet>
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#a0291f] font-poppins">Parliamentary Sessions</h1>
            <p className="mt-4 text-lg text-gray-600 font-merriweather">A history of our impactful parliamentary sessions.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sortedEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                   <div className="relative h-48 w-full overflow-hidden">
                       <img 
                          class="w-full h-full object-cover" 
                          alt={`Image for ${event.title}`}
                         src="https://images.unsplash.com/photo-1648999599621-2cb444c49236" />
                   </div>
                  <CardHeader>
                    <CardTitle className="font-poppins text-2xl text-[#a0291f]">{event.title}</CardTitle>
                    <CardDescription className="font-merriweather">{event.date} &bull; {event.venue}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-gray-700 font-merriweather line-clamp-3">{event.description}</p>
                  </CardContent>
                  <div className="p-6 pt-0">
                    <Link to={event.slug}>
                      <Button className="w-full bg-[#a0291f] hover:bg-[#8a241b]">
                        View Details <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ParliamentarySessionsPage;
