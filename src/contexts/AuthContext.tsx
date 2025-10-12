"use client";
import {
  ReactNode,
  useContext,
  useState,
  createContext,
  useEffect,
} from "react";



export interface IAuthContext {
 
  logout: () => void;
}
const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const logout = () => { 

    }

  return (
    <AuthContext.Provider
      value={{
        logout      
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth can only be used in a AuthProvider");
  }
  return context;
};
