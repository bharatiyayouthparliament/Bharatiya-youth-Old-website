import React from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

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

/* ============================
   CARD COMPONENT
=============================== */

const MemberCard = ({ name, role, index, photo }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    className="text-center bg-white p-5 sm:p-6 rounded-xl hover:shadow-l 
               transition-all duration-300 border border-black-100 w-full"
  >
    <img
      alt={name}
      className="w-28 h-28 sm:w-32 sm:h-32 rounded-full mx-auto mb-4 object-cover 
                 border-4 border-[#a0291f]/30"
      src={photo}
    />

    <h3 className="font-poppins font-bold text-lg sm:text-xl text-gray-900 break-words">
      {name || "Name Not Provided"}
    </h3>

    <p className="font-merriweather text-sm sm:text-md text-[#a0291f] mt-1 break-words">
      {role}
    </p>
  </motion.div>
);

/* ============================
   SECTION COMPONENT
=============================== */

const CommitteeSection = ({ title, members, gridCols = "sm:grid-cols-2 lg:grid-cols-4" }) => (
  <div className="mb-20">
    <h2 className="font-poppins font-bold text-3xl text-center text-gray-900 mb-8">
      {title}
    </h2>

    <div className={`grid grid-cols-1 gap-10 ${gridCols}`}>
      {members.map((member, index) => (
        <MemberCard key={index} {...member} index={index} />
      ))}
    </div>
  </div>
);

/* ============================
   MAIN PAGE
=============================== */

const OrganizingCommitteePage = () => {
  const patronCount = committeeData.patrons.length;

  const patronGrid =
    patronCount < 2
      ? "sm:grid-cols-1"
      : patronCount === 2
      ? "sm:grid-cols-2"
      : patronCount === 3
      ? "sm:grid-cols-2 lg:grid-cols-3"
      : "sm:grid-cols-2 lg:grid-cols-4";

  return (
    <>
      <Helmet>
        <title>Organizing Committee - Bharatiya Youth Parliament</title>
      </Helmet>

      {/* HERO SECTION */}
      <section
        className="relative w-full bg-center bg-cover bg-no-repeat py-20 sm:py-28 px-4"
        style={{ backgroundImage: `url('/image/cover.jpg')` }}
      >
        <div className="absolute inset-0 bg-white/70" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-3xl mx-auto"
        >
          <h1 className="font-poppins font-bold text-4xl sm:text-5xl text-white drop-shadow-xl mb-4">
            <span className="text-[#a0291f]">Organizing Committee</span>
          </h1>

          <p className="font-merriweather text-base sm:text-lg text-black opacity-90 px-2">
            The dedicated members responsible for planning and executing the Bharatiya Youth Parliament.
          </p>
        </motion.div>
      </section>

      {/* MAIN CONTENT */}
      <section className="bg-white py-6 md:py-8 px-4">
        <div className="container mx-auto">

          {/*================== PATRON ==================*/}
          <CommitteeSection
            title="Patrons"
            members={committeeData.patrons}
            gridCols={patronGrid}
          />

          {/*================== ADVISORY COUNCIL ==================*/}
          <CommitteeSection
            title="Advisory Council"
            members={committeeData.vicePresidents}
            gridCols="sm:grid-cols-2 lg:grid-cols-4"
          />

          {/* ================== COMMENTED SECTIONS (DO NOT REMOVE) ================== */}
          {/*
          <CommitteeSection
            title="General Secretary"
            members={committeeData.generalSecretary}
            gridCols="sm:grid-cols-2"
          />

          <CommitteeSection
            title="Management Head & Office Secretary"
            members={[...committeeData.managementHead, ...committeeData.officeSecretary]}
            gridCols="sm:grid-cols-2"
          />

          <CommitteeSection
            title="Secretaries"
            members={committeeData.secretaries}
            gridCols="sm:grid-cols-2 lg:grid-cols-3"
          />
          */}

          {/*================== CONVENERS ==================*/}
          <CommitteeSection
            title="Convener & Co-Convener"
            members={committeeData.convener}
            gridCols="sm:grid-cols-2 lg:grid-cols-3"
          />

          {/*================== QUOTE SECTION ==================*/}
          <div className="max-w-4xl mx-auto bg-white rounded-[28px] p-6 sm:p-10 
                          shadow-lg border border-[#a0291f]/20 mt-14">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-center text-center sm:text-left">

              <div className="flex justify-center sm:justify-start">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-[#a0291f] overflow-hidden shadow-md">
                  <img src="/image/vivekanand.png" className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="sm:col-span-2">
                <p className="text-lg sm:text-xl font-merriweather leading-snug text-gray-800">
                  “Strength is life. Weakness is death.”
                </p>
                <p className="mt-4 font-poppins text-gray-900 font-semibold text-base">
                  — Swami Vivekananda
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default OrganizingCommitteePage;
