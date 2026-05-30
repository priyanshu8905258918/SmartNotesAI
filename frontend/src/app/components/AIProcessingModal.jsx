import { useEffect, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
const STEPS = [
    { id: 1, label: "Extracting document text", duration: 1200 },
    { id: 2, label: "Generating summary", duration: 1800 },
    { id: 3, label: "Generating revision notes", duration: 1500 },
    { id: 4, label: "Generating tags", duration: 800 },
];
export function AIProcessingModal({ isOpen, onComplete }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [completed, setCompleted] = useState(false);
    useEffect(() => {
        if (!isOpen) {
            setCurrentStep(0);
            setCompleted(false);
            return;
        }
        let elapsed = 0;
        const timeouts = [];
        STEPS.forEach((step, index) => {
            const t = setTimeout(() => {
                setCurrentStep(index + 1);
            }, elapsed);
            timeouts.push(t);
            elapsed += step.duration;
        });
        const finalT = setTimeout(() => {
            setCompleted(true);
            setTimeout(onComplete, 700);
        }, elapsed);
        timeouts.push(finalT);
        return () => timeouts.forEach(clearTimeout);
    }, [isOpen, onComplete]);
    if (!isOpen)
        return null;
    return (<div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in-0 duration-300">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 animate-in fade-in-0 zoom-in-95 duration-300">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-[#EEF2FF] flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-[#4F6EF5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <h3 className="text-[#0F172A] mb-1">Processing with AI</h3>
          <p className="text-sm text-muted-foreground">
            {completed ? "All done! Redirecting…" : "Analyzing your note content…"}
          </p>
        </div>

        <div className="space-y-3">
          {STEPS.map((step, index) => {
            const isDone = currentStep > index;
            const isActive = currentStep === index;
            return (<div key={step.id} className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${isDone ? "bg-green-50" : isActive ? "bg-blue-50" : "bg-slate-50"}`}>
                <div className="w-6 h-6 flex-shrink-0">
                  {isDone ? (<CheckCircle2 className="w-5 h-5 text-green-500"/>) : isActive ? (<Loader2 className="w-5 h-5 text-[#4F6EF5] animate-spin"/>) : (<div className="w-5 h-5 rounded-full border-2 border-slate-200"/>)}
                </div>
                <span className={`text-sm font-medium ${isDone ? "text-green-700" : isActive ? "text-[#4F6EF5]" : "text-slate-400"}`}>
                  {step.label}
                </span>
              </div>);
        })}
        </div>

        <div className="mt-6 h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-[#4F6EF5] rounded-full transition-all duration-500" style={{ width: `${(currentStep / STEPS.length) * 100}%` }}/>
        </div>
      </div>
    </div>);
}
