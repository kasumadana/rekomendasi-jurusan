from flask import Flask, request, jsonify
from flask_cors import CORS
from model.rekomendasi import dapatkan_rekomendasi

app = Flask(__name__)
CORS(app)   # Izinkan request dari React dev server (port 5173)


@app.route("/", methods=["GET"])
def index():
    return jsonify({"status": "ok", "message": "API Rekomendasi Jurusan berjalan."})


@app.route("/prediksi", methods=["POST"])
def prediksi():
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"status": "error", "message": "Body JSON tidak valid."}), 400

    # ── Ekstrak field dari payload ─────────────────────────────────────────────
    jurusan_smk     = data.get("jurusan_smk", "").strip()
    mapel_favorit   = data.get("mapel_favorit", "").strip()
    hobi_spesifik   = data.get("hobi_spesifik", "").strip()
    tipe_kerja      = data.get("tipe_kerja", "").strip()
    sosial          = data.get("sosial", "").strip()
    target_industri = data.get("target_industri", "").strip()
    lokasi_provinsi = data.get("lokasi_provinsi", "").strip()
    jenis_pt        = data.get("jenis_pt", "").strip()

    # Validasi field wajib (Core Traits minimal harus ada)
    required = [jurusan_smk, mapel_favorit, hobi_spesifik, tipe_kerja, sosial, target_industri]
    if not all(required):
        return jsonify({
            "status" : "error",
            "message": "Field wajib tidak lengkap. Pastikan semua pertanyaan kuesioner terisi."
        }), 400

    # ── Panggil engine rekomendasi ─────────────────────────────────────────────
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

    return jsonify({
        "status"      : "success",
        "rekomendasi" : hasil,
    })


if __name__ == "__main__":
    app.run(debug=True, port=5005)
