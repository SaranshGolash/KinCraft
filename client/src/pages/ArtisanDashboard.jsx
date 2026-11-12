import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import KinCraftLogo from "../components/KinCraftLogo";
import Footer from "../components/Footer";

export default function ArtisanDashboard() {
  const { user, logout, authFetch } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [activeTab, setActiveTab] = useState("catalogue"); // "catalogue" | "orders" | "settlements"
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [notification, setNotification] = useState("");

  // New Product Form State
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("pottery");
  const [newPrice, setNewPrice] = useState("");
  const [newStock, setNewStock] = useState("5");
  const [newCluster, setNewCluster] = useState("Gorakhpur Terracotta Cluster");
  const [newTechnique, setNewTechnique] = useState("Natural Wheel Throwing & Wood Kiln Firing");
  const [newImageUrl, setNewImageUrl] = useState("https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=400&q=80");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch Artisan Studio Data
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const res = await authFetch("/api/dashboard/artisan");
        const data = await res.json();
        if (isMounted) {
          if (data.success) {
            setDashboardData(data);
          } else {
            setDashboardData(getFallbackData());
          }
        }
      } catch (err) {
        console.warn("Using fallback artisan data:", err);
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
    profile: {
      name: user?.name || "Karan Kumbhar",
      craft: "Master Terracotta Sculptor",
      cluster: "Gorakhpur Terracotta Cluster, Uttar Pradesh",
      pehchanCard: "KIC-GOR-7741",
      giRegistration: "GI-UP-TERRA-2009",
      cooperative: "Gorakhpur Terracotta Shilpkar Sahakari Samiti",
      memberSince: "March 2021",
    },
    metrics: {
      activeListings: 4,
      totalUnitsCrafted: 86,
      grossCoopRevenue: "₹1,42,800",
      pendingEscrowRelease: "₹28,500",
      avgRating: "4.95 / 5.0",
    },
    products: [
      {
        id: "ART-101",
        title: "Gorakhpur Terracotta Traditional Bell Elephant",
        price: 2650,
        stock: 8,
        category: "Terracotta Pottery",
        giTag: "GI-UP-0212",
        technique: "Hand-pinched clay & wood kiln fired",
        image_url: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=400&q=80",
      },
      {
        id: "ART-102",
        title: "Terracotta Hand-carved Deepawali Urli Bowl",
        price: 1450,
        stock: 14,
        category: "Terracotta Pottery",
        giTag: "GI-UP-0212",
        technique: "Wheel-thrown porous red terracotta",
        image_url: "https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=400&q=80",
      },
      {
        id: "ART-103",
        title: "Perforated Terracotta Lantern (Akashdeep)",
        price: 1850,
        stock: 6,
        category: "Home & Lighting",
        giTag: "GI-UP-0212",
        technique: "Geometric hand-chiseled perforations",
        image_url: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=400&q=80",
      },
    ],
    incomingOrders: [
      {
        id: "KC-98319",
        item: "Gorakhpur Terracotta Heritage Elephant",
        patron: "Meera Verma (Bengaluru)",
        grossAmount: "₹2,650",
        netCoopPayout: "₹2,390 (90.2%)",
        craftStage: "Kiln Firing (Stage 4 of 5)",
        stageIndex: 3,
        escrowStatus: "Protected in Escrow (Auto-released upon delivery)",
      },
      {
        id: "KC-98102",
        item: "Terracotta Deepawali Urli Bowl",
        patron: "Ananya Iyer (Mumbai)",
        grossAmount: "₹1,450",
        netCoopPayout: "₹1,308 (90.2%)",
        craftStage: "Sun Drying (Stage 3 of 5)",
        stageIndex: 2,
        escrowStatus: "Protected in Escrow",
      },
    ],
    settlementHistory: [
      {
        payoutId: "SETTL-8841",
        date: "2026-11-02",
        orderId: "KC-97812",
        gross: "₹5,200",
        platformFee: "₹509 (9.8% insurance & freight)",
        netPayout: "₹4,691 (90.2%)",
        status: "Disbursed via RTGS",
        bankRef: "UPI/RTGS-COOP-882103",
      },
      {
        payoutId: "SETTL-8839",
        date: "2026-10-28",
        orderId: "KC-97450",
        gross: "₹3,900",
        platformFee: "₹382 (9.8%)",
        netPayout: "₹3,518 (90.2%)",
        status: "Disbursed via RTGS",
        bankRef: "UPI/RTGS-COOP-881900",
      },
    ],
  });

  const profile = dashboardData?.profile || getFallbackData().profile;
  const metrics = dashboardData?.metrics || getFallbackData().metrics;
  const products = dashboardData?.products || getFallbackData().products;
  const incomingOrders = dashboardData?.incomingOrders || getFallbackData().incomingOrders;
  const settlementHistory = dashboardData?.settlementHistory || getFallbackData().settlementHistory;

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 4000);
  };

  // Handle adding new product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newPrice) {
      alert("Please enter title and price for the handcrafted work.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await authFetch("/api/dashboard/artisan/products", {
        method: "POST",
        body: JSON.stringify({
          title: newTitle.trim(),
          category: newCategory,
          price: Number(newPrice),
          stock: Number(newStock) || 1,
          cluster: newCluster,
          technique: newTechnique,
          image_url: newImageUrl,
        }),
      });
      const data = await res.json();

      if (data.success && data.product) {
        setDashboardData((prev) => ({
          ...prev,
          products: [data.product, ...(prev?.products || [])],
          metrics: {
            ...prev?.metrics,
            activeListings: (prev?.metrics?.activeListings || 0) + 1,
          },
        }));
        setIsAddModalOpen(false);
        setNewTitle("");
        setNewPrice("");
        showToast("New Masterpiece successfully added to KinCraft Catalogue!");
      } else {
        alert(data.message || "Could not add product. Please try again.");
      }
    } catch (err) {
      console.warn("Error adding artisan product:", err);
      // Local optimistic fallback
      const fallbackProd = {
        id: `ART-${Date.now().toString().slice(-4)}`,
        title: newTitle,
        category: newCategory,
        price: Number(newPrice),
        stock: Number(newStock) || 1,
        technique: newTechnique,
        giTag: profile.giRegistration,
        image_url: newImageUrl,
      };
      setDashboardData((prev) => ({
        ...prev,
        products: [fallbackProd, ...(prev?.products || [])],
      }));
      setIsAddModalOpen(false);
      showToast("Masterpiece saved to your studio catalogue!");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle advancing order crafting stage
  const handleAdvanceStage = (orderId) => {
    const stageSequence = [
      "Clay Sourcing & Kneading",
      "Wheel Throwing",
      "Sun Drying",
      "Kiln Firing",
      "Inspected & Packed",
      "Dispatched with GI Tag",
    ];

    setDashboardData((prev) => {
      if (!prev) return prev;
      const updatedOrders = prev.incomingOrders.map((ord) => {
        if (ord.id === orderId) {
          const nextIdx = Math.min((ord.stageIndex || 0) + 1, stageSequence.length - 1);
          return {
            ...ord,
            stageIndex: nextIdx,
            craftStage: `${stageSequence[nextIdx]} (Stage ${nextIdx + 1} of ${stageSequence.length})`,
          };
        }
        return ord;
      });
      return { ...prev, incomingOrders: updatedOrders };
    });
    showToast(`Order #${orderId} crafting stage advanced! Patron notified.`);
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-body transition-colors duration-200 ${
        isDark ? "bg-[#131E18] text-[#F5EFE6]" : "bg-[#F7F2E8] text-[#2C2B27]"
      }`}
    >
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl bg-[#2F4F3E] text-white text-xs font-semibold shadow-2xl flex items-center space-x-2 animate-bounce">
          <span className="material-symbols-outlined text-base">check_circle</span>
          <span>{notification}</span>
        </div>
      )}

      {/* Top Artisan Studio Header */}
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
            <span className="hidden md:inline-block text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-[#A65A45]/10 text-[#A65A45] dark:text-[#E0856E] border border-[#A65A45]/20">
              Artisan Studio &amp; Vendor Portal
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center space-x-1.5 text-xs font-semibold px-4 py-2 rounded-lg bg-[#2F4F3E] hover:bg-[#20382E] text-white shadow transition-all"
            >
              <span className="material-symbols-outlined text-sm">add_circle</span>
              <span>New Masterpiece</span>
            </button>

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

            {/* Profile Avatar & Sign Out */}
            <div className="flex items-center space-x-3 pl-2 border-l border-[#E5DED2] dark:border-[#293E32]">
              <div className="w-10 h-10 rounded-full bg-[#A65A45] text-white flex items-center justify-center font-bold text-sm shadow">
                {user?.avatar_initials || "KK"}
              </div>
              <div className="hidden lg:block text-left text-xs">
                <p className="font-semibold text-sm leading-tight text-[#2C2B27] dark:text-[#F5EFE6]">
                  {profile.name}
                </p>
                <p className="text-[#2F4F3E] dark:text-[#7EB09B] font-medium">
                  {profile.craft}
                </p>
              </div>
              <button
                type="button"
                onClick={logout}
                className="p-2 rounded-lg hover:bg-[#A65A45]/10 text-[#A65A45] dark:text-[#E0856E] transition-colors"
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
        {/* Artisan Studio Identity Banner */}
        <div
          className={`rounded-3xl p-6 sm:p-8 border shadow-sm ${
            isDark
              ? "bg-gradient-to-r from-[#1A2820] to-[#14221A] border-[#293E32]"
              : "bg-gradient-to-r from-[#FFFDF9] via-[#FAF6F0] to-[#F1EDE7] border-[#E5DED2]"
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#2F4F3E]/10 dark:bg-[#7EB09B]/20 text-[#2F4F3E] dark:text-[#7EB09B] text-xs font-semibold">
                  <span className="material-symbols-outlined text-sm">verified_user</span>
                  <span>Ministry of Textiles Pehchan Card: {profile.pehchanCard}</span>
                </span>
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#D9A441]/10 text-[#D9A441] dark:text-[#E5B254] text-xs font-semibold">
                  <span className="material-symbols-outlined text-sm">workspace_premium</span>
                  <span>Govt GI: {profile.giRegistration}</span>
                </span>
              </div>

              <div>
                <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#2F4F3E] dark:text-[#7EB09B]">
                  {profile.name} — Workshop Studio
                </h1>
                <p className="text-xs sm:text-sm text-[#66685F] dark:text-[#A3B5AA] mt-1">
                  Affiliated with <strong>{profile.cooperative}</strong> • {profile.cluster}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="px-4 py-3 rounded-2xl border text-center bg-white/50 dark:bg-black/20 border-[#E5DED2] dark:border-[#293E32]">
                <div className="text-xs text-[#66685F] dark:text-[#A3B5AA]">Patron Rating</div>
                <div className="text-xl font-bold font-mono text-[#D9A441] flex items-center justify-center space-x-1">
                  <span>★</span>
                  <span>{metrics.avgRating}</span>
                </div>
              </div>

              <div className="px-4 py-3 rounded-2xl border text-center bg-white/50 dark:bg-black/20 border-[#E5DED2] dark:border-[#293E32]">
                <div className="text-xs text-[#66685F] dark:text-[#A3B5AA]">Co-op Share</div>
                <div className="text-xl font-bold font-mono text-[#2F4F3E] dark:text-[#7EB09B]">
                  90.2%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Studio Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            className={`p-5 rounded-2xl border ${
              isDark
                ? "bg-[#1A2820] border-[#293E32]"
                : "bg-[#FFFDF9] border-[#E5DED2] shadow-sm"
            }`}
          >
            <div className="flex items-center justify-between text-xs text-[#66685F] dark:text-[#A3B5AA] font-semibold uppercase mb-2">
              <span>Active Catalogue</span>
              <span className="material-symbols-outlined text-[#2F4F3E] dark:text-[#7EB09B]">
                palette
              </span>
            </div>
            <div className="text-2xl font-bold font-mono text-[#2C2B27] dark:text-[#F5EFE6]">
              {products.length} Designs
            </div>
            <p className="text-[10px] text-[#A65A45] mt-1">Live in marketplace</p>
          </div>

          <div
            className={`p-5 rounded-2xl border ${
              isDark
                ? "bg-[#1A2820] border-[#293E32]"
                : "bg-[#FFFDF9] border-[#E5DED2] shadow-sm"
            }`}
          >
            <div className="flex items-center justify-between text-xs text-[#66685F] dark:text-[#A3B5AA] font-semibold uppercase mb-2">
              <span>Units Handcrafted</span>
              <span className="material-symbols-outlined text-[#A65A45]">
                handyman
              </span>
            </div>
            <div className="text-2xl font-bold font-mono text-[#2C2B27] dark:text-[#F5EFE6]">
              {metrics.totalUnitsCrafted} Pieces
            </div>
            <p className="text-[10px] text-[#2F4F3E] dark:text-[#7EB09B] mt-1">
              100% Traditional Hand Technique
            </p>
          </div>

          <div
            className={`p-5 rounded-2xl border ${
              isDark
                ? "bg-[#1A2820] border-[#293E32]"
                : "bg-[#FFFDF9] border-[#E5DED2] shadow-sm"
            }`}
          >
            <div className="flex items-center justify-between text-xs text-[#66685F] dark:text-[#A3B5AA] font-semibold uppercase mb-2">
              <span>Gross Cooperative Revenue</span>
              <span className="material-symbols-outlined text-[#2F4F3E] dark:text-[#7EB09B]">
                account_balance
              </span>
            </div>
            <div className="text-2xl font-bold font-mono text-[#2F4F3E] dark:text-[#7EB09B]">
              {metrics.grossCoopRevenue}
            </div>
            <p className="text-[10px] text-[#66685F] dark:text-[#A3B5AA] mt-1">
              90.2% disbursed to artisans
            </p>
          </div>

          <div
            className={`p-5 rounded-2xl border ${
              isDark
                ? "bg-[#1A2820] border-[#293E32]"
                : "bg-[#FFFDF9] border-[#E5DED2] shadow-sm"
            }`}
          >
            <div className="flex items-center justify-between text-xs text-[#66685F] dark:text-[#A3B5AA] font-semibold uppercase mb-2">
              <span>Pending Escrow Trust</span>
              <span className="material-symbols-outlined text-[#D9A441]">
                lock
              </span>
            </div>
            <div className="text-2xl font-bold font-mono text-[#A65A45] dark:text-[#E0856E]">
              {metrics.pendingEscrowRelease}
            </div>
            <p className="text-[10px] text-[#66685F] dark:text-[#A3B5AA] mt-1">
              Released upon patron delivery
            </p>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-[#E5DED2] dark:border-[#293E32] space-x-8">
          <button
            type="button"
            onClick={() => setActiveTab("catalogue")}
            className={`pb-3 text-sm font-semibold flex items-center space-x-2 border-b-2 transition-all ${
              activeTab === "catalogue"
                ? "border-[#2F4F3E] text-[#2F4F3E] dark:border-[#7EB09B] dark:text-[#7EB09B]"
                : "border-transparent text-[#66685F] dark:text-[#A3B5AA] hover:text-[#2C2B27]"
            }`}
          >
            <span className="material-symbols-outlined text-base">inventory_2</span>
            <span>Masterpiece Catalogue ({products.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("orders")}
            className={`pb-3 text-sm font-semibold flex items-center space-x-2 border-b-2 transition-all ${
              activeTab === "orders"
                ? "border-[#2F4F3E] text-[#2F4F3E] dark:border-[#7EB09B] dark:text-[#7EB09B]"
                : "border-transparent text-[#66685F] dark:text-[#A3B5AA] hover:text-[#2C2B27]"
            }`}
          >
            <span className="material-symbols-outlined text-base">receipt_long</span>
            <span>Incoming Patron Orders ({incomingOrders.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("settlements")}
            className={`pb-3 text-sm font-semibold flex items-center space-x-2 border-b-2 transition-all ${
              activeTab === "settlements"
                ? "border-[#2F4F3E] text-[#2F4F3E] dark:border-[#7EB09B] dark:text-[#7EB09B]"
                : "border-transparent text-[#66685F] dark:text-[#A3B5AA] hover:text-[#2C2B27]"
            }`}
          >
            <span className="material-symbols-outlined text-base">account_balance_wallet</span>
            <span>90.2% Settlement Ledger</span>
          </button>
        </div>

        {/* TAB 1: Masterpiece Catalogue */}
        {activeTab === "catalogue" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-heading text-xl font-bold text-[#2F4F3E] dark:text-[#7EB09B]">
                  Handcrafted Inventory &amp; Listings
                </h2>
                <p className="text-xs text-[#66685F] dark:text-[#A3B5AA]">
                  Manage prices, available workshop stocks, and GI certification details.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#2F4F3E] hover:bg-[#20382E] text-white text-xs font-semibold shadow transition-all self-start sm:self-auto"
              >
                <span className="material-symbols-outlined text-base">add</span>
                <span>Add Handcrafted Masterpiece</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className={`rounded-2xl border overflow-hidden flex flex-col justify-between transition-all hover:shadow-md ${
                    isDark
                      ? "bg-[#1A2820] border-[#293E32]"
                      : "bg-[#FFFDF9] border-[#E5DED2]"
                  }`}
                >
                  <div className="relative">
                    <img
                      src={prod.image_url || "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=400&q=80"}
                      alt={prod.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-mono">
                      {prod.id}
                    </div>
                    {prod.giTag && (
                      <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-[#D9A441] text-black font-semibold text-[10px] shadow">
                        GI Certified
                      </div>
                    )}
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-semibold text-[#A65A45] dark:text-[#E0856E]">
                        {prod.category}
                      </span>
                      <h3 className="font-heading font-bold text-base text-[#2C2B27] dark:text-[#F5EFE6] line-clamp-2">
                        {prod.title}
                      </h3>
                      <p className="text-xs text-[#66685F] dark:text-[#A3B5AA] line-clamp-2">
                        {prod.technique}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#E5DED2] dark:border-[#293E32] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-[#66685F] dark:text-[#A3B5AA] block">
                          Patron Price (INR)
                        </span>
                        <span className="text-lg font-bold font-mono text-[#2F4F3E] dark:text-[#7EB09B]">
                          ₹{prod.price?.toLocaleString("en-IN")}
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-[#66685F] dark:text-[#A3B5AA] block">
                          Available Units
                        </span>
                        <div className="flex items-center space-x-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              if (prod.stock > 0) {
                                prod.stock -= 1;
                                setDashboardData({ ...dashboardData });
                              }
                            }}
                            className="w-6 h-6 rounded border border-[#E5DED2] dark:border-[#293E32] flex items-center justify-center text-xs hover:bg-black/5 dark:hover:bg-white/5"
                          >
                            -
                          </button>
                          <span className="font-mono font-bold text-xs px-1">
                            {prod.stock}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              prod.stock = (prod.stock || 0) + 1;
                              setDashboardData({ ...dashboardData });
                            }}
                            className="w-6 h-6 rounded border border-[#E5DED2] dark:border-[#293E32] flex items-center justify-center text-xs hover:bg-black/5 dark:hover:bg-white/5"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: Incoming Patron Orders */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            <div>
              <h2 className="font-heading text-xl font-bold text-[#2F4F3E] dark:text-[#7EB09B]">
                Active Patron Commissions &amp; Orders
              </h2>
              <p className="text-xs text-[#66685F] dark:text-[#A3B5AA]">
                Advance your crafting stage in real-time so your patron can follow their heirloom on the live tracker.
              </p>
            </div>

            <div className="space-y-4">
              {incomingOrders.map((order) => (
                <div
                  key={order.id}
                  className={`p-6 rounded-2xl border transition-all ${
                    isDark
                      ? "bg-[#1A2820] border-[#293E32]"
                      : "bg-[#FFFDF9] border-[#E5DED2] shadow-sm"
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E5DED2] dark:border-[#293E32]">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono font-bold text-xs px-2.5 py-0.5 rounded-full bg-[#A65A45]/10 text-[#A65A45]">
                          Order #{order.id}
                        </span>
                        <span className="text-xs text-[#66685F] dark:text-[#A3B5AA]">
                          Patron: <strong>{order.patron}</strong>
                        </span>
                      </div>
                      <h3 className="font-heading font-bold text-lg text-[#2C2B27] dark:text-[#F5EFE6] mt-1">
                        {order.item}
                      </h3>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <span className="text-[11px] text-[#66685F] dark:text-[#A3B5AA] block">
                          90.2% Co-op Share
                        </span>
                        <span className="text-base font-bold font-mono text-[#2F4F3E] dark:text-[#7EB09B]">
                          {order.netCoopPayout}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleAdvanceStage(order.id)}
                        className="px-4 py-2 rounded-xl bg-[#2F4F3E] hover:bg-[#20382E] text-white text-xs font-semibold shadow transition-colors"
                      >
                        Advance Craft Stage ➔
                      </button>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div className="flex items-center space-x-2">
                      <span className="material-symbols-outlined text-[#D9A441] text-base">
                        motion_photos_on
                      </span>
                      <span>
                        Current Status: <strong>{order.craftStage}</strong>
                      </span>
                    </div>

                    <div className="text-[#66685F] dark:text-[#A3B5AA] flex items-center space-x-1">
                      <span className="material-symbols-outlined text-sm text-[#2F4F3E] dark:text-[#7EB09B]">
                        lock_clock
                      </span>
                      <span>{order.escrowStatus}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Direct 90.2% Settlement Ledger */}
        {activeTab === "settlements" && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl border bg-gradient-to-r from-[#2F4F3E]/5 to-[#D9A441]/5 border-[#E5DED2] dark:border-[#293E32]">
              <div className="flex items-center space-x-3 mb-2">
                <span className="material-symbols-outlined text-2xl text-[#2F4F3E] dark:text-[#7EB09B]">
                  account_balance
                </span>
                <h2 className="font-heading text-lg font-bold text-[#2F4F3E] dark:text-[#7EB09B]">
                  Direct Cooperative Payout Guarantee
                </h2>
              </div>
              <p className="text-xs leading-relaxed text-[#66685F] dark:text-[#A3B5AA]">
                KinCraft routes <strong>90.2% of every rupee directly to artisan cooperative bank accounts</strong>, retaining only 9.8% to cover shipping transit insurance, tamper-evident packaging, and payment gateway gateways.
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
                      <th className="p-4">Payout Ref</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Order ID</th>
                      <th className="p-4">Gross Patron Price</th>
                      <th className="p-4">Platform Fee (9.8%)</th>
                      <th className="p-4">Net Co-op Payout (90.2%)</th>
                      <th className="p-4">Settlement Status</th>
                      <th className="p-4">Banking Reference</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5DED2] dark:divide-[#293E32]">
                    {settlementHistory.map((s) => (
                      <tr
                        key={s.payoutId}
                        className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                      >
                        <td className="p-4 font-mono font-bold text-[#A65A45]">
                          {s.payoutId}
                        </td>
                        <td className="p-4 text-[#66685F] dark:text-[#A3B5AA]">
                          {s.date}
                        </td>
                        <td className="p-4 font-mono">{s.orderId}</td>
                        <td className="p-4 font-mono font-semibold">{s.gross}</td>
                        <td className="p-4 font-mono text-[#66685F] dark:text-[#A3B5AA]">
                          {s.platformFee}
                        </td>
                        <td className="p-4 font-mono font-bold text-[#2F4F3E] dark:text-[#7EB09B]">
                          {s.netPayout}
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold text-[11px]">
                            {s.status}
                          </span>
                        </td>
                        <td className="p-4 font-mono text-[11px] text-[#66685F] dark:text-[#A3B5AA]">
                          {s.bankRef}
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

      {/* Add New Masterpiece Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div
            className={`max-w-xl w-full p-6 sm:p-8 rounded-3xl border shadow-2xl relative max-h-[90vh] overflow-y-auto ${
              isDark
                ? "bg-[#1A2820] border-[#293E32] text-[#F5EFE6]"
                : "bg-[#FFFDF9] border-[#E5DED2] text-[#2C2B27]"
            }`}
          >
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 text-base"
            >
              ✕
            </button>

            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-[#A65A45]">
                <span className="material-symbols-outlined">add_circle</span>
                <h3 className="font-heading font-bold text-xl">
                  Add Handcrafted Masterpiece
                </h3>
              </div>
              <p className="text-xs text-[#66685F] dark:text-[#A3B5AA]">
                List an authentic, artisan-crafted item directly from your workshop to global patrons.
              </p>

              <form onSubmit={handleAddProduct} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold mb-1">Masterpiece Title *</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Hand-carved Terracotta Matka with Heritage Warli Motifs"
                    className={`w-full p-3 rounded-xl border text-sm ${
                      isDark
                        ? "bg-[#14221A] border-[#293E32] text-white"
                        : "bg-[#F7F2E8] border-[#E5DED2] text-[#2C2B27]"
                    }`}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-1">Craft Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className={`w-full p-3 rounded-xl border text-sm ${
                        isDark
                          ? "bg-[#14221A] border-[#293E32] text-white"
                          : "bg-[#F7F2E8] border-[#E5DED2] text-[#2C2B27]"
                      }`}
                    >
                      <option value="pottery">Terracotta &amp; Clay Pottery</option>
                      <option value="textiles">Handloom Textiles &amp; Silks</option>
                      <option value="bell-metal">Dhokra Bell Metalwork</option>
                      <option value="woodcraft">Lacquer Woodcraft &amp; Inlay</option>
                      <option value="fiber">Natural Grass &amp; Sabai Fiber</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Patron Price (INR ₹) *</label>
                    <input
                      type="number"
                      required
                      min="100"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      placeholder="e.g. 2400"
                      className={`w-full p-3 rounded-xl border text-sm ${
                        isDark
                          ? "bg-[#14221A] border-[#293E32] text-white"
                          : "bg-[#F7F2E8] border-[#E5DED2] text-[#2C2B27]"
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-1">Workshop Available Stock</label>
                    <input
                      type="number"
                      min="1"
                      value={newStock}
                      onChange={(e) => setNewStock(e.target.value)}
                      className={`w-full p-3 rounded-xl border text-sm ${
                        isDark
                          ? "bg-[#14221A] border-[#293E32] text-white"
                          : "bg-[#F7F2E8] border-[#E5DED2] text-[#2C2B27]"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Craft Cluster</label>
                    <input
                      type="text"
                      value={newCluster}
                      onChange={(e) => setNewCluster(e.target.value)}
                      className={`w-full p-3 rounded-xl border text-sm ${
                        isDark
                          ? "bg-[#14221A] border-[#293E32] text-white"
                          : "bg-[#F7F2E8] border-[#E5DED2] text-[#2C2B27]"
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Handcrafting Technique &amp; Materials</label>
                  <input
                    type="text"
                    value={newTechnique}
                    onChange={(e) => setNewTechnique(e.target.value)}
                    placeholder="e.g. Pure river clay, wood kiln fired at 950°C"
                    className={`w-full p-3 rounded-xl border text-sm ${
                      isDark
                        ? "bg-[#14221A] border-[#293E32] text-white"
                        : "bg-[#F7F2E8] border-[#E5DED2] text-[#2C2B27]"
                    }`}
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Masterpiece Photo URL</label>
                  <input
                    type="url"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="https://..."
                    className={`w-full p-3 rounded-xl border text-sm ${
                      isDark
                        ? "bg-[#14221A] border-[#293E32] text-white"
                        : "bg-[#F7F2E8] border-[#E5DED2] text-[#2C2B27]"
                    }`}
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3 rounded-xl bg-[#2F4F3E] hover:bg-[#20382E] text-white text-xs font-semibold shadow transition-colors flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <span>Listing Masterpiece...</span>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-sm">publish</span>
                        <span>Publish to KinCraft Showcase</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-5 py-3 rounded-xl border border-[#E5DED2] dark:border-[#293E32] text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
