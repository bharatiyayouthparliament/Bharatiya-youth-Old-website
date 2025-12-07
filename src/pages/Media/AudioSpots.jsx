import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { Loader2, Music } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 }
};

const AudioSpots = () => {
  const [audios, setAudios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "audios"),
      where("status", "==", "Published")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        let list = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        list = list.map(a => ({
          ...a,
          createdAtValue: a.createdAt?.toDate
            ? a.createdAt.toDate().getTime()
            : new Date("2000-01-01").getTime()
        }));

        list.sort((a, b) => b.createdAtValue - a.createdAtValue);

        setAudios(list);
        setLoading(false);
      },
      (err) => {
        console.error("Error loading audio:", err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Helmet>
        <title>Audio Spots - Bharatiya Youth Parliament</title>
        <meta name="description" content="Listen to BYP audio announcements, radio spots, and impactful audio stories." />
      </Helmet>

      {/* HERO */}
      <section
        className="relative w-full bg-center bg-cover bg-no-repeat py-20 md:py-32"
        style={{ backgroundImage: "url('/image/cover.jpg')" }}
      >
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-3xl mx-auto px-4"
        >
          <h1 className="font-poppins font-bold text-3xl md:text-5xl text-white mb-3">
            <span className="text-[#a0291f]">Audio Spots</span>
          </h1>

          <p className="font-merriweather text-sm md:text-lg text-black max-w-2xl mx-auto">
            Explore impactful radio spots and official BYP announcements.
          </p>
        </motion.div>
      </section>

      {/* AUDIO LIST */}
      <section className="bg-white py-14 md:py-20 min-h-[50vh]">
        <div className="container mx-auto px-4 max-w-5xl">

          {/* Loading */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="animate-spin text-[#a0291f]" size={40} />
            </div>
          )}

          {/* Empty */}
          {!loading && audios.length === 0 && (
            <div className="text-center py-10">
              <Music className="mx-auto text-gray-300 mb-4" size={64} />
              <p className="text-gray-500 font-poppins text-lg">
                No published audio spots available yet.
              </p>
            </div>
          )}

          {/* GRID: TWO PER ROW */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {!loading &&
              audios.map((audio) => (
                <motion.div
                  key={audio.id}
                  {...fadeIn}
                  className="bg-gray-50 border border-gray-200 p-6 rounded-xl shadow-md hover:shadow-lg transition-all flex flex-col h-full"
                >
                  {/* Square thumbnail */}
                  <div className="w-full aspect-square rounded-lg overflow-hidden border mb-4">
                    <img
                      src={audio.thumbnail}
                      alt="thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Card content */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-poppins font-semibold text-xl text-[#a0291f]">
                        {audio.title}
                      </h3>
                      <span className="text-xs bg-white border px-2 py-1 rounded text-gray-600">
                        {audio.category}
                      </span>
                    </div>

                    <p className="font-merriweather text-gray-700 text-sm mb-2 line-clamp-3">
                      {audio.description}
                    </p>

                    <div className="text-xs text-gray-400 mb-4">
                      {audio.createdAt?.toDate
                        ? audio.createdAt.toDate().toLocaleDateString()
                        : "Recent"}
                      {audio.fileSize && <> • {audio.fileSize}</>}
                    </div>

                    {/* Player */}
                    <div className="bg-white p-2 rounded-lg border shadow-inner mt-auto">
                      <audio controls controlsList="nodownload" className="w-full">
                        <source src={audio.audioUrl} type="audio/mpeg" />
                        Your browser does not support the audio tag.
                      </audio>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AudioSpots;
