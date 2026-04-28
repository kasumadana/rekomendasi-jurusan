from flask import Flask, request, jsonify
from flask_cors import CORS
from model.rekomendasi import dapatkan_rekomendasi

app = Flask(__name__)
# Enable CORS agar React (port 5173) bisa akses API Flask (port 5000)
CORS(app)

@app.route("/", methods=["GET"])
def index():
    return jsonify({"status": "API berjalan lancar!"})

@app.route("/prediksi", methods=["POST"])
def prediksi():
    if request.method == "POST":
        # Ambil data JSON dari React
        data = request.json
        jurusan_smk = data.get("jurusan_smk", "")
        hobi = data.get("hobi", "")
        mapel_favorit = data.get("mapel_favorit", "")
        
        # Panggil fungsi dari model/rekomendasi.py
        hasil_prediksi = dapatkan_rekomendasi(jurusan_smk, hobi, mapel_favorit)
        
        return jsonify({
            "status": "success",
            "rekomendasi": hasil_prediksi
        })

if __name__ == "__main__":
    app.run(debug=True, port=5005)
