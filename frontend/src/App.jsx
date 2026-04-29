// src/App.jsx
// Root component — orchestrates the multi-step quiz and the result page.

import { useState } from "react";
import "./index.css";

import ProgressBar from "./components/ProgressBar";
import Questionnaire from "./components/Questionnaire";
import RecommendationResult from "./components/RecommendationResult";
import Icon from "./components/Icons";

const API_URL = "http://localhost:5005/prediksi";

const INITIAL_FORM = {
  jurusan_smk:     "",
  mapel_favorit:   [],   // array (checkbox)
  hobi_spesifik:   "",
  tipe_kerja:      "",
  sosial:          "",
  target_industri: "",
  lokasi_provinsi: "",
  jenis_pt:        "",
};

export default function App() {
  const [step,       setStep]       = useState(1);        // 1 | 2 | 3
  const [formData,   setFormData]   = useState(INITIAL_FORM);
  const [result,     setResult]     = useState(null);     // null = form, array = results
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState(null);

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => setStep((s) => Math.min(s + 1, 3));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    // Flatten mapel array to space-joined string for the backend
    const payload = {
      ...formData,
      mapel_favorit: formData.mapel_favorit.join(" "),
    };

    try {
      const res = await fetch(API_URL, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `HTTP ${res.status}`);
      }

      const data = await res.json();
      if (data.status === "success") {
        setResult(data.rekomendasi);
      } else {
        throw new Error(data.message || "Terjadi kesalahan pada server.");
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Gagal menghubungi server AI. Pastikan Flask berjalan di port 5005.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setStep(1);
    setFormData(INITIAL_FORM);
    setError(null);
  };

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased selection:bg-blue-100 selection:text-blue-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col min-h-screen">

        {/* ── Navbar / Brand ──────────────────────────────────────────────── */}
        <header className="flex items-center gap-3 pt-8 pb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shrink-0 shadow-sm shadow-blue-200">
            <Icon name="academicCap" className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-800">
            Navigara
          </span>
        </header>

        {/* ── Main content ────────────────────────────────────────────────── */}
        <main className="flex-grow">
          {result !== null ? (
            /* ── Result View ─────────────────────────────────────────────── */
            <RecommendationResult
              rekomendasi={result}
              formData={formData}
              onReset={handleReset}
            />
          ) : (
            /* ── Quiz View ───────────────────────────────────────────────── */
            <div className="animate-in fade-in duration-500">
              {/* Hero */}
              <div className="text-center mb-10 max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-6 ring-1 ring-blue-200/50">
                  <Icon name="sparkles" className="w-3.5 h-3.5" />
                  AI-Powered · Gratis · Akurat
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-4 leading-tight">
                  Temukan Jurusan<br className="hidden sm:block" />yang Tepat Untukmu
                </h1>
                <p className="text-base md:text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
                  Kuesioner singkat 3 langkah. AI kami akan mencocokkan profil SMK-mu
                  dengan jurusan kuliah terbaik secara personal.
                </p>
              </div>

              {/* Progress */}
              <ProgressBar currentStep={step} />

              {/* Error banner */}
              {error && (
                <div
                  role="alert"
                  className="flex items-start gap-3 p-4 mb-8 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium animate-in slide-in-from-top-2"
                >
                  <Icon name="exclamation" className="w-5 h-5 shrink-0 mt-0.5" />
                  {error}
                </div>
              )}

              {/* Questionnaire card */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 mb-8 transition-all">
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

              {/* Step counter hint */}
              <p className="text-center text-sm text-slate-400 font-medium mb-8">
                Langkah {step} dari 3
              </p>
            </div>
          )}
        </main>

        {/* ── Footer ──────────────────────────────────────────────────────── */}
        <footer className="text-center py-8 text-xs text-slate-400">
          Navigara &copy; 2026 — Ditenagai oleh AI Content-Based Filtering &middot; Dirancang untuk siswa SMK Indonesia
        </footer>
      </div>
    </div>
  );
}
