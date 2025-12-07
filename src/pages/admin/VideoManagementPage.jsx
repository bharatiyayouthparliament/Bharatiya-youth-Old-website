import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  Clapperboard, 
  Plus, 
  Search, 
  Trash2, 
  Edit, 
  ExternalLink,
  Youtube,
  Calendar,
  CheckCircle2,
  Loader2
} from 'lucide-react';

// FIREBASE IMPORTS
import { 
  collection, 
  addDoc, 
  deleteDoc, 
  updateDoc, 
  doc, 
  query, 
  orderBy, 
  onSnapshot 
} from 'firebase/firestore';

// --- FIXED IMPORT PATH ---
import { db } from "../../firebase"; 

const VideoManagementPage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal & Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null); // Track which ID is being edited

  const initialFormState = {
    title: '',
    description: '',
    youtubeUrl: '',
    publishDate: new Date().toISOString().split('T')[0],
    status: 'Published'
  };

  const [formData, setFormData] = useState(initialFormState);

  // --- 1. Real-Time Fetch (onSnapshot) ---
  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, "videos"), orderBy("publishDate", "desc"));

    // onSnapshot sets up a real-time listener. 
    // It automatically updates 'videos' state whenever Firestore changes.
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const videoList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setVideos(videoList);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching videos:", error);
      setLoading(false);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  // --- Helper: Extract YouTube ID ---
  const getYoutubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const getThumbnail = (url) => {
    const id = getYoutubeId(url);
    return id ? `https://img.youtube.com/vi/${id}/mqdefault.jpg` : "https://placehold.co/320x180/e2e8f0/a0291f?text=No+Video";
  };

  // --- Handlers ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Open Modal for Create
  const openCreateModal = () => {
    setEditingId(null);
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const handleEdit = (video) => {
    setEditingId(video.id);
    setFormData({
      title: video.title,
      description: video.description,
      youtubeUrl: video.youtubeUrl,
      publishDate: video.publishDate,
      status: video.status
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if(window.confirm("Are you sure you want to delete this video? This cannot be undone.")) {
      try {
        await deleteDoc(doc(db, "videos", id));
        // No need to update local state manually; onSnapshot handles it.
      } catch (error) {
        console.error("Error deleting video:", error);
        alert("Failed to delete video.");
      }
    }
  };

  const handleSave = async () => {
    if(!formData.title || !formData.youtubeUrl) {
      alert("Please fill in required fields");
      return;
    }

    if(!getYoutubeId(formData.youtubeUrl)){
        alert("Please enter a valid YouTube URL");
        return;
    }

    setIsSubmitting(true);

    try {
      if (editingId) {
        // --- UPDATE EXISTING VIDEO ---
        const videoRef = doc(db, "videos", editingId);
        await updateDoc(videoRef, {
          title: formData.title,
          description: formData.description,
          youtubeUrl: formData.youtubeUrl,
          publishDate: formData.publishDate,
          status: formData.status,
          updatedAt: new Date()
        });
      } else {
        // --- CREATE NEW VIDEO ---
        await addDoc(collection(db, "videos"), {
          title: formData.title,
          description: formData.description,
          youtubeUrl: formData.youtubeUrl,
          publishDate: formData.publishDate,
          status: formData.status,
          createdAt: new Date()
        });
      }

      // Close modal and reset form
      setIsModalOpen(false);
      setFormData(initialFormState);
      setEditingId(null);

    } catch (error) {
      console.error("Error saving video:", error);
      alert("Failed to save video.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter Logic
  const filteredVideos = videos.filter(video => 
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      {/* --- Page Header --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-100 rounded-lg text-[#a0291f]">
            <Clapperboard className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Video Management</h1>
            <p className="text-sm text-gray-500">Curate YouTube videos and media spots</p>
          </div>
        </div>
        <button 
          onClick={openCreateModal}
          className="bg-[#a0291f] hover:bg-red-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus className="h-4 w-4" />
          Add New Video
        </button>
      </div>

      {/* --- Search Bar --- */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search videos by title..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-[#a0291f] transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* --- Video Grid/Table --- */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
           <div className="p-12 flex justify-center items-center text-gray-500 gap-2">
             <Loader2 className="h-6 w-6 animate-spin" /> Loading videos...
           </div>
        ) : (
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase w-48">Thumbnail</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Video Details</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Publish Date</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredVideos.map((video) => (
              <tr key={video.id} className="hover:bg-gray-50 transition-colors">
                {/* Thumbnail Preview */}
                <td className="px-6 py-4">
                  <div className="relative w-32 h-20 bg-gray-200 rounded-lg overflow-hidden border border-gray-200 group cursor-pointer">
                    <img 
                      src={getThumbnail(video.youtubeUrl)} 
                      alt="Thumbnail" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Youtube className="h-8 w-8 text-white drop-shadow-lg" />
                    </div>
                  </div>
                </td>

                {/* Details */}
                <td className="px-6 py-4 max-w-md">
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-gray-900 line-clamp-1">{video.title}</span>
                    <p className="text-xs text-gray-500 line-clamp-2">{video.description}</p>
                    <a 
                      href={video.youtubeUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 mt-1 w-fit"
                    >
                      Watch on YouTube <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </td>

                {/* Date */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    {video.publishDate}
                  </div>
                </td>

                {/* Status */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    video.status === 'Published' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {video.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {/* EDIT BUTTON */}
                    <button 
                      onClick={() => handleEdit(video)}
                      className="p-2 hover:bg-blue-50 rounded-lg text-gray-500 hover:text-blue-600 transition-colors"
                      title="Edit Video"
                    >
                      <Edit className="h-4 w-4" />
                    </button>

                    {/* DELETE BUTTON */}
                    <button 
                      onClick={() => handleDelete(video.id)}
                      className="p-2 hover:bg-red-50 rounded-lg text-gray-500 hover:text-red-600 transition-colors"
                      title="Delete Video"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        )}
        
        {!loading && filteredVideos.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Youtube className="h-12 w-12 mx-auto text-gray-300 mb-3" />
            <p>No videos found. Click "Add New Video" to start.</p>
          </div>
        )}
      </div>

      {/* --- Add/Edit Video Modal --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <Youtube className="h-5 w-5 text-red-600" />
                {editingId ? 'Edit Video' : 'Add New Video'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">×</button>
            </div>
            
            <div className="p-6 space-y-4">
              {/* Title Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Video Title</label>
                <input 
                  type="text" 
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#a0291f]" 
                  placeholder="Ex: Summit 2024 Highlights" 
                />
              </div>
              
              {/* YouTube Link Input with Preview Logic */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">YouTube Link</label>
                <div className="relative">
                  <input 
                    type="text" 
                    name="youtubeUrl"
                    value={formData.youtubeUrl}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#a0291f]" 
                    placeholder="https://youtube.com/watch?v=..." 
                  />
                  <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                {formData.youtubeUrl && (
                    <div className="mt-2 text-xs flex items-center gap-2">
                      {getYoutubeId(formData.youtubeUrl) ? (
                        <span className="text-green-600 flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" /> Valid Link Detected
                        </span>
                      ) : (
                        <span className="text-red-500">Invalid YouTube URL</span>
                      )}
                    </div>
                )}
              </div>

              {/* Description Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#a0291f]" 
                  placeholder="Short description of the video content..." 
                />
              </div>

              {/* Auto-Fetched Date & Status */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Publish Date</label>
                  <div className="relative">
                    <input 
                      type="date" 
                      name="publishDate"
                      value={formData.publishDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-600 focus:outline-none cursor-not-allowed"
                      readOnly 
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">(Auto)</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select 
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#a0291f]"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                disabled={isSubmitting}
                className="px-4 py-2 text-sm text-white bg-[#a0291f] hover:bg-red-800 rounded-lg shadow-sm transition-colors flex items-center gap-2"
              >
                {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {editingId ? 'Update Video' : 'Save Video'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default VideoManagementPage;