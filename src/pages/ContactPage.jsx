import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await addDoc(collection(db, "contacts"), {
      ...formData,
      createdAt: serverTimestamp()
    });

    toast({
      title: "Message Sent Successfully!",
      description: "We'll get back to you soon."
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });

  } catch (error) {
    toast({
      title: "Error Sending Message",
      description: "Failed to send message. Try again.",
      variant: "destructive"
    });
  }
};

  return (
    <>
      <Helmet>
        <title>Contact Us - Bharatiya Youth Parliament</title>
      </Helmet>

      {/* -----------------------------------
          HERO BACKGROUND SECTION (ADDED)
      ------------------------------------ */}
      <section
        className="relative w-full bg-center bg-cover bg-no-repeat py-20 md:py-28"
        style={{
          backgroundImage: `url('/image/cover.jpg')`, // <-- Change if needed
        }}
      >
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px]"></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-3xl mx-auto px-4"
        >
          <h1 className="font-poppins font-bold text-3xl md:text-5xl text-white mb-4 drop-shadow-[0_0_12px_rgba(0,0,0,0.3)]">
            <span className="text-[#a0291f]">Contact Us</span>
          </h1>

          <p className="font-merriweather text-sm md:text-lg text-black drop-shadow-[0_0_10px_rgba(0,0,0,0.7)] max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>
      </section>

      {/* -----------------------------------
          MAIN CONTENT
      ------------------------------------ */}
      <section className="bg-white py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">

            {/* FORM SECTION */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
                </div>

                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={5} />
                </div>

                <Button type="submit" className="w-full bg-[#a0291f] hover:bg-[#7a1f17] text-white text-sm md:text-base py-3">
                  Send Message
                </Button>
              </form>
            </motion.div>

            {/* CONTACT INFO */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6 md:space-y-8"
            >
              <div>
                <h2 className="font-poppins font-bold text-2xl text-gray-900 mb-6">Get in Touch</h2>

                <div className="space-y-6">

                  <div className="flex items-start space-x-4">
                    <MapPin className="text-[#a0291f]" size={20} />
                    <div>
                      <h3 className="font-poppins font-semibold">Office Address</h3>
                      <p className="font-merriweather text-gray-700">
                        F-32, Connaught Place, <br />
                        New Delhi - 110001
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Phone className="text-[#a0291f]" size={20} />
                    <div>
                      <h3 className="font-poppins font-semibold">Phone</h3>
                      <p className="font-merriweather text-gray-700">
                        <a href="tel:+919999971472">+91 99999 71472</a>
                      </p>
                    </div>
                    <div>
                      <h3 className="font-poppins font-semibold">Phone</h3>
                      <a href="tel:+919625924702">+91 96259 24702</a>
                      <p className="font-merriweather text-gray-700">
                        
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Mail className="text-[#a0291f]" size={20} />
                    <div>
                    <h3 className="font-poppins font-semibold">Email</h3>
                    <p className="font-merriweather text-gray-700 break-all">
                      <a
                        href="mailto:contact@bharatiyayouthparliament.com"
                        className="hover:text-[#7a1f17] transition"
                      >
                        info@bharatiyayouthparliament.com
                      </a>
                    </p>
                  </div>

                  </div>

                </div>
              </div>

              <div className="bg-gray-50 p-4 md:p-6 rounded-lg">
                <h3 className="font-poppins font-semibold text-xl text-gray-900 mb-4">Office Hours</h3>
                <div className="font-merriweather text-gray-700 space-y-2">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* EVENT LOCATION SECTION */}
  <motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.6 }}
  className="mt-10 bg-gray-50 p-6 md:p-8 rounded-lg"
>
  <h2 className="font-poppins font-bold text-2xl text-gray-900 mb-6">
    Event Location
  </h2>

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">  
    {/* LEFT COLUMN – Talkatora Stadium */}
    <div>
      <h3 className="font-poppins font-semibold text-xl mb-2">
        Talkatora Stadium, New Delhi
      </h3>

      <p className="font-merriweather text-gray-700 mb-4">
        Talkatora Garden, President's Estate, New Delhi – 110004
      </p>

      <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden shadow">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3169.3401655530947!2d77.1932523!3d28.622721499999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d02aac1c988c9%3A0xf08c226605e04fa!2sTalkatora%20Stadium!5e1!3m2!1sen!2sin!4v1764883722881!5m2!1sen!2sin"
          className="w-full h-full border-0"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>

    {/* RIGHT COLUMN – Nearest Metro */}
    <div>
      <h3 className="font-poppins font-semibold text-xl mb-2">
        Nearest Metro Station: Patel Chowk Metro Station
      </h3>

      <p className="font-merriweather text-gray-700 mb-4">
        Distance: Approximately 1.9 km from Talkatora Stadium
      </p>

      <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden shadow">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3169.3444828096954!2d77.21139327495644!3d28.622578484533683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd4046a3af6f%3A0x5e5fd35c13967e59!2sPatel%20Chowk%20Metro!5e1!3m2!1sen!2sin!4v1764884047211!5m2!1sen!2sin"
          className="w-full h-full border-0"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  </div>
</motion.div>

    </>
  );
};
export default ContactPage;