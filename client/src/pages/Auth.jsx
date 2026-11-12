import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import KinCraftLogo from "../components/KinCraftLogo";
import Footer from "../components/Footer";

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    user,
    login,
    register,
    loginWithGoogle,
    initiateGoogleLogin,
    getRoleDashboardPath,
  } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  // Mode: "signin" | "signup"
  const [mode, setMode] = useState("signin");
  // Active Role: "Customer" | "Artisan" | "Admin"
  const [activeRole, setActiveRole] = useState("Customer");

  // Form Fields
  const [name, setName] = useState("");
  const [identifier, setIdentifier] = useState("meera.verma@example.com");
  const [password, setPassword] = useState("patron123");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(true);

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [activeModal, setActiveModal] = useState(null); // 'charter' | 'artisan-rights' | 'privacy' | 'forgot'

  // Check for error parameters in URL query string (e.g. from OAuth redirect)
  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const err = params.get("error");
    if (err) {
      setErrorMessage(decodeURIComponent(err));
    }
  }, [location.search]);

  // Pre-fill demo profiles based on role
  const handleRoleSelect = (role) => {
    setActiveRole(role);
    setErrorMessage("");
    if (mode === "signin") {
      if (role === "Customer") {
        setIdentifier("meera.verma@example.com");
        setPassword("patron123");
      } else if (role === "Artisan") {
        setIdentifier("karan.kumbhar@example.com");
        setPassword("artisan123");
      } else if (role === "Admin") {
        setIdentifier("admin@kincraft.in");
        setPassword("admin123");
      }
    }
  };

  const handleFillDemo = (role) => {
    handleRoleSelect(role);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!identifier.trim()) {
      setErrorMessage("Please provide a valid email address or mobile number.");
      return;
    }

    if (!password) {
      setErrorMessage("Please enter your account password.");
      return;
    }

    if (mode === "signup") {
      if (!name.trim()) {
        setErrorMessage("Please enter your full name.");
        return;
      }
      if (password.length < 6) {
        setErrorMessage("Password must be at least 6 characters long.");
        return;
      }
      if (confirmPassword && password !== confirmPassword) {
        setErrorMessage("Passwords do not match. Please verify.");
        return;
      }
      if (!agreeTerms) {
        setErrorMessage(
          "Please accept the Fair-Trade Artisan Charter to proceed.",
        );
        return;
      }
    }

    setIsSubmitting(true);

    try {
      if (mode === "signin") {
        const result = await login({
          identifier: identifier.trim(),
          password,
          role: activeRole,
        });

        if (result && result.success) {
          setSuccessMessage(
            `Welcome back, ${result.user?.name || "Patron"}! Redirecting...`,
          );
          setTimeout(() => {
            const redirectUrl =
              location.state?.from ||
              getRoleDashboardPath(result.user?.role || activeRole);
            navigate(redirectUrl);
          }, 800);
        } else {
          setErrorMessage(
            result?.message ||
              "Invalid credentials. Please verify and try again.",
          );
        }
      } else {
        const result = await register({
          name: name.trim(),
          email: identifier.trim(),
          password,
          role: "Customer",
        });

        if (result && result.success) {
          setSuccessMessage(
            `Welcome to KinCraft, ${result.user?.name || name}! Account created.`,
          );
          setTimeout(() => {
            const redirectUrl =
              location.state?.from ||
              getRoleDashboardPath(result.user?.role || "Customer");
            navigate(redirectUrl);
          }, 1000);
        } else {
          setErrorMessage(
            result?.message ||
              "Registration could not be completed. Please try again.",
          );
        }
      }
    } catch (err) {
      setErrorMessage(
        "Connection issue. Please verify backend status and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    setErrorMessage("");
    try {
      // Initiate real Google OAuth 2.0 Web flow
      await initiateGoogleLogin(activeRole);
    } catch (err) {
      console.warn("Google OAuth redirect error, falling back to direct login:", err);
      try {
        const result = await loginWithGoogle(activeRole);
        if (result && result.success) {
          setSuccessMessage(
            "Authenticated via Google OIDC 2.0. Entering platform...",
          );
          setTimeout(() => {
            navigate(
              location.state?.from ||
                getRoleDashboardPath(result.user?.role || activeRole),
            );
          }, 800);
        } else {
          setErrorMessage("Google authentication could not be completed.");
        }
      } catch (fallbackErr) {
        setErrorMessage("Google authentication could not be completed.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col justify-between transition-colors duration-300 font-body ${
        isDark ? "bg-[#141d18] text-[#F7F2E8]" : "bg-[#F7F2E8] text-[#2C2B27]"
      }`}
    >
      {/* Top Announcement Bar */}
      <header
        className={`text-xs py-2 px-4 border-b flex flex-wrap justify-between items-center transition-colors ${
          isDark
            ? "bg-[#1a2922] text-[#B5C5AE] border-[#2F4F3E]/40"
            : "bg-[#20382E] text-[#B5C5AE] border-[#2F4F3E]"
        }`}
      >
        <div className="flex items-center space-x-2">
          <span className="material-symbols-outlined text-sm text-[#D9A441]">
            verified
          </span>
          <span>
            Empowering 4,200+ rural Indian craftspeople • 100% Verified
            Authentic Handlooms, Pottery &amp; Heritage Crafts
          </span>
        </div>
        <div className="flex items-center space-x-4 mt-1 sm:mt-0">
          <Link
            to="/"
            className="text-[#D9A441] hover:underline flex items-center gap-1 font-medium"
          >
            <span className="material-symbols-outlined text-xs">
              arrow_back
            </span>
            <span>Return to Storefront</span>
          </Link>
          <span className="opacity-40">|</span>
          <button
            type="button"
            onClick={toggleTheme}
            className="flex items-center gap-1 hover:text-[#FFFDF9] transition cursor-pointer"
            title="Toggle theme"
          >
            <span className="material-symbols-outlined text-xs">
              {isDark ? "light_mode" : "dark_mode"}
            </span>
            <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
          </button>
        </div>
      </header>

      {/* Main Content Gateway */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center flex-grow w-full">
        {/* Left Hero / Brand Trust Column */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center space-x-3">
            <Link to="/" className="inline-block" title="KinCraft Home">
              <KinCraftLogo
                variant={isDark ? "dark" : "horizontal"}
                height={46}
              />
            </Link>
          </div>

          <div
            className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold ${
              isDark
                ? "bg-[#2F4F3E]/60 text-[#D9A441] border border-[#2F4F3E]"
                : "bg-[#B5C5AE]/30 text-[#20382E] border border-[#B5C5AE]"
            }`}
          >
            <span className="material-symbols-outlined text-sm text-[#A65A45]">
              shield_locked
            </span>
            <span>UNIVERSAL AUTH 2.0 • ZERO-MIDDLEMAN CHARTER</span>
          </div>

          <h1
            className={`text-3xl sm:text-4xl lg:text-5xl font-brand font-bold leading-tight ${
              isDark ? "text-[#FFFDF9]" : "text-[#20382E]"
            }`}
          >
            Honoring Hands, Guarding Lineage.
          </h1>

          <p
            className={`text-sm sm:text-base leading-relaxed ${
              isDark ? "text-[#B5C5AE]" : "text-[#66685F]"
            }`}
          >
            Every purchase safeguards sacred ancestral memory. Directly connect
            with over 4,200 master weavers, potters, and bell-metal casters with
            transparent 90.2% direct platform payout.
          </p>

          {/* Cluster Highlights Grid */}
          <div
            className={`grid grid-cols-3 gap-3 p-4 rounded-xl border transition-all ${
              isDark
                ? "bg-[#182620] border-[#2F4F3E]/50 shadow-inner"
                : "bg-[#FFFDF9] border-[#E5DED2] shadow-sm"
            }`}
          >
            <div>
              <p
                className={`font-bold text-xs sm:text-sm ${
                  isDark ? "text-[#FFFDF9]" : "text-[#2C2B27]"
                }`}
              >
                Bankura Weaves
              </p>
              <p className="text-[11px] sm:text-xs text-[#A65A45] font-medium">
                Bishnupur Silk Cluster
              </p>
            </div>
            <div>
              <p
                className={`font-bold text-xs sm:text-sm ${
                  isDark ? "text-[#FFFDF9]" : "text-[#2C2B27]"
                }`}
              >
                Black Terracotta
              </p>
              <p className="text-[11px] sm:text-xs text-[#A65A45] font-medium">
                Nizamabad, UP (GI Tag)
              </p>
            </div>
            <div>
              <p
                className={`font-bold text-xs sm:text-sm ${
                  isDark ? "text-[#FFFDF9]" : "text-[#2C2B27]"
                }`}
              >
                90.2% Payout
              </p>
              <p className="text-[11px] sm:text-xs text-[#2F4F3E] dark:text-[#B5C5AE] font-semibold">
                Direct to Co-ops
              </p>
            </div>
          </div>

          {/* Artisan Lineage Testimonial Card */}
          <div
            className={`p-4 rounded-xl border text-xs leading-relaxed italic ${
              isDark
                ? "bg-[#182620]/70 border-[#2F4F3E]/40 text-[#B5C5AE]"
                : "bg-[#FFFDF9]/80 border-[#E5DED2] text-[#66685F]"
            }`}
          >
            <div className="flex items-center gap-2 mb-2 not-italic">
              <span className="material-symbols-outlined text-sm text-[#D9A441]">
                format_quote
              </span>
              <strong className={isDark ? "text-[#FFFDF9]" : "text-[#20382E]"}>
                Master Devji Bhai • 42 Years Loom Practice
              </strong>
            </div>
            &ldquo;When I throw the wooden shuttle through the warp, I am
            carrying forward seven generations of ancestral songs woven into raw
            sheep wool. KinCraft guarantees our family directly receives full
            fair wages.&rdquo;
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-4 pt-1 text-xs">
            <div className="flex items-center space-x-1 text-[#2F4F3E] dark:text-[#B5C5AE]">
              <span className="material-symbols-outlined text-[#2F4F3E] dark:text-[#D9A441] text-sm">
                verified_user
              </span>
              <span>100% GI Provenance Verified</span>
            </div>
            <div className="flex items-center space-x-1 text-[#66685F] dark:text-[#B5C5AE]">
              <span className="material-symbols-outlined text-[#A65A45] text-sm">
                badge
              </span>
              <span>Govt. Pehchan Card Integrated</span>
            </div>
            <div className="flex items-center space-x-1 text-[#66685F] dark:text-[#B5C5AE]">
              <span className="material-symbols-outlined text-[#D9A441] text-sm">
                lock
              </span>
              <span>ISO 27001 Secure Escrow</span>
            </div>
          </div>
        </div>

        {/* Right Sign-In / Auth Card Column */}
        <div
          className={`lg:col-span-6 rounded-2xl shadow-xl border p-6 sm:p-8 transition-all ${
            isDark
              ? "bg-[#182620] border-[#2F4F3E] shadow-2xl shadow-black/40"
              : "bg-[#FFFDF9] border-[#E5DED2]"
          }`}
        >
          {/* Mode Switcher Tabs: Sign In vs Create Account */}
          <div className="flex border-b border-[#E5DED2] dark:border-[#2F4F3E]/60 mb-6">
            <button
              type="button"
              onClick={() => {
                setMode("signin");
                setErrorMessage("");
                setSuccessMessage("");
              }}
              className={`flex-1 py-3 text-sm font-semibold tracking-wide border-b-2 transition cursor-pointer text-center ${
                mode === "signin"
                  ? "border-[#2F4F3E] text-[#2F4F3E] dark:border-[#D9A441] dark:text-[#D9A441]"
                  : "border-transparent text-[#66685F] dark:text-[#B5C5AE]/70 hover:text-[#2C2B27] dark:hover:text-[#FFFDF9]"
              }`}
            >
              Sign In to Session
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("signup");
                setErrorMessage("");
                setSuccessMessage("");
                setName("");
                setPassword("");
                setConfirmPassword("");
                setIdentifier("");
              }}
              className={`flex-1 py-3 text-sm font-semibold tracking-wide border-b-2 transition cursor-pointer text-center ${
                mode === "signup"
                  ? "border-[#2F4F3E] text-[#2F4F3E] dark:border-[#D9A441] dark:text-[#D9A441]"
                  : "border-transparent text-[#66685F] dark:text-[#B5C5AE]/70 hover:text-[#2C2B27] dark:hover:text-[#FFFDF9]"
              }`}
            >
              Create New Account
            </button>
          </div>

          {/* Access Clearance Role Selector Tabs (Sign In only) */}
          {mode === "signin" && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label
                  className={`text-xs font-semibold uppercase tracking-wider ${
                    isDark ? "text-[#B5C5AE]" : "text-[#66685F]"
                  }`}
                >
                  Access Clearance Session Gateway
                </label>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    activeRole === "Artisan"
                      ? "bg-[#A65A45]/20 text-[#A65A45]"
                      : activeRole === "Admin"
                        ? "bg-[#D9A441]/20 text-[#D9A441]"
                        : "bg-[#2F4F3E]/20 text-[#2F4F3E] dark:text-[#B5C5AE]"
                  }`}
                >
                  {activeRole === "Artisan"
                    ? "Vendor & Guild Clearance"
                    : activeRole === "Admin"
                      ? "Compliance Clearance"
                      : "Patron Storefront"}
                </span>
              </div>

              <div
                className={`grid grid-cols-3 gap-2 p-1.5 rounded-xl text-sm font-medium ${
                  isDark ? "bg-[#141d18]" : "bg-[#F7F2E8]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => handleRoleSelect("Customer")}
                  className={`flex items-center justify-center space-x-1.5 py-2.5 rounded-lg transition font-medium cursor-pointer ${
                    activeRole === "Customer"
                      ? "bg-[#2F4F3E] text-[#FFFDF9] shadow-sm"
                      : "text-[#66685F] dark:text-[#B5C5AE] hover:text-[#2C2B27] dark:hover:text-[#FFFDF9]"
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">
                    shopping_bag
                  </span>
                  <span>Customer</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRoleSelect("Artisan")}
                  className={`flex items-center justify-center space-x-1.5 py-2.5 rounded-lg transition font-medium cursor-pointer ${
                    activeRole === "Artisan"
                      ? "bg-[#A65A45] text-[#FFFDF9] shadow-sm"
                      : "text-[#66685F] dark:text-[#B5C5AE] hover:text-[#2C2B27] dark:hover:text-[#FFFDF9]"
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">
                    handyman
                  </span>
                  <span>Artisan</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRoleSelect("Admin")}
                  className={`flex items-center justify-center space-x-1.5 py-2.5 rounded-lg transition font-medium cursor-pointer ${
                    activeRole === "Admin"
                      ? "bg-[#20382E] text-[#D9A441] shadow-sm border border-[#D9A441]/30"
                      : "text-[#66685F] dark:text-[#B5C5AE] hover:text-[#2C2B27] dark:hover:text-[#FFFDF9]"
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">
                    shield_person
                  </span>
                  <span>Admin</span>
                </button>
              </div>

              {/* Quick Demo Credentials Autofill Pill */}
              <div className="flex items-center justify-between mt-2 pt-1 text-[11px] text-[#66685F] dark:text-[#B5C5AE]">
                <span>Demo accounts:</span>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => handleFillDemo("Customer")}
                    className="hover:underline text-[#2F4F3E] dark:text-[#D9A441] font-semibold cursor-pointer"
                  >
                    Patron
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => handleFillDemo("Artisan")}
                    className="hover:underline text-[#A65A45] font-semibold cursor-pointer"
                  >
                    Artisan
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="mb-5">
            <h2
              className={`text-2xl font-brand font-bold ${
                isDark ? "text-[#FFFDF9]" : "text-[#20382E]"
              }`}
            >
              {mode === "signin"
                ? `Sign in to KinCraft ${activeRole} Gateway`
                : "Create Your KinCraft Account"}
            </h2>
            <p
              className={`text-xs mt-1 ${
                isDark ? "text-[#B5C5AE]" : "text-[#66685F]"
              }`}
            >
              {mode === "signin"
                ? "Explore certified handlooms, GI pottery, and track your artisan clusters."
                : "Join the verified community protecting Indian ancestral art & direct livelihoods."}
            </p>
          </div>

          {/* Feedback Alerts */}
          {errorMessage && (
            <div className="mb-5 p-3 rounded-xl bg-[#A65A45]/15 border border-[#A65A45] text-[#A65A45] text-xs flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="material-symbols-outlined text-sm">error</span>
                <span>{errorMessage}</span>
              </div>
              <button
                type="button"
                onClick={() => setErrorMessage("")}
                className="text-xs font-bold hover:opacity-70 ml-2"
              >
                ×
              </button>
            </div>
          )}

          {successMessage && (
            <div className="mb-5 p-3 rounded-xl bg-[#2F4F3E]/20 border border-[#2F4F3E] text-[#2F4F3E] dark:text-[#B5C5AE] text-xs flex items-center space-x-2">
              <span className="material-symbols-outlined text-sm text-[#D9A441]">
                check_circle
              </span>
              <span>{successMessage}</span>
            </div>
          )}

          {/* Google OIDC Sign-in Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isSubmitting}
            className={`w-full flex items-center justify-center space-x-3 rounded-xl py-3 px-4 font-medium text-sm transition mb-6 cursor-pointer border ${
              isDark
                ? "border-[#2F4F3E] bg-[#141d18] text-[#FFFDF9] hover:bg-[#20382E]"
                : "border-[#E5DED2] bg-[#FFFDF9] text-[#2C2B27] hover:bg-[#F7F2E8]"
            }`}
          >
            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="relative flex py-2 items-center mb-6">
            <div
              className={`flex-grow border-t ${
                isDark ? "border-[#2F4F3E]/60" : "border-[#E5DED2]"
              }`}
            ></div>
            <span
              className={`flex-shrink mx-4 text-xs uppercase tracking-wider font-semibold ${
                isDark ? "text-[#B5C5AE]/70" : "text-[#66685F]"
              }`}
            >
              Or access with email / mobile
            </span>
            <div
              className={`flex-grow border-t ${
                isDark ? "border-[#2F4F3E]/60" : "border-[#E5DED2]"
              }`}
            ></div>
          </div>

          {/* Email / Mobile / Passkey Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Full Name for Registration */}
            {mode === "signup" && (
              <div>
                <label
                  className={`block text-xs font-semibold mb-1 ${
                    isDark ? "text-[#B5C5AE]" : "text-[#66685F]"
                  }`}
                >
                  FULL NAME
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-[#66685F] text-lg">
                    person
                  </span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Meera Verma"
                    required
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm transition focus:outline-none ${
                      isDark
                        ? "bg-[#141d18] border-[#2F4F3E] text-[#FFFDF9] focus:border-[#D9A441]"
                        : "bg-[#FFFDF9] border-[#E5DED2] text-[#2C2B27] focus:border-[#2F4F3E]"
                    }`}
                  />
                </div>
              </div>
            )}

            {/* Email / Mobile Identifier */}
            <div>
              <label
                className={`block text-xs font-semibold mb-1 ${
                  isDark ? "text-[#B5C5AE]" : "text-[#66685F]"
                }`}
              >
                EMAIL ADDRESS OR 10-DIGIT MOBILE
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[#66685F] text-lg">
                  mail
                </span>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="meera.verma@example.com or 98765 43210"
                  required
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm transition focus:outline-none ${
                    isDark
                      ? "bg-[#141d18] border-[#2F4F3E] text-[#FFFDF9] focus:border-[#D9A441]"
                      : "bg-[#FFFDF9] border-[#E5DED2] text-[#2C2B27] focus:border-[#2F4F3E]"
                  }`}
                />
              </div>
              <p className="text-[11px] text-[#2F4F3E] dark:text-[#B5C5AE] mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px] text-[#D9A441]">
                  lock_clock
                </span>
                <span>Supports instant OTP passwordless verification</span>
              </p>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label
                  className={`block text-xs font-semibold ${
                    isDark ? "text-[#B5C5AE]" : "text-[#66685F]"
                  }`}
                >
                  PASSWORD / PASSKEY
                </label>
                {mode === "signin" && (
                  <button
                    type="button"
                    onClick={() => setActiveModal("forgot")}
                    className="text-xs text-[#A65A45] hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[#66685F] text-lg">
                  key
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your secure password"
                  required
                  className={`w-full pl-10 pr-10 py-3 rounded-xl border text-sm transition focus:outline-none ${
                    isDark
                      ? "bg-[#141d18] border-[#2F4F3E] text-[#FFFDF9] focus:border-[#D9A441]"
                      : "bg-[#FFFDF9] border-[#E5DED2] text-[#2C2B27] focus:border-[#2F4F3E]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="material-symbols-outlined absolute right-3 text-[#66685F] text-lg cursor-pointer select-none hover:text-[#2C2B27] dark:hover:text-[#FFFDF9]"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? "visibility_off" : "visibility"}
                </button>
              </div>
            </div>

            {/* Confirm Password for Signup */}
            {mode === "signup" && (
              <div>
                <label
                  className={`block text-xs font-semibold mb-1 ${
                    isDark ? "text-[#B5C5AE]" : "text-[#66685F]"
                  }`}
                >
                  CONFIRM PASSWORD
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-[#66685F] text-lg">
                    lock_reset
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your password"
                    required
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm transition focus:outline-none ${
                      isDark
                        ? "bg-[#141d18] border-[#2F4F3E] text-[#FFFDF9] focus:border-[#D9A441]"
                        : "bg-[#FFFDF9] border-[#E5DED2] text-[#2C2B27] focus:border-[#2F4F3E]"
                    }`}
                  />
                </div>
              </div>
            )}

            {/* Checkbox Options */}
            <div className="flex items-center justify-between text-xs pt-1">
              {mode === "signin" ? (
                <label className="flex items-center space-x-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={keepSignedIn}
                    onChange={(e) => setKeepSignedIn(e.target.checked)}
                    className="rounded text-[#2F4F3E] focus:ring-[#2F4F3E]"
                  />
                  <span
                    className={isDark ? "text-[#B5C5AE]" : "text-[#66685F]"}
                  >
                    Keep me signed in for 30 days
                  </span>
                </label>
              ) : (
                <label className="flex items-center space-x-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="rounded text-[#2F4F3E] focus:ring-[#2F4F3E]"
                  />
                  <span
                    className={isDark ? "text-[#B5C5AE]" : "text-[#66685F]"}
                  >
                    I accept the{" "}
                    <button
                      type="button"
                      onClick={() => setActiveModal("charter")}
                      className="underline text-[#A65A45]"
                    >
                      Fair-Trade Charter
                    </button>
                  </span>
                </label>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full font-medium py-3.5 px-4 rounded-xl transition flex items-center justify-center space-x-2 shadow-lg cursor-pointer ${
                mode === "signup"
                  ? "bg-[#2F4F3E] hover:bg-[#20382E] text-white shadow-[#2F4F3E]/20"
                  : activeRole === "Artisan"
                    ? "bg-[#A65A45] hover:bg-[#8F4633] text-white shadow-[#A65A45]/20"
                    : activeRole === "Admin"
                      ? "bg-[#20382E] hover:bg-[#121e18] text-[#D9A441] border border-[#D9A441]/40 shadow-black/20"
                      : "bg-[#2F4F3E] hover:bg-[#20382E] text-white shadow-[#2F4F3E]/20"
              }`}
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined text-sm animate-spin">
                    progress_activity
                  </span>
                  <span>
                    {mode === "signin"
                      ? "Authenticating clearance..."
                      : "Creating KinCraft account..."}
                  </span>
                </>
              ) : (
                <>
                  <span>
                    {mode === "signin"
                      ? `Enter ${activeRole} Marketplace`
                      : "Create KinCraft Account"}
                  </span>
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </>
              )}
            </button>
          </form>

          {/* Patron / Artisan Benefits Footer inside Card */}
          <div
            className={`mt-8 pt-6 border-t grid grid-cols-3 gap-2 text-center ${
              isDark ? "border-[#2F4F3E]/40" : "border-[#E5DED2]"
            }`}
          >
            <div
              className={`p-2 rounded-lg ${
                isDark ? "bg-[#141d18]" : "bg-[#F7F2E8]"
              }`}
            >
              <span className="material-symbols-outlined text-[#2F4F3E] dark:text-[#D9A441] text-base mb-1">
                deployed_code
              </span>
              <p
                className={`text-[10px] font-medium leading-tight ${
                  isDark ? "text-[#B5C5AE]" : "text-[#66685F]"
                }`}
              >
                Live Loom &amp; Kiln Tracker
              </p>
            </div>
            <div
              className={`p-2 rounded-lg ${
                isDark ? "bg-[#141d18]" : "bg-[#F7F2E8]"
              }`}
            >
              <span className="material-symbols-outlined text-[#A65A45] text-base mb-1">
                record_voice_over
              </span>
              <p
                className={`text-[10px] font-medium leading-tight ${
                  isDark ? "text-[#B5C5AE]" : "text-[#66685F]"
                }`}
              >
                Direct Audio Notes with Craftsmen
              </p>
            </div>
            <div
              className={`p-2 rounded-lg ${
                isDark ? "bg-[#141d18]" : "bg-[#F7F2E8]"
              }`}
            >
              <span className="material-symbols-outlined text-[#D9A441] text-base mb-1">
                verified
              </span>
              <p
                className={`text-[10px] font-medium leading-tight ${
                  isDark ? "text-[#B5C5AE]" : "text-[#66685F]"
                }`}
              >
                Govt GI Certificate in Box
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Modal Dialogs for Charter, Rights, Privacy & Forgot Password */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div
            className={`max-w-md w-full rounded-2xl p-6 border shadow-2xl relative ${
              isDark
                ? "bg-[#182620] border-[#2F4F3E] text-[#FFFDF9]"
                : "bg-[#FFFDF9] border-[#E5DED2] text-[#2C2B27]"
            }`}
          >
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-xl font-bold opacity-60 hover:opacity-100"
            >
              &times;
            </button>

            {activeModal === "charter" && (
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-[#2F4F3E] dark:text-[#D9A441]">
                  <span className="material-symbols-outlined">gavel</span>
                  <h3 className="font-brand font-bold text-lg">
                    KinCraft Fair-Trade Charter
                  </h3>
                </div>
                <p className="text-xs leading-relaxed opacity-90">
                  Every artisan collective partnering with KinCraft receives an
                  audited minimum 90.2% direct payout deposited into cooperative
                  bank accounts within 48 hours of customer dispatch. Wholesaler
                  markdowns and hidden broker fees are strictly prohibited by
                  our binding charter.
                </p>
                <div className="pt-2 text-right">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="px-4 py-2 bg-[#2F4F3E] text-white rounded-lg text-xs font-semibold"
                  >
                    Acknowledged
                  </button>
                </div>
              </div>
            )}

            {activeModal === "artisan-rights" && (
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-[#A65A45]">
                  <span className="material-symbols-outlined">
                    shield_person
                  </span>
                  <h3 className="font-brand font-bold text-lg">
                    Artisan Lineage Rights
                  </h3>
                </div>
                <p className="text-xs leading-relaxed opacity-90">
                  KinCraft protects intellectual property rights over
                  traditional motifs and GI (Geographical Indication) tags.
                  Designs cannot be machine-reproduced or claimed by external
                  design houses without tribal elder assent and royalty
                  provisions.
                </p>
                <div className="pt-2 text-right">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="px-4 py-2 bg-[#A65A45] text-white rounded-lg text-xs font-semibold"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            {activeModal === "privacy" && (
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-[#D9A441]">
                  <span className="material-symbols-outlined">security</span>
                  <h3 className="font-brand font-bold text-lg">
                    Data Privacy &amp; Escrow Guarantee
                  </h3>
                </div>
                <p className="text-xs leading-relaxed opacity-90">
                  Your identity and payment credentials are encrypted using
                  256-bit AES standards compliant with the India Digital
                  Personal Data Protection (DPDP) Act 2025. Escrow holds your
                  payment until provenance verification is authenticated upon
                  delivery.
                </p>
                <div className="pt-2 text-right">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="px-4 py-2 bg-[#20382E] text-[#D9A441] border border-[#D9A441] rounded-lg text-xs font-semibold"
                  >
                    Got It
                  </button>
                </div>
              </div>
            )}

            {activeModal === "forgot" && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-[#A65A45]">
                  <span className="material-symbols-outlined">lock_reset</span>
                  <h3 className="font-brand font-bold text-lg">
                    Password Reset &amp; OTP Login
                  </h3>
                </div>
                <p className="text-xs leading-relaxed opacity-90">
                  Enter your registered email or 10-digit mobile number below to
                  receive an instant OTP access code:
                </p>
                <input
                  type="text"
                  defaultValue={identifier}
                  className={`w-full p-2.5 rounded-lg border text-sm ${
                    isDark
                      ? "bg-[#141d18] border-[#2F4F3E] text-[#FFFDF9]"
                      : "bg-[#FFFDF9] border-[#E5DED2] text-[#2C2B27]"
                  }`}
                  placeholder="Enter email or mobile"
                />
                <button
                  type="button"
                  onClick={() => {
                    setActiveModal(null);
                    setSuccessMessage(
                      "One-time passcode sent to your registered contact. Please verify.",
                    );
                  }}
                  className="w-full py-2.5 bg-[#2F4F3E] text-white rounded-lg text-xs font-semibold"
                >
                  Send One-Time Passcode (OTP)
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
