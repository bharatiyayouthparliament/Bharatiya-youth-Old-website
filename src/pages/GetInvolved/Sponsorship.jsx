import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

// FIREBASE
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase"; // Adjust path if needed

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 },
};

const Sponsorship = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    organization: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    type: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "sponsors"), {
        ...formData,
        createdAt: serverTimestamp() // Adds server time
      });
      
      alert("Thank you! Your sponsorship enquiry has been submitted successfully.");
      
      // Reset Form
      setFormData({
        fullName: "",
        email: "",
        mobile: "",
        organization: "",
        address: "",
        city: "",
        state: "",
        pinCode: "",
        type: "",
        message: ""
      });

    } catch (error) {
      console.error("Error submitting form: ", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sponsorship - Bharatiya Youth Parliament</title>
        <meta
          name="description"
          content="Partner with Bharatiya Youth Parliament to support youth leadership and national development initiatives."
        />
      </Helmet>

      {/* ================================
          HERO SECTION
      =================================== */}
      <section
        className="relative w-full bg-center bg-cover bg-no-repeat py-24 md:py-32"
        style={{ backgroundImage: `url('/image/cover.jpg')` }}
      >
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-3xl mx-auto px-4"
        >
          <h1 className="font-poppins font-bold text-4xl md:text-5xl text-white mb-4 drop-shadow-[0_0_10px_rgba(0,0,0,0.6)]">
            <span className="text-[#a0291f]">Become a Sponsor</span>
          </h1>

          <p className="font-merriweather text-base md:text-lg text-black max-w-2xl mx-auto drop-shadow-[0_0_8px_rgba(0,0,0,0.6)]">
            Join hands with us to empower young leaders, support national reform programs, and create a lasting impact.
          </p>
        </motion.div>
      </section>

      {/* ================================
          SPONSORSHIP FORM
      =================================== */}
      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-3xl">

          <motion.div
            {...fadeIn}
            className="bg-gray-50 shadow-xl rounded-2xl p-8 md:p-10 border border-gray-200"
          >
            <h2 className="font-poppins font-bold text-3xl text-[#a0291f] text-center mb-6">
              Sponsorship Form
            </h2>

            <p className="text-gray-700 font-merriweather text-center mb-10">
              Fill in your details to collaborate with us.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* ROW 1 — NAME + EMAIL */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-poppins text-gray-700 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a0291f]"
                  />
                </div>
                <div>
                  <label className="font-poppins text-gray-700 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter email"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a0291f]"
                  />
                </div>
              </div>

              {/* ROW 2 — MOBILE + ORGANIZATION */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-poppins text-gray-700 block mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                    maxLength={10}
                    placeholder="Enter mobile number"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a0291f]"
                  />
                </div>
                <div>
                  <label className="font-poppins text-gray-700 block mb-1">Organization / Company *</label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    required
                    placeholder="Enter organization name"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a0291f]"
                  />
                </div>
              </div>

              {/* FULL ROW — ADDRESS */}
              <div>
                <label className="font-poppins text-gray-700 block mb-1">Business Address *</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  required
                  placeholder="Enter business address"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a0291f]"
                ></textarea>
              </div>

              {/* ROW 3 — CITY + STATE */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-poppins text-gray-700 block mb-1">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    placeholder="Enter city"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a0291f]"
                  />
                </div>
                <div>
                  <label className="font-poppins text-gray-700 block mb-1">State *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    placeholder="Enter state"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a0291f]"
                  />
                </div>
              </div>

              {/* ROW 4 — PIN + SPONSOR TYPE */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-poppins text-gray-700 block mb-1">Pin Code *</label>
                  <input
                    type="tel"
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleChange}
                    required
                    maxLength={6}
                    placeholder="Enter pin code"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a0291f]"
                  />
                </div>
                <div>
                  <label className="font-poppins text-gray-700 block mb-1">Sponsorship Type *</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#a0291f]"
                  >
                    <option value="">Select type</option>
                    <option value="gold">Gold Sponsor</option>
                    <option value="silver">Silver Sponsor</option>
                    <option value="bronze">Bronze Sponsor</option>
                    <option value="partner">Official Partner</option>
                  </select>
                </div>
              </div>

              {/* FULL ROW — MESSAGE */}
              <div>
                <label className="font-poppins text-gray-700 block mb-1">Message (Optional)</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Write your message"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a0291f]"
                ></textarea>
              </div>

              {/* SUBMIT BUTTON */}
              <div className="text-center pt-4">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#a0291f] hover:bg-[#7a1f17] text-white font-poppins px-10 py-3 rounded-xl shadow-lg transition flex items-center gap-2 mx-auto disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting && <Loader2 className="animate-spin h-5 w-5" />}
                  {isSubmitting ? "Submitting..." : "Submit Sponsorship"}
                </button>
              </div>

            </form>

          </motion.div>

        </div>
      </section>
    </>
  );
};

export default Sponsorship;