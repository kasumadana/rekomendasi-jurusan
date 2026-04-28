import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import os

# Mendapatkan path absolut ke dataset agar tidak error saat dipanggil dari Flask
base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
dataset_path = os.path.join(base_dir, 'dataset_smk_kuliah.csv')

def dapatkan_rekomendasi(sk_asal, hobi, mapel):
    try:
        df = pd.read_csv(dataset_path)
    except FileNotFoundError:
        return [{"jurusan": "Error Dataset", "univ": "-", "alasan": "File dataset_smk_kuliah.csv tidak ditemukan."}]
    
    # 1. Gabungkan fitur menjadi satu teks 'profil' (Content-Based Filtering)
    df['profil'] = df['asal_jurusan_smk'] + " " + df['minat_hobi'] + " " + df['mapel_favorit']
    
    # Text input dari user (profil user)
    user_profil = f"{sk_asal} {hobi} {mapel}"
    
    # 2. Inisialisasi TF-IDF
    vectorizer = TfidfVectorizer()
    
    # Fit & transform semua data profil ditambah profil user di elemen terakhir
    semua_profil = df['profil'].tolist() + [user_profil]
    tfidf_matrix = vectorizer.fit_transform(semua_profil)
    
    # 3. Hitung cosine similarity antara profil user (index terakhir) dengan profil dataset lainnya
    cosine_sim = cosine_similarity(tfidf_matrix[-1], tfidf_matrix[:-1]).flatten()
    
    # 4. Ambil 3 index dengan similarity tertinggi
    top_indices = cosine_sim.argsort()[-3:][::-1]
    
    hasil = []
    for idx in top_indices:
        kecocokan_persen = round(cosine_sim[idx] * 100, 1)
        # Hanya masukkan jika ada kecocokan minimal (>0)
        if kecocokan_persen > 0:
            row = df.iloc[idx]
            hasil.append({
                "jurusan": row['rekomendasi_jurusan_kuliah'],
                "univ": row['rekomendasi_universitas'],
                "alasan": f"Kecocokan {kecocokan_persen}% berdasarkan kecocokan asal SMK {row['asal_jurusan_smk']} dan hobi."
            })
            
    if not hasil:
        hasil.append({
            "jurusan": "Belum Ada Rekomendasi",
            "univ": "-",
            "alasan": "Kata kunci tidak ditemukan dalam dataset. Coba gunakan kata yang berbeda."
        })
        
    return hasil
