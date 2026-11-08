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
export default Landing;
