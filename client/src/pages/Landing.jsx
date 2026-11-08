import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Landing() {
  return (
    <>
      <Header />
      <section className="relative w-full bg-surface-container-low overflow-hidden py-space-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-tertiary/5 pointer-events-none"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-margin relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
            {/* Hero */}
            <div className="lg:col-span-7 flex flex-col gap-space-lg">
              <div className="flex items-center gap-space-xs">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm uppercase tracking-wider">
                  <span
                    className="material-symbols-outlined text-sm text-tertiary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    workspace_premium
                  </span>
                  Direct-From-Cluster Heritage Commerce
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                  Spring Craft Harvest Active
                </span>
              </div>
              <div className="flex flex-col gap-space-xs">
                <h1 className="font-display-hero text-display-hero text-on-surface tracking-tight leading-tight">
                  Treasures Shaped by Hands,{" "}
                  <span className="text-secondary italic">
                    Steeped in Heritage.
                  </span>
                </h1>
                <p className="font-story-lead text-story-lead text-on-surface-variant max-w-2xl leading-relaxed mt-2">
                  Directly empowering conscious patrons to acquire verified
                  GI-tagged masterpieces from 4,200+ rural Indian master
                  craftspeople across 18 craft clusters, with zero middleman
                  deductions.
                </p>
              </div>
              {/* Hero Actions */}
              <div className="flex flex-wrap items-center gap-space-md pt-2">
                <a
                  className="inline-flex items-center justify-center gap-space-sm px-6 py-3.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg transition-all shadow-sm"
                  href="#marketplace-grid"
                >
                  <span>Explore Craft Collections</span>
                  <span className="material-symbols-outlined text-lg">
                    arrow_downward
                  </span>
                </a>
                <a
                  className="inline-flex items-center justify-center gap-space-sm px-6 py-3.5 rounded-lg bg-surface-container-highest hover:bg-surface-container text-secondary font-label-lg text-label-lg transition-all"
                  href="#artisan-spotlight"
                >
                  <span className="material-symbols-outlined text-lg">
                    history_edu
                  </span>
                  <span>Meet the Master Artisans</span>
                </a>
              </div>
              {/* Quick Trust Stat */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm pt-space-md">
                <div className="bg-surface-container p-3 rounded-lg flex flex-col">
                  <span className="font-headline-sm text-headline-sm text-primary font-bold">
                    4,200+
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Verified Artisans
                  </span>
                </div>
                <div className="bg-surface-container p-3 rounded-lg flex flex-col">
                  <span className="font-headline-sm text-headline-sm text-secondary font-bold">
                    18 Clusters
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    GI-Tagged Origins
                  </span>
                </div>
                <div className="bg-surface-container p-3 rounded-lg flex flex-col">
                  <span className="font-headline-sm text-headline-sm text-tertiary-container font-bold">
                    ₹0
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Middleman Markup
                  </span>
                </div>
                <div className="bg-surface-container p-3 rounded-lg flex flex-col">
                  <span className="font-headline-sm text-headline-sm text-primary-container font-bold">
                    Instant
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Direct Bank Payouts
                  </span>
                </div>
              </div>
            </div>
            {/* Hero Visual Showcase */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              <div className="relative bg-surface rounded-2xl shadow-xl overflow-hidden p-space-md">
                <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    alt="Close up photography of an elderly Indian female master potter gently shaping a terracotta clay water jar with traditional tribal motifs in a sunlit village courtyard in Molela, warm earth tones, raw texture, authentic artisan atmosphere, cinematic depth of field."
                    data-alt="Close up photography of an elderly Indian female master potter gently shaping a terracotta clay water jar with traditional tribal motifs in a sunlit village courtyard in Molela, warm earth tones, raw texture, authentic artisan atmosphere, cinematic depth of field."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeDb3Xo9KjpEPZSDIBL82sPLwCiGuHdzDrhX-pW4auPBfriL2nj2gACO2KvzjjKXXYJWfLTG6yrZPiO61ivY3j2fBwbZ_2wvx6xzqDLMqgUyEzNjyHEKHuyjuzXD8pI1goarcMdgt-C4Z6vDVsfv6MSI8drMXBYLlTCz7j678PFkuP3nFEoR3sjfefB3KfWT-YN53CK_wvHdRJL4ACk7OfNI_Iuj9VN80NwDyiqHGO"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-on-primary">
                    <div>
                      <div className="inline-flex items-center gap-1 text-xs uppercase tracking-widest font-label-sm text-tertiary-fixed mb-1">
                        <span className="material-symbols-outlined text-sm">
                          verified
                        </span>
                        GI Certificate #IN-420-CLAY
                      </div>
                      <div className="font-headline-sm text-headline-sm">
                        Molela Terracotta Mural Plaque
                      </div>
                      <div className="font-label-md text-label-md opacity-90">
                        Smt. Kamala Devi • 4th Generation Potter
                      </div>
                    </div>
                    <div className="bg-surface-container-lowest text-primary px-3 py-1.5 rounded-lg text-center shadow-md">
                      <div className="font-label-sm text-label-sm uppercase text-secondary">
                        Price
                      </div>
                      <div className="font-price-display text-price-display leading-tight">
                        ₹1,850
                      </div>
                    </div>
                  </div>
                </div>
                {/* Floating Lineage Badge */}
                <div className="absolute -top-3 -left-3 bg-primary text-on-primary p-3 rounded-xl shadow-lg flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary-fixed text-2xl">
                    verified_user
                  </span>
                  <div className="text-left">
                    <div className="font-label-sm text-label-sm font-bold leading-none">
                      100% Provenance
                    </div>
                    <div className="font-label-sm text-label-sm text-primary-fixed-dim text-[10px]">
                      Geotagged Cluster
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CraftCategories />
      <Spotlight />
      <Products />
      <Footer />
    </>
  );
}

const categoryData = [
  {
    id: "pottery",
    place: "Molela / Bankura",
    name: "Terracotta & Clay",
    material: "Sacred temple plaques, planters & cooling pots",
    total: "84 Master Artisans",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAWeJWibwXamXUwR9L52PQOV8ZvrnhbhmRw-JR7RsAlcnI2ZTg5an5veOjpQiSY38vra5LmrFto3XHqVj5b9N6_5JcSc-s3dj7G1_o2a0obvekfjqqlymBhNlAQN9IN7u3m5k28RNuvBxR64iclUY-roio9eyilpATHVqFMtCsUjRrxtWyVZz_ZvJEK1JFZ-2gKX2S4tdTxT0Ql7atte9Wy-6NEvxBDP8waYlegDb-4",
    alt: "Traditional terracotta clay vessels and decorative earthen pots with intricate rural etched patterns drying under gentle warm sunlight in Rajasthan, natural raw terra color palette.",
  },
  {
    id: "textiles",
    place: "Chanderi / Pochampally",
    name: "Handloom Textiles",
    material: "Natural indigo stoles, pure silk sarees & dupattas",
    total: "142 Master Weavers",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAjDQH-KoL6X8srolSE8KOFyl7ZSJpxbaWr0FQk-nCTU-qhQvgMdr7JEEhvAj9L7nRFJY66ykD0xICabtPhQ2I73d4l-_zl-oNUEWyfAEqI-n9Eb5311wA8b5uC_sBQi1D7r9KGUnN3LDlfpf8J_O8inPYZWv5kAR_tCBUARHnKhKH2hvFllSRxAzoidLW1X3_QBuloiQ7GF7PLE0NBCSV3l0NHSnGbdbViqm3BoIju",
    alt: "Indian handloom weaver working on a wooden pit loom with mulberry silk and unbleached organic cotton threads in Pochampally Telangana, golden afternoon light, fine texture detail.",
  },
  {
    id: "bell-metal",
    place: "Bastar, Chhattisgarh",
    name: "Dhokra Bell Metal",
    material: "4,000-year-old lost-wax tribal bronze casting",
    total: "61 Metal Casters",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAu36giIZyaPZGLECVO8E4btYtxyWSWrnUADcoG7jRfJ22E2pDmxQyLgnfReRqzDsiN5U9uhdtiusCv5bLnAfl5NJwFIf4nblRGLIqFnXpjvDUNh8w9xtI7tJKUuuN-ynRNkymjTPEtdZeNbZhNweICVv_4WhODNW5v7eAu-o9Xk24Htgj7kmr-ATOp03j8ygrrHIxVV5J0G9wvUo-fasrS7KlcqPBCkq95Wq4QZB0B",
    alt: "Dhokra lost-wax bell metal handcrafted brass figurines depicting tribal dancing figures and wildlife with ancient antique patina, warm earth tones, artisan studio background Bastar.",
  },
  {
    id: "woodcraft",
    place: "Channapatna, KA",
    name: "Lacquer Woodcraft",
    material: "Vegetable-dyed non-toxic turned ivory woodcraft",
    total: "55 Wood Crafters",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCv4V2nQ2p_8CnoTBOfMdozBUnK8NLN5Mu7flnb5e6-Fq4o2EJyqijLJojrQSHuYDSfspv6P22T-3ngUpVHBSIZe_lMdLn8AjeDV0Cwl2AtzJuP3LNo1aJibP6Rx7HuIr_58tE0CUwn7l8T8wAJJE6ZSLyP2FFB0y0EGSR19aTzANMnfHnd4nbzzBod0TQUdj9KZGA172LASXSugNWWyKrBdrQupGBDFa04saytjLIO",
    alt: "Channapatna natural vegetable dye lacquer turned wooden toys and home accessories smoothly polished on ivory lathe backdrop, vibrant organic turmeric and indigo dyes.",
  },
  {
    id: "fiber",
    place: "Mayurbhanj, Odisha",
    name: "Natural Sabai Fiber",
    material: "Biodegradable hand-braided grass storage & baskets",
    total: "98 SHG Weavers",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCTVg_joGiUji5wRw1boRh1QiYvAKOENaHAuGnB1PNCCWhS155u6IVaEqPDlFwGxIsGymafznRHljH4sTc-englEuKb0Lh7Uq32gjuPzeKuSbPPSbRPuNCkqljOiLQlcziJNv53dDQKi9FpJhdXZrHeZK7WQm3M9hdE-WYN3tUo0kgS0exmQuXIj9o31_rWmSma-pKgYdEi52kX3Bu10b36BWM6uCi-kbsAirklphza",
    alt: "Rural women weaving golden sabai grass and natural river reed into contemporary tote bags and structured floor planters in rural Odisha, warm natural fiber textures.",
  },
];

function CraftCategories() {
  return (
    <section className="w-full py-space-xl bg-surface" id="all-crafts">
      <div className="max-w-7xl mx-auto px-margin">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg">
          <div>
            <span className="font-label-md text-label-md uppercase tracking-widest text-secondary">
              Indigenous Crafts
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1">
              Explore by Living Tradition
            </h2>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md mt-2 md:mt-0">
            Preserved across centuries, each discipline adheres to sacred
            artisanal materials and sustainable village ecology.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-space-md">
          {categoryData.map((cat) => (
            <Category key={cat.id} {...cat} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Category({ place, material, name, total, image, alt, href = "#" }) {
  return (
    <a
      className="group bg-surface-container-low hover:bg-surface-container rounded-xl p-space-md transition-all shadow-sm flex flex-col gap-space-sm cursor-pointer"
      href={href}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="w-full h-36 rounded-lg overflow-hidden relative">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          alt={alt || name}
          data-alt={alt || name}
          src={image}
        />
        {place && (
          <span className="absolute top-2 right-2 bg-primary/90 text-on-primary font-label-sm text-label-sm px-2 py-0.5 rounded">
            {place}
          </span>
        )}
      </div>
      <div className="flex items-center justify-between">
        <h3 className="font-headline-sm text-headline-sm text-on-surface">
          {name}
        </h3>
        <span className="material-symbols-outlined text-secondary group-hover:translate-x-1 transition-transform">
          arrow_forward
        </span>
      </div>
      <p className="font-body-sm text-body-sm text-on-surface-variant">
        {material}
      </p>
      <div className="font-label-sm text-label-sm text-secondary mt-auto pt-2">
        {total}
      </div>
    </a>
  );
}

function Spotlight() {
  return (
    <>
      {/* Master Artisan Spotlight of the Week */}
      <section
        className="w-full py-space-xl bg-surface-container-high/40"
        id="artisan-spotlight"
      >
        <div className="max-w-7xl mx-auto px-margin">
          <div className="bg-surface-container-lowest rounded-2xl shadow-md overflow-hidden p-space-lg lg:p-space-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
              {/* Artisan Portrait & Bio */}
              <div className="lg:col-span-5 relative">
                <div className="relative w-full h-[460px] rounded-xl overflow-hidden shadow-sm">
                  <img
                    className="w-full h-full object-cover"
                    data-alt="Portrait of Master Weaver Devji Premji, a dignified elderly Gujarati artisan with a white turban smiling warmly in his Kutch weaving workshop surrounded by colorful indigo and madder-red yarn hanks."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCr1DVEtlMyOZalipXtV2MfWftO3qLvDuHgLL4eqjeEksuvK6IoGTOKxS5t4njJfu6OLtd7p55DDyjrmI7tPbf4U0MeXO7VVeuwQirG8g0OgD-pg0ZF2kaxV_iVxDfpXwL19LFl7qy6eTPUhdUIfqxGoXMc_UgLz8VFdKOadwzotNsqk7aGccYblyaaUHGa5cU-JCG2Wfi9S3EK2mPHnGzfIpej2aBcdQB6qMdkE_eE"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-surface/95 backdrop-blur-sm p-space-md rounded-lg shadow-sm">
                    <div className="flex items-center gap-2">
                      <span
                        className="material-symbols-outlined text-tertiary-container text-xl"
                        style={{ fontVariationSettings: '"FILL" 1' }}
                      >
                        stars
                      </span>
                      <span className="font-label-lg text-label-lg text-on-surface">
                        National Merit Awardee 2018
                      </span>
                    </div>
                    <div className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                      Certified Master Artisan #GC-GUJ-014
                    </div>
                  </div>
                </div>
              </div>
              {/* Artisan Story Details */}
              <div className="lg:col-span-7 flex flex-col gap-space-md">
                <div className="flex flex-wrap items-center gap-space-xs">
                  <span className="bg-primary text-on-primary font-label-sm text-label-sm px-3 py-1 rounded-full uppercase tracking-wider">
                    Artisan Spotlight of the Week
                  </span>
                  <span className="bg-surface-container text-secondary font-label-sm text-label-sm px-3 py-1 rounded-full flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">
                      location_on
                    </span>
                    Bhujodi, Kutch, Gujarat
                  </span>
                  <span className="bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm px-3 py-1 rounded-full">
                    42 Years Loom Practice
                  </span>
                </div>
                <h2 className="font-headline-lg text-headline-lg text-on-surface">
                  Devji Premji Vankar
                </h2>
                <p className="font-story-lead text-story-lead text-secondary italic">
                  "When I throw the wooden shuttle through the warp, I am not
                  merely joining threads—I am carrying forward seven generations
                  of ancestral songs woven into raw sheep wool."
                </p>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Devji Bhai heads a cooperative of 26 weaving families in
                  Bhujodi village. Through GramCraft's direct platform
                  settlement, his collective receives full fair wages within 48
                  hours of shipment dispatch, completely bypassing city
                  wholesaler discounting.
                </p>
                {/* Lineage & Impact Ledger */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm py-2">
                  <div className="bg-surface-container-low p-3 rounded-lg">
                    <div className="font-label-sm text-label-sm text-on-surface-variant">
                      Loom Technique
                    </div>
                    <div className="font-label-lg text-label-lg text-primary mt-1">
                      Extra-Weft Throw Loom
                    </div>
                  </div>
                  <div className="bg-surface-container-low p-3 rounded-lg">
                    <div className="font-label-sm text-label-sm text-on-surface-variant">
                      Natural Dyes Used
                    </div>
                    <div className="font-label-lg text-label-lg text-primary mt-1">
                      Wild Indigo, Madder, Iron
                    </div>
                  </div>
                  <div className="bg-surface-container-low p-3 rounded-lg">
                    <div className="font-label-sm text-label-sm text-on-surface-variant">
                      Artisan Rating
                    </div>
                    <div className="font-label-lg text-label-lg text-secondary mt-1 flex items-center gap-1">
                      <span>5.0</span>
                      <span
                        className="material-symbols-outlined text-sm"
                        style={{ fontVariationSettings: '"FILL" 1' }}
                      >
                        star
                      </span>
                      <span className="text-xs text-on-surface-variant font-normal">
                        (184 patron reviews)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-nowrap items-center gap-space-md pt-2">
                  <button className="px-6 py-3 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg flex items-center gap-2 transition-colors">
                    <span>View Devji's Workshop Gallery (19 Works)</span>
                    <span className="material-symbols-outlined text-lg">
                      store
                    </span>
                  </button>
                  <button className="px-5 py-3 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-lg text-label-lg flex items-center gap-2 transition-colors">
                    <span className="material-symbols-outlined text-base text-secondary">
                      favorite
                    </span>
                    <span>Follow Weaver Collective</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const productsData = [
  {
    id: "molela-terracotta",
    location: "GI Tagged • Molela",
    material: "Terracotta Clay",
    timeToMake: "Handmade in 7 days",
    category: "Terracotta & Clay",
    filter: ["all", "gi", "home", "living"],
    name: "Surya Dev Votive Terracotta Wall Icon",
    crafterName: "Crafted by Smt. Kamala Devi • Molela, Rajasthan",
    price: "₹1,850",
    rating: 4.9,
    reviews: 42,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDeoLOovA1aF1jr4ZEo6yLy0mJ0KQWSpWHVCFn4z4OFWXmpUX6NfnbCk0mHNkCwcS8UiXSDmXvlwCMjNyXmGnmGXA5VoIqGVnKAWU9CKw-CSDIxPRQIMXhU5elo3PUkEXHN9BBMh60HSVJ0bVPM35SMp_GU4VBaBfgpCqJXzj7qMApNV0CU7roM94lRCBuQJsWdinRtzMOuuUy5uY9a1ZnWqHvU8g6G6LljbSoNsxyp",
    alt: "Authentic Molela votive terracotta clay wall plaque depicting a sacred sun and village deity, textured raw clay finish, rich reddish ochre tone, handcrafted in Rajasthan."
  },
  {
    id: "dhabla-shawl",
    location: "GI Tagged • Kutch",
    material: "Indigenous Desi Wool",
    timeToMake: "Handmade in 14 days",
    category: "Handloom Textiles",
    filter: ["all", "gi", "wearable", "living"],
    name: "Ancestral Handspun Dhabla Wool Shawl",
    crafterName: "Crafted by Devji Premji Vankar • Bhujodi, Gujarat",
    price: "₹3,850",
    rating: 5.0,
    reviews: 68,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBbgVKvzxHshb8tYIgls_5oWQj6AzI_CEXcY1rmcG3oOVm_J7OFiDogK68eLD6QmNFrHRuuBoATEpzC7f8yz_J31L3jOqg0tkCWvMGR1BDkPVD7FRIe9ydYz64rEUReSHQRSOsh85IQwfsRS-bCEVms_ShXFGvoFZXSUAUXgPNJZ4AsMOZ3aUKj_3XeIOpkbFgX4Fh0nLzBdbHPxY6bFejTw4V5pZHJ2fZGIQgEJIqm",
    alt: "Traditional Kutch handwoven desi wool Dhabla shawl with mirrorwork borders and geometric extra-weft thread motifs in organic madder red and natural sheep white."
  },
  {
    id: "bastar-nandi",
    location: "GI Tagged • Bastar",
    material: "Bell Metal & Beeswax",
    timeToMake: "Handmade in 9 days",
    category: "Dhokra Bell Metal",
    filter: ["all", "gi", "home", "living"],
    name: "Lost-Wax Bastar Nandi Sculpture",
    crafterName: "Crafted by Somaru Ram Kashyap • Kondagaon, Chhattisgarh",
    price: "₹2,200",
    rating: 4.8,
    reviews: 29,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA4inTY7DKQsHH8ROT0MjyUfxTFZsXvdkmlL-TiButdxGCYJ5gCV8sAhw45qklQKrUYwN9Mxuk854AkKvGrkFfHmgVW6zQH_oA_vzhGqetcx8BZ75zKsF4uXtF-_pjJn6dY-jz4Hvnbb4WNH5JK1_8Xz0Vjf3O3qZxrCeS0JXy4TdBjs5-yl0qb_hvtJmfoSAvH5BEaSQ0s65F9DKgGWNYlYcSBGR1w8wIWQD-kJebY",
    alt: "Bastar Dhokra cast brass sacred bull sculpture with delicate hand-coiled wax cord patterns and aged golden patina resting on warm wooden table."
  },
  {
    id: "pochampally-ikat",
    location: "GI Tagged • Telangana",
    material: "100% Mulberry Silk",
    timeToMake: "Handmade in 11 days",
    category: "Handloom Textiles",
    filter: ["all", "gi", "wearable"],
    name: "Double-Ikat Silk Chevron Stole",
    crafterName: "Crafted by B. Anjaiah Weavers' Trust • Bhoodan Pochampally",
    price: "₹2,850",
    rating: 4.9,
    reviews: 53,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBR1RD9TVnjiTcfxZa9y8IaJFYhKJhaxesQOdPLHCY1FgepM1F19C0RTAH14qzHt7MFbIv8IHYFY6BAVbSGu_JRt-bq3TUp0FBZrNSPT5uvNUNwOwRWbfuAq-HoPys805CpXRNPVAGpip2GDbnOTijPBW5iShZfJ_cDb5-W0tbco85h86fANfokAGay85jGKgxnkQiCJYU3RlitpavG2jm1iMor2o9v-ltkgOs9OHC5",
    alt: "Pochampally double ikat silk fabric stole in rich turmeric yellow and deep madder red geometric chevron weaves, soft folded drape texture."
  },
  {
    id: "channapatna-nesting",
    location: "GI Tagged • Karnataka",
    material: "Hale Wood & Veg Lac",
    timeToMake: "Handmade in 3 days",
    category: "Lacquer Woodcraft",
    filter: ["all", "gi", "home"],
    name: "Geometric Lacquer Architectural Nesting Set",
    crafterName: "Crafted by Syed Noor Lathe Studio • Channapatna, KA",
    price: "₹1,150",
    rating: 4.7,
    reviews: 31,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCX8tO6L07diEGA4-6ZPqSKhJhNiE3vhoSxaxLafj91Qtw6jch-pRZ2H5fqqmPgHf0S2-Szn-wtLrpFLgyyi7Fj8TL8ROZk8lTY98ZyRt8c5J6CymYK7Vkuw2m4hQw09xh8mrcBdge_X99PpQAfPa0Rjn_RpN8y2mu0slMXyc_6wi2R41ewS1nJHZfA5S-M2AFOdh8BLfZLrocySZbOtfiyLarTudVsDnFf-WtJCS7r",
    alt: "Channapatna turned wood stacking toy made of ivory wood with smooth natural vegetable lac finishes in warm ochre, forest green and natural terracotta red."
  },
  {
    id: "mayurbhanj-sabai",
    location: "Heritage Cluster • Odisha",
    material: "Sun-Cured Sabai Grass",
    timeToMake: "Handmade in 4 days",
    category: "Natural Fiber",
    filter: ["all", "home", "living"],
    name: "Mayurbhanj Coiled Sabai Floor Planter",
    crafterName: "Crafted by Maa Tarini Women SHG • Baripada, Odisha",
    price: "₹950",
    rating: 4.9,
    reviews: 47,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuASioNwOFrAVM9WqKtyYV50riKGJkSvXJjNkd7_kav496K6WAbyszUuVvGpgP53u24zkI8O7wk8IiEUJtN2eqNsIaZA0Zolb55M5AvVYM_WXdTTRbzngS68BuFs1B2jJoiubl9rbVWldWBWXBw0HvYvoLuE1aNp304-aiiD3jOmClDdAyGU4iQ1eahevkhtb842wEU_foylQIj472tuM5D7lMEkARaPwOPw7cRdmloT",
    alt: "Hand braided Sabai grass tall woven storage planter basket with dark forest green cotton interwoven handles, displayed in warm earthy sunlit room."
  }
];

function Products() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [addedItem, setAddedItem] = useState(null);

  const filterTabs = [
    { id: "all", label: "All Heritage" },
    { id: "gi", label: "GI Certified" },
    { id: "living", label: "Living Heritage" },
    { id: "home", label: "Home & Living" },
    { id: "wearable", label: "Wearable Art" },
  ];

  const handleAddToCart = (productName) => {
    setAddedItem(productName);
    setTimeout(() => setAddedItem(null), 2500);
  };

  const filteredProducts =
    activeFilter === "all"
      ? productsData
      : productsData.filter((p) => p.filter && p.filter.includes(activeFilter));

  return (
    <>
      {addedItem && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-on-primary px-4 py-3 rounded-lg shadow-xl flex items-center gap-2">
          <span className="material-symbols-outlined text-tertiary">
            check_circle
          </span>
          <span className="font-label-md text-label-md">
            Added "{addedItem}" to bag
          </span>
        </div>
      )}
      <section className="w-full py-space-xl bg-surface" id="marketplace-grid">
        <div className="max-w-7xl mx-auto px-margin">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-lg">
            <div>
              <span className="font-label-md text-label-md uppercase tracking-widest text-secondary">
                Curated Works
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1">
                Grassroots Masterpieces
              </h2>
            </div>
            <div
              className="flex items-center gap-space-xs overflow-x-auto pb-1 no-scrollbar"
              id="filter-chip-container"
            >
              {filterTabs.map((tab) => {
                const isActive = activeFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveFilter(tab.id)}
                    className={`filter-tab px-4 py-2 rounded-full font-label-sm text-label-sm whitespace-nowrap transition-colors cursor-pointer ${
                      isActive
                        ? "bg-primary text-on-primary"
                        : "bg-surface-container-high text-on-surface-variant hover:text-on-surface"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {filteredProducts.map((prod) => (
              <Product
                key={prod.id}
                {...prod}
                onAddToCart={() => handleAddToCart(prod.name)}
              />
            ))}
          </div>
          <div className="flex justify-center mt-space-xl">
            <button
              type="button"
              className="px-8 py-3.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-primary font-label-lg text-label-lg flex items-center gap-2 transition-colors cursor-pointer"
            >
              <span>Load 36 More Verified Works</span>
              <span className="material-symbols-outlined text-lg">refresh</span>
            </button>
          </div>
        </div>
      </section>

      {/* Transparency & Fair-Trade Impact Banner */}
      <section className="w-full py-space-xl bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-margin">
          <div className="bg-surface-container-lowest rounded-2xl shadow-md p-space-lg lg:p-space-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
              <div className="lg:col-span-5 flex flex-col gap-space-sm">
                <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-bold">
                  Uncompromising Transparency
                </span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface">
                  Where Every ₹1,000 You Spend Goes
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Traditional handicraft supply chains surrender up to 75% of
                  your money to regional agents, urban galleries, and logistics
                  brokers. GramCraft's direct cooperative model rewrites that
                  equation.
                </p>
                <div className="flex items-center gap-2 text-primary font-label-md text-label-md mt-2">
                  <span className="material-symbols-outlined text-tertiary">
                    verified
                  </span>
                  <span>
                    Audited under India Artisan Protection Protocol (IAPP)
                  </span>
                </div>
              </div>
              <div className="lg:col-span-7 flex flex-col gap-space-md bg-surface-container-low p-space-lg rounded-xl">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between font-label-md text-label-md">
                    <span className="text-primary font-bold">
                      Direct Payout to Artisan Bank Account
                    </span>
                    <span className="text-primary font-bold">₹900 (90%)</span>
                  </div>
                  <div className="w-full h-6 bg-surface-container-highest rounded-full overflow-hidden flex">
                    <div
                      className="h-full bg-primary transition-all duration-1000"
                      style={{ width: "90%" }}
                    />
                    <div
                      className="h-full bg-tertiary-fixed-dim transition-all duration-1000"
                      style={{ width: "10%" }}
                    />
                  </div>
                  <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                    <span>Direct cluster escrow settlement</span>
                    <span>Platform maintenance &amp; packing</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm pt-2">
                  <div className="bg-surface-container-lowest p-3 rounded-lg flex flex-col">
                    <div className="flex items-center gap-1.5 text-primary">
                      <span className="material-symbols-outlined text-lg">
                        account_balance_wallet
                      </span>
                      <span className="font-headline-sm text-headline-sm">
                        ₹900
                      </span>
                    </div>
                    <span className="font-label-md text-label-md text-on-surface font-semibold mt-1">
                      Artisan Direct
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                      Direct sovereign wage into village cooperative
                    </span>
                  </div>
                  <div className="bg-surface-container-lowest p-3 rounded-lg flex flex-col">
                    <div className="flex items-center gap-1.5 text-tertiary">
                      <span className="material-symbols-outlined text-lg">
                        cloud_done
                      </span>
                      <span className="font-headline-sm text-headline-sm">
                        ₹100
                      </span>
                    </div>
                    <span className="font-label-md text-label-md text-on-surface font-semibold mt-1">
                      Platform Tech
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                      High-speed escrow server &amp; GI verification tags
                    </span>
                  </div>
                  <div className="bg-surface-container-lowest p-3 rounded-lg flex flex-col">
                    <div className="flex items-center gap-1.5 text-secondary">
                      <span className="material-symbols-outlined text-lg">
                        block
                      </span>
                      <span className="font-headline-sm text-headline-sm">
                        ₹0
                      </span>
                    </div>
                    <span className="font-label-md text-label-md text-on-surface font-semibold mt-1">
                      Middlemen Cuts
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                      Zero city brokers or wholesale skimming
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Product({
  id,
  location,
  material,
  timeToMake,
  category,
  name,
  crafterName,
  price,
  rating = 4.9,
  reviews = 42,
  image,
  alt,
  onAddToCart,
}) {
  const [isWished, setIsWished] = useState(false);

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
      <div className="relative w-full aspect-[4/5] overflow-hidden">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          alt={alt || name}
          data-alt={alt || name}
          src={image}
        />
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {location && (
            <span className="bg-primary/90 text-on-primary font-label-sm text-label-sm px-2.5 py-1 rounded">
              {location}
            </span>
          )}
          {material && (
            <span className="bg-surface-container-lowest/90 text-on-surface font-label-sm text-label-sm px-2.5 py-0.5 rounded">
              {material}
            </span>
          )}
        </div>
        <button
          type="button"
          aria-label="Add to wishlist"
          onClick={() => setIsWished(!isWished)}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-surface-container-lowest/80 hover:bg-surface-container-lowest text-secondary flex items-center justify-center transition-colors shadow-sm cursor-pointer"
        >
          <span
            className="material-symbols-outlined text-lg"
            style={isWished ? { fontVariationSettings: "'FILL' 1" } : {}}
          >
            favorite
          </span>
        </button>
        {timeToMake && (
          <div className="absolute bottom-3 left-3">
            <span className="bg-tertiary-container text-on-tertiary font-label-sm text-label-sm px-2.5 py-1 rounded">
              {timeToMake}
            </span>
          </div>
        )}
      </div>
      <div className="p-space-md flex flex-col flex-1 gap-space-xs">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">
            {category}
          </span>
          <div className="flex items-center text-secondary font-label-sm text-label-sm gap-0.5">
            <span
              className="material-symbols-outlined text-sm"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
            <span>{rating}</span>
            <span className="text-on-surface-variant font-normal">
              ({reviews})
            </span>
          </div>
        </div>
        <h3 className="font-headline-sm text-headline-sm text-on-surface">
          {name}
        </h3>
        <p className="font-label-sm text-label-sm text-on-surface-variant line-clamp-1">
          {crafterName}
        </p>
        <div className="mt-auto pt-space-sm flex items-center justify-between">
          <div>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Direct Artisan Price
            </span>
            <div className="font-price-display text-price-display text-primary">
              {price}
            </div>
          </div>
          <button
            type="button"
            className="add-btn px-4 py-2.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md flex items-center gap-1.5 transition-all cursor-pointer"
            onClick={onAddToCart}
          >
            <span className="material-symbols-outlined text-base">
              local_mall
            </span>
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}
export default Landing;
