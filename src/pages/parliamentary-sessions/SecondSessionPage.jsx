import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 },
};

const SecondSessionPage = () => {
  // COUNTDOWN LOGIC
  const calculateTimeLeft = () => {
    const eventDate = new Date("2026-01-12T11:00:00");
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

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  // DATA
  const data = {
    banner: "/image/cover.jpg",
    title: "2nd Bharatiya Youth Parliament",
    date: "12 January 2026 (Monday)",
    time: "11:00 AM – 06:30 PM",
    venue: "Talkatora Stadium, New Delhi",

    mission: [
      "To empower youth through dialogue, debate and democratic participation.",
      "To cultivate leadership, civic responsibility and constitutional awareness.",
      "To inspire collective action for Viksit Bharat @2047 and global harmony.",
    ],

    vision: [
      "To build a generation of informed, ethical and responsible youth leaders.",
      "To strengthen democratic values and national unity through Karmab Pradhan.",
      "To position India’s youth as global ambassadors of peace, progress and humanity.",
    ],

    highlights: [
      {
        title: "Structure & Proceedings of the Forum",
        description:
          "The Parliamentary Forum replicates the authentic procedure of a legislative assembly for educational democratic learning.",
      },
      {
        title: "Components of the House",
        description:
          "Includes Speaker, Council of Ministers, Opposition, Ruling Party Members, and Independent Observers to ensure balanced participation.",
      },
      {
        title: "Session Format",
        description:
          "Includes Inaugural, Government Policy, Structured Discussion, Question Hour, Open Forum, and Valedictory Sessions.",
      },
      {
        title: "Interactive Youth Engagement",
        description:
          "Participants raise questions, debate, present views and propose reforms on real national issues.",
      },
    ],

    topics: [
      "One Nation, One Election",
      "India’s Bid for Permanent Membership in the UN Security Council",
      "Civic Duty – Building Responsible Citizens",
      "Uniform Civil Code",
    ],

    awards: [
      {
        title: "Swami Vivekananda Award",
        description:
          "Awarded for extraordinary impact in peace, education, environment, social upliftment & youth empowerment.",
      },
      {
        title: "Other Awards",
        description:
          "Recognising excellence in leadership, participation and impactful contribution during BYP 2026.",
      },
    ],
  };

  return (
    <>
      {/* ============================
          HERO SECTION
      ============================ */}
      <section
  className="relative w-full h-[40vh] sm:h-[50vh] bg-cover bg-center"
  style={{ backgroundImage: `url(${data.banner})` }}
>
  <div className="absolute inset-0 bg-white/70"></div>

  <div className="relative z-20 flex flex-col items-center justify-center text-center h-full text-white px-4">
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-3xl sm:text-4xl md:text-6xl font-poppins font-bold mb-4 text-[#a0291f]"
    >
      2nd Bharatiya Youth Parliament
    </motion.h1>

    <div className="flex flex-col md:flex-row gap-4 md:gap-6 mt-4 text-base sm:text-lg font-merriweather text-black">
      <p className="flex items-center">
        <Calendar className="mr-2 text-white" /> 12 January 2026 (Monday)
      </p>
      <p className="flex items-center">
        <Clock className="mr-2 text-white" /> 11:00 AM – 06:30 PM
      </p>
      <p className="flex items-center">
        <MapPin className="mr-2 text-white" /> Talkatora Stadium, New Delhi
      </p>
    </div>
  </div>
      </section>

      {/* ============================
          EVENT BOX (MODERN)
      ============================ */}
      <section className="bg-white py-14 md:py-20">
        <motion.div
          {...fadeIn}
          className="container mx-auto px-4 flex justify-center"
        >
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
            className="bg-[#fff7f6] shadow-2xl rounded-3xl p-10 max-w-4xl w-full border border-[#f0d7d4]"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center font-poppins text-[#a0291f] mb-4">
              {data.title}
            </h2>

            <p className="text-center text-lg font-merriweather text-gray-700 mb-6">
              Organized by{" "}
              <span className="font-semibold text-gray-900">
                Social Reform And Research Organization (SRRO)
              </span>
            </p>

            {/* Venue */}
            <p className="text-center text-gray-800 text-lg font-poppins">
              <span className="font-semibold">Venue:</span> {data.venue}
            </p>

            {/* Date */}
            <p className="text-center text-gray-800 text-lg font-poppins">
              <span className="font-semibold">Date:</span> {data.date}
            </p>

            {/* Time */}
            <p className="text-center text-gray-800 text-lg mb-6 font-poppins">
              <span className="font-semibold">Time:</span> {data.time}
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

      {/* ============================
          ABOUT SRRO
      ============================ */}
      <section className="bg-white py-6 md:py-8">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            {...fadeIn}
            className="lg:col-span-5 flex justify-center"
          >
           <img
            src="/image/SRRO.png"
            className="rounded-2xl shadow-xl w-40 sm:w-44 object-contain mx-auto"
          />
          </motion.div>

          <motion.div
            {...fadeIn}
            className="lg:col-span-7"
          >
            <h2 className="font-poppins font-bold text-3xl md:text-4xl text-gray-900 mb-4">
              About SRRO
            </h2>

            <p className="font-merriweather text-lg text-gray-700 leading-relaxed mb-6">
              The Social Reform & Research Organization (SRRO) is dedicated to
              societal development through youth engagement, policy awareness,
              leadership training and national unity initiatives.
            </p>

            <a
              href="https://srro.in"
              target="_blank"
              className="inline-block bg-[#a0291f] hover:bg-[#7a1f17] text-white px-8 py-3 rounded-xl font-poppins font-semibold"
            >
              Visit SRRO Website
            </a>
          </motion.div>
        </div>
      </section>

      {/* ============================
          ABOUT BYP
      ============================ */}
      <section className="bg-white py-6 md:py-8">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div {...fadeIn} className="lg:col-span-4 flex justify-center">
            <img
              src="/image/vivekanand.png"
              alt="About BYP"
              className="rounded-2xl shadow-xl w-full max-w-xs sm:max-w-sm object-cover mx-auto"
            />
          </motion.div>

          <motion.div {...fadeIn} className="lg:col-span-8">
            <h2 className="font-poppins font-bold text-3xl md:text-4xl text-gray-900 mb-2">
              About Bharatiya Youth Parliament
            </h2>

            <p className="font-poppins text-xl text-[#a0291f] font-semibold mb-6">
              Transformative Leadership for a Better Tomorrow
            </p>

            <div className="font-merriweather text-lg text-gray-700 space-y-4">
              <p>
                Empowering young citizens to engage in democratic processes,
                policy discussions and nation-building frameworks.
              </p>
              <p>
                BYP helps build confidence, leadership and responsibility in
                youth while enabling them to participate in real-life policy
                simulations.
              </p>
            </div>

            <a
              href="/about"
              className="inline-block mt-6 bg-[#a0291f] hover:bg-[#7a1f17] text-white px-8 py-3 rounded-xl font-poppins font-semibold"
            >
              Learn More About BYP
            </a>
          </motion.div>
        </div>
      </section>

      {/* ============================
          SUPPORTING PARTNERS
      ============================ */}
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

      <section className="bg-white py-10 w-full">
          <div className="w-full text-center">

            <h2 className="font-poppins font-bold text-3xl mb-10">
              Event Brochure
            </h2>

            {/* Full-width background, but PDF stays centered */}
            <div className="w-full bg-gray-50 py-18">

              {/* PDF container (center + A4 size) */}
              <div className="mx-auto w-full flex justify-center">

                <div
                  className="overflow-y-scroll bg-white shadow-xl border"
                  style={{
                    width: "794px",   // A4 width
                    height: "1123px", // A4 height
                  }}
                >
                  <iframe
                    src="/image/Brouchure.pdf"
                    title="Event Brochure"
                    className="w-full h-full"
                    style={{ border: "none" }}
                  />
                </div>
              </div>
            </div>
          </div>
      </section>

      {/* ============================
          MISSION-VISION (Already done)
          HIGHLIGHTS
          TOPICS
          AWARDS
          (Already included above)
      ============================ */}

    </>
  );
};

export default SecondSessionPage;
