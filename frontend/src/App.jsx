import { BrowserRouter, Routes, Route, Navigate, Outlet, Link, useLocation } from "react-router-dom";
import { Compass } from "lucide-react";
import LandingPage from "./pages/LandingPage";
import QuestionnairePage from "./pages/QuestionnairePage";
import ResultPage from "./pages/ResultPage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

function Navbar() {
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <Compass className="w-5 h-5 text-zinc-950 transition-transform group-hover:rotate-12" />
          <span className="font-bold text-sm tracking-widest uppercase text-zinc-900">Navigara</span>
        </Link>

        <nav className="flex items-center gap-8">
          <Link to="/" className={`text-xs font-bold uppercase tracking-wider transition-colors ${location.pathname === '/' ? 'text-zinc-950' : 'text-zinc-400 hover:text-zinc-900'}`}>
            Beranda
          </Link>
          <Link
            to="/kuesioner"
            className="text-xs font-bold uppercase tracking-wider bg-zinc-950 text-white px-5 py-2.5 rounded-full hover:bg-zinc-800 transition-all"
          >
            Mulai Tes
          </Link>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-zinc-50 border-t border-zinc-100 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          <div className="space-y-4 max-w-xs">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-zinc-900" />
              <span className="font-bold text-sm tracking-widest uppercase text-zinc-900">Navigara</span>
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Platform rekomendasi cerdas untuk siswa SMK dalam menentukan langkah pendidikan selanjutnya dengan bantuan teknologi kecerdasan buatan.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-16">
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-900">Platform</h4>
              <ul className="space-y-2 text-sm text-zinc-500">
                <li><Link to="/" className="hover:text-zinc-900">Beranda</Link></li>
                <li><Link to="/kuesioner" className="hover:text-zinc-900">Mulai Tes</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-900">Sistem</h4>
              <ul className="space-y-2 text-sm text-zinc-500">
                <li><Link to="/admin" className="hover:text-zinc-900">Login Admin</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-zinc-200/60 flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
          <span>&copy; {new Date().getFullYear()} Proyek Navigara</span>
        </div>
      </div>
    </footer>
  );
}

function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-zinc-900 selection:text-white">
      <Navbar />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/kuesioner" element={<QuestionnairePage />} />
          <Route path="/hasil" element={<ResultPage />} />
        </Route>
        
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
