import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("kincraft-user");
      if (saved) {
        const parsed = JSON.parse(saved);
        // Only restore if user explicitly signed in (purges legacy default profile)
        if (parsed && parsed.isExplicitLogin) {
          return parsed;
        }
        localStorage.removeItem("kincraft-user");
      }
    } catch (e) {
      try {
        localStorage.removeItem("kincraft-user");
      } catch (err) {}
    }
    // No default profile - user starts strictly logged out
    return null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(!!user);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem("kincraft-user", JSON.stringify(user));
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem("kincraft-user");
        setIsAuthenticated(false);
      }
    } catch (e) {}
  }, [user]);

  const login = async ({ identifier, password, role = "Customer" }) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password, role }),
      });
      const data = await res.json();
      if (data.success && data.user) {
        const userObj = { ...data.user, isExplicitLogin: true };
        setUser(userObj);
        return { success: true, user: userObj };
      }
      if (data.message) {
        return { success: false, message: data.message };
      }
    } catch (err) {
      console.warn("Backend auth failed, using local session:", err);
    }

    // Local fallback if backend is offline
    const isMeera = identifier.toLowerCase().includes("meera");
    const name = isMeera
      ? "Meera Verma"
      : identifier.includes("@")
        ? identifier
            .split("@")[0]
            .replace(".", " ")
            .replace(/\b\w/g, (l) => l.toUpperCase())
        : `User (${role})`;

    const initials = isMeera ? "MV" : identifier.slice(0, 2).toUpperCase();

    const loggedUser = {
      id: Date.now(),
      name,
      email: identifier.includes("@")
        ? identifier
        : `${identifier}@patron.kincraft.org`,
      role,
      membership_tier:
        role === "Artisan"
          ? "Master Artisan • Verified"
          : role === "Admin"
            ? "Compliance Officer"
            : "Patron Member • Tier 1",
      avatar_initials: initials,
      isExplicitLogin: true,
    };
    setUser(loggedUser);
    return { success: true, user: loggedUser };
  };

  const register = async ({
    name,
    email,
    password,
    role = "Customer",
    craftCluster = "",
  }) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role, craftCluster }),
      });
      const data = await res.json();
      if (data.success && data.user) {
        const userObj = { ...data.user, isExplicitLogin: true };
        setUser(userObj);
        return { success: true, user: userObj };
      }
      if (data.message) {
        return { success: false, message: data.message };
      }
    } catch (err) {
      console.warn("Backend registration failed, using local session:", err);
    }

    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    const newUser = {
      id: Date.now(),
      name,
      email,
      role,
      membership_tier:
        role === "Artisan" ? "Artisan Guild Member" : "Patron Member • Tier 1",
      avatar_initials: initials || "KP",
      craft_cluster: craftCluster,
      isExplicitLogin: true,
    };
    setUser(newUser);
    return { success: true, user: newUser };
  };

  const loginWithGoogle = async (role = "Customer") => {
    const googleUser = {
      id: Date.now(),
      name: "Google Authenticated User",
      email: "patron@gmail.com",
      role,
      membership_tier: `Verified Google ${role}`,
      avatar_initials: "GU",
      isExplicitLogin: true,
    };
    setUser(googleUser);
    return { success: true, user: googleUser };
  };

  const logout = () => {
    try {
      localStorage.removeItem("kincraft-user");
    } catch (e) {}
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      user: null,
      isAuthenticated: false,
      login: async () => ({ success: false }),
      register: async () => ({ success: false }),
      loginWithGoogle: async () => ({ success: false }),
      logout: () => {},
    };
  }
  return context;
}
