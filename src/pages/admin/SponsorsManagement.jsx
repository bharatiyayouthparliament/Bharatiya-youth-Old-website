import React, { useState, useEffect } from "react";
import {
  HeartHandshake,
  Search,
  Mail,
  Trash2,
  Eye,
  MapPin,
  Building2,
  Phone,
  Loader2
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";

// FIREBASE
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase"; // Adjust path if needed

const SponsorsManagement = () => {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSponsor, setSelectedSponsor] = useState(null);

  // --- Real-time Fetch ---
  useEffect(() => {
    const q = query(collection(db, "sponsors"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSponsors(data);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching sponsors:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // --- Delete Handler ---
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this sponsorship enquiry?")) {
      try {
        await deleteDoc(doc(db, "sponsors", id));
        if (selectedSponsor?.id === id) setSelectedSponsor(null);
      } catch (error) {
        console.error("Error deleting sponsor:", error);
        alert("Failed to delete record.");
      }
    }
  };

  const handleMail = (email) => {
    window.location.href = `mailto:${email}`;
  };

  const getBadgeColor = (type) => {
    switch (type) {
      case "gold": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "silver": return "bg-gray-100 text-gray-700 border-gray-200";
      case "bronze": return "bg-orange-100 text-orange-800 border-orange-200";
      case "partner": return "bg-blue-100 text-blue-800 border-blue-200";
      default: return "bg-gray-50 text-gray-600";
    }
  };

  const filteredSponsors = sponsors.filter(
    (s) =>
      s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.organization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      {/* PAGE HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-100 rounded-lg text-[#a0291f]">
            <HeartHandshake className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Sponsorship Enquiries</h1>
            <p className="text-sm text-gray-500">Manage partnership requests and sponsors</p>
          </div>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or organization..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a0291f]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
           <div className="p-12 flex justify-center items-center text-gray-500 gap-2">
             <Loader2 className="h-6 w-6 animate-spin" /> Loading data...
           </div>
        ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Sponsor Details</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Organization</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Type</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Location</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredSponsors.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">{s.fullName}</span>
                      <div className="flex flex-col text-xs text-gray-500 mt-1 gap-0.5">
                        <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{s.email}</span>
                        <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{s.mobile}</span>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-700">{s.organization}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold uppercase border ${getBadgeColor(s.type)}`}>
                      {s.type}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600 flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      {s.city}, {s.state}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => handleMail(s.email)} className="p-2 hover:bg-blue-50 rounded-lg text-gray-500 hover:text-blue-600">
                        <Mail className="h-4 w-4" />
                      </button>
                      <button onClick={() => setSelectedSponsor(s)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-800">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete(s.id)} className="p-2 hover:bg-red-50 rounded-lg text-gray-500 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredSponsors.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <HeartHandshake className="h-12 w-12 mx-auto text-gray-300 mb-3" />
              <p>No sponsorship enquiries found.</p>
            </div>
          )}
        </div>
        )}
      </div>

      {/* MODAL */}
      {selectedSponsor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
              <div>
                <h3 className="font-semibold text-gray-800">Sponsorship Details</h3>
                <p className="text-xs text-gray-500">
                   Received on: {selectedSponsor.createdAt?.toDate ? selectedSponsor.createdAt.toDate().toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <button
                onClick={() => setSelectedSponsor(null)}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* TOP CARD */}
              <div className="flex gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center text-[#a0291f] font-bold text-xl shrink-0">
                  {selectedSponsor.fullName.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h4 className="font-bold text-gray-900">{selectedSponsor.fullName}</h4>
                  <p className="text-sm text-gray-600">{selectedSponsor.organization}</p>

                  <span className={`inline-flex mt-2 px-2 py-0.5 rounded text-xs font-semibold uppercase ${getBadgeColor(selectedSponsor.type)}`}>
                    {selectedSponsor.type} Sponsor
                  </span>
                </div>
              </div>

              {/* CONTACT GRID */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Email</p>
                  <p className="font-medium text-gray-800 break-all">{selectedSponsor.email}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Phone</p>
                  <p className="font-medium text-gray-800">{selectedSponsor.mobile}</p>
                </div>
              </div>

              {/* ADDRESS */}
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Address</p>
                <p className="font-medium mt-1 text-gray-800">{selectedSponsor.address}</p>
                <p className="text-gray-600">
                  {selectedSponsor.city}, {selectedSponsor.state} - {selectedSponsor.pinCode}
                </p>
              </div>

              {/* MESSAGE */}
              {selectedSponsor.message && (
                <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Message</p>
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 text-sm italic text-gray-700">
                    "{selectedSponsor.message}"
                    </div>
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t flex justify-end gap-3 bg-gray-50">
              <button
                onClick={() => setSelectedSponsor(null)}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Close
              </button>

              <button
                onClick={() => handleMail(selectedSponsor.email)}
                className="px-4 py-2 text-sm text-white bg-[#a0291f] hover:bg-red-800 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Mail className="h-4 w-4" />
                Reply via Email
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default SponsorsManagement;