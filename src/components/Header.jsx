// Header.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [registerDropdownDesktop, setRegisterDropdownDesktop] = useState(false);
  const [registerDropdownMobile, setRegisterDropdownMobile] = useState(false);

  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    {
      name: "Team",
      path: "/team",
      dropdown: [
        { name: "Reception Committee", path: "/team/reception-committee" },
        { name: "Organizing Committee", path: "/team/organizing-committee" },
      ],
    },
    { name: "Vivekanand Award", path: "/awards" },
    { name: "Speaker's", path: "/speakers" },
    {
      name: "Session",
      path: "/sessions",
      dropdown: [
        { name: "2nd Session - BYP 2026 (Upcoming)", path: "/sessions/2nd-edition" },
        { name: "1st Session - BYP 2025", path: "/sessions/1st-edition" },
      ],
    },
    {
      name: "Media",
      path: "",
      dropdown: [
        { name: "Photo Gallery", path: "/media" },
        { name: "Video Spots", path: "/media/videos" },
        { name: "Audio Spots", path: "/media/audios" },
        { name: "News Clippings", path: "/media/news" },
        { name: "BYP Creative", path: "/media/creative" },
      ],
    },
    {
      name: "Get Involved",
      path: "/get-involved",
      dropdown: [
        { name: "Donation", path: "/get-involved/donation" },
        { name: "Sponsorship", path: "/get-involved/sponsorship" },
      ],
    },
    { name: "Contact Us", path: "/contact" },
    { name: "Blog", path: "/blog" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 w-full z-30 bg-white border-b shadow-md font-sans">
      {/* Reduced container padding from pt-2 pb-2 to py-1 */}
      <div className="max-w-[1500px] mx-auto w-full px-4 md:px-8 py-1">
        
        {/* ========================== ROW 1: Logos & Info ============================== */}
        <div className="flex flex-col md:flex-row justify-between items-center w-full gap-2 md:gap-0">
          
          {/* LEFT: Main Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src="/image/logo2.png" 
              alt="Bharatiya Youth Parliament"
              className="h-20 md:h-14 w-auto object-contain"
            />
          </Link>

          {/* RIGHT SIDE BLOCK: Phone + Partner Logos */}
          <div className="hidden md:flex items-center gap-4">
            
            {/* Phone Numbers - slightly smaller text */}
            <div className="text-right leading-tight">
              <p className="text-[#0b1a57] font-bold text-base tracking-tight">
                +91 99999 71472
              </p>
              <p className="text-[#0b1a57] font-bold text-base tracking-tight">
                +91 96259 24702
              </p>
            </div>

            {/* Partner Logos Row - Reduced height from h-11 to h-9 */}
            <div className="flex items-center gap-4">
              <img src="/image/SRRO.png" className="h-9 w-auto object-contain" alt="SRRO" />
              <div className="h-6 w-[1px] bg-gray-300"></div> {/* Divider */}

              <img src="/image/zbharat.png" className="h-9 w-auto object-contain" alt="Zee Bharat" />
              <div className="h-6 w-[1px] bg-gray-300"></div>

              <img src="/image/kprnews.png" className="h-9 w-auto object-contain" alt="KPR News" />
              <div className="h-6 w-[1px] bg-gray-300"></div>

              <img src="/image/branding.png" className="h-9 w-auto object-contain" alt="KPR Branding" />
              <div className="h-6 w-[1px] bg-gray-300"></div>
            </div>
          </div>

          {/* Mobile Toggle Button */}
          <div className="md:hidden absolute right-4 top-6">
             <button onClick={() => setMobileMenuOpen(true)}>
               <Menu size={28} className="text-[#0b1a57]" />
             </button>
          </div>
        </div>

        {/* Separator Line */}
        <div className="hidden md:block w-full h-[1px] bg-gray-100 my-1"></div>

        {/* ========================== ROW 2: Navigation ============================== */}
        {/* Reduced row padding from py-2 to py-0 (or py-1) */}
        <div className="hidden md:flex justify-end items-center gap-6 py-0.5">
          
          {/* Navigation Links */}
          <nav className="flex items-center gap-6 xl:gap-8 text-[15px] xl:text-[16px] font-medium text-[#0b1a57]">
            {navItems.map((item) =>
              item.dropdown ? (
                <div key={item.name} className="relative group">
                  <button
                    className={`flex items-center hover:text-[#B83324] transition-colors duration-200 ${
                      isActive(item.path) ? "text-[#B83324]" : ""
                    }`}
                  >
                    {item.name}
                    <ChevronDown className="ml-1 h-3 w-3" />
                  </button>

                  <div className="absolute top-full left-0 hidden group-hover:block bg-white shadow-xl border-t-2 border-[#B83324] rounded-b-md p-2 min-w-[220px] z-50">
                    {item.dropdown.map((sub) => (
                      <Link
                        key={sub.path}
                        to={sub.path}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#B83324] rounded-md transition"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`hover:text-[#B83324] transition-colors duration-200 ${
                    isActive(item.path) ? "text-[#B83324]" : ""
                  }`}
                >
                  {item.name}
                </Link>
              )
            )}
          </nav>

          {/* Register Button - SIGNIFICANT HEIGHT REDUCTION HERE */}
          <div className="relative">
            <Button
              // Changed py-5 to py-2 to reduce height drastically
              className="bg-[#B83324] hover:bg-[#9e2a1d] text-white px-6 py-2 rounded-md font-bold text-sm shadow-md transition-all"
              onClick={() => setRegisterDropdownDesktop(!registerDropdownDesktop)}
            >
              REGISTER
            </Button>

            {registerDropdownDesktop && (
              <div className="absolute right-0 mt-2 w-64 bg-white border shadow-xl rounded-md overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                <Link to="/participant-registration" className="block px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-[#B83324] border-b">
                  As Participant
                </Link>
                <Link to="/register" className="block px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-[#B83324] border-b">
                  As Member of Parliament
                </Link>
                <Link to="/global-summit-registration" className="block px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-[#B83324]">
                  For Global Summit
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ========================== MOBILE MENU DRAWER (Unchanged) ============================== */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[60]"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-6 border-b">
                <img className="h-10" src="/image/logo2.png" alt="BYP" />
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                  <X size={24} className="text-gray-600" />
                </button>
              </div>

              <div className="flex flex-col p-4">
                {navItems.map((item) => (
                  <div key={item.name} className="border-b last:border-0">
                    {item.dropdown ? (
                      <div>
                        <button
                          className="w-full flex items-center justify-between px-2 py-4 text-left font-medium text-gray-800"
                          onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                        >
                          {item.name}
                          <ChevronDown
                            className={`transition-transform duration-200 ${
                              openDropdown === item.name ? "rotate-180 text-[#B83324]" : "text-gray-400"
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {openDropdown === item.name && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden bg-gray-50 rounded-md mb-2"
                            >
                              {item.dropdown.map((sub) => (
                                <Link
                                  key={sub.path}
                                  to={sub.path}
                                  className="block px-6 py-3 text-sm text-gray-600 hover:text-[#B83324]"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {sub.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        to={item.path}
                        className="block px-2 py-4 font-medium text-gray-800 hover:text-[#B83324]"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}

                <div className="mt-6">
                  <Button
                    className="w-full bg-[#B83324] hover:bg-[#9e2a1d] py-6 text-lg font-semibold"
                    onClick={() => setRegisterDropdownMobile(!registerDropdownMobile)}
                  >
                    REGISTER
                  </Button>
                  
                  {registerDropdownMobile && (
                    <div className="border rounded-md mt-3 bg-gray-50">
                      <Link to="/participant-registration" className="block px-4 py-3 text-sm font-medium border-b" onClick={() => setMobileMenuOpen(false)}>As Participant</Link>
                      <Link to="/register" className="block px-4 py-3 text-sm font-medium border-b" onClick={() => setMobileMenuOpen(false)}>As Member of Parliament</Link>
                      <Link to="/global-summit-registration" className="block px-4 py-3 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>For Global Summit</Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;