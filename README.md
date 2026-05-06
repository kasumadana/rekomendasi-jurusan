# 🧭 Navigara

**Sistem Rekomendasi Jurusan Kuliah & Analisis Minat Bakat (Studi Kasus: SMKN 1 Denpasar)**

Navigara adalah platform cerdas yang membantu siswa Sekolah Menengah Kejuruan (SMK) untuk memetakan arah karier akademik dan menemukan rekomendasi program studi serta universitas terbaik berdasarkan profil bakat, minat, dan gaya produktivitas mereka secara presisi.

---

## 🛠 Prasyarat Sistem (Prerequisites)

Sebelum menjalankan proyek ini di komputer Anda, pastikan perangkat lunak berikut telah terinstal:

- **Node.js** (Versi 18+): Diperlukan untuk menjalankan server *frontend* (React/Vite).
- **Python** (Versi 3.10+): Diperlukan untuk menjalankan server *backend* (Flask/Pandas).
- **Git** (Opsional namun disarankan): Digunakan untuk melakukan manajemen versi (cloning) repositori.

---

## ⚙️ Cara Menjalankan Backend (Python / Flask)

Backend Navigara bertugas memproses algoritma rekomendasi dan menyimpan respons survei siswa. File backend (`app.py`, dll) berada langsung di **folder utama (root)** proyek Anda.

**Langkah 1: Buka terminal dan pastikan Anda berada di folder utama proyek.**
```bash
# Pastikan terminal mengarah ke folder utama proyek
cd rekomendasi-jurusan
```

**Langkah 2: Buat Virtual Environment (Sangat Disarankan)**
Virtual Environment menjaga agar instalasi modul tidak bentrok dengan proyek Python lain di komputer.
```bash
# Membuat virtual environment
python -m venv venv

# Mengaktifkannya (Windows):
venv\Scripts\activate

# Mengaktifkannya (Mac/Linux):
source venv/bin/activate
```

**Langkah 3: Install Dependensi Library**
```bash
pip install -r requirements.txt
```

**Langkah 4: Jalankan Server Backend**
```bash
python app.py
```
✅ *Server backend akan berjalan secara lokal di:* **`http://localhost:5005`**

---

## 🎨 Cara Menjalankan Frontend (React / Vite)

Frontend merupakan antarmuka interaktif, estetis, dan modern yang digunakan oleh pengguna (Siswa & Guru/Admin).

**Langkah 1: Buka tab terminal baru, lalu masuk ke folder `frontend`**
```bash
cd frontend
```

**Langkah 2: Install Dependensi (NPM)**
```bash
npm install
```

**Langkah 3: Jalankan Server Frontend**
```bash
npm run dev
```
✅ *Aplikasi web kini dapat diakses melalui browser Anda di:* **`http://localhost:5173`**

---

## 🚀 Akses Fitur Utama

Setelah **kedua server (Backend dan Frontend) berjalan bersamaan**, aplikasi siap dioperasikan:

- 🎓 **Halaman Utama Siswa (Kuesioner)**: Buka browser ke **`http://localhost:5173`**
- 📊 **Halaman Admin Dashboard**: Buka browser ke **`http://localhost:5173/admin`**
  *(Jika antarmuka meminta akses log masuk admin, masukkan PIN/Password default, misalnya: **ADMIN123**).*

---

## 📂 Struktur Data & Panduan Troubleshoot Singkat

- **Sistem Penyimpanan Data**: Navigara dirancang agar praktis digunakan tanpa perlu konfigurasi database (seperti MySQL). Data hasil jawaban siswa langsung direkam dan disimpan secara lokal pada file **`survey_responses.csv`** di folder utama.
- **Dashboard Admin Error / Tidak Muncul?**: Hal ini biasanya terjadi jika server backend (Python) belum dijalankan. Pastikan `python app.py` masih aktif di terminal.
- **Kendala Simpan Data (Permission Error)**: Jika sistem gagal menyimpan survei baru, pastikan file `survey_responses.csv` **tidak sedang dibuka** oleh program *Microsoft Excel*. Excel dapat mengunci file tersebut, sehingga backend Flask tidak bisa menuliskan data baru ke dalamnya.

---

*Dibuat dengan dedikasi untuk kemajuan pendidikan vokasi Indonesia.*
