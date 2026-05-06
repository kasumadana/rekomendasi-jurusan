import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, AreaChart, Area
} from "recharts";
import { BarChart3, LogOut, Loader2, TrendingUp, Target, Activity } from "lucide-react";

const COLORS = [
  "#059669", // Emerald
  "#2563eb", // Blue
  "#d97706", // Amber
  "#dc2626", // Red
  "#7c3aed", // Violet
  "#db2777", // Pink
];

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
      .then(res => { if (res.status === "success") setData(res.data); else setError(res.message); })
      .catch(() => setError("Gagal mengambil data analitik."))
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("navigara_admin");
    navigate("/admin");
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border-2 border-zinc-900 p-3 shadow-xl">
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">{label || payload[0].name}</p>
          <p className="text-sm font-black text-zinc-900">{payload[0].value} Responden</p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 text-emerald-600 animate-spin mb-4" />
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500">Memuat Inteligensi Sistem...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 font-sans selection:bg-zinc-900 selection:text-white">
      {/* Header */}
      <header className="bg-white border-b-2 border-zinc-900 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* <div className="w-10 h-10 bg-zinc-900 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div> */}
            <h1 className="text-2xl font-black uppercase tracking-tighter text-zinc-900">Analitik Sistem.</h1>
          </div>
          <button 
            onClick={handleLogout}
            className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 hover:text-red-600 flex items-center gap-2 transition-colors"
          >
            <LogOut className="w-3 h-3" />
            Selesaikan Sesi
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-24">
        {/* KPI Row */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-10 border-2 border-zinc-300 shadow-sm space-y-4 hover:border-emerald-600 transition-colors">
            <div className="flex items-center justify-between">
              <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-600">Total Sampel</h2>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-6xl font-black text-zinc-900 tracking-tighter">{data?.total_responden || 0}</div>
          </div>
          
          <div className="bg-white p-10 border-2 border-zinc-300 shadow-sm space-y-4 hover:border-blue-600 transition-colors">
            <div className="flex items-center justify-between">
              <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-600">Niat Kuliah</h2>
              <Target className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-6xl font-black text-zinc-900 tracking-tighter">
              {data?.niat_kuliah?.find(d => d.name === "Ya")?.value || 0}
            </div>
          </div>

          <div className="bg-white p-10 border-2 border-zinc-300 shadow-sm space-y-4 hover:border-amber-600 transition-colors">
            <div className="flex items-center justify-between">
              <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-600">Lintas Jurusan</h2>
              <Activity className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-6xl font-black text-zinc-900 tracking-tighter">
              {data?.analisis_jalur?.find(d => d.name === "Lintas Jurusan")?.value || 0}
            </div>
          </div>
        </section>

        {/* Primary Chart Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="bg-white p-8 border-2 border-zinc-300 space-y-10">
            <h3 className="text-xs font-black uppercase tracking-[0.5em] text-zinc-600 flex items-center gap-4">
              Analisis Niat Lanjut
              <div className="h-px bg-zinc-200 flex-1" />
            </h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={data?.niat_kuliah} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" strokeWidth={0}>
                    {data?.niat_kuliah?.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '11px', fontWeight: 'bold', color: '#334155' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-8 border-2 border-zinc-300 space-y-10">
            <h3 className="text-xs font-black uppercase tracking-[0.5em] text-zinc-600 flex items-center gap-4">
              Sebaran Linearitas
              <div className="h-px bg-zinc-200 flex-1" />
            </h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data?.analisis_jalur}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 800, fill: '#475569' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 800, fill: '#475569' }} />
                  <Tooltip cursor={{ fill: '#f1f5f9' }} content={<CustomTooltip />} />
                  <Bar dataKey="value" barSize={50}>
                    {data?.analisis_jalur?.map((_, i) => <Cell key={i} fill={COLORS[(i + 2) % COLORS.length]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* New Chart: Hobi & Aktivitas */}
        <section className="bg-white p-10 border-2 border-zinc-300 space-y-12">
          <h3 className="text-xs font-black uppercase tracking-[0.5em] text-zinc-600 flex items-center gap-4">
            Distribusi Minat & Aktivitas Pilihan
            <div className="h-px bg-zinc-200 flex-1" />
          </h3>
          <div className="h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data?.top_hobi}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 800, fill: '#475569' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 800, fill: '#475569' }} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="value" stroke="#059669" strokeWidth={4} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Data Table */}
        <section className="space-y-8 pb-20">
          <h3 className="text-xs font-black uppercase tracking-[0.5em] text-zinc-600 flex items-center gap-4">
            Prioritas Rekomendasi AI
            <div className="h-px bg-zinc-200 flex-1" />
          </h3>
          <div className="bg-white border-2 border-zinc-900 overflow-hidden shadow-2xl">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-zinc-900 text-white text-[10px] font-black uppercase tracking-[0.4em]">
                  <th className="py-6 px-8">Peringkat</th>
                  <th className="py-6 px-8">Spesialisasi</th>
                  <th className="py-6 px-8 text-right">Jumlah</th>
                </tr>
              </thead>
              <tbody>
                {data?.top_rekomendasi?.map((item, i) => (
                  <tr key={i} className="border-b border-zinc-200 hover:bg-zinc-50 transition-colors group">
                    <td className="py-6 px-8 text-sm font-black text-zinc-500 group-hover:text-emerald-600 transition-colors">0{i + 1}</td>
                    <td className="py-6 px-8 text-sm font-bold text-zinc-900 uppercase tracking-widest">{item.name}</td>
                    <td className="py-6 px-8 text-sm font-black text-emerald-600 text-right">{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
