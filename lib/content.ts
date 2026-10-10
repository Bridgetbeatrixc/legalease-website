// All site copy and contact details live here, so text changes don't touch the layout.

export const WA_NUMBER = "6282142144904";
export const WA_DISPLAY = "+62 821-4214-4904";
export const WA_URL = `https://wa.me/${WA_NUMBER}`;
export const INSTAGRAM_HANDLE = "@legalease_id";
export const INSTAGRAM_URL = "https://www.instagram.com/legalease_id/";

export type ServiceKey = "pendirian" | "perizinan" | "pajak" | "hukum" | "website" | "branding";

export type Service = {
  key: ServiceKey;
  name: string;
  tags: string[];
  summary: string;
  detailTitle: string;
  detailIntro: string;
  items: { name: string; text: string }[];
};

export const services: Service[] = [
  {
    key: "pendirian",
    name: "Pendirian Usaha",
    tags: ["PT", "CV", "PT Perorangan", "PT PMA"],
    summary: "Kami siapkan akta, pengesahan Kemenkumham, NPWP badan, sampai NIB terbit.",
    detailTitle: "Mulai bisnismu dengan benar",
    detailIntro: "Kami bantu memilih bentuk badan usaha yang sesuai, menyiapkan akta, sampai perusahaanmu terdaftar dan punya NIB.",
    items: [
      { name: "Pendirian PT", text: "Minimal dua pendiri, akta notaris, dan pengesahan Kemenkumham." },
      { name: "Pendirian CV", text: "Untuk usaha bersama dengan sekutu aktif dan sekutu pasif." },
      { name: "PT Perorangan", text: "Didirikan satu orang WNI untuk usaha mikro dan kecil." },
      { name: "PT PMA", text: "Perusahaan dengan saham asing, termasuk penyesuaian KBLI dan modal." },
      { name: "Perubahan Akta", text: "Ganti direksi, pemegang saham, modal, alamat, atau bidang usaha." },
      { name: "Pembubaran Perusahaan", text: "Penutupan PT atau CV sesuai prosedur, termasuk likuidasi." },
    ],
  },
  {
    key: "perizinan",
    name: "Perizinan Usaha",
    tags: ["NIB & OSS", "KBLI", "Sertifikat Standar", "PKKPR"],
    summary: "Izin di OSS ditentukan oleh KBLI dan tingkat risiko. Kami pastikan kodenya tepat sebelum izin diajukan.",
    detailTitle: "Perizinan usaha tanpa bolak-balik",
    detailIntro: "Izin di OSS ditentukan oleh kode KBLI dan tingkat risiko usahamu.",
    items: [
      { name: "NIB & OSS", text: "Pendaftaran Nomor Induk Berusaha melalui OSS RBA." },
      { name: "Penentuan KBLI", text: "Memilih kode KBLI 2020 yang sesuai dengan kegiatan usahamu." },
      { name: "Sertifikat Standar", text: "Untuk usaha berisiko menengah yang wajib memenuhi standar tertentu." },
      { name: "Izin Operasional", text: "Izin tambahan agar usaha boleh beroperasi secara komersial." },
      { name: "PKKPR", text: "Konfirmasi kesesuaian lokasi usaha dengan rencana tata ruang." },
    ],
  },
  {
    key: "pajak",
    name: "Pajak",
    tags: ["NPWP", "PKP", "SPT Masa", "SPT Tahunan"],
    summary: "Dari NPWP pertama sampai laporan rutin, kewajiban pajak usahamu tercatat rapi dan tepat waktu.",
    detailTitle: "Pajak jadi sederhana",
    detailIntro: "Dari NPWP pertama sampai laporan rutin, kewajiban pajak usahamu tercatat rapi.",
    items: [
      { name: "NPWP Pribadi & Badan", text: "Pendaftaran NPWP untuk pemilik usaha maupun perusahaan." },
      { name: "Pengukuhan PKP", text: "Wajib bila omzet setahun di atas Rp4,8 miliar, atau diajukan sukarela." },
      { name: "SPT Masa & Tahunan", text: "Penyusunan dan pelaporan SPT bulanan serta tahunan." },
      { name: "Konsultasi Pajak", text: "Tanya jawab soal kewajiban, tarif, dan perencanaan pajak usaha." },
    ],
  },
  {
    key: "hukum",
    name: "Hukum & Merek",
    tags: ["Merek", "Hak Cipta", "Perjanjian", "Konsultasi"],
    summary: "Daftarkan merekmu ke DJKI dan periksa kontrak dengan mitra sebelum kamu tanda tangan.",
    detailTitle: "Lindungi apa yang kamu bangun",
    detailIntro: "Nama merek, kontrak dengan mitra, dan dokumen internal perusahaan.",
    items: [
      { name: "Merek & Hak Cipta", text: "Pengecekan dan pendaftaran merek atau hak cipta ke DJKI." },
      { name: "Review Perjanjian", text: "Memberi catatan atas kontrak sebelum kamu tanda tangan." },
      { name: "Konsultasi Hukum Bisnis", text: "Diskusi masalah hukum sehari-hari dalam menjalankan usaha." },
      { name: "Dokumen Perusahaan", text: "Penyusunan perjanjian kerja dan dokumen korporat lain." },
    ],
  },
  {
    key: "website",
    name: "Jasa Website",
    tags: ["Company Profile", "Landing Page", "Toko Online", "Domain & Email"],
    summary: "Website profil usaha atau toko online yang rapi, cepat dibuka di ponsel, dan mudah ditemukan di Google.",
    detailTitle: "Usahamu punya alamat di internet",
    detailIntro: "Kami buatkan website yang menjelaskan usahamu dengan jelas dan memudahkan calon pelanggan menghubungimu.",
    items: [
      { name: "Website Company Profile", text: "Halaman profil, layanan, dan kontak untuk usaha atau perusahaan." },
      { name: "Landing Page", text: "Satu halaman untuk promosi produk atau kampanye iklan." },
      { name: "Toko Online", text: "Katalog produk dengan pemesanan lewat WhatsApp atau pembayaran online." },
      { name: "Domain & Email Bisnis", text: "Alamat .com atau .co.id dan email dengan nama usahamu." },
      { name: "Perawatan Website", text: "Pembaruan isi, cadangan data, dan perbaikan bila ada kendala." },
    ],
  },
  {
    key: "branding",
    name: "Branding",
    tags: ["Logo", "Identitas Visual", "Konten Sosmed", "Kemasan"],
    summary: "Logo, warna, dan materi promosi yang konsisten, dan siap didaftarkan sebagai merek ke DJKI.",
    detailTitle: "Tampil konsisten di mana pun",
    detailIntro: "Identitas visual yang membuat usahamu mudah dikenali, dari logo sampai kemasan.",
    items: [
      { name: "Desain Logo", text: "Beberapa pilihan konsep logo sampai versi final dalam berbagai format." },
      { name: "Brand Guideline", text: "Aturan pemakaian logo, warna, dan huruf supaya tampilan selalu seragam." },
      { name: "Desain Konten Media Sosial", text: "Template unggahan Instagram dan materi promosi lainnya." },
      { name: "Kartu Nama & Kop Surat", text: "Alat tulis kantor dengan identitas usahamu." },
      { name: "Desain Kemasan", text: "Label dan kemasan produk yang sesuai dengan identitas merek." },
    ],
  },
];

export const facts = [
  { value: "Gratis", label: "Konsultasi pertama" },
  { value: "6 layanan", label: "Legalitas, pajak, website, branding" },
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

export const comparison = {
  columns: ["PT", "CV", "PT Perorangan"],
  rows: [
    { aspect: "Jumlah pendiri", values: ["Minimal 2 orang", "Minimal 2 orang (sekutu aktif dan pasif)", "1 orang WNI"] },
    { aspect: "Dasar pendirian", values: ["Akta notaris, disahkan Kemenkumham", "Akta notaris, didaftarkan ke Kemenkumham", "Surat pernyataan pendirian online, tanpa akta notaris"] },
    { aspect: "Tanggung jawab pemilik", values: ["Terbatas pada modal yang disetor", "Sekutu aktif menanggung sampai harta pribadi", "Terbatas pada modal yang disetor"] },
    { aspect: "Cocok untuk", values: ["Usaha yang ingin tumbuh, mencari investor, atau ikut tender", "Usaha keluarga atau kemitraan sederhana", "Usaha mikro dan kecil yang dijalankan sendiri"] },
  ],
};

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
