import { useLocation, useNavigate, Navigate } from "react-router-dom";
import RecommendationResult from "../components/RecommendationResult";

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state || !location.state.rekomendasi) {
    return <Navigate to="/kuesioner" replace />;
  }

  const { rekomendasi, formData } = location.state;

  return (
    <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 pt-8 pb-16">
      <RecommendationResult 
        rekomendasi={rekomendasi} 
        formData={formData} 
        onReset={() => navigate("/kuesioner")} 
      />
    </div>
  );
}
