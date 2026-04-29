// src/components/ProgressBar.jsx
// Step progress indicator for multi-step quiz using Tailwind CSS.

import Icon from "./Icons";

const STEPS = [
  { id: 1, label: "Latar Belakang" },
  { id: 2, label: "Minat & Bakat" },
  { id: 3, label: "Preferensi" },
];

export default function ProgressBar({ currentStep }) {
  return (
    <nav aria-label="Langkah kuesioner" className="mb-12">
      <div className="flex items-center justify-between max-w-2xl mx-auto" role="list">
        {STEPS.map((step, idx) => {
          const isDone = currentStep > step.id;
          const isActive = currentStep === step.id;
          return (
            <div key={step.id} className="contents">
              {/* Segment line before step (except first) */}
              {idx > 0 && (
                <div className="flex-1 h-1 mx-4 bg-slate-200 rounded-full overflow-hidden relative">
                  <div
                    className="absolute top-0 left-0 h-full bg-blue-600 transition-all duration-500 ease-out"
                    style={{ width: currentStep > step.id ? "100%" : currentStep === step.id ? "50%" : "0%" }}
                  />
                </div>
              )}
              <div
                className="flex flex-col items-center gap-2 z-10"
                role="listitem"
                aria-current={isActive ? "step" : undefined}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors duration-300 ${
                    isActive
                      ? "bg-blue-600 text-white ring-4 ring-blue-100 shadow-md"
                      : isDone
                      ? "bg-blue-50 text-blue-600"
                      : "bg-white text-slate-400 border-2 border-slate-200"
                  }`}
                >
                  {isDone ? <Icon name="check" className="w-5 h-5" /> : step.id}
                </div>
                <span
                  className={`text-xs font-medium whitespace-nowrap ${
                    isActive ? "text-blue-600" : isDone ? "text-slate-600" : "text-slate-400"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
