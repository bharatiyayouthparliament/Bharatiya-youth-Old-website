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
   Configuration is loaded from environment variables
   Create a .env file in the root directory with your Firebase credentials
----------------------------------------------------------- */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Validate that all required environment variables are present
const hasValidConfig = firebaseConfig.apiKey && 
                       firebaseConfig.projectId && 
                       firebaseConfig.apiKey !== 'undefined' && 
                       firebaseConfig.projectId !== 'undefined';

if (!hasValidConfig) {
  console.warn(
    "⚠️ Firebase configuration is missing! The app will run in view-only mode.\n" +
    "To enable full functionality, create a .env file with your Firebase credentials.\n" +
    "See SETUP.md for detailed instructions."
  );
}

/* -----------------------------------------------------------
   INITIALIZE FIREBASE
   Only initialize if we have valid configuration
----------------------------------------------------------- */
let app, db, auth, storage;

if (hasValidConfig) {
  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
    storage = getStorage(app);
  } catch (error) {
    console.error("Firebase initialization error:", error);
    // Create mock objects to prevent crashes
    app = null;
    db = null;
    auth = null;
    storage = null;
  }
} else {
  // Create placeholder objects to prevent crashes when viewing design
  console.warn("Running without Firebase - UI will be visible but data operations will fail");
  app = null;
  db = null;
  auth = null;
  storage = null;
}

// EXPORT SERVICES (USED EVERYWHERE IN PROJECT)
export { db, auth, storage };

/* -----------------------------------------------------------
   GENERIC FIRESTORE CRUD (shared for non-blog collections)
----------------------------------------------------------- */
const createFirestoreApi = (collectionName, sortFn = null) => ({

  getAll: async () => {
    if (!db) {
      return { data: [], error: "Firebase not configured" };
    }
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
    if (!db) {
      return { data: null, error: "Firebase not configured" };
    }
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
    if (!db) {
      return { data: null, error: "Firebase not configured" };
    }
    try {
      await updateDoc(doc(db, collectionName, id), updatedData);
      return { data: { id, ...updatedData }, error: null };
    } catch (err) {
      return { data: null, error: err.message };
    }
  },

  delete: async (id) => {
    if (!db) {
      return { data: null, error: "Firebase not configured" };
    }
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
