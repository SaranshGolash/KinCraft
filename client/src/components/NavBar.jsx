import React, { useState, useEffect, useRef } from "react";
import KinCraftLogo from "./KinCraftLogo";
import "./NavBar.css";

function NavBar() {
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

  // Cart state
  const [cartItemsCount] = useState(3);
  const [cartArtisansCount] = useState(2);
  const [wishlistCount] = useState(5);

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
              <a
                href="#artisan-studio"
                className="kincraft-top-link"
                title="Access Artisan Studio Portal"
                onClick={() => setActiveEcosystem("artisan")}
              >
                <span>Switch to Artisan Studio</span>
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </a>

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
            <a href="/" className="kincraft-brand-link" aria-label="KinCraft Home">
              <KinCraftLogo variant="horizontal" height={46} />
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
              {/* Wishlist */}
              <a
                href="#wishlist"
                className="kincraft-action-btn"
                title="View Saved Artisan Crafts"
              >
                <span className="material-symbols-outlined">favorite</span>
                <span>Wishlist</span>
                <span className="badge-pill">{wishlistCount}</span>
              </a>

              {/* Cart Drawer Button */}
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

              {/* User Profile */}
              <div className="kincraft-user-wrapper" ref={userMenuRef}>
                <button
                  type="button"
                  className="kincraft-user-btn"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  aria-expanded={isUserMenuOpen}
                >
                  <div className="kincraft-user-avatar">MV</div>
                  <div className="kincraft-user-text">
                    <span className="kincraft-user-name">Meera Verma</span>
                    <span className="kincraft-user-tier">Patron Member</span>
                  </div>
                  <span className="material-symbols-outlined text-xs">
                    expand_more
                  </span>
                </button>

                {isUserMenuOpen && (
                  <div className="kincraft-user-dropdown">
                    <div className="kincraft-user-dropdown-header">
                      <strong>Meera Verma</strong>
                      <span>Patron Member • Tier 1</span>
                    </div>
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
                    <a href="#settings">
                      <span className="material-symbols-outlined text-base">
                        settings
                      </span>
                      <span>Account Settings</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <span className="material-symbols-outlined text-base">
                        logout
                      </span>
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>

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
              <a
                href="#storefront"
                className={`kincraft-eco-link ${
                  activeEcosystem === "storefront" ? "active" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveEcosystem("storefront");
                }}
              >
                Customer Storefront
              </a>

              <span className="kincraft-eco-bullet">•</span>

              <a
                href="#artisan-portal"
                className={`kincraft-eco-link ${
                  activeEcosystem === "artisan" ? "active" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveEcosystem("artisan");
                }}
              >
                Artisan Dashboard (Vendor Portal)
              </a>

              <span className="kincraft-eco-bullet">•</span>

              <a
                href="#admin-console"
                className={`kincraft-eco-link ${
                  activeEcosystem === "admin" ? "active" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveEcosystem("admin");
                }}
              >
                Platform Admin &amp; Compliance
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================
          MOBILE EXPANDABLE DRAWER
          =================================================================== */}
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
      </div>
    </header>
  );
}

export default NavBar;
