-- Table: users (Patrons, Master Artisans, and Platform Admins)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(180) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    role VARCHAR(30) DEFAULT 'Customer', -- 'Customer', 'Artisan', 'Admin'
    membership_tier VARCHAR(80) DEFAULT 'Patron Member • Tier 1',
    avatar_initials VARCHAR(6) DEFAULT 'MV',
    phone VARCHAR(30),
    city VARCHAR(100),
    state VARCHAR(100),
    craft_cluster VARCHAR(180),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: categories (Indigenous Craft Traditions)
CREATE TABLE IF NOT EXISTS categories (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    place VARCHAR(150) NOT NULL,
    material VARCHAR(255) NOT NULL,
    artisan_count_label VARCHAR(60) NOT NULL,
    image_url TEXT NOT NULL,
    alt_text TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: artisans (Verified Rural Master Artisans & Cooperatives)
CREATE TABLE IF NOT EXISTS artisans (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    merit_title VARCHAR(150) DEFAULT 'National Merit Awardee',
    cluster_origin VARCHAR(150) NOT NULL,
    lineage_experience VARCHAR(100) NOT NULL,
    gi_cert_number VARCHAR(80) NOT NULL,
    loom_technique VARCHAR(150),
    natural_materials VARCHAR(200),
    quote TEXT,
    bio TEXT,
    rating NUMERIC(3, 1) DEFAULT 5.0,
    review_count INTEGER DEFAULT 0,
    image_url TEXT NOT NULL,
    cooperative_name VARCHAR(180),
    cooperative_families INTEGER DEFAULT 1,
    payout_percentage INTEGER DEFAULT 90, -- 90% direct to artisan
    is_spotlight BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: products (Grassroots Masterpieces with Provenance)
CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    category_id VARCHAR(50) REFERENCES categories(id) ON DELETE SET NULL,
    artisan_id INTEGER REFERENCES artisans(id) ON DELETE SET NULL,
    crafter_name VARCHAR(180) NOT NULL,
    location_tag VARCHAR(100) NOT NULL,
    material_tag VARCHAR(100) NOT NULL,
    time_to_make VARCHAR(80) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    rating NUMERIC(3, 1) DEFAULT 4.9,
    review_count INTEGER DEFAULT 0,
    filters TEXT[] NOT NULL DEFAULT ARRAY['all'],
    image_url TEXT NOT NULL,
    alt_text TEXT,
    stock_quantity INTEGER DEFAULT 15,
    is_gi_certified BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: wishlist_items
CREATE TABLE IF NOT EXISTS wishlist_items (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    product_id VARCHAR(100) REFERENCES products(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, product_id)
);

-- Table: cart_items
CREATE TABLE IF NOT EXISTS cart_items (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    product_id VARCHAR(100) REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, product_id)
);

-- Table: orders (Fair-Trade Escrow Checkout)
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    order_number VARCHAR(60) UNIQUE NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE RESTRICT,
    total_amount NUMERIC(10, 2) NOT NULL,
    artisan_direct_payout NUMERIC(10, 2) NOT NULL, -- 90%
    platform_tech_fee NUMERIC(10, 2) NOT NULL,     -- 10%
    middleman_cut NUMERIC(10, 2) DEFAULT 0.00,     -- Always 0.00
    status VARCHAR(50) DEFAULT 'escrow_locked',    -- 'escrow_locked', 'dispatched', 'settled'
    shipping_address TEXT NOT NULL,
    payout_settled_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: order_items
CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    product_id VARCHAR(100) REFERENCES products(id) ON DELETE RESTRICT,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC(10, 2) NOT NULL,
    artisan_payout NUMERIC(10, 2) NOT NULL
);

-- SEED DATA (DML)

-- Seed: Default Patron User (Meera Verma)
INSERT INTO users (id, name, email, password_hash, role, membership_tier, avatar_initials, city, state)
VALUES 
    (1, 'Meera Verma', 'meera.verma@example.com', '$2b$10$gixQ/SRLhWvQpt7oWeZnSeb2fJ09ASsDJA1W1QKF34hnST8pZxHU.', 'Customer', 'Patron Member • Tier 1', 'MV', 'Bengaluru', 'Karnataka'),
    (2, 'Meera Verma', 'meera.verma@kincraft.org', '$2b$10$gixQ/SRLhWvQpt7oWeZnSeb2fJ09ASsDJA1W1QKF34hnST8pZxHU.', 'Customer', 'Patron Member • Tier 1', 'MV', 'Bengaluru', 'Karnataka'),
    (3, 'Karan Kumbhar', 'karan.kumbhar@example.com', '$2b$10$7F9rK1M.gEx7KLqgTjhk2eG48c6DafLKWY1tNKMW8jAyWYQ8Uu3Wq', 'Artisan', 'Master Artisan • Verified GI', 'KK', 'Molela', 'Rajasthan'),
    (4, 'Compliance Admin', 'admin@kincraft.in', '$2b$10$JceDx6waM3yLHUQxNyKpLutkhp9nzPzp6B30eoYIPPrIOr.n4oov2', 'Admin', 'Platform Compliance & Escrow Officer', 'AD', 'New Delhi', 'Delhi')
ON CONFLICT (email) DO UPDATE SET 
    name = EXCLUDED.name,
    password_hash = EXCLUDED.password_hash,
    role = EXCLUDED.role,
    membership_tier = EXCLUDED.membership_tier;

-- Seed: Craft Categories
INSERT INTO categories (id, name, place, material, artisan_count_label, image_url, alt_text)
VALUES
    ('pottery', 'Terracotta & Clay', 'Molela / Bankura', 'Sacred temple plaques, planters & cooling pots', '84 Master Artisans', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWeJWibwXamXUwR9L52PQOV8ZvrnhbhmRw-JR7RsAlcnI2ZTg5an5veOjpQiSY38vra5LmrFto3XHqVj5b9N6_5JcSc-s3dj7G1_o2a0obvekfjqqlymBhNlAQN9IN7u3m5k28RNuvBxR64iclUY-roio9eyilpATHVqFMtCsUjRrxtWyVZz_ZvJEK1JFZ-2gKX2S4tdTxT0Ql7atte9Wy-6NEvxBDP8waYlegDb-4', 'Traditional terracotta clay vessels and decorative earthen pots'),
    ('textiles', 'Handloom Textiles', 'Chanderi / Pochampally', 'Natural indigo stoles, pure silk sarees & dupattas', '142 Master Weavers', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjDQH-KoL6X8srolSE8KOFyl7ZSJpxbaWr0FQk-nCTU-qhQvgMdr7JEEhvAj9L7nRFJY66ykD0xICabtPhQ2I73d4l-_zl-oNUEWyfAEqI-n9Eb5311wA8b5uC_sBQi1D7r9KGUnN3LDlfpf8J_O8inPYZWv5kAR_tCBUARHnKhKH2hvFllSRxAzoidLW1X3_QBuloiQ7GF7PLE0NBCSV3l0NHSnGbdbViqm3BoIju', 'Indian handloom weaver working on a wooden pit loom'),
    ('bell-metal', 'Dhokra Bell Metal', 'Bastar, Chhattisgarh', '4,000-year-old lost-wax tribal bronze casting', '61 Metal Casters', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAu36giIZyaPZGLECVO8E4btYtxyWSWrnUADcoG7jRfJ22E2pDmxQyLgnfReRqzDsiN5U9uhdtiusCv5bLnAfl5NJwFIf4nblRGLIqFnXpjvDUNh8w9xtI7tJKUuuN-ynRNkymjTPEtdZeNbZhNweICVv_4WhODNW5v7eAu-o9Xk24Htgj7kmr-ATOp03j8ygrrHIxVV5J0G9wvUo-fasrS7KlcqPBCkq95Wq4QZB0B', 'Dhokra lost-wax bell metal handcrafted brass figurines'),
    ('woodcraft', 'Lacquer Woodcraft', 'Channapatna, KA', 'Vegetable-dyed non-toxic turned ivory woodcraft', '55 Wood Crafters', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCv4V2nQ2p_8CnoTBOfMdozBUnK8NLN5Mu7flnb5e6-Fq4o2EJyqijLJojrQSHuYDSfspv6P22T-3ngUpVHBSIZe_lMdLn8AjeDV0Cwl2AtzJuP3LNo1aJibP6Rx7HuIr_58tE0CUwn7l8T8wAJJE6ZSLyP2FFB0y0EGSR19aTzANMnfHnd4nbzzBod0TQUdj9KZGA172LASXSugNWWyKrBdrQupGBDFa04saytjLIO', 'Channapatna natural vegetable dye lacquer turned wooden toys'),
    ('fiber', 'Natural Sabai Fiber', 'Mayurbhanj, Odisha', 'Biodegradable hand-braided grass storage & baskets', '98 SHG Weavers', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTVg_joGiUji5wRw1boRh1QiYvAKOENaHAuGnB1PNCCWhS155u6IVaEqPDlFwGxIsGymafznRHljH4sTc-englEuKb0Lh7Uq32gjuPzeKuSbPPSbRPuNCkqljOiLQlcziJNv53dDQKi9FpJhdXZrHeZK7WQm3M9hdE-WYN3tUo0kgS0exmQuXIj9o31_rWmSma-pKgYdEi52kX3Bu10b36BWM6uCi-kbsAirklphza', 'Rural women weaving golden sabai grass and natural river reed')
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name,
    place = EXCLUDED.place,
    material = EXCLUDED.material,
    artisan_count_label = EXCLUDED.artisan_count_label,
    image_url = EXCLUDED.image_url;

-- Seed: Master Artisans (Featured Devji Premji Vankar + Cluster Leaders)
INSERT INTO artisans (id, name, merit_title, cluster_origin, lineage_experience, gi_cert_number, loom_technique, natural_materials, quote, bio, rating, review_count, image_url, cooperative_name, cooperative_families, payout_percentage, is_spotlight)
VALUES
    (1, 'Devji Premji Vankar', 'National Merit Awardee 2018', 'Bhujodi, Kutch, Gujarat', '42 Years Loom Practice', 'GC-GUJ-014', 'Extra-Weft Throw Loom', 'Wild Indigo, Madder, Iron', 'When I throw the wooden shuttle through the warp, I am not merely joining threads—I am carrying forward seven generations of ancestral songs woven into raw sheep wool.', 'Devji Bhai heads a cooperative of 26 weaving families in Bhujodi village. Through GramCrafts direct platform settlement, his collective receives full fair wages within 48 hours of shipment dispatch, completely bypassing city wholesaler discounting.', 5.0, 184, 'https://lh3.googleusercontent.com/aida-public/AB6AXuCr1DVEtlMyOZalipXtV2MfWftO3qLvDuHgLL4eqjeEksuvK6IoGTOKxS5t4njJfu6OLtd7p55DDyjrmI7tPbf4U0MeXO7VVeuwQirG8g0OgD-pg0ZF2kaxV_iVxDfpXwL19LFl7qy6eTPUhdUIfqxGoXMc_UgLz8VFdKOadwzotNsqk7aGccYblyaaUHGa5cU-JCG2Wfi9S3EK2mPHnGzfIpej2aBcdQB6qMdkE_eE', 'Bhujodi Vankar Weavers Cooperative', 26, 90, TRUE),
    (2, 'Smt. Kamala Devi', '4th Generation Master Potter', 'Molela, Rajsamand, Rajasthan', '35 Years Ceramic Practice', 'IN-420-CLAY', 'Hollow Relief Hand Sculpting', 'Molela Terracotta Clay & Donkey Dung', 'Our clay is mixed with the river silt of Banas. Each sun plaque brings warmth and divine protection to the home.', 'Smt. Kamala Devi leads a revered multi-generational potting household in Molela, keeping the sacred terracotta temple votive plaques tradition alive.', 4.9, 142, 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeDb3Xo9KjpEPZSDIBL82sPLwCiGuHdzDrhX-pW4auPBfriL2nj2gACO2KvzjjKXXYJWfLTG6yrZPiO61ivY3j2fBwbZ_2wvx6xzqDLMqgUyEzNjyHEKHuyjuzXD8pI1goarcMdgt-C4Z6vDVsfv6MSI8drMXBYLlTCz7j678PFkuP3nFEoR3sjfefB3KfWT-YN53CK_wvHdRJL4ACk7OfNI_Iuj9VN80NwDyiqHGO', 'Molela Earthen Guild', 18, 90, FALSE),
    (3, 'Somaru Ram Kashyap', 'Tribal Bronze Master Craftsman', 'Kondagaon, Bastar, Chhattisgarh', '28 Years Metal Casting', 'IN-CT-DHOKRA-09', 'Lost-Wax Bell Metal Casting', 'Recycled Brass, Beeswax & Red Clay', 'The wax thread remembers the form; the molten brass breathes permanence into tribal spirits.', 'Somaru Ram works with the Ghadwa tribal collective in the deep sal forests of Bastar, casting antique heirloom bell-metal relics.', 4.8, 96, 'https://lh3.googleusercontent.com/aida-public/AB6AXuAu36giIZyaPZGLECVO8E4btYtxyWSWrnUADcoG7jRfJ22E2pDmxQyLgnfReRqzDsiN5U9uhdtiusCv5bLnAfl5NJwFIf4nblRGLIqFnXpjvDUNh8w9xtI7tJKUuuN-ynRNkymjTPEtdZeNbZhNweICVv_4WhODNW5v7eAu-o9Xk24Htgj7kmr-ATOp03j8ygrrHIxVV5J0G9wvUo-fasrS7KlcqPBCkq95Wq4QZB0B', 'Bastar Ghadwa Artisan Union', 14, 90, FALSE)
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name,
    merit_title = EXCLUDED.merit_title,
    quote = EXCLUDED.quote,
    bio = EXCLUDED.bio;

-- Seed: Grassroots Masterpiece Products
INSERT INTO products (id, name, category_id, artisan_id, crafter_name, location_tag, material_tag, time_to_make, price, rating, review_count, filters, image_url, alt_text, stock_quantity)
VALUES
    ('molela-terracotta', 'Surya Dev Votive Terracotta Wall Icon', 'pottery', 2, 'Crafted by Smt. Kamala Devi • Molela, Rajasthan', 'GI Tagged • Molela', 'Terracotta Clay', 'Handmade in 7 days', 1850.00, 4.9, 42, ARRAY['all', 'gi', 'home', 'living'], 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeoLOovA1aF1jr4ZEo6yLy0mJ0KQWSpWHVCFn4z4OFWXmpUX6NfnbCk0mHNkCwcS8UiXSDmXvlwCMjNyXmGnmGXA5VoIqGVnKAWU9CKw-CSDIxPRQIMXhU5elo3PUkEXHN9BBMh60HSVJ0bVPM35SMp_GU4VBaBfgpCqJXzj7qMApNV0CU7roM94lRCBuQJsWdinRtzMOuuUy5uY9a1ZnWqHvU8g6G6LljbSoNsxyp', 'Authentic Molela votive terracotta clay wall plaque depicting a sacred sun and village deity', 12),
    ('dhabla-shawl', 'Ancestral Handspun Dhabla Wool Shawl', 'textiles', 1, 'Crafted by Devji Premji Vankar • Bhujodi, Gujarat', 'GI Tagged • Kutch', 'Indigenous Desi Wool', 'Handmade in 14 days', 3850.00, 5.0, 68, ARRAY['all', 'gi', 'wearable', 'living'], 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbgVKvzxHshb8tYIgls_5oWQj6AzI_CEXcY1rmcG3oOVm_J7OFiDogK68eLD6QmNFrHRuuBoATEpzC7f8yz_J31L3jOqg0tkCWvMGR1BDkPVD7FRIe9ydYz64rEUReSHQRSOsh85IQwfsRS-bCEVms_ShXFGvoFZXSUAUXgPNJZ4AsMOZ3aUKj_3XeIOpkbFgX4Fh0nLzBdbHPxY6bFejTw4V5pZHJ2fZGIQgEJIqm', 'Traditional Kutch handwoven desi wool Dhabla shawl with mirrorwork borders', 8),
    ('bastar-nandi', 'Lost-Wax Bastar Nandi Sculpture', 'bell-metal', 3, 'Crafted by Somaru Ram Kashyap • Kondagaon, Chhattisgarh', 'GI Tagged • Bastar', 'Bell Metal & Beeswax', 'Handmade in 9 days', 2200.00, 4.8, 29, ARRAY['all', 'gi', 'home', 'living'], 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4inTY7DKQsHH8ROT0MjyUfxTFZsXvdkmlL-TiButdxGCYJ5gCV8sAhw45qklQKrUYwN9Mxuk854AkKvGrkFfHmgVW6zQH_oA_vzhGqetcx8BZ75zKsF4uXtF-_pjJn6dY-jz4Hvnbb4WNH5JK1_8Xz0Vjf3O3qZxrCeS0JXy4TdBjs5-yl0qb_hvtJmfoSAvH5BEaSQ0s65F9DKgGWNYlYcSBGR1w8wIWQD-kJebY', 'Bastar Dhokra cast brass sacred bull sculpture with delicate hand-coiled wax cord patterns', 15),
    ('pochampally-ikat', 'Double-Ikat Silk Chevron Stole', 'textiles', 1, 'Crafted by B. Anjaiah Weavers Trust • Bhoodan Pochampally', 'GI Tagged • Telangana', '100% Mulberry Silk', 'Handmade in 11 days', 2850.00, 4.9, 53, ARRAY['all', 'gi', 'wearable'], 'https://lh3.googleusercontent.com/aida-public/AB6AXuBR1RD9TVnjiTcfxZa9y8IaJFYhKJhaxesQOdPLHCY1FgepM1F19C0RTAH14qzHt7MFbIv8IHYFY6BAVbSGu_JRt-bq3TUp0FBZrNSPT5uvNUNwOwRWbfuAq-HoPys805CpXRNPVAGpip2GDbnOTijPBW5iShZfJ_cDb5-W0tbco85h86fANfokAGay85jGKgxnkQiCJYU3RlitpavG2jm1iMor2o9v-ltkgOs9OHC5', 'Pochampally double ikat silk fabric stole in rich turmeric yellow and deep madder red', 20),
    ('channapatna-nesting', 'Geometric Lacquer Architectural Nesting Set', 'woodcraft', 1, 'Crafted by Syed Noor Lathe Studio • Channapatna, KA', 'GI Tagged • Karnataka', 'Hale Wood & Veg Lac', 'Handmade in 3 days', 1150.00, 4.7, 31, ARRAY['all', 'gi', 'home'], 'https://lh3.googleusercontent.com/aida-public/AB6AXuCX8tO6L07diEGA4-6ZPqSKhJhNiE3vhoSxaxLafj91Qtw6jch-pRZ2H5fqqmPgHf0S2-Szn-wtLrpFLgyyi7Fj8TL8ROZk8lTY98ZyRt8c5J6CymYK7Vkuw2m4hQw09xh8mrcBdge_X99PpQAfPa0Rjn_RpN8y2mu0slMXyc_6wi2R41ewS1nJHZfA5S-M2AFOdh8BLfZLrocySZbOtfiyLarTudVsDnFf-WtJCS7r', 'Channapatna turned wood stacking toy made of ivory wood with smooth natural vegetable lac finishes', 25),
    ('mayurbhanj-sabai', 'Mayurbhanj Coiled Sabai Floor Planter', 'fiber', 2, 'Crafted by Maa Tarini Women SHG • Baripada, Odisha', 'Heritage Cluster • Odisha', 'Sun-Cured Sabai Grass', 'Handmade in 4 days', 950.00, 4.9, 47, ARRAY['all', 'home', 'living'], 'https://lh3.googleusercontent.com/aida-public/AB6AXuASioNwOFrAVM9WqKtyYV50riKGJkSvXJjNkd7_kav496K6WAbyszUuVvGpgP53u24zkI8O7wk8IiEUJtN2eqNsIaZA0Zolb55M5AvVYM_WXdTTRbzngS68BuFs1B2jJoiubl9rbVWldWBWXBw0HvYvoLuE1aNp304-aiiD3jOmClDdAyGU4iQ1eahevkhtb842wEU_foylQIj472tuM5D7lMEkARaPwOPw7cRdmloT', 'Hand braided Sabai grass tall woven storage planter basket with dark forest green cotton interwoven handles', 18)
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name,
    price = EXCLUDED.price,
    stock_quantity = EXCLUDED.stock_quantity;

-- Seed: Initial Cart & Wishlist for Meera Verma
INSERT INTO cart_items (user_id, product_id, quantity)
VALUES 
    (1, 'molela-terracotta', 1),
    (1, 'dhabla-shawl', 1)
ON CONFLICT (user_id, product_id) DO NOTHING;

INSERT INTO wishlist_items (user_id, product_id)
VALUES 
    (1, 'bastar-nandi'),
    (1, 'pochampally-ikat'),
    (1, 'channapatna-nesting')
ON CONFLICT (user_id, product_id) DO NOTHING;


-- OPERATIONAL & BUSINESS QUERIES
SELECT 
    c.id,
    c.name,
    c.place,
    c.material,
    c.artisan_count_label,
    c.image_url,
    c.alt_text,
    COUNT(p.id) AS active_catalog_products
FROM categories c
LEFT JOIN products p ON p.category_id = c.id
GROUP BY c.id, c.name, c.place, c.material, c.artisan_count_label, c.image_url, c.alt_text
ORDER BY c.name ASC;

-- Fetch Master Artisan Spotlight of the Week
-- Returns Devji Premji Vankar's verified cluster profile and lineage metrics
SELECT 
    a.id,
    a.name,
    a.merit_title,
    a.cluster_origin,
    a.lineage_experience,
    a.gi_cert_number,
    a.loom_technique,
    a.natural_materials,
    a.quote,
    a.bio,
    a.rating,
    a.review_count,
    a.image_url,
    a.cooperative_name,
    a.cooperative_families,
    a.payout_percentage,
    COUNT(p.id) AS works_in_gallery
FROM artisans a
LEFT JOIN products p ON p.artisan_id = a.id
WHERE a.is_spotlight = TRUE
GROUP BY a.id;

-- Filtered Product Discovery Grid
-- Dynamically fetch products by filter chip ('all', 'gi', 'living', 'home', 'wearable')
SELECT 
    p.id,
    p.name,
    p.crafter_name,
    p.location_tag,
    p.material_tag,
    p.time_to_make,
    p.price,
    p.rating,
    p.review_count,
    p.filters,
    p.image_url,
    p.alt_text,
    p.is_gi_certified,
    c.name AS category_name
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
WHERE 'all' = ANY(p.filters) -- Replace 'all' with desired filter tag
ORDER BY p.price DESC;

-- User Shopping Cart with Direct Escrow Split (90% Artisan / 10% Platform)
-- Calculates the exact rupee allocation for the transparency ledger
SELECT 
    ci.id AS cart_item_id,
    p.id AS product_id,
    p.name AS product_name,
    p.crafter_name,
    p.price,
    ci.quantity,
    (p.price * ci.quantity) AS item_subtotal,
    ROUND((p.price * ci.quantity * 0.90), 2) AS artisan_direct_payout,
    ROUND((p.price * ci.quantity * 0.10), 2) AS platform_tech_fee,
    0.00 AS middleman_cut
FROM cart_items ci
JOIN products p ON ci.product_id = p.id
WHERE ci.user_id = 1;

-- Cart Summary Aggregations
-- Total amount, total items, distinct artisans, and sovereign wage payout sum
SELECT 
    COUNT(ci.id) AS total_cart_lines,
    COALESCE(SUM(ci.quantity), 0) AS total_items_count,
    COUNT(DISTINCT p.artisan_id) AS distinct_artisans_supported,
    COALESCE(SUM(p.price * ci.quantity), 0) AS gross_total,
    COALESCE(ROUND(SUM(p.price * ci.quantity * 0.90), 2), 0) AS total_artisan_escrow,
    COALESCE(ROUND(SUM(p.price * ci.quantity * 0.10), 2), 0) AS total_platform_fee
FROM cart_items ci
JOIN products p ON ci.product_id = p.id
WHERE ci.user_id = 1;

-- Create New Fair-Trade Escrow Order (Atomic Transaction)
-- Demonstrates checkout settlement creating an audited order record
/*
WITH new_order AS (
    INSERT INTO orders (
        order_number, 
        user_id, 
        total_amount, 
        artisan_direct_payout, 
        platform_tech_fee, 
        middleman_cut, 
        status, 
        shipping_address
    )
    SELECT 
        'ORD-' || TO_CHAR(NOW(), 'YYYYMMDD-HH24MISS'),
        1,
        SUM(p.price * ci.quantity),
        ROUND(SUM(p.price * ci.quantity * 0.90), 2),
        ROUND(SUM(p.price * ci.quantity * 0.10), 2),
        0.00,
        'escrow_locked',
        'Flat 402, Nilgiri Heights, Indiranagar, Bengaluru 560038'
    FROM cart_items ci
    JOIN products p ON ci.product_id = p.id
    WHERE ci.user_id = 1
    RETURNING id, total_amount, artisan_direct_payout, platform_tech_fee
)
INSERT INTO order_items (order_id, product_id, quantity, unit_price, artisan_payout)
SELECT 
    (SELECT id FROM new_order),
    ci.product_id,
    ci.quantity,
    p.price,
    ROUND(p.price * ci.quantity * 0.90, 2)
FROM cart_items ci
JOIN products p ON ci.product_id = p.id
WHERE ci.user_id = 1;

-- Clear Cart After Checkout
DELETE FROM cart_items WHERE user_id = 1;
*/

-- User Wishlist Items
SELECT 
    w.id AS wishlist_item_id,
    p.id AS product_id,
    p.name AS product_name,
    p.crafter_name,
    p.price,
    p.rating,
    p.review_count,
    p.image_url,
    p.location_tag
FROM wishlist_items w
JOIN products p ON w.product_id = p.id
WHERE w.user_id = 1
ORDER BY w.created_at DESC;

-- Platform Transparency & Impact Ledger Summary
-- Verifies the IAPP compliance: Zero Middleman Cut, 90% Sovereign Wage
SELECT 
    COUNT(id) AS total_orders_settled,
    COALESCE(SUM(total_amount), 0) AS gross_merchandise_value,
    COALESCE(SUM(artisan_direct_payout), 0) AS total_direct_wages_disbursed,
    COALESCE(SUM(platform_tech_fee), 0) AS platform_sustainability_fund,
    COALESCE(SUM(middleman_cut), 0) AS middleman_markup_avoided
FROM orders
WHERE status IN ('escrow_locked', 'settled');