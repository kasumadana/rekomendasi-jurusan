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

  const isEarlyExit = formData.minat_kuliah === "Tidak" || formData.minat_kuliah === "Belum Tahu";
  const maxSteps = isEarlyExit ? 2 : 4;

  const handleChange = (field, value) => {
    setFormData((prev) => {
      let updated = { ...prev, [field]: value };
      if (field === "minat_kuliah") {
        if (value !== "Ya") {
          updated.lintas_jurusan = "";
          updated.mapel_favorit = [];
          updated.tipe_kerja = "";
          updated.sosial = "";
          updated.target_industri = "";
          updated.lokasi_provinsi = "";
          updated.jenis_pt = "";
        }
      }
      return updated;
    });
    setError(null);
  };

  const handleNext = () => setStep((s) => Math.min(s + 1, maxSteps));
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
        navigate("/hasil", { 
          state: { 
            rekomendasi: data.rekomendasi, 
            formData: payload, 
            isEarlyExit: data.is_early_exit 
          } 
        });
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
    <div className="bg-zinc-50 min-h-[calc(100vh-64px)] py-16 sm:py-24 font-sans text-zinc-900 selection:bg-zinc-900 selection:text-white">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-12 flex items-center justify-between">
          <button 
            onClick={() => navigate("/")}
            className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Batal
          </button>
          
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
            Tahap 0{step} / 0{maxSteps}
          </div>
        </div>

        <ProgressBar currentStep={step} maxSteps={maxSteps} />

        <div className="mt-16">
          {error && (
            <div className="mb-10 p-5 bg-red-50 text-red-700 text-sm font-semibold border-l-4 border-red-600">
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
            isEarlyExit={isEarlyExit}
          />
        </div>
      </div>
    </div>
  );
}
