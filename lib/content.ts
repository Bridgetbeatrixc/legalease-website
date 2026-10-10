// All site copy and contact details live here, so text changes don't touch the layout.

export const WA_NUMBER = "6282142144904";
export const WA_DISPLAY = "+62 821-4214-4904";
export const WA_URL = `https://wa.me/${WA_NUMBER}`;
export const INSTAGRAM_HANDLE = "@legalease_id";
export const INSTAGRAM_URL = "https://www.instagram.com/legalease_id/";

export type ServiceKey = "pendirian" | "perizinan" | "pajak" | "hukum" | "website" | "branding";

export type Service = {
  key: ServiceKey;
  // Its page at /layanan/<slug>.
  slug: string;
  name: string;
  tags: string[];
  summary: string;
  // The matching entry in serviceGroups, preselected in the contact form.
  lead: string;
};

export const services: Service[] = [
  {
    key: "pendirian",
    slug: "pendirian-perusahaan",
    lead: "Pendirian Perusahaan",
    name: "Pendirian Usaha",
    tags: ["PT", "CV", "PT Perorangan", "PT PMA"],
    summary: "Kami siapkan akta, pengesahan Kemenkumham, NPWP badan, sampai NIB terbit.",
  },
  {
    key: "perizinan",
    slug: "perizinan-usaha",
    lead: "Perizinan Usaha",
    name: "Perizinan Usaha",
    tags: ["NIB & OSS", "KBLI", "Sertifikat Standar", "PKKPR"],
    summary: "Izin di OSS ditentukan oleh KBLI dan tingkat risiko. Kami pastikan kodenya tepat sebelum izin diajukan.",
  },
  {
    key: "pajak",
    slug: "pajak",
    lead: "Pajak",
    name: "Pajak",
    tags: ["NPWP", "PKP", "SPT Masa", "SPT Tahunan"],
    summary: "Dari NPWP pertama sampai laporan rutin, kewajiban pajak usahamu tercatat rapi dan tepat waktu.",
  },
  {
    key: "hukum",
    slug: "merek-hak-cipta",
    lead: "Merek & Hak Cipta",
    name: "Hukum & Merek",
    tags: ["Merek", "Hak Cipta", "Perjanjian", "Konsultasi"],
    summary: "Daftarkan merekmu ke DJKI dan periksa kontrak dengan mitra sebelum kamu tanda tangan.",
  },
  {
    key: "website",
    slug: "jasa-website",
    lead: "Jasa Website",
    name: "Jasa Website",
    tags: ["Company Profile", "Landing Page", "Toko Online", "Domain & Email"],
    summary: "Website profil usaha atau toko online yang rapi, cepat dibuka di ponsel, dan mudah ditemukan di Google.",
  },
  {
    key: "branding",
    slug: "branding",
    lead: "Branding",
    name: "Branding",
    tags: ["Logo", "Identitas Visual", "Konten Sosmed", "Kemasan"],
    summary: "Logo, warna, dan materi promosi yang konsisten, dan siap didaftarkan sebagai merek ke DJKI.",
  },
];

// The full service list, grouped like izin.co.id's directory. Each item links to its page at /layanan/<slug>.
export const serviceGroups = [
  {
    title: "Pendirian & Legalitas",
    intro: "Layanan inti untuk legalitas dan pertumbuhan usaha",
    items: [
      { slug: "pendirian-perusahaan", icon: "building-2", name: "Pendirian Perusahaan", text: "Daftarkan PT, CV, PT Perorangan, atau PT PMA." },
      { slug: "penutupan-perusahaan", icon: "archive-x", name: "Penutupan Perusahaan", text: "Tutup PT atau CV secara resmi, termasuk likuidasi." },
      { slug: "virtual-office", icon: "map-pin", name: "Virtual Office", text: "Alamat usaha resmi untuk domisili dan surat-menyurat." },
      { slug: "perizinan-usaha", icon: "clipboard-check", name: "Perizinan Usaha", text: "Pengurusan NIB, KBLI, dan izin usaha di OSS." },
      { slug: "perjanjian", icon: "file-pen", name: "Pembuatan & Peninjauan Perjanjian", text: "Perjanjian kerja, investasi, dan kontrak bisnis." },
      { slug: "dokumen-perusahaan", icon: "folder-open", name: "Dokumen Perusahaan", text: "Perubahan akta, direksi, modal, dan data perseroan." },
    ],
  },
  {
    title: "Perizinan Khusus",
    intro: "Izin untuk bidang usaha tertentu",
    items: [
      { slug: "sbujk", icon: "hard-hat", name: "SBUJK", text: "Sertifikat badan usaha untuk kontraktor dan konsultan konstruksi." },
      { slug: "izin-klinik", icon: "hospital", name: "Izin Klinik", text: "Izin pendirian dan operasional klinik." },
      { slug: "bpom", icon: "shield-check", name: "BPOM", text: "Izin edar pangan olahan, kosmetik, dan obat tradisional." },
      { slug: "pirt", icon: "store", name: "PIRT", text: "Izin edar pangan produksi rumah tangga." },
      { slug: "sertifikasi-halal", icon: "badge-check", name: "Izin Halal", text: "Sertifikasi halal untuk makanan, minuman, dan kosmetik." },
    ],
  },
  {
    title: "Pajak, Merek & Digital",
    intro: "Supaya usahamu tertib dan mudah dikenal",
    items: [
      { slug: "pajak", icon: "receipt-text", name: "Pajak", text: "NPWP, PKP, serta pelaporan SPT masa dan tahunan." },
      { slug: "merek-hak-cipta", icon: "copyright", name: "Merek & Hak Cipta", text: "Pengecekan dan pendaftaran merek ke DJKI." },
      { slug: "jasa-website", icon: "monitor-smartphone", name: "Jasa Website", text: "Company profile, landing page, dan toko online." },
      { slug: "branding", icon: "palette", name: "Branding", text: "Logo, identitas visual, dan desain kemasan." },
      { slug: "digital-marketing", icon: "megaphone", name: "Digital Marketing", text: "Konten media sosial dan iklan agar usahamu mudah ditemukan." },
    ],
  },
];

export const facts = [
  { value: "Gratis", label: "Konsultasi pertama" },
  { value: "16 layanan", label: "Legalitas, perizinan khusus, pajak, digital" },
  { value: "Tertulis", label: "Rincian biaya sebelum mulai" },
  { value: "OSS RBA", label: "Sesuai sistem perizinan terbaru" },
  { value: "Online", label: "Dokumen lewat WhatsApp & email" },
];

export const reasons = [
  {
    title: "Biaya jelas sejak awal",
    text: "Kamu menerima penawaran tertulis berisi rincian biaya sebelum proses dimulai. Tidak ada tagihan tambahan di tengah jalan.",
    image: "/images/why-biaya.jpg",
    alt: "Konsultan menjelaskan rincian biaya kepada klien",
  },
  {
    title: "Progres selalu dikabari",
    text: "Setiap tahap, dari notaris sampai OSS, kami laporkan lewat WhatsApp. Kamu tahu dokumenmu sedang di mana.",
    image: "/images/why-progres.jpg",
    alt: "Pemilik usaha membaca kabar progres di ponsel",
  },
  {
    title: "Ditangani tim legal",
    text: "Pengecekan nama PT, pemilihan KBLI, dan penyusunan akta dikerjakan oleh orang yang memahami regulasinya.",
    image: "/images/why-tim.jpg",
    alt: "Penandatanganan akta di kantor notaris",
  },
];

export const agencies = [
  { name: "Notaris", role: "Akta pendirian & perubahan" },
  { name: "Kemenkumham", role: "Pengesahan badan hukum" },
  { name: "OSS RBA", role: "NIB & perizinan" },
  { name: "DJP", role: "NPWP & PKP" },
  { name: "DJKI", role: "Merek & hak cipta" },
];


export const steps = [
  { title: "Konsultasi gratis", text: "Ceritakan usahamu. Kami sarankan bentuk usaha dan KBLI, lalu kirim penawaran tertulis." },
  { title: "Kirim dokumen", text: "KTP dan NPWP pendiri, nama usaha pilihan, serta alamat domisili lewat WhatsApp atau email." },
  { title: "Kami proses", text: "Kami urus ke notaris, Kemenkumham, dan OSS. Setiap tahap yang selesai kami kabarkan." },
  { title: "Dokumen diserahkan", text: "Kamu menerima salinan digital semua dokumen, dan dokumen fisik bila ada." },
];

export const faqGroups = [
  {
    key: "pendirian",
    label: "Pendirian",
    items: [
      { q: "Berapa lama proses pendirian PT?", a: "Tergantung kelengkapan dokumen dan jadwal notaris. Setelah dokumenmu lengkap, kami berikan perkiraan waktu per tahap di penawaran tertulis." },
      { q: "Apakah bisa mendirikan PT tanpa kantor?", a: "PT tetap membutuhkan alamat domisili yang sah dan sesuai dengan kegiatan usahanya. Kami bantu mengecek apakah alamat yang kamu punya bisa dipakai." },
      { q: "Apa bedanya PT dan PT Perorangan?", a: "PT didirikan minimal dua orang dengan akta notaris. PT Perorangan didirikan satu orang WNI lewat surat pernyataan online, khusus untuk usaha mikro dan kecil." },
      { q: "Dokumen apa yang perlu disiapkan?", a: "KTP dan NPWP para pendiri, tiga pilihan nama PT, alamat domisili, modal yang direncanakan, serta gambaran kegiatan usaha." },
    ],
  },
  {
    key: "izin",
    label: "Perizinan",
    items: [
      { q: "Apa itu NIB dan apakah usahaku wajib punya?", a: "NIB adalah identitas pelaku usaha yang diterbitkan lewat OSS. Semua usaha yang ingin legal, termasuk UMK, perlu memilikinya." },
      { q: "Apa itu KBLI dan kenapa penting?", a: "KBLI adalah kode klasifikasi kegiatan usaha. Kode ini menentukan izin apa yang kamu butuhkan dan tingkat risikonya di OSS." },
    ],
  },
  {
    key: "pajak",
    label: "Pajak",
    items: [
      { q: "Kapan usahaku harus menjadi PKP?", a: "Wajib bila omzet dalam setahun melebihi Rp4,8 miliar. Di bawah itu, pengukuhan bisa diajukan sukarela, misalnya karena diminta klien korporat." },
      { q: "Apakah PT baru langsung wajib lapor SPT?", a: "Ya. Setelah NPWP badan terbit, PT wajib melaporkan SPT Masa dan SPT Tahunan, meskipun belum ada transaksi." },
    ],
  },
  {
    key: "umum",
    label: "Tentang LegalEase",
    items: [
      { q: "Apakah LegalEase instansi pemerintah?", a: "Bukan. LegalEase adalah konsultan legal swasta. Izin dan dokumen resmi tetap diterbitkan oleh instansi yang berwenang." },
      { q: "Apakah konsultasinya benar-benar gratis?", a: "Konsultasi pertama gratis. Biaya baru berlaku setelah kamu menyetujui penawaran tertulis dari kami." },
    ],
  },
];
