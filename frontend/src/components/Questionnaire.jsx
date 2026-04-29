// src/components/Questionnaire.jsx
// Multi-step quiz UI. Three steps:
//   Step 1: Latar Belakang (jurusan_smk, mapel_favorit)
//   Step 2: Eksplorasi Minat & Bakat (hobi, tipe_kerja, sosial, target_industri)
//   Step 3: Parameter Logistik (lokasi_provinsi, jenis_pt)

import Icon from "./Icons";
import {
  JURUSAN_SMK_OPTIONS,
  MAPEL_OPTIONS,
  HOBI_OPTIONS,
  TIPE_KERJA_OPTIONS,
  SOSIAL_OPTIONS,
  INDUSTRI_OPTIONS,
  PROVINSI_OPTIONS,
  JENIS_PT_OPTIONS,
} from "../data/options";

// ── Reusable sub-components ──────────────────────────────────────────────────

function RadioCardGroup({ name, options, value, onChange }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3" role="radiogroup">
      {options.map((opt) => {
        const isSelected = value === opt.value;
        return (
          <label
            key={opt.value}
            className={`
              relative flex items-center p-4 border rounded-xl cursor-pointer
              transition-all duration-200 ease-in-out transform
              ${
                isSelected
                  ? "border-blue-600 bg-blue-50 ring-1 ring-blue-600 shadow-sm"
                  : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50 hover:-translate-y-0.5 hover:shadow-sm"
              }
            `}
            title={opt.label}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              className="sr-only"
              checked={isSelected}
              onChange={() => onChange(name, opt.value)}
            />
            <span className="flex items-center gap-3 w-full">
              {opt.icon && (
                <div className={`shrink-0 ${isSelected ? "text-blue-600" : "text-slate-400"}`}>
                  <Icon name={opt.icon} className="w-5 h-5" />
                </div>
              )}
              <span className={`font-medium text-sm ${isSelected ? "text-blue-700" : "text-slate-700"}`}>
                {opt.label}
              </span>
            </span>
          </label>
        );
      })}
    </div>
  );
}

function CheckboxTagGroup({ name, options, values, onChange }) {
  const toggle = (val) => {
    const updated = values.includes(val)
      ? values.filter((v) => v !== val)
      : [...values, val];
    onChange(name, updated);
  };
  return (
    <div className="flex flex-wrap gap-2" role="group">
      {options.map((opt) => {
        const isChecked = values.includes(opt);
        return (
          <label
            key={opt}
            className={`
              inline-flex items-center px-4 py-2 border rounded-full cursor-pointer
              transition-all duration-200 ease-in-out text-sm font-medium
              ${
                isChecked
                  ? "border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600"
                  : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-slate-50 hover:-translate-y-0.5"
              }
            `}
          >
            <input
              type="checkbox"
              className="sr-only"
              checked={isChecked}
              onChange={() => toggle(opt)}
            />
            <span>{opt}</span>
          </label>
        );
      })}
    </div>
  );
}

function SelectNative({ name, id, options, value, onChange, required }) {
  return (
    <div className="relative">
      <select
        name={name}
        id={id}
        className="w-full appearance-none bg-white border border-slate-200 text-slate-700 py-3 px-4 pr-10 rounded-xl leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer hover:border-slate-300"
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        required={required}
        aria-required={required}
      >
        <option value="" disabled>
          Pilih salah satu...
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
        </svg>
      </div>
    </div>
  );
}

// ── Step 1 ───────────────────────────────────────────────────────────────────

function StepBackground({ data, onChange }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-2" id="step1-heading">Latar Belakang SMK-mu</h2>
        <p className="text-slate-500">
          Ceritakan sedikit tentang jurusan dan mata pelajaran favoritmu di SMK.
        </p>
      </div>

      <div className="space-y-8">
        <div className="flex flex-col gap-3">
          <label htmlFor="jurusan_smk" className="font-semibold text-slate-700">
            Jurusan SMK Saat Ini
          </label>
          <SelectNative
            name="jurusan_smk"
            id="jurusan_smk"
            options={JURUSAN_SMK_OPTIONS}
            value={data.jurusan_smk}
            onChange={onChange}
            required
          />
        </div>

        <div className="flex flex-col gap-3">
          <label className="font-semibold text-slate-700">
            Mata Pelajaran Favorit <span className="font-normal text-slate-400 ml-1 text-sm">(pilih semua yang kamu suka)</span>
          </label>
          <CheckboxTagGroup
            name="mapel_favorit"
            options={MAPEL_OPTIONS}
            values={data.mapel_favorit}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
}

// ── Step 2 ───────────────────────────────────────────────────────────────────

function StepMinat({ data, onChange }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-2" id="step2-heading">Eksplorasi Minat & Bakat</h2>
        <p className="text-slate-500">
          Jawaban ini akan mendapatkan bobot tertinggi dalam penghitungan AI kami.
        </p>
      </div>

      <div className="space-y-8">
        <div className="flex flex-col gap-3">
          <label className="font-semibold text-slate-700">Hobi atau Kegiatan yang Paling Kamu Nikmati</label>
          <RadioCardGroup
            name="hobi_spesifik"
            options={HOBI_OPTIONS}
            value={data.hobi_spesifik}
            onChange={onChange}
          />
        </div>

        <div className="flex flex-col gap-3">
          <label className="font-semibold text-slate-700">Tipe Lingkungan Kerja Impian</label>
          <RadioCardGroup
            name="tipe_kerja"
            options={TIPE_KERJA_OPTIONS}
            value={data.tipe_kerja}
            onChange={onChange}
          />
        </div>

        <div className="flex flex-col gap-3">
          <label className="font-semibold text-slate-700">Cara Kamu Paling Produktif</label>
          <RadioCardGroup
            name="sosial"
            options={SOSIAL_OPTIONS}
            value={data.sosial}
            onChange={onChange}
          />
        </div>

        <div className="flex flex-col gap-3">
          <label className="font-semibold text-slate-700">Target Industri Setelah Lulus</label>
          <RadioCardGroup
            name="target_industri"
            options={INDUSTRI_OPTIONS}
            value={data.target_industri}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
}

// ── Step 3 ───────────────────────────────────────────────────────────────────

function StepLogistik({ data, onChange }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-2" id="step3-heading">Parameter Pencarian Kampus</h2>
        <p className="text-slate-500">
          Opsional — biarkan kosong jika kamu terbuka untuk semua pilihan.
        </p>
      </div>

      <div className="space-y-8">
        <div className="flex flex-col gap-3">
          <label htmlFor="lokasi_provinsi" className="font-semibold text-slate-700">
            Preferensi Lokasi Provinsi
          </label>
          <SelectNative
            name="lokasi_provinsi"
            id="lokasi_provinsi"
            options={PROVINSI_OPTIONS}
            value={data.lokasi_provinsi}
            onChange={onChange}
          />
        </div>

        <div className="flex flex-col gap-3">
          <label htmlFor="jenis_pt" className="font-semibold text-slate-700">
            Jenis Perguruan Tinggi
          </label>
          <SelectNative
            name="jenis_pt"
            id="jenis_pt"
            options={JENIS_PT_OPTIONS}
            value={data.jenis_pt}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function Questionnaire({ step, data, onChange, onNext, onBack, onSubmit, loading }) {
  const isStep1Complete = !!data.jurusan_smk && data.mapel_favorit.length > 0;
  const isStep2Complete =
    !!data.hobi_spesifik && !!data.tipe_kerja && !!data.sosial && !!data.target_industri;

  const canProceed = step === 1 ? isStep1Complete : step === 2 ? isStep2Complete : true;

  return (
    <div>
      {step === 1 && <StepBackground data={data} onChange={onChange} />}
      {step === 2 && <StepMinat data={data} onChange={onChange} />}
      {step === 3 && <StepLogistik data={data} onChange={onChange} />}

      <div className="flex flex-col-reverse sm:flex-row justify-end items-center gap-4 mt-12 pt-6 border-t border-slate-100">
        {step > 1 && (
          <button
            type="button"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-200"
            onClick={onBack}
            aria-label="Kembali ke langkah sebelumnya"
          >
            <Icon name="arrowLeft" className="w-5 h-5" />
            Kembali
          </button>
        )}

        {step < 3 ? (
          <button
            type="button"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow"
            onClick={onNext}
            disabled={!canProceed}
            aria-label="Lanjut ke langkah berikutnya"
          >
            Lanjut
            <Icon name="arrowRight" className="w-5 h-5" />
          </button>
        ) : (
          <button
            type="button"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-75 disabled:cursor-not-allowed shadow-sm hover:shadow"
            onClick={onSubmit}
            disabled={loading}
            aria-label="Kirim dan analisis dengan AI"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Menganalisis AI...
              </>
            ) : (
              <>
                Temukan Rekomendasiku
                <Icon name="sparkles" className="w-5 h-5" />
              </>
            )}
          </button>
        )}
      </div>

      {step === 1 && !isStep1Complete && (
        <p className="mt-4 text-sm text-slate-400 text-center animate-in fade-in">
          Pilih jurusan SMK dan minimal satu mata pelajaran untuk melanjutkan.
        </p>
      )}
      {step === 2 && !isStep2Complete && (
        <p className="mt-4 text-sm text-slate-400 text-center animate-in fade-in">
          Lengkapi semua pilihan di Langkah 2 untuk melanjutkan.
        </p>
      )}
    </div>
  );
}
