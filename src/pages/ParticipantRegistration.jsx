// ParticipantRegistration.jsx
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { storage } from "@/firebase";
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Upload,
  User,
  Mail,
  Phone,
  Building,
  Calendar,
  FileText,
  Globe,
  ScrollText,
} from 'lucide-react';
import useCrud from '@/hooks/useCrud';

const ParticipantRegistration = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // load colleges & save hook
  const { items: colleges } = useCrud('colleges');

  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    dob: '',
    age: '',
    course: '',
    aadhar: '',
    college: '',
    otherCollege: '',
    modeOfPresence: 'Online', // Online by default
    idProof: null,
    video: null,
    photo: null,
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [collegeOptions, setCollegeOptions] = useState([]);
  
  // Previews (kept for logic)
  const [setIdPreview] = useState('');
  const [setVideoPreview] = useState('');
  const [setPhotoPreview] = useState('');
  
  const [showOtherCollege, setShowOtherCollege] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);

  useEffect(() => {
    const activeColleges = (colleges || []).map(c => c.name);
    setCollegeOptions(activeColleges.sort());
  }, [colleges]);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      const file = files?.[0] ?? null;
      setFormData(prev => ({ ...prev, [name]: file }));

      if (file) {
        try {
          const url = URL.createObjectURL(file);
          if (name === 'idProof') setIdPreview(url);
          if (name === 'video') setVideoPreview(url);
          if (name === 'photo') setPhotoPreview(url);
        } catch {
          // ignore error
        }
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      if (name === 'college') setShowOtherCollege(value === 'Other');
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'college') setShowOtherCollege(value === 'Other');
  };

  const handleTermsClick = () => {
    if (!formData.termsAccepted) {
      setTermsOpen(true);
    } else {
      setFormData(prev => ({ ...prev, termsAccepted: false }));
    }
  };

  const confirmTerms = () => {
    setFormData(prev => ({ ...prev, termsAccepted: true }));
    setTermsOpen(false);
    toast({ title: 'Terms accepted' });
  };

  const validate = (data) => {
    const errs = {};

    if (!data.fullName?.trim()) errs.fullName = "Full name required";
    if (!data.gender) errs.gender = "Select gender";
    if (!data.email?.trim()) errs.email = "Email required";
    if (!data.phone?.trim()) errs.phone = "Phone required";
    if (!data.city?.trim()) errs.city = "City required";
    if (!data.state?.trim()) errs.state = "State required";
    if (!data.dob) errs.dob = "Date of birth required";
    if (!data.course?.trim()) errs.course = "Course required";
    if (!data.aadhar?.trim()) errs.aadhar = "Aadhar required";
    if (!data.college?.trim()) errs.college = "College required";

    // If user selects "Other"
    if (data.college === "Other" && !data.otherCollege?.trim()) {
      errs.otherCollege = "Enter college name";
    }

    // Offline: photo required
    if (data.modeOfPresence === "Offline" && !data.photo) {
      errs.photo = "Photo required for offline";
    }

    if (!data.termsAccepted) errs.termsAccepted = "Accept terms";

    return errs;
  };

  const uploadFileToStorage = (file, path) => {
    return new Promise((resolve, reject) => {
      const ref = storageRef(storage, path);
      const uploadTask = uploadBytesResumable(ref, file);

      uploadTask.on(
        "state_changed",
        () => {},
        (err) => reject(err),
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(url);
        }
      );
    });
  };

  // Payment & Submit Logic
  const handlePaymentAndSubmit = async (e) => {
    e.preventDefault();

    // VALIDATION
    const v = validate(formData);
    setErrors(v);

    if (Object.keys(v).length > 0) {
      toast({
        title: "Please complete all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      setProcessingPayment(true);

      const regId = Date.now().toString();

      // 1️⃣ Determine Amount based on Mode (Hidden from UI, handled here)
      // Online = 100, Offline = 200
      const amountToPay = formData.modeOfPresence === "Offline" ? 200 : 100;

      // 2️⃣ Firebase Uploads (only if OFFLINE)
      let photoUrl = "";
      let videoUrl = "";

      if (formData.modeOfPresence === "Offline") {
        if (formData.photo) {
          photoUrl = await uploadFileToStorage(
            formData.photo,
            `PART/${regId}/photo.jpg`
          );
        }

        if (formData.video) {
          videoUrl = await uploadFileToStorage(
            formData.video,
            `PART/${regId}/video.mp4`
          );
        }
      }

      // 3️⃣ Razorpay Order Create
      // Send amount in PAISA (Amount * 100)
      const orderRes = await fetch("https://us-central1-bharatiya-youth-parliament.cloudfunctions.net/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amountToPay * 100 }), 
      });

      const order = await orderRes.json();

      // 4️⃣ Razorpay Popup
      const options = {
        key: order.key,
        amount: order.amount, // This comes from backend as paise
        currency: "INR",
        name: "Bharatiya Youth Parliament",
        description: `Participant Fee`,
        order_id: order.orderId,

        handler: async function (response) {
          // Prepare data
          const payload = {
            ...formData,
            college:
              formData.college === "Other"
                ? formData.otherCollege
                : formData.college,
            registrationType: "PARTICIPANT",
            amountPaid: amountToPay, // Store actual Rupee amount (100 or 200)
            photoUrl,
            videoUrl,
            offline: formData.modeOfPresence === "Offline",
          };

          // 5️⃣ Verify on backend
          const verifyRes = await fetch("https://us-central1-bharatiya-youth-parliament.cloudfunctions.net/api/verify-payment-participant", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              formData: payload,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const json = await verifyRes.json();

          if (json.success) {
            navigate("/registration-success", {
              state: {
                registrationId: json.registrationId,
                tokenNumber: json.tokenNumber,
                offline: formData.modeOfPresence === "Offline",
              },
            });
          } else {
            toast({
              title: "Payment verification failed!",
              variant: "destructive",
            });
          }
        },

        theme: { color: "#a0291f" },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setProcessingPayment(false);
    }
  };

  const formVariants = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } };
  // Dynamic Fee Calculation
  const feeAmount = formData.modeOfPresence === "Offline" ? 200 : 100;


  return (
    <>
      <Helmet>
        <title>Participant Registration - Bharatiya Youth Parliament</title>
        <meta name="description" content="Register as a participant for Bharatiya Youth Parliament." />
      </Helmet>

      <div className="bg-gray-50 py-8 sm:py-12 md:py-20">
        <motion.div className="container mx-auto px-4 max-w-3xl" initial="hidden" animate="visible" variants={formVariants}>
          <Card className="shadow-2xl">

            <CardHeader className="text-center bg-gray-100 p-4 sm:p-8 rounded-t-lg">
              <CardTitle className="text-3xl md:text-4xl font-extrabold text-[#a0291f] font-poppins">Participant Registration</CardTitle>
              <CardDescription className="text-gray-600 mt-2">Join BYP — register as a participant for the national event.</CardDescription>
            </CardHeader>

            {/* Dynamic Fee Box */}
            <div className="mb-6 mt-7 p-4 border rounded-lg bg-white shadow-sm max-w-xs mx-auto">
              <p className="text-lg font-semibold text-gray-800 text-center">
                Participation Fee:
                <span className="text-[#a0291f] ml-2">
                  ₹{feeAmount}
                </span>
              </p>
              
            </div>


            <CardContent className="p-4 sm:p-6 md:p-10">

              {/* --- MODE OF PRESENCE --- */}
              <div className="space-y-1">
                <Label className="font-semibold">Mode of Presence</Label>

                <div className="flex items-center space-x-4 sm:space-x-6">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="modeOfPresence"
                      value="Online"
                      checked={formData.modeOfPresence === "Online"}
                      onChange={() => setFormData({ ...formData, modeOfPresence: "Online" })}
                    />
                    {/* Price hidden as requested */}
                    <span>Online</span>
                  </label>

                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="modeOfPresence"
                      value="Offline"
                      checked={formData.modeOfPresence === "Offline"}
                      onChange={() => setFormData({ ...formData, modeOfPresence: "Offline" })}
                    />
                    {/* Price hidden as requested */}
                    <span>Offline</span>
                  </label>
                </div>
              </div>

              {/* --- 2 COLUMN GRID --- */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6">
                {/* Full Name */}
                <div>
                  <Label className="flex items-center gap-2 font-semibold">
                    <User className="w-4 h-4" /> Full Name
                  </Label>
                  <Input
                    name="fullName"
                    placeholder="As per official documents"
                    value={formData.fullName}
                    onChange={handleInputChange}
                  />
                  {errors.fullName && <p className="text-sm text-red-500 mt-1">{errors.fullName}</p>}
                </div>

                {/* Gender */}
                <div>
                  <Label className="flex items-center gap-2 font-semibold">
                    <Globe className="w-4 h-4" /> Gender
                  </Label>
                  <div className="flex items-center space-x-6 mt-2">
                    {["Male", "Female", "Other"].map(opt => (
                      <label key={opt} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="gender"
                          value={opt}
                          checked={formData.gender === opt}
                          onChange={() => setFormData({ ...formData, gender: opt })}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                  {errors.gender && <p className="text-sm text-red-500 mt-1">{errors.gender}</p>}
                </div>

                {/* Email */}
                <div>
                  <Label className="flex items-center gap-2 font-semibold">
                    <Mail className="w-4 h-4" /> Email Address
                  </Label>
                  <Input
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <Label className="flex items-center gap-2 font-semibold">
                    <Phone className="w-4 h-4" /> Phone Number
                  </Label>
                  <Input
                    name="phone"
                    placeholder="Enter your 10-digit number"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                  {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
                </div>

                {/* City */}
                <div>
                  <Label className="flex items-center gap-2 font-semibold">
                    <Building className="w-4 h-4" /> City
                  </Label>
                  <Input
                    name="city"
                    placeholder="Your current city"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                  {errors.city && <p className="text-sm text-red-500 mt-1">{errors.city}</p>}
                </div>

                {/*State*/}
                <div>
                  <Label className="flex items-center gap-2 font-semibold">
                    <Building className="w-4 h-4" /> State
                  </Label>
                  <Input
                    name="state"
                    placeholder="Your state"
                    value={formData.state}
                    onChange={handleInputChange}
                  />
                  {errors.state && <p className="text-sm text-red-500 mt-1">{errors.state}</p>}
                </div>

                {/* College */}
                <div>
                  <Label className="flex items-center gap-2 font-semibold">
                    <Building className="w-4 h-4" /> College / University
                  </Label>
                  <Select
                    value={formData.college}
                    onValueChange={v => handleSelectChange("college", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your college" />
                    </SelectTrigger>

                    <SelectContent>
                      {collegeOptions.map((c, i) => (
                        <SelectItem key={i} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.college && <p className="text-sm text-red-500 mt-1">{errors.college}</p>}
                </div>

                {showOtherCollege && (
                  <div className="sm:col-span-2">
                    <Label className="flex items-center gap-2 font-semibold mt-2">
                      <Building className="w-4 h-4" /> Specify Your College
                    </Label>
                    <Input
                      name="otherCollege"
                      placeholder="Enter your college name"
                      value={formData.otherCollege}
                      onChange={handleInputChange}
                    />
                    {errors.otherCollege && (
                      <p className="text-sm text-red-500">{errors.otherCollege}</p>
                    )}
                  </div>
                )}

                {/* DOB */}
                <div>
                  <Label className="flex items-center gap-2 font-semibold">
                    <Calendar className="w-4 h-4" /> Date of Birth
                  </Label>
                  <Input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                  />
                  {errors.dob && <p className="text-sm text-red-500 mt-1">{errors.dob}</p>}
                </div>

                {/* Course */}
                <div>
                  <Label className="flex items-center gap-2 font-semibold">
                    <FileText className="w-4 h-4" /> Course
                  </Label>
                  <Input
                    name="course"
                    placeholder="e.g., B.Tech in CSE"
                    value={formData.course}
                    onChange={handleInputChange}
                  />
                  {errors.course && <p className="text-sm text-red-500 mt-1">{errors.course}</p>}
                </div>

                {/* Aadhar */}
                <div>
                  <Label className="flex items-center gap-2 font-semibold">
                    <FileText className="w-4 h-4" /> Aadhar Number
                  </Label>
                  <Input
                    name="aadhar"
                    placeholder="Enter 12-digit Aadhar number"
                    value={formData.aadhar}
                    onChange={handleInputChange}
                  />
                  {errors.aadhar && <p className="text-sm text-red-500 mt-1">{errors.aadhar}</p>}
                </div>
              </div>

              {/* ---- OFFLINE REQUIREMENTS ---- */}
              {formData.modeOfPresence === "Offline" && (
                <div className="mt-10 border-t pt-6">
                  <h3 className="font-semibold mb-3 text-gray-700">
                    Offline Participation Requirements
                  </h3>

                  {/* Video Optional */}
                  <div className="mt-4">
                    <Label className="flex items-center gap-2 font-semibold">
                      <Upload className="w-4 h-4" />
                      Upload Video (optional)
                    </Label>
                    <Input
                      type="file"
                      name="video"
                      accept="video/*"
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Photo Required */}
                  <div className="mt-4">
                    <Label className="flex items-center gap-2 font-semibold">
                      <Upload className="w-4 h-4" />
                      Upload Photo <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={handleInputChange}
                    />
                    {errors.photo && <p className="text-sm text-red-500 mt-1">{errors.photo}</p>}
                  </div>
                </div>
              )}

              <div className="bg-white p-6 sm:p-8 shadow-md border border-gray-200 rounded-2xl hover:shadow-xl transition mt-10">
  <h3 className="font-poppins text-xl sm:text-2xl text-[#a0291f] mb-4">
    GENERAL PARTICIPANT (Quiz & Attendance)
  </h3>

  <p className="text-indigo-600 font-medium mb-4 text-sm">
    Scroll to Read ↓
  </p>

  {/* Vertical Scrollable Content */}
  <div className="max-h-[400px] overflow-y-auto pr-3 custom-scroll space-y-6 mt-4">

    {/* Slide 1 */}
    <div>
      <h4 className="font-semibold text-gray-900 mb-1">
        Bharatiya Youth Parliament – 12 January 2026
      </h4>
    </div>

    {/* Eligibility */}
    <div>
      <h4 className="font-semibold text-gray-900 mb-1">1. Eligibility</h4>
      <ul className="list-disc ml-5 space-y-1 text-sm text-gray-700">
        <li>Open to youth and students attending the event offline or online</li>
        <li>Not for registered MPs, Ministers, or Speakers</li>
      </ul>
    </div>

    {/* Quiz Participation */}
    <div>
      <h4 className="font-semibold text-gray-900 mb-1">2. Quiz Participation</h4>
      <ul className="list-disc ml-5 space-y-1 text-sm text-gray-700">
        <li>Eligible for Swami Vivekananda GK Award</li>
        <li>Winners selected by Jury</li>
        <li>On-ground: Cash prizes</li>
        <li>Online: Gift vouchers</li>
      </ul>
    </div>

    {/* Seating Policy */}
    <div>
      <h4 className="font-semibold text-gray-900 mb-1">
        3. Seating Policy (Offline)
      </h4>
      <ul className="list-disc ml-5 space-y-1 text-sm text-gray-700">
        <li>Early arrival → Hall 1</li>
        <li>Late arrival → Hall 2 (Live Display)</li>
        <li>Both halls are official venue areas</li>
      </ul>
    </div>

    {/* Benefits */}
    <div>
      <h4 className="font-semibold text-gray-900 mb-1">4. Benefits</h4>
      <ul className="list-disc ml-5 space-y-1 text-sm text-gray-700">
        <li>Certificate of Participation</li>
        <li>Student Kit (offline)</li>
        <li>Digital certificates (online)</li>
        <li>Mentorship sessions every 3–4 months</li>
        <li>Research papers after each session</li>
      </ul>
    </div>

    {/* Discipline */}
    <div>
      <h4 className="font-semibold text-gray-900 mb-1">5. Discipline</h4>
      <ul className="list-disc ml-5 space-y-1 text-sm text-gray-700">
        <li>Indiscipline may lead to disqualification</li>
        <li>Management decisions are final</li>
      </ul>
    </div>

    {/* Fees */}
    <div>
      <h4 className="font-semibold text-gray-900 mb-1">6. Fees</h4>
      <ul className="list-disc ml-5 space-y-1 text-sm text-gray-700">
        <li>Participation fee is not a donation</li>
        <li>Fee ensures committed participation</li>
      </ul>
    </div>

  </div>
              </div>


              {/* TERMS */}
              <div className="mt-6 flex flex-col">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.termsAccepted}
                    onChange={handleTermsClick}
                  />
                  <span>
                    I accept the{" "}
                    <a className="text-red-600 underline cursor-pointer" onClick={() => setTermsOpen(true)}>Terms and Conditions</a>
                  </span>
                </div>
                {errors.termsAccepted && <p className="text-sm text-red-500 mt-1">{errors.termsAccepted}</p>}
              </div>

              <Button
                className="w-full bg-[#a0291f] hover:bg-[#8a241b] py-4 mt-4 disabled:bg-gray-400"
                disabled={processingPayment}
                onClick={handlePaymentAndSubmit}
                type="button"
              >
                {/* Text generalized, price hidden */}
                {processingPayment 
                  ? "Processing..." 
                  : "Proceed to Payment"}
              </Button>

            </CardContent>

          </Card>
        </motion.div>
      </div>

      {/* Terms Modal */}
      <Dialog open={termsOpen} onOpenChange={setTermsOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto px-2 sm:px-4">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-[#a0291f]">
              <ScrollText className="w-5 h-5" /> Terms & Conditions
            </DialogTitle>
            <DialogDescription>Please read the following terms carefully before registering.</DialogDescription>
          </DialogHeader>

          <div className="text-sm text-gray-600 space-y-4 py-4">
            <p><strong>Swami Vivekananda National Quiz & Youth Leadership Participation</strong></p>
            <p><strong>Bharatiya Youth Parliament – 12 January 2026</strong></p>
            <p>These Terms & Conditions govern participation in the Swami Vivekananda National Quiz, Parliamentary Role Selection, Global Summit, and all Youth Leadership Activities of BYP 2026 conducted at Talkatora Stadium, New Delhi, and online.</p>

            {/* 1. Eligibility */}
            <p><strong>1. Eligibility for Quiz Participation</strong></p>
            <ul className="list-disc list-inside space-y-1">
              <li>The Quiz is exclusively for youth who are NOT participating as:
                <ul className="list-disc list-inside ml-5">
                  <li>Youth Member of Parliament</li>
                  <li>Opposition Leader</li>
                  <li>Council of Ministers</li>
                  <li>Global Summit Delegate</li>
                  <li>Any other official BYP role</li>
                </ul>
              </li>
              <li>Participants holding these roles are not eligible for the Quiz due to official responsibilities.</li>
            </ul>

            {/* 2. Limited Seats */}
            <p><strong>2. Limited Seats & Registration Priority</strong></p>
            <ul className="list-disc list-inside space-y-1">
              <li>All major categories (Youth MP, Ministers, Opp. Leader, Global Summit) have limited seats.</li>
              <li>Selections operate strictly on a first-come, first-served basis.</li>
              <li>BYP may close registrations anytime based on capacity.</li>
            </ul>

            {/* 3. Seating */}
            <p><strong>3. Seating Arrangement – Hall 1 & Hall 2</strong></p>
            <ul className="list-disc list-inside space-y-1">
              <li>Early arrivals will be seated in Hall 1 (Main Auditorium).</li>
              <li>Remaining students will be accommodated in Hall 2 (Live Display Hall).</li>
              <li>Participants may be shifted Hall 2 → Hall 1 depending on availability.</li>
              <li>Both halls are official participation areas.</li>
            </ul>

            {/* 4. Offline Category */}
            <p><strong>4. Offline Category – Seating System</strong></p>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Early Arrival → Hall 1</strong></li>
              <li><strong>Later Arrival → Hall 2</strong></li>
              <li>Both enjoy full recognition and event access.</li>
            </ul>

            {/* 5. Video Submission */}
            <p><strong>5. Mandatory Video Submission (Leadership Applicants)</strong></p>
            <ul className="list-disc list-inside space-y-1">
              <li>All applicants for Youth MP, Ministers, Opposition Leader, and Global Summit must submit a Video Introduction.</li>
              <li>Failure to submit may lead to rejection.</li>
            </ul>

            {/* 6. Social Media Marks */}
            <p><strong>6. Social Media Engagement Marks</strong></p>
            <ul className="list-disc list-inside space-y-1">
              <li>Optional social media posting may earn bonus marks.</li>
              <li>Evaluation includes:
                <ul className="list-disc list-inside ml-5">
                  <li>Communication</li>
                  <li>Content Quality</li>
                  <li>Engagement</li>
                  <li>Creativity</li>
                </ul>
              </li>
              <li>Participants grant permission for BYP to reuse content.</li>
            </ul>

            {/* 7. Oath Video */}
            <p><strong>7. Oath Video – Mandatory</strong></p>
            <p>All selected leadership-role participants must submit an Oath Video. Non-submission can lead to disqualification.</p>

            {/* 8. Jury Evaluation */}
            <p><strong>8. Jury Evaluation & Final Authority</strong></p>
            <ul className="list-disc list-inside space-y-1">
              <li>A panel of 5–6 Jury Members will evaluate:
                <ul className="list-disc list-inside ml-5">
                  <li>Video submissions</li>
                  <li>Communication & leadership</li>
                  <li>Quiz answers</li>
                  <li>Discipline</li>
                  <li>Social media engagement (if applicable)</li>
                </ul>
              </li>
              <li>The Jury’s decision is final and non-appealable.</li>
            </ul>

            {/* 9. Quiz Criteria */}
            <p><strong>9. Quiz Evaluation</strong></p>
            <ul className="list-disc list-inside space-y-1">
              <li>Accuracy</li>
              <li>Speed</li>
              <li>Consistency</li>
              <li>Concept Clarity</li>
              <li>Discipline</li>
            </ul>

            {/* 10. Physical Prize Eligibility */}
            <p><strong>10. Prize Eligibility – Physical Participants Only</strong></p>
            <ul className="list-disc list-inside space-y-1">
              <li>Only students physically present at Talkatora Stadium on 12 Jan 2026 are eligible for cash prizes:</li>
              <li>🏆 Prize Structure:
                <ul className="list-disc list-inside ml-5">
                  <li>1st Prize – ₹51,000</li>
                  <li>2nd Prize – ₹21,000</li>
                  <li>3rd Prize – ₹11,000</li>
                </ul>
              </li>
              <li>Absence during verification will disqualify the winner.</li>
            </ul>

            {/* 11. Online Participants */}
            <p><strong>11. Online Participants – Benefits</strong></p>
            <ul className="list-disc list-inside space-y-1">
              <li>Not eligible for top cash prizes.</li>
              <li>Will receive Gift Vouchers for ranks 1st–3rd.</li>
              <li>Vouchers provided digitally.</li>
              <li>Receive certificates + digital benefits.</li>
            </ul>

            {/* 12. Associated Universities */}
            <p><strong>12. Special Provision: Associated Universities</strong></p>
            <ul className="list-disc list-inside space-y-1">
              <li>Associated colleges unable to travel will get Online Quiz Facility.</li>
              <li>Separate rankings + special voucher rewards.</li>
              <li>Students may apply for leadership roles.</li>
              <li>No TA/DA provided.</li>
            </ul>

            {/* 13. Social Media Registration */}
            <p><strong>13. Open Registrations via Social Media / Website</strong></p>
            <ul className="list-disc list-inside space-y-1">
              <li>All such applicants must submit a Video Introduction.</li>
              <li>May be selected for:
                <ul className="list-disc list-inside ml-5">
                  <li>Youth MP</li>
                  <li>Opposition Leader</li>
                  <li>Council of Ministers</li>
                  <li>Global Summit Speaker</li>
                </ul>
              </li>
              <li>No TA/DA offered.</li>
            </ul>

            {/* 14. Global Summit */}
            <p><strong>14. Global Summit – Special Conditions</strong></p>
            <ul className="list-disc list-inside space-y-1">
              <li>Youth speak on thematic or motivational topics.</li>
              <li>Participants manage their own travel & stay.</li>
              <li>No TA/DA provided.</li>
              <li>Must follow code of conduct.</li>
            </ul>

            {/* 15. Brand Ambassador */}
            <p><strong>15. Brand Ambassador Policy</strong></p>
            <ul className="list-disc list-inside space-y-1">
              <li>1st Prize Winner becomes BYP Brand Ambassador for 1 year.</li>
              <li>Benefits:
                <ul className="list-disc list-inside ml-5">
                  <li>Representation at national events</li>
                  <li>TA/DA for official travel</li>
                  <li>Adherence to BYP discipline standards</li>
                </ul>
              </li>
            </ul>

            {/* 16. Management Rights */}
            <p><strong>16. Management Rights</strong></p>
            <ul className="list-disc list-inside space-y-1">
              <li>BYP may modify rules anytime.</li>
              <li>May approve/reject applications.</li>
              <li>May disqualify participants for misconduct.</li>
              <li>Seat/role shifts may occur based on jury evaluation.</li>
            </ul>

            {/* 17. Fee Clarification */}
            <p><strong>17. Participation Fee Clarification</strong></p>
            <ul className="list-disc list-inside space-y-1">
              <li>The fee is not a donation.</li>
              <li>Used for:
                <ul className="list-disc list-inside ml-5">
                  <li>Event Organization</li>
                  <li>Infrastructure & Digital Systems</li>
                  <li>Youth empowerment initiatives</li>
                  <li>Student Kits & Materials</li>
                </ul>
              </li>
            </ul>

            {/* 18. TA/DA */}
            <p><strong>18. No TA/DA for General Participants</strong></p>
            <p>Except for the Brand Ambassador, no participant receives TA/DA.</p>

            {/* 19. Acceptance */}
            <p><strong>19. Acceptance of Terms</strong></p>
            <p>By participating, all students automatically accept all Terms, Jury decisions, and Management policies.</p>

            {/* 20. Student Kits */}
            <p><strong>20. Student Kits, Certificates & Long-Term Support</strong></p>
            <p><strong>A. Offline Participants (Delhi)</strong></p>
            <ul className="list-disc list-inside ml-5 space-y-1">
              <li>Student Kit</li>
              <li>Official BYP ID Card</li>
              <li>Participation Certificate</li>
              <li>Mentorship every 3–4 months</li>
              <li>Parliamentary Research Papers</li>
              <li>Representation opportunities based on merit</li>
            </ul>

            <p><strong>B. Online Participants</strong></p>
            <ul className="list-disc list-inside ml-5 space-y-1">
              <li>Digital Certificate</li>
              <li>Guidance & Mentorship Sessions</li>
              <li>Parliamentary Research Papers</li>
              <li>Representation opportunities (merit-based)</li>
            </ul>

            <p><strong>C. Equal Exposure for Both Categories</strong></p>
            <ul className="list-disc list-inside ml-5 space-y-1">
              <li>Youth Panels</li>
              <li>Delegations</li>
              <li>Workshops</li>
              <li>State-Level Conclaves</li>
            </ul>

            {/* 21. Youth Development */}
            <p><strong>21. Youth Development Commitment</strong></p>
            <p>BYP provides continuous updates on youth welfare schemes, competitions, education, workshops, internships, and government youth initiatives.</p>
          </div>

          <DialogFooter className="flex gap-3">
            <Button variant="outline" onClick={() => setTermsOpen(false)}>Cancel</Button>
            <Button className="bg-[#a0291f] text-white" onClick={confirmTerms}>I Agree & Accept</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ParticipantRegistration;