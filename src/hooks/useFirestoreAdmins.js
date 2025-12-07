import { useState, useEffect } from "react";
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/firebase";

const useFirestoreAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  // ⭐ Realtime listener
  useEffect(() => {
    const q = query(collection(db, "admins"), orderBy("created_at", "desc"));

    const unsub = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      setAdmins(list);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  // ⭐ Create admin document in Firestore
  const createAdminDoc = async (uid, data) => {
    await setDoc(doc(db, "admins", uid), data);
  };

  // ⭐ Update admin document
  const updateAdmin = async (uid, data) => {
    await updateDoc(doc(db, "admins", uid), data);
  };

  // ⭐ Delete admin document
  const deleteAdmin = async (uid) => {
    await deleteDoc(doc(db, "admins", uid));
  };

  return {
    admins,
    loading,
    createAdminDoc,
    updateAdmin,
    deleteAdmin,
  };
};

export default useFirestoreAdmins;
