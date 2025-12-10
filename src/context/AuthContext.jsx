// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth, db } from "@/firebase";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  /* ---------------------- LOGIN ----------------------- */
  const login = async (usernameOrEmail, password) => {
    if (!auth || !db) {
      return { success: false, message: "Firebase is not configured. Please contact the administrator." };
    }

    try {
      const credential = await signInWithEmailAndPassword(auth, usernameOrEmail, password);

      const adminRef = doc(db, "admins", credential.user.uid);
      const adminSnap = await getDoc(adminRef);

      if (!adminSnap.exists()) {
        await signOut(auth);
        return { success: false, message: "You are not an admin." };
      }

      const admin = adminSnap.data();

      const userObj = {
        uid: credential.user.uid,
        email: credential.user.email,
        role: admin.role,
        name: admin.name,
      };

      setUser(userObj);
      localStorage.setItem("byp_auth_user", JSON.stringify(userObj));

      const redirectTo = location.state?.from?.pathname || "/admin/dashboard";
      navigate(redirectTo);

      return { success: true };

    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  /* ---------------------- LOGOUT ----------------------- */
  const logout = async () => {
    if (auth) {
      try {
        await signOut(auth);
      } catch (error) {
        console.warn("Logout error:", error);
      }
    }
    localStorage.removeItem("byp_auth_user");
    setUser(null);
    navigate("/admin/login");
  };

  /* ------------------ AUTH RESTORE --------------------- */
  useEffect(() => {
    // If Firebase is not configured, skip auth state listener
    if (!auth || !db) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {

      if (!firebaseUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const adminRef = doc(db, "admins", firebaseUser.uid);
        const adminSnap = await getDoc(adminRef);

        if (!adminSnap.exists()) {
          setUser(null);
          setLoading(false);
          return;
        }

        const admin = adminSnap.data();

        const userObj = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          role: admin.role,
          name: admin.name,
        };

        setUser(userObj);
        localStorage.setItem("byp_auth_user", JSON.stringify(userObj));

        setLoading(false);
      } catch (error) {
        console.warn("Auth state check failed:", error);
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
