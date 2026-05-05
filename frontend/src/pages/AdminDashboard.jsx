import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts";
import Icon from "../components/Icons";

// Slate and Blue palettes from DESIGN.md
const COLORS_PIE = ["#2563eb", "#10b981", "#64748b", "#f59e0b", "#ef4444"];
const COLOR_BAR = "#2563eb";

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("navigara_admin") !== "true") {
      navigate("/admin");
      return;
    }

    fetch("http://localhost:5005/stats")
      .then(res => res.json())
      .then(res => {
        if (res.status === "success") {
          setData(res.data);
        } else {
          setError(res.message);
        }
      })
      .catch(err => {
        setError("Gagal terhubung ke backend.");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("navigara_admin");
    navigate("/admin");
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border-none shadow-md rounded-lg p-3 text-slate-800 text-sm">
          <p className="font-medium mb-1">{label || payload[0].name}</p>
          <p className="text-blue-600 font-bold">
            Total: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-slate-50 font-sans">
        <Icon name="refresh" className="w-8 h-8 text-blue-600 animate-spin mb-4" />
        <p className="text-slate-500 font-medium">Memuat data statistik...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-slate-50 font-sans">
        <Icon name="exclamation" className="w-12 h-12 text-red-500 mb-4" />
        <p className="text-slate-800 font-bold mb-2">Terjadi Kesalahan</p>
        <p className="text-slate-500">{error}</p>
        <button onClick={handleLogout} className="mt-6 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition">Kembali</button>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-slate-50 font-sans pb-16">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-sm">
              <Icon name="chart" className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
              Dashboard Analitik Navigara
            </h1>
          </div>
          <button 
            onClick={handleLogout}
            className="text-sm font-medium text-slate-500 hover:text-slate-900 flex items-center gap-2 transition-colors bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-10">
        {/* Top Section (Big Numbers) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-start">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <Icon name="users" className="w-5 h-5" />
              </div>
              <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Responden</h2>
            </div>
            <p className="text-5xl font-extrabold text-blue-600 mt-2">{data?.total_responden || 0}</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-start">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Icon name="academicCap" className="w-5 h-5" />
              </div>
              <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Lanjut Kuliah (Ya)</h2>
            </div>
            <p className="text-5xl font-extrabold text-slate-800 mt-2">
              {data?.niat_kuliah?.find(d => d.name === "Ya")?.value || 0}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-start">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center">
                <Icon name="sparkles" className="w-5 h-5" />
              </div>
              <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Lintas Jurusan</h2>
            </div>
            <p className="text-5xl font-extrabold text-slate-800 mt-2">
              {data?.analisis_jalur?.find(d => d.name === "Lintas Jurusan")?.value || 0}
            </p>
          </div>
        </div>

        {/* Chart Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-both">
          {/* Card Grafik 1 (Pie Chart): Niat Melanjutkan Kuliah */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6 tracking-tight">Niat Melanjutkan Kuliah</h3>
            <div className="h-64">
              {data?.niat_kuliah?.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.niat_kuliah}
                      cx="50%"
                      cy="50%"
                      innerRadius={0}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                      stroke="none"
                    >
                      {data.niat_kuliah.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS_PIE[index % COLORS_PIE.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '14px', color: '#64748b' }} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-400">Belum ada data</div>
              )}
            </div>
          </div>

          {/* Card Grafik 2 (Donut Chart): Rencana Sejalur vs Lintas Jurusan */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6 tracking-tight">Sejalur vs Lintas Jurusan</h3>
            <div className="h-64">
              {data?.analisis_jalur?.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.analisis_jalur}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {data.analisis_jalur.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS_PIE[(index + 1) % COLORS_PIE.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '14px', color: '#64748b' }} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-400">Belum ada data</div>
              )}
            </div>
          </div>

          {/* Card Grafik 3 (Bar Chart Horizontal): Demografi Asal Jurusan */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6 tracking-tight">Demografi Asal Jurusan</h3>
            <div className="h-64">
              {data?.demografi_asal?.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.demografi_asal} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
                    <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                    <Tooltip cursor={{ fill: '#f8fafc' }} content={<CustomTooltip />} />
                    <Bar dataKey="value" fill={COLOR_BAR} radius={[0, 4, 4, 0]} barSize={24} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-400">Belum ada data</div>
              )}
            </div>
          </div>

          {/* Card Grafik 4 (Bar Chart Vertical): Top 5 Hobi Terpopuler */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6 tracking-tight">Top 5 Hobi Terpopuler</h3>
            <div className="h-64">
              {data?.top_hobi?.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.top_hobi} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                    <Tooltip cursor={{ fill: '#f8fafc' }} content={<CustomTooltip />} />
                    <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={48} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-400">Belum ada data</div>
              )}
            </div>
          </div>
        </div>

        {/* List Section: Top 5 Rekomendasi Jurusan AI */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-both">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center">
              <Icon name="sparkles" className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 tracking-tight">Top 5 Rekomendasi Jurusan AI</h3>
          </div>
          
          {data?.top_rekomendasi?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 text-sm uppercase tracking-wider">
                    <th className="py-4 px-4 font-medium">Peringkat</th>
                    <th className="py-4 px-4 font-medium">Program Studi (Jurusan)</th>
                    <th className="py-4 px-4 font-medium text-right">Jumlah Rekomendasi</th>
                  </tr>
                </thead>
                <tbody>
                  {data.top_rekomendasi.map((item, index) => (
                    <tr key={index} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4 font-semibold text-slate-800">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-600 text-sm">
                          {index + 1}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-medium text-slate-800">{item.name}</td>
                      <td className="py-4 px-4 font-bold text-blue-600 text-right">{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-12 flex flex-col items-center justify-center text-slate-400 bg-slate-50 rounded-xl border border-slate-100">
              <Icon name="academicCap" className="w-8 h-8 mb-2 opacity-50" />
              <p>Belum ada data rekomendasi AI.</p>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
