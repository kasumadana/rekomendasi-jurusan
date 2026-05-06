import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, ArrowLeft } from "lucide-react";

export default function AdminLogin() {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (pin === "ADMIN123") {
      localStorage.setItem("navigara_admin", "true");
      navigate("/admin/dashboard");
    } else {
      setError("Akses tidak diizinkan.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6 selection:bg-zinc-950 selection:text-white">
      <div className="w-full max-w-sm space-y-12">
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-zinc-950 text-white rounded-full mb-4">
            <Lock className="w-5 h-5" />
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tighter text-zinc-950">Autentikasi Sistem.</h1>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">Masukkan PIN keamanan untuk melanjutkan</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-950 px-1" htmlFor="pin">Kode PIN</label>
            <input
              id="pin"
              type="password"
              placeholder="••••••••"
              className="w-full px-6 py-4 bg-zinc-50 border-2 border-zinc-100 font-bold tracking-widest text-zinc-950 focus:outline-none focus:border-zinc-950 transition-colors"
              value={pin}
              onChange={(e) => { setPin(e.target.value); setError(""); }}
              required
            />
            {error && <p className="text-red-600 text-[10px] font-black uppercase tracking-widest px-1">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-5 bg-zinc-950 text-white font-black uppercase tracking-[0.4em] text-xs transition-all hover:bg-zinc-800 active:scale-95 shadow-lg shadow-zinc-200"
          >
            Autentikasi
          </button>
        </form>

        <div className="text-center pt-8">
          <button
            onClick={() => navigate("/")}
            className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 hover:text-zinc-950 transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-3 h-3" />
            Kembali ke Halaman Publik
          </button>
        </div>
      </div>
    </div>
  );
}
