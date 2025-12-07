import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

// FIREBASE IMPORTS
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../../firebase"; // Adjusting path based on your structure

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 },
};

const VideoSpots = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Fetch Published Videos from Firestore ---
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // Query: Videos that are 'Published', sorted by date (newest first)
        const q = query(
          collection(db, "videos"), 
          where("status", "==", "Published"),
          orderBy("publishDate", "desc")
        );
        
        const querySnapshot = await getDocs(q);
        const videoList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setVideos(videoList);
      } catch (error) {
        console.error("Error fetching video spots:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // --- Helper: Convert YouTube URL to Embed URL ---
  const getYoutubeEmbedUrl = (url) => {
    if (!url) return "";
    // Regex to extract Video ID
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const id = (match && match[2].length === 11) ? match[2] : null;
    
    // Return embed URL
    return id ? `https://www.youtube.com/embed/${id}` : "";
  };

  return (
    <>
      <Helmet>
        <title>Video Spots - Bharatiya Youth Parliament</title>
        <meta
          name="description"
          content="Watch promotional videos, event highlights, and impactful visual content from Bharatiya Youth Parliament."
        />
      </Helmet>

      {/* ================================
          HERO SECTION
      =================================== */}
      <section
        className="relative w-full bg-center bg-cover bg-no-repeat py-20 md:py-32"
        style={{ backgroundImage: `url('/image/cover.jpg')` }}
      >
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-3xl mx-auto px-4"
        >
          <h1 className="font-poppins font-bold text-3xl md:text-5xl text-white mb-3 md:mb-4 drop-shadow-[0_0_10px_rgba(0,0,0,0.6)]">
            <span className="text-[#a0291f]">Video Spots</span>
          </h1>

          <p className="font-merriweather text-sm md:text-lg text-black drop-shadow-[0_0_8px_rgba(0,0,0,0.6)] max-w-2xl mx-auto">
            Explore event highlights, promotional films, and impactful video stories from BYP.
          </p>
        </motion.div>
      </section>

      {/* ===========================================================
          VIDEO GRID SECTION (ACTIVE & CONNECTED TO DB)
      =========================================================== */}
      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          
          {loading ? (
             <div className="flex justify-center py-12">
               <p className="text-gray-500 font-poppins animate-pulse">Loading videos...</p>
             </div>
          ) : videos.length === 0 ? (
             <div className="text-center py-12 text-gray-500 font-poppins">
               No videos available at the moment.
             </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12">
              {videos.map((video) => {
                const embedUrl = getYoutubeEmbedUrl(video.youtubeUrl);
                
                return (
                  <motion.div
                    key={video.id}
                    {...fadeIn}
                    className="flex flex-col rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all bg-white border border-gray-100"
                  >
                    {/* YouTube Iframe Container - Responsive Aspect Ratio (16:9) */}
                    <div className="relative w-full pt-[56.25%] bg-black">
                       {embedUrl ? (
                         <iframe
                           className="absolute top-0 left-0 w-full h-full"
                           src={embedUrl}
                           title={video.title}
                           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                           allowFullScreen
                         ></iframe>
                       ) : (
                         <div className="absolute inset-0 flex items-center justify-center text-white bg-gray-800">
                           <p>Video Unavailable</p>
                         </div>
                       )}
                    </div>

                    {/* Video Content/Meta */}
                    <div className="p-5">
                      <h3 className="font-poppins font-bold text-lg md:text-xl text-gray-800 mb-2">
                        {video.title}
                      </h3>
                      {video.description && (
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {video.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between text-xs text-gray-400 font-medium mt-auto">
                        <span>Published: {video.publishDate}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

        </div>
      </section>
    </>
  );
};

export default VideoSpots;