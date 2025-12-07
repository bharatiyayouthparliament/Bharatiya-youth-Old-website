import React from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";

/* ===========================================================
   COMMITTEE DATA
=========================================================== */

const committeeData = {
  patrons: [
    { name: "Pradeep Bhaiya Ji Maharaj", role: "Patron", photo: "/image/mahraj1.png" },
    { name: "Swami Vishalanand Ji Maharaj", role: "Patron", photo: "/image/mahraj2.png" },
    { name: "Ezekiel Isaac Malekar", role: "", photo: "/image/mahraj3.png" }
  ],

  president: [
    { name: "Rajnish Jindal", role: "President", photo: "/image/rajnish.png" }
  ],

  vicePresidents: [
    { name: "Dr. Smt. Vinita Shival", role: "Vice President", photo: "/image/user.png" },
    { name: "Smt. Swetima Dwivedi", role: "Vice President", photo: "/image/swetima.png" },
    { name: "Smt. Archana Agnihotri", role: "Vice President", photo: "/image/archana.png" },
    { name: "Dr. Mahesh Kaushik", role: "Vice President", photo: "/image/mahesh.png" },
    { name: "Shri Mandeep Rana", role: "Vice President", photo: "/image/mandeep.png" }
  ],

  generalSecretary: [
    { name: "Vikas Kaushik", role: "Secretary", photo: "/image/Vikas.png" },
    { name: "Dr. Darshan Pandey", role: "General Secretary", photo: "/image/darshan.png" }
  ],

  secretaries: [
    { name: "Shikha Shrivastava", role: "Secretary", photo: "/image/shikha.png" },
    { name: "Smt. Neera Bakshi", role: "Secretary", photo: "/image/neera.png" },
    { name: "Shri Rohit Satija", role: "Secretary", photo: "/image/rohit.png" }
  ],

  managementHead: [
    { name: "Adv. Arvind Gulati", role: "Management Head", photo: "/image/arvind.png" }
  ],

  officeSecretary: [
    { name: "Manoj Kumar", role: "Office Secretary", photo: "/image/manoj.png" }
  ],

  convener: [
    { name: "Pramod Kumar", role: "Convener", photo: "/image/pramod.png" },
    { name: "Katyayani Chaturvedi", role: "Co-Convener", photo: "/image/katyayni.png" },
    { name: "Kapil Bhalla", role: "Co-Convener", photo: "/image/kapil.png" },
    { name: "Shri Yash Kumar", role: "Co-Convener", photo: "/image/yash.jpg" }
  ]
};

/* ===========================================================
   MEMBER CARD
=========================================================== */

const MemberCard = ({ name, role, photo }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="text-center bg-white p-6 rounded-xl shadow-lg border border-gray-100"
  >
    <img
      src={photo}
      className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto mb-4 object-cover border-4 border-[#a0291f]/30"
      alt={name}
    />
    <h3 className="font-poppins font-bold text-lg md:text-xl text-gray-900">{name}</h3>
    <p className="font-merriweather text-md text-[#a0291f]">{role}</p>
  </motion.div>
);

/* ===========================================================
   PARTNERS DATA
=========================================================== */

const partnersData = {
  knowledge: ["/image/amity.png"],
  theme: ["/image/namamigange.png"],
  supporting: [
    "/image/sewa.png",
    "/image/sarokar.png",
    "/image/abhiyan.png",
    "/image/world.png"
  ],
  digital: [
    "/image/abp.png",
    "/image/adda.png",
    "/image/kprnews.png",
    "/image/shining.png"
  ],
  corporate: [
    "/image/factory.png",
    "/image/the.png",
    "/image/branding.png"
  ]
};

/* ===========================================================
   MAIN PAGE
=========================================================== */

const FirstSessionPage = () => {

  /* ======================
     SLIDER inside component
  ======================== */

    const sliderImages = [
    "/image/C0105T01.JPG",
    "/image/MN1.jpg",
    "/image/MN2.jpg",
    "/image/MN3.jpg"
  ];


  const [currentSlide, setCurrentSlide] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Helmet>
        <title>1st Session – BYP 2025</title>
      </Helmet>

      {/* =====================================================
          HERO SECTION
      ====================================================== */}
      <section
        className="relative w-full h-[45vh] md:h-[60vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url('/image/banner.png')`
        }}
      >
        <div className="absolute inset-0 bg-white/70"></div>

        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-2xl md:text-3xl md:text-6xl font-poppins font-extrabold drop-shadow-2xl">
             <span className="text-[#a0291f]">1st Session – BYP 2025</span>
          </h1>


          <div className="flex flex-col md:flex-row justify-center items-center mt-6 space-y-3 md:space-y-0 md:space-x-6">
            <p className="flex items-center text-black">
              <Calendar className="mr-2" /> 12 January 2025,
            </p>

            <p className="flex items-center text-black">
              <MapPin className="mr-2" /> Amity University Noida, UP
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          ABOUT
      ====================================================== */}
      <section className="bg-white py-6 md:py-8">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <img
              src="/image/vivekanand.png"
              alt="About Session"
              className="rounded-2xl shadow-xl w-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <h2 className="text-2xl md:text-3xl md:text-3xl md:text-3xl md:text-4xl font-bold font-poppins text-[#a0291f] mb-6">
              About Us
            </h2>

            <p className="font-merriweather text-base md:text-lg text-gray-700 leading-relaxed">
              The Youth Parliament, a flagship initiative of the Government of India, embodies the spirit of participatory
               democracy by enabling students and youth to actively contribute to the nation’s developmental vision.
                Inspired by the leadership of Hon’ble Prime Minister Shri Narendra Modi Ji, the Bharatiya Youth Parliament
                 was conceptualized to strengthen nation-building values and deepen faith in democratic responsibilities
                  among young citizens.
            </p>

          </motion.div>
        </div>
      </section>

      {/* =====================================================
          ORGANIZING COMMITTEE
      ====================================================== */}
      <section className="bg white py-6 md:py-8">
        <div className="container mx-auto px-4">

          <h2 className="text-center text-3xl md:text-4xl font-poppins font-bold text-gray-900 mb-10 md:mb-16">
            Organizing <span className="text-[#a0291f]">Committee</span>
          </h2>

          {/* Patron */}
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-10">Patron</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-6 md:gap-6 md:gap-10">
            {committeeData.patrons.map((m, i) => (
              <MemberCard key={i} {...m} />
            ))}
          </div>

          {/* President */}
          <h3 className="text-2xl md:text-3xl font-bold text-center mt-20 mb-10">President</h3>
          <div className="flex justify-center">
            <MemberCard {...committeeData.president[0]} />
          </div>

          {/* General Secretary */}
          <h3 className="text-2xl md:text-3xl font-bold text-center mt-20 mb-10">General Secretary</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-60 md:gap-6 md:gap-60">
            {committeeData.generalSecretary.map((m, i) => (
              <MemberCard key={i} {...m} />
            ))}
          </div>

          {/* Vice Presidents */}
          <h3 className="text-2xl md:text-3xl font-bold text-center mt-20 mb-10">Vice Presidents</h3>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 md:gap-6 md:gap-10">
            {committeeData.vicePresidents.map((m, i) => (
              <MemberCard key={i} {...m} />
            ))}
          </div>

          {/* Secretaries */}
          <h3 className="text-2xl md:text-3xl font-bold text-center mt-20 mb-10">Secretaries</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-6 md:gap-10">
            {committeeData.secretaries.map((m, i) => (
              <MemberCard key={i} {...m} />
            ))}
          </div>

          {/* Convener */}
          <h3 className="text-2xl md:text-3xl font-bold text-center mt-20 mb-10">Convener & Co-Convener</h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 md:gap-6 md:gap-10">
            {committeeData.convener.map((m, i) => (
              <MemberCard key={i} {...m} />
            ))}
          </div>

        </div>
      </section>

      {/* =====================================================
          YOUTH PARLIAMENTARIAN GALLERY
      ====================================================== */}
      <section className="bg-white py-6 md:py-8">
        <div className="container mx-auto px-4 text-center">

          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-gray-900 mb-12">
            Our Youth Parliamentarians – <span className="text-[#a0291f]">BYP 2025</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

            {[
              "/image/IMG1.jpg",
              "/image/IMG2.jpg",
              "/image/IMG3.jpg",
              "/image/IMG4.jpg",
              "/image/IMG7.jpg",
              "/image/IMG5.jpg",
              "/image/IMG6.jpg",
              "/image/IMG8.jpg",
              "/image/IMG9.jpg",
              "/image/IMG10.jpg",
              "/image/IMG11.jpg",
              "/image/IMG12.jpg",
              "/image/IMG13.jpg",
              "/image/IMG14.jpg",
              "/image/IMG15.jpg",
              "/image/IMG16.jpg",
              "/image/IMG17.jpg",
              "/image/IMG18.jpg",
              "/image/IMG19.jpg",
              "/image/IMG20.jpg",
            ].map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
              >
                <img src={img} className="w-full h-40 md:h-56 object-cover" />
              </motion.div>
            ))}

          </div>

        </div>
      </section>

      {/* =====================================================
          AUTO SLIDER (Government Interaction)
      ====================================================== */}
      <section className="bg-white py-6 md:py-8">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* LEFT SLIDER */}
          <div className="lg:col-span-5 relative overflow-hidden rounded-2xl shadow-xl h-56 md:h-[420px]">

            {sliderImages.map((src, index) => (
              <motion.img
                key={index}
                src={src}
                alt="Youth Activity"
                className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: index === currentSlide ? 1 : 0 }}
                transition={{ duration: 0.8 }}
              />
            ))}

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {sliderImages.map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i === currentSlide ? "bg-[#a0291f]" : "bg-white/60"
                  }`}
                ></div>
              ))}
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="lg:col-span-7">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-[#a0291f] mb-6">
              Government Interaction
            </h2>

            <p className="font-merriweather text-base md:text-lg text-gray-700 leading-relaxed">
              The Bharatiya Youth Parliament empowers young delegates to express
              their perspectives, enhance leadership qualities, and engage in
              national development.
            </p>

            <p className="font-merriweather text-base md:text-lg text-gray-700 leading-relaxed mt-4">
              These moments captured reflect the passion and dedication of the
              youth participating in BYP 2025 — shaping a brighter and stronger India.
            </p>
          </div>

        </div>
      </section>

      {/* =====================================================
          PARTNERS SECTION
      ====================================================== */}
     <section className="bg-white py-6 md:py-8">
        <div className="container mx-auto px-4 text-center">

          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-gray-900 mb-10 md:mb-16">
            Our Partners & Participants
          </h2>

          {/* ===================== KNOWLEDGE PARTNER ===================== */}
            <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">

              {/* Knowledge Partner */}
              <div className="text-center">
                <h3 className="text-lg md:text-xl font-semibold mb-6">Knowledge Partner</h3>

                <div className="flex justify-center">
                  <div className="border border-gray-300 rounded-xl p-4 bg-white shadow-sm 
                                  hover:shadow-lg transition-all duration-300 w-40 md:w-48 flex 
                                  items-center justify-center">
                    <img className="h-12 md:h-16 object-contain" src={partnersData.knowledge[0]} />
                  </div>
                </div>
              </div>

              {/* Theme Support */}
              <div className="text-center">
                <h3 className="text-lg md:text-xl font-semibold mb-6">Theme Support</h3>

                <div className="flex justify-center">
                  <div className="border border-gray-300 rounded-xl p-4 bg-white shadow-sm 
                                  hover:shadow-lg transition-all duration-300 w-40 md:w-48 flex 
                                  items-center justify-center">
                    <img className="h-12 md:h-16 object-contain" src={partnersData.theme[0]} />
                  </div>
                </div>
              </div>

            </div>


          {/* ===================== SUPPORTING PARTNERS ===================== */}
          <div className="mb-16">
            <h3 className="text-lg md:text-xl font-semibold mb-6">Event Supporting Partners</h3>

            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              {partnersData.supporting.map((src, i) => (
                <div
                  key={i}
                  className="border border-gray-300 rounded-xl p-4 bg-white shadow-sm hover:shadow-lg transition-all duration-300 w-40 md:w-48 flex items-center justify-center"
                >
                  <img className="h-12 md:h-16 object-contain" src={src} />
                </div>
              ))}
            </div>
          </div>

          {/* ===================== DIGITAL PARTNERS ===================== */}
          <div className="mb-16">
            <h3 className="text-lg md:text-xl font-semibold mb-6">Digital Partners</h3>

            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              {partnersData.digital.map((src, i) => (
                <div
                  key={i}
                  className="border border-gray-300 rounded-xl p-4 bg-white shadow-sm hover:shadow-lg transition-all duration-300 w-40 md:w-48 flex items-center justify-center"
                >
                  <img className="h-12 md:h-16 object-contain" src={src} />
                </div>
              ))}
            </div>
          </div>

          {/* ===================== CORPORATE PARTNERS ===================== */}
          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-6">Corporate Partners</h3>

            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              {partnersData.corporate.map((src, i) => (
                <div
                  key={i}
                  className="border border-gray-300 rounded-xl p-4 bg-white shadow-sm hover:shadow-lg transition-all duration-300 w-40 md:w-48 flex items-center justify-center"
                >
                  <img className="h-12 md:h-16 object-contain" src={src} />
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>


    </>
  );
};

export default FirstSessionPage;
