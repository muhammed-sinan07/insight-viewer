import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Brain, Scan, Sparkles, CheckCircle2 } from "lucide-react";

interface AnalysisProgressProps {
  isAnalyzing: boolean;
  onComplete: () => void;
}

const stages = [
  { icon: Scan, label: "Preprocessing scan data", duration: 1500 },
  { icon: Brain, label: "Analyzing brain structures", duration: 2000 },
  { icon: Sparkles, label: "Generating Grad-CAM heatmap", duration: 1500 },
  { icon: CheckCircle2, label: "Compiling results", duration: 1000 },
];

export const AnalysisProgress = ({
  isAnalyzing,
  onComplete,
}: AnalysisProgressProps) => {
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    if (!isAnalyzing) {
      setProgress(0);
      setCurrentStage(0);
      return;
    }

    const totalDuration = stages.reduce((sum, s) => sum + s.duration, 0);
    let elapsed = 0;

    const interval = setInterval(() => {
      elapsed += 50;
      const newProgress = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(newProgress);

      // Determine current stage
      let accumulatedTime = 0;
      for (let i = 0; i < stages.length; i++) {
        accumulatedTime += stages[i].duration;
        if (elapsed < accumulatedTime) {
          setCurrentStage(i);
          break;
        }
      }

      if (elapsed >= totalDuration) {
        clearInterval(interval);
        setTimeout(onComplete, 300);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isAnalyzing, onComplete]);

  if (!isAnalyzing) return null;

  const CurrentIcon = stages[currentStage]?.icon || Scan;

  return (
    <Card className="p-6 bg-card">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
            <CurrentIcon className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">
              Analyzing MRI Scan
            </h3>
            <p className="text-sm text-muted-foreground">
              {stages[currentStage]?.label || "Processing..."}
            </p>
          </div>
          <span className="text-lg font-mono font-semibold text-primary">
            {Math.round(progress)}%
          </span>
        </div>

        <Progress value={progress} className="h-2" />

        <div className="grid grid-cols-4 gap-2">
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            const isComplete = index < currentStage;
            const isCurrent = index === currentStage;

            return (
              <div
                key={index}
                className={`flex flex-col items-center gap-2 p-2 rounded-lg transition-all ${
                  isCurrent
                    ? "bg-primary/10"
                    : isComplete
                    ? "opacity-100"
                    : "opacity-40"
                }`}
              >
                <Icon
                  className={`h-5 w-5 ${
                    isCurrent || isComplete
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                />
                <span className="text-xs text-center text-muted-foreground line-clamp-2">
                  {stage.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};
