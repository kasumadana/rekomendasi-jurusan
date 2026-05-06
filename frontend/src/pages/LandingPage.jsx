import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ParticleField from "../components/ParticleField";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-white">
      {/* Hero Section - Asymmetric Editorial Layout */}
      <section className="relative overflow-hidden border-b-2 border-zinc-100">
        <ParticleField />
        
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-40 grid grid-cols-1 md:grid-cols-12 gap-12 items-end relative z-10">
          <div className="md:col-span-8">
            {/* <div className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-800 text-[10px] font-black uppercase tracking-[0.4em] mb-10 border-2 border-emerald-200 shadow-sm">
              Sistem Inteligensi Vokasi
            </div> */}
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] text-zinc-950 uppercase">
              Tentukan<br />
              <span className="text-zinc-300">Vokasi Anda.</span>
            </h1>
            <p className="mt-12 text-xl md:text-2xl text-zinc-600 max-w-xl leading-relaxed font-black">
              Sistem rekomendasi cerdas yang membantu lulusan SMK memetakan karir akademik berdasarkan profil unik dan kompetensi keahlian Anda.
            </p>
          </div>
          
          <div className="md:col-span-4 flex flex-col items-start md:items-end gap-10">
            <button
              onClick={() => navigate("/kuesioner")}
              className="w-full md:w-auto px-12 py-7 bg-zinc-950 text-white font-bold uppercase tracking-widest text-sm rounded-full transition-all hover:bg-emerald-600  flex items-center justify-center gap-4 shadow-2xl"
            >
              Mulai Analisis
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 text-left md:text-right border-l-4 md:border-l-0 md:border-r-4 border-zinc-900 pl-6 md:pl-0 md:pr-6 leading-loose">
              Berdasarkan Analisis<br />
              <span className="text-zinc-900">TF-IDF & Cosine Similarity</span>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy / Features section - Minimal & Typographic */}
      <section className="bg-zinc-950 py-32 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
            <div>
              <h2 className="text-xs font-black uppercase tracking-[0.5em] text-emerald-500 mb-12">Metodologi</h2>
              <p className="text-4xl md:text-5xl font-black leading-[1.1] tracking-tighter">
                Kami tidak sekadar mencocokkan nilai, melainkan memahami <span className="text-zinc-400 italic">gaya produktivitas</span> dan <span className="text-zinc-400 italic">ambisi</span> industri Anda.
              </p>
            </div>
            
            <div className="space-y-20">
              <div className="group">
                <div className="flex items-center gap-8 mb-8">
                  <span className="text-sm font-black text-emerald-900 group-hover:text-emerald-400 transition-colors">01</span>
                  <div className="h-0.5 bg-zinc-800 flex-1"></div>
                </div>
                <h3 className="text-3xl font-black mb-4 uppercase tracking-tight">Pemetaan Vokasi</h3>
                <p className="text-zinc-400 text-sm leading-relaxed font-bold uppercase tracking-widest">
                  Analisis mendalam terhadap jurusan SMK asal untuk menentukan relevansi dan linearitas pendidikan tinggi yang sesuai.
                </p>
              </div>

              <div className="group">
                <div className="flex items-center gap-8 mb-8">
                  <span className="text-sm font-black text-emerald-900 group-hover:text-emerald-400 transition-colors">02</span>
                  <div className="h-0.5 bg-zinc-800 flex-1"></div>
                </div>
                <h3 className="text-3xl font-black mb-4 uppercase tracking-tight">Kecocokan Algoritma</h3>
                <p className="text-zinc-400 text-sm leading-relaxed font-bold uppercase tracking-widest">
                  Menggunakan kumpulan data profil lulusan untuk menemukan pola kecocokan yang paling akurat melalui matematika vektor.
                </p>
              </div>

              <div className="group">
                <div className="flex items-center gap-8 mb-8">
                  <span className="text-sm font-black text-emerald-900 group-hover:text-emerald-400 transition-colors">03</span>
                  <div className="h-0.5 bg-zinc-800 flex-1"></div>
                </div>
                <h3 className="text-3xl font-black mb-4 uppercase tracking-tight">Katalog Institusi</h3>
                <p className="text-zinc-400 text-sm leading-relaxed font-bold uppercase tracking-widest">
                  Integrasi data ribuan program studi dari PTN, PTS, dan Politeknik di seluruh wilayah Indonesia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-48 max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-20 text-zinc-950">
          Siap untuk<br />melangkah?
        </h2>
        <button
          onClick={() => navigate("/kuesioner")}
          className="px-20 py-10 border-[6px] border-zinc-950 text-zinc-950 font-black uppercase tracking-widest text-sm rounded-full transition-all hover:bg-zinc-950 hover:text-white"
        >
          Ikuti Tes Sekarang
        </button>
      </section>
    </div>
  );
}
