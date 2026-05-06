import Icon from "./Icons";
import { useState } from "react";
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

// ── Apple HIG Style Reusable Components ──────────────────────────────────────

function RadioCardGroup({ name, options, value, onChange }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3" role="radiogroup">
      {options.map((opt) => {
        const isSelected = value === opt.value;
        return (
          <label
            key={opt.value}
            className={`
              relative flex items-center p-4 border-2 cursor-pointer transition-colors
              ${
                isSelected
                  ? "border-zinc-900 bg-zinc-900 text-white"
                  : "border-zinc-200 bg-white hover:border-zinc-900 text-zinc-500"
              }
            `}
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
              <span className={`font-bold text-sm tracking-tight ${isSelected ? "text-white" : "text-zinc-800"}`}>
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
              inline-flex items-center px-4 py-2 border-2 cursor-pointer transition-colors text-sm font-bold tracking-tight
              ${
                isChecked
                  ? "border-zinc-900 bg-zinc-900 text-white"
                  : "border-zinc-200 bg-white text-zinc-500 hover:border-zinc-900 hover:text-zinc-900"
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

function SearchableCardGroup({ name, options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  
  const visibleOptions = options.slice(0, 5);
  const isCustomSelected = value && !visibleOptions.find(opt => opt.value === value);

  const filteredOptions = options.filter(opt => opt.label.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3" role="radiogroup">
        {visibleOptions.map((opt) => {
          const isSelected = value === opt.value;
          return (
            <label
              key={opt.value}
              className={`
                relative flex items-center p-4 border-2 cursor-pointer transition-colors
                ${isSelected ? "border-zinc-900 bg-zinc-900 text-white" : "border-zinc-200 bg-white hover:border-zinc-900 text-zinc-500"}
              `}
            >
              <input
                type="radio"
                name={name}
                value={opt.value}
                className="sr-only"
                checked={isSelected}
                onChange={() => onChange(name, opt.value)}
              />
              <span className={`font-bold text-sm tracking-tight ${isSelected ? "text-white" : "text-zinc-800"}`}>
                {opt.label}
              </span>
            </label>
          );
        })}

        {/* Lainnya Card */}
        <label
          className={`
            relative flex items-center p-4 border-2 border-dashed cursor-pointer transition-colors
            ${isCustomSelected ? "border-zinc-900 bg-zinc-900 text-white border-solid" : "border-zinc-300 bg-transparent hover:border-zinc-900 hover:border-solid text-zinc-500"}
          `}
          onClick={(e) => { e.preventDefault(); setIsOpen(true); }}
        >
           <span className={`font-bold text-sm tracking-tight ${isCustomSelected ? "text-white" : "text-zinc-800"}`}>
             {isCustomSelected ? value : "Lainnya..."}
           </span>
        </label>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-900/40 backdrop-blur-sm p-4">
          <div className="bg-white border-4 border-zinc-900 w-full max-w-lg shadow-[8px_8px_0px_0px_rgba(24,24,27,1)] flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b-2 border-zinc-200 relative flex gap-3">
              <input 
                type="text" 
                placeholder="Cari opsi..." 
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-zinc-100 border-2 border-transparent px-4 py-3 text-sm font-bold text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 focus:bg-white transition-colors"
              />
              <button 
                onClick={() => setIsOpen(false)}
                className="w-12 h-12 flex items-center justify-center border-2 border-zinc-200 hover:border-zinc-900 hover:bg-zinc-900 hover:text-white transition-colors font-bold"
              >
                ✕
              </button>
            </div>
            <div className="overflow-y-auto p-4 flex-1">
              {filteredOptions.length === 0 && <p className="text-zinc-400 font-bold text-sm text-center py-8 tracking-widest uppercase">Tidak ditemukan</p>}
              <div className="flex flex-col gap-2">
                {filteredOptions.map(opt => (
                  <button 
                    key={opt.value}
                    onClick={() => { onChange(name, opt.value); setIsOpen(false); }}
                    className={`text-left px-4 py-3 border-2 font-bold text-sm tracking-tight transition-colors ${value === opt.value ? "bg-zinc-900 border-zinc-900 text-white" : "bg-white border-transparent text-zinc-600 hover:border-zinc-900 hover:text-zinc-900"}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SelectNative({ name, id, options, value, onChange, required }) {
  return (
    <div className="relative">
      <select
        name={name}
        id={id}
        className="w-full appearance-none bg-white border-2 border-zinc-200 text-zinc-900 font-bold text-sm py-4 px-4 pr-10 focus:outline-none focus:border-zinc-900 hover:border-zinc-400 transition-colors cursor-pointer rounded-none"
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        required={required}
      >
        <option value="" disabled>Pilih salah satu...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-900">
        ▼
      </div>
    </div>
  );
}

// ── Steps ───────────────────────────────────────────────────────────────────

function StepNiatKuliah({ data, onChange }) {
  const minatKuliahOptions = [
    { value: "Ya", label: "Ya, berencana kuliah" },
    { value: "Tidak", label: "Tidak ingin kuliah" },
    { value: "Belum Tahu", label: "Masih ragu / Belum tahu" },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10">
        <h2 className="text-3xl font-black text-zinc-900 tracking-tighter uppercase">Niat Melanjutkan Pendidikan</h2>
        <div className="w-12 h-1 bg-zinc-900 mt-4 mb-4"></div>
        <p className="text-zinc-500 font-medium">Langkah pertama untuk menentukan arah rekomendasi masa depanmu.</p>
      </div>
      <div className="flex flex-col gap-4">
        <label className="font-bold text-zinc-900 text-sm tracking-wider uppercase">Apakah kamu berencana kuliah setelah lulus?</label>
        <RadioCardGroup name="minat_kuliah" options={minatKuliahOptions} value={data.minat_kuliah} onChange={onChange} />
      </div>
    </div>
  );
}

function StepBackgroundNormal({ data, onChange }) {
  const lintasJurusanOptions = [
    { value: "Sejalur", label: "Sejalur (Linier dengan SMK)" },
    { value: "Lintas Jurusan", label: "Lintas Jurusan (Berbeda dengan SMK)" },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10">
        <h2 className="text-3xl font-black text-zinc-900 tracking-tighter uppercase">Latar Belakang Akademis</h2>
        <div className="w-12 h-1 bg-zinc-900 mt-4 mb-4"></div>
      </div>
      <div className="space-y-10">
        <div className="flex flex-col gap-4">
          <label className="font-bold text-zinc-900 text-sm tracking-wider uppercase">Apakah ingin jurusan sejalur atau lintas jurusan?</label>
          <RadioCardGroup name="lintas_jurusan" options={lintasJurusanOptions} value={data.lintas_jurusan} onChange={onChange} />
        </div>
        <div className="flex flex-col gap-4">
          <label className="font-bold text-zinc-900 text-sm tracking-wider uppercase">Jurusan SMK Saat Ini</label>
          <SelectNative name="jurusan_smk" id="jurusan_smk" options={JURUSAN_SMK_OPTIONS} value={data.jurusan_smk} onChange={onChange} required />
        </div>
        <div className="flex flex-col gap-4">
          <label className="font-bold text-zinc-900 text-sm tracking-wider uppercase">Mata Pelajaran Favorit</label>
          <CheckboxTagGroup name="mapel_favorit" options={MAPEL_OPTIONS} values={data.mapel_favorit} onChange={onChange} />
        </div>
      </div>
    </div>
  );
}

function StepMinat({ data, onChange }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10">
        <h2 className="text-3xl font-black text-zinc-900 tracking-tighter uppercase">Eksplorasi Minat & Bakat</h2>
        <div className="w-12 h-1 bg-zinc-900 mt-4 mb-4"></div>
        <p className="text-zinc-500 font-medium">Jawaban ini akan menentukan akurasi rekomendasi AI Navigara.</p>
      </div>
      <div className="space-y-10">
        <div className="flex flex-col gap-4">
          <label className="font-bold text-zinc-900 text-sm tracking-wider uppercase">Hobi atau Kegiatan Paling Dinikmati</label>
          <SearchableCardGroup name="hobi_spesifik" options={HOBI_OPTIONS} value={data.hobi_spesifik} onChange={onChange} />
        </div>
        <div className="flex flex-col gap-4">
          <label className="font-bold text-zinc-900 text-sm tracking-wider uppercase">Tipe Lingkungan Kerja Impian</label>
          <RadioCardGroup name="tipe_kerja" options={TIPE_KERJA_OPTIONS} value={data.tipe_kerja} onChange={onChange} />
        </div>
        <div className="flex flex-col gap-4">
          <label className="font-bold text-zinc-900 text-sm tracking-wider uppercase">Cara Paling Produktif</label>
          <RadioCardGroup name="sosial" options={SOSIAL_OPTIONS} value={data.sosial} onChange={onChange} />
        </div>
        <div className="flex flex-col gap-4">
          <label className="font-bold text-zinc-900 text-sm tracking-wider uppercase">Target Industri Setelah Lulus</label>
          <SearchableCardGroup name="target_industri" options={INDUSTRI_OPTIONS} value={data.target_industri} onChange={onChange} />
        </div>
      </div>
    </div>
  );
}

function StepLogistik({ data, onChange }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10">
        <h2 className="text-3xl font-black text-zinc-900 tracking-tighter uppercase">Parameter Kampus</h2>
        <div className="w-12 h-1 bg-zinc-900 mt-4 mb-4"></div>
        <p className="text-zinc-500 font-medium">Opsional. Biarkan kosong jika kamu terbuka untuk semua pilihan kampus.</p>
      </div>
      <div className="space-y-10">
        <div className="flex flex-col gap-4">
          <label className="font-bold text-zinc-900 text-sm tracking-wider uppercase">Preferensi Lokasi Provinsi</label>
          <SelectNative name="lokasi_provinsi" id="lokasi_provinsi" options={PROVINSI_OPTIONS} value={data.lokasi_provinsi} onChange={onChange} />
        </div>
        <div className="flex flex-col gap-4">
          <label className="font-bold text-zinc-900 text-sm tracking-wider uppercase">Jenis Perguruan Tinggi</label>
          <SelectNative name="jenis_pt" id="jenis_pt" options={JENIS_PT_OPTIONS} value={data.jenis_pt} onChange={onChange} />
        </div>
      </div>
    </div>
  );
}

function StepEarlyExit({ data, onChange }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10">
        <h2 className="text-3xl font-black text-zinc-900 tracking-tighter uppercase">Pendataan Profil</h2>
        <div className="w-12 h-1 bg-zinc-900 mt-4 mb-4"></div>
        <p className="text-zinc-500 font-medium">Bantu kami mencatat latar belakangmu sebelum menyelesaikan survei.</p>
      </div>
      <div className="space-y-10">
        <div className="flex flex-col gap-4">
          <label className="font-bold text-zinc-900 text-sm tracking-wider uppercase">Jurusan SMK Saat Ini</label>
          <SelectNative name="jurusan_smk" id="jurusan_smk" options={JURUSAN_SMK_OPTIONS} value={data.jurusan_smk} onChange={onChange} required />
        </div>
        <div className="flex flex-col gap-4">
          <label className="font-bold text-zinc-900 text-sm tracking-wider uppercase">Hobi Terbesar / Minat Utama</label>
          <SearchableCardGroup name="hobi_spesifik" options={HOBI_OPTIONS} value={data.hobi_spesifik} onChange={onChange} />
        </div>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function Questionnaire({ step, data, onChange, onNext, onBack, onSubmit, loading, isEarlyExit }) {
  const isStep1Complete = !!data.minat_kuliah;
  
  const isStep2NormalComplete = !!data.lintas_jurusan && !!data.jurusan_smk && data.mapel_favorit.length > 0;
  const isStep3NormalComplete = !!data.hobi_spesifik && !!data.tipe_kerja && !!data.sosial && !!data.target_industri;
  
  const isStep2EarlyComplete = !!data.jurusan_smk && !!data.hobi_spesifik;

  let canProceed = false;
  if (step === 1) canProceed = isStep1Complete;
  else if (step === 2 && !isEarlyExit) canProceed = isStep2NormalComplete;
  else if (step === 2 && isEarlyExit) canProceed = isStep2EarlyComplete;
  else if (step === 3 && !isEarlyExit) canProceed = isStep3NormalComplete;
  else if (step === 4 && !isEarlyExit) canProceed = true;

  const maxSteps = isEarlyExit ? 2 : 4;

  return (
    <div>
      {step === 1 && <StepNiatKuliah data={data} onChange={onChange} />}
      
      {!isEarlyExit && step === 2 && <StepBackgroundNormal data={data} onChange={onChange} />}
      {!isEarlyExit && step === 3 && <StepMinat data={data} onChange={onChange} />}
      {!isEarlyExit && step === 4 && <StepLogistik data={data} onChange={onChange} />}
      
      {isEarlyExit && step === 2 && <StepEarlyExit data={data} onChange={onChange} />}

      <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 mt-16 pt-8 border-t-2 border-zinc-100">
        {step > 1 ? (
          <button
            type="button"
            className="w-full sm:w-auto px-8 py-4 font-bold tracking-widest uppercase text-xs text-zinc-600 bg-white border-2 border-zinc-200 hover:border-zinc-900 hover:text-zinc-900 transition-colors"
            onClick={onBack}
          >
            ← Kembali
          </button>
        ) : <div />}

        {step < maxSteps ? (
          <button
            type="button"
            className="w-full sm:w-auto px-10 py-4 font-bold tracking-widest uppercase text-xs text-white bg-zinc-900 border-2 border-zinc-900 hover:bg-zinc-800 transition-colors disabled:opacity-30 disabled:hover:bg-zinc-900"
            onClick={onNext}
            disabled={!canProceed}
          >
            Lanjut →
          </button>
        ) : (
          <button
            type="button"
            className="w-full sm:w-auto px-10 py-4 font-black tracking-widest uppercase text-xs text-white bg-blue-600 border-2 border-zinc-900 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onSubmit}
            disabled={loading || !canProceed}
          >
            {loading ? "Menyimpan..." : isEarlyExit ? "Selesai & Kirim" : "Analisis Profil"}
          </button>
        )}
      </div>
    </div>
  );
}
