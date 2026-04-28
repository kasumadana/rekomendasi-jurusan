# Panduan Sprint 1: Sistem Rekomendasi Jurusan dan Universitas

Dokumen ini adalah acuan tugas (backlog) untuk masing-masing rintisan kerja tim pada fase Sprint ini. Mari kita selesaikan perlahan agar pondasi aplikasi menjadi kuat!

## 1. To-Do List Tim (Checklist Berjalan)

> [!IMPORTANT]
> Koordinasi sangat penting. Programmer dan Data Analyst harus sering berdiskusi untuk menentukan tipe variabel apa yang dikirim dari web (form) ke mesin *AI*.

### 📊 Data Engineer
- [ ] Menentukan atribut (fitur) dataset: Jurusan Sekolah Asal, Minat/Hobi, Mata Pelajaran Favorit, dan label rekomendasi (Target Jurusan Kuliah).
- [ ] Membuat minimal 50-100 data sampel awal (bisa berupa *dummy data* masuk akal atau dari kuesioner singkat).
- [ ] Memastikan integritas data: tidak ada data kosong (*missing values*) dan tipe data konsisten (tidak *typo* huruf besar/kecil di kategori).
- [ ] Menyimpan dataset dalam format `.csv` dengan penamaan yang jelas (contoh: `dataset_smk_kuliah.csv`) dan memberikan datanya kepada Data Analyst.

### 🧠 Data Analyst
- [ ] Mempelajari library **Pandas** untuk membaca CSV dan **Scikit-Learn** untuk sistem skoring (contohnya bisa pakai *Content-Based Filtering* dengan `TfidfVectorizer` atau logika bobot).
- [ ] Membuat kerangka file Python bernama `rekomendasi.py` di folder `/model`.
- [ ] Membangun dan menguji logika skoring dalam notebook percobaan terpisah (`.ipynb` atau script *testing*) tanpa harus menunggu *frontend* selesai.
- [ ] Mengubah algoritma menjadi sebuah Fungsi siap panggil (*callable function*) yang menerima input dari pengguna.

### 🎨 UI/UX Designer
- [ ] Merancang antarmuka form input pengguna di *Figma*. Pastikan *user-friendly* (gunakan *dropdown* atau *checkbox* jika memungkinkan untuk mencegah *typo* input).
- [ ] Merancang tampilan halaman **Hasil Rekomendasi** (bisa berupa *card* elegan yang menampilkan Jurusan, Universitas, dan Persentase Kecocokan/Alasan).
- [ ] Meng-ekspor aset desain (warna, susunan letak, dan *fonts*) ke dalam kerangka CSS (`/static/style.css`) atau Tailwind (bila menggunakan). Komunikasikan *class HTML* kepada Programmer.

### 💻 Programmer (Backend)
- [ ] Melakukan instalasi keseluruhan library (`Flask`, `pandas`, `scikit-learn`). *Lihat catatan troubleshooting instalasi.
- [ ] Menulis `app.py` untuk meng-handle GET dan POST request.
- [ ] Mengintegrasikan berkas HTML hasil desain UI/UX Developer ke dalam folder `/templates/`.
- [ ] Menghubungkan *function* dari `model/rekomendasi.py` ke rute Flask (`app.py`), agar ketika *User* klik tombol "Cari Rekomendasi", aplikasi bisa memberikan output yang sesungguhnya.

---

## 2. Panduan Pembuatan Dataset

> [!TIP]
> Format **CSV** (*Comma Separated Values*) adalah yang paling ringkas dan optimal untuk diolah dengan Pandas oleh Data Analyst.

Berikut adalah contoh format dan isi dataset untuk Data Engineer:

```csv
id,asal_jurusan_smk,minat_hobi,mapel_favorit,rekomendasi_jurusan_kuliah,rekomendasi_universitas
1,RPL,coding dan merakit pc,Matematika,Teknik Informatika,Universitas Indonesia
2,Tata Boga,memasak dan bereksperimen resep,Kewirausahaan,Ilmu Gizi,Universitas Brawijaya
3,Akuntansi,menghitung dan manajemen uang,Ekonomi,Manajemen Keuangan,Universitas Gadjah Mada
4,Multimedia,desain ilustrasi dan edit video,Seni Budaya,Desain Komunikasi Visual,Institut Kesenian Jakarta
5,TKJ,hacking jaringan komputer,Fisika,Sistem Informasi,Institut Teknologi Bandung
```

**Aturan Main Dataset**:
1. **Atribut Kategori** (contoh: `asal_jurusan_smk`, `mapel_favorit`, rekomendasi): Buatlah standarisasi nama agara data bersih. Jangan ada yang menulis "rpl", "Rpl", dan "RPL" yang saling berbeda. Satukan menjadi satu versi baku.
2. **Atribut Bebas** (contoh: `minat_hobi`): Biarkan berupa teks kalimat (kalimat bebas), nanti akan diproses dengan NLP (contoh: TF-IDF atau ekstraksi kata kunci) oleh Data Analyst.

---

## 3. Integrasi AI ke Sistem Web

Agar pekerjaan Data Analyst dan Programmer tidak saling bertabrakan/bermasalah, sepakati satu struktur yang mulus dengan **Fungsi (Function/Def)**.

### a. Panduan untuk Data Analyst (File: `model/rekomendasi.py`)

Data Analyst tugasnya fokus hanya pada logika. Buatlah suatu *function* yang mengembalikan tipe data (*return*) yang mudah dibaca, contoh list of dictionary.

```python
import pandas as pd
# import algoritma/library terkait (misal cosine_similarity) 
# dari sklearn nanti di sini

def dapatkan_rekomendasi(sk_asal, hobi, mapel):
    """
    Fungsi ini akan 'diimpor' oleh Pogrammer ke file app.py.
    
    Input:
        sk_asal (string) : Jurusan SMK
        hobi (string)    : Minat/hobi bebas
        mapel (string)   : Mapel favorit dari form HTML
    
    Output:
        List of dict     : Hasil top 2 atau top 3 jurusan kuliah
    """
    
    # ----------------------------------------------------
    # Tulis logika membaca CSV, pembersihan data (NLP text),
    # dan logika skoring Content-Based di blok ini.
    # ----------------------------------------------------
    
    # [DUMMY LOGIC] -> Sementara, buat logika statis ini 
    # agar Frontend dan Backend Programmer bisa tes web-nya duluan.
    hasil = []
    
    if sk_asal.upper() == "RPL" or "coding" in hobi.lower():
        hasil.append({
            "jurusan": "Ilmu Komputer / Teknik Informatika",
            "univ": "Universitas Indonesia",
            "alasan": "Match sangat tinggi antara RPL dan minat coding."
        })
    else:
        hasil.append({
            "jurusan": "Manajemen Bisnis",
            "univ": "Universitas Brawijaya",
            "alasan": "Sangat fleksibel berdasarkan mapel favoritmu."
        })
        
    return hasil
```

### b. Panduan untuk Programmer (File: `app.py`)

Sebagai Backend Programmer, kita cukup melakukan proses *import* dari file yang sudah disiapkan itu!

```python
from flask import Flask, render_template, request

# Import fungsi dari file di dalam folder model
from model.rekomendasi import dapatkan_rekomendasi

app = Flask(__name__)

@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")

@app.route("/prediksi", methods=["POST"])
def prediksi():
    if request.method == "POST":
        # 1. Tangkap hasil isian dari HTML (sesuaikan dengan isi atribut name="")
        jurusan_smk = request.form.get("jurusan_smk")
        hobi = request.form.get("hobi")
        mapel_favorit = request.form.get("mapel_favorit")
        
        # 2. Panggil otak Artificial Intelligencenya (lempar variabelnya)
        hasil_prediksi = dapatkan_rekomendasi(jurusan_smk, hobi, mapel_favorit)
        
        # 3. Lempar hasilnya kembali ke file html misalnya `hasil.html` atau variabel ke index.
        return render_template("hasil.html", rekomendasi_list=hasil_prediksi)

if __name__ == "__main__":
    app.run(debug=True)
```

Dengan metode **modular** (terpisah blok folder `model/` dan `app.py`) ini, di saat Data Analyst sedang mengetik mengubah algoritma if-else statis menjadi algoritma Cerdas / *scikit-learn*, **aplikasi web tidak akan error** asalkan struktur *input dan output* fungsinya tidak diubah!
