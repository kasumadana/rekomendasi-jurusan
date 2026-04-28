import { useState } from 'react';
import './index.css';

function App() {
  const [formData, setFormData] = useState({
    jurusan_smk: '',
    mapel_favorit: '',
    hobi: ''
  });
  const [rekomendasi, setRekomendasi] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:5005/prediksi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      if (data.status === 'success') {
        setRekomendasi(data.rekomendasi);
      }
    } catch (error) {
      console.error('Error fetching prediction:', error);
      alert('Gagal menghubungi server AI. Pastikan server Flask backend sedang berjalan (port 5000).');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setRekomendasi(null);
    setFormData({
      jurusan_smk: '',
      mapel_favorit: '',
      hobi: ''
    });
  };

  return (
    <div className="container">
      <div className="minimal-wrapper">
        <div className="header">
          {rekomendasi ? (
            <>
              <h1>Ini Rekomendasimu!</h1>
              <p className="subtitle">
                Berdasarkan profil: <strong>{formData.jurusan_smk}</strong> dengan hobi <strong>{formData.hobi}</strong>.
              </p>
            </>
          ) : (
            <>
              <h1>AI JurusanFinder</h1>
              <p className="subtitle">Temukan jurusan kuliah yang cocok untuk anak SMK berdasarkan minat dan bakatmu.</p>
            </>
          )}
        </div>
        
        {!rekomendasi ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="jurusan_smk">Asal Jurusan SMK</label>
              <select 
                name="jurusan_smk" 
                id="jurusan_smk" 
                value={formData.jurusan_smk} 
                onChange={handleChange} 
                required
              >
                <option value="" disabled>-- Pilih Jurusan SMK --</option>
                <option value="RPL">Rekayasa Perangkat Lunak (RPL)</option>
                <option value="TKJ">Teknik Komputer Jaringan (TKJ)</option>
                <option value="Multimedia">Multimedia / DKV</option>
                <option value="Akuntansi">Akuntansi</option>
                <option value="Tata Boga">Tata Boga</option>
                <option value="Perhotelan">Perhotelan</option>
                <option value="Mesin">Teknik Mesin / Otomotif</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="mapel_favorit">Mata Pelajaran Favorit</label>
              <select 
                name="mapel_favorit" 
                id="mapel_favorit" 
                value={formData.mapel_favorit} 
                onChange={handleChange} 
                required
              >
                <option value="" disabled>-- Pilih Mata Pelajaran --</option>
                <option value="Matematika">Matematika</option>
                <option value="Bahasa Inggris">Bahasa Inggris</option>
                <option value="Seni Budaya">Seni Budaya / Desain</option>
                <option value="Fisika">Fisika / Sains</option>
                <option value="Ekonomi">Ekonomi / Bisnis</option>
                <option value="Kewirausahaan">Kewirausahaan</option>
                <option value="Kimia">Kimia</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="hobi">Minat atau Hobi Utamamu</label>
              <input 
                type="text" 
                name="hobi" 
                id="hobi" 
                placeholder="Contoh: main game, desain logo, bongkar mesin..." 
                value={formData.hobi} 
                onChange={handleChange} 
                required 
              />
            </div>

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Menganalisis AI...' : 'Temukan Rekomendasi AI'}
            </button>
          </form>
        ) : (
          <div className="results-wrapper">
            <div className="results-container">
              {rekomendasi.length > 0 && rekomendasi[0].jurusan !== "Belum Ada Rekomendasi" && rekomendasi[0].jurusan !== "Error Dataset" ? (
                rekomendasi.map((item, index) => (
                  <div className="result-card" key={index}>
                    <h2 className="result-title">{item.jurusan}</h2>
                    <h3 className="result-univ">🎓 {item.univ}</h3>
                    <p className="result-alasan">{item.alasan}</p>
                  </div>
                ))
              ) : (
                <div className="result-card" style={{ borderColor: 'var(--secondary)' }}>
                  <h2 className="result-title" style={{ color: 'var(--secondary)' }}>Tidak Ditemukan</h2>
                  <p className="result-alasan">{rekomendasi[0]?.alasan || "Maaf, AI kami belum memiliki data yang pas untuk profilmu."}</p>
                </div>
              )}
            </div>

            <button onClick={resetForm} className="btn-back" style={{ width: '100%' }}>Coba Profil Lainnya</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
