import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const AboutPage = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  return (
    <>
      <Helmet>
        <title>About Us - Bharatiya Youth Parliament</title>
      </Helmet>

      {/* -----------------------------------
          HERO SECTION
      ------------------------------------ */}
      <section
        className="relative w-full bg-center bg-cover bg-no-repeat py-24 md:py-28"
        style={{ backgroundImage: `url('/image/cover.jpg')` }}
      >
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-4xl mx-auto px-4"
        >
          <h1 className="font-poppins font-bold text-4xl md:text-6xl text-white mb-4 tracking-tight">
            <span className="text-[#a0291f]">About BYP</span>
          </h1>

          <p className="font-merriweather text-base md:text-lg text-black max-w-2xl mx-auto">
            Learn about the vision, mission, and purpose behind the Bharatiya Youth Parliament.
          </p>
        </motion.div>
      </section>

      {/* -------------------------- ABOUT SECTION -------------------------- */}
      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">

            <motion.div {...fadeIn} className="md:col-span-5 flex justify-center">
              <img
                src="/image/swamiji.png"
                alt="Swami Vivekananda"
                className="max-h-[360px] md:max-h-[520px] object-contain drop-shadow-xl rounded-xl w-full"
              />
            </motion.div>

            <motion.div {...fadeIn} className="md:col-span-7 space-y-6">
              <h1 className="font-poppins font-bold text-3xl md:text-4xl text-[#a0291f]">
                About Bharatiya Youth Parliament
              </h1>

              <p className="font-merriweather text-gray-700 leading-relaxed text-[11px] md:text-sm">
                The Youth Parliament, a flagship initiative of the Government of India, stands as a testament to the spirit
                of participatory democracy, empowering students and youth to contribute meaningfully to the nation’s
                developmental vision and democratic ethos.
              </p>

              <p className="font-merriweather text-gray-700 leading-relaxed text-[11px] md:text-sm">
                Under the inspiring leadership of Hon’ble Prime Minister Shri Narendra Modi Ji, India continues its journey
                of holistic national development. With the objective of strengthening nation-building among youth and
                deepening their faith in democratic values, the concept of the Bharatiya Youth Parliament was envisioned.
              </p>

              <p className="font-merriweather text-gray-700 leading-relaxed text-[11px] md:text-sm">
                The first Bharatiya Youth Parliament was successfully organized in 2025. Following its success, our
                organization (SRRO) will now conduct this event annually on the inspiring occasion of Swami Vivekananda
                Ji’s birth anniversary. The 2nd Bharatiya Youth Parliament is scheduled on the 163rd Birth Anniversary of
                Swami Vivekananda, Monday, 12th January 2026, in New Delhi, on a grand scale.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* -------------------------- MISSION SECTION -------------------------- */}
      <section className="bg-white py-6 md:py-8">
        <div className="container mx-auto px-4">

          <motion.div {...fadeIn}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <h2 className="font-poppins font-bold text-3xl md:text-4xl text-[#a0291f] mb-4">
              Our Mission
            </h2>
            <p className="font-merriweather text-gray-700 text-[11px] md:text-sm leading-relaxed">
             The Bharatiya Youth Parliament seeks to empower India’s youth by providing a dynamic platform
              for dialogue, leadership development and governance simulations. Rooted in the ethos of
               Vasudhaiva Kutumbakam (The World is One Family) this initiative aspires to:
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              "Foster Leadership: Cultivate critical thinking, advocacy, and decision-making skills.",
              "Encourage Active Participation: Engage youth in governance and national policy-making.",
              "Promote Constitutional Awareness: Instill responsible citizenship and respect for democratic values.",
              "Nurture Transformation: Inspire reforms and bridge societal divides through meaningful dialogue."
            ].map((item, i) => (
              <motion.div key={i} {...fadeIn}
                className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-[#a0291f]"
              >
                <p className="font-merriweather text-gray-700 text-sm md:text-base leading-relaxed">{item}</p>
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* -------------------------- VISION SECTION -------------------------- */}
      <section className="bg-white py-6 md:py-8">
        <div className="container mx-auto px-4">

          <motion.div {...fadeIn}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <h2 className="font-poppins font-bold text-3xl md:text-4xl text-[#a0291f] mb-4">
              Our Vision
            </h2>
            <p className="font-merriweather text-gray-700 text-[11px] md:text-sm leading-relaxed">
              The Bharatiya Youth Parliament envisions an empowered generation of young
               Indians who are informed, responsible, and dedicated to nation building. 
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              "Empower Youth for Viksit Bharat @2047: Inspire young citizens to contribute towards building a developed, inclusive, and self-reliant India. ",
              "Strengthen Democratic Values: Nurture respect for the Constitution, unity in diversity and participatory governance.",
              "Promote Global Citizenship: Encourage youth to act as ambassadors of peace, sustainability and human values on the world stage.",
              "Bridge Aspirations with Action: Transform youth potential into purposeful leadership that shapes India’s social, economic and moral progress."
            ].map((item, i) => (
              <motion.div key={i} {...fadeIn}
                className="bg-gray-50 p-6 rounded-xl shadow-lg border-l-4 border-[#a0291f]"
              >
                <p className="font-merriweather text-gray-700 text-sm md:text-base leading-relaxed">{item}</p>
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* -------------------------- DISCUSSION & DEBATE SECTION -------------------------- */}
      <section className="bg-white py-6 md:py-8">
        <div className="container mx-auto px-4">

          <motion.h2 {...fadeIn}
            className="font-poppins font-bold text-3xl md:text-4xl text-center text-[#a0291f] mb-10"
          >
            Discussion & Debate – BYP 2026
          </motion.h2>

          <motion.div {...fadeIn}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <h3 className="font-poppins font-semibold text-2xl md:text-3xl text-gray-900 mb-4">
              Event Theme: KUTUMB PRABODHAN
            </h3>
            <p className="font-merriweather text-gray-700 text-[11px] md:text-sm leading-relaxed">
              The theme “Kutumb Prabodhan – Strengthening the Spirit of One Family” draws inspiration from the ancient
              Indian ideal of Vasudhaiva Kutumbakam. It calls upon the youth to recognize their role as responsible
              members of a larger human family, fostering unity, compassion, and collective progress.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                title: "One Nation, One Election",
                text: "Delegates will explore the concept of conducting simultaneous elections across the nation, analyzing its potential to enhance governance efficiency, ensure policy continuity and reduce the financial and administrative burden on the electoral system. The debate will also examine its implications for democratic participation and long-term stability. "
              },
              {
                title: "Civic Duty – Building Responsible Citizens",
                text: "This session will highlight the importance of nurturing responsible, aware and ethically grounded citizens. Discussions will revolve around civic consciousness, moral integrity and active participation in public life essential values for sustaining a vibrant democracy and building a socially responsible nation."
              },
              {
                title: "Viksit Bharat @2047",
                text: "As India approaches the centenary of independence, this dialogue will focus on the roadmap to achieving a developed and empowered India by 2047. Themes such as innovation, skill development, sustainable growth and inclusive progress will guide the exchange, underscoring the youth’s central role in shaping the nation’s Amrit Kaal."
              },
              {
                title: "India's Bid for Permanent UN Security Council Membership",
                text: "Participants will deliberate on India’s rightful claim for a permanent seat in the UN Security Council, acknowledging its contributions to global peacekeeping, diplomacy and humanitarian leadership. The discussion will emphasize India’s growing stature as a moral and democratic voice for the Global South, advocating for equality, fairness and world harmony."
              },
              {
                title: "Uniform Civil Code",
                text: "This session will invite informed and balanced debate on the Uniform Civil Code as a means of promoting social justice, gender equality and national integration. Delegates will examine its constitutional, cultural and ethical dimensions, fostering dialogue that respects diversity while envisioning unity in common civil rights. The Bharatiya Youth Parliament 2026 aims to serve as a dynamic platform for youth dialogue, democratic engagement, and national vision-building. Rooted in the spirit of Kutumb Prabodhan, it seeks to empower young minds to think beyond self-interest, act with empathy and contribute to the creation of a world guided by peace, equality, and shared humanity."
              }
            ].map((item, i) => (
              <motion.div key={i} {...fadeIn}
                className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-[#a0291f]"
              >
                <h4 className="font-poppins font-semibold text-xl text-gray-900 mb-3">
                  {item.title}
                </h4>
                <p className="font-merriweather text-gray-700 text-sm md:text-base leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    {/* ============================================
        PREMIUM SCROLLABLE BOX SECTION (UPDATED)
    ===============================================*/}


   <section className="py-20 bg-white">
     <div className="container mx-auto px-4">

     {/* Section Title */}
     <div className="text-center mb-14">
      <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-center mb-10 text-gray-900">
        Rules & Parliamentary Roles
      </h2>
      <div className="mt-3 h-1 w-24 bg-[#a0291f] mx-auto rounded-full"></div>
     </div>

     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

      {/* ------------------ BOX 1 ------------------ */}
      <div className="bg-white p-6 sm:p-8 shadow-md border border-gray-200 rounded-2xl hover:shadow-xl transition">
        <h3 className="font-poppins text-xl sm:text-2xl text-[#a0291f] mb-4">
          GENERAL PARTICIPANT (Quiz & Attendance)
        </h3>
        <p className="text-indigo-600 font-medium mb-4 text-sm">
          Scroll to Read
        </p>

        {/* Scrollable Content */}
        <div className="max-h-[380px] overflow-y-auto pr-3 space-y-6 custom-scroll text-sm leading-relaxed text-gray-700">

          <div>
            <h4 className="font-semibold text-gray-900 mb-1">Bharatiya Youth Parliament – 12 January 2026</h4>
          </div>

          {/* 1. Eligibility */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">1. Eligibility</h4>
            <ul className="list-disc ml-5 space-y-1">
              <li>Open to youth and students attending the event either offline or online</li>
              <li>Participants must not be registered as Youth MP, Opposition Leader, Council of Ministers, or Global Summit speaker</li>
            </ul>
          </div>

          {/* 2. Quiz Participation */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">2. Quiz Participation</h4>
            <ul className="list-disc ml-5 space-y-1">
              <li>Eligible to participate in Swami Vivekananda General Knowledge Award</li>
              <li>Quiz winners will be selected by the Jury</li>
              <li>On-ground participants are eligible for cash prizes</li>
              <li>Online participants receive gift vouchers</li>
            </ul>
          </div>

          {/* 3. Seating Policy */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">3. Seating Policy (Offline)</h4>
            <ul className="list-disc ml-5 space-y-1">
              <li>Early arrival → Hall No. 1</li>
              <li>Late arrival → Hall No. 2 (Live Display Hall)</li>
              <li>Both halls are considered official event areas</li>
            </ul>
          </div>

          {/* 4. Benefits */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">4. Benefits</h4>
            <ul className="list-disc ml-5 space-y-1">
              <li>Participation Certificate</li>
              <li>Student Kit (offline)</li>
              <li>Digital certificates (online)</li>
              <li>Mentorship & guidance every 3–4 months</li>
              <li>Parliamentary research papers after every Parliament session</li>
            </ul>
          </div>

          {/* 5. Discipline */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">5. Discipline & Disqualification</h4>
            <ul className="list-disc ml-5 space-y-1">
              <li>Indiscipline, cheating, or misconduct may lead to disqualification</li>
              <li>Management decisions are final</li>
            </ul>
          </div>

          {/* 6. Fees */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">6. Fees</h4>
            <ul className="list-disc ml-5 space-y-1">
              <li>Participation fee is not a donation</li>
              <li>Fee ensures seriousness and quality participation</li>
            </ul>
          </div>

        </div>
      </div>


      {/* ------------------ BOX 2 ------------------ */}
      <div className="bg-white p-6 sm:p-8 shadow-md border border-gray-200 rounded-2xl hover:shadow-xl transition">
        <h3 className="font-poppins text-xl sm:text-2xl text-[#a0291f] mb-4">
        Youth Member of Parliament & Parliamentary Roles
      </h3>
      <p className="text-indigo-600 font-medium mb-4 text-sm">Scroll to Read</p>

  {/* Scrollable Content */}
  <div className="max-h-[380px] overflow-y-auto pr-3 space-y-6 custom-scroll text-sm leading-relaxed text-gray-700">

    <p className="italic text-gray-800">
      (Youth MP, Opposition Leader, Council of Ministers)
    </p>

    {/* 1. Total Participation */}
    <div>
      <h4 className="font-semibold text-gray-900 mb-1">1. Total Participation & Seat Allocation</h4>
      <ul className="list-disc ml-5 space-y-1">
        <li>A total of 100 Youth Parliamentary Participants will be registered.</li>
        <li>Seats will be divided as follows:</li>
        <ul className="list-disc ml-8 space-y-1">
          <li>50 participants – Ruling Side (Treasury Benches)</li>
          <li>50 participants – Opposition Side</li>
        </ul>
        <li>Allocation between Ruling and Opposition sides will be done by the Jury and Organising Committee based on evaluation.</li>
      </ul>
    </div>

    {/* 2. Cabinet Selection */}
    <div>
      <h4 className="font-semibold text-gray-900 mb-1">2. Selection of Cabinet Members & Opposition Leader</h4>
      <ul className="list-disc ml-5 space-y-1">
        <li>From the Ruling Side, the Council of Ministers will be selected.</li>
        <li>From the Opposition Side, one Youth Opposition Leader will be appointed.</li>
        <li>Selections will be based on:
          <ul className="list-disc ml-8 space-y-1">
            <li>Video submissions</li>
            <li>Evaluation marks</li>
            <li>Leadership quality</li>
            <li>Educational background</li>
          </ul>
        </li>
      </ul>
    </div>

    {/* 3. Mandatory Videos */}
    <div>
      <h4 className="font-semibold text-gray-900 mb-1">3. Mandatory Video Submissions</h4>
      <ul className="list-disc ml-5 space-y-1">
        <li>Video Introduction</li>
        <li>Appeal Video (uploaded on social media with link submission)</li>
        <li>Oath Video (mandatory after selection)</li>
        <li>❗ Failure to submit videos will result in transfer to General Participant category.</li>
      </ul>
    </div>

    {/* 4. Video Requirements */}
    <div>
      <h4 className="font-semibold text-gray-900 mb-1">4. Video Quality & Topic Requirement</h4>
      <ul className="list-disc ml-5 space-y-1">
        <li>Videos must be in good quality (HD / preferably 4K).</li>
        <li>Content must strictly follow the registered topic.</li>
        <li>Poor-quality or off-topic submissions may reduce marks or lead to rejection.</li>
      </ul>
    </div>

    {/* 5. Evaluation Marks */}
    <div>
      <h4 className="font-semibold text-gray-900 mb-1">5. Evaluation & Marking Criteria (Total: 10 Marks)</h4>
      <ul className="list-disc ml-5 space-y-1">
        <li>Timely Video Submission – 1 Mark</li>
        <li>BYP Collaboration / Co-promotion Video – 1 Mark</li>
        <li>Higher Education (PG or above) – 1 Mark</li>
        <li>Political / Governance Academic Background – 1 Mark</li>
        <li>Speaking Skills & Communication – 2 Marks</li>
        <li>Leadership & Confidence – 2 Marks</li>
        <li>Vision for India & Democratic Understanding – 2 Marks</li>
      </ul>
      <p className="mt-2 text-gray-800">
        Final role allocation will depend on scores, video performance, and educational background.
      </p>
    </div>

    {/* 6. Jury Authority */}
    <div>
      <h4 className="font-semibold text-gray-900 mb-1">6. Jury & Committee Authority</h4>
      <ul className="list-disc ml-5 space-y-1">
        <li>Allocate Ruling or Opposition seats</li>
        <li>Select Cabinet Ministers</li>
        <li>Appoint Opposition Leader</li>
        <li>Reassign roles or transfer categories</li>
        <li>All decisions are final, binding, and non-appealable.</li>
      </ul>
    </div>

    {/* 7. Social Media */}
    <div>
      <h4 className="font-semibold text-gray-900 mb-1">7. Social Media Engagement</h4>
      <ul className="list-disc ml-5 space-y-1">
        <li>Participants promoting BYP may receive additional evaluation consideration.</li>
        <li>BYP retains rights to use participant-submitted or public content for promotion.</li>
      </ul>
    </div>

    {/* 8. Quiz Restriction */}
    <div>
      <h4 className="font-semibold text-gray-900 mb-1">8. Quiz Restriction</h4>
      <p>Youth MPs and Parliamentary Role Participants are not eligible for quiz participation.</p>
    </div>

    {/* 9. Best Youth MP Award */}
    <div>
      <h4 className="font-semibold text-gray-900 mb-1">9. Best Youth Member of Parliament Award</h4>
      <ul className="list-disc ml-5 space-y-1">
        <li>One award will be conferred.</li>
        <li>Prize: ₹11,000 + Certificate of Excellence</li>
        <li>Based on performance, conduct, leadership, and theme adherence.</li>
      </ul>
    </div>

    {/* 10. Logistics */}
    <div>
      <h4 className="font-semibold text-gray-900 mb-1">10. Logistics & Conduct</h4>
      <ul className="list-disc ml-5 space-y-1">
        <li>No TA/DA or accommodation will be provided.</li>
        <li>High standards of discipline and parliamentary decorum are mandatory.</li>
      </ul>
    </div>

    {/* 11. Acceptance */}
    <div>
      <h4 className="font-semibold text-gray-900 mb-1">11. Acceptance of Conditions</h4>
      <ul className="list-disc ml-5 space-y-1">
        <li>Participants accept the 50 Ruling / 50 Opposition seat system.</li>
        <li>Participants accept video, evaluation, and jury requirements.</li>
        <li>All role decisions are final.</li>
      </ul>
    </div>

    {/* 12. Parliamentary Proceedings */}
    <div>
      <h4 className="font-semibold text-gray-900 mb-1">12. Parliamentary Proceedings: Zero Hour & Question Hour</h4>

      <h5 className="font-semibold text-gray-800 mt-2">Zero Hour</h5>
      <ul className="list-disc ml-5 space-y-1">
        <li>15–20 Youth MPs will be selected to raise public issues.</li>
        <li>Selection based on preparedness, relevance, conduct, and evaluation marks.</li>
        <li>Performance is evaluated and scored by Jury & Committee.</li>
      </ul>

      <h5 className="font-semibold text-gray-800 mt-3">Question Hour</h5>
      <ul className="list-disc ml-5 space-y-1">
        <li>5–10 Youth MPs will ask ministry-related questions.</li>
        <li>Youth Ministers must answer with clarity and decorum.</li>
        <li>Both questioners and ministers are evaluated.</li>
      </ul>

      <h5 className="font-semibold text-gray-800 mt-3">Evaluation & Marking</h5>
      <ul className="list-disc ml-5 space-y-1">
        <li>Participation, clarity, discipline, and adherence to rules are evaluated.</li>
        <li>Scores may influence awards and ministerial appreciation.</li>
        <li>Jury may regulate time, select speakers, or modify proceedings.</li>
        <li>All decisions are final and non-appealable.</li>
      </ul>

    </div>
  </div>
      </div>

      {/* ------------------ BOX 3 ------------------ */}
      <div className="bg-white p-6 sm:p-8 shadow-md border border-gray-200 rounded-2xl hover:shadow-xl transition">
        <h3 className="font-poppins text-xl sm:text-2xl text-[#a0291f] mb-4">
          Global Summit Participation
        </h3>
      <p className="text-indigo-600 font-medium mb-4 text-sm">Scroll to Read</p>

  {/* Scrollable Content */}
  <div className="max-h-[380px] overflow-y-auto pr-3 space-y-6 custom-scroll text-sm leading-relaxed text-gray-700">

    <p className="italic text-gray-800">
      (Bharatiya Youth Parliament – 12 January 2026)
    </p>

    {/* 1. Nature of Global Summit */}
    <div>
      <h4 className="font-semibold text-gray-900 mb-1">1. Nature of the Global Summit</h4>
      <ul className="list-disc ml-5 space-y-1">
        <li>The Global Summit is a special youth platform conducted parallel to the Bharatiya Youth Parliament.</li>
        <li>It encourages:
          <ul className="list-disc ml-8 space-y-1">
            <li>Leadership thinking</li>
            <li>Nation-building vision</li>
            <li>Policy-oriented discussion</li>
            <li>Motivational and thematic speeches</li>
          </ul>
        </li>
        <li>Follows an open but evaluated format similar to a national youth conclave.</li>
      </ul>
    </div>

    {/* 2. Eligibility & Registration */}
    <div>
      <h4 className="font-semibold text-gray-900 mb-1">2. Eligibility & Registration</h4>
      <ul className="list-disc ml-5 space-y-1">
        <li>Open to students, youth leaders, professionals, aspiring policymakers, and socially active youth.</li>
        <li>Registration may be done via:
          <ul className="list-disc ml-8 space-y-1">
            <li>Official BYP website</li>
            <li>Social media links</li>
            <li>Institutional nomination</li>
            <li>Open digital forms</li>
          </ul>
        </li>
        <li>Mere registration does not guarantee a speaking opportunity.</li>
      </ul>
    </div>

    {/* 3. Mandatory Video Submission */}
    <div>
      <h4 className="font-semibold text-gray-900 mb-1">3. Mandatory Video Submission</h4>
      <ul className="list-disc ml-5 space-y-1">
        <li>A short speech video on the selected topic/theme is mandatory.</li>
        <li>Video requirements:
          <ul className="list-disc ml-8 space-y-1">
            <li>Clear audio & video (HD/4K preferred)</li>
            <li>Speaker must be clearly visible</li>
            <li>Topic must match the registered theme</li>
            <li>No abusive or objectionable content</li>
          </ul>
        </li>
        <li>Applications without video will not be considered for speaking slots.</li>
      </ul>
    </div>

    {/* 4. Selection & Evaluation */}
    <div>
      <h4 className="font-semibold text-gray-900 mb-1">4. Selection & Evaluation Process</h4>
      <ul className="list-disc ml-5 space-y-1">
        <li>Videos evaluated based on:
          <ul className="list-disc ml-8 space-y-1">
            <li>Clarity of thought</li>
            <li>Public speaking ability</li>
            <li>Vision for India</li>
            <li>Confidence & communication</li>
            <li>Originality of ideas</li>
          </ul>
        </li>
        <li>Only limited participants are selected due to time constraints.</li>
        <li>Jury reserves full rights to approve/reject applicants, decide order, duration, and themes.</li>
        <li>All decisions are final and binding.</li>
      </ul>
    </div>

    {/* 5. Speaking Opportunity */}
    <div>
      <h4 className="font-semibold text-gray-900 mb-1">5. Speaking Opportunity & Event Protocol</h4>
      <ul className="list-disc ml-5 space-y-1">
        <li>Selected participants receive a fixed time slot.</li>
        <li>Speakers must:
          <ul className="list-disc ml-8 space-y-1">
            <li>Follow time limits</li>
            <li>Maintain discipline and decorum</li>
            <li>Respect stage instructions</li>
          </ul>
        </li>
        <li>Violations may lead to speech stoppage, disqualification, or removal.</li>
      </ul>
    </div>

    {/* 6. Logistics */}
    <div>
      <h4 className="font-semibold text-gray-900 mb-1">6. Travel, Stay & Allowances</h4>
      <ul className="list-disc ml-5 space-y-1">
        <li>BYP does not provide TA/DA, accommodation, or food arrangements.</li>
        <li>All logistics are the participant’s responsibility.</li>
      </ul>
    </div>

    {/* 7. Institutional / Remote Participation */}
    <div>
      <h4 className="font-semibold text-gray-900 mb-1">7. Institutional / Remote Participation</h4>
      <ul className="list-disc ml-5 space-y-1">
        <li>Online participation may be arranged for institutions unable to come to Delhi.</li>
        <li>Participation must occur from an official hall/auditorium.</li>
        <li>Such participants will be evaluated separately and will not receive TA/DA.</li>
      </ul>
    </div>

    {/* 8. Certification */}
    <div>
      <h4 className="font-semibold text-gray-900 mb-1">8. Certification & Exposure</h4>
      <ul className="list-disc ml-5 space-y-1">
        <li>All participants receive an official participation certificate.</li>
        <li>Access to research material and guidance periodically.</li>
        <li>Selected speakers may receive national exposure and future BYP opportunities.</li>
      </ul>
    </div>

    {/* 9. Media Rights */}
    <div>
      <h4 className="font-semibold text-gray-900 mb-1">9. Content Rights & Media Usage</h4>
      <ul className="list-disc ml-5 space-y-1">
        <li>BYP reserves the right to record, publish, and use submitted/public content for educational and promotional purposes.</li>
        <li>No objections or claims will be entertained.</li>
      </ul>
    </div>

    {/* 10. Code of Conduct */}
    <div>
      <h4 className="font-semibold text-gray-900 mb-1">10. Code of Conduct</h4>
      <p>Indiscipline, misrepresentation, political misuse, or false information may result in immediate disqualification.</p>
    </div>

    {/* 11. Authority */}
    <div>
      <h4 className="font-semibold text-gray-900 mb-1">11. Authority & Amendments</h4>
      <ul className="list-disc ml-5 space-y-1">
        <li>BYP may modify rules, adjust schedules, limit participation, or introduce changes.</li>
        <li>Participation confirms acceptance of all terms.</li>
      </ul>
    </div>

    {/* 12. Limited Seats & Speaking Selection */}
    <div>
      <h4 className="font-semibold text-gray-900 mb-1">12. Limited Seats & Speaking Selection (Global Summit)</h4>
      <ul className="list-disc ml-5 space-y-1">
        <li>Global Summit capacity: 60 participants only.</li>
        <li>Only 15–20 selected speakers will speak on the central stage.</li>
        <li>Speaking opportunities are based on a structured lottery system + jury evaluation + time availability.</li>
        <li>Registration does not guarantee speaking.</li>
        <li>Non-selected participants:
          <ul className="list-disc ml-8 space-y-1">
            <li>Recognized as Global Summit Delegates</li>
            <li>Receive participation certificates</li>
            <li>Remain part of all summit proceedings</li>
          </ul>
        </li>
        <li>Final decisions on speakers and order rest with the Jury and Organising Committee.</li>
        <li>Participants voluntarily agree to accept all outcomes without dispute.</li>
      </ul>
    </div>

  </div>
      </div>

  </div>
    </div>
  </section>

    </>
  );
};
export default AboutPage;
