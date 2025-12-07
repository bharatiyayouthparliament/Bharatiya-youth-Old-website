// src/utils/api.js
import { db } from "@/firebase";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc
} from "firebase/firestore";



/* ============================================================
   BASE GENERIC CRUD API
============================================================ */
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
    }

});

/* ============================================================
   SAFE DATE PARSER
============================================================ */
const parseDate = (item) => {
    if (item.createdAt?.seconds) return item.createdAt.seconds * 1000;
    if (item.createdAt) return new Date(item.createdAt).getTime();
    if (item.created_at) return new Date(item.created_at).getTime();
    return 0;
};

/* ============================================================
   COLLEGE CODE GENERATOR (LOCAL COPY – collegeCode.js removed)
============================================================ */
const generateCollegeCode = (name, existingCodes = []) => {
    if (!name) return "";

    const short = name
        .toUpperCase()
        .replace(/[^A-Z]/g, "")
        .slice(0, 3); // first 3 letters only

    let num = 1;
    let code = `${short}-${String(num).padStart(3, "0")}`;

    while (existingCodes.includes(code)) {
        num++;
        code = `${short}-${String(num).padStart(3, "0")}`;
    }

    return code;
};


/* ============================================================
   CUSTOM API: COLLEGES (WITH AUTO CODE GENERATOR)
============================================================ */
const collegeApi = {
    ...createFirestoreApi("colleges", (a, b) => a.name.localeCompare(b.name)),

    create: async (newData) => {
        try {
            const snap = await getDocs(collection(db, "colleges"));
            const existingCodes = snap.docs.map(d => d.data().code);

            const newCode = generateCollegeCode(newData.name, existingCodes);

            const finalData = {
                ...newData,
                code: newCode,
                created_at: new Date().toISOString(),
            };

            const ref = await addDoc(collection(db, "colleges"), finalData);

            return { data: { id: ref.id, ...finalData }, error: null };

        } catch (err) {
            return { data: null, error: err.message };
        }
    }
};

/* ============================================================
   BLOG API (FIXED, CLEAN, SINGLE VERSION)
============================================================ */
const blogApi = {
    getAll: async () => {
        try {
            const snap = await getDocs(collection(db, "blogs"));
            let list = snap.docs.map(d => ({
                id: d.id,
                ...d.data()
            }));

            list.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

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
                published_date: new Date().toISOString(),
            };

            const ref = await addDoc(collection(db, "blogs"), finalData);
            return { data: { id: ref.id, ...finalData }, error: null };

        } catch (err) {
            return { data: null, error: err.message };
        }
    },

    update: async (id, updatedData) => {
        try {
            await updateDoc(doc(db, "blogs", id), updatedData);
            return { data: { id, ...updatedData }, error: null };
        } catch (err) {
            return { data: null, error: err.message };
        }
    },

    delete: async (id) => {
        try {
            await deleteDoc(doc(db, "blogs", id));
            return { data: { id }, error: null };
        } catch (err) {
            return { data: null, error: err.message };
        }
    }
};

/* ============================================================
   CUSTOM API: REGISTRATIONS (SORT BY SAFE DATE)
============================================================ */
const registrationsApi = {
    ...createFirestoreApi("registrations"),

    getAll: async () => {
        try {
            const snap = await getDocs(collection(db, "registrations"));
            let list = snap.docs.map(d => ({ id: d.id, ...d.data() }));

            list.sort((a, b) => parseDate(b) - parseDate(a));

            return { data: list, error: null };

        } catch (err) {
            return { data: [], error: err.message };
        }
    }
};

/* ============================================================
   EXPORT ALL APIs
============================================================ */
const apis = {
    blogs: blogApi,
    colleges: collegeApi,
    registrations: registrationsApi,

    speakers: createFirestoreApi("speakers", (a, b) => a.name.localeCompare(b.name)),
    media: createFirestoreApi("media", (a, b) => parseDate(b) - parseDate(a)),
    admins: createFirestoreApi("admins", (a, b) => a.username?.localeCompare(b.username)),
    contacts: createFirestoreApi("contacts", (a, b) => parseDate(b) - parseDate(a)),
};

export const getApi = (name) => apis[name];
