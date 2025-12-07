
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

const PrivacyPolicyPage = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Bharatiya Youth Parliament</title>
        <meta name="description" content="Privacy Policy for the Bharatiya Youth Parliament website." />
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
              Privacy <span className="text-[#a0291f]">Policy</span>
            </h1>
            <p className="font-merriweather text-lg text-gray-700 max-w-3xl mx-auto">
              Last updated: November 12, 2025
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto font-merriweather text-gray-700 space-y-6">
            <p>This page is a placeholder for the Privacy Policy. A complete and legally compliant privacy policy should be drafted to detail how user data is collected, used, stored, and protected. This is especially critical given the collection of personal information during registration.</p>
            
            <h2 className="font-poppins font-bold text-2xl text-gray-900 pt-4">1. Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you register for an event, subscribe to our newsletter, or otherwise communicate with us. This information may include your name, email address, phone number, college, and other personal details.</p>

            <h2 className="font-poppins font-bold text-2xl text-gray-900 pt-4">2. How We Use Your Information</h2>
            <p>We use the information we collect to operate, maintain, and provide you with the features and functionality of our services, as well as to communicate directly with you, such as to send you email messages and push notifications.</p>

            <h2 className="font-poppins font-bold text-2xl text-gray-900 pt-4">3. Data Storage</h2>
            <p>Your information is stored securely. We take reasonable measures, including administrative, technical, and physical safeguards, to protect your information from loss, theft, misuse, and unauthorized access.</p>

            <h2 className="font-poppins font-bold text-2xl text-gray-900 pt-4">4. Sharing of Your Information</h2>
            <p>We do not sell or rent your personal information to third parties. We may share your information with third-party vendors and other service providers that perform services on our behalf, as needed to carry out their work for us, which may include payment processing and email services.</p>

            <h2 className="font-poppins font-bold text-2xl text-gray-900 pt-4">5. Your Choices</h2>
            <p>You may, of course, decline to submit personal information through the service, in which case we may not be able to provide certain services to you.</p>

            <h2 className="font-poppins font-bold text-2xl text-gray-900 pt-4">6. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at contact@bharatiyayouthparliament.com.</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicyPage;
