// src/firebase.js

/* -----------------------------------------------------------
   IMPORTS
----------------------------------------------------------- */
import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc 
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

/* -----------------------------------------------------------
   FIREBASE CONFIG (UPDATED)
----------------------------------------------------------- */
const firebaseConfig = {
  apiKey: "...........................",
  authDomain: "...........................",
  projectId: "..........................................",
  storageBucket: "//................................",
  messagingSenderId: ".........................",
  appId: "..............................",
};

/* -----------------------------------------------------------
   INITIALIZE FIREBASE
----------------------------------------------------------- */
const app = initializeApp(firebaseConfig);

// EXPORT SERVICES (USED EVERYWHERE IN PROJECT)
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

/* -----------------------------------------------------------
   GENERIC FIRESTORE CRUD (shared for non-blog collections)
----------------------------------------------------------- */
const createFirestoreApi = (collectionName, sortFn = null) => ({

  getAll: async () => {
    try {
      const snap = await getDocs(collection(db, collectionName));
      let list = snap.docs.map(d => ({ id: d.id, ...d.data() }));

      if (sortFn) list.sort(sortFn);

      return { data: list, error: null };
    } catch (err) {
      return { data: [], error: err.message };
    }
  },

  create: async (newData) => {
    try {
      const finalData = {
        ...newData,
        created_at: new Date().toISOString(),
      };

      const ref = await addDoc(collection(db, collectionName), finalData);

      return { data: { id: ref.id, ...finalData }, error: null };
    } catch (err) {
      return { data: null, error: err.message };
    }
  },

  update: async (id, updatedData) => {
    try {
      await updateDoc(doc(db, collectionName, id), updatedData);
      return { data: { id, ...updatedData }, error: null };
    } catch (err) {
      return { data: null, error: err.message };
    }
  },

  delete: async (id) => {
    try {
      await deleteDoc(doc(db, collectionName, id));
      return { data: { id }, error: null };
    } catch (err) {
      return { data: null, error: err.message };
    }
  },

});

/* -----------------------------------------------------------
   COLLECTION-SPECIFIC APIs
----------------------------------------------------------- */
export const apis = {
  speakers: createFirestoreApi("speakers", (a, b) => a.name.localeCompare(b.name)),
  media: createFirestoreApi("media", (a, b) => new Date(b.created_at) - new Date(a.created_at)),
  colleges: createFirestoreApi("colleges", (a, b) => a.name.localeCompare(b.name)),
  registrations: createFirestoreApi("registrations", (a, b) => new Date(b.created_at) - new Date(a.created_at)),
  contacts: createFirestoreApi("contacts", (a, b) => new Date(b.created_at) - new Date(a.created_at)),
  admins: createFirestoreApi("admins", (a, b) => a.name.localeCompare(b.name)),
};

/* -----------------------------------------------------------
   Export Dynamic Loader (Except Blog)
----------------------------------------------------------- */
export const getApi = (name) => apis[name];

export default app;
