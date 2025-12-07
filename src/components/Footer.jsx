// Updated Footer Component with sample color
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#edf2f7] text-black"> 
      {/* Light blue-gray background from sample */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Section */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <img
                alt="BYP Logo"
                className="h-20 w-auto"
                src="/image/logo2.png"
              />
            </Link>
            <p className="font-merriweather text-gray-700 text-sm">
              Empowering youth in governance, leadership, and unity for a sustainable,
              inclusive, and innovative future.
            </p>
          </div>

          {/* Middle Section */}
          <div>
            <h3 className="font-poppins font-semibold text-xl mb-4 text-gray-800">Useful Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="font-merriweather text-gray-700 hover:text-[#5a2f27] transition-colors">Home</Link></li>
              <li><Link to="/about" className="font-merriweather text-gray-700 hover:text-[#5a2f27] transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="font-merriweather text-gray-700 hover:text-[#5a2f27] transition-colors">Contact Us</Link></li>
              <li><Link to="/privacy-policy" className="font-merriweather text-gray-700 hover:text-[#5a2f27] transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Right Section */}
          <div>
            <h3 className="font-poppins font-semibold text-xl mb-4 text-gray-800">Follow Us</h3>

            <div className="flex space-x-4 mb-6">
              <a href="https://www.instagram.com/bharatiyayouthparliament/" target="_blank">
                <img src="/image/instagram.png" className="h-7 w-7 hover:scale-110 transition" />
              </a>

              <a href="https://www.facebook.com/BharatiyaYouthParliament" target="_blank">
                <img src="/image/facebook.png" className="h-7 w-7 hover:scale-110 transition" />
              </a>

              <a href="https://x.com/BharatiyaYP" target="_blank">
                <img src="/image/twitter.png" className="h-7 w-7 hover:scale-110 transition" />
              </a>

              <a href="https://www.youtube.com/@BharatiyaYouthparliament" target="_blank">
                <img src="/image/youtube.png" className="h-7 w-7 hover:scale-110 transition" />
              </a>
            </div>


            <div className="space-y-3 font-merriweather text-gray-700 text-sm">
              <div className="flex items-center space-x-3">
                <Phone size={18} className="flex-shrink-0 text-[#5a2f27]" />
                <a href="tel:+919999971472" className="hover:text-[#5a2f27] transition-colors">+91 99999 71472</a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="flex-shrink-0 text-[#5a2f27]" />
                
                <a href="tel:+919625924702" className="hover:text-[#5a2f27] transition-colors">+91 96259 24702</a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="flex-shrink-0 text-[#5a2f27]" />
                <a href="mailto:info@bharatiyayouthparliament.com" className="hover:text-[#5a2f27] transition-colors">info@bharatiyayouthparliament.com</a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={19} className="flex-shrink-0 text-[#5a2f27]" />
                <a href="mailto:byp.srro@gmail.com" className="hover:text-[#5a2f27] transition-colors">byp.srro@gmail.com</a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin size={19} className="mt-1 flex-shrink-0 text-[#5a2f27]" />
                <p>F-32, Connaught Place, New Delhi-110001</p>
              </div>
            </div>
          </div>
        </div>

        {/* Credit Line */}
      <div className="mt-8 pt-8 border-t border-gray-300 text-center font-merriweather text-sm text-gray-700">
        <p>©2025 Bharatiya Youth Parliament | All Rights Reserved</p>
        <p className="mt-2">
          Designed & Developed by
          <a
            href="https://www.cosmoinfomis.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#5a2f27] font-semibold ml-1"
          >
            Cosmo Infomis
          </a>
        </p>
      </div>
    </div>
    </footer>
  );
};
export default Footer;