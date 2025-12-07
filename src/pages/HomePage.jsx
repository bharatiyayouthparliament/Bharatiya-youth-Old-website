
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useCrud from '@/hooks/useCrud';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { useEffect, useState } from "react";

const HomePage = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 },
  };

  const navigate = useNavigate();
  const { items: blogs, loading } = useCrud("blogs");

  // ================= COUNTDOWN LOGIC =================

  const calculateTimeLeft = () => {
    const eventDate = new Date("2026-01-12T11:00:00"); // event date & time
    const now = new Date();
    const diff = eventDate - now;

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

/* ============================
   UPDATED COMMITTEE DATA
=============================== */

  const committeeData = {
    patrons: [
      { name: "Pradeep Bhaiya Ji Maharaj", role: "Saint", photo: "/image/mahraj1.png" },
      { name: "Ezekiel Isaac Malekar", role: "Religious Leader, Jewish Community", photo: "/image/mahraj3.png" },
      { name: "Dr. Lata Wankhede", role: "Member of Parliament, Lok Sabha, Sagar (M.P.)", photo: "/image/lata.jpg" },
      { name: "Dr. Bharat Pathak", role: "Social Worker", photo: "/image/bharatpathak.jpg" }
    ],

    vicePresidents: [
      { name: "Shri Anil Pandey", role: "Senior Journalist", photo: "/image/anilp.png" },
      { name: "Shri Anand Reki", role: "President, Marathi Morcha", photo: "/image/usermale.png" },
      { name: "Smt. Yogita Singh", role: "Chairman, Central Zone MCD", photo: "/image/yogita.jpg" },
      { name: "Swami Vishalanand Ji Maharaj", role: "Saint", photo: "/image/mahraj2.png" }
    ],

    generalSecretary: [
      { name: "", role: "Secretary", photo: "/image/usermale.png" },
      { name: "", role: "General Secretary", photo: "/image/usermale.png" }
    ],

    secretaries: [
      { name: "", role: "Secretary", photo: "/image/user.png" },
      { name: "", role: "Secretary", photo: "/image/user.png" },
      { name: "", role: "Secretary", photo: "/image/usermale.png" }
    ],

    managementHead: [
      { name: "", role: "Management Head", photo: "/image/usermale.png" }
    ],

    officeSecretary: [
      { name: "", role: "Office Secretary", photo: "/image/usermale.png" }
    ],

    convener: [
      { name: "Shri Pramod Kumar", role: "Convener", photo: "/image/pramod.png" },
      { name: "Shri Mukesh Maan", role: "Co-Convener", photo: "/image/mukesh.png" },
      { name: "Smt. Katyayani Chaturvedi", role: "Co-Convener", photo: "/image/katyayni.png" }
    ]
  };


const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

useEffect(() => {
  const timer = setInterval(() => {
    setTimeLeft(calculateTimeLeft());
  }, 1000);

  return () => clearInterval(timer);
}, []);


  return (
    <>
      <Helmet>
        <title>Bharatiya Youth Parliament - Empowering Youth, Shaping Tomorrow</title>
        <meta
          name="description"
          content="Join Bharatiya Youth Parliament 2025, organized by SRRO. A movement to inspire and empower the next generation of change-makers in India."
        />
      </Helmet>

      {/* ===========================
          1. HERO SECTION - VIDEO
      ============================ */}
      <section className="relative w-full overflow-hidden bg-gray-50">
        <div className="w-full flex justify-center">

          {/* Desktop Video */}
          <video
            className="hidden md:block w-full h-full object-cover"
            src="/image/videodesktop.mp4"
            autoPlay
            loop
            muted
            playsInline
          />

          {/* Mobile Video */}
          <video
            className="block md:hidden w-full h-full object-cover"
            src="/image/videomobile.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      </section>


      {/* ===========================
          2. SWAMI VIVEKANAND CTA
      ============================ */}
      <section className="bg-white py-12 md:py-20">
  <motion.div
    {...fadeIn}
    animate={{ scale: [1, 1.02, 1] }}  // very subtle, no visual jump
    transition={{
      duration: 2,
      repeat: Infinity,
      repeatType: "mirror", // smooth forward-backward motion
      ease: "easeInOut"
    }}
    className="container mx-auto px-4 text-center"
  >
    <h2 className="font-poppins font-bold text-3xl md:text-4xl text-gray-900 mb-4">
      Register for Swami Vivekanand Awards
    </h2>

    <p className="font-merriweather text-lg text-gray-700 max-w-3xl mx-auto mb-8">
      Celebrate the legacy of transformative leadership and inspire future generations.
    </p>

    <Link to="/awards">
      <Button className="bg-[#a0291f] hover:bg-[#7a1f17] text-white font-poppins font-semibold rounded-xl px-6 py-3">
        Register Now
      </Button>
    </Link>
  </motion.div>
      </section>

    {/* ===========================
          3. MAIN EVENT SECTION
    ============================ */}

    <section className="bg-white py-4 md:py-6">
      <motion.div
        {...fadeIn}
        className="container mx-auto px-4 flex justify-center"
      >
        <motion.div
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
          className="bg-[#fff7f6] shadow-2xl rounded-3xl p-6 sm:p-10 max-w-4xl w-full border border-[#f0d7d4]"
        >
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-center font-poppins text-[#a0291f] mb-4">
            2nd Bharatiya Youth Parliament
          </h2>

          {/* Organized By */}
          <p className="text-center text-lg font-merriweather text-gray-700 mb-6">
            Organized by{" "}
            <span className="font-semibold text-gray-900">
              Social Reform And Research Organization (SRRO)
            </span>
          </p>

          {/* Venue */}
          <p className="text-center text-gray-800 text-lg font-poppins">
            <span className="font-semibold">Venue:</span> Talkatora Stadium, New Delhi, India
          </p>

          {/* Date */}
          <p className="text-center text-gray-800 text-lg font-poppins">
            <span className="font-semibold">Date:</span> 12 January 2026 (Monday)
          </p>

          {/* Time */}
          <p className="text-center text-gray-800 text-lg mb-6 font-poppins">
            <span className="font-semibold">Time:</span> 11:00 AM – 06:30 PM
          </p>

          {/* Countdown */}
          <h3 className="text-center text-xl font-semibold text-gray-900 mb-6 font-poppins">
            Countdown to the Event
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Seconds", value: timeLeft.seconds },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-[#f2e0de] rounded-2xl py-4 flex flex-col items-center shadow-md"
              >
                <span className="text-3xl font-bold text-[#a0291f] font-poppins">
                  {String(item.value).padStart(2, "0")}
                </span>
                <span className="text-gray-700 font-merriweather">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>


    {/* ===========================
       3. ABOUT SECTION
    ============================ */}

    <section className="bg-white py-4 md:py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Vivekananda Image */}
            <motion.div {...fadeIn} className="lg:col-span-4 flex justify-center">
              <img
                src="https://horizons-cdn.hostinger.com/27996bb3-5e48-436a-88f2-2463a212d901/d16b312e9f7770fd9ddf83f840078a30.png"
                alt="Swami Vivekananda"
                className="w-full max-w-xs sm:max-w-sm md:max-h-[500px] object-contain mx-auto"
                loading="lazy"
              />
            </motion.div>

            {/* About Content */}
            <motion.div {...fadeIn} className="lg:col-span-8">
              <h2 className="font-poppins font-bold text-3xl md:text-4xl text-gray-900 mb-2">
                About Bharatiya Youth Parliament
              </h2>

              <p className="font-poppins text-xl text-[#a0291f] font-semibold mb-6">
                Transformative Leadership for a Better Tomorrow
              </p>

              <div className="font-merriweather text-lg text-gray-700 space-y-4">
                <p>
                  India stands on the brink of a demographic revolution, with 65% of its population under 35.
                  Bharatiya Youth Parliament 2025 provides a platform for young leaders to engage in critical
                  discussions and propose solutions to India's challenges.
                </p>
                <p>
                  This initiative is not just an event—it's a movement to inspire and empower the next generation of change-makers.
                </p>
              </div>

              {/* Highlights */}
              <div className="mt-10">
                <h3 className="font-poppins font-bold text-2xl text-gray-900 mb-4">
                  Key Highlights
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg">
                  <div className="flex items-center">🏛️ Simulated Parliamentary Sessions</div>
                  <div className="flex items-center">🧠 Policy Discussions & Decision-Making</div>
                  <div className="flex items-center">🌍 Leadership & Civic Responsibility</div>
                  <div className="flex items-center">🤝 Collaborative Youth Networking</div>
                </div>
              </div>

              <Link to="/about" className="mt-8 inline-block">
                <Button className="bg-[#a0291f] hover:bg-[#7a1f17] text-white font-poppins font-semibold rounded-xl px-8 py-3">
                  Learn More About Us
                </Button>
              </Link>
            </motion.div>

          </div>
        </div>
    </section>

    {/* ===========================
          4. EVENT HIGHLIGHTS
    ============================ */}
    <section className="bg-white py-4 md:py-6">
      <div className="container mx-auto px-4">

          <motion.h2
            {...fadeIn}
            className="font-poppins font-bold text-3xl md:text-4xl text-center mb-12"
          >
            Event Highlights
          </motion.h2>

          {/* =============================
                TOP HALF (Points 1 & 2 + Image Right)
          ============================== */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start mb-12 md:mb-16">

            {/* LEFT — Points 1 & 2 */}
            <motion.div {...fadeIn}>
              <div className="space-y-8">

                {/* 1 */}
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                  <h3 className="font-poppins font-semibold text-xl text-[#a0291f] mb-2">
                    Structure & Proceedings of the Forum
                  </h3>
                  <p className="font-merriweather text-gray-700">
                    The Parliamentary Forum replicates the authentic procedure of a legislative assembly,
                    enabling experiential understanding of democratic processes.
                  </p>
                </div>

                {/* 2 */}
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                  <h3 className="font-poppins font-semibold text-xl text-[#a0291f] mb-2">
                    Components of the House
                  </h3>
                  <p className="font-merriweather text-gray-700">
                    The House comprises Speaker, Council of Ministers, Opposition, Ruling Party Members,
                    and Independent Observers — promoting balanced civic understanding.
                  </p>
                </div>

              </div>
            </motion.div>

            {/* RIGHT — Image */}
            <motion.div {...fadeIn}>
              <img
                src="/image/hero2.jpg"
                alt="Event Highlight 1"
                className="w-full max-h-[320px] md:max-h-[380px] rounded-xl shadow-lg object-cover"
              />
            </motion.div>

          </div>

          {/* =============================
                BOTTOM HALF (Image Left + Points 3 & 4)
          ============================== */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

            {/* LEFT — Image */}
            <motion.div {...fadeIn}>
              <img
                src="/image/hero3.jpg"
                alt="Event Highlight 2"
                className="w-full max-h-[320px] md:max-h-[380px] rounded-xl shadow-lg object-cover"
              />
            </motion.div>

            {/* RIGHT — Points 3 & 4 */}
            <motion.div {...fadeIn}>
              <div className="space-y-8">

                {/* 3 */}
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                  <h3 className="font-poppins font-semibold text-xl text-[#a0291f] mb-2">
                    Session Format
                  </h3>
                  <p className="font-merriweather text-gray-700">
                    Includes Inaugural, Government Policy, Structured Discussion, Open Forum, and
                    Valedictory sessions.
                  </p>
                </div>

                {/* 4 */}
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                  <h3 className="font-poppins font-semibold text-xl text-[#a0291f] mb-2">
                    Interactive Youth Engagement
                  </h3>
                  <p className="font-merriweather text-gray-700">
                    Participants debate, raise questions, and present viewpoints on national issues
                    in a democratic, respectful, and responsible manner.
                  </p>
                </div>

              </div>
            </motion.div>

          </div>

          {/* =============================
                CENTER BUTTON
          ============================== */}
          <div className="flex justify-center mt-16">
            <Link to="/sessions/2nd-edition">
              <button className="bg-[#a0291f] hover:bg-[#7a1f17] text-white font-poppins px-8 py-4 rounded-xl shadow-lg text-lg transition">
                View Full Event Details
              </button>
            </Link>
          </div>

      </div>
    </section>

    {/* ===========================
       5. BLOG SECTION
    ============================ */}
    
    {blogs?.length > 0 && (
        <section className="bg-white py-6 md:py-8">
          <div className="container mx-auto px-4">

            <motion.h2
              {...fadeIn}
              className="font-poppins font-bold text-2xl md:text-4xl mb-10 md:mb-12"
            >
              Latest from Our Blog
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {loading &&
                [...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse bg-gray-200 h-72 rounded-md"></div>
                ))}

              {!loading &&
                blogs.map((post) => (
                  <motion.div
                    {...fadeIn}
                    key={post.id}
                    className="bg-gray-50 rounded-lg shadow-md overflow-hidden flex flex-col cursor-pointer"
                    onClick={() => navigate(`/blog/${post.id}`)}
                  >
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-full h-40 sm:h-44 md:h-48 object-cover"
                    />

                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="font-poppins font-bold text-xl text-gray-800 mb-2">
                        {post.title}
                      </h3>

                      <p className="font-merriweather text-gray-600 mb-4 flex-grow">
                        {post.excerpt || post.summary}
                      </p>

                      <Button className="bg-[#a0291f] hover:bg-[#7a1f17] text-white font-poppins font-semibold rounded-xl w-full sm:w-auto">
                        Read More
                      </Button>
                    </div>
                  </motion.div>
                ))}
            </div>

          </div>
        </section>
    )}

   {/* ================================
      RECEPTION COMMITTEE – CAROUSEL
    ================================== */}
    <section className="bg-white py-6 md:py-8">
        <div className="container mx-auto px-4 text-center">

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-poppins font-bold text-2xl md:text-3xl text-black mb-10"
          >
            Reception Committee
          </motion.h2>

          {/* Auto-scrolling Carousel */}
          <div className="overflow-hidden relative">

            {/* Moving Track */}
            <motion.div
              className="flex gap-15 items-center"
              animate={{ x: ["0%", "-100%"] }}
              transition={{
                repeat: Infinity,
                duration: 25,
                ease: "linear"
              }}
            >
              {/* Duplicate the list twice for infinite looping */}
              {[...Array(2)].map((_, loopIndex) => (
                <div key={loopIndex} className="flex gap-10 mr-10">

                  {/* PRESIDENT */}
                  {[
                    { name: "Shri Brijesh Rai", role: "President", photo: "/image/brijesh.jpg" },
                    { name: "Dr. Anoop Solanki", role: "Vice President", photo: "/image/anoop.jpg" },
                    { name: "Dr. Pratyush Vatsala", role: "Vice President", photo: "/image/pratyush.png" },
                    { name: "Smt. Swetima Dwivedi", role: "Vice President", photo: "/image/swetima.png" },
                    { name: "Shri Mukul Bhadana", role: "General Secretary", photo: "/image/mukul.png" }
                  ].map((member, i) => (
                    <div
                      key={`${loopIndex}-${i}`}
                      className="text-center bg-white p-4 rounded-xl border border-gray-200 w-36 md:w-44 shadow-sm hover:shadow-lg transition"
                    >
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto mb-3 object-cover border-4 border-[#a0291f]/30"
                      />
                      <h4 className="font-poppins font-semibold text-sm md:text-base text-gray-900">
                        {member.name}
                      </h4>
                      <p className="text-[#a0291f] text-xs md:text-sm">{member.role}</p>
                    </div>
                  ))}

                </div>
              ))}
            </motion.div>
          </div>

        </div>
    </section>

    {/* ================================
      ORGANIZING COMMITTEE – CAROUSEL
    ================================== */}
    <section className="bg-whitepy-6 md:py-8">
        <div className="container mx-auto px-4 text-center">

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-poppins font-bold text-2xl md:text-3xl text-black mb-10"
          >
            Organizing Committee
          </motion.h2>

          {/* Auto-scrolling Carousel */}
          <div className="overflow-hidden relative">

            {/* MOVING TRACK */}
            <motion.div
              className="flex gap-10 items-center"
              animate={{ x: ["0%", "-100%"] }}
              transition={{
                repeat: Infinity,
                duration: 35,
                ease: "linear"
              }}
            >

              {/* Duplicate the entire list twice for infinite loop */}
              {[...Array(2)].map((_, loopIndex) => (
                <div key={loopIndex} className="flex gap-10 mr-10">

                  {/* PATRONS */}
                  {committeeData.patrons.map((m, i) => (
                    <div
                      key={`patron-${loopIndex}-${i}`}
                      className="text-center bg-white p-4 rounded-xl border border-gray-200
                                w-36 md:w-44 shadow-sm hover:shadow-lg transition"
                    >
                      <img
                        src={m.photo}
                        alt={m.name}
                        className="w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto mb-3 
                                  object-cover border-4 border-[#a0291f]/30"
                      />
                      <h4 className="font-poppins font-semibold text-sm md:text-base text-gray-900">
                        {m.name}
                      </h4>
                      <p className="text-[#a0291f] text-xs md:text-sm">{m.role}</p>
                    </div>
                  ))}

                  {/* ADVISORY COUNCIL (Vice Presidents) */}
                  {committeeData.vicePresidents.map((m, i) => (
                    <div
                      key={`vp-${loopIndex}-${i}`}
                      className="text-center bg-white p-4 rounded-xl border border-gray-200
                                w-36 md:w-44 shadow-sm hover:shadow-lg transition"
                    >
                      <img
                        src={m.photo}
                        alt={m.name}
                        className="w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto mb-3 
                                  object-cover border-4 border-[#a0291f]/30"
                      />
                      <h4 className="font-poppins font-semibold text-sm md:text-base text-gray-900">
                        {m.name}
                      </h4>
                      <p className="text-[#a0291f] text-xs md:text-sm">{m.role}</p>
                    </div>
                  ))}

                  {/* GENERAL SECRETARY */}
                  {committeeData.generalSecretary.map((m, i) => (
                    <div
                      key={`gs-${loopIndex}-${i}`}
                      className="text-center bg-white p-4 rounded-xl border border-gray-200
                                w-36 md:w-44 shadow-sm hover:shadow-lg transition"
                    >
                      <img
                        src={m.photo}
                        alt={m.name}
                        className="w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto mb-3 
                                  object-cover border-4 border-[#a0291f]/30"
                      />
                      <h4 className="font-poppins font-semibold text-sm md:text-base text-gray-900">
                        {m.name || "Name Not Provided"}
                      </h4>
                      <p className="text-[#a0291f] text-xs md:text-sm">{m.role}</p>
                    </div>
                  ))}

                  {/* SECRETARIES */}
                  {committeeData.secretaries.map((m, i) => (
                    <div
                      key={`sec-${loopIndex}-${i}`}
                      className="text-center bg-white p-4 rounded-xl border border-gray-200
                                w-36 md:w-44 shadow-sm hover:shadow-lg transition"
                    >
                      <img
                        src={m.photo}
                        alt={m.name}
                        className="w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto mb-3 
                                  object-cover border-4 border-[#a0291f]/30"
                      />
                      <h4 className="font-poppins font-semibold text-sm md:text-base text-gray-900">
                        {m.name || "Name Not Provided"}
                      </h4>
                      <p className="text-[#a0291f] text-xs md:text-sm">{m.role}</p>
                    </div>
                  ))}

                  {/* MANAGEMENT HEAD */}
                  {committeeData.managementHead.map((m, i) => (
                    <div
                      key={`mh-${loopIndex}-${i}`}
                      className="text-center bg-white p-4 rounded-xl border border-gray-200
                                w-36 md:w-44 shadow-sm hover:shadow-lg transition"
                    >
                      <img
                        src={m.photo}
                        alt={m.name}
                        className="w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto mb-3 
                                  object-cover border-4 border-[#a0291f]/30"
                      />
                      <h4 className="font-poppins font-semibold text-sm md:text-base text-gray-900">
                        {m.name || "Name Not Provided"}
                      </h4>
                      <p className="text-[#a0291f] text-xs md:text-sm">{m.role}</p>
                    </div>
                  ))}

                  {/* OFFICE SECRETARY */}
                  {committeeData.officeSecretary.map((m, i) => (
                    <div
                      key={`os-${loopIndex}-${i}`}
                      className="text-center bg-white p-4 rounded-xl border border-gray-200
                                w-36 md:w-44 shadow-sm hover:shadow-lg transition"
                    >
                      <img
                        src={m.photo}
                        alt={m.name}
                        className="w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto mb-3 
                                  object-cover border-4 border-[#a0291f]/30"
                      />
                      <h4 className="font-poppins font-semibold text-sm md:text-base text-gray-900">
                        {m.name || "Name Not Provided"}
                      </h4>
                      <p className="text-[#a0291f] text-xs md:text-sm">{m.role}</p>
                    </div>
                  ))}

                  {/* CONVENERS */}
                  {committeeData.convener.map((m, i) => (
                    <div
                      key={`conv-${loopIndex}-${i}`}
                      className="text-center bg-white p-4 rounded-xl border border-gray-200
                                w-36 md:w-44 shadow-sm hover:shadow-lg transition"
                    >
                      <img
                        src={m.photo}
                        alt={m.name}
                        className="w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto mb-3 
                                  object-cover border-4 border-[#a0291f]/30"
                      />
                      <h4 className="font-poppins font-semibold text-sm md:text-base text-gray-900">
                        {m.name}
                      </h4>
                      <p className="text-[#a0291f] text-xs md:text-sm">{m.role}</p>
                    </div>
                  ))}

                </div>
              ))}
            </motion.div>
          </div>

        </div>
    </section>

    {/* ===========================
    SUPPORTING PARTNERS
    =========================== */}
    
    <section className="bg-white py-6 md:py-8">
       <div className="container mx-auto px-4 text-center">
    
        <motion.h3
         {...fadeIn}
          className="font-poppins font-bold text-2xl md:text-3xl text-black mb-8">
            Our Supporting Partners
        </motion.h3>
    
        {/* Single-line, centered logos with border */}
        <div className="w-full overflow-hidden">
          <div className="
              flex items-center gap-6 
              animate-[infinite-scroll_40s_linear_infinite]
              whitespace-nowrap
            "
          >
    {[ 
      "/image/branding.png",
      "/image/kprnews.png",
      "/image/the.png",
      "/image/delhifood.png",
      "/image/sewa.png",
      "/image/abhiyan.png",
      "/image/chakridevi.png",
      "/image/vist.png",
      "/image/coer.png",
      "/image/Shield.png"
    ]
      // Duplicate array for infinite loop
      .concat([
        "/image/branding.png",
        "/image/kprnews.png",
        "/image/the.png",
        "/image/delhifood.png",
        "/image/sewa.png",
        "/image/abhiyan.png",
        "/image/chakridevi.png",
        "/image/vist.png",
        "/image/coer.png",
        "/image/Shield.png"
      ])
      .map((src, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="
            border border-gray-300 rounded-xl p-3 bg-white 
            flex items-center justify-center 
            hover:shadow-lg transition-all
            w-auto
            min-w-[120px]
          "
        >
          <img
            src={src}
            alt="Partner"
            className="
              h-12 object-contain 
              mx-auto
            "
          />
        </motion.div>
      ))}
  </div>
</div>

    
      </div>
    </section>
    
          <section className="bg-white py-6 md:py-8">
            <div className="container mx-auto px-4 text-center">
    
              <motion.h3
                {...fadeIn}
                className="font-poppins font-bold text-2xl md:text-3xl text-black mb-6"
              >
                Our Media Partners
              </motion.h3>
    
              <div className="flex flex-wrap justify-center">
    
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="border border-gray-300 rounded-xl p-3 bg-white flex items-center justify-center hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  <img
                    src="/image/zbharat.png"
                    alt="Media Partner Logo"
                    className="h-14 md:h-20 object-contain"
                  />
                </motion.div>
    
              </div>
    
            </div>
          </section>
    </>
  );
};

export default HomePage;
