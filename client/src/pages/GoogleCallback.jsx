import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import KinCraftLogo from "../components/KinCraftLogo";

export default function GoogleCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    handleGoogleCallback,
    loginWithToken,
    getRoleDashboardPath,
    authFetch,
  } = useAuth();
  const { isDark } = useTheme();

  const [status, setStatus] = useState("verifying"); // 'verifying' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function processOAuth() {
      const code = searchParams.get("code");
      const role =
        searchParams.get("state") || searchParams.get("role") || "Customer";
      const token = searchParams.get("token");
      const error = searchParams.get("error");
      const errorDesc = searchParams.get("error_description");

      if (error) {
        if (isMounted) {
          setStatus("error");
          setErrorMessage(
            errorDesc ||
              (error === "access_denied"
                ? "Google sign-in was cancelled. Please try again when ready."
                : decodeURIComponent(error)),
          );
        }
        return;
      }

      // If backend already issued token (via server-side redirect)
      if (token) {
        try {
          const res = await authFetch("/api/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          if (isMounted) {
            if (data.success && data.user) {
              loginWithToken(token, data.user);
              setUserName(data.user.name || "Patron");
              setStatus("success");
              setTimeout(() => {
                navigate(getRoleDashboardPath(data.user.role || role));
              }, 1000);
            } else {
              setStatus("error");
              setErrorMessage(
                "Could not verify session with authentication server.",
              );
            }
          }
        } catch (err) {
          if (isMounted) {
            setStatus("error");
            setErrorMessage(
              "Connection issue completing authentication. Please retry.",
            );
          }
        }
        return;
      }

      // If authorization code is present in URL, exchange it via backend
      if (code) {
        try {
          const result = await handleGoogleCallback(code, role);
          if (isMounted) {
            if (result && result.success) {
              setUserName(result.user?.name || "Patron");
              setStatus("success");
              setTimeout(() => {
                navigate(getRoleDashboardPath(result.user?.role || role));
              }, 1000);
            } else {
              setStatus("error");
              setErrorMessage(
                result?.message ||
                  "Google authorization exchange failed. Please sign in again.",
              );
            }
          }
        } catch (err) {
          if (isMounted) {
            setStatus("error");
            setErrorMessage(
              err.message ||
                "Failed to exchange authorization code with Google.",
            );
          }
        }
        return;
      }

      // If neither code nor token found
      if (isMounted) {
        setStatus("error");
        setErrorMessage(
          "No authorization code or session token found in callback request.",
        );
      }
    }

    processOAuth();

    return () => {
      isMounted = false;
    };
  }, [searchParams]);

  return (
    <div
      className={`min-h-screen flex flex-col justify-between transition-colors duration-300 font-body ${
        isDark ? "bg-[#141d18] text-[#F7F2E8]" : "bg-[#F7F2E8] text-[#2C2B27]"
      }`}
    >
      <header className="p-6 flex items-center justify-center">
        <Link to="/" aria-label="KinCraft Home">
          <KinCraftLogo variant={isDark ? "dark" : "horizontal"} height={44} />
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div
          className={`max-w-md w-full p-8 rounded-2xl shadow-xl border text-center transition-all ${
            isDark
              ? "bg-[#1A2820] border-[#293E32]"
              : "bg-[#FFFDF9] border-[#E5DED2]"
          }`}
        >
          {status === "verifying" && (
            <div className="space-y-5">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#2F4F3E]/10 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-[#2F4F3E] border-t-[#D9A441] rounded-full animate-spin"></div>
              </div>
              <h2 className="font-heading text-xl font-bold text-[#2F4F3E] dark:text-[#7EB09B]">
                Verifying Google Credentials...
              </h2>
              <p className="text-xs text-[#66685F] dark:text-[#A3B5AA] leading-relaxed">
                Completing secure cryptographic handshake with Google OIDC 2.0
                and establishing your KinCraft patron session.
              </p>
            </div>
          )}

          {status === "success" && (
            <div className="space-y-5">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl">
                  check_circle
                </span>
              </div>
              <h2 className="font-heading text-xl font-bold text-[#2F4F3E] dark:text-[#7EB09B]">
                Welcome to KinCraft, {userName}!
              </h2>
              <p className="text-xs text-[#66685F] dark:text-[#A3B5AA] leading-relaxed">
                Google authentication confirmed. Directing you to your dedicated
                artisan dashboard...
              </p>
            </div>
          )}

          {status === "error" && (
            <div className="space-y-5">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#A65A45]/10 text-[#A65A45] flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl">
                  error
                </span>
              </div>
              <h2 className="font-heading text-xl font-bold text-[#A65A45]">
                Authentication Incomplete
              </h2>
              <p className="text-xs opacity-80 leading-relaxed text-[#2C2B27] dark:text-[#F5EFE6]">
                {errorMessage}
              </p>
              <div className="pt-2 flex flex-col gap-3">
                <Link
                  to="/auth"
                  className="w-full py-3 rounded-xl bg-[#2F4F3E] hover:bg-[#20382E] text-white text-xs font-semibold shadow transition-colors"
                >
                  Return to Sign In
                </Link>
                <Link
                  to="/"
                  className="w-full py-2.5 rounded-xl border border-[#E5DED2] dark:border-[#293E32] text-xs font-medium hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  Back to Marketplace
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="p-4 text-center text-xs opacity-60">
        KinCraft Fair-Trade Artisan Commerce • 256-bit AES Escrow Security
      </footer>
    </div>
  );
}
