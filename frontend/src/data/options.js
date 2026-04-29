// src/data/options.js
// Semua konstanta pilihan untuk form kuesioner.
// Dipisahkan agar mudah di-maintain.

export const JURUSAN_SMK_OPTIONS = [
  { value: "Rekayasa Perangkat Lunak", label: "Rekayasa Perangkat Lunak (RPL)" },
  { value: "Teknik Komputer Dan Jaringan", label: "Teknik Komputer & Jaringan (TKJ)" },
  { value: "Teknik Audio Video", label: "Teknik Audio Video (TAV)" },
  { value: "Teknik Instalasi Dan Tenaga Listrik", label: "Teknik Instalasi & Tenaga Listrik (TITL)" },
  { value: "Teknik Pendingin Tata Udara Dan Pemanasan", label: "Teknik Pendingin Tata Udara (TPTUP)" },
  { value: "Teknik Pemesinan", label: "Teknik Pemesinan (TPM)" },
  { value: "Teknik Sepeda Motor", label: "Teknik Sepeda Motor (TSM)" },
  { value: "Teknik Kendaraan Ringan", label: "Teknik Kendaraan Ringan (TKR)" },
  { value: "Desain Pemodelan Dan Informasi Bangunan", label: "Desain Pemodelan & Informasi Bangunan (DPIB)" },
  { value: "Teknik Konstruksi Dan Perumahan", label: "Teknik Konstruksi & Perumahan (TKP)" },
  { value: "Desain Komunikasi Visual", label: "Desain Komunikasi Visual (DKV)" },
  { value: "Produksi Film", label: "Produksi Film (PRF)" },
];

export const MAPEL_OPTIONS = [
  "Matematika",
  "Fisika",
  "Bahasa Inggris",
  "Seni Budaya",
  "Ekonomi",
  "Biologi",
  "Kimia",
  "Bahasa Indonesia",
  "Sosiologi",
  "Sejarah",
  "Olahraga",
  "PKn",
  "Bisnis",
];

export const HOBI_OPTIONS = [
  { value: "Coding", label: "Coding", icon: "code" },
  { value: "Merakit Komputer", label: "Merakit Komputer", icon: "cpu" },
  { value: "Menggambar", label: "Menggambar", icon: "pen" },
  { value: "Fotografi/Video", label: "Fotografi & Video", icon: "camera" },
  { value: "Memperbaiki Barang", label: "Memperbaiki Barang", icon: "wrench" },
  { value: "Menganalisis Data", label: "Analisis Data", icon: "chart" },
  { value: "Mendesain", label: "Mendesain", icon: "sparkles" },
  { value: "Bongkar Mesin", label: "Bongkar Mesin", icon: "cog" },
  { value: "Menulis Cerita", label: "Menulis", icon: "edit" },
  { value: "Manajemen Proyek", label: "Manajemen Proyek", icon: "clipboard" },
  { value: "Sound Engineering", label: "Sound Engineering", icon: "music" },
  { value: "Mendesain 3D", label: "Desain 3D / CAD", icon: "cube" },
];

export const TIPE_KERJA_OPTIONS = [
  { value: "Layar Komputer", label: "Di Depan Layar", icon: "monitor" },
  { value: "Lapangan", label: "Di Lapangan", icon: "location" },
  { value: "Studio", label: "Studio / Lab", icon: "flask" },
];

export const SOSIAL_OPTIONS = [
  { value: "Tim", label: "Kerja Tim", icon: "users" },
  { value: "Mandiri", label: "Kerja Mandiri", icon: "user" },
];

export const INDUSTRI_OPTIONS = [
  { value: "Teknologi", label: "Teknologi", icon: "chip" },
  { value: "Industri Kreatif", label: "Industri Kreatif", icon: "star" },
  { value: "Konstruksi", label: "Konstruksi", icon: "building" },
  { value: "Manufaktur", label: "Manufaktur", icon: "factory" },
  { value: "Otomotif", label: "Otomotif", icon: "car" },
  { value: "Media", label: "Media & Film", icon: "film" },
];

export const PROVINSI_OPTIONS = [
  { value: "", label: "Semua Provinsi" },
  { value: "Bali", label: "Bali" },
  { value: "Jawa Timur", label: "Jawa Timur" },
  { value: "Jawa Barat", label: "Jawa Barat" },
  { value: "Jawa Tengah", label: "Jawa Tengah" },
  { value: "DKI Jakarta", label: "DKI Jakarta" },
  { value: "DI Yogyakarta", label: "DI Yogyakarta" },
];

export const JENIS_PT_OPTIONS = [
  { value: "", label: "Semua Jenis Kampus" },
  { value: "PTN", label: "PTN (Negeri)" },
  { value: "PTS", label: "PTS (Swasta)" },
  { value: "Institut", label: "Institut" },
  { value: "Politeknik", label: "Politeknik" },
];
