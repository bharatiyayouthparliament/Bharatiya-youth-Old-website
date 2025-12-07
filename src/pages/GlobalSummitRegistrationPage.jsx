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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

  import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
  import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
  import { Checkbox } from "@/components/ui/checkbox";
  import { User, Mail, Phone, Book, GraduationCap, Building, Calendar, FileText, Upload, Camera, Globe, ScrollText } from 'lucide-react';
  import useCrud from '@/hooks/useCrud';

  const GlobalSummitRegistrationPage = () => {
    const navigate = useNavigate();
    const { toast } = useToast();

    const { items: colleges, loading: collegesLoading } = useCrud('colleges');
    const { addItem: addRegistration, loading: registrationLoading } = useCrud('registrations');  // ← KEEP HERE

    const [formData, setFormData] = useState({
      fullName: '',
      gender: '',        // ✅ Added
      email: '',
      phone: '',
      city: '',
      college: '',
      otherCollege: '',
      dob: '',
      course: '',
      aadhar: '',
      socialMediaLink: '',
      modeOfPresence: 'Offline',
      video: null,
      photo: null,
      termsAccepted: false,
    });

    const [errors, setErrors] = useState({});
    const [showOtherCollege, setShowOtherCollege] = useState(false);
    const [collegeOptions, setCollegeOptions] = useState([]);
    const [videoPreview, setVideoPreview] = useState('');
    const [photoPreview, setPhotoPreview] = useState('');
    const [termsOpen, setTermsOpen] = useState(false);

  useEffect(() => {
    const activeColleges = (colleges || []).map(c => c.name);

      setCollegeOptions(activeColleges.sort());
    }, [colleges]);


    const handleInputChange = (e) => {
      const { name, value, type, files } = e.target;
      if (type === 'file') {
        const file = files[0];
        setFormData(prev => ({ ...prev, [name]: file }));
        if (file) {
          const previewUrl = URL.createObjectURL(file);
          if (name === 'video') setVideoPreview(previewUrl);
          if (name === 'photo') setPhotoPreview(previewUrl);
        }
      } else {
        setFormData(prev => ({ ...prev, [name]: value }));
      }
    };

    const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));

      if (name === "college") {
        if (value === "Other") {
          setShowOtherCollege(true);
          setFormData(prev => ({ ...prev, otherCollege: "" })); 
        } else {
          setShowOtherCollege(false);
          setFormData(prev => ({ ...prev, otherCollege: "" }));  
        }
      }
    };

    const handleRadioChange = (name, value) => {
      setFormData(prev => ({ ...prev, [name]: value }));
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
    };

    const validateForm = (data, showOther) => {
      const errors = {};

      if (!data.fullName.trim()) errors.fullName = "Full name is required.";
      if (!data.gender) errors.gender = "Gender is required.";     // ✅ Added
      if (!data.email.trim()) errors.email = "Email is required.";
      if (!data.phone.trim()) errors.phone = "Phone number is required.";
      if (!data.city.trim()) errors.city = "City is required.";
      if (!data.college.trim()) errors.college = "College is required.";
      if (showOther && !data.otherCollege.trim()) errors.otherCollege = "Please specify your college.";
      if (!data.dob) errors.dob = "Date of birth is required.";
      if (!data.course.trim()) errors.course = "Course is required.";
      if (!data.aadhar.trim()) errors.aadhar = "Aadhar number is required.";
      if (!data.socialMediaLink.trim()) errors.socialMediaLink = "Social media link is required.";

      if (data.modeOfPresence === 'Offline') {
        if (!data.video) errors.video = "Video upload is required.";
        if (!data.photo) errors.photo = "Photo upload is required.";
      }

      if (!data.termsAccepted) errors.termsAccepted = "You must accept the terms.";

      return errors;
    };


    const uploadFileToStorage = (file, path) => {
    return new Promise((resolve, reject) => {
      const ref = storageRef(storage, path);
      const uploadTask = uploadBytesResumable(ref, file);

      uploadTask.on(
        "state_changed",
        () => {},
        reject,
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(url);
        }
      );
    });
    };


    const handleSubmit = async (e) => {
      e.preventDefault();

      const validationErrors = validateForm(formData, showOtherCollege);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length > 0) {
        toast({ title: "Fix the errors", variant: "destructive" });
        return;
      }

      try {
        // Upload files
        let photoUrl = "";
        let videoUrl = "";
        const regId = Date.now().toString();

        photoUrl = await uploadFileToStorage(formData.photo, `GSR/${regId}/photo.jpg`);
        videoUrl = await uploadFileToStorage(formData.video, `GSR/${regId}/video.mp4`);

        
        // ---- CREATE ORDER (FIXED) ----
        const orderRes = await fetch("https://us-central1-bharatiya-youth-parliament.cloudfunctions.net/api/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: 500 * 100 }),
        });

        if (!orderRes.ok) {
          toast({
            title: "Server Error",
            description: "Order API did not respond",
            variant: "destructive",
          });
          return;
        }

        const order = await orderRes.json();


        const options = {
          key: order.key,
          amount: order.amount,
          currency: "INR",
          name: "Bharatiya Youth Parliament",
          description: "Global Youth Summit",
          order_id: order.orderId,

          handler: async function (response) {
            const payload = {
              ...formData,
              college:
                formData.college === "Other"
                  ? formData.otherCollege
                  : formData.college,
              registrationType: "GLOBAL_SUMMIT",
              amountPaid: 500,
              offline: true,
            };

            // CALL BACKEND VERIFY
            const verifyRes = await fetch("https://us-central1-bharatiya-youth-parliament.cloudfunctions.net/api/verify-payment-gsr", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                formData: payload,
                photoUrl,
                videoUrl,
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
                  offline: true,
                },
              });
            } else {
              toast({ title: "Verification failed", variant: "destructive" });
            }
          },

          theme: { color: "#a0291f" },
        };

        // Safe Razorpay open
    if (!window.Razorpay) {
      toast({
        title: "Error",
        description: "Razorpay failed to load. Please refresh the page.",
        variant: "destructive",
      });
      return;
    }

    try {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Popup Blocked", error);
      toast({
        title: "Popup Blocked",
        description: "Allow popups and try again.",
        variant: "destructive",
      });
    }

      } catch (err) {
        toast({ title: "Error", description: err.message, variant: "destructive" });
      }
    };

  // ---- OPEN RAZORPAY CHECKOUT SAFELY ----
    const formVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
    return (
      <>
        <Helmet>
          <title>Global Youth Summit - BYP 2025</title>
          <meta name="description" content="Register for the Global Summit at Bharatiya Youth Parliament 2025." />
        </Helmet>

        <div className="bg-gray-50 py-8 sm:py-12 md:py-20">
          <motion.div
            className="container mx-auto px-4 max-w-4xl"
            initial="hidden"
            animate="visible"
            variants={formVariants}
          >
            <Card className="shadow-2xl">
              <CardHeader className="text-center bg-gray-100 p-4 sm:p-8 rounded-t-lg">
                <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#a0291f] font-poppins">
                  Global Youth Summit
                </CardTitle>
                <CardDescription className="text-sm sm:text-base md:text-lg text-gray-600 mt-2 font-merriweather">
                  Join the premier summit for young leaders
                </CardDescription>
              </CardHeader>

              <CardContent className="p-4 sm:p-6 md:p-12">
                <form onSubmit={handleSubmit} className="space-y-8">

                  <div className="mb-6 mt-7 p-4 border rounded-lg bg-white shadow-sm max-w-xs mx-auto">
                    <p className="text-lg font-semibold text-gray-800 text-center">
                      Participation Fee:
                      <span className="text-[#a0291f] ml-2 font-bold">
                        ₹500
                      </span>
                    </p>

                    <p className="text-xs text-gray-500 mt-1 text-center">
                      Fee for Offline mode of Presence
                    </p>
                  </div>

                  {/* Mode of Presence */}
                  <FormField id="modeOfPresence" label="Mode of Presence" error={errors.modeOfPresence}>
                    <RadioGroup
                      name="modeOfPresence"
                      value="Offline"
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2 opacity-50 cursor-not-allowed">
                        <RadioGroupItem value="Online" id="online" disabled />
                        <Label htmlFor="online">Online</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Offline" id="offline" checked />
                        <Label htmlFor="offline">Offline</Label>
                      </div>
                    </RadioGroup>
                  </FormField>

                  {/* FORM GRID */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">

                    {/* Full Name */}
                    <FormField id="fullName" label="Full Name" error={errors.fullName} icon={<User />}>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="As per official documents"
                      />
                    </FormField>

                    {/* ✅ GENDER FIELD — ADDED HERE */}
                    <FormField id="gender" label="Gender" error={errors.gender} icon={<User />}>
                      <RadioGroup
                        value={formData.gender}
                        onValueChange={(v) => handleRadioChange("gender", v)}
                        className="flex space-x-6"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Male" id="male" />
                          <Label htmlFor="male">Male</Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Female" id="female" />
                          <Label htmlFor="female">Female</Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Other" id="other" />
                          <Label htmlFor="other">Other</Label>
                        </div>
                      </RadioGroup>
                    </FormField>

                    {/* Email */}
                    <FormField id="email" label="Email Address" error={errors.email} icon={<Mail />}>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                      />
                    </FormField>

                    {/* Phone */}
                    <FormField id="phone" label="Phone Number" error={errors.phone} icon={<Phone />}>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your 10-digit number"
                      />
                    </FormField>

                    {/* City */}
                    <FormField id="city" label="City" error={errors.city} icon={<Building />}>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Your current city"
                      />
                    </FormField>

                    {/* College */}
                    <FormField id="college" label="College/University" error={errors.college} icon={<GraduationCap />}>
                      <Select onValueChange={(v) => handleSelectChange('college', v)} value={formData.college}>
                        <SelectTrigger>
                          <SelectValue placeholder={collegesLoading ? "Loading..." : "Select your college"} />
                        </SelectTrigger>
                        <SelectContent>
                          {collegeOptions.map((name, i) => (
                            <SelectItem key={i} value={name}>{name}</SelectItem>
                          ))}
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormField>

                    {showOtherCollege && (
                      <div className="md:col-span-2">
                        <FormField
                          id="otherCollege"
                          label="Specify College Name"
                          error={errors.otherCollege}
                          icon={<GraduationCap />}
                        >
                          <Input
                            id="otherCollege"
                            name="otherCollege"
                            value={formData.otherCollege}
                            onChange={handleInputChange}
                            placeholder="Enter your college name"
                          />
                        </FormField>
                      </div>
                    )}

                    {/* DOB */}
                    <FormField id="dob" label="Date of Birth" error={errors.dob} icon={<Calendar />}>
                      <Input
                        id="dob"
                        name="dob"
                        type="date"
                        value={formData.dob}
                        onChange={handleInputChange}
                      />
                    </FormField>

                    {/* Course */}
                    <FormField id="course" label="Course" error={errors.course} icon={<Book />}>
                      <Input
                        id="course"
                        name="course"
                        value={formData.course}
                        onChange={handleInputChange}
                        placeholder="e.g., B.Tech in CSE"
                      />
                    </FormField>

                    {/* Aadhar */}
                    <FormField id="aadhar" label="Aadhar Number" error={errors.aadhar} icon={<FileText />}>
                      <Input
                        id="aadhar"
                        name="aadhar"
                        value={formData.aadhar}
                        onChange={handleInputChange}
                        placeholder="Enter 12-digit Aadhar number"
                      />
                    </FormField>

                    {/* Social Media Link */}
                  <FormField id="socialMediaLink" label="Social Media Link" error={errors.socialMediaLink} icon={<Globe />}>
                    <Input
                      id="socialMediaLink"
                      name="socialMediaLink"
                      value={formData.socialMediaLink}
                      onChange={handleInputChange}
                      placeholder="Paste any one link (Instagram / LinkedIn / YouTube)"
                    />
                  </FormField>

                  </div>

                  

                  {/* Offline Section */}
                  {formData.modeOfPresence === 'Offline' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-6 border-t pt-6"
                    >
                      <h3 className="text-lg font-semibold text-gray-800">
                        Offline Participation Requirements
                      </h3>

                      {/* Video Upload */}
                      <FormField id="video" label="Upload Video" error={errors.video} icon={<Upload />}>
                        <Input
                          id="video"
                          name="video"
                          type="file"
                          accept="video/*"
                          onChange={handleInputChange}
                        />
                      </FormField>
                      {videoPreview && (
                        <video controls src={videoPreview} className="w-full rounded-md max-h-48 sm:max-h-60 mt-2" />
                      )}

                      {/* Photo Upload */}
                      <FormField id="photo" label="Upload Photo" error={errors.photo} icon={<Camera />}>
                        <Input
                          id="photo"
                          name="photo"
                          type="file"
                          accept="image/*"
                          onChange={handleInputChange}
                        />
                      </FormField>
                      {photoPreview && (
                        <img
                          src={photoPreview}
                          alt="Photo Preview"
                          className="w-32 h-32 object-cover rounded-md mt-2"
                        />
                      )}
                    </motion.div>
                  )}

                  <div className="bg-white p-6 sm:p-8 shadow-md border border-gray-200 rounded-2xl hover:shadow-xl transition">
    <h3 className="font-poppins text-xl sm:text-2xl text-[#a0291f] mb-4">
      Global Summit Participation
    </h3>

    <p className="text-indigo-600 font-medium mb-4 text-sm">
      Scroll to Read ↓
    </p>

    {/* Vertical Scrollable Content */}
    <div className="max-h-[420px] overflow-y-auto pr-3 custom-scroll space-y-6 mt-4 text-sm leading-relaxed text-gray-700">

      <p className="italic text-gray-800">
        (Bharatiya Youth Parliament – 12 January 2026)
      </p>

      {/* 1. Nature of Global Summit */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-1">1. Nature of the Global Summit</h4>
        <ul className="list-disc ml-5 space-y-1">
          <li>The Global Summit runs parallel to the Bharatiya Youth Parliament.</li>
          <li>Encourages:
            <ul className="list-disc ml-8 space-y-1">
              <li>Leadership thinking</li>
              <li>Nation-building vision</li>
              <li>Policy-oriented discussion</li>
              <li>Motivational & thematic speeches</li>
            </ul>
          </li>
          <li>Open but evaluated format similar to a national youth conclave.</li>
        </ul>
      </div>

      {/* 2. Eligibility */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-1">2. Eligibility & Registration</h4>
        <ul className="list-disc ml-5 space-y-1">
          <li>Open to youth leaders, students, professionals, policymakers, and socially active youth.</li>
          <li>Registration via:
            <ul className="list-disc ml-8 space-y-1">
              <li>Official website</li>
              <li>Social media links</li>
              <li>Institutional nomination</li>
              <li>Open digital forms</li>
            </ul>
          </li>
          <li>Registration alone does not guarantee speaking.</li>
        </ul>
      </div>

      {/* 3. Mandatory Video */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-1">3. Mandatory Video Submission</h4>
        <ul className="list-disc ml-5 space-y-1">
          <li>Short speech video on the selected theme is mandatory.</li>
          <li>Requirements:
            <ul className="list-disc ml-8 space-y-1">
              <li>Clear video/audio (HD/4K preferred)</li>
              <li>Speaker must be visible</li>
              <li>Theme must match registered topic</li>
              <li>No abusive or objectionable content</li>
            </ul>
          </li>
          <li>No video → Not eligible for speaking slot.</li>
        </ul>
      </div>

      {/* 4. Selection */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-1">4. Selection & Evaluation</h4>
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
          <li>Only limited speakers selected due to time constraints.</li>
          <li>Jury has full authority over approval, order, duration, and topics.</li>
          <li>All decisions final and binding.</li>
        </ul>
      </div>

      {/* 5. Speaking Opportunity */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-1">5. Speaking Opportunity & Protocol</h4>
        <ul className="list-disc ml-5 space-y-1">
          <li>Selected participants get fixed time slots.</li>
          <li>Speakers must:
            <ul className="list-disc ml-8 space-y-1">
              <li>Follow time limits</li>
              <li>Maintain decorum</li>
              <li>Respect stage instructions</li>
            </ul>
          </li>
          <li>Violations may lead to stoppage or disqualification.</li>
        </ul>
      </div>

      {/* 6. Logistics */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-1">6. Travel, Stay & Allowances</h4>
        <ul className="list-disc ml-5 space-y-1">
          <li>No TA/DA, accommodation, or meals provided.</li>
          <li>Logistics are participant’s responsibility.</li>
        </ul>
      </div>

      {/* 7. Institutional Participation */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-1">7. Institutional / Remote Participation</h4>
        <ul className="list-disc ml-5 space-y-1">
          <li>Available for institutions unable to attend physically.</li>
          <li>Must be conducted from an official hall or auditorium.</li>
          <li>No TA/DA or travel support for remote participants.</li>
        </ul>
      </div>

      {/* 8. Certification */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-1">8. Certification & Exposure</h4>
        <ul className="list-disc ml-5 space-y-1">
          <li>Official participation certificate for all.</li>
          <li>Access to research & guidance periodically.</li>
          <li>Selected speakers may receive national-level exposure.</li>
        </ul>
      </div>

      {/* 9. Media Rights */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-1">9. Content Rights & Media Usage</h4>
        <ul className="list-disc ml-5 space-y-1">
          <li>BYP can record, publish, and use submitted or public content.</li>
          <li>No objections or claims allowed.</li>
        </ul>
      </div>

      {/* 10. Code of Conduct */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-1">10. Code of Conduct</h4>
        <p>Indiscipline, misrepresentation, or misuse may result in disqualification.</p>
      </div>

      {/* 11. Authority */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-1">11. Authority & Amendments</h4>
        <ul className="list-disc ml-5 space-y-1">
          <li>BYP may modify rules or schedules as needed.</li>
          <li>Participation implies acceptance of all terms.</li>
        </ul>
      </div>

      {/* 12. Limited Seats */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-1">12. Limited Seats & Speaking Selection</h4>
        <ul className="list-disc ml-5 space-y-1">
          <li>Total capacity: 60 participants.</li>
          <li>Only 15–20 selected speakers speak on stage.</li>
          <li>Selection based on evaluation + structured lottery + time availability.</li>
          <li>Registration does not guarantee speaking.</li>
          <li>Non-selected participants:
            <ul className="list-disc ml-8 space-y-1">
              <li>Recognized as Global Summit Delegates</li>
              <li>Receive certificates</li>
              <li>Participate in full proceedings</li>
            </ul>
          </li>
          <li>Final decisions rest with Jury & Organizing Committee.</li>
        </ul>
      </div>

    </div>
  </div>


                  {/* Terms */}
                  <div className="space-y-4 border-t pt-6">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="terms"
                        checked={formData.termsAccepted}
                        onCheckedChange={handleTermsClick}
                      />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none cursor-pointer"
                        onClick={handleTermsClick}
                      >
                        I accept the{" "}
                        <span className="text-[#a0291f] underline hover:text-[#8a241b]">
                          Terms and Conditions
                        </span>
                      </label>
                    </div>
                    {errors.termsAccepted && (
                      <p className="text-sm text-red-500">{errors.termsAccepted}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#a0291f] hover:bg-[#8a241b] text-lg py-6 disabled:bg-gray-400"
                    disabled={registrationLoading}
                  >
                    {registrationLoading ? 'Processing...' : 'Continue to Payment'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Terms Modal */}
        <Dialog open={termsOpen} onOpenChange={setTermsOpen}>
          <DialogContent className="max-h-[85vh] overflow-y-auto px-3 sm:px-6">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-[#a0291f]">
                <ScrollText className="w-5 h-5" /> Terms & Conditions
              </DialogTitle>
              <DialogDescription>
                Please read the following terms carefully before registering.
              </DialogDescription>
            </DialogHeader>

            {/* Terms Content */}
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

            <DialogFooter>
              <Button variant="outline" onClick={() => setTermsOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-[#a0291f] text-white" onClick={confirmTerms}>
                I Agree & Accept
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  };
// FormField Component
  const FormField = ({ id, label, error, icon, children }) => (
    <div className="space-y-2">
      <Label htmlFor={id} className="flex items-center text-md font-semibold text-gray-700">
        {icon && React.cloneElement(icon, { className: "mr-2 h-5 w-5 text-gray-500" })}
        {label}
      </Label>
      {children}
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
export default GlobalSummitRegistrationPage;