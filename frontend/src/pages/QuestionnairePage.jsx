import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../components/Icons";
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
      // Logic for conditional field
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.status === "success") {
        navigate("/hasil", { 
          state: { 
            rekomendasi: data.rekomendasi, 
            formData: payload 
          } 
        });
      } else {
        setError(data.message || "Terjadi kesalahan dari server.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Gagal terhubung ke server. Pastikan backend Python berjalan di port 5005.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-slate-50 font-sans">
      <header className="py-6 px-6 sm:px-8 max-w-7xl mx-auto w-full">
        <button 
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-slate-500 font-medium hover:text-slate-900 transition-colors"
        >
          <Icon name="arrowLeft" className="w-5 h-5" />
          Beranda
        </button>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full p-4 sm:p-6 lg:p-8">
        <div className="mb-10 animate-in fade-in slide-in-from-top-4 duration-500">
          <ProgressBar currentStep={step} totalSteps={3} />
        </div>

        <div className="bg-white p-6 sm:p-10 lg:p-12 rounded-3xl shadow-sm border border-slate-200">
          {error && (
            <div className="mb-8 p-4 bg-red-50 text-red-700 rounded-xl border border-red-200 flex items-start gap-3 animate-in fade-in">
              <Icon name="exclamation" className="w-5 h-5 shrink-0 mt-0.5 text-red-500" />
              <div>
                <strong className="block font-bold">Gagal memproses data</strong>
                <span className="text-sm">{error}</span>
              </div>
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
      </main>
    </div>
  );
}
