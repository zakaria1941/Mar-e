/* MARÉE — catalogue.
   Demo data. Every figure here is invented for the prototype. */

const IMG = (id, w, h) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

const PRODUCTS = [
  {
    sku: "MR-001",
    name: "Surface Cleansing Milk",
    depth: 0,
    zone: "Shoreline",
    family: "Cleanse",
    price: 62,
    size: "150 ml",
    active: "Samphire and oat lipid",
    ph: 5.5,
    texture: "Milk",
    batch: "L-2409-A",
    yield: "1,400 units / harvest",
    images: [
      IMG("photo-1748543668676-ea8241cb3886", 1000, 1250),
      IMG("photo-1585945037805-5fd82c2e60b1", 1000, 1250)
    ],
    short: "A milk that lifts sunscreen and salt without stripping the barrier.",
    long:
      "Samphire grows where the tide leaves it — half the day in seawater, half in air. It holds water in its own tissue to survive that, and the extract does something similar on skin. This is a rinse-off milk with no sulphates and no fragrance, formulated to leave the acid mantle intact so the steps after it can work.",
    actives: [
      { pct: "6%", name: "Samphire (Crithmum maritimum) extract", note: "harvested at the tide line, Île de Batz" },
      { pct: "3%", name: "Oat lipid concentrate", note: "restores the barrier after rinsing" },
      { pct: "1%", name: "Glycerin, marine sourced", note: "humectant" }
    ],
    use: "Morning and night on dry skin. Work 30 seconds over the face and jaw, add a little water to emulsify, then rinse. Follow with the Saline Essence while skin is still damp.",
    ingredients:
      "Aqua, Glycerin, Coco-Caprylate, Crithmum Maritimum Extract, Avena Sativa Kernel Oil, Cetearyl Alcohol, Squalane, Sodium Stearoyl Lactylate, Panthenol, Sodium Gluconate, Sodium Benzoate, Potassium Sorbate."
  },
  {
    sku: "MR-002",
    name: "Saline Essence",
    depth: 2,
    zone: "Intertidal",
    family: "Hydrate",
    price: 74,
    size: "200 ml",
    active: "Cold marine water, twelve minerals",
    ph: 4.8,
    texture: "Water",
    batch: "L-2411-C",
    yield: "2,100 units / harvest",
    images: [
      IMG("photo-1595500383097-2ac105c5f705", 1000, 1250),
      IMG("photo-1558470570-c9a5a5ade867", 1000, 1250)
    ],
    short: "A watery first layer that makes everything after it absorb faster.",
    long:
      "Drawn from two metres below the surface at slack tide, filtered cold, and reduced to the mineral fraction. It is not a toner in the astringent sense — there is no alcohol in it. It is a wetting layer. Skin that is already damp takes an oil-based serum in roughly half the time.",
    actives: [
      { pct: "82%", name: "Cold-filtered marine water", note: "magnesium, zinc, copper and nine trace minerals" },
      { pct: "4%", name: "Sodium PCA", note: "natural moisturising factor" },
      { pct: "0.5%", name: "Beta-glucan", note: "calms after sun or wind exposure" }
    ],
    use: "Press two pumps into damp skin with flat palms. Do not wipe with cotton — the point is to leave the layer sitting on the surface. Follow within 60 seconds.",
    ingredients:
      "Maris Aqua, Aqua, Glycerin, Sodium PCA, Betaine, Beta-Glucan, Allantoin, Sodium Hyaluronate, Sodium Citrate, Sodium Benzoate, Potassium Sorbate."
  },
  {
    sku: "MR-003",
    name: "Photic Zone Day Fluid",
    depth: 8,
    zone: "Photic zone",
    family: "Protect",
    price: 96,
    size: "40 ml",
    active: "Non-nano zinc oxide, SPF 40",
    ph: 6.2,
    texture: "Fluid",
    batch: "L-2408-B",
    yield: "900 units / harvest",
    images: [
      IMG("photo-1616046560582-41ac3c954715", 1000, 1250),
      IMG("photo-1603401712778-ab0575182f12", 1000, 1250)
    ],
    short: "Mineral protection with no cast, made for skin that is being treated.",
    long:
      "Eight metres down is where usable light stops being harsh. This is the formula that lets you use acids and retinoids at night without undoing them by lunchtime. Non-nano zinc, suspended in a fluid that dries to a matte finish and takes makeup over the top.",
    actives: [
      { pct: "14%", name: "Zinc oxide, non-nano", note: "broad spectrum UVA and UVB" },
      { pct: "2%", name: "Sea fennel ferment", note: "antioxidant support under daylight" },
      { pct: "1%", name: "Bisabolol", note: "reduces the flush that mineral filters can cause" }
    ],
    use: "Two fingers' length as the last morning step, every day the sun is up. Reapply at four hours if you are outside.",
    ingredients:
      "Aqua, Zinc Oxide, Caprylic/Capric Triglyceride, Glycerin, Isoamyl Laurate, Silica, Crithmum Maritimum Ferment, Polyglyceryl-3 Diisostearate, Bisabolol, Tocopherol, Sodium Chloride, Sodium Benzoate."
  },
  {
    sku: "MR-004",
    name: "Kelp Forest Cream",
    depth: 12,
    zone: "Kelp forest",
    family: "Hydrate",
    price: 118,
    size: "50 ml",
    active: "Sugar kelp ferment",
    ph: 5.4,
    texture: "Cream",
    batch: "L-2410-A",
    yield: "1,100 units / harvest",
    images: [
      IMG("photo-1552046122-03184de85e08", 1000, 1250),
      IMG("photo-1608068811588-3a67006b7489", 1000, 1250)
    ],
    short: "The daily cream. Rich enough for winter, light enough for August.",
    long:
      "Sugar kelp is cut by hand at twelve metres, above the holdfast so the plant regrows. We ferment it for fourteen days, which breaks the polysaccharides down to a size skin can actually use. The result is a cream that holds water on the surface for hours rather than minutes.",
    actives: [
      { pct: "11%", name: "Saccharina latissima ferment", note: "fourteen-day ferment, cut at −12 m" },
      { pct: "5%", name: "Squalane, olive derived", note: "matches skin's own lipid profile" },
      { pct: "2%", name: "Ceramide NP complex", note: "barrier repair" }
    ],
    use: "Morning and night, over serum. A pea-sized amount. In winter, warm a second layer over the cheeks and around the eyes.",
    ingredients:
      "Aqua, Saccharina Latissima Ferment Filtrate, Squalane, Glycerin, Cetearyl Alcohol, Shea Butter, Ceramide NP, Ceramide AP, Phytosphingosine, Cholesterol, Sodium Hyaluronate, Tocopherol, Xanthan Gum, Sodium Benzoate."
  },
  {
    sku: "MR-005",
    name: "Tidal Repair Serum",
    depth: 40,
    zone: "Sublittoral",
    family: "Treat",
    price: 128,
    size: "30 ml",
    active: "Sea fennel and 5% niacinamide",
    ph: 5.2,
    texture: "Serum",
    batch: "L-2412-D",
    yield: "760 units / harvest",
    images: [
      IMG("photo-1608571423902-eed4a5ad8108", 1000, 1250),
      IMG("photo-1573461160327-b450ce3d8e7f", 1000, 1250)
    ],
    short: "The house serum. Evens tone and settles reactive skin over eight weeks.",
    long:
      "Sea fennel at forty metres grows slowly in cold, low light, and concentrates its protective compounds to compensate. Paired with niacinamide at 5% — high enough to work on pigmentation and sebum, low enough that reactive skin can stay on it daily. This is the formula the house is known for.",
    actives: [
      { pct: "5%", name: "Niacinamide (vitamin B3)", note: "tone, pore appearance, sebum regulation" },
      { pct: "3%", name: "Crithmum maritimum extract", note: "hand-harvested once a year, at −40 m" },
      { pct: "1%", name: "Palmitoyl tripeptide-5", note: "supports collagen density" }
    ],
    use: "Three to four drops at night on damp skin, before cream. Introduce at every second night for the first two weeks. Not to be layered with a separate high-strength acid on the same evening.",
    ingredients:
      "Aqua, Niacinamide, Glycerin, Propanediol, Crithmum Maritimum Extract, Sodium Hyaluronate, Panthenol, Palmitoyl Tripeptide-5, Zinc PCA, Allantoin, Beta-Glucan, Hydroxyacetophenone, Sodium Benzoate, Potassium Sorbate."
  },
  {
    sku: "MR-006",
    name: "Cold Current Exfoliant",
    depth: 60,
    zone: "Circalittoral",
    family: "Treat",
    price: 88,
    size: "100 ml",
    active: "8% marine AHA complex",
    ph: 3.8,
    texture: "Liquid",
    batch: "L-2407-E",
    yield: "1,300 units / harvest",
    images: [
      IMG("photo-1595500381966-eee2034aae48", 1000, 1250),
      IMG("photo-1748543668687-624e058c367c", 1000, 1250)
    ],
    short: "A twice-weekly acid that resurfaces without leaving skin raw.",
    long:
      "An eight percent complex of lactic and gluconic acids buffered with a red algae extract that slows the release. Skin gets the full resurfacing effect over about twenty minutes rather than all at once, which is the difference between smooth and stinging.",
    actives: [
      { pct: "6%", name: "Lactic acid", note: "resurfacing, water-binding" },
      { pct: "2%", name: "Gluconolactone", note: "gentle polyhydroxy acid, tolerated by sensitised skin" },
      { pct: "1%", name: "Chondrus crispus extract", note: "buffers the release curve" }
    ],
    use: "Two evenings a week on clean, dry skin. Leave for twenty minutes, then continue with serum. Sunscreen the next morning is not optional.",
    ingredients:
      "Aqua, Lactic Acid, Glycerin, Gluconolactone, Sodium Hydroxide, Chondrus Crispus Extract, Panthenol, Allantoin, Sodium Citrate, Hydroxyacetophenone, Sodium Benzoate."
  },
  {
    sku: "MR-007",
    name: "Benthic Eye Concentrate",
    depth: 120,
    zone: "Twilight margin",
    family: "Treat",
    price: 142,
    size: "15 ml",
    active: "Deep-water peptide DP-9",
    ph: 5.6,
    texture: "Gel-cream",
    batch: "L-2409-F",
    yield: "480 units / harvest",
    images: [
      IMG("photo-1748543668646-e81cda0890f3", 1000, 1250),
      IMG("photo-1748543669178-efd3de4e64e0", 1000, 1250)
    ],
    short: "For the thin skin under the eye, where everything shows first.",
    long:
      "At a hundred and twenty metres there is almost no light and the temperature holds near nine degrees year round. Organisms there build unusually stable proteins to survive it. DP-9 is our synthesised analogue of one of them, at a concentration high enough to matter and a texture light enough to sit under makeup.",
    actives: [
      { pct: "4%", name: "Peptide DP-9", note: "synthesised analogue of a deep-water protein" },
      { pct: "3%", name: "Caffeine", note: "reduces morning puffiness" },
      { pct: "2%", name: "Marine collagen fragment", note: "surface smoothing" }
    ],
    use: "One rice grain per eye, morning and night. Tap along the orbital bone with the ring finger — never drag the lid itself.",
    ingredients:
      "Aqua, Glycerin, Caffeine, Dipeptide-9, Squalane, Hydrolyzed Marine Collagen, Sodium Hyaluronate, Panthenol, Butylene Glycol, Carbomer, Sodium Hydroxide, Sodium Benzoate."
  },
  {
    sku: "MR-008",
    name: "Abyssal Night Balm",
    depth: 180,
    zone: "Aphotic threshold",
    family: "Hydrate",
    price: 164,
    size: "50 ml",
    active: "Deep algae and squalane",
    ph: 5.9,
    texture: "Balm",
    batch: "L-2412-A",
    yield: "320 units / harvest",
    images: [
      IMG("photo-1602928321679-560bb453f190", 1000, 1250),
      IMG("photo-1748543668699-a8a9398e9161", 1000, 1250)
    ],
    short: "The last step. An occlusive balm that seals eight hours of repair.",
    long:
      "One hundred and eighty metres is the practical floor of what we can harvest, and we take from it once a year. The algae there survives on almost nothing, and the lipid fraction it produces is unusually resistant to oxidation. Warmed between the palms this melts to an oil; on skin it sets to a seal that is still there in the morning.",
    actives: [
      { pct: "18%", name: "Deep-water algae lipid", note: "single annual harvest, −180 m" },
      { pct: "12%", name: "Squalane", note: "occlusive without heaviness" },
      { pct: "2%", name: "Vitamin F complex", note: "essential fatty acids" }
    ],
    use: "Two nights a week, or nightly in hard winter. Warm a small amount between the palms until it turns to oil, then press — do not rub — over the finished routine.",
    ingredients:
      "Caprylic/Capric Triglyceride, Squalane, Butyrospermum Parkii Butter, Algae Extract, Helianthus Annuus Seed Oil, Linoleic Acid, Cera Alba, Tocopherol, Bisabolol, Rosmarinus Officinalis Leaf Extract."
  }
];

const JOURNAL = [
  {
    tag: "Field note",
    date: "12 Nov 2025",
    title: "Why we harvest sea fennel once a year",
    excerpt:
      "A stand of Crithmum takes four seasons to rebuild what a single cut removes. Our licence allows more. We take less.",
    image: IMG("photo-1697817315238-788e8a16def4", 900, 600)
  },
  {
    tag: "Laboratory",
    date: "28 Oct 2025",
    title: "What a fourteen-day ferment actually changes",
    excerpt:
      "Kelp polysaccharides are too large to cross the barrier. Fermentation cuts them down. Here is the size distribution before and after.",
    image: IMG("photo-1617155093730-a8bf47be792d", 900, 600)
  },
  {
    tag: "On skin",
    date: "03 Oct 2025",
    title: "Reading an ingredient list from the back",
    excerpt:
      "The last third of an INCI list is where the preservative system lives, and it tells you more about a formula than the first line does.",
    image: IMG("photo-1748543668687-624e058c367c", 900, 600)
  }
];

const conditions = {
  site: "Île de Batz, 48.7452° N, 4.0142° W",
  temp: "11.4 °C",
  salinity: "34.7 PSU",
  tide: "Ebbing · low 04:12",
  visibility: "8.2 m"
};
