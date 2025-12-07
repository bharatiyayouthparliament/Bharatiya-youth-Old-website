import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { db } from "@/firebase"; // DO NOT CHANGE THIS PATH
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";

const MediaPage = () => {
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "media"), orderBy("created_at", "desc"));

    const unsub = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMediaItems(items);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return (
    <>
      <Helmet>
        <title>Media - Bharatiya Youth Parliament</title>
        <meta
          name="description"
          content="Explore media coverage, photos, and galleries from Bharatiya Youth Parliament events."
        />
      </Helmet>

      {/* HERO SECTION */}
      <section
        className="relative w-full bg-center bg-cover bg-no-repeat py-28"
        style={{
          backgroundImage: `url('/image/cover.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px]"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-3xl mx-auto px-4"
        >
          <h1 className="font-poppins font-bold text-5xl text-white mb-4 drop-shadow-xl">
            <span className="text-[#a0291f]">Gallery</span>
          </h1>
          <p className="font-merriweather text-lg text-black drop-shadow max-w-2xl mx-auto">
            Explore our collection of photos and media from BYP events.
          </p>
        </motion.div>
      </section>

      {/* MEDIA GRID */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            // SKELETON LOADER
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-lg overflow-hidden shadow-sm border p-4">
                  <Skeleton className="h-64 w-full mb-4" />
                  <Skeleton className="h-6 w-1/2 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          ) : mediaItems.length === 0 ? (
            <p className="text-center text-gray-600 text-lg font-merriweather">
              No media uploaded yet.
            </p>
          ) : (
            // MEDIA ITEMS
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mediaItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 * index }}
                  className="cursor-pointer hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden bg-white"
                >
                  <img
                    src={item.file_url}
                    alt={item.caption}
                    className="w-full h-64 object-cover"
                    loading="lazy"
                  />

                  <div className="p-4">
                    <h3 className="font-poppins font-semibold text-xl text-gray-900">
                      {item.caption}
                    </h3>
                    {item.description && (
                      <p className="font-merriweather text-gray-700 mt-2">
                        {item.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default MediaPage;
