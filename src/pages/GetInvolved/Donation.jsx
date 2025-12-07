import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle, Copy, X } from "lucide-react";

// Adjust this URL to your deployed Cloud Function URL
const API_BASE_URL = "https://us-central1-bharatiya-youth-parliament.cloudfunctions.net/api"; 
// OR use "http://localhost:5001/..." for local testing

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 },
};

const Donation = () => {
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null); // State to control Success Modal

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    pan: "",
    aadhaar: "",
    dob: "",
    pinCode: "",
    address: "",
    city: "",
    state: "",
    amount: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- Load Razorpay Script Helper ---
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // --- Handle Donation Logic ---
  const handleDonate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const donationAmount = Number(formData.amount);

    if (!donationAmount || donationAmount < 1) {
      alert("Please enter a valid donation amount (minimum ₹1).");
      setLoading(false);
      return;
    }

    try {
      // 1. Load Razorpay SDK
      const res = await loadRazorpay();
      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        setLoading(false);
        return;
      }

      // 2. Create Order on Backend
      // Sending amount in PAISE (Amount * 100) to match backend expectation
      const orderResponse = await fetch(`${API_BASE_URL}/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: donationAmount * 100 }),
      });
      
      const orderData = await orderResponse.json();
      if (!orderData.orderId) {
        console.error("Order Creation Error:", orderData);
        alert("Server error. Could not create order. Please try again.");
        setLoading(false);
        return;
      }

      // 3. Open Razorpay Options
      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: "INR",
        name: "Bharatiya Youth Parliament",
        description: "Donation Contribution",
        image: "/logo.png", // Ensure you have a logo in public folder
        order_id: orderData.orderId,
        handler: async function (response) {
          // 4. Verify Payment & Upload Data (ONLY IF SUCCESSFUL)
          try {
            const verifyRes = await fetch(`${API_BASE_URL}/verify-donation`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                formData: formData, // Data is sent here
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              // --- SHOW SUCCESS MODAL ---
              setSuccessData({
                id: verifyData.donationId,
                email: formData.email,
                amount: formData.amount
              });

              // Reset Form
              setFormData({
                fullName: "", email: "", mobile: "", pan: "", aadhaar: "",
                dob: "", pinCode: "", address: "", city: "", state: "", amount: ""
              });
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          } catch (error) {
            console.error(error);
            alert("Error verifying payment.");
          }
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.mobile,
        },
        theme: {
          color: "#a0291f",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error("Donation Error:", error);
      alert("Something went wrong. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  // Helper to copy ID
  const copyToClipboard = () => {
    if(successData?.id) {
       navigator.clipboard.writeText(successData.id);
       alert("Receipt ID copied!");
    }
  };

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative w-full bg-center bg-cover bg-no-repeat py-24 md:py-32" style={{ backgroundImage: `url('/image/cover.jpg')` }}>
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px]" />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 text-center max-w-3xl mx-auto px-4">
          <h1 className="font-poppins font-bold text-4xl md:text-5xl text-white mb-4 drop-shadow-[0_0_10px_rgba(0,0,0,0.6)]">
            <span className="text-[#a0291f]">Support Our Mission</span>
          </h1>
          <p className="font-merriweather text-base md:text-lg text-black max-w-2xl mx-auto drop-shadow-[0_0_8px_rgba(0,0,0,0.6)]">
            Your contribution empowers the youth of India to lead, innovate, and transform society.
          </p>
        </motion.div>
      </section>

      {/* DONATION FORM */}
      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div {...fadeIn} className="bg-gray-50 shadow-xl rounded-2xl p-8 md:p-10 border border-gray-200">
            <h2 className="font-poppins font-bold text-3xl text-[#a0291f] text-center mb-6">Donation Form</h2>
            <p className="text-gray-700 font-merriweather text-center mb-10">Fill in the details below to proceed with your contribution.</p>

            <form onSubmit={handleDonate} className="space-y-6">
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-poppins text-gray-700 block mb-1">Full Name *</label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Enter full name" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#a0291f]" />
                </div>
                <div>
                  <label className="font-poppins text-gray-700 block mb-1">Email Address *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Enter email" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#a0291f]" />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-poppins text-gray-700 block mb-1">Mobile Number *</label>
                  <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required maxLength={10} placeholder="Enter mobile" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#a0291f]" />
                </div>
                <div>
                  <label className="font-poppins text-gray-700 block mb-1">Date of Birth *</label>
                  <input type="date" name="dob" value={formData.dob} onChange={handleChange} required className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#a0291f]" />
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-poppins text-gray-700 block mb-1">PAN Number *</label>
                  <input type="text" name="pan" value={formData.pan} onChange={handleChange} required maxLength={10} placeholder="ABCDE1234F" className="w-full uppercase border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#a0291f]" />
                </div>
                <div>
                  <label className="font-poppins text-gray-700 block mb-1">Aadhaar Number *</label>
                  <input type="tel" name="aadhaar" value={formData.aadhaar} onChange={handleChange} required maxLength={12} placeholder="12 digit Aadhaar" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#a0291f]" />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="font-poppins text-gray-700 block mb-1">Address *</label>
                <textarea name="address" value={formData.address} onChange={handleChange} rows="2" required placeholder="Enter full address" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#a0291f]"></textarea>
              </div>

              {/* Row 4 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="font-poppins text-gray-700 block mb-1">City *</label>
                  <input type="text" name="city" value={formData.city} onChange={handleChange} required placeholder="City" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#a0291f]" />
                </div>
                <div>
                  <label className="font-poppins text-gray-700 block mb-1">State *</label>
                  <input type="text" name="state" value={formData.state} onChange={handleChange} required placeholder="State" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#a0291f]" />
                </div>
                <div>
                  <label className="font-poppins text-gray-700 block mb-1">Pin Code *</label>
                  <input type="tel" name="pinCode" value={formData.pinCode} onChange={handleChange} required maxLength={6} placeholder="Pin Code" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#a0291f]" />
                </div>
              </div>

              {/* Amount */}
              <div>
                <label className="font-poppins text-gray-700 block mb-1">Donation Amount (₹) *</label>
                <input type="number" name="amount" value={formData.amount} onChange={handleChange} required placeholder="Enter amount" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#a0291f]" />
              </div>

              <div className="text-center pt-4">
                <button type="submit" disabled={loading} className="bg-[#a0291f] hover:bg-[#7a1f17] text-white font-poppins px-10 py-3 rounded-xl shadow-lg transition flex items-center gap-2 mx-auto disabled:opacity-70">
                  {loading && <Loader2 className="animate-spin h-5 w-5" />}
                  {loading ? "Processing..." : "Donate Now"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ================================
          SUCCESS MODAL POPUP
      =================================== */}
      <AnimatePresence>
        {successData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              {/* Header */}
              <div className="bg-green-50 p-6 text-center border-b border-green-100">
                <div className="mx-auto bg-green-100 h-16 w-16 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-green-800 font-poppins">Thank You!</h3>
                <p className="text-green-700 mt-1">Your donation was successful.</p>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <p className="text-center text-gray-600">
                  We have received your generous contribution of <span className="font-bold text-gray-900">₹{successData.amount}</span>.
                </p>

                {/* Receipt Box */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 text-center">
                   <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Donation Receipt ID</p>
                   <div className="flex items-center justify-center gap-2">
                     <code className="text-lg font-mono font-bold text-[#a0291f] tracking-wide">
                        {successData.id}
                     </code>
                     <button 
                       onClick={copyToClipboard}
                       className="p-1.5 hover:bg-gray-200 rounded-md transition-colors text-gray-500"
                       title="Copy ID"
                     >
                       <Copy className="h-4 w-4" />
                     </button>
                   </div>
                </div>

                {/* Email Notice */}
                <div className="text-center text-sm text-gray-500">
                  <p>A receipt has been sent to your email:</p>
                  <p className="font-medium text-gray-800">{successData.email}</p>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 bg-gray-50 border-t flex justify-center">
                <button
                  onClick={() => setSuccessData(null)}
                  className="bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 px-8 rounded-lg transition-colors flex items-center gap-2"
                >
                  <X className="h-4 w-4" />
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Donation;