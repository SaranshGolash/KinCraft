import React from "react";
import { Navigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import KinCraftLogo from "./KinCraftLogo";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, isAuthenticated, loading, getRoleDashboardPath } = useAuth();
  const { isDark } = useTheme();
  const location = useLocation();

  if (loading) {
    return (
      <div
        className={`min-h-screen flex flex-col items-center justify-center p-6 ${
          isDark ? "bg-[#131E18] text-[#F7F3EB]" : "bg-[#F7F2E8] text-[#2C2B27]"
        }`}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-[#2F4F3E] border-t-[#D9A441] rounded-full animate-spin"></div>
          <p className="font-heading text-lg font-medium text-[#2F4F3E] dark:text-[#7EB09B]">
            Verifying Artisan Credentials &amp; Session...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    const userDashboard = getRoleDashboardPath(user.role);
    return (
      <div
        className={`min-h-screen flex flex-col items-center justify-center p-6 ${
          isDark ? "bg-[#131E18] text-[#F7F3EB]" : "bg-[#F7F2E8] text-[#2C2B27]"
        }`}
      >
        <div
          className={`max-w-md w-full p-8 rounded-2xl shadow-xl border text-center ${
            isDark
              ? "bg-[#1A2820] border-[#293E32]"
              : "bg-[#FFFDF9] border-[#E5DED2]"
          }`}
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#A65A45]/10 flex items-center justify-center text-[#A65A45]">
            <span className="material-symbols-outlined text-3xl">lock_person</span>
          </div>
          <h2 className="font-heading text-2xl font-bold mb-2 text-[#2F4F3E] dark:text-[#7EB09B]">
            Role Restricted Portal
          </h2>
          <p className="text-sm opacity-80 mb-6 leading-relaxed">
            You are currently signed in as a{" "}
            <strong className="text-[#A65A45] font-semibold">{user.role}</strong> (
            {user.name}). This dashboard requires{" "}
            <strong>{allowedRoles.join(" or ")}</strong> privileges.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to={userDashboard}
              className="flex-1 py-2.5 px-4 rounded-lg bg-[#2F4F3E] hover:bg-[#20382E] text-white font-medium text-sm transition-colors"
            >
              Go to My {user.role} Dashboard
            </Link>
            <Link
              to="/auth"
              className="flex-1 py-2.5 px-4 rounded-lg border border-[#A65A45] text-[#A65A45] hover:bg-[#A65A45]/10 font-medium text-sm transition-colors"
            >
              Switch Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return children;
}

