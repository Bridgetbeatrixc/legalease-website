// All site copy lives here, in English and Indonesian.
// Anything marked TODO is a placeholder waiting for Bridget's real content.

export type Lang = "en" | "id";

export const IG_HANDLE = "designease_id";
export const IG_URL = `https://instagram.com/${IG_HANDLE}`;
export const DM_URL = `https://ig.me/m/${IG_HANDLE}`;

export const base = (lang: Lang) => (lang === "en" ? "" : "/id");

type Service = {
  no: string;
  title: string;
  line: string;
  items: string[];
};

type Step = { title: string; body: string };

type Plan = {
  name: string;
  forWho: string;
  includes: string[];
  // Prices are deliberately empty until Bridget confirms them.
  price: string;
  unit: string;
};

type Founder = {
  name: string;
  img: string;
  role: string;
  city: string;
  focus: string;
  edu: string;
};

const founders = (lang: Lang): Founder[] => [
  {
    name: "Bridget Beatrix Claire",
    img: "/img/team/bridget.jpg",
    role: "Co-Founder",
    city: "Surabaya",
    focus: lang === "en" ? "Brand, social media & web design" : "Brand, sosial media & desain web",
    edu: lang === "en" ? "Informatics, Universitas Ciputra · IISMA, Korea University" : "Informatika, Universitas Ciputra · IISMA, Korea University",
  },
  {
    name: "Vanessa Priscilia Wijaya",
    img: "/img/team/vanessa.jpg",
    role: "Co-Founder",
    city: "Surabaya",
    focus: lang === "en" ? "UI/UX & front-end development" : "UI/UX & front-end development",
    edu: lang === "en" ? "Informatics, Universitas Ciputra" : "Informatika, Universitas Ciputra",
  },
  {
    name: "Keanu Lim",
    img: "/img/team/keanu.jpg",
    role: "Co-Founder",
    city: "Singapore",
    focus: lang === "en" ? "Clients & partnerships, Singapore" : "Klien & partnership, Singapura",
    edu: lang === "en" ? "Aerospace Engineering, NTU" : "Aerospace Engineering, NTU",
  },
];

const en = {
  nav: { work: "Work", services: "Services", about: "About", contact: "Contact", dm: "DM us" },
  langSwitch: { label: "Bahasa", href: "/id" },
  meta: {
    title: "DesignEase | Branding, social media & websites · Surabaya · Singapore",
    description:
      "DesignEase is a branding and design studio for growing businesses in Surabaya and Singapore: brand identity, social media and websites.",
  },
  hero: {
    kicker: "Brand identity · Social media · Websites",
    h1a: "Look as good as",
    h1b: "the work you do.",
    sub: "DesignEase is a design studio for growing businesses in Surabaya and Singapore. We build the logo, the feed and the website, and make them all say the same thing.",
    primary: "DM @designease_id",
    secondary: "See our work",
    cities: [
      { city: "Singapore", coord: "1.35° N · 103.82° E" },
      { city: "Surabaya", coord: "7.26° S · 112.75° E" },
    ],
  },
  services: {
    kicker: "What we do",
    h2a: "Three things,",
    h2b: "done properly.",
    intro: "Most small businesses don't need an agency retainer. They need a brand that holds together, from the logo on the shopfront to the last post on Instagram.",
    list: [
      {
        no: "01",
        title: "Brand identity",
        line: "A logo and a system around it, so every touchpoint looks like you.",
        items: ["Logo & logo variations", "Colour palette & typography", "Brand guide", "Promo materials: brochures, banners, business cards"],
      },
      {
        no: "02",
        title: "Social media",
        line: "An Instagram feed that looks intentional and keeps showing up.",
        items: ["Feed & carousel design", "Stories & highlight covers", "Captions in English, Bahasa or Mandarin", "Content planning, end to end"],
      },
      {
        no: "03",
        title: "Websites",
        line: "Fast, clean sites and landing pages that turn visitors into enquiries.",
        items: ["Landing pages & company profiles", "Mobile-first, fast on any phone", "Bilingual sites", "Built and handed over to you"],
      },
    ] as Service[],
    more: "All services",
  },
  work: {
    kicker: "Selected work",
    h2a: "Proof,",
    h2b: "not promises.",
    all: "All work",
    note: "Some pieces were made by our founders in-house at Kasheer and Rintisan. Identity concepts are self-initiated studies with fictional brand names.",
  },
  why: {
    kicker: "Branding 101",
    h2a: "It was never",
    h2b: "just the logo.",
    points: [
      { no: "01", title: "Trust", body: "People trust what looks intentional. A consistent brand tells customers you'll still be here next year." },
      { no: "02", title: "Memory", body: "Being remembered beats being seen. Same colours, same voice, every time, until people recognise you without reading." },
      { no: "03", title: "Value", body: "Look premium, price like it. Good design lets you charge for the quality you already deliver." },
    ],
  },
  process: {
    kicker: "How we work",
    h2a: "Step by step,",
    h2b: "with you.",
    steps: [
      { title: "Discovery call", body: "We get to know your business: who your customers are, what's not working, and where you want to go. Over WhatsApp or a video call." },
      { title: "Research & moodboard", body: "We study your competitors and audience, then send a visual direction for you to approve before any design starts." },
      { title: "Design & revisions", body: "Logo, feed or website, built on the direction we agreed. We refine it together until it feels right." },
      { title: "Handover", body: "Every final file plus a colour and font guide, ready for your team to use anywhere." },
    ] as Step[],
  },
  places: {
    kicker: "Where we are",
    h2a: "One studio,",
    h2b: "two countries.",
    body: "Our team works from Singapore and Surabaya, so we understand both markets: what a Tampines salon needs is not what a Surabaya depot needs.",
    langsKicker: "We speak your language",
    langs: [
      { word: "Halo.", name: "Bahasa Indonesia", note: "Kita ngobrol santai." },
      { word: "Hello.", name: "English", note: "Briefs, calls and copy." },
      { word: "你好。", name: "中文 · Mandarin", note: "我们也说中文。" },
    ],
  },
  pricing: {
    kicker: "Pricing",
    h2a: "Clear prices,",
    h2b: "no surprises.",
    intro: "Every brand is different, so we confirm the final scope with you before anything starts. These are our starting points.",
    pending: "Price coming soon",
    from: "from",
    plans: [
      {
        name: "Brand identity",
        forWho: "New businesses and brands that need a refresh.",
        includes: ["Logo + variations", "Colour & type system", "Brand guide", "1 promo item of your choice"],
        price: "", // TODO: Bridget to confirm (SGD + IDR)
        unit: "one-off",
      },
      {
        name: "Social media",
        forWho: "Businesses that want a consistent, active Instagram.",
        includes: ["Monthly feed + stories", "Captions", "Content plan", "Ad spend not included"],
        price: "", // TODO: Bridget to confirm (SGD + IDR)
        unit: "per month",
      },
      {
        name: "Website",
        forWho: "Businesses that need to be found and trusted online.",
        includes: ["Landing page or company profile", "Mobile-first build", "Bilingual option", "Handover & guide"],
        price: "", // TODO: Bridget to confirm (SGD + IDR)
        unit: "one-off",
      },
    ] as Plan[],
    trial: "New: selected brands get 2 weeks of social media, free. Like it? We continue. Not a fit? No worries.",
    terms: "*T&C apply",
  },
  team: {
    kicker: "The people",
    h2a: "The people",
    h2b: "behind the work.",
    sub: "Three co-founders. Two countries. One studio.",
  },
  cta: {
    h2a: "Tell us about",
    h2b: "your business.",
    sub: "Send us a DM on Instagram. We'll take it from there.",
    button: "DM @designease_id",
  },
  footer: {
    tagline: "Branding, social media & websites for growing businesses.",
    company: "DesignEase is a brand of PT Ease Solusi Indonesia.",
    cities: "Surabaya · Singapore",
  },
  pages: {
    work: { kicker: "Work", h1a: "Selected", h1b: "projects.", sub: "Brand identity, social media and websites, from Surabaya to Singapore." },
    services: { kicker: "Services", h1a: "What we", h1b: "can do for you.", sub: "Brand identity, social media and websites. Pick one, or let us build the whole thing." },
    about: {
      kicker: "About",
      h1a: "We help businesses look",
      h1b: "as good as they are.",
      sub: "DesignEase started with a simple observation.",
      story: [
        "We kept meeting businesses with great products and great service, and a quiet, messy Instagram. Not because the owners didn't care. Their time just goes into running the business.",
        "So we started DesignEase: a small studio that handles the part owners don't have time for. The logo, the feed, the website, all saying the same thing.",
        "We're designers and developers first, and we don't do templates. AI helps us move faster, but every decision about your brand is made by a person.",
      ],
      legalKicker: "The company behind the studio",
      legal: "DesignEase is run by PT Ease Solusi Indonesia, a registered Indonesian company (SK Kemenkumham AHU-A137715.AH.01.30.Tahun 2026). Our sister brand LegalEase helps businesses with their legal setup.",
    },
    contact: {
      kicker: "Contact",
      h1a: "Let's talk about",
      h1b: "your brand.",
      sub: "The fastest way to reach us is a DM on Instagram. Tell us your business name, what you sell and what you need help with.",
      list: [
        "Your business name and Instagram",
        "What you need: identity, social media, website, or all three",
        "Where you are: Surabaya, Singapore, or elsewhere",
        "Your timeline, if you have one",
      ],
      listTitle: "What to send us",
    },
  },
  labels: {
    onProgress: "On progress",
    caseFor: "For",
    services: "Services",
    year: "Year",
  },
};

export type Dict = typeof en;

const id: Dict = {
  nav: { work: "Karya", services: "Layanan", about: "Tentang", contact: "Kontak", dm: "DM kami" },
  langSwitch: { label: "English", href: "/" },
  meta: {
    title: "DesignEase | Jasa logo, branding, sosial media & website · Surabaya · Singapura",
    description:
      "DesignEase adalah studio desain untuk bisnis yang sedang bertumbuh di Surabaya dan Singapura: identitas brand, sosial media, dan website.",
  },
  hero: {
    kicker: "Identitas brand · Sosial media · Website",
    h1a: "Tampil sebagus",
    h1b: "kualitas bisnismu.",
    sub: "DesignEase adalah studio desain untuk bisnis yang sedang bertumbuh di Surabaya dan Singapura. Kami bikin logo, feed, dan website yang ngomong hal yang sama.",
    primary: "DM @designease_id",
    secondary: "Lihat karya kami",
    cities: [
      { city: "Singapura", coord: "1.35° N · 103.82° E" },
      { city: "Surabaya", coord: "7.26° S · 112.75° E" },
    ],
  },
  services: {
    kicker: "Yang kami kerjakan",
    h2a: "Tiga hal,",
    h2b: "dikerjakan serius.",
    intro: "Kebanyakan bisnis kecil nggak butuh agensi mahal. Yang dibutuhkan adalah brand yang rapi dan konsisten, dari logo di toko sampai postingan terakhir di Instagram.",
    list: [
      {
        no: "01",
        title: "Identitas brand",
        line: "Logo plus sistem di sekitarnya, supaya semua tampilan terasa kamu banget.",
        items: ["Logo & variasinya", "Palet warna & tipografi", "Panduan brand", "Materi promo: brosur, banner, kartu nama"],
      },
      {
        no: "02",
        title: "Sosial media",
        line: "Feed Instagram yang kelihatan niat dan rutin muncul.",
        items: ["Desain feed & carousel", "Story & cover highlight", "Caption Bahasa, Inggris, atau Mandarin", "Perencanaan konten dari awal sampai akhir"],
      },
      {
        no: "03",
        title: "Website",
        line: "Website dan landing page yang cepat, rapi, dan bikin orang tanya-tanya.",
        items: ["Landing page & company profile", "Mobile-first, cepat di HP apa saja", "Website dua bahasa", "Dibangun lalu diserahkan ke kamu"],
      },
    ],
    more: "Semua layanan",
  },
  work: {
    kicker: "Karya pilihan",
    h2a: "Bukti,",
    h2b: "bukan janji.",
    all: "Semua karya",
    note: "Sebagian karya dibuat founder kami secara in-house di Kasheer dan Rintisan. Konsep identitas adalah studi mandiri dengan nama brand fiktif.",
  },
  why: {
    kicker: "Branding 101",
    h2a: "Dari dulu",
    h2b: "bukan cuma logo.",
    points: [
      { no: "01", title: "Kepercayaan", body: "Orang percaya sama yang kelihatan niat. Brand yang konsisten bilang ke pelanggan: kami serius dan akan tetap ada." },
      { no: "02", title: "Diingat", body: "Diingat lebih penting dari sekadar dilihat. Warna dan gaya bicara yang sama, terus-terusan, sampai orang kenal tanpa baca." },
      { no: "03", title: "Nilai", body: "Kelihatan premium, harga pun bisa premium. Desain yang bagus bikin kualitasmu kelihatan." },
    ],
  },
  process: {
    kicker: "Cara kerja kami",
    h2a: "Langkah demi langkah,",
    h2b: "bareng kamu.",
    steps: [
      { title: "Ngobrol dulu", body: "Kenalan sama bisnismu: siapa pelangganmu, apa masalahnya, dan mau dibawa ke mana. Lewat WhatsApp atau video call." },
      { title: "Riset & moodboard", body: "Kami pelajari kompetitor dan audiensmu, lalu kirim arah visual untuk kamu setujui sebelum mulai desain." },
      { title: "Desain & revisi", body: "Logo, feed, atau website dikerjakan sesuai arah yang sudah disepakati. Kita revisi bareng sampai pas." },
      { title: "Serah terima", body: "Semua file final plus panduan warna dan font, siap dipakai timmu di mana saja." },
    ],
  },
  places: {
    kicker: "Lokasi kami",
    h2a: "Satu studio,",
    h2b: "dua negara.",
    body: "Tim kami ada di Singapura dan Surabaya, jadi kami paham dua pasar sekaligus: kebutuhan salon di Tampines beda dengan depot di Surabaya.",
    langsKicker: "Kami bicara bahasamu",
    langs: [
      { word: "Halo.", name: "Bahasa Indonesia", note: "Kita ngobrol santai." },
      { word: "Hello.", name: "English", note: "Brief, call, dan copy." },
      { word: "你好。", name: "中文 · Mandarin", note: "我们也说中文。" },
    ],
  },
  pricing: {
    kicker: "Harga",
    h2a: "Harga jelas,",
    h2b: "tanpa kejutan.",
    intro: "Setiap brand beda, jadi ruang lingkup final selalu kami konfirmasi dulu sebelum mulai. Ini titik awalnya.",
    pending: "Harga segera hadir",
    from: "mulai",
    plans: [
      {
        name: "Identitas brand",
        forWho: "Bisnis baru dan brand yang butuh penyegaran.",
        includes: ["Logo + variasi", "Sistem warna & font", "Panduan brand", "1 materi promo pilihanmu"],
        price: "", // TODO
        unit: "sekali bayar",
      },
      {
        name: "Sosial media",
        forWho: "Bisnis yang mau Instagram konsisten dan aktif.",
        includes: ["Feed + story bulanan", "Caption", "Rencana konten", "Belum termasuk biaya iklan"],
        price: "", // TODO
        unit: "per bulan",
      },
      {
        name: "Website",
        forWho: "Bisnis yang perlu ditemukan dan dipercaya online.",
        includes: ["Landing page atau company profile", "Mobile-first", "Opsi dua bahasa", "Serah terima & panduan"],
        price: "", // TODO
        unit: "sekali bayar",
      },
    ],
    trial: "Baru: brand terpilih dapat 2 minggu sosial media gratis. Cocok? Lanjut. Nggak cocok? Santai aja.",
    terms: "*S&K berlaku",
  },
  team: {
    kicker: "Tim kami",
    h2a: "Orang-orang",
    h2b: "di balik karya.",
    sub: "Tiga co-founder. Dua negara. Satu studio.",
  },
  cta: {
    h2a: "Ceritain dulu",
    h2b: "bisnismu.",
    sub: "Kirim DM di Instagram. Sisanya kami bantu.",
    button: "DM @designease_id",
  },
  footer: {
    tagline: "Branding, sosial media & website untuk bisnis yang bertumbuh.",
    company: "DesignEase adalah brand dari PT Ease Solusi Indonesia.",
    cities: "Surabaya · Singapura",
  },
  pages: {
    work: { kicker: "Karya", h1a: "Proyek", h1b: "pilihan.", sub: "Identitas brand, sosial media, dan website, dari Surabaya sampai Singapura." },
    services: { kicker: "Layanan", h1a: "Yang bisa kami", h1b: "bantu.", sub: "Identitas brand, sosial media, dan website. Pilih satu, atau serahkan semuanya ke kami." },
    about: {
      kicker: "Tentang",
      h1a: "Kami bantu bisnis tampil",
      h1b: "sebagus aslinya.",
      sub: "DesignEase berawal dari satu pengamatan sederhana.",
      story: [
        "Kami sering ketemu bisnis dengan produk dan pelayanan bagus, tapi Instagram-nya sepi dan berantakan. Bukan karena pemiliknya nggak peduli. Waktunya habis buat ngurus bisnis.",
        "Jadi kami bikin DesignEase: studio kecil yang pegang bagian yang nggak sempat diurus pemilik. Logo, feed, website, semuanya ngomong hal yang sama.",
        "Kami desainer dan developer, dan kami nggak pakai template. AI bantu kami kerja lebih cepat, tapi setiap keputusan soal brand-mu tetap diambil manusia.",
      ],
      legalKicker: "Perusahaan di balik studio",
      legal: "DesignEase dijalankan oleh PT Ease Solusi Indonesia, perusahaan Indonesia yang terdaftar (SK Kemenkumham AHU-A137715.AH.01.30.Tahun 2026). Brand saudara kami, LegalEase, membantu urusan legalitas usaha.",
    },
    contact: {
      kicker: "Kontak",
      h1a: "Yuk ngobrol soal",
      h1b: "brand-mu.",
      sub: "Cara tercepat menghubungi kami adalah DM di Instagram. Ceritakan nama bisnis, apa yang kamu jual, dan apa yang perlu dibantu.",
      list: [
        "Nama bisnis dan Instagram-mu",
        "Yang dibutuhkan: identitas, sosial media, website, atau ketiganya",
        "Lokasimu: Surabaya, Singapura, atau kota lain",
        "Target waktunya, kalau ada",
      ],
      listTitle: "Yang perlu dikirim",
    },
  },
  labels: {
    onProgress: "Sedang dikerjakan",
    caseFor: "Untuk",
    services: "Layanan",
    year: "Tahun",
  },
};

export const dict: Record<Lang, Dict> = { en, id };
export const getFounders = founders;

// ---------- Portfolio ----------

export type Project = {
  slug: string;
  name: string;
  tag: { en: string; id: string };
  summary: { en: string; id: string };
  services: { en: string[]; id: string[] };
  status?: "progress";
  featured?: boolean;
  cover: string;
  coverFit?: "cover" | "contain";
  gallery: string[];
  galleryShape?: "portrait" | "landscape" | "story";
};

export const projects: Project[] = [
  {
    slug: "sari-jaya-karung",
    name: "Sari Jaya Karung",
    tag: { en: "Brand identity · Website", id: "Identitas brand · Website" },
    summary: {
      en: "A plastic sack and tarpaulin shop in Banyuwangi, getting its first real brand: a new logo, a colour system built from the shop's racks, and a bilingual-ready website that lets buyers ask for prices in one tap.",
      id: "Toko karung plastik dan terpal di Banyuwangi yang akhirnya punya brand beneran: logo baru, sistem warna dari rak tokonya sendiri, dan website yang bikin pembeli bisa tanya harga sekali klik.",
    },
    services: { en: ["Logo & colourways", "Website", "IG story teaser"], id: ["Logo & colourway", "Website", "Teaser IG story"] },
    status: "progress",
    featured: true,
    cover: "/img/work/sjk-desk.jpg",
    gallery: ["/img/work/sjk-desk.jpg", "/img/work/sjk-story.jpg"],
    galleryShape: "landscape",
  },
  {
    slug: "jasa-profesional",
    name: "Jasa Profesional",
    tag: { en: "Social media refresh", id: "Penyegaran sosial media" },
    summary: {
      en: "A training and consulting company with almost 50K followers and a feed of dense, dark posters. We kept their logo and rebuilt the feed around real photos, clear type and readable webinar posts.",
      id: "Perusahaan pelatihan dan konsultasi dengan hampir 50 ribu followers dan feed poster gelap yang padat. Logo tetap, feed kami bangun ulang dengan foto asli, tipografi jelas, dan poster webinar yang enak dibaca.",
    },
    services: { en: ["Feed redesign", "Carousels", "Webinar posts", "Reels"], id: ["Redesain feed", "Carousel", "Poster webinar", "Reels"] },
    featured: true,
    cover: "/img/work/jp-ba.jpg",
    gallery: ["/img/work/jp-ba.jpg", "/img/work/jp-slide1.jpg", "/img/work/jp-feed.jpg"],
  },
  {
    slug: "identity-concepts",
    name: "Teras Gurih · Kucekin! · lumer.",
    tag: { en: "Identity concepts", id: "Konsep identitas" },
    summary: {
      en: "Three studies in giving everyday Surabaya businesses (a depot, a laundry and a custom cake shop) a brand with real character: risograph print, torn paper and handwritten notes instead of stock templates. Brand names are fictional.",
      id: "Tiga studi untuk memberi karakter pada bisnis sehari-hari di Surabaya (depot, laundry, dan toko kue custom): cetak risograph, kertas sobek, dan tulisan tangan, bukan template. Nama brand fiktif.",
    },
    services: { en: ["Logo", "Colour & type", "9-post feed"], id: ["Logo", "Warna & font", "Feed 9 post"] },
    featured: true,
    cover: "/img/work/identity-trio.jpg",
    gallery: ["/img/work/tg-logo.jpg", "/img/work/tg1.jpg", "/img/work/kc-logo.jpg", "/img/work/kc1.jpg", "/img/work/lm-logo.jpg", "/img/work/lm1.jpg"],
  },
  {
    slug: "legalease",
    name: "LegalEase",
    tag: { en: "Website", id: "Website" },
    summary: {
      en: "Our sister brand's site at legalease.asia: a company-setup service explained in three languages, with service pages, a tax calculator and a mobile-first layout.",
      id: "Website brand saudara kami di legalease.asia: layanan pendirian usaha dalam tiga bahasa, lengkap dengan halaman layanan, kalkulator pajak, dan tampilan mobile-first.",
    },
    services: { en: ["Website", "Copy in 3 languages"], id: ["Website", "Copy 3 bahasa"] },
    featured: true,
    cover: "/img/work/le-desk.jpg",
    gallery: ["/img/work/le-desk.jpg", "/img/work/le-phone.jpg"],
    galleryShape: "landscape",
  },
  {
    slug: "pisjobar",
    name: "Pisjobar",
    tag: { en: "Launch feed", id: "Feed peluncuran" },
    summary: {
      en: "A launch feed for a pisang ijo dessert bar from Makassar: a teaser, an explainer carousel, a poll and a grand-opening post, in the brand's own green and cream.",
      id: "Feed peluncuran untuk dessert bar pisang ijo khas Makassar: teaser, carousel penjelasan, polling, dan postingan grand opening, dengan hijau dan krem khas brand-nya.",
    },
    services: { en: ["9-post launch feed", "Carousel", "Captions"], id: ["Feed peluncuran 9 post", "Carousel", "Caption"] },
    cover: "/img/work/pj-feed.jpg",
    gallery: ["/img/work/pj-slide1.jpg", "/img/work/pj-feed.jpg"],
  },
  {
    slug: "kasheer",
    name: "Kasheer",
    tag: { en: "Social media design", id: "Desain sosial media" },
    summary: {
      en: "Instagram content for a POS app for F&B businesses: tips, product posts and seasonal campaigns. Made in-house by our co-founder.",
      id: "Konten Instagram untuk aplikasi kasir bisnis F&B: tips, postingan produk, dan kampanye musiman. Dibuat in-house oleh co-founder kami.",
    },
    services: { en: ["Feed design", "Campaigns"], id: ["Desain feed", "Kampanye"] },
    cover: "/img/work/kasheer-1.jpg",
    gallery: ["/img/work/kasheer-1.jpg", "/img/work/kasheer-2.jpg", "/img/work/kasheer-3.jpg", "/img/work/kasheer-4.jpg", "/img/work/kasheer-5.jpg", "/img/work/kasheer-6.jpg"],
  },
  {
    slug: "rintisan",
    name: "Rintisan",
    tag: { en: "Social media design", id: "Desain sosial media" },
    summary: {
      en: "Promos, explainers and brand features for a franchise platform with 17K+ followers. Made in-house by our co-founder.",
      id: "Promo, konten edukasi, dan fitur brand untuk platform waralaba dengan 17 ribu+ followers. Dibuat in-house oleh co-founder kami.",
    },
    services: { en: ["Feed design", "Promos", "Carousels"], id: ["Desain feed", "Promo", "Carousel"] },
    cover: "/img/work/rintisan-2.jpg",
    gallery: ["/img/work/rintisan-1.jpg", "/img/work/rintisan-2.jpg", "/img/work/rintisan-3.jpg", "/img/work/rintisan-4.jpg", "/img/work/rintisan-5.jpg", "/img/work/rintisan-6.jpg"],
  },
  {
    slug: "sturdy",
    name: "Sturdy.ie",
    tag: { en: "Website", id: "Website" },
    summary: {
      en: "A personal brand site for a data-governance consultant: bold, dark and built to send people to case studies and papers.",
      id: "Website personal brand untuk konsultan data governance: tegas, gelap, dan mengarahkan orang ke studi kasus dan tulisannya.",
    },
    services: { en: ["Website"], id: ["Website"] },
    cover: "/img/work/sturdy-desk.jpg",
    gallery: ["/img/work/sturdy-desk.jpg", "/img/work/sturdy-phone.jpg"],
    galleryShape: "landscape",
  },
];
