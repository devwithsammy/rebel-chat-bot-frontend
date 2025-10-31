"use client";
import { authAPI } from "@src/lib/auth";
import { ACCESS_TOKEN_KEY, ACCESS_USER_KEY } from "@src/shared/constants";
import {
  ReactNode,
  useContext,
  useState,
  createContext,
  useEffect,
} from "react";

interface User {
  id: string;
  email: string;
  firstName: string;
  picture?: string;
  createdAt?: string;
  googleId?: string;
  updatedAt?: string;
}

export interface IAuthContext {
  user: User | null;
  loading: boolean;
  loginWithGoogle: () => void;
  logout: () => void;
  isAuthenticated: boolean;
}
const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    authAPI.logout();
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem(ACCESS_TOKEN_KEY);
      if (token) {
        const response = await authAPI.getProfile();
        setUser(response?.data);
      }
    } catch (err) {
    //   console.log("Auth check failed", err);
      if (process.env.NEXT_PUBLIC_ENV == "production") {
        localStorage.removeItem(ACCESS_TOKEN_KEY);

        localStorage.removeItem(ACCESS_USER_KEY);
      }
    } finally {
      setLoading(false);
    }
  };
  const loginWithGoogle = () => {
    authAPI.loginWithGoogle();
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginWithGoogle,
        logout,
        isAuthenticated: !!user,
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
