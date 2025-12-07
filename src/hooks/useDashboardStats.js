// src/hooks/useDashboardStats.js
import { useState, useEffect } from "react";
import { getApi } from "@/utils/api";

export const useDashboardStats = () => {
  const [stats, setStats] = useState({
    registrations: 0,
    blogs: 0,
    media: 0,
    speakers: 0,
    contacts: 0,
    colleges: 0,
    admins: 0,

    videoSpots: 0,
    audioSpots: 0,
    newsClippings: 0,
    creatives: 0,
    donors: 0,
    sponsors: 0,
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  // ALL collections supported by Dashboard
  const collections = [
    { name: "blogs", type: "Blog" },
    { name: "speakers", type: "Speaker" },
    { name: "media", type: "Media" },
    { name: "colleges", type: "College" },
    { name: "registrations", type: "Registration" },
    { name: "contacts", type: "Contact" },
    { name: "admins", type: "Admin" },

    // Newly Added Sections
    { name: "videoSpots", type: "Video Spot" },
    { name: "audioSpots", type: "Audio Spot" },
    { name: "newsClippings", type: "News Clipping" },
    { name: "creatives", type: "Creative" },
    { name: "donors", type: "Donor" },
    { name: "sponsors", type: "Sponsor" },
  ];

  // Format timestamp
  const normalizeDate = (item) => {
    if (item?.createdAt?.seconds) {
      return new Date(item.createdAt.seconds * 1000).toISOString();
    }
    if (item?.created_at) return item.created_at;
    if (item?.createdAt) return item.createdAt;
    return new Date().toISOString();
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const newStats = {};
      const activityList = [];

      for (const col of collections) {
        const api = getApi(col.name);

        // Prevent errors if API missing
        if (!api || typeof api.getAll !== "function") {
          newStats[col.name] = 0;
          continue;
        }

        const response = await api.getAll();
        const items = response?.data || [];

        newStats[col.name] = items.length;

        // Activity items
        items.forEach((item) => {
          activityList.push({
            id: item.id,
            itemType: col.type,
            itemName:
              item.title ||          // Blogs, Events
              item.caption ||        // Media, Video, Audio, Creative
              item.name ||           // Speakers, Colleges
              item.fullName ||       // Donors, Sponsors
              item.organization ||   // Sponsors
              item.fileName ||       // Media upload name
              item.category ||       // media/news/audio/video
              item.email ||          // Contacts
              "No Name",
            createdAt: normalizeDate(item),
          });
        });
      }

      // Sort by timestamp
      activityList.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setStats((prev) => ({
        ...prev,
        ...newStats,
      }));

      setRecentActivities(activityList.slice(0, 5));
      setLoading(false);
    };

    loadData();
  }, []);

  return { stats, recentActivities, loading };
};
