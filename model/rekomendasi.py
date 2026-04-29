import os
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# ─── Konstanta Pembobotan ──────────────────────────────────────────────────────
WEIGHT_CORE   = 0.70   # hobi + tipe_kerja + sosial + target_industri
WEIGHT_BASE   = 0.30   # jurusan_smk + mapel_favorit

# ─── Load Dataset Secara Global (satu kali saat server start) ─────────────────
_base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

_df_profil = pd.read_csv(
    os.path.join(_base_dir, "dataset_profil_ai.csv"),
    dtype=str
).fillna("")

_df_univ = pd.read_csv(
    os.path.join(_base_dir, "dataset_universitas.csv"),
    dtype=str
).fillna("")

# Buat kolom gabungan untuk setiap blok fitur di dataset
# Blok Core Traits
_df_profil["_core"] = (
    _df_profil["hobi_spesifik"] + " " +
    _df_profil["tipe_kerja"]    + " " +
    _df_profil["sosial"]        + " " +
    _df_profil["target_industri"]
).str.lower().str.strip()

# Blok Baseline
_df_profil["_base"] = (
    _df_profil["jurusan_smk"] + " " +
    _df_profil["mapel_favorit"]
).str.lower().str.strip()

# Fit TF-IDF vectorizer masing-masing blok (fit pada seluruh corpus dataset)
_vec_core = TfidfVectorizer()
_tfidf_core_matrix = _vec_core.fit_transform(_df_profil["_core"])

_vec_base = TfidfVectorizer()
_tfidf_base_matrix = _vec_base.fit_transform(_df_profil["_base"])

print("[INFO] Dataset profil dimuat:", len(_df_profil), "baris")
print("[INFO] Dataset universitas dimuat:", len(_df_univ), "baris")


# ─── Fungsi Utama ─────────────────────────────────────────────────────────────
def dapatkan_rekomendasi(
    jurusan_smk: str,
    mapel_favorit: str,
    hobi_spesifik: str,
    tipe_kerja: str,
    sosial: str,
    target_industri: str,
    lokasi_provinsi: str,
    jenis_pt: str,
) -> list[dict]:
    """
    Mengembalikan daftar rekomendasi jurusan + universitas yang terfilter.
    Format output per item:
        {
            "jurusan": str,
            "persentase": float,          # 0–100
            "universitas": [              # list kampus yang lolos filter
                {"nama": str, "lokasi": str, "jenis": str}
            ]
        }
    """
    # ── 1. Bentuk vektor user ──────────────────────────────────────────────────
    user_core = f"{hobi_spesifik} {tipe_kerja} {sosial} {target_industri}".lower().strip()
    user_base = f"{jurusan_smk} {mapel_favorit}".lower().strip()

    # Transform menggunakan vectorizer yang sudah di-fit dengan data dataset
    user_core_vec = _vec_core.transform([user_core])
    user_base_vec = _vec_base.transform([user_base])

    # ── 2. Hitung Cosine Similarity per blok ──────────────────────────────────
    sim_core = cosine_similarity(user_core_vec, _tfidf_core_matrix).flatten()
    sim_base = cosine_similarity(user_base_vec, _tfidf_base_matrix).flatten()

    # ── 3. Gabungkan dengan pembobotan ─────────────────────────────────────────
    skor_gabungan = WEIGHT_CORE * sim_core + WEIGHT_BASE * sim_base

    # ── 4. Ambil Top-5 kandidat (untuk memberi ruang setelah filter) ───────────
    top_indices = skor_gabungan.argsort()[-5:][::-1]

    # ── 5. Tentukan Top-3 Jurusan unik ────────────────────────────────────────
    jurusan_unik = []
    seen = set()
    for idx in top_indices:
        j = _df_profil.iloc[idx]["rekomendasi_jurusan_kuliah"].strip()
        skor = round(float(skor_gabungan[idx]) * 100, 1)
        if j not in seen and skor > 0:
            jurusan_unik.append({"jurusan": j, "persentase": skor})
            seen.add(j)
        if len(jurusan_unik) == 3:
            break

    if not jurusan_unik:
        return []

    # ── 6. Logistic Filtering: cari universitas yang sesuai ───────────────────
    hasil = []
    for item in jurusan_unik:
        nama_jurusan = item["jurusan"]

        # Filter dataset universitas berdasarkan nama jurusan
        mask = _df_univ["jurusan_kuliah"] == nama_jurusan

        # Filter lokasi jika user memilih (bukan "Semua")
        if lokasi_provinsi and lokasi_provinsi.lower() not in ("semua", "all", ""):
            mask &= _df_univ["lokasi_provinsi"].str.lower() == lokasi_provinsi.lower()

        # Filter jenis PT jika user memilih (bukan "Semua")
        if jenis_pt and jenis_pt.lower() not in ("semua", "all", ""):
            mask &= _df_univ["jenis_pt"].str.lower() == jenis_pt.lower()

        kampus_list = _df_univ[mask].apply(
            lambda row: {
                "nama"  : row["nama_universitas"],
                "lokasi": row["lokasi_provinsi"],
                "jenis" : row["jenis_pt"],
            },
            axis=1
        ).tolist()

        hasil.append({
            "jurusan"     : nama_jurusan,
            "persentase"  : item["persentase"],
            "universitas" : kampus_list,
        })

    return hasil
