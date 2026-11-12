import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import KinCraftLogo from "./KinCraftLogo";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import "./NavBar.css";

function NavBar() {
  const { isDark, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout, getRoleDashboardPath } = useAuth();
  // Navigation & filter states
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeEcosystem, setActiveEcosystem] = useState("storefront");
  const [searchQuery, setSearchQuery] = useState("");
  const [isListening, setIsListening] = useState(false);

  // Dropdown states
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("English / हिंदी");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Cart & Wishlist state (active only for authenticated patron sessions)
  const cartItemsCount = isAuthenticated && user ? 3 : 0;
  const cartArtisansCount = isAuthenticated && user ? 2 : 0;
  const wishlistCount = isAuthenticated && user ? 5 : 0;

  const langRef = useRef(null);
  const userMenuRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const categories = [
    { id: "all", label: "All Heritage Crafts", href: "#all-crafts" },
    { id: "pottery", label: "Terracotta & Pottery", href: "#pottery" },
    { id: "textiles", label: "Handloom Textiles", href: "#textiles" },
    { id: "bell-metal", label: "Dhokra & Bell Metal", href: "#bell-metal" },
    { id: "woodcraft", label: "Woodcraft", href: "#woodcraft" },
    { id: "fiber", label: "Natural Fiber", href: "#fiber" },
    {
      id: "gi-tagged",
      label: "GI Tagged Crafts",
      href: "#gi-tagged",
      isGI: true,
    },
  ];

  const languages = [
    { code: "en-hi", label: "English / हिंदी", desc: "Default" },
    { code: "en", label: "English", desc: "Global" },
    { code: "hi", label: "हिंदी", desc: "Hindi" },
    { code: "bn", label: "বাংলা", desc: "Bengali" },
    { code: "ta", label: "தமிழ்", desc: "Tamil" },
    { code: "te", label: "తెలుగు", desc: "Telugu" },
  ];

  const handleVoiceSearch = () => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-IN";

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        setIsListening(false);
      };
      recognition.start();
    } else {
      setIsListening(true);
      setTimeout(() => {
        setIsListening(false);
        setSearchQuery("Madhubani Handloom Sarees");
      }, 1500);
    }
  };

  return (
    <header className="kincraft-header">
      {/* Top Announcement & Utility Bar */}
      <div className="kincraft-top-bar">
        <div className="kincraft-nav-container">
          <div className="kincraft-top-bar-inner">
            {/* Left: Announcement & Verification Notice */}
            <div className="kincraft-announcement">
              <span className="material-symbols-outlined badge-icon fill">
                verified
              </span>
              <span className="kincraft-announcement-text">
                Empowering <span className="highlight">4,200+</span> rural
                Indian craftspeople • 100% Verified Authentic Handlooms, Pottery
                &amp; Heritage Crafts • Free shipping above ₹999
              </span>
            </div>

            {/* Right: Studio Switcher & Language Selector */}
            <div className="kincraft-top-bar-actions" ref={langRef}>
              <button
                type="button"
                className="kincraft-top-theme-btn"
                onClick={toggleTheme}
                title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                aria-label={
                  isDark ? "Switch to Light Mode" : "Switch to Dark Mode"
                }
              >
                <span className="material-symbols-outlined text-xs">
                  {isDark ? "light_mode" : "dark_mode"}
                </span>
                <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
              </button>

              <span className="kincraft-top-divider">|</span>

              <Link
                to="/dashboard/artisan"
                className="kincraft-top-link"
                title="Access Artisan Studio Portal"
                onClick={() => setActiveEcosystem("artisan")}
              >
                <span>Switch to Artisan Studio</span>
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </Link>

              <span className="kincraft-top-divider">|</span>

              <div style={{ position: "relative" }}>
                <button
                  type="button"
                  className="kincraft-language-btn"
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  aria-expanded={isLangOpen}
                >
                  <span className="material-symbols-outlined text-sm">
                    language
                  </span>
                  <span>{selectedLang}</span>
                  <span className="material-symbols-outlined text-xs">
                    expand_more
                  </span>
                </button>

                {isLangOpen && (
                  <div className="kincraft-lang-dropdown">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        type="button"
                        className={`kincraft-lang-option ${
                          selectedLang.includes(lang.label) ? "active" : ""
                        }`}
                        onClick={() => {
                          setSelectedLang(lang.label);
                          setIsLangOpen(false);
                        }}
                      >
                        <span>{lang.label}</span>
                        <small style={{ color: "var(--color-muted-grey)" }}>
                          {lang.desc}
                        </small>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Brand, Search & Actions Bar*/}
      <div className="kincraft-main-bar">
        <div className="kincraft-nav-container">
          <div className="kincraft-main-bar-inner">
            {/* Brand Identity */}
            <a
              href="/"
              className="kincraft-brand-link"
              aria-label="KinCraft Home"
            >
              <KinCraftLogo
                variant={isDark ? "dark" : "horizontal"}
                height={46}
              />
            </a>

            {/* Central Search Bar */}
            <div className="kincraft-search-wrapper">
              <div className="kincraft-search-box">
                <span className="material-symbols-outlined kincraft-search-icon">
                  search
                </span>
                <input
                  type="text"
                  className="kincraft-search-input"
                  placeholder="Search by craft, master artisan, or village of origin (e.g. Madhubani, Pochampally)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="kincraft-search-clear"
                    onClick={() => setSearchQuery("")}
                    title="Clear search"
                  >
                    <span className="material-symbols-outlined text-sm">
                      close
                    </span>
                  </button>
                )}
                <span
                  className={`material-symbols-outlined kincraft-search-mic ${
                    isListening ? "listening" : ""
                  }`}
                  onClick={handleVoiceSearch}
                  title="Voice Search"
                >
                  {isListening ? "mic_double" : "mic"}
                </span>
              </div>
            </div>

            {/* Right Action Icons: Wishlist, Cart & Profile */}
            <div className="kincraft-header-actions">
              {/* Theme Toggle Button */}
              <button
                type="button"
                className="kincraft-theme-toggle-btn"
                onClick={toggleTheme}
                title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                aria-label={
                  isDark ? "Switch to Light Mode" : "Switch to Dark Mode"
                }
              >
                <span className="material-symbols-outlined theme-icon">
                  {isDark ? "light_mode" : "dark_mode"}
                </span>
                <span className="theme-toggle-text">
                  {isDark ? "Light" : "Dark"}
                </span>
              </button>

              {/* Wishlist & Cart (Available for Authenticated Patrons) */}
              {isAuthenticated && user ? (
                <>
                  <a
                    href="#wishlist"
                    className="kincraft-action-btn"
                    title="View Saved Artisan Crafts"
                  >
                    <span className="material-symbols-outlined">favorite</span>
                    <span>Wishlist</span>
                    <span className="badge-pill">{wishlistCount}</span>
                  </a>

                  <a
                    href="#cart"
                    className="kincraft-cart-btn"
                    title="Open Shopping Cart"
                  >
                    <span className="material-symbols-outlined kincraft-cart-icon fill">
                      local_mall
                    </span>
                    <div className="kincraft-cart-info">
                      <span className="kincraft-cart-count">
                        {cartItemsCount} items
                      </span>
                      <span className="kincraft-cart-artisans">
                        from {cartArtisansCount} artisans
                      </span>
                    </div>
                  </a>
                </>
              ) : null}

              {/* User Profile or Sign In */}
              {isAuthenticated && user ? (
                <div className="kincraft-user-wrapper" ref={userMenuRef}>
                  <button
                    type="button"
                    className="kincraft-user-btn"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    aria-expanded={isUserMenuOpen}
                  >
                    <div className="kincraft-user-avatar">
                      {user.avatar_initials || "KC"}
                    </div>
                    <div className="kincraft-user-text">
                      <span className="kincraft-user-name">{user.name}</span>
                      <span className="kincraft-user-tier">
                        {user.membership_tier || user.role}
                      </span>
                    </div>
                    <span className="material-symbols-outlined text-xs">
                      expand_more
                    </span>
                  </button>

                  {isUserMenuOpen && (
                    <div className="kincraft-user-dropdown">
                      <div className="kincraft-user-dropdown-header">
                        <strong>{user.name}</strong>
                        <span>{user.membership_tier || user.role}</span>
                      </div>
                      <Link
                        to={getRoleDashboardPath(user.role)}
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <span className="material-symbols-outlined text-base">
                          dashboard
                        </span>
                        <span>
                          {user.role === "Artisan"
                            ? "Artisan Studio Portal"
                            : user.role === "Admin"
                            ? "Compliance Admin Console"
                            : "My Patron Dashboard"}
                        </span>
                      </Link>
                      <a href="#orders">
                        <span className="material-symbols-outlined text-base">
                          package_2
                        </span>
                        <span>Artisan Orders</span>
                      </a>
                      <a href="#impact">
                        <span className="material-symbols-outlined text-base">
                          volunteer_activism
                        </span>
                        <span>Artisan Impact Portfolio</span>
                      </a>
                      <a href="#favorites">
                        <span className="material-symbols-outlined text-base">
                          bookmark_heart
                        </span>
                        <span>Saved Collectives</span>
                      </a>
                      <hr />
                      <Link to="/auth" onClick={() => setIsUserMenuOpen(false)}>
                        <span className="material-symbols-outlined text-base">
                          switch_account
                        </span>
                        <span>Switch Account / Portal</span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                      >
                        <span className="material-symbols-outlined text-base">
                          logout
                        </span>
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/auth" className="kincraft-signin-btn">
                  <span className="material-symbols-outlined text-sm">
                    account_circle
                  </span>
                  <span>Sign In</span>
                </Link>
              )}

              {/* Mobile Hamburger Toggle */}
              <button
                type="button"
                className="kincraft-mobile-toggle"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle Navigation Menu"
              >
                <span className="material-symbols-outlined text-2xl">
                  {isMobileMenuOpen ? "close" : "menu"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Navigation Bar */}
      <div className="kincraft-category-bar">
        <div className="kincraft-nav-container">
          <div className="kincraft-category-bar-inner">
            <nav className="kincraft-categories-nav">
              {categories.map((cat) => (
                <a
                  key={cat.id}
                  href={cat.href}
                  className={`kincraft-category-link ${
                    activeCategory === cat.id ? "active" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveCategory(cat.id);
                  }}
                >
                  <span>{cat.label}</span>
                  {cat.isGI && (
                    <span
                      className="material-symbols-outlined gi-badge fill"
                      title="Geographical Indication Tagged Heritage"
                    >
                      workspace_premium
                    </span>
                  )}
                </a>
              ))}
            </nav>

            <div className="kincraft-storefront-badge">
              <span className="badge-dot"></span>
              <span className="material-symbols-outlined text-xs">
                storefront
              </span>
              <span>Customer Storefront Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* KinCraft Ecosystem Quick-Switcher Bar*/}
      <div className="kincraft-ecosystem-bar">
        <div className="kincraft-nav-container">
          <div className="kincraft-ecosystem-bar-inner">
            <div className="kincraft-ecosystem-label">
              <span className="material-symbols-outlined hub-icon">hub</span>
              <span className="kincraft-ecosystem-title">
                KinCraft Ecosystem:
              </span>
            </div>

            <div className="kincraft-ecosystem-links">
              <Link
                to="/"
                className={`kincraft-eco-link ${
                  activeEcosystem === "storefront" ? "active" : ""
                }`}
                onClick={() => setActiveEcosystem("storefront")}
              >
                Customer Storefront
              </Link>

              <span className="kincraft-eco-bullet">•</span>

              <Link
                to="/dashboard/artisan"
                className={`kincraft-eco-link ${
                  activeEcosystem === "artisan" ? "active" : ""
                }`}
                onClick={() => setActiveEcosystem("artisan")}
              >
                Artisan Dashboard (Vendor Portal)
              </Link>

              <span className="kincraft-eco-bullet">•</span>

              <Link
                to="/dashboard/admin"
                className={`kincraft-eco-link ${
                  activeEcosystem === "admin" ? "active" : ""
                }`}
                onClick={() => setActiveEcosystem("admin")}
              >
                Platform Admin &amp; Compliance
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE EXPANDABLE DRAWER*/}
      <div
        className={`kincraft-mobile-drawer ${isMobileMenuOpen ? "open" : ""}`}
      >
        <div className="kincraft-mobile-search">
          <div className="kincraft-search-box">
            <span className="material-symbols-outlined kincraft-search-icon">
              search
            </span>
            <input
              type="text"
              className="kincraft-search-input"
              placeholder="Search crafts, artisans, villages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="kincraft-mobile-categories">
          <strong>Categories</strong>
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={cat.href}
              className={`kincraft-mobile-cat-link ${
                activeCategory === cat.id ? "active" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                setActiveCategory(cat.id);
                setIsMobileMenuOpen(false);
              }}
            >
              <span>{cat.label}</span>
              {cat.isGI && (
                <span className="material-symbols-outlined gi-badge fill">
                  workspace_premium
                </span>
              )}
            </a>
          ))}
        </div>

        <div className="kincraft-mobile-theme">
          <button
            type="button"
            className="kincraft-mobile-theme-btn"
            onClick={toggleTheme}
          >
            <span className="material-symbols-outlined theme-icon">
              {isDark ? "light_mode" : "dark_mode"}
            </span>
            <span>Switch to {isDark ? "Light Mode" : "Dark Mode"}</span>
          </button>
        </div>

        <div className="kincraft-mobile-eco">
          <strong>Ecosystem Switcher</strong>
          <a
            href="#storefront"
            className={`kincraft-mobile-cat-link ${
              activeEcosystem === "storefront" ? "active" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              setActiveEcosystem("storefront");
              setIsMobileMenuOpen(false);
            }}
          >
            Customer Storefront
          </a>
          <a
            href="#artisan-portal"
            className={`kincraft-mobile-cat-link ${
              activeEcosystem === "artisan" ? "active" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              setActiveEcosystem("artisan");
              setIsMobileMenuOpen(false);
            }}
          >
            Artisan Dashboard (Vendor Portal)
          </a>
          <a
            href="#admin-console"
            className={`kincraft-mobile-cat-link ${
              activeEcosystem === "admin" ? "active" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              setActiveEcosystem("admin");
              setIsMobileMenuOpen(false);
            }}
          >
            Platform Admin &amp; Compliance
          </a>
        </div>

        <div className="kincraft-mobile-user">
          {isAuthenticated && user ? (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <div className="kincraft-user-avatar">
                  {user.avatar_initials || "KC"}
                </div>
                <div>
                  <strong className="block text-sm">{user.name}</strong>
                  <span className="text-xs text-[#66685F] dark:text-[#B5C5AE]">
                    {user.membership_tier || user.role}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Link
                  to="/auth"
                  className="flex-1 text-center py-2 px-3 text-xs font-semibold rounded-lg bg-[#2F4F3E] text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Switch Role
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex-1 text-center py-2 px-3 text-xs font-semibold rounded-lg bg-[#A65A45] text-white"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/auth"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#2F4F3E] text-white font-medium text-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="material-symbols-outlined text-sm">
                account_circle
              </span>
              <span>Sign In to KinCraft</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default NavBar;
