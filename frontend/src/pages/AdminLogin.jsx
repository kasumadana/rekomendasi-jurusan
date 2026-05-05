import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../components/Icons";

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
      setError("PIN tidak valid");
    }
  };

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-slate-50 p-6 font-sans">
      <div className="w-full max-w-sm bg-white p-8 rounded-3xl shadow-sm ring-1 ring-slate-200 animate-in zoom-in-95 duration-500">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4 ring-1 ring-blue-600/10">
            <Icon name="users" className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Admin Area</h1>
          <p className="text-sm text-slate-500 mt-2">Masukkan PIN rahasia untuk melanjutkan</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700" htmlFor="pin">
              PIN Akses
            </label>
            <input
              id="pin"
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setError("");
              }}
              required
            />
            {error && <p className="text-red-500 text-sm font-medium animate-in fade-in">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors active:scale-[0.98]"
          >
            Masuk Dashboard
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/")}
            className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
          >
            &larr; Kembali ke Beranda
          </button>
        </div>
      </div>
    </div>
  );
}
