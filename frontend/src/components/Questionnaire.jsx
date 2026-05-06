import { ArrowLeft, ArrowRight, Sparkles, Loader2 } from "lucide-react";

// ── Komponen pembantu yang dapat digunakan kembali ────────────────────────────────

function RadioOptionGroup({ name, options, value, onChange }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {options.map((opt) => {
        const isSelected = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(name, opt.value)}
            className={`
              flex flex-col items-start p-6 text-left border-2 transition-all duration-150 shadow-sm
              ${isSelected 
                ? "border-emerald-600 bg-emerald-50 text-emerald-950" 
                : "border-zinc-300 hover:border-zinc-500 bg-white text-zinc-900"
              }
            `}
          >
            <span className={`text-[10px] font-black uppercase tracking-[0.2em] mb-3 ${isSelected ? "text-emerald-700" : "text-zinc-500"}`}>
              {opt.value}
            </span>
            <span className="font-bold text-lg leading-tight">{opt.label}</span>
          </button>
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
    <div className="flex flex-wrap gap-3">
      {options.map((opt) => {
        const isChecked = values.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            className={`
              px-6 py-3 border-2 text-sm font-bold uppercase tracking-widest transition-all shadow-sm
              ${isChecked 
                ? "bg-blue-600 border-blue-600 text-white" 
                : "bg-white border-zinc-300 text-zinc-600 hover:border-zinc-500 hover:text-zinc-900"
              }
            `}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function SimpleSelect({ name, id, options, value, onChange, required }) {
  return (
    <div className="relative group">
      <select
        name={name}
        id={id}
        className="w-full appearance-none bg-white border-2 border-zinc-300 text-zinc-900 py-5 px-6 font-bold uppercase tracking-widest text-xs focus:outline-none focus:border-emerald-600 transition-colors cursor-pointer shadow-sm"
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        required={required}
      >
        <option value="" disabled>Pilih Opsi</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-6 text-zinc-500 group-hover:text-emerald-600 transition-colors">
        <ArrowRight className="w-4 h-4 rotate-90" />
      </div>
    </div>
  );
}

// ── Tahapan Kuesioner ────────────────────────────────────────────────────────

export default function Questionnaire({ step, data, onChange, onNext, onBack, onSubmit, loading }) {
  const isStep1Complete = 
    !!data.minat_kuliah && 
    (data.minat_kuliah === "Ya" ? !!data.lintas_jurusan : true) &&
    !!data.jurusan_smk && 
    data.mapel_favorit.length > 0;
    
  const isStep2Complete =
    !!data.hobi_spesifik && !!data.tipe_kerja && !!data.sosial && !!data.target_industri;

  const canProceed = step === 1 ? isStep1Complete : step === 2 ? isStep2Complete : true;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {step === 1 && (
        <div className="space-y-16">
          <div className="space-y-4">
            <h2 className="text-4xl font-black uppercase tracking-tighter text-zinc-900">Latar Belakang Akademik</h2>
            <p className="text-zinc-600 font-bold uppercase tracking-widest text-xs">Informasi dasar mengenai status pendidikan Anda saat ini.</p>
          </div>
          
          <div className="space-y-12">
            <div className="space-y-6">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-900 border-l-4 border-emerald-600 pl-4">01. Rencana Melanjutkan Kuliah?</label>
              <RadioOptionGroup
                name="minat_kuliah"
                options={[
                  { value: "Ya", label: "Melanjutkan ke Pendidikan Tinggi" },
                  { value: "Tidak", label: "Langsung Memasuki Dunia Kerja" },
                  { value: "Belum Tahu", label: "Belum Menentukan Pilihan" },
                ]}
                value={data.minat_kuliah}
                onChange={onChange}
              />
            </div>

            {data.minat_kuliah === "Ya" && (
              <div className="space-y-6">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-900 border-l-4 border-blue-600 pl-4">02. Pilihan Jalur Pendidikan?</label>
                <RadioOptionGroup
                  name="lintas_jurusan"
                  options={[
                    { value: "Sejalur", label: "Tetap Sesuai Fokus SMK (Linier)" },
                    { value: "Lintas Jurusan", label: "Berpindah Bidang (Lintas Jurusan)" },
                  ]}
                  value={data.lintas_jurusan}
                  onChange={onChange}
                />
              </div>
            )}

            <div className="space-y-6">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-900 border-l-4 border-zinc-900 pl-4">03. Jurusan SMK Saat Ini</label>
              <SimpleSelect
                name="jurusan_smk"
                options={[
                  { value: "RPL", label: "Rekayasa Perangkat Lunak" },
                  { value: "TKJ", label: "Teknik Komputer & Jaringan" },
                  { value: "MM", label: "Multimedia / DKV" },
                  { value: "TBSM", label: "Teknik Bisnis Sepeda Motor" },
                  { value: "TKR", label: "Teknik Kendaraan Ringan" },
                  { value: "AK", label: "Akuntansi" },
                  { value: "PM", label: "Pemasaran" },
                  { value: "OTKP", label: "Otomatisasi & Tata Kelola Perkantoran" },
                ]}
                value={data.jurusan_smk}
                onChange={onChange}
              />
            </div>

            <div className="space-y-6">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-900 border-l-4 border-zinc-900 pl-4">04. Mata Pelajaran Favorit</label>
              <CheckboxTagGroup
                name="mapel_favorit"
                options={["Matematika", "Bahasa Inggris", "Fisika", "Biologi", "Seni Budaya", "Ekonomi", "Olahraga", "Sejarah", "Sosiologi"]}
                values={data.mapel_favorit}
                onChange={onChange}
              />
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-16">
          <div className="space-y-4">
            <h2 className="text-4xl font-black uppercase tracking-tighter text-zinc-900">Minat & Vokasi</h2>
            <p className="text-zinc-600 font-bold uppercase tracking-widest text-xs">Memetakan minat personal ke dalam ekosistem industri yang relevan.</p>
          </div>

          <div className="space-y-12">
            <div className="space-y-6">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-900 border-l-4 border-emerald-600 pl-4">01. Aktivitas Pilihan</label>
              <RadioOptionGroup
                name="hobi_spesifik"
                options={[
                  { value: "Coding/Logika", label: "Logika & Pengembangan Sistem" },
                  { value: "Menggambar/Desain", label: "Seni Visual & Desain" },
                  { value: "Otomotif/Mesin", label: "Teknik Mekanik & Otomotif" },
                  { value: "Menghitung/Analisis", label: "Keuangan & Analisis Data" },
                  { value: "Olahraga/Fisik", label: "Aktivitas Fisik & Olahraga" },
                  { value: "Berinteraksi/Sosial", label: "Komunikasi & Hubungan Masyarakat" },
                ]}
                value={data.hobi_spesifik}
                onChange={onChange}
              />
            </div>

            <div className="space-y-6">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-900 border-l-4 border-blue-600 pl-4">02. Lingkungan Kerja Idaman</label>
              <RadioOptionGroup
                name="tipe_kerja"
                options={[
                  { value: "Kantor/Indoor", label: "Ruang Kantor (Indoor)" },
                  { value: "Lapangan/Outdoor", label: "Operasional Lapangan (Outdoor)" },
                  { value: "Studio Kreatif", label: "Studio Kreatif / Agensi" },
                  { value: "Bengkel/Lab", label: "Laboratorium / Bengkel Kerja" },
                ]}
                value={data.tipe_kerja}
                onChange={onChange}
              />
            </div>
            
            <div className="space-y-6">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-900 border-l-4 border-zinc-900 pl-4">03. Gaya Produktivitas</label>
              <RadioOptionGroup
                name="sosial"
                options={[
                  { value: "Mandiri", label: "Fokus Secara Mandiri" },
                  { value: "Tim/Berkelompok", label: "Kolaborasi Dalam Tim" },
                ]}
                value={data.sosial}
                onChange={onChange}
              />
            </div>

            <div className="space-y-6">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-900 border-l-4 border-zinc-900 pl-4">04. Target Industri</label>
              <RadioOptionGroup
                name="target_industri"
                options={[
                  { value: "Teknologi", label: "Teknologi Informasi & Digital" },
                  { value: "Industri Kreatif", label: "Media & Kreatif" },
                  { value: "Manufaktur", label: "Manufaktur & Otomotif" },
                  { value: "Bisnis/Keuangan", label: "Korporat & Keuangan" },
                  { value: "Layanan Kesehatan", label: "Layanan Kesehatan & Medis" },
                  { value: "Pendidikan", label: "Pendidikan & Riset" },
                ]}
                value={data.target_industri}
                onChange={onChange}
              />
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-16">
          <div className="space-y-4">
            <h2 className="text-4xl font-black uppercase tracking-tighter text-zinc-900">Logistik Akhir</h2>
            <p className="text-zinc-600 font-bold uppercase tracking-widest text-xs">Filter tambahan untuk hasil rekomendasi yang lebih presisi.</p>
          </div>

          <div className="space-y-12">
            <div className="space-y-6">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-900 border-l-4 border-emerald-600 pl-4">01. Lokasi Pilihan</label>
              <SimpleSelect
                name="lokasi_provinsi"
                options={[
                  { value: "Bali", label: "Bali" },
                  { value: "Jawa Timur", label: "Jawa Timur" },
                  { value: "Jawa Tengah", label: "Jawa Tengah" },
                  { value: "Jawa Barat", label: "Jawa Barat" },
                  { value: "Jakarta", label: "DKI Jakarta" },
                  { value: "Luar Jawa", label: "Luar Pulau Jawa" },
                ]}
                value={data.lokasi_provinsi}
                onChange={onChange}
              />
            </div>

            <div className="space-y-6">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-900 border-l-4 border-blue-600 pl-4">02. Jenis Institusi</label>
              <SimpleSelect
                name="jenis_pt"
                options={[
                  { value: "PTN", label: "Perguruan Tinggi Negeri (PTN)" },
                  { value: "PTS", label: "Perguruan Tinggi Swasta (PTS)" },
                  { value: "Institut", label: "Institut" },
                  { value: "Politeknik", label: "Politeknik" },
                ]}
                value={data.jenis_pt}
                onChange={onChange}
              />
            </div>
          </div>
        </div>
      )}

      <div className="mt-24 pt-12 border-t-2 border-zinc-300 flex flex-col-reverse md:flex-row items-center justify-between gap-8">
        {step > 1 ? (
          <button
            type="button"
            onClick={onBack}
            className="group flex items-center gap-3 text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Kembali
          </button>
        ) : <div />}

        <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-auto">
          {step < 3 ? (
            <button
              type="button"
              onClick={onNext}
              disabled={!canProceed}
              className="w-full md:w-auto px-10 py-5 bg-emerald-600 text-white font-bold uppercase tracking-widest text-xs rounded-full hover:bg-emerald-700 disabled:opacity-20 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 shadow-lg shadow-emerald-100"
            >
              Tahap Berikutnya
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onSubmit}
              disabled={loading}
              className="w-full md:w-auto px-10 py-5 bg-emerald-600 text-white font-bold uppercase tracking-widest text-xs rounded-full hover:bg-emerald-700 transition-all flex items-center justify-center gap-3 shadow-lg shadow-emerald-100"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Sparkles className="w-4 h-4" /> Jalankan Diagnosis</>}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
