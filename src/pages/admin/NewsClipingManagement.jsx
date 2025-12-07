import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { db, storage } from "@/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const NewsClipingManagement = () => {
  /* STATES */
  const [clippings, setClippings] = useState([]);
  const [videos, setVideos] = useState([]);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);

  /* Video fields */
  const [ytTitle, setYtTitle] = useState("");
  const [ytSubtitle, setYtSubtitle] = useState("");
  const [ytLink, setYtLink] = useState("");

  const [uploading, setUploading] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);

  /* FETCH */
  const fetchClippings = async () => {
    const snap = await getDocs(collection(db, "news_clippings"));
    setClippings(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  const fetchVideos = async () => {
    const snap = await getDocs(collection(db, "news_videos"));
    setVideos(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    fetchClippings();
    fetchVideos();
  }, []);

  /* UPLOAD IMAGE CLIPPING */
  const handleClippingUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Choose an image");
      return;
    }

    setUploading(true);
    try {
      const storageRef = ref(storage, `news_clippings/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);

      const url = await getDownloadURL(storageRef);

      await addDoc(collection(db, "news_clippings"), {
        title,
        description: desc,
        image: url,
        createdAt: serverTimestamp(),
      });

      setTitle("");
      setDesc("");
      setFile(null);
      fetchClippings();
    } catch (err) {
      console.error("Upload failed:", err);
    }
    setUploading(false);
  };

  /* UPLOAD VIDEO */
  const handleVideoUpload = async (e) => {
    e.preventDefault();

    if (!ytLink.trim()) {
      alert("Enter a YouTube embed URL");
      return;
    }

    setUploadingVideo(true);
    try {
      await addDoc(collection(db, "news_videos"), {
        title: ytTitle.trim(),
        subtitle: ytSubtitle.trim(),
        url: ytLink.trim(),
        createdAt: serverTimestamp(),
      });

      setYtTitle("");
      setYtSubtitle("");
      setYtLink("");
      fetchVideos();
    } catch (err) {
      console.error("Video upload failed:", err);
    }
    setUploadingVideo(false);
  };

  /* DELETE */
  const deleteClipping = async (item) => {
    try {
      if (item.image) {
        const fileRef = ref(storage, item.image);
        deleteObject(fileRef).catch(() => {});
      }

      await deleteDoc(doc(db, "news_clippings", item.id));
      fetchClippings();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const deleteVideo = async (item) => {
    try {
      await deleteDoc(doc(db, "news_videos", item.id));
      fetchVideos();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="p-6 md:p-10">
      {/* PAGE HEADER */}
      <motion.div
        {...fadeIn}
        className="mb-10 bg-gray-900 text-white p-6 rounded-xl shadow-lg text-center"
      >
        <h1 className="text-3xl md:text-4xl font-bold">
          Manage <span className="text-[#a0291f]">News Clippings</span>
        </h1>
        <p className="text-gray-300 mt-2">
          Upload newspaper clippings and featured news videos.
        </p>
      </motion.div>

      {/* =============================
             UPLOAD CLIPPING
      ============================== */}
      <motion.form
        {...fadeIn}
        onSubmit={handleClippingUpload}
        className="max-w-3xl mx-auto bg-white shadow-lg border border-gray-200 p-6 rounded-xl space-y-4 mb-12"
      >
        <h2 className="text-xl font-semibold text-[#a0291f]">
          Upload Newspaper Clipping
        </h2>

        <div>
          <Label>Title</Label>
          <Input
            placeholder="Enter headline"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label>Description</Label>
          <Input
            placeholder="Short description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label>Upload Image</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="mt-1"
            required
          />
        </div>

        <Button
          type="submit"
          disabled={uploading}
          className="w-full bg-[#a0291f] hover:bg-[#7a1f17]"
        >
          {uploading ? "Uploading..." : "Upload Clipping"}
        </Button>
      </motion.form>

      {/* =============================
            UPLOAD VIDEO (with Title + Subtitle)
      ============================== */}
      <motion.form
        {...fadeIn}
        onSubmit={handleVideoUpload}
        className="max-w-3xl mx-auto bg-white shadow-lg border border-gray-200 p-6 rounded-xl space-y-4 mb-12"
      >
        <h2 className="text-xl font-semibold text-[#a0291f]">
          Upload News Video
        </h2>

        <div>
          <Label>Video Title</Label>
          <Input
            placeholder="e.g. Media Coverage by NDTV"
            value={ytTitle}
            onChange={(e) => setYtTitle(e.target.value)}
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label>Video Subtitle</Label>
          <Input
            placeholder="e.g. Highlights from BYP panel discussion"
            value={ytSubtitle}
            onChange={(e) => setYtSubtitle(e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label>YouTube Embed URL</Label>
          <Input
            placeholder="https://www.youtube.com/embed/..."
            value={ytLink}
            onChange={(e) => setYtLink(e.target.value)}
            required
            className="mt-1"
          />
        </div>

        <Button
          type="submit"
          disabled={uploadingVideo}
          className="w-full bg-[#a0291f] hover:bg-[#7a1f17]"
        >
          {uploadingVideo ? "Saving..." : "Add Video"}
        </Button>
      </motion.form>

      {/* =============================
             LIST: NEWS CLIPPINGS
      ============================== */}
      <section className="max-w-5xl mx-auto mb-16">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Uploaded Newspaper Clippings
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {clippings.map((item) => (
            <motion.div
              key={item.id}
              {...fadeIn}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
            >
              <img src={item.image} className="w-full h-64 object-cover" />

              <div className="p-4">
                <h3 className="font-semibold text-[#a0291f]">
                  {item.title}
                </h3>
                <p className="text-gray-700 text-sm mt-1">
                  {item.description}
                </p>

                <Button
                  onClick={() => deleteClipping(item)}
                  className="mt-4 bg-red-600 hover:bg-red-700"
                >
                  Delete
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* =============================
             LIST: NEWS VIDEOS
      ============================== */}
      <section className="max-w-5xl mx-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Uploaded News Videos
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {videos.map((item) => (
            <motion.div
              key={item.id}
              {...fadeIn}
              className="rounded-xl overflow-hidden shadow-lg bg-white p-4 border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-[#a0291f] mb-1">
                {item.title}
              </h3>
              {item.subtitle && (
                <p className="text-gray-700 text-sm mb-3">
                  {item.subtitle}
                </p>
              )}

              <iframe
                className="w-full h-64 md:h-80 rounded-xl"
                src={item.url}
                allowFullScreen
              ></iframe>

              <Button
                onClick={() => deleteVideo(item)}
                className="mt-4 bg-red-600 hover:bg-red-700"
              >
                Delete
              </Button>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default NewsClipingManagement;