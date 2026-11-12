import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import GoogleCallback from "./pages/GoogleCallback";
import PatronDashboard from "./pages/PatronDashboard";
import ArtisanDashboard from "./pages/ArtisanDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";

function FloatingThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      className="kincraft-floating-theme-toggle"
      onClick={toggleTheme}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <span className="material-symbols-outlined theme-icon">
        {isDark ? "light_mode" : "dark_mode"}
      </span>
      <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
    </button>
  );
}

function DashboardRedirect() {
  const { user, isAuthenticated, loading, getRoleDashboardPath } = useAuth();

  if (loading) {
    return null;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/auth" replace />;
  }

  return <Navigate to={getRoleDashboardPath(user.role)} replace />;
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <div className="App">
            <Routes>
              {/* Public Storefront & Auth */}
              <Route path="/" element={<Landing />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/login" element={<Auth />} />
              <Route path="/auth/google/callback" element={<GoogleCallback />} />

              {/* Central Auto-Routing Dashboard */}
              <Route path="/dashboard" element={<DashboardRedirect />} />

              {/* Role-Specific Dashboards */}
              <Route
                path="/dashboard/patron"
                element={
                  <ProtectedRoute allowedRoles={["Customer"]}>
                    <PatronDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/artisan"
                element={
                  <ProtectedRoute allowedRoles={["Artisan"]}>
                    <ArtisanDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/admin"
                element={
                  <ProtectedRoute allowedRoles={["Admin"]}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Fallback to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <FloatingThemeToggle />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
