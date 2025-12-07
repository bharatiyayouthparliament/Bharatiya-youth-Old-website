import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

import AdminLayout from '@/components/admin/AdminLayout';
import { useAuth } from '@/context/AuthContext';
import { useDashboardStats } from '@/hooks/useDashboardStats';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

/* Icons */
import {
  Users,
  Book,
  Video,
  Music,
  Image,
  Newspaper,
  Speaker,
  MessageSquare,
  Building,
  UserCheck,
  Coins,
  Presentation,
  PlusCircle,
  ArrowRight
} from 'lucide-react';

const AdminDashboardPage = () => {
  const { user } = useAuth();
  const { stats, recentActivities, loading } = useDashboardStats();

  const currentDate = format(new Date(), "EEEE, MMMM do, yyyy");

  /* ----------------------------------------------
       DASHBOARD STAT CARDS (ALL MODULES)
  ----------------------------------------------- */
  const statCards = [
    { title: 'Registrations', value: stats.registrations, icon: <Users />, link: '/admin/registrations', color: 'text-blue-500' },
    { title: 'Blog Posts', value: stats.blogs, icon: <Book />, link: '/admin/blogs', color: 'text-green-500' },
    { title: 'Media Items', value: stats.media, icon: <Video />, link: '/admin/media', color: 'text-purple-500' },
    { title: 'Speakers', value: stats.speakers, icon: <Speaker />, link: '/admin/speakers', color: 'text-orange-500' },
    { title: 'Contact Messages', value: stats.contacts, icon: <MessageSquare />, link: '/admin/contacts', color: 'text-red-500' },
    { title: 'Colleges', value: stats.colleges, icon: <Building />, link: '/admin/colleges', color: 'text-indigo-500' },

    /* Newly added sections */
    { title: 'Video Spots', value: stats.videoSpots, icon: <Video />, link: '/admin/videos', color: 'text-purple-600' },
    { title: 'Audio Spots', value: stats.audioSpots, icon: <Music />, link: '/admin/audios', color: 'text-blue-600' },
    { title: 'News Clippings', value: stats.newsClippings, icon: <Newspaper />, link: '/admin/news-clippings', color: 'text-gray-600' },
    { title: 'BYP Creative', value: stats.creatives, icon: <Image />, link: '/admin/byp-creative', color: 'text-pink-600' },
    { title: 'Donor Details', value: stats.donors, icon: <Coins />, link: '/admin/donors', color: 'text-yellow-600' },
    { title: 'Sponsors', value: stats.sponsors, icon: <Presentation />, link: '/admin/sponsors', color: 'text-teal-600' }
  ];

  /* Special role section */
  if (['super_admin', 'master_admin'].includes(user?.role)) {
    statCards.push({
      title: 'Admin Users',
      value: stats.admins,
      icon: <UserCheck />,
      link: '/admin/users',
      color: 'text-gray-700'
    });
  }

  /* ----------------------------------------------
       QUICK ACTIONS
  ----------------------------------------------- */
  const quickActions = [
    { label: 'Add Blog', link: '/admin/blogs', icon: <PlusCircle size={18} /> },
    { label: 'Add Speaker', link: '/admin/speakers', icon: <PlusCircle size={18} /> },
    { label: 'Add Media', link: '/admin/media', icon: <PlusCircle size={18} /> },
    { label: 'Upload Video Spot', link: '/admin/videos', icon: <PlusCircle size={18} /> },
    { label: 'Upload Audio Spot', link: '/admin/audios', icon: <PlusCircle size={18} /> },
    { label: 'Upload Creative', link: '/admin/byp-creative', icon: <PlusCircle size={18} /> },
    { label: 'View Registrations', link: '/admin/registrations', icon: <ArrowRight size={18} /> }
  ];

  /* Animation */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <AdminLayout>
      <Helmet>
        <title>Admin Dashboard - Bharatiya Youth Parliament</title>
      </Helmet>

      <motion.div initial="hidden" animate="visible" variants={containerVariants}>

        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-3xl font-bold font-poppins text-gray-800">
            Welcome, {user?.name}!
          </h1>

          <div className="flex items-center space-x-2 mt-1">
            <p className="text-md text-gray-500 font-merriweather">{currentDate}</p>
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase text-white bg-[#a0291f] rounded-full">
              {user?.role.replace('_', ' ')}
            </span>
          </div>
        </motion.div>

        {/* Stat Cards */}
        <motion.div variants={containerVariants} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {loading
            ? Array.from({ length: 12 }).map((_, i) => (
                <Skeleton key={i} className="h-[126px] w-full" />
              ))
            : statCards.map((card, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <StatCard {...card} />
                </motion.div>
              ))}
        </motion.div>

        {/* Content Grid */}
        <motion.div variants={itemVariants} className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Recent Activities */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="font-poppins">Recent Activities</CardTitle>
            </CardHeader>

            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                </div>
              ) : recentActivities.length > 0 ? (
                <ul className="space-y-3">
                  {recentActivities.map(activity => (
                    <li key={activity.id} className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50">
                      <div>
                        <span className="font-semibold text-gray-700">{activity.itemName}</span>
                        <span className="text-sm text-gray-500 ml-2">({activity.itemType})</span>
                      </div>

                      <span className="text-xs text-gray-400">
                        {activity?.createdAt
                          ? format(
                              activity.createdAt?.toDate
                                ? activity.createdAt.toDate()
                                : new Date(activity.createdAt),
                              'PPp'
                            )
                          : "No Date"}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-gray-500 py-8">No recent activities found.</p>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="font-poppins">Quick Actions</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col space-y-3">
              {quickActions.map(action => (
                <Link to={action.link} key={action.label}>
                  <Button variant="outline" className="w-full justify-start">
                    {action.icon}
                    <span className="ml-2">{action.label}</span>
                  </Button>
                </Link>
              ))}
            </CardContent>
          </Card>

        </motion.div>
      </motion.div>
    </AdminLayout>
  );
};

/* Mini Stat Card Component */
const StatCard = ({ icon, title, value, link, color }) => (
  <Link to={link}>
    <Card className="hover:shadow-lg transition-shadow duration-300 hover:border-[#a0291f]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium font-poppins text-gray-600">
          {title}
        </CardTitle>

        <div className={color}>
          {React.cloneElement(icon, { size: 22 })}
        </div>
      </CardHeader>

      <CardContent>
        <div className="text-3xl font-bold font-poppins text-gray-800">
          {value}
        </div>
      </CardContent>
    </Card>
  </Link>
);

export default AdminDashboardPage;
