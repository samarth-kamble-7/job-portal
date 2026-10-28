"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  UserResponse,
  Role,
  CompanyResponse,
  AuthResponse,
} from "@/types/auth";
import { apiClient } from "@/lib/api";

interface AuthContextType {
  user: UserResponse | null;
  role: Role | null;
  company: CompanyResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  verifyOtp: (email: string, otp: string) => Promise<void>;
  sendOtp: (email: string) => Promise<void>;
  saveAuthSession: (authData: AuthResponse) => void;
  markEmailVerified: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const saveAuthSession = useCallback((authData: AuthResponse) => {
    localStorage.setItem("job_portal_access_token", authData.accessToken);
    localStorage.setItem("job_portal_refresh_token", authData.refreshToken);
    setUser(authData.user);
  }, []);

  const logout = useCallback(async () => {
    const refreshToken = localStorage.getItem("job_portal_refresh_token");
    try {
      if (refreshToken) {
        await apiClient("/auth/logout", {
          method: "POST",
          body: JSON.stringify({ refreshToken }),
        });
      }
    } catch {
      // Ignore network errors on logout
    } finally {
      localStorage.removeItem("job_portal_access_token");
      localStorage.removeItem("job_portal_refresh_token");
      setUser(null);
    }
  }, []);

  const fetchCurrentUser = useCallback(async () => {
    const token = localStorage.getItem("job_portal_access_token");
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await apiClient<UserResponse>("/auth/me");
      if (response.data) {
        setUser(response.data);
      }
    } catch {
      // Token expired or invalid
      localStorage.removeItem("job_portal_access_token");
      localStorage.removeItem("job_portal_refresh_token");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  const login = async (
    email: string,
    password: string,
  ): Promise<AuthResponse> => {
    const response = await apiClient<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (!response.data) {
      throw new Error("Invalid response from server");
    }

    saveAuthSession(response.data);
    return response.data;
  };

  const sendOtp = async (email: string): Promise<void> => {
    await apiClient("/auth/otp/send", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  };

  const verifyOtp = async (email: string, otp: string): Promise<void> => {
    await apiClient("/auth/otp/verify", {
      method: "POST",
      body: JSON.stringify({ email, otp }),
    });

    if (user) {
      setUser({ ...user, emailVerified: true });
    }
  };

  const markEmailVerified = () => {
    if (user) {
      setUser({ ...user, emailVerified: true });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || null,
        company: user?.company || null,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        verifyOtp,
        sendOtp,
        saveAuthSession,
        markEmailVerified,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
