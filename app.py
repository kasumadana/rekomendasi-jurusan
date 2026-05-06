import os
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
from model.rekomendasi import dapatkan_rekomendasi

app = Flask(__name__)
CORS(app)

SURVEY_FILE = "survey_responses.csv"

@app.route("/", methods=["GET"])
def index():
    return jsonify({"status": "ok", "message": "API Navigara berjalan."})

@app.route("/prediksi", methods=["POST"])
def prediksi():
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"status": "error", "message": "Body JSON tidak valid."}), 400

    # ── Ekstrak field kuesioner ─────────────────────────────────────────────
    minat_kuliah    = data.get("minat_kuliah", "").strip()
    lintas_jurusan  = data.get("lintas_jurusan", "").strip()
    
    jurusan_smk     = data.get("jurusan_smk", "").strip()
    mapel_favorit   = data.get("mapel_favorit", "").strip()
    hobi_spesifik   = data.get("hobi_spesifik", "").strip()
    tipe_kerja      = data.get("tipe_kerja", "").strip()
    sosial          = data.get("sosial", "").strip()
    target_industri = data.get("target_industri", "").strip()
    lokasi_provinsi = data.get("lokasi_provinsi", "").strip()
    jenis_pt        = data.get("jenis_pt", "").strip()

    is_early_exit = minat_kuliah in ["Tidak", "Belum Tahu"]

    if is_early_exit:
        required = [jurusan_smk, hobi_spesifik]
    else:
        required = [jurusan_smk, mapel_favorit, hobi_spesifik, tipe_kerja, sosial, target_industri]

    if not all(required):
        return jsonify({
            "status" : "error",
            "message": "Field wajib tidak lengkap. Pastikan semua pertanyaan kuesioner terisi."
        }), 400

    # ── Panggil engine rekomendasi (jika bukan early exit) ─────────────────────
    hasil = []
    if not is_early_exit:
        hasil = dapatkan_rekomendasi(
            jurusan_smk     = jurusan_smk,
            mapel_favorit   = mapel_favorit,
            hobi_spesifik   = hobi_spesifik,
            tipe_kerja      = tipe_kerja,
            sosial          = sosial,
            target_industri = target_industri,
            lokasi_provinsi = lokasi_provinsi,
            jenis_pt        = jenis_pt,
        )

    top_rekomendasi = hasil[0]["jurusan"] if hasil and len(hasil) > 0 else ""

    # ── Simpan raw response ke CSV ───────────────────────────────────────────
    try:
        new_row = {
            "minat_kuliah": minat_kuliah,
            "lintas_jurusan": lintas_jurusan,
            "jurusan_smk": jurusan_smk,
            "mapel_favorit": mapel_favorit,
            "hobi_spesifik": hobi_spesifik,
            "tipe_kerja": tipe_kerja,
            "sosial": sosial,
            "target_industri": target_industri,
            "lokasi_provinsi": lokasi_provinsi,
            "jenis_pt": jenis_pt,
            "top_rekomendasi": top_rekomendasi
        }
        df_new = pd.DataFrame([new_row])
        if not os.path.isfile(SURVEY_FILE):
            df_new.to_csv(SURVEY_FILE, index=False)
        else:
            df_new.to_csv(SURVEY_FILE, mode='a', header=False, index=False)
    except Exception as e:
        print("[ERROR] Gagal menyimpan respons survei:", e)

    return jsonify({
        "status"      : "success",
        "rekomendasi" : hasil,
        "is_early_exit": is_early_exit
    })


@app.route("/stats", methods=["GET"])
def stats():
    if not os.path.isfile(SURVEY_FILE):
        return jsonify({
            "status": "success",
            "data": {
                "total_responden": 0,
                "niat_kuliah": [],
                "analisis_jalur": [],
                "demografi_asal": [],
                "top_hobi": [],
                "top_rekomendasi": []
            }
        })

    try:
        df = pd.read_csv(SURVEY_FILE).fillna("")
        total_responden = int(len(df))
        
        # 1. niat_kuliah
        niat_counts = df["minat_kuliah"].value_counts().reset_index()
        niat_counts.columns = ["name", "value"]
        niat_data = niat_counts.to_dict(orient="records")
        
        # 2. analisis_jalur
        lintas_df = df[df["lintas_jurusan"].notna() & (df["lintas_jurusan"] != "")]
        lintas_counts = lintas_df["lintas_jurusan"].value_counts().reset_index()
        lintas_counts.columns = ["name", "value"]
        lintas_data = lintas_counts.to_dict(orient="records")

        # 3. demografi_asal
        jurusan_counts = df["jurusan_smk"].value_counts().head(5).reset_index()
        jurusan_counts.columns = ["name", "value"]
        jurusan_data = jurusan_counts.to_dict(orient="records")

        # 4. top_hobi
        hobi_counts = df["hobi_spesifik"].value_counts().head(5).reset_index()
        hobi_counts.columns = ["name", "value"]
        hobi_data = hobi_counts.to_dict(orient="records")

        # 5. top_rekomendasi
        if "top_rekomendasi" in df.columns:
            rek_df = df[df["top_rekomendasi"].notna() & (df["top_rekomendasi"] != "")]
            rek_counts = rek_df["top_rekomendasi"].value_counts().head(5).reset_index()
            rek_counts.columns = ["name", "value"]
            rek_data = rek_counts.to_dict(orient="records")
        else:
            rek_data = []

        return jsonify({
            "status": "success",
            "data": {
                "total_responden": total_responden,
                "niat_kuliah": niat_data,
                "analisis_jalur": lintas_data,
                "demografi_asal": jurusan_data,
                "top_hobi": hobi_data,
                "top_rekomendasi": rek_data
            }
        })
    except Exception as e:
        print("[ERROR] Gagal membaca data statistik:", e)
        return jsonify({"status": "error", "message": "Gagal membaca data statistik."}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5005)
