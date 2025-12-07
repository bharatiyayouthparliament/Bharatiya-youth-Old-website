import React, { useState, useEffect } from "react";
import {
  Banknote,
  Search,
  Mail,
  Trash2,
  Eye,
  Calendar,
  User,
  FileText,
  Loader2
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";

// FIREBASE
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase"; // Adjust path if needed

const DonorDetails = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDonor, setSelectedDonor] = useState(null);

  // --- Real-time Fetch ---
  useEffect(() => {
    // We created a collection "donations" in the backend code
    const q = query(collection(db, "donations"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setDonors(data);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching donors:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // --- Delete Handler ---
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this donor record?")) {
      try {
        await deleteDoc(doc(db, "donations", id));
        if (selectedDonor?.id === id) setSelectedDonor(null);
      } catch (error) {
        console.error("Error deleting donor:", error);
        alert("Failed to delete record.");
      }
    }
  };

  const handleMail = (email) => {
    window.location.href = `mailto:${email}`;
  };

  const filteredDonors = donors.filter(
    (donor) =>
      donor.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (donor.pan && donor.pan.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalDonation = filteredDonors.reduce(
    (sum, donor) => sum + (Number(donor.amountDonated) || 0),
    0
  );

  return (
    <AdminLayout>
      {/* PAGE HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-100 rounded-lg text-[#a0291f]">
            <Banknote className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Donor Management</h1>
            <p className="text-sm text-gray-500">Track donations and donor details</p>
          </div>
        </div>

        <div className="bg-white px-6 py-3 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs text-gray-500 uppercase font-semibold">Total Collected</p>
            <p className="text-2xl font-bold text-green-600">
              ₹{totalDonation.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, or PAN..."
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
             <Loader2 className="h-6 w-6 animate-spin" /> Loading records...
           </div>
        ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Donor Name</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Donation Amount</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">City / State</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Date</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredDonors.map((donor) => (
                <tr key={donor.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-red-50 flex items-center justify-center text-[#a0291f] font-bold text-sm uppercase">
                        {donor.fullName.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">{donor.fullName}</span>
                        <span className="text-xs text-gray-500">{donor.email}</span>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-green-50 text-green-700 border border-green-100">
                      ₹ {Number(donor.amountDonated).toLocaleString()}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">{donor.city}, {donor.state}</div>
                    <div className="text-xs text-gray-400">PIN: {donor.pinCode}</div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      {donor.createdAt?.toDate ? donor.createdAt.toDate().toLocaleDateString() : 'N/A'}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => handleMail(donor.email)} className="p-2 hover:bg-blue-50 rounded-lg text-gray-500 hover:text-blue-600">
                        <Mail className="h-4 w-4" />
                      </button>
                      <button onClick={() => setSelectedDonor(donor)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-800">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete(donor.id)} className="p-2 hover:bg-red-50 rounded-lg text-gray-500 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredDonors.length === 0 && (
            <div className="text-center py-12 text-gray-500">
               <Banknote className="h-12 w-12 mx-auto text-gray-300 mb-3" />
               <p>No donation records found.</p>
            </div>
          )}
        </div>
        )}
      </div>

      {/* MODAL */}
      {selectedDonor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50 sticky top-0">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-[#a0291f] font-bold uppercase">
                  {selectedDonor.fullName.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{selectedDonor.fullName}</h3>
                  <p className="text-xs text-gray-500">Donation ID: {selectedDonor.donationId}</p>
                </div>
              </div>
              <button onClick={() => setSelectedDonor(null)} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2 text-gray-700">
                  <User className="h-4 w-4 text-gray-500" /> Personal Details
                </h4>
                <div className="space-y-1 text-sm text-gray-600">
                    <p><strong className="text-gray-800">Name:</strong> {selectedDonor.fullName}</p>
                    <p><strong className="text-gray-800">Email:</strong> {selectedDonor.email}</p>
                    <p><strong className="text-gray-800">Mobile:</strong> {selectedDonor.mobile}</p>
                    <p><strong className="text-gray-800">DOB:</strong> {selectedDonor.dob}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2 text-gray-700">
                  <FileText className="h-4 w-4 text-gray-500" /> Documents & Address
                </h4>
                <div className="space-y-1 text-sm text-gray-600">
                    <p><strong className="text-gray-800">PAN:</strong> {selectedDonor.pan}</p>
                    <p><strong className="text-gray-800">Aadhaar:</strong> {selectedDonor.aadhaar}</p>
                    <p><strong className="text-gray-800">Address:</strong> {selectedDonor.address}</p>
                    <p>{selectedDonor.city}, {selectedDonor.state} - {selectedDonor.pinCode}</p>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t bg-gray-50 flex justify-end">
              <button onClick={() => setSelectedDonor(null)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-lg">Close</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default DonorDetails;