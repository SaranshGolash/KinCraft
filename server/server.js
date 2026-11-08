const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// IN-MEMORY STORE
const mockData = {
  categories: [
    {
      id: "pottery",
      name: "Terracotta & Clay",
      place: "Molela / Bankura",
      material: "Sacred temple plaques, planters & cooling pots",
      artisan_count_label: "84 Master Artisans",
      image_url:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAWeJWibwXamXUwR9L52PQOV8ZvrnhbhmRw-JR7RsAlcnI2ZTg5an5veOjpQiSY38vra5LmrFto3XHqVj5b9N6_5JcSc-s3dj7G1_o2a0obvekfjqqlymBhNlAQN9IN7u3m5k28RNuvBxR64iclUY-roio9eyilpATHVqFMtCsUjRrxtWyVZz_ZvJEK1JFZ-2gKX2S4tdTxT0Ql7atte9Wy-6NEvxBDP8waYlegDb-4",
      alt_text:
        "Traditional terracotta clay vessels and decorative earthen pots",
    },
    {
      id: "textiles",
      name: "Handloom Textiles",
      place: "Chanderi / Pochampally",
      material: "Natural indigo stoles, pure silk sarees & dupattas",
      artisan_count_label: "142 Master Weavers",
      image_url:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAjDQH-KoL6X8srolSE8KOFyl7ZSJpxbaWr0FQk-nCTU-qhQvgMdr7JEEhvAj9L7nRFJY66ykD0xICabtPhQ2I73d4l-_zl-oNUEWyfAEqI-n9Eb5311wA8b5uC_sBQi1D7r9KGUnN3LDlfpf8J_O8inPYZWv5kAR_tCBUARHnKhKH2hvFllSRxAzoidLW1X3_QBuloiQ7GF7PLE0NBCSV3l0NHSnGbdbViqm3BoIju",
      alt_text: "Indian handloom weaver working on a wooden pit loom",
    },
    {
      id: "bell-metal",
      name: "Dhokra Bell Metal",
      place: "Bastar, Chhattisgarh",
      material: "4,000-year-old lost-wax tribal bronze casting",
      artisan_count_label: "61 Metal Casters",
      image_url:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAu36giIZyaPZGLECVO8E4btYtxyWSWrnUADcoG7jRfJ22E2pDmxQyLgnfReRqzDsiN5U9uhdtiusCv5bLnAfl5NJwFIf4nblRGLIqFnXpjvDUNh8w9xtI7tJKUuuN-ynRNkymjTPEtdZeNbZhNweICVv_4WhODNW5v7eAu-o9Xk24Htgj7kmr-ATOp03j8ygrrHIxVV5J0G9wvUo-fasrS7KlcqPBCkq95Wq4QZB0B",
      alt_text: "Dhokra lost-wax bell metal handcrafted brass figurines",
    },
    {
      id: "woodcraft",
      name: "Lacquer Woodcraft",
      place: "Channapatna, KA",
      material: "Vegetable-dyed non-toxic turned ivory woodcraft",
      artisan_count_label: "55 Wood Crafters",
      image_url:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCv4V2nQ2p_8CnoTBOfMdozBUnK8NLN5Mu7flnb5e6-Fq4o2EJyqijLJojrQSHuYDSfspv6P22T-3ngUpVHBSIZe_lMdLn8AjeDV0Cwl2AtzJuP3LNo1aJibP6Rx7HuIr_58tE0CUwn7l8T8wAJJE6ZSLyP2FFB0y0EGSR19aTzANMnfHnd4nbzzBod0TQUdj9KZGA172LASXSugNWWyKrBdrQupGBDFa04saytjLIO",
      alt_text: "Channapatna natural vegetable dye lacquer turned wooden toys",
    },
    {
      id: "fiber",
      name: "Natural Sabai Fiber",
      place: "Mayurbhanj, Odisha",
      material: "Biodegradable hand-braided grass storage & baskets",
      artisan_count_label: "98 SHG Weavers",
      image_url:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCTVg_joGiUji5wRw1boRh1QiYvAKOENaHAuGnB1PNCCWhS155u6IVaEqPDlFwGxIsGymafznRHljH4sTc-englEuKb0Lh7Uq32gjuPzeKuSbPPSbRPuNCkqljOiLQlcziJNv53dDQKi9FpJhdXZrHeZK7WQm3M9hdE-WYN3tUo0kgS0exmQuXIj9o31_rWmSma-pKgYdEi52kX3Bu10b36BWM6uCi-kbsAirklphza",
      alt_text: "Rural women weaving golden sabai grass and natural river reed",
    },
  ],
  artisans: [
    {
      id: 1,
      name: "Devji Premji Vankar",
      merit_title: "National Merit Awardee 2018",
      cluster_origin: "Bhujodi, Kutch, Gujarat",
      lineage_experience: "42 Years Loom Practice",
      gi_cert_number: "GC-GUJ-014",
      loom_technique: "Extra-Weft Throw Loom",
      natural_materials: "Wild Indigo, Madder, Iron",
      quote:
        "When I throw the wooden shuttle through the warp, I am not merely joining threads—I am carrying forward seven generations of ancestral songs woven into raw sheep wool.",
      bio: "Devji Bhai heads a cooperative of 26 weaving families in Bhujodi village. Through GramCraft's direct platform settlement, his collective receives full fair wages within 48 hours of shipment dispatch, completely bypassing city wholesaler discounting.",
      rating: 5.0,
      review_count: 184,
      image_url:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCr1DVEtlMyOZalipXtV2MfWftO3qLvDuHgLL4eqjeEksuvK6IoGTOKxS5t4njJfu6OLtd7p55DDyjrmI7tPbf4U0MeXO7VVeuwQirG8g0OgD-pg0ZF2kaxV_iVxDfpXwL19LFl7qy6eTPUhdUIfqxGoXMc_UgLz8VFdKOadwzotNsqk7aGccYblyaaUHGa5cU-JCG2Wfi9S3EK2mPHnGzfIpej2aBcdQB6qMdkE_eE",
      cooperative_name: "Bhujodi Vankar Weavers Cooperative",
      cooperative_families: 26,
      payout_percentage: 90,
      is_spotlight: true,
    },
    {
      id: 2,
      name: "Smt. Kamala Devi",
      merit_title: "4th Generation Master Potter",
      cluster_origin: "Molela, Rajsamand, Rajasthan",
      lineage_experience: "35 Years Ceramic Practice",
      gi_cert_number: "IN-420-CLAY",
      loom_technique: "Hollow Relief Hand Sculpting",
      natural_materials: "Molela Terracotta Clay & Silt",
      quote:
        "Our clay is mixed with the river silt of Banas. Each sun plaque brings warmth and divine protection to the home.",
      bio: "Smt. Kamala Devi leads a revered multi-generational potting household in Molela, keeping the sacred terracotta temple votive plaques tradition alive.",
      rating: 4.9,
      review_count: 142,
      image_url:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAeDb3Xo9KjpEPZSDIBL82sPLwCiGuHdzDrhX-pW4auPBfriL2nj2gACO2KvzjjKXXYJWfLTG6yrZPiO61ivY3j2fBwbZ_2wvx6xzqDLMqgUyEzNjyHEKHuyjuzXD8pI1goarcMdgt-C4Z6vDVsfv6MSI8drMXBYLlTCz7j678PFkuP3nFEoR3sjfefB3KfWT-YN53CK_wvHdRJL4ACk7OfNI_Iuj9VN80NwDyiqHGO",
      cooperative_name: "Molela Earthen Guild",
      cooperative_families: 18,
      payout_percentage: 90,
      is_spotlight: false,
    },
    {
      id: 3,
      name: "Somaru Ram Kashyap",
      merit_title: "Tribal Bronze Master Craftsman",
      cluster_origin: "Kondagaon, Bastar, Chhattisgarh",
      lineage_experience: "28 Years Metal Casting",
      gi_cert_number: "IN-CT-DHOKRA-09",
      loom_technique: "Lost-Wax Bell Metal Casting",
      natural_materials: "Recycled Brass, Beeswax & Red Clay",
      quote:
        "The wax thread remembers the form; the molten brass breathes permanence into tribal spirits.",
      bio: "Somaru Ram works with the Ghadwa tribal collective in the deep sal forests of Bastar, casting antique heirloom bell-metal relics.",
      rating: 4.8,
      review_count: 96,
      image_url:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAu36giIZyaPZGLECVO8E4btYtxyWSWrnUADcoG7jRfJ22E2pDmxQyLgnfReRqzDsiN5U9uhdtiusCv5bLnAfl5NJwFIf4nblRGLIqFnXpjvDUNh8w9xtI7tJKUuuN-ynRNkymjTPEtdZeNbZhNweICVv_4WhODNW5v7eAu-o9Xk24Htgj7kmr-ATOp03j8ygrrHIxVV5J0G9wvUo-fasrS7KlcqPBCkq95Wq4QZB0B",
      cooperative_name: "Bastar Ghadwa Artisan Union",
      cooperative_families: 14,
      payout_percentage: 90,
      is_spotlight: false,
    },
  ],
  products: [
    {
      id: "molela-terracotta",
      name: "Surya Dev Votive Terracotta Wall Icon",
      category_id: "pottery",
      artisan_id: 2,
      crafter_name: "Crafted by Smt. Kamala Devi • Molela, Rajasthan",
      location_tag: "GI Tagged • Molela",
      material_tag: "Terracotta Clay",
      time_to_make: "Handmade in 7 days",
      price: 1850.0,
      rating: 4.9,
      review_count: 42,
      filters: ["all", "gi", "home", "living"],
      image_url:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDeoLOovA1aF1jr4ZEo6yLy0mJ0KQWSpWHVCFn4z4OFWXmpUX6NfnbCk0mHNkCwcS8UiXSDmXvlwCMjNyXmGnmGXA5VoIqGVnKAWU9CKw-CSDIxPRQIMXhU5elo3PUkEXHN9BBMh60HSVJ0bVPM35SMp_GU4VBaBfgpCqJXzj7qMApNV0CU7roM94lRCBuQJsWdinRtzMOuuUy5uY9a1ZnWqHvU8g6G6LljbSoNsxyp",
      alt_text:
        "Authentic Molela votive terracotta clay wall plaque depicting a sacred sun and village deity",
      stock_quantity: 12,
    },
    {
      id: "dhabla-shawl",
      name: "Ancestral Handspun Dhabla Wool Shawl",
      category_id: "textiles",
      artisan_id: 1,
      crafter_name: "Crafted by Devji Premji Vankar • Bhujodi, Gujarat",
      location_tag: "GI Tagged • Kutch",
      material_tag: "Indigenous Desi Wool",
      time_to_make: "Handmade in 14 days",
      price: 3850.0,
      rating: 5.0,
      review_count: 68,
      filters: ["all", "gi", "wearable", "living"],
      image_url:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBbgVKvzxHshb8tYIgls_5oWQj6AzI_CEXcY1rmcG3oOVm_J7OFiDogK68eLD6QmNFrHRuuBoATEpzC7f8yz_J31L3jOqg0tkCWvMGR1BDkPVD7FRIe9ydYz64rEUReSHQRSOsh85IQwfsRS-bCEVms_ShXFGvoFZXSUAUXgPNJZ4AsMOZ3aUKj_3XeIOpkbFgX4Fh0nLzBdbHPxY6bFejTw4V5pZHJ2fZGIQgEJIqm",
      alt_text:
        "Traditional Kutch handwoven desi wool Dhabla shawl with mirrorwork borders",
      stock_quantity: 8,
    },
    {
      id: "bastar-nandi",
      name: "Lost-Wax Bastar Nandi Sculpture",
      category_id: "bell-metal",
      artisan_id: 3,
      crafter_name: "Crafted by Somaru Ram Kashyap • Kondagaon, Chhattisgarh",
      location_tag: "GI Tagged • Bastar",
      material_tag: "Bell Metal & Beeswax",
      time_to_make: "Handmade in 9 days",
      price: 2200.0,
      rating: 4.8,
      review_count: 29,
      filters: ["all", "gi", "home", "living"],
      image_url:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA4inTY7DKQsHH8ROT0MjyUfxTFZsXvdkmlL-TiButdxGCYJ5gCV8sAhw45qklQKrUYwN9Mxuk854AkKvGrkFfHmgVW6zQH_oA_vzhGqetcx8BZ75zKsF4uXtF-_pjJn6dY-jz4Hvnbb4WNH5JK1_8Xz0Vjf3O3qZxrCeS0JXy4TdBjs5-yl0qb_hvtJmfoSAvH5BEaSQ0s65F9DKgGWNYlYcSBGR1w8wIWQD-kJebY",
      alt_text:
        "Bastar Dhokra cast brass sacred bull sculpture with delicate hand-coiled wax cord patterns",
      stock_quantity: 15,
    },
    {
      id: "pochampally-ikat",
      name: "Double-Ikat Silk Chevron Stole",
      category_id: "textiles",
      artisan_id: 1,
      crafter_name:
        "Crafted by B. Anjaiah Weavers' Trust • Bhoodan Pochampally",
      location_tag: "GI Tagged • Telangana",
      material_tag: "100% Mulberry Silk",
      time_to_make: "Handmade in 11 days",
      price: 2850.0,
      rating: 4.9,
      review_count: 53,
      filters: ["all", "gi", "wearable"],
      image_url:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBR1RD9TVnjiTcfxZa9y8IaJFYhKJhaxesQOdPLHCY1FgepM1F19C0RTAH14qzHt7MFbIv8IHYFY6BAVbSGu_JRt-bq3TUp0FBZrNSPT5uvNUNwOwRWbfuAq-HoPys805CpXRNPVAGpip2GDbnOTijPBW5iShZfJ_cDb5-W0tbco85h86fANfokAGay85jGKgxnkQiCJYU3RlitpavG2jm1iMor2o9v-ltkgOs9OHC5",
      alt_text:
        "Pochampally double ikat silk fabric stole in rich turmeric yellow and deep madder red",
      stock_quantity: 20,
    },
    {
      id: "channapatna-nesting",
      name: "Geometric Lacquer Architectural Nesting Set",
      category_id: "woodcraft",
      artisan_id: 1,
      crafter_name: "Crafted by Syed Noor Lathe Studio • Channapatna, KA",
      location_tag: "GI Tagged • Karnataka",
      material_tag: "Hale Wood & Veg Lac",
      time_to_make: "Handmade in 3 days",
      price: 1150.0,
      rating: 4.7,
      review_count: 31,
      filters: ["all", "gi", "home"],
      image_url:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCX8tO6L07diEGA4-6ZPqSKhJhNiE3vhoSxaxLafj91Qtw6jch-pRZ2H5fqqmPgHf0S2-Szn-wtLrpFLgyyi7Fj8TL8ROZk8lTY98ZyRt8c5J6CymYK7Vkuw2m4hQw09xh8mrcBdge_X99PpQAfPa0Rjn_RpN8y2mu0slMXyc_6wi2R41ewS1nJHZfA5S-M2AFOdh8BLfZLrocySZbOtfiyLarTudVsDnFf-WtJCS7r",
      alt_text:
        "Channapatna turned wood stacking toy made of ivory wood with smooth natural vegetable lac finishes",
      stock_quantity: 25,
    },
    {
      id: "mayurbhanj-sabai",
      name: "Mayurbhanj Coiled Sabai Floor Planter",
      category_id: "fiber",
      artisan_id: 2,
      crafter_name: "Crafted by Maa Tarini Women SHG • Baripada, Odisha",
      location_tag: "Heritage Cluster • Odisha",
      material_tag: "Sun-Cured Sabai Grass",
      time_to_make: "Handmade in 4 days",
      price: 950.0,
      rating: 4.9,
      review_count: 47,
      filters: ["all", "home", "living"],
      image_url:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuASioNwOFrAVM9WqKtyYV50riKGJkSvXJjNkd7_kav496K6WAbyszUuVvGpgP53u24zkI8O7wk8IiEUJtN2eqNsIaZA0Zolb55M5AvVYM_WXdTTRbzngS68BuFs1B2jJoiubl9rbVWldWBWXBw0HvYvoLuE1aNp304-aiiD3jOmClDdAyGU4iQ1eahevkhtb842wEU_foylQIj472tuM5D7lMEkARaPwOPw7cRdmloT",
      alt_text:
        "Hand braided Sabai grass tall woven storage planter basket with dark forest green cotton interwoven handles",
      stock_quantity: 18,
    },
  ],
  cart: [
    { product_id: "molela-terracotta", quantity: 1 },
    { product_id: "dhabla-shawl", quantity: 1 },
  ],
  wishlist: ["bastar-nandi", "pochampally-ikat", "channapatna-nesting"],
  orders: [
    {
      id: 1,
      order_number: "ORD-20261108-1001",
      total_amount: 5700.0,
      artisan_direct_payout: 5130.0,
      platform_tech_fee: 570.0,
      middleman_cut: 0.0,
      status: "settled",
      shipping_address:
        "Flat 402, Nilgiri Heights, Indiranagar, Bengaluru 560038",
      created_at: new Date().toISOString(),
    },
  ],
};

// DATABASE CLIENT INITIALIZATION & FALLBACK DETECTION
let pool = null;
let isDbConnected = false;

async function initDb() {
  const config = {
    host: process.env.DB_HOST || "127.0.0.1",
    port: parseInt(process.env.DB_PORT || "5432", 10),
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "kincraft_db",
    connectionTimeoutMillis: 3000,
  };

  try {
    pool = new Pool(config);
    const client = await pool.connect();
    console.log(
      `[Database] Successfully connected to PostgreSQL at ${config.host}:${config.port}/${config.database}`,
    );
    isDbConnected = true;
    client.release();

    // Auto-run schema migrations from queries.sql if tables do not exist
    const checkTable = await pool.query(
      "SELECT to_regclass('public.products')",
    );
    if (!checkTable.rows[0].to_regclass) {
      console.log(
        "[Database] Initializing schema and seed data from queries.sql...",
      );
      const sqlFile = path.join(__dirname, "queries.sql");
      if (fs.existsSync(sqlFile)) {
        const sqlContent = fs.readFileSync(sqlFile, "utf8");
        await pool.query(sqlContent);
        console.log(
          "[Database] Schema and seed data successfully initialized.",
        );
      }
    }
  } catch (err) {
    isDbConnected = false;
    console.warn(
      `[Database Notice] PostgreSQL not yet connected (${err.message}).`,
    );
    console.warn(
      `[Database Notice] Operating in resilient InMemory mode with full KinCraft seed data.`,
    );
    console.warn(
      `[Database Notice] To connect to PostgreSQL, update DB_PASSWORD in server/.env`,
    );
  }
}

initDb();

// API ROUTES

// Health Check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "KinCraft API Server",
    database_connected: isDbConnected,
    mode: isDbConnected ? "PostgreSQL Production" : "In-Memory Development",
    timestamp: new Date().toISOString(),
  });
});

// Categories (Indigenous Craft Traditions)
app.get("/api/categories", async (req, res) => {
  try {
    if (isDbConnected) {
      const result = await pool.query(`
        SELECT 
          c.id, c.name, c.place, c.material, c.artisan_count_label, c.image_url, c.alt_text,
          COUNT(p.id) AS active_catalog_products
        FROM categories c
        LEFT JOIN products p ON p.category_id = c.id
        GROUP BY c.id, c.name, c.place, c.material, c.artisan_count_label, c.image_url, c.alt_text
        ORDER BY c.name ASC
      `);
      return res.json({ success: true, data: result.rows });
    }
    res.json({ success: true, data: mockData.categories });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Single Category
app.get("/api/categories/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (isDbConnected) {
      const result = await pool.query(
        "SELECT * FROM categories WHERE id = $1",
        [id],
      );
      if (result.rows.length === 0)
        return res
          .status(404)
          .json({ success: false, message: "Category not found" });
      return res.json({ success: true, data: result.rows[0] });
    }
    const cat = mockData.categories.find((c) => c.id === id);
    if (!cat)
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    res.json({ success: true, data: cat });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Master Artisans & Spotlight of the Week
app.get("/api/artisans", async (req, res) => {
  try {
    if (isDbConnected) {
      const result = await pool.query(
        "SELECT * FROM artisans ORDER BY rating DESC",
      );
      return res.json({ success: true, data: result.rows });
    }
    res.json({ success: true, data: mockData.artisans });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Featured Artisan Spotlight
app.get("/api/artisans/spotlight", async (req, res) => {
  try {
    if (isDbConnected) {
      const result = await pool.query(`
        SELECT 
          a.*,
          COUNT(p.id) AS works_in_gallery
        FROM artisans a
        LEFT JOIN products p ON p.artisan_id = a.id
        WHERE a.is_spotlight = TRUE
        GROUP BY a.id
        LIMIT 1
      `);
      if (result.rows.length === 0)
        return res
          .status(404)
          .json({ success: false, message: "No spotlight artisan found" });
      return res.json({ success: true, data: result.rows[0] });
    }
    const spotlight =
      mockData.artisans.find((a) => a.is_spotlight) || mockData.artisans[0];
    res.json({ success: true, data: spotlight });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Products Discovery Grid (with search & filter tags)
app.get("/api/products", async (req, res) => {
  const { filter, category, search } = req.query;
  try {
    if (isDbConnected) {
      let query = `
        SELECT 
          p.id, p.name, p.crafter_name, p.location_tag, p.material_tag, 
          p.time_to_make, p.price, p.rating, p.review_count, p.filters, 
          p.image_url, p.alt_text, p.is_gi_certified, c.name AS category_name
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE 1=1
      `;
      const params = [];

      if (filter && filter !== "all") {
        params.push(filter);
        query += ` AND $${params.length} = ANY(p.filters)`;
      }
      if (category && category !== "all") {
        params.push(category);
        query += ` AND p.category_id = $${params.length}`;
      }
      if (search) {
        params.push(`%${search}%`);
        query += ` AND (p.name ILIKE $${params.length} OR p.crafter_name ILIKE $${params.length} OR p.material_tag ILIKE $${params.length})`;
      }

      query += ` ORDER BY p.price DESC`;
      const result = await pool.query(query, params);
      return res.json({
        success: true,
        count: result.rows.length,
        data: result.rows,
      });
    }

    let items = [...mockData.products];
    if (filter && filter !== "all") {
      items = items.filter((p) => p.filters && p.filters.includes(filter));
    }
    if (category && category !== "all") {
      items = items.filter((p) => p.category_id === category);
    }
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.crafter_name.toLowerCase().includes(q) ||
          p.material_tag.toLowerCase().includes(q),
      );
    }
    res.json({ success: true, count: items.length, data: items });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Single Product
app.get("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (isDbConnected) {
      const result = await pool.query("SELECT * FROM products WHERE id = $1", [
        id,
      ]);
      if (result.rows.length === 0)
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      return res.json({ success: true, data: result.rows[0] });
    }
    const product = mockData.products.find((p) => p.id === id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// CART & FAIR-TRADE ESCROW ENDPOINTS (90% Artisan / 10% Platform)

// Get Cart with 90/10 Breakdown
app.get("/api/cart", async (req, res) => {
  const userId = 1; // Default patron session
  try {
    if (isDbConnected) {
      const itemsRes = await pool.query(
        `
        SELECT 
          ci.id AS cart_item_id,
          p.id AS product_id,
          p.name AS product_name,
          p.crafter_name,
          p.image_url,
          p.price,
          ci.quantity,
          (p.price * ci.quantity) AS item_subtotal,
          ROUND((p.price * ci.quantity * 0.90), 2) AS artisan_direct_payout,
          ROUND((p.price * ci.quantity * 0.10), 2) AS platform_tech_fee
        FROM cart_items ci
        JOIN products p ON ci.product_id = p.id
        WHERE ci.user_id = $1
      `,
        [userId],
      );

      const aggRes = await pool.query(
        `
        SELECT 
          COALESCE(SUM(ci.quantity), 0) AS total_items,
          COUNT(DISTINCT p.artisan_id) AS distinct_artisans,
          COALESCE(SUM(p.price * ci.quantity), 0) AS gross_total,
          COALESCE(ROUND(SUM(p.price * ci.quantity * 0.90), 2), 0) AS total_artisan_escrow,
          COALESCE(ROUND(SUM(p.price * ci.quantity * 0.10), 2), 0) AS total_platform_fee
        FROM cart_items ci
        JOIN products p ON ci.product_id = p.id
        WHERE ci.user_id = $1
      `,
        [userId],
      );

      return res.json({
        success: true,
        items: itemsRes.rows,
        summary: aggRes.rows[0],
      });
    }

    // In-memory calculation
    const items = mockData.cart
      .map((c) => {
        const prod = mockData.products.find((p) => p.id === c.product_id);
        if (!prod) return null;
        const subtotal = prod.price * c.quantity;
        return {
          product_id: prod.id,
          product_name: prod.name,
          crafter_name: prod.crafter_name,
          image_url: prod.image_url,
          price: prod.price,
          quantity: c.quantity,
          item_subtotal: subtotal,
          artisan_direct_payout: Math.round(subtotal * 0.9 * 100) / 100,
          platform_tech_fee: Math.round(subtotal * 0.1 * 100) / 100,
          artisan_id: prod.artisan_id,
        };
      })
      .filter(Boolean);

    const gross_total = items.reduce((sum, i) => sum + i.item_subtotal, 0);
    const total_items = items.reduce((sum, i) => sum + i.quantity, 0);
    const distinct_artisans = new Set(items.map((i) => i.artisan_id)).size;

    res.json({
      success: true,
      items,
      summary: {
        total_items,
        distinct_artisans,
        gross_total,
        total_artisan_escrow: Math.round(gross_total * 0.9 * 100) / 100,
        total_platform_fee: Math.round(gross_total * 0.1 * 100) / 100,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Add Item to Cart
app.post("/api/cart", async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const userId = 1;

  if (!productId) {
    return res
      .status(400)
      .json({ success: false, message: "productId is required" });
  }

  try {
    if (isDbConnected) {
      await pool.query(
        `
        INSERT INTO cart_items (user_id, product_id, quantity)
        VALUES ($1, $2, $3)
        ON CONFLICT (user_id, product_id)
        DO UPDATE SET quantity = cart_items.quantity + EXCLUDED.quantity, updated_at = CURRENT_TIMESTAMP
      `,
        [userId, productId, quantity],
      );
      return res.json({ success: true, message: "Item added to cart" });
    }

    const existing = mockData.cart.find((c) => c.product_id === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      mockData.cart.push({ product_id: productId, quantity });
    }
    res.json({
      success: true,
      message: "Item added to cart",
      cart: mockData.cart,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Update Quantity
app.put("/api/cart/:productId", async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  const userId = 1;

  try {
    if (isDbConnected) {
      if (quantity <= 0) {
        await pool.query(
          "DELETE FROM cart_items WHERE user_id = $1 AND product_id = $2",
          [userId, productId],
        );
        return res.json({ success: true, message: "Item removed from cart" });
      }
      await pool.query(
        "UPDATE cart_items SET quantity = $1, updated_at = CURRENT_TIMESTAMP WHERE user_id = $2 AND product_id = $3",
        [quantity, userId, productId],
      );
      return res.json({ success: true, message: "Cart updated" });
    }

    if (quantity <= 0) {
      mockData.cart = mockData.cart.filter((c) => c.product_id !== productId);
    } else {
      const item = mockData.cart.find((c) => c.product_id === productId);
      if (item) item.quantity = quantity;
    }
    res.json({ success: true, message: "Cart updated", cart: mockData.cart });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Remove Item from Cart
app.delete("/api/cart/:productId", async (req, res) => {
  const { productId } = req.params;
  const userId = 1;

  try {
    if (isDbConnected) {
      await pool.query(
        "DELETE FROM cart_items WHERE user_id = $1 AND product_id = $2",
        [userId, productId],
      );
      return res.json({ success: true, message: "Item removed from cart" });
    }
    mockData.cart = mockData.cart.filter((c) => c.product_id !== productId);
    res.json({
      success: true,
      message: "Item removed from cart",
      cart: mockData.cart,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Clear Cart
app.delete("/api/cart", async (req, res) => {
  const userId = 1;
  try {
    if (isDbConnected) {
      await pool.query("DELETE FROM cart_items WHERE user_id = $1", [userId]);
      return res.json({ success: true, message: "Cart cleared" });
    }
    mockData.cart = [];
    res.json({ success: true, message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Wishlist Endpoints
app.get("/api/wishlist", async (req, res) => {
  const userId = 1;
  try {
    if (isDbConnected) {
      const result = await pool.query(
        `
        SELECT p.* FROM wishlist_items w
        JOIN products p ON w.product_id = p.id
        WHERE w.user_id = $1
      `,
        [userId],
      );
      return res.json({ success: true, data: result.rows });
    }
    const items = mockData.wishlist
      .map((id) => mockData.products.find((p) => p.id === id))
      .filter(Boolean);
    res.json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post("/api/wishlist", async (req, res) => {
  const { productId } = req.body;
  const userId = 1;

  if (!productId) {
    return res
      .status(400)
      .json({ success: false, message: "productId is required" });
  }

  try {
    if (isDbConnected) {
      const check = await pool.query(
        "SELECT id FROM wishlist_items WHERE user_id = $1 AND product_id = $2",
        [userId, productId],
      );
      if (check.rows.length > 0) {
        await pool.query(
          "DELETE FROM wishlist_items WHERE user_id = $1 AND product_id = $2",
          [userId, productId],
        );
        return res.json({
          success: true,
          wished: false,
          message: "Removed from wishlist",
        });
      } else {
        await pool.query(
          "INSERT INTO wishlist_items (user_id, product_id) VALUES ($1, $2)",
          [userId, productId],
        );
        return res.json({
          success: true,
          wished: true,
          message: "Added to wishlist",
        });
      }
    }

    const idx = mockData.wishlist.indexOf(productId);
    let wished = false;
    if (idx > -1) {
      mockData.wishlist.splice(idx, 1);
      wished = false;
    } else {
      mockData.wishlist.push(productId);
      wished = true;
    }
    res.json({ success: true, wished, wishlist: mockData.wishlist });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Checkout & Fair-Trade Escrow Creation
app.post("/api/checkout", async (req, res) => {
  const userId = 1;
  const {
    shippingAddress = "Flat 402, Nilgiri Heights, Indiranagar, Bengaluru 560038",
  } = req.body;

  try {
    const orderNumber = `ORD-${Date.now().toString().slice(-8)}`;

    if (isDbConnected) {
      const client = await pool.connect();
      try {
        await client.query("BEGIN");
        const cartItems = await client.query(
          `
          SELECT ci.product_id, ci.quantity, p.price
          FROM cart_items ci
          JOIN products p ON ci.product_id = p.id
          WHERE ci.user_id = $1
        `,
          [userId],
        );

        if (cartItems.rows.length === 0) {
          await client.query("ROLLBACK");
          return res
            .status(400)
            .json({ success: false, message: "Cart is empty" });
        }

        const totalAmount = cartItems.rows.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        );
        const artisanPayout = Math.round(totalAmount * 0.9 * 100) / 100;
        const platformFee = Math.round(totalAmount * 0.1 * 100) / 100;

        const orderRes = await client.query(
          `
          INSERT INTO orders (order_number, user_id, total_amount, artisan_direct_payout, platform_tech_fee, middleman_cut, status, shipping_address)
          VALUES ($1, $2, $3, $4, $5, 0.00, 'escrow_locked', $6)
          RETURNING *
        `,
          [
            orderNumber,
            userId,
            totalAmount,
            artisanPayout,
            platformFee,
            shippingAddress,
          ],
        );

        const orderId = orderRes.rows[0].id;
        for (const item of cartItems.rows) {
          await client.query(
            `
            INSERT INTO order_items (order_id, product_id, quantity, unit_price, artisan_payout)
            VALUES ($1, $2, $3, $4, $5)
          `,
            [
              orderId,
              item.product_id,
              item.quantity,
              item.price,
              Math.round(item.price * item.quantity * 0.9 * 100) / 100,
            ],
          );
        }

        await client.query("DELETE FROM cart_items WHERE user_id = $1", [
          userId,
        ]);
        await client.query("COMMIT");

        return res.json({
          success: true,
          message: "Order created with direct artisan escrow protection",
          order: orderRes.rows[0],
        });
      } catch (e) {
        await client.query("ROLLBACK");
        throw e;
      } finally {
        client.release();
      }
    }

    // In-memory checkout
    if (mockData.cart.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    let total = 0;
    mockData.cart.forEach((ci) => {
      const p = mockData.products.find((prod) => prod.id === ci.product_id);
      if (p) total += p.price * ci.quantity;
    });

    const newOrder = {
      id: mockData.orders.length + 1,
      order_number: orderNumber,
      total_amount: total,
      artisan_direct_payout: Math.round(total * 0.9 * 100) / 100,
      platform_tech_fee: Math.round(total * 0.1 * 100) / 100,
      middleman_cut: 0.0,
      status: "escrow_locked",
      shipping_address: shippingAddress,
      created_at: new Date().toISOString(),
    };

    mockData.orders.push(newOrder);
    mockData.cart = [];

    res.json({
      success: true,
      message: "Order created with direct artisan escrow protection",
      order: newOrder,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Transparency & Fair-Trade Impact Ledger
app.get("/api/transparency", async (req, res) => {
  try {
    if (isDbConnected) {
      const result = await pool.query(`
        SELECT 
          COUNT(id) AS total_orders_settled,
          COALESCE(SUM(total_amount), 0) AS gross_merchandise_value,
          COALESCE(SUM(artisan_direct_payout), 0) AS total_direct_wages_disbursed,
          COALESCE(SUM(platform_tech_fee), 0) AS platform_sustainability_fund,
          COALESCE(SUM(middleman_cut), 0) AS middleman_markup_avoided
        FROM orders
        WHERE status IN ('escrow_locked', 'settled')
      `);
      return res.json({ success: true, ledger: result.rows[0] });
    }

    const totalOrders = mockData.orders.length;
    const gross = mockData.orders.reduce((sum, o) => sum + o.total_amount, 0);
    const artisanTotal = mockData.orders.reduce(
      (sum, o) => sum + o.artisan_direct_payout,
      0,
    );
    const platformTotal = mockData.orders.reduce(
      (sum, o) => sum + o.platform_tech_fee,
      0,
    );

    res.json({
      success: true,
      ledger: {
        total_orders_settled: totalOrders,
        gross_merchandise_value: gross,
        total_direct_wages_disbursed: artisanTotal,
        platform_sustainability_fund: platformTotal,
        middleman_markup_avoided: 0,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Run queries.sql into PostgreSQL manually via API trigger
app.post("/api/db/init", async (req, res) => {
  if (!isDbConnected) {
    return res.status(400).json({
      success: false,
      message:
        "PostgreSQL is not connected. Please verify DB credentials in server/.env",
    });
  }
  try {
    const sqlPath = path.join(__dirname, "queries.sql");
    const sql = fs.readFileSync(sqlPath, "utf8");
    await pool.query(sql);
    res.json({
      success: true,
      message: "Schema and seed queries executed successfully in PostgreSQL.",
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 404 Handler
app.use((req, res) => {
  res
    .status(404)
    .json({
      success: false,
      message: `Endpoint ${req.method} ${req.url} not found`,
    });
});

// Start Server
app.listen(PORT, () => {
  console.log(`[KinCraft Server] Listening on http://localhost:${PORT}`);
  console.log(
    `[KinCraft Server] Health check available at http://localhost:${PORT}/api/health`,
  );
});
