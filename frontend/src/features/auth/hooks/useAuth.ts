"use client";

import { useEffect, useState } from "react";
import type { AuthUser } from "@/features/auth/types";

export const AUTH_CHANGED_EVENT = "auth-changed";

function readStoredUser() {
  if (typeof window === "undefined") {
    return null;
  }

  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");

  if (!storedUser || !storedToken) {
    return null;
  }

  try {
    return JSON.parse(storedUser) as AuthUser;
  } catch {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    return null;
  }
}

export function notifyAuthChanged() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
  }
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const syncAuth = () => {
      setUser(readStoredUser());
      setIsLoading(false);
    };

    syncAuth();

    if (typeof window !== "undefined") {
      window.addEventListener("storage", syncAuth);
      window.addEventListener(AUTH_CHANGED_EVENT, syncAuth);

      return () => {
        window.removeEventListener("storage", syncAuth);
        window.removeEventListener(AUTH_CHANGED_EVENT, syncAuth);
      };
    }
  }, []);

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
    setUser(null);
    notifyAuthChanged();
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    isAdmin: user?.role === "ADMIN",
    logout,
  };
}
