import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ProgressBar from "../components/ProgressBar";
import Questionnaire from "../components/Questionnaire";

export default function QuestionnairePage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    minat_kuliah: "",
    lintas_jurusan: "",
    jurusan_smk: "",
    mapel_favorit: [],
    hobi_spesifik: "",
    tipe_kerja: "",
    sosial: "",
    target_industri: "",
    lokasi_provinsi: "",
    jenis_pt: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => {
      if (field === "minat_kuliah" && value !== "Ya") {
        return { ...prev, [field]: value, lintas_jurusan: "" };
      }
      return { ...prev, [field]: value };
    });
    setError(null);
  };

  const handleNext = () => setStep((s) => Math.min(s + 1, 3));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    const payload = {
      ...formData,
      mapel_favorit: formData.mapel_favorit.join(", "),
    };

    try {
      const response = await fetch("http://localhost:5005/prediksi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.status === "success") {
        navigate("/hasil", { state: { rekomendasi: data.rekomendasi, formData: payload } });
      } else {
        setError(data.message || "Terjadi kesalahan dari server.");
      }
    } catch (err) {
      setError("Gagal terhubung ke server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-[calc(100vh-64px)] py-20">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-16 flex items-center justify-between">
          <button 
            onClick={() => navigate("/")}
            className="group flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-950 transition-colors"
          >
            <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
            Keluar Tes
          </button>
          
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-300">
            Tahap 0{step} / 03
          </div>
        </div>

        <ProgressBar currentStep={step} />

        <div className="mt-20">
          {error && (
            <div className="mb-10 p-4 bg-red-50 text-red-600 text-xs font-bold uppercase tracking-widest border-l-4 border-red-600">
              {error}
            </div>
          )}

          <Questionnaire
            step={step}
            data={formData}
            onChange={handleChange}
            onNext={handleNext}
            onBack={handleBack}
            onSubmit={handleSubmit}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
