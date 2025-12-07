import React from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Calendar, User } from "lucide-react";
import useCrud from "@/hooks/useCrud";

const BlogPage = () => {
  const navigate = useNavigate();
  const { items: blogs, loading } = useCrud("blogs");

  // 🔥 Show only PUBLISHED blogs
  const publishedBlogs = blogs?.filter(
    (post) => post.status === "published"
  ) || [];

  return (
    <>
      <Helmet>
        <title>Blog - Bharatiya Youth Parliament</title>
        <meta
          name="description"
          content="Insights, stories, and perspectives on youth leadership, civic engagement, and democratic participation."
        />
      </Helmet>

      {/* ================================
          HERO SECTION
      =================================== */}
      <section
        className="relative w-full bg-center bg-cover bg-no-repeat py-24 md:py-32"
        style={{ backgroundImage: `url('/image/cover.jpg')` }}
      >
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-3xl mx-auto px-4"
        >
          <h1 className="font-poppins font-bold text-4xl md:text-5xl text-white mb-4 drop-shadow-[0_0_10px_rgba(0,0,0,0.6)]">
            <span className="text-[#a0291f]">Our Blog</span>
          </h1>

          <p className="font-merriweather text-base md:text-lg text-black drop-shadow-[0_0_8px_rgba(0,0,0,0.6)] max-w-2xl mx-auto">
            Insights, stories, and perspectives on youth leadership, civic
            engagement, and democratic participation.
          </p>
        </motion.div>
      </section>

      {/* ================================
          BLOG LIST SECTION
      =================================== */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* ===================================
                LOADING SKELETONS
            ==================================== */}
            {loading &&
              [...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-gray-200 h-72 rounded-md"
                ></div>
              ))}

            {/* ===================================
                BLOG CARDS — ONLY PUBLISHED POSTS
            ==================================== */}
            {publishedBlogs.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => navigate(`/blog/${post.id}`)}
              >
                {/* CARD IMAGE */}
                <img
                  alt={post.title}
                  className="w-full h-48 object-cover"
                  src={post.image_url}
                />

                {/* CARD CONTENT */}
                <div className="p-6">
                  <h2 className="font-poppins font-bold text-xl text-gray-900 mb-3 hover:text-[#a0291f] transition-colors">
                    {post.title}
                  </h2>

                  <p className="font-merriweather text-gray-700 mb-4">
                    {post.excerpt || post.description?.slice(0, 120) + "..."}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <User size={16} />
                      <span className="font-merriweather">
                        {post.author || "Admin"}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Calendar size={16} />
                      <span className="font-merriweather">
                        {post.published_date
                          ? new Date(post.published_date).toLocaleDateString()
                          : "—"}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}

            {/* ===================================
                NO BLOGS AVAILABLE
            ==================================== */}
            {!loading && publishedBlogs.length === 0 && (
              <div className="col-span-3 text-center text-gray-500 py-10">
                <p className="text-lg font-merriweather">
                  No blog posts are published yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPage;
