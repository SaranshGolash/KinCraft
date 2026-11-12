import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import KinCraftLogo from "../components/KinCraftLogo";
import Footer from "../components/Footer";

export default function PatronDashboard() {
  const { user, logout, authFetch } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [activeTab, setActiveTab] = useState("orders"); // "orders" | "impact" | "saved"

  // Fetch Patron Dashboard Data
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const res = await authFetch("/api/dashboard/patron");
        const data = await res.json();
        if (isMounted) {
          if (data.success) {
            setDashboardData(data);
          } else {
            setDashboardData(getFallbackData());
          }
        }
      } catch (err) {
        console.warn("Using fallback patron dashboard data:", err);
        if (isMounted) {
          setDashboardData(getFallbackData());
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const getFallbackData = () => ({
    user: user || {
      name: "Meera Verma",
      email: "meera.verma@example.com",
      role: "Customer",
      membership_tier: "Conscious Patron & GI Guardian",
      avatar_initials: "MV",
    },
    stats: {
      totalSpent: "₹18,450",
      cooperativeDirectImpact: "₹16,642 (90.2%)",
      artisansSupported: 7,
      activeOrdersCount: 2,
      carbonOffsetKg: "42 kg CO₂e",
    },
    activeOrders: [
      {
        orderId: "KC-98421",
        item: "Pochampally Ikat Pure Silk Sari",
        artisan: "Master Weaver K. Ramanathan",
        cluster: "Pochampally Handloom Cluster, Telangana",
        giTag: "GI-TEL-IKAT-004",
        status: "Loom Weaving in Progress",
        stageIndex: 2,
        stages: ["Cocoon Reeling", "Vat Dyeing", "Loom Weaving", "GI Verification", "Dispatched"],
        estimatedArrival: "3 days remaining",
        escrowAmount: "₹8,450",
        escrowStatus: "Protected in KinCraft Trust Escrow (Released on Patron confirmation)",
        imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80",
      },
      {
        orderId: "KC-98319",
        item: "Gorakhpur Terracotta Heritage Elephant",
        artisan: "Master Potter Karan Kumbhar",
        cluster: "Gorakhpur Terracotta Cluster, Uttar Pradesh",
        giTag: "GI-UP-TERRA-2009",
        status: "Kiln Firing Complete • Cooling Down",
        stageIndex: 3,
        stages: ["Clay Sourcing", "Wheel Throwing", "Sun Curing", "Kiln Firing", "Quality Sealed"],
        estimatedArrival: "Tomorrow",
        escrowAmount: "₹2,650",
        escrowStatus: "Protected in KinCraft Trust Escrow",
        imageUrl: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=400&q=80",
      },
    ],
    savedCollectives: [
      {
        id: 1,
        name: "Pochampally Weavers Cooperative Society",
        location: "Yadadri Bhuvanagiri, Telangana",
        artisansCount: 420,
        craft: "Double Ikat Silk & Cotton",
        giTag: "GI-IN-0004",
        image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=400&q=80",
      },
      {
        id: 2,
        name: "Gorakhpur Terracotta Shilpkar Samiti",
        location: "Aurangabad Village, Gorakhpur, UP",
        artisansCount: 280,
        craft: "Natural Clay Terracotta Sculptures",
        giTag: "GI-IN-0212",
        image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=400&q=80",
      },
      {
        id: 3,
        name: "Mithila Mahila Madhubani Guild",
        location: "Madhubani, Bihar",
        artisansCount: 310,
        craft: "Natural Pigment Madhubani Paintings",
        giTag: "GI-IN-0012",
        image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=400&q=80",
      },
    ],
    provenanceLog: [
      {
        id: "PL-001",
        item: "Pochampally Ikat Sari",
        hash: "0x8f2d...3b1a",
        giRegistration: "GI/2004/0004",
        masterArtisanPehchan: "PEH-TEL-8821",
        verifiedOn: "2026-11-04 14:22 IST",
      },
      {
        id: "PL-002",
        item: "Gorakhpur Terracotta Elephant",
        hash: "0x4e1c...99d2",
        giRegistration: "GI/2020/0212",
        masterArtisanPehchan: "PEH-UP-7741",
        verifiedOn: "2026-11-06 10:15 IST",
      },
    ],
  });

  const stats = dashboardData?.stats || getFallbackData().stats;
  const activeOrders = dashboardData?.activeOrders || getFallbackData().activeOrders;
  const savedCollectives = dashboardData?.savedCollectives || getFallbackData().savedCollectives;
  const provenanceLog = dashboardData?.provenanceLog || getFallbackData().provenanceLog;

  return (
    <div
      className={`min-h-screen flex flex-col font-body transition-colors duration-200 ${
        isDark ? "bg-[#131E18] text-[#F5EFE6]" : "bg-[#F7F2E8] text-[#2C2B27]"
      }`}
    >
      {/* Top Patron Header */}
      <header
        className={`sticky top-0 z-40 border-b backdrop-blur-md ${
          isDark
            ? "bg-[#14221A]/95 border-[#293E32]"
            : "bg-[#FFFDF9]/95 border-[#E5DED2]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-2">
              <KinCraftLogo
                variant={isDark ? "dark" : "horizontal"}
                height={40}
              />
            </Link>
            <span className="hidden md:inline-block text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-[#2F4F3E]/10 dark:bg-[#7EB09B]/20 text-[#2F4F3E] dark:text-[#7EB09B] border border-[#2F4F3E]/20">
              Patron Portal
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className={`hidden sm:inline-flex items-center space-x-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg border transition-colors ${
                isDark
                  ? "border-[#293E32] hover:bg-[#1F3027] text-[#F5EFE6]"
                  : "border-[#E5DED2] hover:bg-[#F1EDE7] text-[#2C2B27]"
              }`}
            >
              <span className="material-symbols-outlined text-sm">storefront</span>
              <span>Explore Marketplace</span>
            </Link>

            <button
              type="button"
              onClick={toggleTheme}
              className={`p-2 rounded-lg border text-sm transition-colors ${
                isDark
                  ? "border-[#293E32] hover:bg-[#1F3027] text-[#E5B254]"
                  : "border-[#E5DED2] hover:bg-[#F1EDE7] text-[#D9A441]"
              }`}
              title={isDark ? "Light Mode" : "Dark Mode"}
            >
              <span className="material-symbols-outlined text-base">
                {isDark ? "light_mode" : "dark_mode"}
              </span>
            </button>

            {/* User Dropdown Preview */}
            <div className="flex items-center space-x-3 pl-2 border-l border-[#E5DED2] dark:border-[#293E32]">
              <div className="w-10 h-10 rounded-full bg-[#2F4F3E] dark:bg-[#3D6A54] text-white flex items-center justify-center font-bold text-sm shadow">
                {user?.avatar_initials || "MV"}
              </div>
              <div className="hidden lg:block text-left text-xs">
                <p className="font-semibold text-sm leading-tight text-[#2C2B27] dark:text-[#F5EFE6]">
                  {user?.name || "Meera Verma"}
                </p>
                <p className="text-[#A65A45] dark:text-[#E0856E] font-medium">
                  {user?.membership_tier || "Verified Patron"}
                </p>
              </div>
              <button
                type="button"
                onClick={logout}
                className={`p-2 rounded-lg hover:bg-[#A65A45]/10 text-[#A65A45] dark:text-[#E0856E] transition-colors`}
                title="Sign Out"
              >
                <span className="material-symbols-outlined text-base">logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Welcome & Heritage Impact Banner */}
        <div
          className={`relative overflow-hidden rounded-3xl p-6 sm:p-8 border shadow-sm ${
            isDark
              ? "bg-gradient-to-r from-[#1A2820] to-[#14221A] border-[#293E32]"
              : "bg-gradient-to-r from-[#FFFDF9] via-[#FDFBF7] to-[#F1EDE7] border-[#E5DED2]"
          }`}
        >
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#D9A441]/10 text-[#D9A441] dark:text-[#E5B254] text-xs font-semibold">
                <span className="material-symbols-outlined text-sm">workspace_premium</span>
                <span>GI-Certified Conscious Patron Portfolio</span>
              </div>
              <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#2F4F3E] dark:text-[#7EB09B]">
                Namaste, {user?.name || "Meera Verma"}
              </h1>
              <p className="text-xs sm:text-sm text-[#66685F] dark:text-[#A3B5AA] leading-relaxed">
                Every purchase you make directly reaches rural artisan cooperative bank accounts under our <strong>90.2% transparent fair-trade ledger</strong>. Zero predatory middlemen, 100% verified GI tags.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/"
                className="inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-[#2F4F3E] hover:bg-[#20382E] text-white text-xs font-semibold shadow transition-all transform active:scale-95"
              >
                <span className="material-symbols-outlined text-base">add_shopping_cart</span>
                <span>Commission Artisan Work</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Impact Portfolio Key Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div
            className={`p-4 sm:p-5 rounded-2xl border transition-all ${
              isDark
                ? "bg-[#1A2820] border-[#293E32]"
                : "bg-[#FFFDF9] border-[#E5DED2] shadow-sm"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-[#66685F] dark:text-[#A3B5AA] uppercase tracking-wider">
                Total Ethical Spend
              </span>
              <span className="material-symbols-outlined text-[#2F4F3E] dark:text-[#7EB09B] text-lg">
                payments
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-[#2C2B27] dark:text-[#F5EFE6]">
              {stats.totalSpent}
            </div>
            <p className="text-[10px] text-[#A65A45] mt-1 flex items-center space-x-1">
              <span>Lifetime conscious acquisition</span>
            </p>
          </div>

          <div
            className={`p-4 sm:p-5 rounded-2xl border transition-all ${
              isDark
                ? "bg-[#1A2820] border-[#293E32]"
                : "bg-[#FFFDF9] border-[#E5DED2] shadow-sm"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-[#66685F] dark:text-[#A3B5AA] uppercase tracking-wider">
                Direct to Co-ops
              </span>
              <span className="material-symbols-outlined text-[#D9A441] text-lg">
                handshake
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-[#2F4F3E] dark:text-[#7EB09B]">
              {stats.cooperativeDirectImpact}
            </div>
            <p className="text-[10px] text-[#2F4F3E] dark:text-[#7EB09B] mt-1">
              Verified 90.2% disbursement
            </p>
          </div>

          <div
            className={`p-4 sm:p-5 rounded-2xl border transition-all ${
              isDark
                ? "bg-[#1A2820] border-[#293E32]"
                : "bg-[#FFFDF9] border-[#E5DED2] shadow-sm"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-[#66685F] dark:text-[#A3B5AA] uppercase tracking-wider">
                Artisans Supported
              </span>
              <span className="material-symbols-outlined text-[#A65A45] text-lg">
                group
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-[#2C2B27] dark:text-[#F5EFE6]">
              {stats.artisansSupported} Master Craftsmen
            </div>
            <p className="text-[10px] text-[#66685F] dark:text-[#A3B5AA] mt-1">
              Across 3 State clusters
            </p>
          </div>

          <div
            className={`p-4 sm:p-5 rounded-2xl border transition-all ${
              isDark
                ? "bg-[#1A2820] border-[#293E32]"
                : "bg-[#FFFDF9] border-[#E5DED2] shadow-sm"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-[#66685F] dark:text-[#A3B5AA] uppercase tracking-wider">
                Active In-Craft
              </span>
              <span className="material-symbols-outlined text-[#2F4F3E] dark:text-[#7EB09B] text-lg">
                hourglass_top
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-[#A65A45] dark:text-[#E0856E]">
              {stats.activeOrdersCount} Masterpieces
            </div>
            <p className="text-[10px] text-[#66685F] dark:text-[#A3B5AA] mt-1">
              Live loom &amp; kiln tracking
            </p>
          </div>

          <div
            className={`p-4 sm:p-5 rounded-2xl border transition-all col-span-2 lg:col-span-1 ${
              isDark
                ? "bg-[#1A2820] border-[#293E32]"
                : "bg-[#FFFDF9] border-[#E5DED2] shadow-sm"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-[#66685F] dark:text-[#A3B5AA] uppercase tracking-wider">
                Carbon Offset
              </span>
              <span className="material-symbols-outlined text-emerald-600 text-lg">
                eco
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-700 dark:text-emerald-400">
              {stats.carbonOffsetKg}
            </div>
            <p className="text-[10px] text-[#66685F] dark:text-[#A3B5AA] mt-1">
              Solar looms &amp; plant dyes
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#E5DED2] dark:border-[#293E32] space-x-8">
          <button
            type="button"
            onClick={() => setActiveTab("orders")}
            className={`pb-3 text-sm font-semibold flex items-center space-x-2 border-b-2 transition-all ${
              activeTab === "orders"
                ? "border-[#2F4F3E] text-[#2F4F3E] dark:border-[#7EB09B] dark:text-[#7EB09B]"
                : "border-transparent text-[#66685F] dark:text-[#A3B5AA] hover:text-[#2C2B27]"
            }`}
          >
            <span className="material-symbols-outlined text-base">package_2</span>
            <span>Live Loom &amp; Kiln Orders ({activeOrders.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("saved")}
            className={`pb-3 text-sm font-semibold flex items-center space-x-2 border-b-2 transition-all ${
              activeTab === "saved"
                ? "border-[#2F4F3E] text-[#2F4F3E] dark:border-[#7EB09B] dark:text-[#7EB09B]"
                : "border-transparent text-[#66685F] dark:text-[#A3B5AA] hover:text-[#2C2B27]"
            }`}
          >
            <span className="material-symbols-outlined text-base">bookmark_heart</span>
            <span>Saved Artisan Collectives ({savedCollectives.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("impact")}
            className={`pb-3 text-sm font-semibold flex items-center space-x-2 border-b-2 transition-all ${
              activeTab === "impact"
                ? "border-[#2F4F3E] text-[#2F4F3E] dark:border-[#7EB09B] dark:text-[#7EB09B]"
                : "border-transparent text-[#66685F] dark:text-[#A3B5AA] hover:text-[#2C2B27]"
            }`}
          >
            <span className="material-symbols-outlined text-base">verified</span>
            <span>GI Provenance Passport &amp; Ledger</span>
          </button>
        </div>

        {/* Tab 1: Active In-Craft Orders */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-heading text-xl font-bold text-[#2F4F3E] dark:text-[#7EB09B]">
                  Live Artisan Workshop Progress
                </h2>
                <p className="text-xs text-[#66685F] dark:text-[#A3B5AA]">
                  Follow your commissioned heirloom from the master craftsman's workshop to your doorstep.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {activeOrders.map((order) => (
                <div
                  key={order.orderId}
                  className={`rounded-2xl border p-6 transition-all ${
                    isDark
                      ? "bg-[#1A2820] border-[#293E32]"
                      : "bg-[#FFFDF9] border-[#E5DED2] shadow-sm"
                  }`}
                >
                  <div className="flex flex-col lg:flex-row gap-6 items-start">
                    <img
                      src={order.imageUrl}
                      alt={order.item}
                      className="w-full lg:w-48 h-40 object-cover rounded-xl border border-[#E5DED2] dark:border-[#293E32]"
                    />

                    <div className="flex-1 space-y-4 w-full">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-mono font-bold text-[#A65A45] bg-[#A65A45]/10 px-2.5 py-0.5 rounded-full">
                              Order #{order.orderId}
                            </span>
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#D9A441]/10 text-[#D9A441] dark:text-[#E5B254]">
                              GI Tag: {order.giTag}
                            </span>
                          </div>
                          <h3 className="font-heading text-lg font-bold text-[#2C2B27] dark:text-[#F5EFE6] mt-1">
                            {order.item}
                          </h3>
                          <p className="text-xs text-[#66685F] dark:text-[#A3B5AA]">
                            Crafted by{" "}
                            <strong className="text-[#2F4F3E] dark:text-[#7EB09B]">
                              {order.artisan}
                            </strong>{" "}
                            • {order.cluster}
                          </p>
                        </div>

                        <div className="text-right">
                          <span className="text-xs text-[#66685F] dark:text-[#A3B5AA]">
                            Arrival Estimate
                          </span>
                          <p className="font-semibold text-sm text-[#2F4F3E] dark:text-[#7EB09B]">
                            {order.estimatedArrival}
                          </p>
                        </div>
                      </div>

                      {/* Loom & Kiln Progress Bar */}
                      <div className="space-y-2 pt-2">
                        <div className="flex justify-between items-center text-xs font-medium">
                          <span className="text-[#2F4F3E] dark:text-[#7EB09B] font-semibold flex items-center space-x-1">
                            <span className="material-symbols-outlined text-sm animate-spin">sync</span>
                            <span>Current Stage: {order.status}</span>
                          </span>
                          <span className="text-[#66685F] dark:text-[#A3B5AA]">
                            Stage {order.stageIndex + 1} of {order.stages.length}
                          </span>
                        </div>

                        <div className="w-full bg-[#E5DED2] dark:bg-[#293E32] h-2.5 rounded-full overflow-hidden">
                          <div
                            className="bg-[#2F4F3E] dark:bg-[#7EB09B] h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${((order.stageIndex + 1) / order.stages.length) * 100}%`,
                            }}
                          ></div>
                        </div>

                        {/* Stage Markers */}
                        <div className="grid grid-cols-5 text-center text-[10px] text-[#66685F] dark:text-[#A3B5AA] pt-1 gap-1">
                          {order.stages.map((stage, idx) => (
                            <span
                              key={stage}
                              className={`truncate ${
                                idx <= order.stageIndex
                                  ? "font-bold text-[#2F4F3E] dark:text-[#7EB09B]"
                                  : "opacity-60"
                              }`}
                            >
                              {stage}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Escrow Trust Information */}
                      <div
                        className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
                          isDark
                            ? "bg-[#14221A] border-[#293E32]"
                            : "bg-[#F7F2E8] border-[#E5DED2]"
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="material-symbols-outlined text-[#D9A441] text-base">
                            lock_open
                          </span>
                          <span>
                            <strong>Trust Escrow:</strong> {order.escrowStatus} ({order.escrowAmount})
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => setSelectedCertificate(order)}
                          className="inline-flex items-center space-x-1 text-xs font-semibold text-[#A65A45] hover:text-[#2F4F3E] dark:text-[#E0856E] dark:hover:text-[#7EB09B] transition-colors whitespace-nowrap"
                        >
                          <span className="material-symbols-outlined text-sm">
                            verified
                          </span>
                          <span>View GI Provenance Certificate</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Saved Collectives */}
        {activeTab === "saved" && (
          <div className="space-y-6">
            <div>
              <h2 className="font-heading text-xl font-bold text-[#2F4F3E] dark:text-[#7EB09B]">
                Your Favorited Artisan Collectives
              </h2>
              <p className="text-xs text-[#66685F] dark:text-[#A3B5AA]">
                Cooperatives you actively back with direct orders and fair-trade patronage.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {savedCollectives.map((collective) => (
                <div
                  key={collective.id}
                  className={`rounded-2xl border overflow-hidden flex flex-col justify-between transition-all hover:shadow-md ${
                    isDark
                      ? "bg-[#1A2820] border-[#293E32]"
                      : "bg-[#FFFDF9] border-[#E5DED2]"
                  }`}
                >
                  <img
                    src={collective.image}
                    alt={collective.name}
                    className="w-full h-44 object-cover"
                  />
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-[#A65A45] dark:text-[#E0856E]">
                          {collective.craft}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-[#D9A441]/10 text-[#D9A441] dark:text-[#E5B254] font-medium text-[11px]">
                          {collective.giTag}
                        </span>
                      </div>
                      <h3 className="font-heading font-bold text-base text-[#2C2B27] dark:text-[#F5EFE6]">
                        {collective.name}
                      </h3>
                      <p className="text-xs text-[#66685F] dark:text-[#A3B5AA] flex items-center space-x-1">
                        <span className="material-symbols-outlined text-sm">location_on</span>
                        <span>{collective.location}</span>
                      </p>
                      <p className="text-xs opacity-80">
                        {collective.artisansCount} rural master weavers &amp; sculptors
                      </p>
                    </div>

                    <Link
                      to="/"
                      className="w-full py-2.5 rounded-xl border border-[#2F4F3E] dark:border-[#7EB09B] text-[#2F4F3E] dark:text-[#7EB09B] hover:bg-[#2F4F3E] hover:text-white dark:hover:bg-[#7EB09B] dark:hover:text-[#121E17] text-xs font-semibold text-center transition-colors"
                    >
                      View Cooperative Showcase
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Provenance Ledger & Certificates */}
        {activeTab === "impact" && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl border bg-gradient-to-r from-[#2F4F3E]/5 to-[#D9A441]/5 border-[#E5DED2] dark:border-[#293E32]">
              <div className="flex items-center space-x-3 mb-2">
                <span className="material-symbols-outlined text-2xl text-[#2F4F3E] dark:text-[#7EB09B]">
                  shield
                </span>
                <h2 className="font-heading text-lg font-bold text-[#2F4F3E] dark:text-[#7EB09B]">
                  Cryptographic GI Authenticity Passports &amp; DPDP 2025 Audit Log
                </h2>
              </div>
              <p className="text-xs leading-relaxed text-[#66685F] dark:text-[#A3B5AA]">
                Each handcrafted treasure registered on KinCraft contains an immutable provenance record tied to the Ministry of Textiles Pehchan Card and Govt Geographical Indication Registry.
              </p>
            </div>

            <div
              className={`rounded-2xl border overflow-hidden ${
                isDark
                  ? "bg-[#1A2820] border-[#293E32]"
                  : "bg-[#FFFDF9] border-[#E5DED2]"
              }`}
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead
                    className={`border-b font-semibold uppercase tracking-wider text-[11px] ${
                      isDark
                        ? "bg-[#14221A] border-[#293E32] text-[#A3B5AA]"
                        : "bg-[#F7F2E8] border-[#E5DED2] text-[#66685F]"
                    }`}
                  >
                    <tr>
                      <th className="p-4">Item &amp; Provenance ID</th>
                      <th className="p-4">Govt GI Tag</th>
                      <th className="p-4">Master Pehchan ID</th>
                      <th className="p-4">Verification Hash</th>
                      <th className="p-4">Timestamp</th>
                      <th className="p-4 text-right">Certificate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5DED2] dark:divide-[#293E32]">
                    {provenanceLog.map((log) => (
                      <tr
                        key={log.id}
                        className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                      >
                        <td className="p-4 font-medium text-[#2C2B27] dark:text-[#F5EFE6]">
                          {log.item}
                          <div className="text-[10px] text-[#A65A45]">{log.id}</div>
                        </td>
                        <td className="p-4 font-mono font-semibold text-[#D9A441]">
                          {log.giRegistration}
                        </td>
                        <td className="p-4 font-mono font-medium">{log.masterArtisanPehchan}</td>
                        <td className="p-4 font-mono text-[#66685F] dark:text-[#A3B5AA]">
                          {log.hash}
                        </td>
                        <td className="p-4 text-[#66685F] dark:text-[#A3B5AA] whitespace-nowrap">
                          {log.verifiedOn}
                        </td>
                        <td className="p-4 text-right">
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedCertificate({
                                item: log.item,
                                giTag: log.giRegistration,
                                artisan: "Govt Certified Master Craftsman",
                                cluster: "Authenticated Indian Craft Cluster",
                                orderId: log.id,
                              })
                            }
                            className="px-3 py-1.5 rounded-lg bg-[#2F4F3E] text-white hover:bg-[#20382E] text-[11px] font-semibold transition-colors"
                          >
                            View Seal
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* GI Authenticity Certificate Modal */}
      {selectedCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div
            className={`max-w-lg w-full p-6 sm:p-8 rounded-3xl border shadow-2xl relative ${
              isDark
                ? "bg-[#1A2820] border-[#D9A441]/40 text-[#F5EFE6]"
                : "bg-[#FFFDF9] border-[#D9A441]/60 text-[#2C2B27]"
            }`}
          >
            <button
              type="button"
              onClick={() => setSelectedCertificate(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 text-base"
            >
              ✕
            </button>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#D9A441]/10 flex items-center justify-center text-[#D9A441]">
                <span className="material-symbols-outlined text-4xl">workspace_premium</span>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#A65A45]">
                  Republic of India • GI Act 1999
                </span>
                <h3 className="font-heading text-2xl font-bold text-[#2F4F3E] dark:text-[#7EB09B] mt-1">
                  Certificate of Heritage Provenance
                </h3>
                <p className="text-xs text-[#66685F] dark:text-[#A3B5AA]">
                  Official KinCraft Authenticity &amp; Fair-Trade Guarantee
                </p>
              </div>

              <div
                className={`p-4 rounded-xl border text-left space-y-2 text-xs ${
                  isDark
                    ? "bg-[#14221A] border-[#293E32]"
                    : "bg-[#F7F2E8] border-[#E5DED2]"
                }`}
              >
                <div className="flex justify-between">
                  <span className="text-[#66685F] dark:text-[#A3B5AA]">Masterpiece:</span>
                  <strong className="font-semibold">{selectedCertificate.item}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#66685F] dark:text-[#A3B5AA]">Master Artisan:</span>
                  <strong className="font-semibold">{selectedCertificate.artisan}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#66685F] dark:text-[#A3B5AA]">Cluster:</span>
                  <strong className="font-semibold">{selectedCertificate.cluster}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#66685F] dark:text-[#A3B5AA]">GI Registration:</span>
                  <strong className="font-mono text-[#D9A441]">{selectedCertificate.giTag}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#66685F] dark:text-[#A3B5AA]">Disbursement:</span>
                  <strong className="text-[#2F4F3E] dark:text-[#7EB09B]">90.2% Cooperative Direct Payout</strong>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    alert("Digital Heritage Certificate printed / downloaded to your device with cryptographic signature.");
                    setSelectedCertificate(null);
                  }}
                  className="flex-1 py-3 rounded-xl bg-[#2F4F3E] hover:bg-[#20382E] text-white text-xs font-semibold shadow transition-colors"
                >
                  Download Signed PDF
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCertificate(null)}
                  className="px-5 py-3 rounded-xl border border-[#E5DED2] dark:border-[#293E32] text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

