
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import AwardsPage from '@/pages/AwardsPage';
import MediaPage from '@/pages/MediaPage';
import ContactPage from '@/pages/ContactPage';
import GlobalSummitRegistrationPage from '@/pages/GlobalSummitRegistrationPage';
import BlogPage from '@/pages/BlogPage';
import RegistrationPage from '@/pages/RegistrationPage';
import ParticipantRegistration from "@/pages/ParticipantRegistration.jsx";
import AdminLoginPage from '@/pages/AdminLoginPage';
import AdminDashboardPage from '@/pages/AdminDashboardPage';
import TeamPage from '@/pages/TeamPage';
import SpeakersPage from '@/pages/SpeakersPage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import { Toaster } from '@/components/ui/toaster';
import TandCPage from './pages/TandCpage';
import ScrollToTop from '@/components/ScrollToTop';
import GoToTop from '@/components/GoToTop';
import OrganizingCommitteePage from '@/pages/OrganizingCommitteePage';
import ReceptionCommitteePage from '@/pages/ReceptionCommitteePage';
import BlogDetailPage from '@/pages/BlogDetailPage';
import { AuthProvider } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import BlogManagementPage from '@/pages/admin/BlogManagementPage';
import MediaManagementPage from '@/pages/admin/MediaManagementPage';
import SpeakerManagementPage from '@/pages/admin/SpeakerManagementPage';
import CollegeManagementPage from '@/pages/admin/CollegeManagementPage';
import ContactEnquiriesPage from '@/pages/admin/ContactEnquiriesPage';
import AdminManagementPage from '@/pages/admin/AdminManagementPage';
import RegistrationDataPage from '@/pages/admin/RegistrationDataPage';
import ErrorBoundary from '@/components/ErrorBoundary';
import RegistrationSuccessPage from '@/pages/RegistrationSuccessPage';
import ParliamentarySessionsPage from '@/pages/ParliamentarySessionsPage';
import FirstSessionPage from '@/pages/parliamentary-sessions/FirstSessionPage';
import SecondSessionPage from '@/pages/parliamentary-sessions/SecondSessionPage';
import EventManagementPage from '@/pages/admin/EventManagementPage';
import AudioManagementPage from '@/pages/admin/AudioManagementPage';
import VideoManagementPage from '@/pages/admin/VideoManagementPage';
import SponsorsManagement from '@/pages/admin/SponsorsManagement';
import DonorDetails from './pages/admin/DonorDetails';
import VideoSpots from '@/pages/Media/VideoSpots';
import AudioSpots from '@/pages/Media/AudioSpots';
import NewsClippings from '@/pages/Media/NewsClippings';
import BYPCreative from '@/pages/Media/BYPCreative';

import Donation from '@/pages/GetInvolved/Donation';
import Sponsorship from '@/pages/GetInvolved/Sponsorship';

// Design and Develop By Cosmo Infomis LLP www.cosmoinfomis.in
  // (For any Query Contact us on +91 94535 46327)

function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <Helmet>
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Merriweather:wght@300;400;700&display=swap" rel="stylesheet" />
        </Helmet>
        
        <AppContent />

        <Toaster />
        <GoToTop />
      </AuthProvider>
    </Router>
  );
}

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <ErrorBoundary>
        <Routes>
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/registrations" element={<RegistrationDataPage />} />
            <Route path="/admin/blogs" element={<BlogManagementPage />} />
            <Route path="/admin/media" element={<MediaManagementPage />} />
            <Route path="/admin/speakers" element={<SpeakerManagementPage />} />
            <Route path="/admin/colleges" element={<CollegeManagementPage />} />
            <Route path="/admin/contacts" element={<ContactEnquiriesPage />} />
            <Route path="/admin/users" element={<AdminManagementPage />} />
            <Route path="/admin/events" element={<EventManagementPage />} />
            <Route path="/admin/audio" element={<AudioManagementPage/>}/>
            <Route path="/admin/video" element={<VideoManagementPage/>}/>
            <Route path="/admin/sponsors" element={<SponsorsManagement/>}/>
            <Route path="/admin/donors" element={<DonorDetails/>}/>
          </Route>
        </Routes>
      </ErrorBoundary>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow pt-16">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/team/organizing-committee" element={<OrganizingCommitteePage />} />
          <Route path="/team/reception-committee" element={<ReceptionCommitteePage />} />
          <Route path="/awards" element={<AwardsPage />} />
          <Route path="/speakers" element={<SpeakersPage />} />
          <Route path="/media" element={<MediaPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogDetailPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/participant-registration" element={<ParticipantRegistration />} />
          <Route path="/global-summit-registration" element={<GlobalSummitRegistrationPage />} />
          <Route path="/registration-success" element={<RegistrationSuccessPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-and-conditions" element={<TandCPage />} />
          <Route path="/sessions" element={<ParliamentarySessionsPage />} />
          <Route path="/sessions/1st-edition" element={<FirstSessionPage />} />
          <Route path="/sessions/2nd-edition" element={<SecondSessionPage />} />

          <Route path="/media/videos" element={<VideoSpots />} />
          <Route path="/media/audios" element={<AudioSpots />} />
          <Route path="/media/news" element={<NewsClippings />} />
          <Route path="/media/creative" element={<BYPCreative />} />

          <Route path="/get-involved/donation" element={<Donation />} />
          <Route path="/get-involved/sponsorship" element={<Sponsorship />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
