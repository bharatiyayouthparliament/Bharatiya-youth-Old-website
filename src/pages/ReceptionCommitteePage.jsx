import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

/* ============================
   RECEPTION COMMITTEE DATA
=============================== */

  const committeeData = {
    president: [
      { name: "Shri Brijesh Rai", role: "President", photo: "/image/brijesh.jpg" }
    ],

    vicePresidents: [
      { name: "Dr Anoop Solanki", role: "Vice President", photo: "/image/anoop.jpg" },
      {name: "Dr. Pratyush Vatsala", role: "Vice President", photo: "/image/pratyush.png" },
      { name: "Smt. Swetima Dwivedi", role: "Vice President", photo: "/image/swetima.png" },
      /*{ name: "Dr. Mahesh Kaushik", role: "Vice President", photo: "/image/mahesh.png" },
      { name: "Shri Mandeep Rana", role: "Vice President", photo: "/image/mandeep.png" }*/
    ],

    generalSecretary: [
      /*{ name: "Shri Mukul Bhadana", role: "Secretary", photo: "/image/Vikas.png" },
      { name: "Vikas Kaushik", role: "Secretary", photo: "/image/Vikas.png" },*/
      { name: "Shri Mukul Bhadana", role: "General Secretary", photo: "/image/mukul.png" }
    ],

    
    /*secretaries: [
      { name: "Shikha Shrivastava", role: "Secretary", photo: "/image/shikha.png" },
      { name: "Smt. Neera Bakshi", role: "Secretary", photo: "/image/neera.png" },
      { name: "Shri Rohit Satija", role: "Secretary", photo: "/image/rohit.png" }
    ],

    convener: [
      { name: "Pramod Kumar", role: "Convener", photo: "/image/pramod.png" },
      { name: "Katyayani Chaturvedi", role: "Co-Convener", photo: "/image/katyayni.png" },
      { name: "Kapil Bhalla", role: "Co-Convener", photo: "/image/kapil.png" },
      { name: "Shri Yash Kumar", role: "Co-Convener", photo: "/image/yash.jpg" }
    ]*/
  };

/* ============================
   MEMBER CARD
=============================== */

  const MemberCard = ({ name, role, photo }) => (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center bg-white p-6 rounded-xl border border-black-100"
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

/* ============================
   MAIN PAGE
=============================== */

  const ReceptionCommitteePage = () => {
    return (
      <>
        <Helmet>
          <title>Reception Committee - Bharatiya Youth Parliament</title>
        </Helmet>

        {/* HERO */}
        <section
          className="relative w-full bg-center bg-cover bg-no-repeat py-20 md:py-28"
          style={{ backgroundImage: `url('/image/cover.jpg')` }}
        >
          <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px]" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center max-w-3xl mx-auto px-4"
          >
            <h1 className="font-poppins font-bold text-3xl md:text-5xl text-white mb-4">
              <span className="text-[#a0291f]">Reception Committee</span>
            </h1>
          </motion.div>
        </section>

        {/* MAIN CONTENT */}
        <section className="bg-white py-6 md:py-8">
          <div className="container mx-auto px-4">

            {/* PRESIDENT */}
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-10">President</h3>
            <div className="flex justify-center mb-16">
              <MemberCard {...committeeData.president[0]} />
            </div>

            {/* VICE PRESIDENTS */}
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-10">Vice Presidents</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">
              {committeeData.vicePresidents.map((m, i) => (
                <MemberCard key={i} {...m} />
              ))}
            </div>

            {/* GENERAL SECRETARY */}
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
              General Secretary
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 mb-16">
              {committeeData.generalSecretary.map((m, i) => (
                <MemberCard key={i} {...m} />
              ))}
            </div>

            {/* 
              -----------------------------------------------
                SECRETARIES (COMMENTED OUT)
              -----------------------------------------------
              */}

  {/*
  <h3 className="text-2xl md:text-3xl font-bold text-center mb-10">
    Secretaries
  </h3>
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-16">
    {committeeData.secretaries.map((m, i) => (
      <MemberCard key={i} {...m} />
    ))}
  </div>
  */}

  {/* 
  -----------------------------------------------
    CONVENER & CO-CONVENER (COMMENTED OUT)
  -----------------------------------------------
  */}

  {/*
  <h3 className="text-2xl md:text-3xl font-bold text-center mb-10">
    Convener & Co-Convener
  </h3>
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
    {committeeData.convener.map((m, i) => (
      <MemberCard key={i} {...m} />
    ))}
  </div>
  */}


          </div>
        </section>
        {/* ---------------------------
            DO NOT DELETE: COMMENTED CONTENT
        ---------------------------- */}

        {/*
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">

            <InfoBlock
              title="Purpose and Vision"
              content="The Reception Committee ensures the success of our initiatives with the collaboration 
              and support of respected individuals across various fields."
              img="/image/img1.png"
            />

            <InfoBlock
              title="Formation for 2024–25"
              content="For 2024–25, the committee includes individuals who hold notable recognition and 
              share enthusiasm for our mission."
              img="/image/img2.png"
              reverse={true}
            />

            <InfoBlock
              title="Expectations and Impact"
              content="Members of the Reception Committee serve as an inspiration and actively contribute 
              to the positive societal impact of our initiatives."
              img="/image/img3.png"
            />

          </div>
        </section>
        */}

      </>
    );
  };

export default ReceptionCommitteePage;
