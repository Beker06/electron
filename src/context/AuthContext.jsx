import { useContext, createContext, useState, useEffect } from "react";
import {
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, authG } from "../Firebase/config";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [dbuser, setDbuser] = useState({});
  const [loading, setLoading] = useState(false)

  const logOut = () => {
    signOut(authG);
  };

  const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authG, (currentUser) => {
      setUser(currentUser);
      console.log("User", currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        setDbuser,
        logOut,
        user,
        forgotPassword,
        dbuser,
        setLoading,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};