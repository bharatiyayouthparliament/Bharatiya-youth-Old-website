import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { db } from "@/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";

const SpeakersPage = () => {
  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "speakers"), orderBy("created_at", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setSpeakers(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return (
    <>
      <Helmet>
        <title>Our Speakers - Bharatiya Youth Parliament</title>
      </Helmet>

      {/* HERO */}
      <section
        className="relative w-full bg-center bg-cover bg-no-repeat py-28"
        style={{ backgroundImage: `url('/image/cover.jpg')` }}
      >
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px]" />
        <div className="relative z-10 text-center mx-auto max-w-3xl px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-poppins font-bold text-5xl text-white mb-6"
          >
            <span className="text-[#a0291f]">Our Speakers</span>
          </motion.h1>
          <p className="font-merriweather text-lg text-black">
            Inspiring personalities shaping the nation
          </p>
        </div>
      </section>

      {/* SPEAKERS LIST */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="w-full h-96 rounded-lg" />
              ))}
            </div>
          ) : speakers.length === 0 ? (
            <p className="text-center text-gray-600 text-lg font-merriweather">
              No speakers available.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

              {speakers.map((sp, index) => (
                <motion.div
                  key={sp.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-lg p-4 text-center"
                >
                  <div className="w-full aspect-[3/4] overflow-hidden rounded-lg mb-4">
                    <img
                      src={sp.photo_url}
                      alt={sp.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h3 className="text-xl font-poppins font-bold">{sp.name}</h3>
                  <p className="text-[#a0291f] font-merriweather font-semibold">
                    {sp.designation}
                  </p>

                  <p className="mt-2 text-gray-700 font-merriweather">
                    {sp.bio}
                  </p>

                  <span className="mt-3 inline-block bg-[#a0291f] text-white text-xs px-3 py-1 rounded-full capitalize">
                    {sp.category.replace("_", " ")}
                  </span>
                </motion.div>
              ))}

            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SpeakersPage;
