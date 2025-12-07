
import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft } from 'lucide-react';

const MediaDetailPage = () => {
  const { id } = useParams();
  const { toast } = useToast();

  React.useEffect(() => {
    toast({
      title: "🚧 Page Under Construction 🚧",
      description: "This is a placeholder page. Dynamic content loading can be requested next!",
    });
  }, [toast]);

  // Placeholder data
  const mediaItem = {
    id,
    caption: `Media Item Caption for ID: ${id}`,
    description: `This is a placeholder description for the media item. In a real application, this content would be fetched from a database. It could be a photo gallery, a video, or a press release.`,
  };

  return (
    <>
      <Helmet>
        <title>{mediaItem.caption} - Media Gallery</title>
        <meta name="description" content={mediaItem.description} />
      </Helmet>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link to="/media" className="flex items-center text-gray-600 hover:text-[#a0291f] mb-8 font-poppins font-medium">
              <ArrowLeft size={20} className="mr-2" />
              Back to Media Gallery
            </Link>

            <h1 className="font-poppins font-bold text-4xl md:text-5xl text-gray-900 mb-4">
              {mediaItem.caption}
            </h1>

            <img alt={mediaItem.caption} class="w-full h-auto rounded-lg shadow-lg mb-8" src="https://images.unsplash.com/photo-1698602791214-48dcb92f33ac" />

            <p className="font-merriweather text-lg text-gray-700 mb-8">
              {mediaItem.description}
            </p>

            <div className="text-center p-8 border-dashed border-2 border-gray-300 rounded-lg">
              <p className="font-merriweather text-gray-600">
                Additional content, such as a photo gallery or video player, would be displayed here.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default MediaDetailPage;
