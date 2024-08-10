'use client';
import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, useEffect, useState, ReactNode } from "react";
import { auth } from "../FirebaseConfig/firebase";

interface AuthContextProps {
  user: User | null;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthContextProviderProps {
  children: ReactNode;
}

// Placeholder User object
const defaultUser = {} as User;

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(defaultUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};