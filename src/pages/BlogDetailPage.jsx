import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';

const BlogDetailPage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [blog, setBlog] = useState(null);

  // Show toast once
  useEffect(() => {
    toast({
      title: "🚧 Page Under Construction 🚧",
      description: "This page is now loading blogs dynamically from Firestore!",
    });
  }, [toast]);

  // Fetch blog from Firestore
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const ref = doc(db, "blogs", id);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setBlog(snap.data());
        } else {
          toast({
            title: "Blog Not Found",
            description: "The requested article does not exist.",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Unable to load blog. Please try again.",
          variant: "destructive",
        });
      }
    };

    fetchBlog();
  }, [id, toast]);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-medium">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{blog.title} - Bharatiya Youth Parliament</title>
        <meta name="description" content={blog.excerpt || blog.title} />
      </Helmet>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Back button */}
            <Link
              to="/blog"
              className="flex items-center text-gray-600 hover:text-[#a0291f] mb-8 font-poppins font-medium"
            >
              <ArrowLeft size={20} className="mr-2" /> Back to Blog
            </Link>

            {/* Blog Title */}
            <h1 className="font-poppins font-bold text-4xl md:text-5xl text-gray-900 mb-4">
              {blog.title}
            </h1>

            {/* Author + Date */}
            <div className="flex items-center space-x-6 text-gray-600 mb-8">
              <div className="flex items-center space-x-2">
                <User size={16} />
                <span className="font-merriweather">{blog.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar size={16} />
                <span className="font-merriweather">
                  {new Date(blog.published_date).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Image */}
            <img
              src={blog.image_url}
              alt={blog.title}
              className="w-full h-auto rounded-lg shadow-lg mb-8"
            />

            {/* Blog Content */}
            <div
              className="prose lg:prose-xl max-w-none font-merriweather text-gray-700"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default BlogDetailPage;
