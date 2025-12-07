import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  Music, Plus, Search, Filter, Trash2, 
  PlayCircle, PauseCircle, Upload, Loader2, AlertCircle
} from 'lucide-react';

// Firebase Imports
import { db, storage } from "../../firebase"; // Adjust path as needed
import { 
  collection, 
  addDoc, 
  deleteDoc, 
  doc, 
  onSnapshot, 
  serverTimestamp, 
  query, 
  orderBy 
} from "firebase/firestore";
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from "firebase/storage";

const AudioManagementPage = () => {
  const [audios, setAudios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [playingId, setPlayingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Upload States
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Speeches',
    status: 'Draft',
    file: null
  });

  // --- 1. Fetch Data Real-time ---
  useEffect(() => {
    const q = query(collection(db, "audios"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const audioList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setAudios(audioList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // --- 2. Handle File Selection & Validation ---
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUploadError('');

    if (file) {
      // 20MB Calculation: 20 * 1024 * 1024 bytes
      const MAX_SIZE = 20 * 1024 * 1024; 
      
      if (file.size > MAX_SIZE) {
        setUploadError(`File is too large (${(file.size / (1024*1024)).toFixed(2)}MB). Max size is 20MB.`);
        setFormData({ ...formData, file: null });
        e.target.value = null; // Reset input
        return;
      }

      // Check format
      if (!file.type.startsWith('audio/')) {
        setUploadError("Please upload a valid audio file (MP3, WAV).");
        setFormData({ ...formData, file: null });
        return;
      }

      setFormData({ ...formData, file: file });
    }
  };

  // --- 3. Upload & Save Logic ---
  const handleSave = async () => {
    if (!formData.title || !formData.file) {
      setUploadError("Please provide a title and select an audio file.");
      return;
    }

    setIsUploading(true);
    setUploadError('');

    try {
      // A. Upload to Storage
      const storageRef = ref(storage, `audios/${Date.now()}_${formData.file.name}`);
      const uploadResult = await uploadBytes(storageRef, formData.file);
      const downloadUrl = await getDownloadURL(uploadResult.ref);

      // B. Determine Thumbnail based on category (since we don't upload one)
      let thumbUrl = "https://placehold.co/100x100/png?text=Audio";
      if (formData.category === 'Speeches') thumbUrl = "https://placehold.co/100x100/A0291F/FFF?text=Speech";
      if (formData.category === 'Podcasts') thumbUrl = "https://placehold.co/100x100/1F2937/FFF?text=Cast";
      if (formData.category === 'Music')    thumbUrl = "https://placehold.co/100x100/2563EB/FFF?text=Music";

      // C. Save to Firestore
      await addDoc(collection(db, "audios"), {
        title: formData.title,
        description: formData.description || "",
        category: formData.category,
        status: formData.status,
        audioUrl: downloadUrl,
        storagePath: uploadResult.ref.fullPath, // Save path to delete later
        thumbnail: thumbUrl,
        fileName: formData.file.name,
        fileSize: (formData.file.size / (1024 * 1024)).toFixed(2) + ' MB',
        createdAt: serverTimestamp(),
        // Just a placeholder duration, real duration requires metadata parsing
        duration: "N/A" 
      });

      // D. Reset & Close
      setIsModalOpen(false);
      setFormData({
        title: '',
        description: '',
        category: 'Speeches',
        status: 'Draft',
        file: null
      });

    } catch (error) {
      console.error("Error uploading:", error);
      setUploadError("Failed to upload. Check console for details.");
    } finally {
      setIsUploading(false);
    }
  };

  // --- 4. Delete Logic ---
  const handleDelete = async (audio) => {
    if(window.confirm("Are you sure you want to delete this audio?")) {
      try {
        // 1. Delete from Firestore
        await deleteDoc(doc(db, "audios", audio.id));

        // 2. Delete from Storage (if path exists)
        if (audio.storagePath) {
          const fileRef = ref(storage, audio.storagePath);
          await deleteObject(fileRef).catch(err => console.log("File not found in storage, skipping...", err));
        }
      } catch (error) {
        console.error("Error deleting audio:", error);
        alert("Could not delete audio.");
      }
    }
  };

  // --- 5. Toggle Play ---
  const togglePlay = (id) => {
    // Reset any other playing audio handled by the browser directly
    // This simple toggle just updates UI state, the actual <audio> tag handles playback
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(el => {
      if(el.id !== `audio-${id}`) el.pause();
    });

    const currentAudio = document.getElementById(`audio-${id}`);
    if (currentAudio) {
      if (playingId === id) {
        currentAudio.pause();
        setPlayingId(null);
      } else {
        currentAudio.play();
        setPlayingId(id);
      }
    }
  };

  // Filter Logic
  const filteredAudios = audios.filter(audio => {
    const matchesSearch = audio.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || audio.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <AdminLayout>
      {/* --- Page Header --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-100 rounded-lg text-[#a0291f]">
            <Music className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Audio Management</h1>
            <p className="text-sm text-gray-500">Manage audio tracks, podcasts, and speeches</p>
          </div>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#a0291f] hover:bg-red-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus className="h-4 w-4" />
          Add New Audio
        </button>
      </div>

      {/* --- Controls Section --- */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search audio title..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-[#a0291f] transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <select 
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:border-[#a0291f]"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Speeches">Speeches</option>
            <option value="Podcasts">Podcasts</option>
            <option value="Music">Music</option>
          </select>
        </div>
      </div>

      {/* --- Data Table --- */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Thumbnail</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Title & Details</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Preview</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-gray-400" />
                  </td>
                </tr>
              ) : filteredAudios.map((audio) => (
                <tr key={audio.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-12 w-12 rounded-lg bg-gray-100 overflow-hidden border border-gray-200">
                      <img src={audio.thumbnail} alt="" className="h-full w-full object-cover" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">{audio.title}</span>
                      <span className="text-xs text-gray-500">
                         {/* Safe date conversion */}
                        {audio.createdAt?.toDate ? audio.createdAt.toDate().toLocaleDateString() : 'Just now'} • {audio.fileSize}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {/* Hidden Audio Element for Logic */}
                    <audio 
                      id={`audio-${audio.id}`} 
                      src={audio.audioUrl} 
                      onEnded={() => setPlayingId(null)}
                      onError={() => console.log("Audio load error")}
                    />
                    
                    <button 
                      onClick={() => togglePlay(audio.id)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                        playingId === audio.id 
                          ? 'bg-red-100 text-[#a0291f]' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {playingId === audio.id ? (
                        <><PauseCircle className="h-4 w-4" /> Playing...</>
                      ) : (
                        <><PlayCircle className="h-4 w-4" /> Preview</>
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                      {audio.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      audio.status === 'Published' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {audio.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleDelete(audio)}
                        className="p-2 hover:bg-red-50 rounded-lg text-gray-500 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {!loading && filteredAudios.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Music className="h-12 w-12 mx-auto text-gray-300 mb-3" />
              <p>No audio files found.</p>
            </div>
          )}
        </div>
      </div>

      {/* --- Add Audio Modal --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="font-semibold text-gray-800">Upload New Audio</h3>
              <button 
                onClick={() => !isUploading && setIsModalOpen(false)} 
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              {uploadError && (
                <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg flex gap-2 items-center">
                  <AlertCircle size={16} /> {uploadError}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Audio Title</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#a0291f]" 
                  placeholder="Ex: Annual Summit Speech" 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#a0291f]"
                  >
                    <option value="Speeches">Speeches</option>
                    <option value="Podcasts">Podcasts</option>
                    <option value="Music">Music</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select 
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#a0291f]"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Audio File (Max 20MB)</label>
                <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors">
                  <input 
                    type="file" 
                    accept="audio/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">
                    {formData.file ? formData.file.name : "Drag & drop or click to browse"}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {formData.file ? `${(formData.file.size / (1024*1024)).toFixed(2)} MB` : "MP3, WAV up to 20MB"}
                  </p>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                disabled={isUploading}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                disabled={isUploading}
                className="px-4 py-2 text-sm text-white bg-[#a0291f] hover:bg-red-800 rounded-lg shadow-sm transition-colors flex items-center gap-2 disabled:bg-gray-400"
              >
                {isUploading && <Loader2 className="h-4 w-4 animate-spin" />}
                {isUploading ? 'Uploading...' : 'Save Audio'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AudioManagementPage;