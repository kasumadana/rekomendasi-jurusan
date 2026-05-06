import { MapPin, RotateCcw, Search, Trophy } from "lucide-react";

export default function RecommendationResult({ rekomendasi, formData, onReset, isEarlyExit }) {
  const hasResult = rekomendasi && rekomendasi.length > 0;
  const topMatch = hasResult ? rekomendasi[0] : null;
  const alternatives = hasResult ? rekomendasi.slice(1) : [];

  if (isEarlyExit) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-12">
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-zinc-950">
          Terima <br />
          <span className="text-blue-600">Kasih.</span>
        </h1>
        <p className="max-w-xl text-lg font-bold text-zinc-500 uppercase tracking-widest leading-relaxed">
          Tanggapan Anda telah berhasil disimpan di sistem Navigara. Semoga sukses dengan rencana masa depan Anda!
        </p>
        <button
          onClick={onReset}
          className="group flex items-center gap-3 px-8 py-4 border-2 border-zinc-900 bg-white text-xs font-black uppercase tracking-[0.3em] text-zinc-900 hover:bg-zinc-900 hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] hover:shadow-none hover:translate-y-1"
        >
          <RotateCcw className="w-4 h-4 group-hover:-rotate-90 transition-transform" />
          Kembali ke Awal
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-32">
      {/* Result Header */}
      <div className="flex flex-col md:flex-row items-end justify-between gap-12 border-b-2 border-zinc-950 pb-12">
        <div className="max-w-2xl">
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-zinc-950">
            Diagnosis<br />
            <span className="text-blue-600">Selesai.</span>
          </h1>
          <p className="mt-8 text-lg font-bold text-zinc-500 uppercase tracking-widest leading-relaxed">
            Analisis Profil <span className="text-zinc-950 border-b-2 border-blue-200">{formData.jurusan_smk}</span> &bull; Target Industri <span className="text-zinc-950 border-b-2 border-blue-200">{formData.target_industri}</span>
          </p>
        </div>
        
        <button
          onClick={onReset}
          className="group flex items-center gap-3 text-xs font-black uppercase tracking-[0.3em] text-zinc-500 hover:text-blue-600 transition-colors"
        >
          <RotateCcw className="w-4 h-4 group-hover:rotate-[-45deg] transition-transform" />
          Ulangi Tes
        </button>
      </div>

      {hasResult ? (
        <div className="space-y-32">
          {/* Top Recommendation */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-16">
            <div className="md:col-span-5 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.4em]">
                <Trophy className="w-3 h-3" />
                Kecocokan Tertinggi
              </div>
              <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-zinc-950 leading-tight">
                {topMatch.jurusan}
              </h2>
              <div className="flex items-center gap-10">
                <div className="space-y-1">
                  <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Skor</div>
                  <div className="text-5xl font-black text-blue-600">{topMatch.persentase}%</div>
                </div>
                <div className="h-12 w-px bg-zinc-200" />
                <div className="text-sm font-bold text-zinc-600 leading-relaxed">
                  Program studi ini memiliki tingkat relevansi tertinggi berdasarkan parameter gaya produktivitas dan target industri Anda.
                </div>
              </div>
            </div>

            <div className="md:col-span-7">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500 mb-8 flex items-center gap-4">
                Institusi Rekomendasi
                <div className="h-px bg-zinc-200 flex-1" />
              </h3>
              
              <div className="grid grid-cols-1 gap-6">
                {topMatch.universitas && topMatch.universitas.length > 0 ? (
                  topMatch.universitas.map((univ) => (
                    <div key={univ.nama} className="group p-8 border-2 border-zinc-200 hover:border-blue-600 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white shadow-sm rounded-xl">
                      <div className="space-y-3">
                        <div className="inline-block px-2 py-1 bg-zinc-100 text-[9px] font-black uppercase tracking-widest text-zinc-600">{univ.jenis}</div>
                        <h4 className="text-xl font-bold text-zinc-950 group-hover:text-blue-600 transition-colors">{univ.nama}</h4>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-500 uppercase tracking-widest">
                          <MapPin className="w-3 h-3" />
                          {univ.lokasi}
                        </div>
                      </div>
                      <a 
                        href={`https://www.google.com/search?q=${encodeURIComponent(topMatch.jurusan + " " + univ.nama)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 border-2 border-zinc-950 text-xs font-black uppercase tracking-widest group-hover:bg-zinc-950 group-hover:text-white transition-all flex items-center gap-2 rounded-lg shrink-0"
                      >
                        <Search className="w-3 h-3" />
                        Pelajari di Google
                      </a>
                    </div>
                  ))
                ) : (
                  <div className="py-20 text-center border-2 border-dashed border-zinc-200 bg-zinc-50 rounded-xl">
                    <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest">Tidak ada institusi yang sesuai dengan filter Anda.</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Alternatives */}
          {alternatives.length > 0 && (
            <section className="pt-24 border-t-2 border-zinc-200">
              <h2 className="text-xs font-black uppercase tracking-[0.5em] text-zinc-500 mb-16">Rekomendasi Lainnya</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {alternatives.map((item, idx) => (
                  <div key={item.jurusan + idx} className="space-y-8 p-10 bg-white border-2 border-zinc-200 hover:border-blue-600 transition-all group rounded-xl">
                    <div className="flex items-end justify-between">
                      <div className="space-y-2">
                        <div className="text-[10px] font-black uppercase tracking-widest text-blue-600">Alternatif 0{idx + 1}</div>
                        <h3 className="text-3xl font-black uppercase tracking-tighter text-zinc-950 group-hover:text-blue-600 transition-colors">
                          {item.jurusan}
                        </h3>
                      </div>
                      <div className="text-3xl font-black text-zinc-300 group-hover:text-blue-200 transition-colors">{item.persentase}%</div>
                    </div>
                    
                    <div className="space-y-3">
                      {item.universitas.slice(0, 3).map((univ) => (
                        <div key={univ.nama} className="flex justify-between items-center py-4 border-b border-zinc-100 last:border-0">
                          <span className="text-sm font-bold text-zinc-900">{univ.nama}</span>
                          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{univ.jenis}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      ) : (
        <div className="py-32 text-center">
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-4 text-zinc-900">Profil Unik.</h2>
          <p className="text-zinc-500 max-w-md mx-auto font-bold uppercase tracking-widest text-xs leading-relaxed">Dataset kami belum menemukan pola yang cocok secara akurat. Silakan coba modifikasi preferensi Anda.</p>
        </div>
      )}
    </div>
  );
}
