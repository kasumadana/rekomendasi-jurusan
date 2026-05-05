import { useLocation, useNavigate, Navigate } from "react-router-dom";
import Icon from "../components/Icons";
import RecommendationResult from "../components/RecommendationResult";

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect to kuesioner if no state (user navigated here directly)
  if (!location.state || !location.state.rekomendasi) {
    return <Navigate to="/kuesioner" replace />;
  }

  const { rekomendasi, formData } = location.state;

  return (
    <div className="min-h-[100dvh] flex flex-col bg-slate-50 font-sans">
      <header className="py-6 px-6 sm:px-8 max-w-7xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center gap-2 text-blue-600 font-extrabold text-xl tracking-tighter">
          <Icon name="sparkles" className="w-6 h-6" />
          Navigara
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full p-4 sm:p-6 lg:p-8">
        <RecommendationResult 
          rekomendasi={rekomendasi} 
          formData={formData} 
          onReset={() => navigate("/kuesioner")} 
        />
      </main>
    </div>
  );
}
