import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

const TandCPage = () => {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions - Bharatiya Youth Parliament</title>
        <meta name="description" content="Terms & Conditions for participation in the Bharatiya Youth Parliament 2026 events." />
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
              Terms & <span className="text-[#a0291f]">Conditions</span>
            </h1>
            <p className="font-merriweather text-lg text-gray-700 max-w-3xl mx-auto">
              Swami Vivekananda National Quiz & Youth Participation Guidelines – Bharatiya Youth Parliament 2026
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto font-merriweather text-gray-700 space-y-6">
            
            <p>These Terms & Conditions govern participation in the Swami Vivekananda National Quiz and the Youth Leadership Selection Process of the Bharatiya Youth Parliament (BYP) 2026, conducted at Talkatora Stadium, New Delhi, and simultaneously online.</p>

            <h2 className="font-poppins font-bold text-2xl text-gray-900 pt-4">1. Eligibility for Quiz Participation</h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>Participation is strictly for youth attendees who are NOT taking part in the following roles:
                <ul className="list-disc ml-6">
                  <li>Youth Member of Parliament</li>
                  <li>Opposition Leader</li>
                  <li>Council of Ministers</li>
                  <li>Global Summit Delegate</li>
                  <li>Any other official role in the main BYP event</li>
                </ul>
              </li>
              <li>Students engaged in these roles are not eligible due to their active responsibilities.</li>
            </ul>

            <h2 className="font-poppins font-bold text-2xl text-gray-900 pt-4">2. Right to Disqualify</h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>BYP Management Authority reserves the right to disqualify any participant for:
                <ul className="list-disc ml-6">
                  <li>Indiscipline</li>
                  <li>Cheating or malpractice</li>
                  <li>Misbehavior or misconduct</li>
                  <li>Unauthorized use of devices</li>
                  <li>Any act violating event norms</li>
                </ul>
              </li>
              <li>The decision of the management will be final and binding.</li>
            </ul>

            <h2 className="font-poppins font-bold text-2xl text-gray-900 pt-4">3. Prize Eligibility for On-Ground Participants (Delhi Venue)</h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>Only students physically present at Talkatora Stadium, New Delhi on 12 January 2026 are eligible for the top 3 cash prizes:</li>
            </ul>
            <p className="ml-6 font-semibold">🏆 Prize Structure</p>
            <ul className="list-disc ml-12 space-y-1">
              <li>1st Prize: ₹51,000/-</li>
              <li>2nd Prize: ₹21,000/-</li>
              <li>3rd Prize: ₹11,000/-</li>
            </ul>
            <p className="ml-6">Absence at the time of verification will invalidate the claim.</p>

            <h2 className="font-poppins font-bold text-2xl text-gray-900 pt-4">4. Eligibility & Benefits for Online Participants</h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>Students participating ONLINE are not eligible for the top 3 cash prizes.</li>
              <li>They will receive Gift Vouchers / Coupon Vouchers based on ranking (1st, 2nd & 3rd) via email/SMS.</li>
            </ul>

            <h2 className="font-poppins font-bold text-2xl text-gray-900 pt-4">5. Jury Evaluation</h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>All quiz answers are evaluated by a BYP Jury Panel based on:
                <ul className="list-disc ml-6">
                  <li>Accuracy</li>
                  <li>Speed</li>
                  <li>Concept clarity</li>
                  <li>Discipline</li>
                  <li>Consistency in responses</li>
                </ul>
              </li>
              <li>The Jury’s decision is final and non-negotiable.</li>
            </ul>

            <h2 className="font-poppins font-bold text-2xl text-gray-900 pt-4">6. Non-Eligibility of BYP Role Participants</h2>
            <p>Students actively participating as Youth MPs, Opposition Leaders, Ministers, or Global Summit Delegates cannot take part in the quiz due to official commitments.</p>

            <h2 className="font-poppins font-bold text-2xl text-gray-900 pt-4">7. Special Provision for Associated Universities/Institutions</h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>BYP provides Online Quiz Facility for students who cannot travel to Delhi.</li>
              <li>Participation from college auditoriums is allowed only if official hall is allotted.</li>
              <li>Separate rankings and special gift vouchers will be provided.</li>
              <li>Online-category students can register for official BYP roles but will not receive TA/DA.</li>
            </ul>

            <h2 className="font-poppins font-bold text-2xl text-gray-900 pt-4">8. Youth Applying for Parliamentary Roles Through Social Media / Open Registration</h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>Applicants must upload/share a video introduction.</li>
              <li>Evaluation based on:
                <ul className="list-disc ml-6">
                  <li>Public speaking</li>
                  <li>Leadership quality</li>
                  <li>Clarity of thought</li>
                  <li>Confidence</li>
                  <li>Awareness & communication</li>
                </ul>
              </li>
              <li>Selected youth may be invited for BYP roles; no TA/DA is provided.</li>
            </ul>

            <h2 className="font-poppins font-bold text-2xl text-gray-900 pt-4">9. Global Summit Participation – Special Conditions</h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>Participants must arrange travel and accommodation themselves and adhere to the code of conduct.</li>
            </ul>

            <h2 className="font-poppins font-bold text-2xl text-gray-900 pt-4">10. Brand Ambassador Policy</h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>1st Prize winner becomes BYP Official Brand Ambassador for one year.</li>
              <li>Responsibilities include representing BYP at official events and maintaining discipline.</li>
            </ul>

            <h2 className="font-poppins font-bold text-2xl text-gray-900 pt-4">11. General Conditions</h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>All participants must follow event guidelines, instructions, venue rules, and schedules.</li>
              <li>BYP reserves the right to modify rules if required.</li>
              <li>Participation implies agreement to these Terms & Conditions.</li>
            </ul>

          </div>
        </div>
      </section>
    </>
  );
};

export default TandCPage;
