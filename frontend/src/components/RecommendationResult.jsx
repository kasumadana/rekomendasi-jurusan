import Icon from "./Icons";

// ── Circular progress ring (SVG) ─────────────────────────────────────────────

function RingProgress({ pct, stroke = "currentColor", trackStroke = "rgba(0,0,0,0.1)", textColor = "text-slate-800" }) {
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
      <div className={`absolute font-bold text-sm sm:text-base ${textColor}`}>{pct}%</div>
    </div>
  );
}

// ── Badge helper ─────────────────────────────────────────────────────────────

function JenisBadge({ jenis }) {
  const map = {
    PTN: "bg-emerald-100 text-emerald-700 border-emerald-200",
    PTS: "bg-blue-100 text-blue-700 border-blue-200",
    Institut: "bg-indigo-100 text-indigo-700 border-indigo-200",
    Politeknik: "bg-orange-100 text-orange-700 border-orange-200",
  };
  const cls = map[jenis] || "bg-slate-100 text-slate-700 border-slate-200";
  return <span className={`text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full border ${cls}`}>{jenis}</span>;
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function RecommendationResult({ rekomendasi, formData, onReset }) {
  const hasResult = rekomendasi && rekomendasi.length > 0;
  const topMatch = hasResult ? rekomendasi[0] : null;
  const alternatives = hasResult ? rekomendasi.slice(1) : [];

  return (
    <div className="animate-in fade-in duration-500 w-full max-w-5xl mx-auto">
      <div className="text-center mb-10 max-w-2xl mx-auto">
        {hasResult ? (
          <>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-800 mb-4">
              Rekomendasi Untukmu
            </h1>
            <p className="text-base md:text-lg text-slate-500">
              Berdasarkan profilmu sebagai lulusan <strong className="text-slate-800 font-semibold">{formData.jurusan_smk}</strong> dengan minat di industri <strong className="text-slate-800 font-semibold">{formData.target_industri}</strong>.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-800 mb-4">
              Belum Ada Kecocokan
            </h1>
            <p className="text-base md:text-lg text-slate-500">
              AI kami tidak menemukan profil yang sesuai. Coba ubah pilihan filter kampusmu.
            </p>
          </>
        )}
      </div>

      {hasResult ? (
        <div className="flex flex-col gap-8">
          {/* Top Match (Ranking 1) */}
          <article className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 overflow-hidden animate-in slide-in-from-bottom-4 fade-in fill-mode-both">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-6 mb-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3 border border-blue-100">
                  <Icon name="sparkles" className="w-3.5 h-3.5" />
                  Top Match
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-800">
                  {topMatch.jurusan}
                </h2>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 px-4 py-3 rounded-2xl border border-slate-100">
                <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Match<br/>Score</span>
                <RingProgress pct={topMatch.persentase} stroke="#2563eb" trackStroke="#e2e8f0" textColor="text-blue-700" />
              </div>
            </div>

            {/* Universitas List for Top Match */}
            <div>
              {topMatch.universitas && topMatch.universitas.length > 0 ? (
                <>
                  <div className="flex items-center gap-2 font-semibold text-slate-700 mb-4">
                    <Icon name="academicCap" className="w-5 h-5 text-blue-600" />
                    Kampus yang Tersedia ({topMatch.universitas.length})
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {topMatch.universitas.map((univ) => (
                      <li key={univ.nama} className="flex flex-col p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-sm transition-all group">
                        <span className="font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">{univ.nama}</span>
                        <div className="flex items-center justify-between mt-auto">
                          <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                            <Icon name="mapPin" className="w-3.5 h-3.5 text-slate-400" />
                            {univ.lokasi}
                          </span>
                          <JenisBadge jenis={univ.jenis} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                  <Icon name="exclamation" className="w-8 h-8 text-slate-400 mb-3" />
                  <p className="max-w-sm text-sm">Tidak ada kampus yang cocok dengan filter lokasi/jenismu untuk jurusan ini.</p>
                </div>
              )}
            </div>
          </article>

          {/* Alternatives (Ranking 2 & 3) */}
          {alternatives.length > 0 && (
            <div className="mt-4">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-px bg-slate-300"></span>
                Alternatif Lainnya
                <span className="w-full h-px bg-slate-200 flex-1"></span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {alternatives.map((item, idx) => (
                  <article
                    key={item.jurusan + idx}
                    className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-4 fade-in fill-mode-both flex flex-col"
                    style={{ animationDelay: `${(idx + 1) * 150}ms` }}
                  >
                    <div className="p-6 border-b border-slate-100 flex items-start justify-between gap-4 bg-slate-50/50">
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
                          #{idx + 2} Alternatif
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-800">
                          {item.jurusan}
                        </h2>
                      </div>
                      <RingProgress pct={item.persentase} stroke="#10b981" trackStroke="#e2e8f0" textColor="text-emerald-700" />
                    </div>

                    <div className="p-6 flex-1 flex flex-col">
                      {item.universitas && item.universitas.length > 0 ? (
                        <ul className="flex flex-col gap-3 flex-1">
                          {item.universitas.slice(0, 3).map((univ) => (
                            <li key={univ.nama} className="flex flex-col p-3 rounded-lg border border-slate-100 bg-white hover:bg-slate-50 transition-colors">
                              <span className="font-semibold text-slate-800 text-sm mb-1.5">{univ.nama}</span>
                              <div className="flex items-center justify-between">
                                <span className="flex items-center gap-1 text-xs text-slate-500">
                                  <Icon name="mapPin" className="w-3.5 h-3.5" />
                                  {univ.lokasi}
                                </span>
                                <JenisBadge jenis={univ.jenis} />
                              </div>
                            </li>
                          ))}
                          {item.universitas.length > 3 && (
                            <li className="text-center text-xs font-medium text-slate-400 py-2">
                              + {item.universitas.length - 3} kampus lainnya
                            </li>
                          )}
                        </ul>
                      ) : (
                        <div className="flex-1 flex flex-col items-center justify-center py-6 text-center text-slate-400 bg-slate-50/50 rounded-lg border border-dashed border-slate-200">
                          <p className="text-sm">Tidak ada kampus yang cocok.</p>
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
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
      <div className="flex justify-center mt-12 mb-8 animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: "400ms" }}>
        <button
          type="button"
          className="inline-flex items-center gap-2 px-8 py-3 font-medium text-slate-600 bg-transparent border-2 border-slate-300 rounded-xl hover:bg-slate-100 hover:text-slate-900 hover:border-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-slate-300 active:scale-95"
          onClick={onReset}
        >
          <Icon name="refresh" className="w-5 h-5" />
          Coba Profil Berbeda
        </button>
      </div>
    </div>
  );
}
