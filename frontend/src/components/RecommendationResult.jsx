// src/components/RecommendationResult.jsx
// Halaman hasil rekomendasi AI — menampilkan Top-3 jurusan dengan persentase
// kecocokan dan daftar kampus yang sudah difilter.

import Icon from "./Icons";

// ── Circular progress ring (SVG) ─────────────────────────────────────────────

function RingProgress({ pct, stroke = "currentColor", trackStroke = "rgba(255,255,255,0.25)" }) {
  const r = 26;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;

  return (
    <div className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 shrink-0" aria-label={`Kecocokan ${pct}%`}>
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 64 64">
        {/* track */}
        <circle cx="32" cy="32" r={r} fill="none" stroke={trackStroke} strokeWidth="6" />
        {/* fill */}
        <circle
          cx="32"
          cy="32"
          r={r}
          fill="none"
          stroke={stroke}
          strokeWidth="6"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute font-bold text-sm sm:text-base">{pct}%</div>
    </div>
  );
}

// ── Badge helper ─────────────────────────────────────────────────────────────

function JenisBadge({ jenis }) {
  const map = {
    PTN: "bg-emerald-100 text-emerald-800 ring-emerald-200",
    PTS: "bg-blue-100 text-blue-800 ring-blue-200",
    Institut: "bg-purple-100 text-purple-800 ring-purple-200",
    Politeknik: "bg-orange-100 text-orange-800 ring-orange-200",
  };
  const cls = map[jenis] || "bg-slate-100 text-slate-800 ring-slate-200";
  return <span className={`text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full ring-1 ${cls}`}>{jenis}</span>;
}

// ── Card gradient variant ────────────────────────────────────────────────────

const headerGradient = [
  "bg-gradient-to-br from-blue-600 to-indigo-700 text-white", // Rank 1
  "bg-gradient-to-br from-slate-800 to-slate-900 text-white", // Rank 2
  "bg-gradient-to-br from-slate-600 to-slate-700 text-white", // Rank 3
];
const rankLabel = ["#1 Top Match", "#2 Alternatif", "#3 Alternatif"];

// ── Main Component ────────────────────────────────────────────────────────────

export default function RecommendationResult({ rekomendasi, formData, onReset }) {
  const hasResult = rekomendasi && rekomendasi.length > 0;

  return (
    <div className="animate-in fade-in duration-500">
      <div className="text-center mb-10 max-w-2xl mx-auto">
        {hasResult ? (
          <>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
              Rekomendasi Untukmu
            </h1>
            <p className="text-base md:text-lg text-slate-500">
              Berdasarkan profilmu sebagai lulusan <strong className="text-slate-800">{formData.jurusan_smk}</strong> dengan minat di bidang <strong className="text-slate-800">{formData.target_industri}</strong>.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
              Belum Ada Kecocokan
            </h1>
            <p className="text-base md:text-lg text-slate-500">
              AI kami tidak menemukan profil yang sesuai. Coba ubah pilihan filter kampusmu.
            </p>
          </>
        )}
      </div>

      {hasResult ? (
        <div className="flex flex-col gap-6">
          {rekomendasi.map((item, idx) => {
            const isTopMatch = idx === 0;
            return (
              <article
                key={item.jurusan + idx}
                className={`bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-4 fade-in fill-mode-both ${
                  isTopMatch ? "ring-2 ring-blue-500 ring-offset-2" : ""
                }`}
                style={{ animationDelay: `${idx * 150}ms` }}
                aria-label={`Rekomendasi ${idx + 1}: ${item.jurusan}`}
              >
                {/* Header */}
                <div className={`p-6 sm:p-8 flex items-center justify-between gap-4 ${headerGradient[idx] || "bg-slate-800 text-white"}`}>
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-semibold mb-3 border border-white/10">
                      {isTopMatch && <Icon name="sparkles" className="w-3.5 h-3.5 text-blue-200" />}
                      {rankLabel[idx]}
                    </div>
                    <h2 className={`font-extrabold tracking-tight ${isTopMatch ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"}`}>
                      {item.jurusan}
                    </h2>
                  </div>
                  <RingProgress pct={item.persentase} stroke="currentColor" trackStroke="rgba(255,255,255,0.2)" />
                </div>

                {/* Body */}
                <div className="p-6 sm:p-8 bg-white">
                  {item.universitas && item.universitas.length > 0 ? (
                    <>
                      <div className="flex items-center gap-2 font-semibold text-slate-800 mb-4">
                        <Icon name="academicCap" className="w-5 h-5 text-blue-600" />
                        Kampus yang Tersedia ({item.universitas.length})
                      </div>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3" aria-label={`Daftar kampus untuk ${item.jurusan}`}>
                        {item.universitas.map((univ) => (
                          <li key={univ.nama} className="flex flex-col p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100 transition-colors">
                            <span className="font-bold text-slate-800 mb-2">{univ.nama}</span>
                            <div className="flex items-center justify-between mt-auto">
                              <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                                <Icon name="mapPin" className="w-3.5 h-3.5" />
                                {univ.lokasi}
                              </span>
                              <JenisBadge jenis={univ.jenis} />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-8 text-center text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-200" role="status">
                      <Icon name="exclamation" className="w-8 h-8 text-slate-400 mb-3" />
                      <p className="max-w-sm text-sm">Tidak ada kampus yang cocok dengan filter lokasi/jenismu. Coba ubah preferensi di langkah sebelumnya.</p>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center animate-in zoom-in-95 fade-in">
          <div className="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4">
            <Icon name="exclamation" className="w-8 h-8 text-slate-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Profil Sangat Unik</h2>
          <p className="text-slate-500 max-w-md mx-auto">Dataset AI belum mencakup kombinasi parameter ini. Silakan coba ubah filter kampus atau perbarui jawaban kuesionermu.</p>
        </div>
      )}

      {/* Reset button */}
      <div className="text-center mt-12 mb-8 animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: "500ms" }}>
        <button
          type="button"
          className="inline-flex items-center gap-2 px-6 py-3 font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-200 shadow-sm"
          onClick={onReset}
          aria-label="Ulangi kuesioner dari awal"
        >
          <Icon name="refresh" className="w-5 h-5" />
          Coba Profil Berbeda
        </button>
      </div>
    </div>
  );
}
