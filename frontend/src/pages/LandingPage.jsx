import { useNavigate, Link } from "react-router-dom";
import Icon from "../components/Icons";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center max-w-4xl mx-auto w-full pt-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 font-medium text-sm mb-8 ring-1 ring-blue-600/10 shadow-sm">
        <Icon name="check" className="w-4 h-4" />
        Sistem Rekomendasi Pintar
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-800 leading-tight mb-6">
        Temukan Arah <br className="hidden md:block" />
        <span className="text-blue-600">Masa Depanmu</span>
      </h1>
      
      <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-[60ch] leading-relaxed">
        Navigara menganalisis profil vokasi, minat, dan gaya kerjamu untuk merekomendasikan jurusan kuliah dan universitas terbaik secara objektif.
      </p>

      <button
        onClick={() => navigate("/kuesioner")}
        className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 text-lg font-semibold text-white transition-all duration-200 ease-in-out bg-blue-600 rounded-xl hover:bg-blue-700 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
      >
        Mulai Tes Kecocokan
        <Icon name="arrowRight" className="w-5 h-5 transition-transform group-hover:translate-x-1" />
      </button>

      <div className="mt-20 border-t border-slate-200 w-full pt-8 flex justify-between items-center text-slate-400 text-sm font-medium">
        <span>&copy; {new Date().getFullYear()} Navigara</span>
        <Link to="/admin" className="hover:text-slate-800 transition-colors">Admin Area</Link>
      </div>
    </div>
  );
}
