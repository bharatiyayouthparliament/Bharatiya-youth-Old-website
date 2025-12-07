import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

import {
  LayoutDashboard,
  Users,
  FileText,
  Newspaper,
  Clapperboard,
  Mic,
  School as University,
  Mail,
  LogOut,
  Music,
  Video,
  Briefcase,
  CalendarDays,
  Wallet // Donation/Donor Icon
} from 'lucide-react';

const AdminSidebar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const CAN_MANAGE_ADMINS = ['super_admin', 'master_admin'];
  const CAN_SEE_EVENTS = ['super_admin', 'master_admin'];

  const navLinks = [
    { to: '/admin/dashboard', icon: <LayoutDashboard className="h-5 w-5" />, text: 'Dashboard' },
    { to: '/admin/registrations', icon: <Users className="h-5 w-5" />, text: 'Registrations' },
    { to: '/admin/events', icon: <CalendarDays className="h-5 w-5" />, text: 'Events', roles: CAN_SEE_EVENTS },
    { to: '/admin/blogs', icon: <Newspaper className="h-5 w-5" />, text: 'Blogs' },
    { to: '/admin/media', icon: <Clapperboard className="h-5 w-5" />, text: 'Media' },
    { to: '/admin/speakers', icon: <Mic className="h-5 w-5" />, text: 'Speakers' },
    { to: '/admin/colleges', icon: <University className="h-5 w-5" />, text: 'Colleges' },
    { to: '/admin/contacts', icon: <Mail className="h-5 w-5" />, text: 'Enquiries' },
    { to: '/admin/audio', icon: <Music className="h-5 w-5" />, text: 'Audio' },
    { to: '/admin/video', icon: <Video className="h-5 w-5" />, text: 'Video' },
    { to: '/admin/sponsors', icon: <Briefcase className="h-5 w-5" />, text: 'Sponsors' },
    { to: '/admin/donors', icon: <Wallet className="h-5 w-5" />, text: 'Donors' },
    { to: '/admin/users', icon: <FileText className="h-5 w-5" />, text: 'Admin Users', roles: CAN_MANAGE_ADMINS }
  ];

  const accessibleLinks = navLinks.filter(
    (link) => !link.roles || link.roles.includes(user?.role)
  );

  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col h-screen overflow-y-auto scrollbar-hide">
      
      {/* Sidebar Top Section */}
      <div className="p-4">
        <div className="text-2xl font-bold mb-8 text-center text-[#a0291f]">
          BYP Admin
        </div>
      </div>

      {/* Scrollable Navigation */}
      <nav className="flex-grow overflow-y-auto px-4 pb-6">
        <ul>
          {accessibleLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 my-1 rounded-lg transition-colors duration-200 ${
                    isActive ? 'bg-[#a0291f] text-white' : 'hover:bg-gray-700'
                  }`
                }
              >
                {link.icon}
                <span className="ml-4">{link.text}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Fixed Footer Logout */}
      <div className="p-4 border-t border-gray-700">
        <Button
          onClick={handleLogout}
          className="w-full flex items-center justify-center bg-red-600 hover:bg-red-700"
        >
          <LogOut className="h-5 w-5" />
          <span className="ml-2">Logout</span>
        </Button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
