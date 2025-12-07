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

const BYPCreativeManagement = () => {
  const [creatives, setCreatives] = useState([]);

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [file, setFile] = useState(null);

  const [uploading, setUploading] = useState(false);

  const fetchCreatives = async () => {
    const snap = await getDocs(collection(db, "byp_creatives"));
    setCreatives(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    fetchCreatives();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select an image");
      return;
    }

    setUploading(true);

    try {
      const storageRef = ref(storage, `byp_creative/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);

      const url = await getDownloadURL(storageRef);

      await addDoc(collection(db, "byp_creatives"), {
        title,
        subtitle,
        image: url,
        createdAt: serverTimestamp(),
      });

      setTitle("");
      setSubtitle("");
      setFile(null);

      fetchCreatives();
    } catch (err) {
      console.error("Upload failed:", err);
    }

    setUploading(false);
  };

  const handleDelete = async (item) => {
    try {
      if (item.image) {
        const fileRef = ref(storage, item.image);
        deleteObject(fileRef).catch(() => {});
      }

      await deleteDoc(doc(db, "byp_creatives", item.id));
      fetchCreatives();
    } catch (err) {
      console.error("Delete failed:", err);
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
          Manage <span className="text-[#a0291f]">BYP Creative</span>
        </h1>
        <p className="text-gray-300 mt-2">
          Upload official posters, branding materials and digital creatives.
        </p>
      </motion.div>

      {/* UPLOAD FORM */}
      <motion.form
        {...fadeIn}
        onSubmit={handleUpload}
        className="max-w-3xl mx-auto bg-white border border-gray-200 p-6 rounded-xl shadow-lg space-y-4 mb-14"
      >
        <h2 className="text-xl font-semibold text-[#a0291f]">Upload Creative</h2>

        <div>
          <Label>Creative Title</Label>
          <Input
            placeholder="e.g. BYP Promotional Poster"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label>Subtitle / Short Description</Label>
          <Input
            placeholder="e.g. Official creative representing BYP vision"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label>Upload Image</Label>
          <Input
            type="file"
            accept="image/*"
            required
            onChange={(e) => setFile(e.target.files[0])}
            className="mt-1"
          />
        </div>

        <Button
          type="submit"
          disabled={uploading}
          className="w-full bg-[#a0291f] hover:bg-[#7a1f17]"
        >
          {uploading ? "Uploading..." : "Upload Creative"}
        </Button>
      </motion.form>

      {/* LIST OF UPLOADED CREATIVES */}
      <section className="max-w-5xl mx-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Uploaded Creatives</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {creatives.map((item) => (
            <motion.div
              key={item.id}
              {...fadeIn}
              className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-lg"
            >
              <img
                src={item.image}
                className="w-full h-64 object-cover"
                alt={item.title}
              />

              <div className="p-4">
                <h3 className="font-semibold text-[#a0291f]">{item.title}</h3>
                {item.subtitle && (
                  <p className="text-gray-700 text-sm mt-1">{item.subtitle}</p>
                )}

                <Button
                  onClick={() => handleDelete(item)}
                  className="mt-4 bg-red-600 hover:bg-red-700"
                >
                  Delete
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BYPCreativeManagement;
