import React, { createContext, useContext, useState, useEffect } from "react";
import { buildRootApiUrl } from "../utils/urlConstructer";
import { UserAuth } from "../api/api";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    // Initialize from localStorage or default to false
    const storedStatus = localStorage.getItem("isLoggedIn");
    return storedStatus === "true";
  });

  const navigate = useNavigate();
  // Functions to update the state
  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const logout = async () => {
    try {
      const url = buildRootApiUrl(UserAuth.Logout);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies or authentication token
      });

      if (!response.ok) {
        console.error("Failed to log out");
        return;
      }

      console.log("Logout successful");
      setIsLoggedIn(false); // Update state in context
      localStorage.setItem("isLoggedIn", "false");
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    // Sync state with localStorage when the component mounts
    const storedStatus = localStorage.getItem("isLoggedIn");
    if (storedStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
