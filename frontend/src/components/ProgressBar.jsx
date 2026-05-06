// src/components/ProgressBar.jsx

export default function ProgressBar({ currentStep, maxSteps = 3 }) {
  const steps = Array.from({ length: maxSteps }, (_, i) => i + 1);
  return (
    <div className="w-full flex gap-2">
      {steps.map((step) => {
        const isActive = currentStep === step;
        const isDone = currentStep > step;
        return (
          <div key={step} className="flex-1 flex flex-col gap-2">
            <div 
              className={`h-1.5 transition-all duration-500 ${
                isActive ? "bg-zinc-950" : isDone ? "bg-zinc-300" : "bg-zinc-100"
              }`}
            />
            <div className={`text-[9px] font-black uppercase tracking-[0.2em] ${isActive ? "text-zinc-950" : "text-zinc-400"}`}>
              TAHAP 0{step}
            </div>
          </div>
        );
      })}
    </div>
  );
}
